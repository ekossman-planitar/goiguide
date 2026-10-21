import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {CalendarDays, Clock, MapPin, Mic, Store, Ticket} from 'lucide-react'
import {PortableBody} from '@/components/blog/PortableBody'
import {EventCard} from '@/components/events/EventCard'
import {eventPlace, type EventDetailData} from '@/components/events/types'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronLeft} from '@/components/ui/icons'
import {categoryTitle, DEFAULT_TIME_ZONE, EVENTS_PATH, eventPath, formatEventDate, formatSessionTime, isUpcoming, sessionFormatTitle, typeTitle} from '@/lib/events'
import {fetchSanity} from '@/sanity/lib/fetch'
import {urlFor} from '@/sanity/lib/image'
import {EVENT_QUERY, EVENT_SLUGS_QUERY} from '@/sanity/lib/queries'

export const revalidate = 60

type Props = {params: Promise<{slug: string}>}

/** LinkedIn "in" mark for speaker profile links */
function LinkedInMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
const getEvent = (slug: string) => fetchSanity<EventDetailData | null>(EVENT_QUERY, null, {slug})
/** Has the event ended (as of this render)? */
const hasEnded = (e: EventDetailData) => !isUpcoming(e, Date.now())

export async function generateStaticParams() {
  const slugs = await fetchSanity<string[]>(EVENT_SLUGS_QUERY, [])
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const e = await getEvent(slug)
  if (!e) return {}
  const path = eventPath(slug)
  const title = e.seo?.metaTitle || `${e.title} | iGuide Events`
  const description = e.seo?.metaDescription || e.shortDescription || undefined
  const share = e.seo?.ogImage?.asset ? e.seo.ogImage : e.featuredImage
  const ogImage = share?.asset ? urlFor(share).width(1200).height(630).fit('crop').auto('format').url() : '/assets/iGUIDE-Meta-Thumbnail.png'
  // Past event pages stay reachable (old links) but drop out of search
  const ended = hasEnded(e)
  return {
    title: {absolute: title},
    description,
    alternates: {canonical: path},
    robots: e.seo?.noIndex || ended ? {index: false, follow: true} : undefined,
    openGraph: {type: 'website', title, description, url: path, siteName: 'iGuide', locale: 'en_CA', images: [ogImage]},
    twitter: {card: 'summary_large_image', title, description, images: [ogImage]},
  }
}

type Speaker = NonNullable<EventDetailData['speakers']>[number]
type Session = NonNullable<EventDetailData['sessions']>[number]

/** Speaker/presenter names are matched case-insensitively */
const nameKey = (n: string) => n.trim().toLowerCase()

const ATTENDANCE_MODE: Record<string, string> = {
  online: 'https://schema.org/OnlineEventAttendanceMode',
  hybrid: 'https://schema.org/MixedEventAttendanceMode',
}
const OFFLINE_ATTENDANCE_MODE = 'https://schema.org/OfflineEventAttendanceMode'

const ldScript = (data: object) => JSON.stringify(data).replaceAll(/</g, String.raw`\u003c`)

function googleCalendarUrl(e: EventDetailData, url: string, fullAddress: string, tz: string) {
  const fmt = (iso: string) => new Date(iso).toISOString().replaceAll(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${fmt(e.startAt)}/${fmt(e.endAt || e.startAt)}`,
    details: `${e.shortDescription ?? ''}\n\n${url}`,
    location: e.attendance === 'online' ? 'Online' : fullAddress,
    ctz: tz,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

function faqJsonLd(e: EventDetailData) {
  if (!e.faq?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: e.faq.map((f) => ({'@type': 'Question', name: f.question, acceptedAnswer: {'@type': 'Answer', text: f.answer}})),
  }
}

function eventLocations(e: EventDetailData, url: string) {
  const locations: object[] = []
  if (e.attendance !== 'online') {
    locations.push({'@type': 'Place', name: e.venue || e.city, address: {'@type': 'PostalAddress', streetAddress: e.address ?? undefined, addressLocality: e.city ?? undefined, addressRegion: e.region ?? undefined, addressCountry: e.country ?? undefined}})
  }
  if (e.attendance !== 'in-person') locations.push({'@type': 'VirtualLocation', url: e.registrationUrl || e.eventUrl || url})
  return locations
}

function eventPerformers(presenterNames: string[], speakerByName: Map<string, Speaker>) {
  if (!presenterNames.length) return {}
  return {
    performer: presenterNames.map((n) => {
      const sp = speakerByName.get(nameKey(n))
      return {'@type': 'Person', name: n, ...(sp?.linkedin ? {sameAs: sp.linkedin} : {})}
    }),
  }
}

function eventOffers(e: EventDetailData, url: string) {
  if (!e.price) return {}
  const free = /free/i.test(e.price)
  return {offers: {'@type': 'Offer', url: e.registrationUrl || url, price: free ? '0' : undefined, priceCurrency: free ? 'CAD' : undefined, availability: 'https://schema.org/InStock', description: e.price}}
}

function eventJsonLd(e: EventDetailData, url: string, presenterNames: string[], speakerByName: Map<string, Speaker>) {
  const img = e.featuredImage
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    description: e.shortDescription ?? undefined,
    startDate: e.startAt,
    endDate: e.endAt ?? undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: ATTENDANCE_MODE[e.attendance ?? ''] ?? OFFLINE_ATTENDANCE_MODE,
    location: eventLocations(e, url),
    image: img?.asset ? [urlFor(img).width(1600).height(900).fit('crop').url()] : undefined,
    url,
    organizer: {'@type': 'Organization', name: 'iGuide', url: 'https://goiguide.com'},
    ...eventPerformers(presenterNames, speakerByName),
    ...eventOffers(e, url),
  }
}

function EventDetails({e, place, mapUrl}: Readonly<{e: EventDetailData; place: string; mapUrl: string | null}>) {
  return (
    <dl className="space-y-4 text-base">
      <div className="flex gap-3">
        <dt className="sr-only">Date</dt>
        <CalendarDays aria-hidden width={20} height={20} className="mt-0.5 shrink-0 text-ink" />
        <dd className="text-ink">
          <time dateTime={e.startAt}>{formatEventDate(e, {weekday: true})}</time>
        </dd>
      </div>
      {place && (
        <div className="flex gap-3">
          <dt className="sr-only">Location</dt>
          <MapPin aria-hidden width={20} height={20} className="mt-0.5 shrink-0 text-ink" />
          <dd className="text-ink">
            {place}
            {e.address && e.attendance !== 'online' && <span className="block text-muted">{e.address}</span>}
            {mapUrl && (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-link text-sm">
                View map
                <ArrowRight width={14} height={14} />
              </a>
            )}
          </dd>
        </div>
      )}
      {e.booth && (
        <div className="flex gap-3">
          <dt className="sr-only">Booth</dt>
          <Store aria-hidden width={20} height={20} className="mt-0.5 shrink-0 text-ink" />
          <dd className="text-ink">Visit us at booth {e.booth}</dd>
        </div>
      )}
      {e.price && (
        <div className="flex gap-3">
          <dt className="sr-only">Price</dt>
          <Ticket aria-hidden width={20} height={20} className="mt-0.5 shrink-0 text-ink" />
          <dd className="text-ink">{e.price}</dd>
        </div>
      )}
    </dl>
  )
}

function EventIntro({e}: Readonly<{e: EventDetailData}>) {
  if (e.body?.length) return <PortableBody value={e.body} />
  if (e.shortDescription) return <p className="text-lg leading-8 text-body">{e.shortDescription}</p>
  return null
}

function PresenterChip({name, speaker}: Readonly<{name: string; speaker?: Speaker}>) {
  return (
    <li className="flex items-center gap-2 rounded-full bg-surface py-1 pr-3 pl-1 text-sm font-semibold text-ink">
      {speaker?.photo?.asset ? (
        <Image
          src={urlFor(speaker.photo).width(64).height(64).fit('crop').auto('format').url()}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
        />
      ) : (
        <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs">
          {name.charAt(0)}
        </span>
      )}
      {name}
    </li>
  )
}

function SessionItem({ses, tz, speakerByName}: Readonly<{ses: Session; tz: string; speakerByName: Map<string, Speaker>}>) {
  const when = formatSessionTime(ses, tz)
  return (
    <li className="event-session rounded-2xl border border-line bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
        <Mic aria-hidden width={13} height={13} />
        {sessionFormatTitle(ses.format)}
      </span>
      <h3 className="mt-3 text-xl font-semibold text-ink">{ses.title}</h3>
      {(when || ses.stage) && (
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-body">
          {when && (
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden width={15} height={15} />
              <time dateTime={ses.startAt!}>{when}</time>
            </span>
          )}
          {ses.stage && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden width={15} height={15} />
              {ses.stage}
            </span>
          )}
        </p>
      )}
      {ses.description && <p className="mt-3 leading-7 text-body">{ses.description}</p>}
      {ses.presenters?.length ? (
        <ul className="mt-4 flex flex-wrap gap-3" aria-label="Presenters">
          {ses.presenters.map((n) => (
            <PresenterChip key={n} name={n} speaker={speakerByName.get(nameKey(n))} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function SessionsSection({sessions, tz, speakerByName}: Readonly<{sessions: Session[]; tz: string; speakerByName: Map<string, Speaker>}>) {
  return (
    <section className="mt-14" aria-labelledby="sessions-heading">
      <h2 id="sessions-heading" className="text-[28px] font-semibold text-ink">
        On stage
      </h2>
      <ul className="mt-6 space-y-4">
        {sessions.map((ses) => (
          <SessionItem key={ses._key} ses={ses} tz={tz} speakerByName={speakerByName} />
        ))}
      </ul>
    </section>
  )
}

function SpeakersSection({speakers, onStage}: Readonly<{speakers: Speaker[]; onStage: Map<string, string>}>) {
  return (
    <section className="mt-14" aria-labelledby="speakers-heading">
      <h2 id="speakers-heading" className="text-[28px] font-semibold text-ink">
        Who you’ll meet
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {speakers.map((s) => (
          <li key={s.name} className="flex items-center gap-4">
            {s.photo?.asset ? (
              <Image
                src={urlFor(s.photo).width(160).height(160).fit('crop').auto('format').url()}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span aria-hidden className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-surface text-2xl font-semibold text-ink">
                {s.name.charAt(0)}
              </span>
            )}
            <span>
              <span className="block text-lg font-semibold text-ink">{s.name}</span>
              {s.role && <span className="block text-body">{s.role}</span>}
              {onStage.has(nameKey(s.name)) && (
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary-hover px-2 py-0.5 text-xs font-semibold text-white">
                  <Mic aria-hidden width={12} height={12} /> On stage
                  <span className="sr-only">: {onStage.get(nameKey(s.name))}</span>
                </span>
              )}
              {s.linkedin && (
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-speaker-linkedin mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                >
                  <LinkedInMark />
                  LinkedIn
                  <span className="sr-only"> profile of {s.name} (opens in a new tab)</span>
                </a>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function EventPage({params}: Readonly<Props>) {
  const {slug} = await params
  const e = await getEvent(slug)
  if (!e) notFound()

  const ended = hasEnded(e)
  const tz = e.timeZone || DEFAULT_TIME_ZONE
  const place = eventPlace(e)
  const fullAddress = [e.venue, e.address, e.city, e.region, e.country].filter(Boolean).join(', ')
  const mapUrl = e.attendance !== 'online' && fullAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}` : null
  const img = e.featuredImage
  const url = `https://goiguide.com${eventPath(slug)}`
  const googleCal = googleCalendarUrl(e, url, fullAddress, tz)

  // Speakers on stage: matched to sessions by name
  const speakerByName = new Map((e.speakers ?? []).map((s) => [nameKey(s.name), s]))
  const onStage = new Map<string, string>()
  for (const ses of e.sessions ?? []) for (const n of ses.presenters ?? []) if (!onStage.has(nameKey(n))) onStage.set(nameKey(n), ses.title)
  const presenterNames = [...new Set((e.sessions ?? []).flatMap((ses) => ses.presenters ?? []))]

  const faqLd = faqJsonLd(e)
  const jsonLd = eventJsonLd(e, url, presenterNames, speakerByName)

  return (
    <article className="pb-24">
      {!ended && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: ldScript(jsonLd)}} />}
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: ldScript(faqLd)}} />}

      <header className="bg-surface pt-8 pb-12 lg:pt-12 lg:pb-[60px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SmartLink href={EVENTS_PATH} className="text-link gap-1 text-sm">
              <ChevronLeft /> All events
            </SmartLink>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-white px-3 py-1 font-semibold text-ink">{typeTitle(e.eventType)}</span>
              {e.categories?.map((c) => (
                <span key={c} className="rounded-full bg-white px-3 py-1 text-ink">
                  {categoryTitle(c)}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-balance text-[40px] leading-[1.15] font-semibold text-ink md:text-5xl">{e.title}</h1>
            {ended && (
              <output className="mt-6 block rounded-lg border border-line bg-white px-4 py-3 font-semibold text-ink">
                This event has ended. <SmartLink href={EVENTS_PATH} className="underline underline-offset-2 hover:text-primary-hover">See upcoming events</SmartLink>
              </output>
            )}
            <div className="mt-6">
              <EventDetails e={e} place={place} mapUrl={mapUrl} />
            </div>
            {!ended && (
              <div className="mt-8 flex flex-wrap gap-3">
                {e.registrationUrl && (
                  <Button href={e.registrationUrl} size="lg" newTab={/^https?:/.test(e.registrationUrl)}>
                    Register
                  </Button>
                )}
                {e.hubspotFormId && !e.registrationUrl && (
                  <Button href="#register" size="lg">
                    {e.formHeading || 'Register now'}
                  </Button>
                )}
                {e.eventUrl && (
                  <Button href={e.eventUrl} size="lg" variant={e.registrationUrl || e.hubspotFormId ? 'secondary' : 'primary'} newTab>
                    {e.eventUrlLabel || 'Visit event website'}
                  </Button>
                )}
              </div>
            )}
            {!ended && (
              <p className="mt-5 text-sm text-muted">
                Add to calendar:{' '}
                <a href={googleCal} target="_blank" rel="noopener noreferrer" className="text-link">
                  Google
                </a>{' '}
                ·{' '}
                <a href={`${eventPath(slug)}/ics`} className="text-link">
                  Outlook / Apple (.ics)
                </a>
              </p>
            )}
          </div>
          <div className="min-w-0">
            {img?.asset && (
              <Image
                src={urlFor(img).width(1400).height(788).fit('crop').auto('format').url()}
                alt={img.alt ?? ''}
                width={1400}
                height={788}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-2xl shadow-lg"
                placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={img.asset.metadata?.lqip}
              />
            )}
          </div>
        </Container>
      </header>

      <Container className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div className="min-w-0">
          <EventIntro e={e} />
          {e.sessions?.length ? <SessionsSection sessions={e.sessions} tz={tz} speakerByName={speakerByName} /> : null}
          {e.speakers?.length ? <SpeakersSection speakers={e.speakers} onStage={onStage} /> : null}
        </div>
        {e.hubspotFormId && !ended && (
          <aside id="register" className="scroll-mt-28 self-start rounded-2xl border border-line bg-white p-6 shadow-lg md:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold text-ink md:text-[28px]">{e.formHeading || 'Register now'}</h2>
            <HubSpotForm formId={e.hubspotFormId} className="mt-6 min-h-[320px]" />
          </aside>
        )}
      </Container>

      {e.more?.length ? (
        <section className="mt-20" aria-labelledby="more-heading">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-heading" className="text-[32px] leading-tight font-semibold text-ink md:text-[40px]">
                More upcoming events
              </h2>
              <SmartLink href={EVENTS_PATH} className="text-link">
                View all events
                <ArrowRight width={16} height={16} />
              </SmartLink>
            </div>
            <ul className="mt-8 space-y-5">
              {e.more.map((m) => (
                <li key={m._id}>
                  <EventCard event={m} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {e.faq?.length ? (
        <section className="mt-20" aria-labelledby="faq-heading">
          <Container size="narrow">
            <h2 id="faq-heading" className="text-[32px] leading-tight font-semibold text-ink md:text-[40px]">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {e.faq.map((f) => (
                <details key={f._key} className="event-faq group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span aria-hidden className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-7 whitespace-pre-line text-body">{f.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  )
}

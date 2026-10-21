import {PackageTabs, type PackageTab} from '@/components/blocks/PackageTabs'
import {Blocks, type Block} from '@/components/blocks/Blocks'
import {Pill} from '@/components/ui/Pill'
import {CheckList} from '@/components/blocks/CheckList'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {Section} from '@/components/blocks/Section'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {Testimonials, type Quote} from '@/components/blocks/Testimonials'
import type {SectionBg} from '@/components/blocks/Section'
import {ResourceCard} from '@/components/resources/ResourceCard'
import type {ResourceCardData} from '@/sanity/lib/types'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {urlFor} from '@/sanity/lib/image'
import {lpCtas, lpImg, lpMedia, tourEmbed, youtubeEmbed} from './convert'
import {FormPlaceholder, LpHero} from './LpHero'
import type {LpImage, LpLogo, LpQuote, LpSection} from './types'

/* eslint-disable @typescript-eslint/no-explicit-any -- section fields come from Sanity as loose objects */

const bg = (s: any): SectionBg | undefined => (['white', 'surface', 'sky'].includes(s.background) ? s.background : undefined)

function quotePhoto(q: LpQuote): Quote['photo'] {
  if (typeof q.photo === 'string') return {src: q.photo, alt: `photo - ${q.name ?? ''}`}
  if (q.photo?.asset) {
    return {src: urlFor(q.photo as any).width(600).height(600).fit('crop').auto('format').url(), alt: q.photo.alt ?? q.name ?? '', width: 600, height: 600}
  }
  return undefined
}

function quoteFrom(q: LpQuote): Quote {
  return {
    quote: q.quote,
    detail: q.detail,
    name: q.name,
    role: q.role,
    company: q.company,
    link: q.link?.href && q.link.label ? {label: q.link.label, href: q.link.href} : undefined,
    photo: quotePhoto(q),
    logo: q.logo?.url ? {src: q.logo.url, alt: q.logo.name, width: q.logo.dims?.width, height: q.logo.dims?.height} : undefined,
  }
}

type SectionData = {s: any}
type SectionProps = SectionData & {formAnchor: boolean}

function LogosSection({s}: Readonly<SectionData>) {
  const logos = ((s.logos ?? []) as LpLogo[]).filter((l) => l?.url).map((l) => ({src: l.url!, alt: l.name, width: l.dims?.width, height: l.dims?.height}))
  const preview = ((s._previewLogos ?? []) as string[]).map((src) => ({src, alt: 'logo'}))
  const all = logos.length ? logos : preview
  return all.length ? <LogoBand heading={s.heading} logos={all} variant={all.length > 5 ? 'marquee' : 'row'} background="white" /> : null
}

function TestimonialsSection({s}: Readonly<SectionData>) {
  // Skip missing or unpublished testimonials instead of failing the page
  const quotes = ((s.quotes ?? s._previewQuotes ?? []) as (LpQuote | null)[]).filter((q): q is LpQuote => !!q?.quote).map(quoteFrom)
  return quotes.length ? <Testimonials heading={s.heading} quotes={quotes} background={bg(s) ?? 'surface'} /> : null
}

/** Live "iGUIDE Packages" tabs (camerasystemcontent): same component as /design-construction */
function PackageTabsSection({s}: Readonly<SectionData>) {
  const packages = ((s.tabs ?? []) as any[])
    .map((t, i) => {
      const media = lpMedia(t.media)
      if (media?.type !== 'image') return null
      return {
        id: `${s._key}-${i}`,
        label: t.label,
        heading: t.heading || t.label,
        text: t.text ?? '',
        list: (t.bullets ?? []) as string[],
        image: media.image,
        links: lpCtas(t.buttons).map((c) => ({label: c.label, href: c.href})),
      }
    })
    .filter(Boolean) as PackageTab[]
  return packages.length ? (
    <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
      <PackageTabs tabs={packages} label={s.heading ?? 'Packages'} />
    </Section>
  ) : null
}

function TabsSection({s}: Readonly<SectionData>) {
  if (s.display === 'packages') return <PackageTabsSection s={s} />
  const tabs = ((s.tabs ?? []) as any[])
    .map((t, i) => {
      const media = lpMedia(t.media)
      if (!media) return null
      const ctas = lpCtas(t.buttons)
      return {
        id: `${s._key}-${i}`,
        label: t.label,
        media,
        text: (
          <>
            {t.text && <p>{t.text}</p>}
            {ctas.length > 0 && <CtaButtons ctas={ctas} className="mt-5 justify-center" />}
          </>
        ),
      }
    })
    .filter(Boolean) as Parameters<typeof TabbedMedia>[0]['tabs']
  return tabs.length ? (
    <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
      <TabbedMedia label={s.heading ?? 'Samples'} tabs={tabs} />
    </Section>
  ) : null
}

type TourTip = {_key?: string; text?: string; icon?: LpImage}

function TourTips({tips}: Readonly<{tips: TourTip[]}>) {
  return (
    <ul className="mb-8 grid gap-6 md:grid-cols-3">
      {tips.map((t, i) => {
        const icon = lpImg(t.icon)
        return (
          <li key={t._key ?? i} className="flex items-center gap-4">
            {icon && (
              // eslint-disable-next-line @next/next/no-img-element -- small icon, natural size
              <img src={icon.src} alt={icon.alt} className="w-[60px] max-w-[60px] shrink-0" />
            )}
            <span className="font-medium text-ink">{t.text}</span>
          </li>
        )
      })}
    </ul>
  )
}

function TourClosing({s, list}: Readonly<{s: any; list: string[]}>) {
  if (!s.listHeading && list.length === 0 && !s.closing) return null
  return (
    <div className="mx-auto mt-10 max-w-3xl text-center">
      {s.listHeading && <h3 className="text-2xl font-semibold text-ink">{s.listHeading}</h3>}
      {list.length > 0 && <CheckList items={list} className="mx-auto mt-6 w-fit text-left" />}
      {s.closing && <p className="mt-6 text-lg text-body">{s.closing}</p>}
    </div>
  )
}

/** Live tour(s) with short "how to use it" tips (live: tab-embed element; several tours show as tabs) */
function TourDemoSection({s}: Readonly<SectionData>) {
  const tours = ((s.tours ?? []) as {_key?: string; label?: string; media?: any}[])
    .map((t, i) => ({id: `${s._key}-${i}`, label: t.label || `Tour ${i + 1}`, media: lpMedia(t.media)}))
    .filter((t): t is {id: string; label: string; media: NonNullable<ReturnType<typeof lpMedia>>} => !!t.media)
  const tips = ((s.tips ?? []) as TourTip[]).filter((t) => t?.text)
  const list = ((s.list ?? []) as string[]).filter(Boolean)
  if (!tours.length) return null
  return (
    <Section heading={s.heading} subheading={s.subheading} eyebrow={s.eyebrow ? <Pill label={s.eyebrow} /> : undefined} align="center" background={bg(s) ?? 'surface'}>
      {tips.length > 0 && <TourTips tips={tips} />}
      {tours.length > 1 ? <TabbedMedia label={s.heading ?? 'Tours'} tabs={tours} /> : <MediaView media={tours[0].media} />}
      <TourClosing s={s} list={list} />
    </Section>
  )
}

function videoListClass(fullWidth: boolean, count: number) {
  if (fullWidth) return ''
  return count === 1 ? 'mx-auto max-w-3xl' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
}

function VideosSection({s}: Readonly<SectionData>) {
  const videos = ((s.videos ?? []) as {title: string; url: string}[]).filter((v) => v?.url)
  return videos.length ? (
    <Section heading={s.heading} align="center" background={bg(s)}>
      <ul className={videoListClass(s.fullWidth, videos.length)}>
        {videos.map((v) => (
          <li key={v.url}>
            <MediaView media={{type: 'embed', src: /youriguide\.com/.test(v.url) ? tourEmbed(v.url) : youtubeEmbed(v.url), title: v.title}} />
            {!s.fullWidth && <p className="mt-3 font-semibold text-ink">{v.title}</p>}
          </li>
        ))}
      </ul>
    </Section>
  ) : null
}

function ResourcesSection({s}: Readonly<SectionData>) {
  const items = ((s.items ?? []) as ResourceCardData[]).filter((r) => r?._id)
  return items.length ? (
    <Section heading={s.heading} align="center" background={bg(s)}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={r._id}>
            <ResourceCard item={r} />
          </li>
        ))}
      </ul>
    </Section>
  ) : null
}

const FORM_BG: Record<string, string> = {sky: 'bg-sky', surface: 'bg-surface'}

function FormSection({s, formAnchor}: Readonly<SectionProps>) {
  if (!s.hubspotFormId && !s._previewForm) return null
  const bgClass = FORM_BG[bg(s) ?? ''] ?? 'bg-white'
  return (
    <section id={formAnchor ? 'form' : undefined} className={`scroll-mt-24 py-16 lg:py-[60px] ${bgClass}`}>
      <div className="mx-auto w-full max-w-2xl px-4">
        {s.heading && <h2 className="text-center text-3xl font-semibold text-ink md:text-4xl">{s.heading}</h2>}
        {s.subheading && <p className="mt-4 text-center text-lg text-muted">{s.subheading}</p>}
        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
          {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="min-h-[320px]" /> : <FormPlaceholder />}
        </div>
      </div>
    </section>
  )
}

function NoticeSection({s}: Readonly<SectionData>) {
  return s.text ? (
    <section className="pb-12">
      <div className="mx-auto w-full max-w-4xl px-4 text-sm leading-6 whitespace-pre-line text-muted">{s.text}</div>
    </section>
  ) : null
}

function BlockSection({s}: Readonly<SectionData>) {
  const block = toBlock(s)
  return block ? <Blocks blocks={[block]} /> : null
}

/** One landing page section → page block (most reuse the site's existing blocks). */
function LandingSection({s, formAnchor}: Readonly<SectionProps>) {
  switch (s._type) {
    case 'lpHero':
      return <LpHero section={s as LpSection} formAnchor={formAnchor} />
    case 'lpLogos':
      return <LogosSection s={s} />
    case 'lpTestimonials':
      return <TestimonialsSection s={s} />
    case 'lpTabs':
      return <TabsSection s={s} />
    case 'lpTourDemo':
      return <TourDemoSection s={s} />
    case 'lpVideos':
      return <VideosSection s={s} />
    case 'lpResources':
      return <ResourcesSection s={s} />
    case 'lpForm':
      return <FormSection s={s} formAnchor={formAnchor} />
    case 'lpNotice':
      return <NoticeSection s={s} />
    default:
      return <BlockSection s={s} />
  }
}

/** Sections that map straight onto existing page blocks */
function toBlock(s: any): Block | null {
  switch (s._type) {
    case 'lpFeatures':
      return {
        type: 'cards',
        heading: s.heading,
        subheading: s.subheading,
        align: 'center',
        background: bg(s),
        columns: [2, 3, 4].includes(s.columns) ? s.columns : 3,
        cards: ((s.items ?? []) as any[]).map((it) => ({title: it.title, text: it.text, icon: lpImg(it.icon as LpImage)})),
        after: s.footnote ? <p className="text-sm text-muted">{s.footnote}</p> : undefined,
      }
    case 'lpSplit': {
      const media = lpMedia(s.media)
      return {
        type: 'split',
        heading: s.heading ?? '',
        body: s.body ? <p className="whitespace-pre-line">{s.body}</p> : undefined,
        list: s.bullets?.length ? s.bullets : undefined,
        after: s.footnote ? <p className="text-sm text-muted">{s.footnote}</p> : undefined,
        ctas: lpCtas(s.buttons),
        media: media ?? {type: 'image', image: {src: '/assets/iGUIDE-Meta-Thumbnail.png', alt: ''}},
        mediaSide: s.mediaSide === 'left' ? 'left' : 'right',
        background: bg(s),
      }
    }
    case 'lpSteps':
      return {
        type: 'steps',
        heading: s.heading ?? '',
        subheading: s.subheading,
        showImages: ((s.steps ?? []) as any[]).some((st) => lpImg(st.image)),
        steps: ((s.steps ?? []) as any[]).map((st) => ({title: st.title, body: st.text ?? '', image: lpImg(st.image)})),
      }
    case 'lpStats':
      return {type: 'stats', heading: s.heading, align: 'center', background: bg(s), stats: ((s.items ?? []) as any[]).map((it) => ({value: it.value, text: it.text}))}
    case 'lpCompare':
      return {
        type: 'compare',
        heading: s.heading,
        subheading: s.subheading,
        rows: ((s.rows ?? []) as any[]).map((r) => ({label: r.label, ours: r.ours ?? '', theirs: r.theirs ?? ''})),
        columns: {label: '', ours: s.oursLabel ?? 'iGuide', theirs: s.theirsLabel ?? 'Others'},
        footnote: s.footnote,
      }
    case 'lpFaq':
      return {type: 'faq', heading: s.heading ?? 'Frequently asked questions', items: ((s.items ?? []) as any[]).map((it) => ({q: it.question, a: it.answer}))}
    case 'lpCta':
      return {type: 'cta', heading: s.heading ?? '', text: s.text, ctas: lpCtas(s.buttons)}
    default:
      return null
  }
}

/** Renders a landing page's sections. The first form on the page gets id="form" so "scroll to form" buttons work. */
export function LandingSections({sections}: Readonly<{sections: LpSection[]}>) {
  const hasForm = (s: any) => Boolean(s.hubspotFormId || s._previewForm)
  const firstForm = sections.find((s) => (s._type === 'lpHero' && (s as any).style !== 'media' && hasForm(s)) || (s._type === 'lpForm' && hasForm(s)))?._key
  return (
    <>
      {sections.map((s) => (
        <LandingSection key={s._key} s={s} formAnchor={s._key === firstForm} />
      ))}
    </>
  )
}

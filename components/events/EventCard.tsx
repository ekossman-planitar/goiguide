import Image from 'next/image'
import {CalendarDays, MapPin} from 'lucide-react'
import {SmartLink} from '@/components/ui/SmartLink'
import {DEFAULT_TIME_ZONE, eventPath, formatEventDate, typeTitle, zonedDate} from '@/lib/events'
import {urlFor} from '@/sanity/lib/image'
import {eventPlace, type EventCardData} from './types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** One event in the /events list: date tile, details, optional image. */
export function EventCard({event, live, headingLevel = 'h3'}: Readonly<{event: EventCardData; live?: boolean; headingLevel?: 'h2' | 'h3'}>) {
  const tz = event.timeZone || DEFAULT_TIME_ZONE
  const {m, d} = zonedDate(event.startAt, tz)
  const place = eventPlace(event)
  const Heading = headingLevel
  const img = event.featuredImage
  return (
    <article className="group relative grid gap-5 rounded-2xl border border-line bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-colors hover:border-primary-hover sm:grid-cols-[72px_1fr] md:p-6 lg:grid-cols-[72px_1fr_240px]">
      <div aria-hidden className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-xl bg-primary text-white">
        <span className="text-xs font-semibold tracking-wide uppercase">{MONTHS[m - 1]}</span>
        <span className="text-[28px] leading-none font-bold">{d}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-surface px-3 py-1 font-semibold text-ink">{typeTitle(event.eventType)}</span>
          {live && <span className="rounded-full bg-primary-hover px-3 py-1 font-semibold text-white">Happening now</span>}
          {event.price && <span className="text-muted">{event.price}</span>}
        </div>
        <Heading className="mt-3 text-2xl leading-tight font-semibold text-ink">
          {/* The whole card is clickable through this link's ::after */}
          <SmartLink href={eventPath(event.slug)} className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary-hover focus-visible:outline-none">
            {event.title}
          </SmartLink>
        </Heading>
        <p className="mt-3 flex items-start gap-2 text-base text-ink">
          <CalendarDays aria-hidden width={18} height={18} className="mt-0.5 shrink-0" />
          <time dateTime={event.startAt}>{formatEventDate(event, {weekday: true})}</time>
        </p>
        {place && (
          <p className="mt-1 flex items-start gap-2 text-base text-ink">
            <MapPin aria-hidden width={18} height={18} className="mt-0.5 shrink-0" />
            <span>
              {place}
              {event.booth && <span className="text-muted"> · Booth {event.booth}</span>}
            </span>
          </p>
        )}
        {event.shortDescription && <p className="mt-3 text-base leading-6 text-body">{event.shortDescription}</p>}
      </div>
      {img?.asset && (
        <div className="relative hidden aspect-[16/10] overflow-hidden rounded-xl bg-surface lg:block">
          <Image
            src={urlFor(img).width(480).height(300).fit('crop').auto('format').url()}
            alt=""
            fill
            sizes="240px"
            className="object-cover"
            placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={img.asset.metadata?.lqip}
          />
        </div>
      )}
    </article>
  )
}

import {FallbackImage} from '@/components/ui/FallbackImage'
import {QuoteMark} from '@/components/ui/QuoteMark'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {ScrollRail} from './ScrollRail'

export type CarouselQuote = {
  quote: string
  name: string
  role: string
  company: string
  logo?: {src: string; alt: string; width: number; height: number}
  photo?: {src: string; alt: string}
  /** Full story or the customer's own iGuide */
  link?: {label: string; href: string}
}

/** A slot still waiting for a real quote (shown as a dashed card so the layout can be reviewed) */
export type QuoteSlot = {slot: string; ask: string}

/** Carousel of short quotes. Quotes come from data, so Marketing can add one without touching the layout. */
export function QuoteCarousel({label, quotes, slots = []}: Readonly<{label: string; quotes: CarouselQuote[]; slots?: QuoteSlot[]}>) {
  return (
    <ScrollRail label={label} trackClassName="gap-6">
      {quotes.map((q) => (
        <figure key={q.quote} className="flex w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-8 shadow-card md:w-[380px]">
          {q.logo && (
            <FallbackImage
              src={q.logo.src}
              alt={q.logo.alt}
              width={q.logo.width}
              height={q.logo.height}
              className="mb-6 h-12 w-auto max-w-[160px] object-contain object-left"
              fallback={null}
            />
          )}
          <QuoteMark className="mb-4" />
          <blockquote className="flex-1 text-lg leading-7 font-medium text-ink">{q.quote}</blockquote>
          <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5 text-base">
            {q.photo && <FallbackImage src={q.photo.src} alt={q.photo.alt} width={112} height={112} className="h-14 w-14 shrink-0 rounded-full object-cover" fallback={null} />}
            <span>
              <span className="font-semibold text-ink">{q.name}</span>
              <span className="text-muted"> / {q.role}</span>
              <span className="block text-muted">{q.company}</span>
              {q.link && (
                <SmartLink href={q.link.href} className="text-link mt-3 w-fit">
                  {q.link.label}
                  <ArrowRight width={16} height={16} />
                </SmartLink>
              )}
            </span>
          </figcaption>
        </figure>
      ))}
      {slots.map((s) => (
        <div key={s.slot} className={cn('flex min-h-[260px] w-[300px] shrink-0 snap-start flex-col justify-center rounded-2xl border-2 border-dashed border-line bg-white p-8 md:w-[380px]')}>
          <p className="type-overline text-muted">Quote needed</p>
          <p className="type-heading-sm mt-2 text-ink">{s.slot}</p>
          <p className="type-body mt-2 text-muted">{s.ask}</p>
        </div>
      ))}
    </ScrollRail>
  )
}

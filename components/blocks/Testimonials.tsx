import {Container} from '@/components/ui/Container'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {MediaView} from './MediaView'
import type {SectionBg} from './Section'
import type {Img, Media} from './types'

export type Quote = {
  quote: string
  /** Supporting sentence shown under the quote */
  detail?: string
  /** e.g. "Read their story" */
  link?: {label: string; href: string}
  name?: string
  role?: string
  company?: string
  /** Headshot (shown round) */
  photo?: Img
  /** Company logo (shown above the quote in multi-quote rows) */
  logo?: Img
  /** Video shown beside the quote instead of a photo */
  media?: Media
}

const bgs: Record<SectionBg, string> = {white: 'bg-white', surface: 'bg-surface', sky: 'bg-sky'}

/** One large testimonial, or a row of them. */
export function Testimonials({
  quotes,
  heading,
  background = 'surface',
  bare = false,
}: {
  quotes: Quote[]
  heading?: string
  background?: SectionBg
  /** Render only the quotes, for use inside another section */
  bare?: boolean
}) {
  const content =
    quotes.length === 1 ? (
      <SingleQuote quote={quotes[0]} />
    ) : (
      <ul className={cn('grid gap-6', quotes.length === 2 ? 'lg:grid-cols-2' : quotes.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-4')}>
        {quotes.map((q) => (
          <li key={q.quote} className="flex">
            <QuoteCard quote={q} />
          </li>
        ))}
      </ul>
    )
  if (bare) return content
  return (
    <section className={cn(bgs[background], 'py-16 lg:py-[60px]')}>
      <Container>
        {heading && <SectionHeading heading={heading} align="center" className="mb-10 max-w-3xl" />}
        {content}
      </Container>
    </section>
  )
}

function Attribution({quote}: {quote: Quote}) {
  return (
    <figcaption className="text-base">
      <span className="font-semibold text-ink">{quote.name}</span>
      {quote.role && <span className="text-muted"> / {quote.role}</span>}
      {quote.company && <span className="block text-muted">{quote.company}</span>}
      {quote.link && (
        <SmartLink href={quote.link.href} className="mt-3 flex w-fit items-center gap-1.5 font-semibold text-primary hover:underline">
          {quote.link.label}
          <ArrowRight width={16} height={16} />
        </SmartLink>
      )}
    </figcaption>
  )
}

function SingleQuote({quote}: {quote: Quote}) {
  return (
    <figure className={cn('grid items-center gap-10', (quote.photo || quote.media) && 'lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]')}>
      {quote.media ? (
        <MediaView media={quote.media} />
      ) : quote.photo ? (
        <FallbackImage
          src={quote.photo.src}
          alt={quote.photo.alt}
          width={quote.photo.width ?? 300}
          height={quote.photo.height ?? 300}
          className="mx-auto h-48 w-48 rounded-full object-cover lg:h-64 lg:w-64"
          fallback={<div className="mx-auto h-48 w-48 rounded-full bg-white lg:h-64 lg:w-64" />}
        />
      ) : null}
      <div>
        <span aria-hidden className="block text-6xl leading-none font-bold text-brand">“</span>
        <blockquote className="mt-2 text-2xl leading-[1.35] font-semibold text-ink md:text-[28px]">{quote.quote}</blockquote>
        {quote.detail && <p className="mt-4 text-lg leading-7 text-body">{quote.detail}</p>}
        <div className="mt-6">
          <Attribution quote={quote} />
        </div>
      </div>
    </figure>
  )
}

function QuoteCard({quote}: {quote: Quote}) {
  return (
    <figure className="flex w-full flex-col rounded-2xl border border-[#e7edf6] bg-white p-8 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      {quote.media && <MediaView media={quote.media} className="mb-6" />}
      {quote.logo && (
        <FallbackImage
          src={quote.logo.src}
          alt={quote.logo.alt}
          width={quote.logo.width ?? 180}
          height={quote.logo.height ?? 64}
          className="mb-6 h-14 w-auto max-w-[180px] object-contain object-left"
          fallback={null}
        />
      )}
      <blockquote className="flex-1 text-lg leading-7 font-medium text-ink">“{quote.quote}”</blockquote>
      <div className="mt-6 flex items-center gap-4 border-t border-line pt-5">
        {quote.photo && (
          <FallbackImage
            src={quote.photo.src}
            alt={quote.photo.alt}
            width={112}
            height={112}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
            fallback={null}
          />
        )}
        <Attribution quote={quote} />
      </div>
    </figure>
  )
}

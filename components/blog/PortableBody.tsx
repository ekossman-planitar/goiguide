import Image from 'next/image'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {Button} from '@/components/ui/Button'
import {QuoteMark} from '@/components/ui/QuoteMark'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImage} from '@/sanity/lib/types'

type FaqValue = {heading?: string; items?: {_key: string; question: string; answer?: PortableTextBlock[]}[]}

/** Screen-reader title for imported embeds that didn't have one */
function embedTitle(url: string) {
  if (/youriguide\.com|iguideradix\.com/.test(url)) return 'iGuide 3D virtual tour'
  if (/youtube|vimeo|vidyard/.test(url)) return 'Video'
  return 'Embedded content'
}

type VideoEmbedValue = {url?: string; title?: string; height?: number}

/** Imported embeds: fixed height when the original had one, otherwise 16:9 */
function VideoEmbed({value}: Readonly<{value: VideoEmbedValue}>) {
  if (!value?.url) return null
  if (value.height) {
    return <iframe src={value.url} title={value.title ?? 'Embedded player'} height={value.height} className="mt-10 w-full rounded-xl" allowFullScreen loading="lazy" />
  }
  return (
    <div className="relative mt-10 aspect-video overflow-hidden rounded-xl bg-surface">
      <iframe src={value.url} title={value.title ?? embedTitle(value.url)} className="absolute inset-0 h-full w-full" allowFullScreen loading="lazy" />
    </div>
  )
}

export type TestimonialValue = {
  quote?: string
  name?: string
  role?: string
  image?: SanityImage
}

/** A customer quote: the words, then who said it (with their photo or logo). */
export function Testimonial({value}: Readonly<{value: TestimonialValue}>) {
  if (!value?.quote) return null
  const dims = value.image?.asset?.metadata?.dimensions
  // Square-ish pictures are headshots (round); wide ones are logos (shown whole)
  const headshot = !dims || (dims.width / dims.height > 0.75 && dims.width / dims.height < 1.35)
  return (
    <figure className="testimonial mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
      <QuoteMark />
      <blockquote className="mt-4 space-y-4 text-xl font-medium leading-relaxed text-ink">
        {value.quote.split(/\n{2,}/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </blockquote>
      {(value.name || value.role) && (
        <figcaption className="mt-6 flex items-center gap-4">
          {value.image?.asset &&
            (headshot ? (
              <Image
                src={urlFor(value.image).width(112).height(112).fit('crop').auto('format').url()}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
            ) : (
              <Image
                src={urlFor(value.image).height(80).fit('max').auto('format').url()}
                alt=""
                width={Math.round((dims.width / dims.height) * 40)}
                height={40}
                className="h-10 w-auto shrink-0"
              />
            ))}
          <span>
            {value.name && <span className="block font-semibold text-ink">{value.name}</span>}
            {value.role && <span className="block text-muted">{value.role}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  )
}

type CtaBannerValue = {
  heading?: string
  text?: string
  buttonLabel?: string
  buttonUrl?: string
  hubspotFormId?: string
  image?: {asset?: {url: string}}
}

export const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mt-6 text-lg leading-relaxed text-body">{children}</p>,
    h2: ({children}) => <h2 className="mt-12 text-3xl font-semibold text-ink">{children}</h2>,
    h3: ({children}) => <h3 className="mt-10 text-2xl font-semibold text-ink">{children}</h3>,
    h4: ({children}) => <h4 className="mt-8 text-xl font-semibold text-ink">{children}</h4>,
    blockquote: ({children}) => (
      <blockquote className="mt-8 border-l-4 border-brand pl-6 text-xl italic leading-relaxed text-ink">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="mt-6 list-disc space-y-2 pl-6 text-lg text-body">{children}</ul>,
    number: ({children}) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg text-body">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => (
      <a
        href={value?.href}
        className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
        {...(value?.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({value}: {value: SanityImage & {href?: string; size?: string}}) => {
      if (!value?.asset) return null
      const dims = value.asset.metadata?.dimensions
      // Icons and other small images keep their own size instead of being stretched to the column
      if (value.size === 'icon')
        return (
          <figure className="mt-10">
            <Image src={urlFor(value).height(112).fit('max').auto('format').url()} alt={value.alt ?? ''} width={dims ? Math.round((dims.width / dims.height) * 56) : 56} height={56} className="h-14 w-auto" />
          </figure>
        )
      const small = dims && dims.width <= 240
      const img = (
        <Image
          src={urlFor(value).width(small ? dims.width * 2 : 1600).fit('max').auto('format').url()}
          alt={value.alt ?? ''}
          width={dims?.width ?? 1600}
          height={dims?.height ?? 900}
          sizes={small ? `${dims.width}px` : '(min-width: 768px) 768px, 100vw'}
          className={small ? 'h-auto max-w-full' : 'w-full rounded-xl'}
        />
      )
      return (
        <figure className="mt-10">
          {value.href ? <a href={value.href}>{img}</a> : img}
          {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
        </figure>
      )
    },
    videoEmbed: ({value}: {value: VideoEmbedValue}) => <VideoEmbed value={value} />,
    faq: ({value}: {value: FaqValue}) =>
      value?.items?.length ? (
        <section className="mt-12" aria-label={value.heading || 'Frequently asked questions'}>
          {value.heading && <h2 className="text-3xl font-semibold text-ink">{value.heading}</h2>}
          <div className="mt-6 divide-y divide-line border-y border-line">
            {value.items.map((item) => (
              <details key={item._key} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span aria-hidden className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="[&>p:first-child]:mt-3">
                  <PortableText value={item.answer ?? []} components={bodyComponents} />
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null,
    socialEmbed: ({value}: {value: {url?: string}}) => {
      // Instagram's own embed page, without its tracking script
      const path = value?.url?.match(/instagram\.com\/((?:p|reel|tv)\/[\w-]+)/)?.[1]
      return path ? (
        <iframe
          src={`https://www.instagram.com/${path}/embed`}
          title="Instagram post"
          className="mx-auto mt-10 block h-[640px] w-full max-w-[540px] rounded-xl border border-line bg-white"
          loading="lazy"
        />
      ) : null
    },
    hubspotForm: ({value}: {value: {formId?: string}}) => (value?.formId ? <HubSpotForm formId={value.formId} className="mt-10" /> : null),
    ctaBanner: ({value}: {value: CtaBannerValue}) => (
      <aside
        className="relative mt-12 overflow-hidden rounded-2xl bg-primary px-8 py-10 text-white"
        style={value.image?.asset?.url ? {backgroundImage: `linear-gradient(rgba(46,44,48,.85),rgba(46,44,48,.85)), url(${value.image.asset.url})`, backgroundSize: 'cover', backgroundPosition: 'center'} : undefined}
      >
        {value.heading && <p className="text-2xl font-bold">{value.heading}</p>}
        {value.text && <p className="mt-2 text-lg text-white/90">{value.text}</p>}
        {value.buttonLabel && (
          // Live: buttons with a HubSpot form open it in a pop-up; until that's ported they go to the booking page
          <Button href={value.buttonUrl || '/book-a-demo'} size="lg" variant="secondary" className="mt-6 border-white">
            {value.buttonLabel}
          </Button>
        )}
      </aside>
    ),
    testimonial: ({value}: {value: TestimonialValue}) => <Testimonial value={value} />,
    // Section breaks only group content (see SectionedBody); on their own they show nothing
    sectionBreak: () => null,
    // Imported raw HTML stays hidden until someone reviews it and ticks "Show on the page"
    htmlEmbed: ({value}: {value: {html?: string; show?: boolean}}) =>
      value?.show && value.html ? <div className="mt-8" dangerouslySetInnerHTML={{__html: value.html}} /> : null,
  },
}

/** Renders a Sanity rich text body with site typography. */
export function PortableBody({value}: Readonly<{value: PortableTextBlock[]}>) {
  return <PortableText value={value} components={bodyComponents} />
}

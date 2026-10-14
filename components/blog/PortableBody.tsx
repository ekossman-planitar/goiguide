import Image from 'next/image'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import {Button} from '@/components/ui/Button'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImage} from '@/sanity/lib/types'

type CtaBannerValue = {
  heading?: string
  text?: string
  buttonLabel?: string
  buttonUrl?: string
  hubspotFormId?: string
  image?: {asset?: {url: string}}
}

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mt-6 text-lg leading-relaxed text-body">{children}</p>,
    h2: ({children}) => <h2 className="mt-12 text-3xl font-bold tracking-tight text-ink">{children}</h2>,
    h3: ({children}) => <h3 className="mt-10 text-2xl font-bold tracking-tight text-ink">{children}</h3>,
    h4: ({children}) => <h4 className="mt-8 text-xl font-bold text-ink">{children}</h4>,
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
    image: ({value}: {value: SanityImage & {href?: string}}) => {
      if (!value?.asset) return null
      const dims = value.asset.metadata?.dimensions
      const img = (
        <Image
          src={urlFor(value).width(1600).fit('max').auto('format').url()}
          alt={value.alt ?? ''}
          width={dims?.width ?? 1600}
          height={dims?.height ?? 900}
          sizes="(min-width: 768px) 768px, 100vw"
          className="w-full rounded-xl"
        />
      )
      return (
        <figure className="mt-10">
          {value.href ? <a href={value.href}>{img}</a> : img}
          {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
        </figure>
      )
    },
    videoEmbed: ({value}: {value: {url?: string; title?: string}}) =>
      value?.url ? (
        <div className="relative mt-10 aspect-video overflow-hidden rounded-xl bg-surface">
          <iframe src={value.url} title={value.title ?? 'Video'} className="absolute inset-0 h-full w-full" allowFullScreen loading="lazy" />
        </div>
      ) : null,
    ctaBanner: ({value}: {value: CtaBannerValue}) => (
      <aside
        className="relative mt-12 overflow-hidden rounded-2xl bg-primary px-8 py-10 text-white"
        style={value.image?.asset?.url ? {backgroundImage: `linear-gradient(rgba(0,74,107,.82),rgba(0,74,107,.82)), url(${value.image.asset.url})`, backgroundSize: 'cover', backgroundPosition: 'center'} : undefined}
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
    // Imported raw HTML stays hidden until someone reviews it and ticks "Show on the page"
    htmlEmbed: ({value}: {value: {html?: string; show?: boolean}}) =>
      value?.show && value.html ? <div className="mt-8" dangerouslySetInnerHTML={{__html: value.html}} /> : null,
  },
}

/** Renders a Sanity rich text body with site typography. */
export function PortableBody({value}: {value: PortableTextBlock[]}) {
  return <PortableText value={value} components={components} />
}

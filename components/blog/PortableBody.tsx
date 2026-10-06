import Image from 'next/image'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImage} from '@/sanity/lib/types'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mt-6 text-lg leading-relaxed text-body">{children}</p>,
    h2: ({children}) => <h2 className="mt-12 text-3xl font-bold tracking-tight text-ink">{children}</h2>,
    h3: ({children}) => <h3 className="mt-10 text-2xl font-bold tracking-tight text-ink">{children}</h3>,
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
      <a href={value?.href} className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover">
        {children}
      </a>
    ),
  },
  types: {
    image: ({value}: {value: SanityImage}) => {
      if (!value?.asset) return null
      const dims = value.asset.metadata?.dimensions
      return (
        <figure className="mt-10">
          <Image
            src={urlFor(value).width(1600).fit('max').auto('format').url()}
            alt={value.alt ?? ''}
            width={dims?.width ?? 1600}
            height={dims?.height ?? 900}
            sizes="(min-width: 768px) 768px, 100vw"
            className="w-full rounded-xl"
          />
          {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
        </figure>
      )
    },
  },
}

/** Renders a Sanity rich text body with site typography. */
export function PortableBody({value}: {value: PortableTextBlock[]}) {
  return <PortableText value={value} components={components} />
}

import type {Metadata} from 'next'

/** Live site's default social image (SiteConfig "GlobalSocialSharingImage"), used when a page sets none */
const defaultOgImage = '/assets/iGUIDE-Meta-Thumbnail.png'

/** Main-site pages that have an Australian equivalent: [main path, AU path] */
const AU_PAIRS: [string, string][] = [
  ['/', '/au'],
  ['/residential-real-estate', '/au/residential-real-estate'],
  ['/real-estate-photography', '/au/real-estate-photography'],
]

/** hreflang alternates (en, en-AU, x-default) for a page in an AU pair; each page also lists itself */
function hreflang(path: string): Record<string, string> | undefined {
  const pair = AU_PAIRS.find(([main, au]) => path === main || path === au)
  return pair ? {en: pair[0], 'en-AU': pair[1], 'x-default': pair[0]} : undefined
}

/** Title, description, canonical and Open Graph for a static page (values copied from the live page). */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = defaultOgImage,
}: {
  title: string
  /** Left out when the live page has none */
  description?: string
  path: string
  ogImage?: string
}): Metadata {
  return {
    title,
    description,
    alternates: {canonical: path, languages: hreflang(path)},
    openGraph: {title, description, url: path, siteName: 'iGuide', locale: 'en_CA', type: 'website', images: [ogImage]},
    twitter: {card: 'summary_large_image', title, description, images: [ogImage]},
  }
}

/** Same as pageMetadata, for the Australia section (Open Graph locale en_AU). */
export function auPageMetadata(args: Parameters<typeof pageMetadata>[0]): Metadata {
  const m = pageMetadata(args)
  return {...m, openGraph: {...m.openGraph, locale: 'en_AU'}}
}

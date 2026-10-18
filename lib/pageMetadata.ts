import type {Metadata} from 'next'

/** Live site's default social image (SiteConfig "GlobalSocialSharingImage"), used when a page sets none */
const defaultOgImage = '/assets/iGUIDE-Meta-Thumbnail.png'

/** Title, description, canonical and Open Graph for a static page (values copied from the live page). */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = defaultOgImage,
}: {
  title: string
  description: string
  path: string
  ogImage?: string
}): Metadata {
  return {
    title,
    description,
    alternates: {canonical: path},
    openGraph: {title, description, url: path, siteName: 'iGuide', locale: 'en_CA', type: 'website', images: [ogImage]},
    twitter: {card: 'summary_large_image', title, description, images: [ogImage]},
  }
}

/** Same as pageMetadata, for the Australia section (Open Graph locale en_AU). */
export function auPageMetadata(args: Parameters<typeof pageMetadata>[0]): Metadata {
  const m = pageMetadata(args)
  return {...m, openGraph: {...m.openGraph, locale: 'en_AU'}}
}

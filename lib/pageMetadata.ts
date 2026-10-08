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
    openGraph: {title, description, url: path, siteName: 'iGUIDE', type: 'website', images: [ogImage]},
    twitter: {card: 'summary_large_image', title, description, images: [ogImage]},
  }
}

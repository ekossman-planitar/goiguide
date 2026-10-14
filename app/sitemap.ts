import type {MetadataRoute} from 'next'
import {getCatalogue} from '@/lib/catalogue'
import {adLandingPages, sitemapPages} from '@/lib/sitemapPages'
import {getResourceType, resourceTypeNames} from '@/lib/resourceTypes'
import {fetchSanity} from '@/sanity/lib/fetch'
import {SITEMAP_ENTRIES_QUERY} from '@/sanity/lib/queries'

const SITE = 'https://goiguide.com'

// Rebuilt at most once a minute so new Sanity entries appear without a deploy
export const revalidate = 60

type Entry = {_type: string; slug: string; catalogue?: string; lastModified?: string; image?: string}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await fetchSanity<Entry[]>(SITEMAP_ENTRIES_QUERY, [], {types: [...resourceTypeNames, 'catalogueItem']})

  const dynamic = entries.flatMap((e): MetadataRoute.Sitemap => {
    const base = e._type === 'catalogueItem' ? getCatalogue(e.catalogue ?? '')?.path : getResourceType(e._type)?.basePath
    if (!base) return []
    return [{url: `${SITE}${base}/${e.slug}`, lastModified: e.lastModified, images: e.image ? [e.image] : undefined}]
  })

  const excluded = new Set(adLandingPages)
  const pages = sitemapPages.filter((p) => !excluded.has(p)).map((p) => ({url: p === '/' ? SITE : `${SITE}${p}`}))

  return [...pages, ...dynamic]
}

import type {MetadataRoute} from 'next'
import {getCatalogue} from '@/lib/catalogue'
import {adLandingPages, sitemapPages} from '@/lib/sitemapPages'
import {getResourceType, resourceTypeNames} from '@/lib/resourceTypes'
import {fetchSanity} from '@/sanity/lib/fetch'
import {SITEMAP_ENTRIES_QUERY, SITEMAP_EVENTS_QUERY} from '@/sanity/lib/queries'
import {eventPath} from '@/lib/events'
import {articlePath, categoryPath, getArticles, getCategories, getSections, sectionPath} from '@/lib/help/zendesk'

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

  // Upcoming events only (past event pages are noindex)
  const events = await fetchSanity<{slug: string; lastModified?: string}[]>(SITEMAP_EVENTS_QUERY, [])
  const eventEntries = events.map((e) => ({url: `${SITE}${eventPath(e.slug)}`, lastModified: e.lastModified}))

  const excluded = new Set(adLandingPages)
  const pages = sitemapPages.filter((p) => !excluded.has(p)).map((p) => ({url: p === '/' ? SITE : `${SITE}${p}`}))

  // Help Center (/help): pages built from the Zendesk Help Center
  const help = await helpEntries()

  return [...pages, ...dynamic, ...eventEntries, ...help]
}

async function helpEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const [categories, sections, articles] = await Promise.all([getCategories(), getSections(), getArticles()])
    return [
      {url: `${SITE}/help`},
      ...categories.map((c) => ({url: `${SITE}${categoryPath(c)}`})),
      ...sections.map((s) => ({url: `${SITE}${sectionPath(s)}`})),
      ...articles.map((a) => ({url: `${SITE}${articlePath(a)}`, lastModified: a.edited_at})),
    ]
  } catch (error) {
    console.error('[sitemap] Help Center entries skipped', error)
    return [{url: `${SITE}/help`}]
  }
}

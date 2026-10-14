import {getResourceType} from './resourceTypes'
import type {ResourceCardData} from '@/sanity/lib/types'

/** Where a resource card links to, whether that's off-site, and its link label. */
export function resourceLink(item: ResourceCardData): {href: string; external: boolean; label: string} {
  const type = getResourceType(item._type)
  const page = `${type?.basePath ?? ''}/${item.slug ?? ''}`
  const linkType = item.linkType ?? (item.externalUrl ? 'external' : 'page')
  if (linkType === 'page' || !item.externalUrl) return {href: page, external: false, label: type?.linkLabel ?? 'Read more'}
  // Same labels as the live site's cards
  const labels = {external: 'View', video: 'Watch video', download: 'Download file', tour: 'View tour'} as const
  const label = item._type === 'webinar' ? 'Register now' : labels[linkType]
  // Files on goiguide.com still open in a new tab, like the live site
  return {href: item.externalUrl, external: true, label}
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/Toronto',
})

/** e.g. "September 28, 2026" (Toronto time, so server and browser agree). */
export function formatDate(iso?: string | null) {
  return iso ? dateFormat.format(new Date(iso)) : ''
}

import {getResourceType} from './resourceTypes'
import type {ResourceCardData} from '@/sanity/lib/types'

/** Where a resource card links to, and whether that's off-site. */
export function resourceLink(item: ResourceCardData): {href: string; external: boolean} {
  if (item._type === 'galleryItem' && item.tourUrl) return {href: item.tourUrl, external: true}
  if (item.externalUrl) return {href: item.externalUrl, external: true}
  const type = getResourceType(item._type)
  return {href: `${type?.basePath ?? ''}/${item.slug ?? ''}`, external: false}
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

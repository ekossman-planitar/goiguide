import {fetchSanity} from '@/sanity/lib/fetch'
import {ANNOUNCEMENTS_QUERY} from '@/sanity/lib/queries'
import type {Announcement} from '@/sanity/lib/types'
import {AnnouncementCarousel} from './AnnouncementCarousel'

/** Sitewide bar above the header. Renders nothing when no announcement is live. */
export async function AnnouncementBar() {
  const {items, fetchedAt} = await getAnnouncements()
  if (!items.length) return null
  return <AnnouncementCarousel items={items} renderedAt={fetchedAt} />
}

async function getAnnouncements() {
  const items = await fetchSanity<Announcement[]>(ANNOUNCEMENTS_QUERY, [])
  return {items, fetchedAt: Date.now()}
}

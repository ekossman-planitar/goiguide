import {fetchSanity} from '@/sanity/lib/fetch'
import {ANNOUNCEMENTS_QUERY} from '@/sanity/lib/queries'
import type {Announcement} from '@/sanity/lib/types'
import {AnnouncementCarousel} from './AnnouncementCarousel'

/**
 * Bar above the header on the main site, the Australia pages and (only for
 * messages that include them) paid-media landing pages. Each message's page
 * targeting is applied in the browser bar. Renders nothing when no announcement is live.
 */
export async function AnnouncementBar({landingPage = false}: {landingPage?: boolean}) {
  const {items, fetchedAt} = await getAnnouncements()
  if (!items.length) return null
  return <AnnouncementCarousel items={items} renderedAt={fetchedAt} landingPage={landingPage} />
}

async function getAnnouncements() {
  const items = await fetchSanity<Announcement[]>(ANNOUNCEMENTS_QUERY, [])
  return {items, fetchedAt: Date.now()}
}

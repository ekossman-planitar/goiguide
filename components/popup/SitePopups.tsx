import {fetchSanity} from '@/sanity/lib/fetch'
import {POPUPS_QUERY} from '@/sanity/lib/queries'
import {SitePopup} from './SitePopup'
import type {PopupData} from './types'

/** Loads pop-ups from Sanity (Studio → Pop-ups). Renders nothing when none are on. */
export async function SitePopups({landingPage = false}: Readonly<{landingPage?: boolean}>) {
  const popups = await fetchSanity<PopupData[]>(POPUPS_QUERY, [])
  if (!popups.length) return null
  return <SitePopup popups={popups} landingPage={landingPage} />
}

'use client'

import {useEffect, useSyncExternalStore} from 'react'

/**
 * USD / CAD switch in a landing page's in-page menu (live: REP showcase). Set to CAD it hides
 * everything marked US only (data-us-only, e.g. the iGuide Instant tour) via <html data-region="ca">.
 * ?showInstant=false opens the page on CAD, as on live.
 */
const root = () => document.documentElement

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(root(), {attributes: true, attributeFilter: ['data-region']})
  return () => observer.disconnect()
}

export function RegionSwitch() {
  const canadian = useSyncExternalStore(
    subscribe,
    () => root().dataset.region === 'ca',
    () => false,
  )

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('showInstant') === 'false') root().dataset.region = 'ca'
  }, [])

  return (
    <button
      type="button"
      aria-pressed={canadian}
      aria-label={canadian ? 'Showing Canadian options. Switch to US' : 'Showing US options. Switch to Canada'}
      onClick={() => {
        if (canadian) delete root().dataset.region
        else root().dataset.region = 'ca'
      }}
      className="text-link"
    >
      {canadian ? 'CAD' : 'USD'}
    </button>
  )
}

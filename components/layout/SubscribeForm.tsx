'use client'

import Script from 'next/script'
import {useCallback, useId} from 'react'

type HubSpotForms = {forms: {create: (options: Record<string, unknown>) => void}}

/**
 * The live site's HubSpot newsletter form, embedded the same way.
 * Submissions go straight from the browser to HubSpot; this site never sees them.
 * HubSpot's own CSS is turned off; styles live in globals.css (.subscribe-form).
 */
export function SubscribeForm({portalId, formId}: {portalId: string; formId: string}) {
  const targetId = `hs-subscribe-${useId().replace(/:/g, '')}`

  const create = useCallback(() => {
    const hbspt = (window as unknown as {hbspt?: HubSpotForms}).hbspt
    const target = document.getElementById(targetId)
    // Don't render twice (React strict mode / remounts)
    if (!hbspt || !target || target.childElementCount > 0) return
    hbspt.forms.create({portalId, formId, region: 'na1', target: `#${targetId}`, css: ''})
  }, [formId, portalId, targetId])

  return (
    <>
      <div id={targetId} className="subscribe-form min-h-[190px]" />
      <Script src="https://js.hsforms.net/forms/embed/v2.js" strategy="lazyOnload" onReady={create} />
    </>
  )
}

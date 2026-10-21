'use client'

import Script from 'next/script'
import {useCallback, useId} from 'react'

type HubSpotForms = {forms: {create: (options: Record<string, unknown>) => void}}

/** iGuide's HubSpot portal (same as the live site) */
const PORTAL_ID = '6828755'

/**
 * A HubSpot form embedded in the page, as on the live site. Submissions go
 * straight from the browser to HubSpot; this site never sees them.
 */
export function HubSpotForm({formId, className}: Readonly<{formId: string; className?: string}>) {
  const targetId = `hs-form-${useId().replaceAll(/:/g, '')}`

  const create = useCallback(() => {
    const hbspt = (globalThis as unknown as {hbspt?: HubSpotForms}).hbspt
    const target = document.getElementById(targetId)
    if (!hbspt || !target || target.childElementCount > 0) return
    hbspt.forms.create({portalId: PORTAL_ID, formId, region: 'na1', target: `#${targetId}`})
  }, [formId, targetId])

  return (
    <>
      <div id={targetId} className={className} />
      <Script src="https://js.hsforms.net/forms/embed/v2.js" strategy="lazyOnload" onReady={create} />
    </>
  )
}

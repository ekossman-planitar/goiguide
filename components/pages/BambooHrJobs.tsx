'use client'

import Script from 'next/script'

/**
 * BambooHR jobs board, embedded exactly as on the live /careers page
 * (BambooHR's script fills the #BambooHR div with the open positions).
 */
export function BambooHrJobs() {
  return (
    <div style={{paddingTop: '2%'}}>
      <div id="BambooHR" data-domain="planitar.bamboohr.com" data-version="1.0.0" data-departmentid="" />
      <Script src="https://planitar.bamboohr.com/js/embed.js" strategy="afterInteractive" />
    </div>
  )
}

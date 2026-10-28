'use client'

import {useEffect} from 'react'

const SCRIPT_SRC = 'https://planitar.bamboohr.com/js/embed.js'

/**
 * BambooHR jobs board, embedded as on the live /careers page (BambooHR's script fills the #BambooHR div with the
 * open positions). BambooHR's script only asks for the jobs when the document fires "readystatechange" while
 * loading, so if it arrives after the page has finished loading (as with a script added after hydration) it
 * renders nothing. We add the script after the page has hydrated and, if the page is already complete, fire that
 * event once so the jobs load.
 */
export function BambooHrJobs() {
  useEffect(() => {
    const target = document.getElementById('BambooHR')
    if (!target || target.childElementCount > 0 || document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => {
      if (document.readyState === 'complete') document.dispatchEvent(new Event('readystatechange'))
    }
    document.body.appendChild(script)
  }, [])

  return (
    <div style={{paddingTop: '2%'}}>
      <div id="BambooHR" data-domain="planitar.bamboohr.com" data-version="1.0.0" data-departmentid="" />
    </div>
  )
}

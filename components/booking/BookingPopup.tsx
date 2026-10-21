'use client'

import {useEffect} from 'react'

/**
 * "Book a demo" pop-up, ported from the live site's theme script (checked 2026-10-14).
 *
 * - Any element with class `openCalendly` or `book-demo` opens the Calendly
 *   scheduling pop-up (the link's own href, /book-a-demo, is the fallback if
 *   scripts are blocked).
 * - `?demo=true` on any URL opens it on page load (`&country=` prefills Calendly's country answer).
 * - After a booking, a hidden HubSpot form is submitted from the visitor's
 *   browser with the booking email (when Calendly provides it), UTM tags, first
 *   referrer and page URL — exactly as on live. This site's server never sees it.
 */
const CALENDLY_BASE_URL = 'https://calendly.com/d/crzd-s6g-v5b?hide_gdpr_banner=1&text_color=000000&primary_color=2e2c30'
const BUTTON_SELECTOR = '.openCalendly, .book-demo'
const HUBSPOT_PORTAL_ID = '6828755'
const HUBSPOT_FORM_ID = 'be68b69a-fff5-46a0-8dbc-f72dbbb5938f'

type CalendlyApi = {initPopupWidget: (options: {url: string; utm?: Record<string, string>}) => void}
const calendly = () => (window as unknown as {Calendly?: CalendlyApi}).Calendly

const storage = {
  get: (key: string) => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* private mode */
    }
  },
}

let calendlyLoad: Promise<void> | null = null
function loadCalendly() {
  if (calendlyLoad) return calendlyLoad
  calendlyLoad = new Promise((resolve, reject) => {
    if (calendly()) return resolve()
    if (!document.querySelector('link[data-calendly-widget-css]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.dataset.calendlyWidgetCss = 'true'
      document.head.appendChild(link)
    }
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.dataset.calendlyWidgetJs = 'true'
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })
  return calendlyLoad
}

function addPreconnects() {
  for (const href of ['https://assets.calendly.com', 'https://calendly.com']) {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    document.head.appendChild(link)
  }
}

let hubspotLoad: Promise<HTMLFormElement> | null = null
function loadHubSpotUtmForm() {
  if (hubspotLoad) return hubspotLoad
  hubspotLoad = new Promise((resolve, reject) => {
    let container = document.getElementById('hubspot-utm-form')
    if (!container) {
      const wrapper = document.createElement('div')
      wrapper.style.display = 'none'
      wrapper.innerHTML = `<div id="hubspot-utm-form" class="hs-form-html" data-region="na1" data-form-id="${HUBSPOT_FORM_ID}" data-portal-id="${HUBSPOT_PORTAL_ID}"></div>`
      document.body.appendChild(wrapper)
      container = document.getElementById('hubspot-utm-form')!
    }
    const waitForForm = (retries = 40) => {
      const form = container!.querySelector('form')
      if (form) return resolve(form)
      if (retries <= 0) return reject(new Error('HubSpot UTM form did not render in time'))
      setTimeout(() => waitForForm(retries - 1), 250)
    }
    if (document.querySelector('script[data-hubspot-developer-embed]')) return waitForForm()
    const script = document.createElement('script')
    script.src = `https://js.hsforms.net/forms/embed/developer/${HUBSPOT_PORTAL_ID}.js`
    script.defer = true
    script.dataset.hubspotDeveloperEmbed = 'true'
    script.onload = () => waitForForm()
    script.onerror = reject
    document.body.appendChild(script)
  })
  return hubspotLoad
}

function utmParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    utm_campaign: params.get('utm_campaign') || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    referrer: storage.get('first_referrer') || '',
  }
}

function trackingFields(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  return {
    '0-1/utm_source_calendly': params.get('utm_source') || '',
    '0-1/utm_medium_calendly': params.get('utm_medium') || '',
    '0-1/utm_campaign_calendly': params.get('utm_campaign') || '',
    '0-1/utm_property_calendly': params.get('utm_content') || '',
    '0-1/utm_term_calendly': params.get('utm_term') || '',
    '0-1/referrer': storage.get('first_referrer') || '',
    '0-1/page_url': window.location.href,
  }
}

function submitUtmForm(form: HTMLFormElement, email: string) {
  const set = (name: string, value: string) => {
    const input = form.querySelector<HTMLInputElement>(`[name="${name}"]`)
    if (!input || !value) return
    input.value = value
    input.dispatchEvent(new Event('input', {bubbles: true}))
  }
  set('0-1/email', email)
  for (const [name, value] of Object.entries(trackingFields())) set(name, value)
  setTimeout(() => form.submit(), 300)
}

/** Reading a layout property forces a reflow so the following style change animates. */
function forceReflow(el: HTMLElement) {
  return el.offsetWidth
}

async function openPopup(url = CALENDLY_BASE_URL) {
  try {
    await loadCalendly()
    loadHubSpotUtmForm().catch(() => {})
    calendly()?.initPopupWidget({url, utm: utmParams()})
  } catch (error) {
    console.error('Failed to load Calendly widget', error)
  }
}

export function BookingPopup() {
  useEffect(() => {
    if (!storage.get('first_referrer')) storage.set('first_referrer', document.referrer || 'direct')
    if (document.querySelector(BUTTON_SELECTOR)) addPreconnects()

    // Event delegation, so buttons rendered later work too
    const onClick = (e: MouseEvent) => {
      const button = (e.target as Element | null)?.closest?.(BUTTON_SELECTOR)
      if (!button) return
      e.preventDefault()
      openPopup()
    }
    const prefetch = (e: Event) => {
      if ((e.target as Element | null)?.closest?.(BUTTON_SELECTOR)) {
        addPreconnects()
        loadCalendly().catch(() => {})
      }
    }
    const onMessage = (e: MessageEvent) => {
      if (e.data?.event !== 'calendly.event_scheduled') return
      // Live: hide the pop-up and show the thank-you screen
      document.querySelector<HTMLElement>('.calendly-popup')?.style.setProperty('display', 'none')
      document.querySelector<HTMLElement>('.calendly-overlay')?.style.setProperty('display', 'none')
      const confirmation = document.getElementById('custom-confirmation')
      const progress = document.getElementById('progress-bar')
      if (confirmation) {
        confirmation.style.display = 'flex'
        forceReflow(confirmation)
        confirmation.style.opacity = '1'
        if (progress) {
          forceReflow(progress)
          progress.style.width = '100%'
        }
      }
      const email = e.data?.payload?.invitee?.email || ''
      loadHubSpotUtmForm()
        .then((form) => submitUtmForm(form, email))
        .catch((error) => console.error('Failed to submit HubSpot UTM form after Calendly booking', error))
    }

    document.addEventListener('click', onClick)
    document.addEventListener('pointerover', prefetch, {passive: true})
    document.addEventListener('focusin', prefetch)
    window.addEventListener('message', onMessage)

    // ?demo=true opens the pop-up on load (live: 500 ms after load)
    const params = new URLSearchParams(window.location.search)
    let timer: ReturnType<typeof setTimeout> | undefined
    if (params.get('demo') === 'true') {
      let url = 'https://calendly.com/d/crzd-s6g-v5b?hide_gdpr_banner=1&text_color=000000&primary_color=2e2c30'
      const country = params.get('country')
      if (country) url += `&a4=${encodeURIComponent(country)}`
      timer = setTimeout(() => openPopup(url), 500)
    }

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', onClick)
      document.removeEventListener('pointerover', prefetch)
      document.removeEventListener('focusin', prefetch)
      window.removeEventListener('message', onMessage)
    }
  }, [])

  return (
    <div
      id="custom-confirmation"
      role="status"
      aria-live="polite"
      style={{display: 'none', opacity: 0, transition: 'opacity 0.3s ease'}}
      className="fixed inset-0 z-[9999] flex-col items-center justify-center bg-white text-center"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-line">
        <div id="progress-bar" className="h-full bg-primary" style={{width: '0%', transition: 'width 3s linear'}} />
      </div>
      <div className="p-8">
        <h3 className="mb-4 text-2xl font-semibold text-ink">Thanks! You&apos;re booked.</h3>
        <p>We&apos;ll follow up with you shortly. Check your inbox for confirmation.</p>
      </div>
    </div>
  )
}

'use client'

import {useEffect, useRef, useState} from 'react'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {SmartLink} from '@/components/ui/SmartLink'
import {CloseIcon} from '@/components/ui/icons'

/** "Get in touch" form shown by "I'm just looking to learn more" (live: HubSpot form in a lightbox) */
const LEARN_MORE_FORM_ID = 'ab373579-0755-4f0f-a53c-a04f1ff89266'

/** Live /book-a-demo opens this Calendly URL when arriving with ?openCalendly=true from goiguide.com */
const OPEN_CALENDLY_URL =
  'https://calendly.com/d/crzd-s6g-v5b?hide_gdpr_banner=1&text_color=000000&primary_color=2e2c30&hide_landing_page_details=1'

type CalendlyApi = {initPopupWidget: (options: {url: string}) => void}

const buttonBase =
  'inline-flex w-full max-w-[500px] items-center justify-center rounded-lg border px-6 py-3 text-base leading-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * The "What would you like to do?" card from the live /book-a-demo page.
 * - "I’d like to book a personalized demo" keeps the live `book-demo` class, so the
 *   site-wide BookingPopup opens Calendly (and GTM triggers keep matching).
 * - "I'm just looking to learn more" opens the HubSpot "Get in touch" form; it also
 *   opens when the URL hash is #learn-more, as on live.
 */
export function BookADemoChoice() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const check = () => {
      if (window.location.hash === '#learn-more') setOpen(true)
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <h2 className="text-2xl font-semibold text-ink">What would you like to do?</h2>
      <div className="mt-6 flex flex-col items-center gap-3">
        <SmartLink href="/book-a-demo" className={`book-demo ${buttonBase} border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover`}>
          I’d like to book a personalized demo
        </SmartLink>
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            window.location.hash = 'learn-more'
          }}
          className={`toggle-mle-lightbox ${buttonBase} border-primary bg-white text-primary hover:border-primary-hover hover:text-primary-hover`}
        >
          I&apos;m just looking to learn more
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-labelledby="learn-more-heading"
        className="mle-lightbox m-auto w-[calc(100%-2rem)] max-w-4xl bg-white p-0 text-left shadow-xl backdrop:bg-black/50"
      >
        <div className="relative p-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="lightbox-close-button absolute top-3 right-3 text-black hover:opacity-60"
            aria-label="Close"
          >
            <CloseIcon width={24} height={24} />
          </button>
          <h3 id="learn-more-heading" className="mb-4 text-2xl font-semibold text-ink">
            Get in touch
          </h3>
          {open && <HubSpotForm formId={LEARN_MORE_FORM_ID} />}
        </div>
      </dialog>
    </div>
  )
}

/**
 * Live behaviour: arriving on /book-a-demo?openCalendly=true from another
 * goiguide.com page opens the Calendly pop-up straight away.
 */
export function OpenCalendlyFromParam() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fromSite = document.referrer.includes('https://goiguide.com/') || document.referrer.startsWith(`${window.location.origin}/`)
    if (params.get('openCalendly') !== 'true' || !fromSite) return
    const open = () => (window as unknown as {Calendly?: CalendlyApi}).Calendly?.initPopupWidget({url: OPEN_CALENDLY_URL})
    if ((window as unknown as {Calendly?: CalendlyApi}).Calendly) return void open()
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = open
    document.body.appendChild(script)
  }, [])

  return null
}

/** Live: round "book" button fixed to the corner once the page is scrolled (class book-demo). */
export function FloatingDemoButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <SmartLink
      href="/book-a-demo"
      aria-label="Book your personalized product tour"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={`book-demo fixed-button fixed right-6 bottom-6 z-40 inline-flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-primary text-white shadow-sm transition-opacity hover:bg-primary-hover ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Calendar icon (live: Material Symbols "event") */}
      <svg aria-hidden width="24" height="24" viewBox="0 -960 960 960" fill="currentColor">
        <path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
      </svg>
    </SmartLink>
  )
}

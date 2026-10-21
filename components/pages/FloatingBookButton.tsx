'use client'

import {useEffect, useState} from 'react'
import {SmartLink} from '@/components/ui/SmartLink'
import {cn} from '@/lib/cn'

/**
 * Fixed "Book your personalized product tour" button that fades in once the
 * visitor scrolls past 100px (as on live /iguide-holmes-approved). It keeps the
 * live `openCalendly` class, so the site-wide booking pop-up and GTM triggers match.
 */
export function FloatingBookButton({label = 'Book your personalized product tour'}: Readonly<{label?: string}>) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(globalThis.scrollY > 100)
    onScroll()
    globalThis.addEventListener('scroll', onScroll, {passive: true})
    return () => globalThis.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <SmartLink
      href="/book-a-demo"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        'openCalendly fixed-button fixed right-5 bottom-4 z-[9998] inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-base font-semibold whitespace-nowrap text-white shadow-lg transition-opacity duration-300 hover:bg-primary-hover max-md:right-auto max-md:left-1/2 max-md:-translate-x-1/2',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M14.5 18q-1.05 0-1.775-.725T12 15.5t.725-1.775T14.5 13t1.775.725T17 15.5t-.725 1.775T14.5 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z" />
      </svg>
      {label}
    </SmartLink>
  )
}

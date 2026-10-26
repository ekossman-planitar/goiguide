'use client'

import {CalendarDays} from 'lucide-react'
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
      <CalendarDays aria-hidden width={20} height={20} />
      {label}
    </SmartLink>
  )
}

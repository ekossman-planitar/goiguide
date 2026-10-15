'use client'

import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {PortableText} from 'next-sanity'
import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react'
import {cn} from '@/lib/cn'
import {DEFAULT_COLOURS, inSchedule, showsOnPath} from '@/lib/popup/rules'
import {urlFor} from '@/sanity/lib/image'
import {Countdown} from './Countdown'
import type {PopupData} from './types'

/*
 * Site pop-up (Studio → Pop-ups). One shows at a time: the first by priority that
 * is inside its schedule, targets this page and hasn't been closed recently.
 * Remembering a close uses this browser's storage only (no cookies, nothing sent).
 * Testing: add ?popup-preview=<document id> to any URL to open a pop-up straight
 * away, ignoring its schedule, pages and "closed" memory (it must be on and published).
 * GTM hooks: #site-popup (data-popup = name), .site-popup-cta, .site-popup-image-link, .site-popup-close
 */

const CLOSED_KEY = (id: string) => `iguide-popup-closed:${id}`
const DAY = 86_400_000

function store(kind: 'local' | 'session') {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

function recentlyClosed(p: PopupData, now: number): boolean {
  const freq = p.frequency ?? 'days'
  if (freq === 'session') return !!store('session')?.getItem(CLOSED_KEY(p._id))
  const at = Number(store('local')?.getItem(CLOSED_KEY(p._id)) || 0)
  if (!at) return false
  if (freq === 'never') return true
  return now - at < (p.frequencyDays ?? 7) * DAY
}

function rememberClosed(p: PopupData) {
  try {
    store('local')?.setItem(CLOSED_KEY(p._id), String(Date.now()))
    store('session')?.setItem(CLOSED_KEY(p._id), '1')
  } catch {
    /* storage full or blocked: the pop-up may show again, which is fine */
  }
}

/** Image builder input: reference by asset id so crop and hotspot apply */
const source = (img: PopupData['image']) => ({asset: {_ref: img?.asset?._id ?? ''}, crop: img?.crop, hotspot: img?.hotspot}) as never

const countdownOver = (p: PopupData, now: number) => !!p.countdown?.endsAt && Date.parse(p.countdown.endsAt) <= now

function pick(popups: PopupData[], path: string, landingPage: boolean, now: number): PopupData | undefined {
  return popups.find(
    (p) =>
      inSchedule(p.startAt, p.endAt, now) &&
      !(p.countdown?.hidePopupWhenDone && countdownOver(p, now)) &&
      showsOnPath(p, path, landingPage) &&
      !recentlyClosed(p, now),
  )
}

export function SitePopup({popups, landingPage}: {popups: PopupData[]; landingPage: boolean}) {
  const pathname = usePathname()
  const [popup, setPopup] = useState<PopupData>()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)

  // Choose the pop-up for this page and wait for its trigger
  useEffect(() => {
    const previewId = new URLSearchParams(window.location.search).get('popup-preview')
    const preview = previewId ? popups.find((p) => p._id === previewId) : undefined
    const chosen = preview ?? pick(popups, pathname, landingPage, Date.now())
    if (!chosen) return

    let done = false
    const show = () => {
      if (done) return
      done = true
      setPopup(chosen)
      setOpen(true)
      cleanup()
    }
    const listeners: (() => void)[] = []
    const cleanup = () => listeners.splice(0).forEach((off) => off())

    if (preview) {
      show()
      return cleanup
    }
    const trigger = chosen.trigger ?? 'delay'
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (trigger === 'scroll') {
      const pct = (chosen.scrollPercent ?? 40) / 100
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (max <= 0 || window.scrollY / max >= pct) show()
      }
      window.addEventListener('scroll', onScroll, {passive: true})
      listeners.push(() => window.removeEventListener('scroll', onScroll))
      onScroll()
    } else if (trigger === 'exit' && desktop) {
      const onOut = (e: MouseEvent) => {
        if (!e.relatedTarget && e.clientY <= 0) show()
      }
      document.addEventListener('mouseout', onOut)
      listeners.push(() => document.removeEventListener('mouseout', onOut))
    } else {
      const timer = window.setTimeout(show, Math.max(0, chosen.delaySeconds ?? 5) * 1000)
      listeners.push(() => window.clearTimeout(timer))
    }
    return cleanup
  }, [popups, pathname, landingPage])

  useEffect(() => {
    const dialog = ref.current
    if (open && dialog && !dialog.open) dialog.showModal()
  }, [open])

  const close = useCallback(() => {
    if (popup) rememberClosed(popup)
    ref.current?.close()
    setOpen(false)
  }, [popup])

  if (!popup || !open) return null
  return (
    <dialog
      ref={ref}
      id="site-popup"
      data-popup={popup.name ?? undefined}
      aria-label={popup.layout === 'image' ? (popup.image?.alt ?? 'Offer') : (popup.title ?? 'Offer')}
      onClose={() => {
        rememberClosed(popup)
        setOpen(false)
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      className="m-auto max-h-[92vh] w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 backdrop:bg-black/60"
      style={{maxWidth: popup.layout === 'image' ? 720 : 920}}
    >
      <div className="relative">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="site-popup-close absolute -top-3 -right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-2xl leading-none text-ink shadow-lg hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span aria-hidden>×</span>
        </button>
        {popup.layout === 'image' ? <ImagePopup popup={popup} onLinkClick={close} /> : <SplitPopup popup={popup} onCta={close} onExpire={close} />}
      </div>
    </dialog>
  )
}

function ImagePopup({popup, onLinkClick}: {popup: PopupData; onLinkClick: () => void}) {
  const img = popup.image!
  const dims = img.asset?.metadata?.dimensions
  const picture = (
    <Image
      src={urlFor(source(img)).width(1440).fit('max').auto('format').url()}
      alt={img.alt ?? ''}
      width={dims?.width ?? 1000}
      height={dims?.height ?? 1000}
      sizes="(min-width: 768px) 720px, 100vw"
      className="block h-auto max-h-[88vh] w-full rounded-2xl object-contain"
    />
  )
  if (!popup.imageLink) return picture
  const external = /^https?:\/\//.test(popup.imageLink) && !popup.imageLink.includes('goiguide.com')
  return (
    <a
      href={popup.imageLink}
      onClick={onLinkClick}
      className="site-popup-image-link block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
    >
      {picture}
    </a>
  )
}

function SplitPopup({popup, onCta, onExpire}: {popup: PopupData; onCta: () => void; onExpire: () => void}) {
  const bg = popup.backgroundColour || DEFAULT_COLOURS.background
  const text = popup.textColour || DEFAULT_COLOURS.text
  const highlight = popup.highlightColour || DEFAULT_COLOURS.highlight
  const [timerDone, setTimerDone] = useState(false)
  const b = popup.button
  const custom = !!(b?.background || b?.textColour)
  const buttonStyle: CSSProperties | undefined = custom
    ? {background: b?.background || undefined, borderColor: b?.background || undefined, color: b?.textColour || undefined}
    : undefined

  return (
    <div className="grid overflow-hidden rounded-2xl shadow-2xl md:grid-cols-2" style={{background: bg, color: text}}>
      <div className={cn('relative h-48 sm:h-64 md:h-auto md:min-h-[440px]', popup.imageSide === 'right' && 'md:order-2')}>
        <Image
          src={urlFor(source(popup.image)).width(920).height(1000).fit('crop').auto('format').url()}
          alt={popup.image?.alt ?? ''}
          fill
          sizes="(min-width: 768px) 460px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center p-7 md:p-10">
        {popup.title && <h2 className="text-3xl leading-tight font-semibold md:text-4xl">{popup.title}</h2>}
        {popup.description?.length ? (
          <div className="mt-4 space-y-3 text-lg leading-7">
            <PortableText
              value={popup.description}
              components={{marks: {strong: ({children}) => <strong style={{color: highlight}} className="font-bold">{children}</strong>}}}
            />
          </div>
        ) : null}
        {popup.countdown?.endsAt && !timerDone && (
          <Countdown
            endsAt={popup.countdown.endsAt}
            label={popup.countdown.label || 'Offer ends in'}
            colour={highlight}
            onDone={() => (popup.countdown?.hidePopupWhenDone ? onExpire() : setTimerDone(true))}
          />
        )}
        {b?.label && (b.href || b.openBooking) && (
          <a
            href={b.openBooking ? '/book-a-demo' : b.href!}
            onClick={onCta}
            style={buttonStyle}
            className={cn(
              'site-popup-cta mt-7 inline-flex items-center justify-center self-start rounded-lg border px-6 py-3 text-base leading-6 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
              b.openBooking && 'openCalendly',
              custom ? 'hover:opacity-85' : 'border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover',
            )}
            {...(b.newTab && !b.openBooking ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
          >
            {b.label}
          </a>
        )}
      </div>
    </div>
  )
}

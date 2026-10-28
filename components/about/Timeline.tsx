'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronLeft, ChevronRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {Modal} from './Modal'

export type Milestone = {
  /** Year, or leave out while it is still to be confirmed */
  year?: string
  title: string
  copy: string
  /** Shows a "New" tag and a dark card. Put the newest entry last. */
  isNew?: boolean
  /** Kept in the data but not shown (the "Coming soon" slot) */
  hidden?: boolean
  /** Optional photo or logo, shown in a modal opened from the card */
  media?: {src: string; alt: string; width: number; height: number}
  /** Optional link (e.g. the news post) */
  link?: {label: string; href: string}
}

const STEP_MS = 1800
const ctrl =
  'flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary transition-colors hover:border-primary-hover hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50'

/**
 * Milestones as a journey: a red line travels from one milestone to the next while the strip scrolls to keep the
 * current one centred. It plays by itself once on screen, pauses while the pointer is over it, stops as soon as the visitor clicks, and can be driven
 * with the dots or arrows. Entries come from data, so Marketing can add one without touching the layout.
 */
export function Timeline({milestones}: Readonly<{milestones: Milestone[]}>) {
  const shown = milestones.filter((m) => !m.hidden)
  const last = shown.length - 1
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [open, setOpen] = useState<Milestone | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) setPlaying(false)
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        // Leaving the section re-arms the journey: it plays again from the start next time it scrolls into view
        if (!entry.isIntersecting) {
          setPlaying(!reduced.current)
          setActive(0)
        }
      },
      {threshold: 0.5},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Autoplay: step along the journey, then stop at the end
  useEffect(() => {
    if (!playing || !inView || hovering || active >= last) return
    const timer = setTimeout(() => setActive((i) => Math.min(i + 1, last)), STEP_MS)
    return () => clearTimeout(timer)
  }, [playing, inView, hovering, active, last])

  // Keep the current milestone centred (scrolls the strip only, never the page)
  useEffect(() => {
    const track = trackRef.current
    const card = cardRefs.current[active]
    if (!track || !card) return
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2
    track.scrollTo({left: Math.max(0, left), behavior: reduced.current ? 'auto' : 'smooth'})
  }, [active])

  const go = useCallback(
    (i: number) => {
      setPlaying(false)
      setActive(Math.min(Math.max(i, 0), last))
    },
    [last],
  )

  return (
    <div ref={wrapRef} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <div ref={trackRef} className="-mx-4 overflow-x-auto px-4 pt-3 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ol className="flex w-max">
          {shown.map((m, i) => {
            const past = i < active
            const current = i === active
            return (
              <li key={m.title} ref={(el) => void (cardRefs.current[i] = el)} className="w-[280px] shrink-0 md:w-[340px]">
                {/* Dot and the line to the next milestone */}
                <div className="relative flex h-8 items-center">
                  {i < last && (
                    <>
                      <span aria-hidden className="absolute top-1/2 right-0 left-4 h-0.5 -translate-y-1/2 bg-line" />
                      <span
                        aria-hidden
                        className={cn(
                          'absolute top-1/2 right-0 left-4 h-0.5 -translate-y-1/2 origin-left bg-rea-red transition-transform duration-[1200ms] ease-in-out',
                          past ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to ${m.year ?? 'year TBC'}: ${m.title}`}
                    aria-current={current ? 'step' : undefined}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {current && <span aria-hidden className="absolute h-8 w-8 animate-ping rounded-full bg-rea-red/30" />}
                    <span
                      aria-hidden
                      className={cn(
                        'relative block rounded-full border-2 transition-all duration-500',
                        current ? 'h-6 w-6 border-rea-red bg-rea-red' : past ? 'h-4 w-4 border-rea-red bg-rea-red' : 'h-4 w-4 border-line bg-white',
                      )}
                    />
                  </button>
                </div>

                {/* Card (the track's right padding doubles as the gap to the next card) */}
                <div className="pr-6">
                  <div
                    onClick={() => go(i)}
                    className={cn(
                      'mt-4 flex min-h-[230px] cursor-pointer flex-col rounded-2xl border p-6 transition-all duration-500',
                      m.isNew ? 'border-primary bg-primary text-white' : 'border-line bg-white',
                      current ? '-translate-y-2 shadow-lg' : 'shadow-card',
                      !current && !past && 'opacity-60',
                      current && !m.isNew && 'border-primary',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <p className={cn('leading-none font-bold', m.year ? 'text-5xl' : 'text-2xl', m.isNew ? 'text-white' : m.year ? 'text-ink' : 'text-muted')}>{m.year ?? 'Year TBC'}</p>
                      {m.isNew && <span className="rounded-full bg-white px-3 py-1 text-xs leading-[18px] font-semibold text-ink">New</span>}
                    </div>
                    <h3 className={cn('type-heading-sm mt-4', m.isNew ? 'text-white' : 'text-ink')}>{m.title}</h3>
                    <p className={cn('type-body mt-2 flex-1', m.isNew ? 'text-white' : 'text-body')}>{m.copy}</p>
                    {m.media && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          go(i)
                          setOpen(m)
                        }}
                        className={cn('text-link mt-4 w-fit', m.isNew && 'text-white')}
                      >
                        See more
                        <ArrowRight width={16} height={16} />
                      </button>
                    )}
                    {!m.media && m.link && (
                      <SmartLink href={m.link.href} onClick={(e) => e.stopPropagation()} className={cn('text-link mt-4 w-fit', m.isNew && 'text-white')}>
                        {m.link.label}
                        <ArrowRight width={16} height={16} />
                      </SmartLink>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button type="button" aria-label="Previous milestone" onClick={() => go(active - 1)} disabled={active === 0} className={ctrl}>
          <ChevronLeft width={20} height={20} />
        </button>
        <button type="button" aria-label="Next milestone" onClick={() => go(active + 1)} disabled={active >= last} className={ctrl}>
          <ChevronRight width={20} height={20} />
        </button>
        <p className="type-small ml-2 text-muted" aria-live="polite">
          {active + 1} of {shown.length}
        </p>
      </div>

      <Modal open={open !== null} onClose={() => setOpen(null)} label={open?.title ?? 'Milestone'} className="max-w-2xl">
        {open?.media && (
          <div className="p-6 sm:p-8">
            <FallbackImage src={open.media.src} alt={open.media.alt} width={open.media.width} height={open.media.height} className="h-auto max-h-[360px] w-full rounded-xl bg-surface object-contain" fallback={null} />
            <p className="type-body mt-6 text-muted">{open.year ?? 'Year TBC'}</p>
            <h3 className="type-heading-md mt-1 text-ink">{open.title}</h3>
            <p className="type-body mt-3 text-body">{open.copy}</p>
            {open.link && (
              <SmartLink href={open.link.href} className="text-link mt-5">
                {open.link.label}
                <ArrowRight width={16} height={16} />
              </SmartLink>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

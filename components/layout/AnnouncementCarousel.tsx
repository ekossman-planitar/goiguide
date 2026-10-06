'use client'

import {useEffect, useMemo, useState} from 'react'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronLeft, ChevronRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import type {Announcement} from '@/sanity/lib/types'

const AUTOPLAY_MS = 6000
// Browsers cap setTimeout at ~24.8 days
const MAX_TIMEOUT = 2_147_483_647

function isLive(item: Announcement, now: number) {
  const started = !item.startAt || Date.parse(item.startAt) <= now
  const notEnded = !item.endAt || Date.parse(item.endAt) > now
  return started && notEnded
}

type Props = {
  items: Announcement[]
  /** Server render time, so the first client render matches the HTML. */
  renderedAt: number
}

/**
 * Shows live announcements. One = static bar, several = auto-rotating slides
 * with arrows. Rechecks the schedule exactly when a message starts or ends,
 * and hides the bar entirely when nothing is live.
 */
export function AnnouncementCarousel({items, renderedAt}: Props) {
  const [now, setNow] = useState(renderedAt)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const live = useMemo(() => items.filter((item) => isLive(item, now)), [items, now])
  const count = live.length
  const current = count ? index % count : 0

  // Sync to the real clock on mount, then wake up at the next start/end time
  useEffect(() => {
    const upcoming = items
      .flatMap((item) => [item.startAt, item.endAt])
      .filter((t): t is string => Boolean(t))
      .map((t) => Date.parse(t))
      .filter((t) => t > now)
    const nextChange = upcoming.length ? Math.min(...upcoming) : null
    const delay = now === renderedAt ? 0 : nextChange ? Math.min(nextChange - Date.now() + 50, MAX_TIMEOUT) : null
    if (delay === null) return
    const timer = setTimeout(() => setNow(Date.now()), Math.max(delay, 0))
    return () => clearTimeout(timer)
  }, [items, now, renderedAt])

  // Auto-advance when there is more than one message
  useEffect(() => {
    if (count < 2 || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIndex((i) => i + 1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [count, paused])

  if (!count) return null

  const go = (delta: number) => setIndex((i) => (((i + delta) % count) + count) % count)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Announcements"
      className="relative bg-announce text-white"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto flex h-10 max-w-[1320px] items-center px-2 sm:px-4">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous announcement"
            className="shrink-0 rounded p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft />
          </button>
        )}

        <div className="relative h-full min-w-0 flex-1 overflow-hidden" aria-live={paused ? 'polite' : 'off'}>
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{transform: `translateX(-${current * 100}%)`}}
          >
            {live.map((item, i) => {
              const hidden = i !== current
              return (
                <div
                  key={item._id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={hidden}
                  inert={hidden}
                  className="flex h-full w-full shrink-0 items-center justify-center px-2 text-center text-sm"
                >
                  <p className="truncate">
                    <span>{item.message}</span>
                    {item.link?.href && item.link.label && (
                      <SmartLink
                        href={item.link.href}
                        className="ml-2 inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline"
                      >
                        {item.link.label}
                        <ArrowRight width={14} height={14} />
                      </SmartLink>
                    )}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {count > 1 && (
          <>
            <span className="sr-only">
              Announcement {current + 1} of {count}
            </span>
            <div className="mx-1 hidden items-center gap-1.5 sm:flex" aria-hidden>
              {live.map((item, i) => (
                <span
                  key={item._id}
                  className={cn('h-1.5 rounded-full bg-white transition-all', i === current ? 'w-4' : 'w-1.5 opacity-40')}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next announcement"
              className="shrink-0 rounded p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>
    </section>
  )
}

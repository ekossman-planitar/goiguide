'use client'

import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react'
import {ChevronLeft, ChevronRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'

const arrow =
  'flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary transition-colors hover:border-primary-hover hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50'

/**
 * Horizontal scroll-snap strip with previous / next buttons. Scrollable by touch, trackpad,
 * keyboard (the strip takes focus) and the buttons. Children must be fixed-width items.
 */
export function ScrollRail({
  label,
  children,
  className,
  trackClassName,
  arrows = 'below',
}: Readonly<{label: string; children: ReactNode; className?: string; trackClassName?: string; /** Buttons under the strip, or on its left and right edges */ arrows?: 'below' | 'sides'}>) {
  const ref = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({start: true, end: false})

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdge({start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4})
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const reduced = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({left: dir * el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth'})
  }

  return (
    <div className={cn(arrows === 'sides' && 'relative', className)}>
      <div
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label={label}
        className={cn(
          '-mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:hidden',
          trackClassName,
        )}
      >
        {children}
      </div>
      <div className={arrows === 'sides' ? 'pointer-events-none absolute inset-x-2 top-[calc(50%-1rem)] flex -translate-y-1/2 justify-between' : 'mt-6 flex gap-3'}>
        <button type="button" aria-label="Previous" onClick={() => go(-1)} disabled={edge.start} className={cn(arrow, arrows === 'sides' && 'pointer-events-auto shadow-lg')}>
          <ChevronLeft width={20} height={20} />
        </button>
        <button type="button" aria-label="Next" onClick={() => go(1)} disabled={edge.end} className={cn(arrow, arrows === 'sides' && 'pointer-events-auto shadow-lg')}>
          <ChevronRight width={20} height={20} />
        </button>
      </div>
    </div>
  )
}

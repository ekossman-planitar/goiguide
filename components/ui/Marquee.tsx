'use client'

import {useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode} from 'react'
import {cn} from '@/lib/cn'

type Props = {
  /** One element per item. Keys come from `itemKeys`. */
  items: ReactNode[]
  itemKeys: string[]
  /** Autoplay speed in pixels per second. */
  speed?: number
  /** Space between items, in px. */
  gap?: number
  /** Item width from the visible strip width (e.g. 3 per view). Omit to size items by their content. */
  itemWidth?: (viewportWidth: number) => number
  /** Accessible name for the strip. */
  label: string
  /** Allow dragging with mouse or touch (default true). */
  draggable?: boolean
  className?: string
}

/** Pixels the pointer must move before a press becomes a drag (so links still click). */
const DRAG_THRESHOLD = 6

/**
 * Endless, auto-scrolling strip. Pauses on hover and while focused, can be
 * dragged with mouse or touch, and stops autoplaying when the user prefers
 * reduced motion. Duplicate copies are hidden from screen readers and keyboard.
 */
export function Marquee({items, itemKeys, speed = 40, gap = 0, itemWidth, label, draggable = true, className}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)

  const offset = useRef(0)
  const setWidth = useRef(0)
  const paused = useRef(false)
  const press = useRef<{pointerId: number; startX: number; startOffset: number; dragging: boolean} | null>(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)
  const [copies, setCopies] = useState(2)
  const [width, setWidthState] = useState<number | undefined>(undefined)

  const apply = useCallback(() => {
    const w = setWidth.current
    if (w > 0) offset.current = ((offset.current % w) - w) % w // keep within (-w, 0]
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${offset.current}px,0,0)`
  }, [])

  // Measure one set and render enough copies to always fill the strip
  useLayoutEffect(() => {
    const measure = () => {
      const set = setRef.current
      const viewport = viewportRef.current
      if (!set || !viewport) return
      if (itemWidth) setWidthState(itemWidth(viewport.offsetWidth))
      setWidth.current = set.offsetWidth
      if (set.offsetWidth > 0) setCopies(Math.max(2, Math.ceil(viewport.offsetWidth / set.offsetWidth) + 1))
      apply()
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (setRef.current) observer.observe(setRef.current)
    if (viewportRef.current) observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [apply, items, itemWidth])

  // Copies stay clickable (they're what's on screen after scrolling) but are
  // skipped by keyboard and screen readers
  useEffect(() => {
    trackRef.current
      ?.querySelectorAll<HTMLElement>('[data-marquee-copy] a, [data-marquee-copy] button')
      .forEach((el) => (el.tabIndex = -1))
  }, [copies, items])

  // Autoplay
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = performance.now()
    const tick = (time: number) => {
      const dt = Math.min(time - last, 64) / 1000
      last = time
      if (!reduced.matches && !paused.current && !press.current?.dragging) {
        offset.current -= speed * dt
        apply()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [apply, speed])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    press.current = {pointerId: e.pointerId, startX: e.clientX, startOffset: offset.current, dragging: false}
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = press.current
    if (!p || p.pointerId !== e.pointerId) return
    const dx = e.clientX - p.startX
    if (!p.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      // Only capture once it's a real drag, so plain clicks on links still work
      p.dragging = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    offset.current = p.startOffset + dx
    apply()
  }
  const endPress = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = press.current
    if (!p || p.pointerId !== e.pointerId) return
    if (p.dragging) suppressClick.current = true
    press.current = null
    setDragging(false)
  }

  const itemStyle = {width, marginRight: gap}

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn(
        'overflow-hidden',
        draggable && 'select-none touch-pan-y',
        draggable && (dragging ? 'cursor-grabbing' : 'cursor-grab'),
        className,
      )}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') paused.current = true
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') paused.current = false
      }}
      onFocus={() => (paused.current = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) paused.current = false
      }}
      onPointerDown={draggable ? onPointerDown : undefined}
      onPointerMove={draggable ? onPointerMove : undefined}
      onPointerUp={draggable ? endPress : undefined}
      onPointerCancel={draggable ? endPress : undefined}
      onClickCapture={(e) => {
        // A drag that ends over a link shouldn't open it
        if (suppressClick.current) {
          e.preventDefault()
          e.stopPropagation()
          suppressClick.current = false
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({length: copies}, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? setRef : undefined}
            className="flex shrink-0"
            aria-hidden={copy > 0 || undefined}
            data-marquee-copy={copy > 0 || undefined}
          >
            {items.map((item, i) => (
              <div key={itemKeys[i]} className="flex shrink-0" style={itemStyle}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

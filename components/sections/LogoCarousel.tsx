'use client'

import {Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Container} from '@/components/ui/Container'
import {cn} from '@/lib/cn'
import type {LogoItem} from '@/sanity/lib/types'

type Props = {
  heading?: string
  logos: LogoItem[]
  /** Autoplay speed in pixels per second. */
  speed?: number
}

/** Renders `**word**` in the heading as bold. */
function renderHeading(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** Sanity-hosted raster logos get resized; SVGs are used as-is. */
function logoSrc(src: string) {
  return src.endsWith('.svg') ? src : `${src}?h=120&fit=max&auto=format`
}

/**
 * Infinite logo strip. Autoplays, pauses on hover, can be dragged with mouse or
 * touch. Logos are not links. Autoplay is off when the user prefers reduced motion.
 */
export function LogoCarousel({heading, logos, speed = 40}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)

  const offset = useRef(0)
  const setWidth = useRef(0)
  const hovering = useRef(false)
  const drag = useRef<{pointerId: number; startX: number; startOffset: number} | null>(null)
  const [dragging, setDragging] = useState(false)
  const [copies, setCopies] = useState(2)

  const apply = useCallback(() => {
    const w = setWidth.current
    if (w > 0) offset.current = (((offset.current % w) - w) % w) // keep within (-w, 0]
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${offset.current}px,0,0)`
  }, [])

  // Measure one set of logos and render enough copies to always fill the strip
  useLayoutEffect(() => {
    const measure = () => {
      const set = setRef.current
      const viewport = viewportRef.current
      if (!set || !viewport) return
      setWidth.current = set.offsetWidth
      if (set.offsetWidth > 0) {
        setCopies(Math.max(2, Math.ceil(viewport.offsetWidth / set.offsetWidth) + 1))
      }
      apply()
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (setRef.current) observer.observe(setRef.current)
    if (viewportRef.current) observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [apply, logos])

  // Autoplay loop
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = performance.now()
    const tick = (time: number) => {
      const dt = Math.min(time - last, 64) / 1000
      last = time
      if (!reduced.matches && !hovering.current && !drag.current) {
        offset.current -= speed * dt
        apply()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [apply, speed])

  if (!logos.length) return null

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = {pointerId: e.pointerId, startX: e.clientX, startOffset: offset.current}
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== e.pointerId) return
    offset.current = drag.current.startOffset + (e.clientX - drag.current.startX)
    apply()
  }
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== e.pointerId) return
    drag.current = null
    setDragging(false)
  }

  return (
    <section aria-label="Customers" className="pb-10 pt-2">
      {heading && (
        <Container>
          <p className="mb-6 text-center text-lg text-body">{renderHeading(heading)}</p>
        </Container>
      )}
      <div
        ref={viewportRef}
        className={cn(
          'overflow-hidden select-none touch-pan-y',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') hovering.current = true
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') hovering.current = false
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {Array.from({length: copies}, (_, copy) => (
            <div key={copy} ref={copy === 0 ? setRef : undefined} className="flex shrink-0" aria-hidden={copy > 0}>
              {logos.map((logo) => (
                <div key={logo._id} className="flex h-20 shrink-0 items-center px-8 lg:px-11">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG logos */}
                  <img
                    src={logoSrc(logo.src)}
                    alt={copy === 0 ? logo.name : ''}
                    draggable={false}
                    loading="eager"
                    className="pointer-events-none h-12 w-auto max-w-[170px] object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

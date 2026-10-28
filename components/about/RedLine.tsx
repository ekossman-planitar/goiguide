'use client'

import {useEffect, useRef, useState} from 'react'

/**
 * The Redline motif: one thin red line that grows down the left edge of the page as the visitor
 * scrolls. Wide screens only; nothing is drawn for visitors who ask for reduced motion.
 */
export function ScrollLine() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleY(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, {passive: true})
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-3 z-30 hidden w-0.5 xl:block">
      <span ref={ref} className="block h-full w-full origin-top bg-rea-red" style={{transform: 'scaleY(0)'}} />
    </div>
  )
}

/** Easter egg: type "redline" anywhere (outside a form field) and a red line draws across the screen. */
export function RedlineEasterEgg() {
  const [run, setRun] = useState(0)

  useEffect(() => {
    let typed = ''
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return
      if (e.key.length !== 1) return
      typed = (typed + e.key.toLowerCase()).slice(-7)
      if (typed === 'redline') setRun((n) => n + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!run) return null
  return (
    <svg key={run} aria-hidden className="pointer-events-none fixed inset-x-0 top-1/2 z-50 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 2">
      <path d="M0 1 H100" pathLength={1} vectorEffect="non-scaling-stroke" className="easter-line" stroke="var(--color-rea-red)" strokeWidth={4} fill="none" />
    </svg>
  )
}

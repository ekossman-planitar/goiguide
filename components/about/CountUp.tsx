'use client'

import {useEffect, useRef, useState} from 'react'

/**
 * Counts from 0 up to `end` the first time it scrolls into view, then settles on `finalText`
 * (e.g. 1 → "1B+"). Shows `finalText` straight away without JavaScript or with reduced motion.
 */
export function CountUp({end, decimals = 2, suffix = '', finalText, duration = 1800}: Readonly<{end: number; decimals?: number; suffix?: string; finalText: string; duration?: number}>) {
  const ref = useRef<HTMLSpanElement>(null)
  const [text, setText] = useState(finalText)

  useEffect(() => {
    const el = ref.current
    if (!el || globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setText(t === 1 ? finalText : `${(end * eased).toFixed(decimals)}${suffix}`)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        setText(`${(0).toFixed(decimals)}${suffix}`)
        raf = requestAnimationFrame(tick)
      },
      {threshold: 0.6},
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [end, decimals, suffix, finalText, duration])

  return (
    <span ref={ref} aria-label={finalText}>
      <span aria-hidden>{text}</span>
    </span>
  )
}

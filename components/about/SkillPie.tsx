'use client'

import {useEffect, useRef, useState} from 'react'

export type Trait = {
  label: string
  /** One-line meaning, from the careers copy */
  line: string
  /** How it shows up day to day */
  items: {term: string; meaning: string}[]
  /** Wedge colour when not selected (brand token) */
  fill: string
}

const CX = 200
const CY = 200
const R = 160
const rad = (deg: number) => (deg * Math.PI) / 180

/**
 * Pie of three equal wedges (humble, hungry, smart). It steps through the wedges by itself; hover, tap, focus or press Enter on a wedge to pick one. The selected wedge turns REA Red and slides out.
 */
export function SkillPie({traits}: Readonly<{traits: Trait[]}>) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useRef(false)
  const step = 360 / traits.length
  const current = traits[active]

  useEffect(() => {
    reduced.current = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.4})
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Autoplay: move on to the next wedge, looping, while on screen and not hovered or focused
  useEffect(() => {
    if (!inView || paused || reduced.current) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % traits.length), 3200)
    return () => clearTimeout(timer)
  }, [inView, paused, active, traits.length])

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div>
        <svg viewBox="0 0 400 400" role="group" aria-label="Humble, hungry and smart, in balance" className="mx-auto h-auto w-full max-w-[460px]">
          {traits.map((t, i) => {
            const a0 = -90 + step * i
            const a1 = a0 + step
            const mid = a0 + step / 2
            const on = i === active
            const path = `M${CX} ${CY} L${CX + R * Math.cos(rad(a0))} ${CY + R * Math.sin(rad(a0))} A${R} ${R} 0 0 1 ${CX + R * Math.cos(rad(a1))} ${CY + R * Math.sin(rad(a1))} Z`
            const push = on ? 16 : 0
            return (
              <g
                key={t.label}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={t.label}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(i)
                  }
                }}
                className="cursor-pointer"
                style={{transform: `translate(${push * Math.cos(rad(mid))}px, ${push * Math.sin(rad(mid))}px)`, transition: 'transform 300ms ease-out'}}
              >
                <path d={path} stroke="#fff" strokeWidth={4} strokeLinejoin="round" style={{fill: on ? 'var(--color-rea-red)' : t.fill, transition: 'fill 300ms'}} />
                <text
                  x={CX + R * 0.62 * Math.cos(rad(mid))}
                  y={CY + R * 0.62 * Math.sin(rad(mid))}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  fontSize={28}
                  fontWeight={600}
                  style={{fontFamily: 'var(--font-sans)', pointerEvents: 'none'}}
                >
                  {t.label}
                </text>
              </g>
            )
          })}
          <circle cx={CX} cy={CY} r={42} fill="#fff" pointerEvents="none" />
          <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={600} fill="var(--color-ink)" style={{fontFamily: 'var(--font-sans)', pointerEvents: 'none'}}>
            In balance
          </text>
        </svg>
      </div>

      <div aria-live="polite" key={current.label} className="animate-[fadeIn_300ms_ease-out]">
        <h3 className="type-title text-ink">{current.label}</h3>
        <p className="type-lead mt-3 text-muted">{current.line}</p>
        <p className="type-overline mt-8 mb-3 text-muted">How it shows up</p>
        <ul className="space-y-3">
          {current.items.map((it) => (
            <li key={it.term} className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <p className="type-heading-xs text-ink">{it.term}</p>
              <p className="type-body mt-1 text-body">{it.meaning}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

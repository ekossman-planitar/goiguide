'use client'

import {useEffect, useState} from 'react'

const pad = (n: number) => String(n).padStart(2, '0')

/** Days / hours / minutes / seconds until `endsAt`; calls onDone once at zero. */
export function Countdown({endsAt, label, colour, onDone}: Readonly<{endsAt: string; label: string; colour: string; onDone: () => void}>) {
  const end = Date.parse(endsAt)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = globalThis.setInterval(() => setNow(Date.now()), 1000)
    return () => globalThis.clearInterval(timer)
  }, [])

  const left = Math.max(0, end - now)
  useEffect(() => {
    if (left === 0) onDone()
  }, [left, onDone])
  if (left === 0) return null

  const parts = [
    {value: Math.floor(left / 86_400_000), unit: 'days'},
    {value: Math.floor(left / 3_600_000) % 24, unit: 'hours'},
    {value: Math.floor(left / 60_000) % 60, unit: 'minutes'},
    {value: Math.floor(left / 1000) % 60, unit: 'seconds'},
  ]
  const spoken = `${parts[0].value} days ${parts[1].value} hours ${parts[2].value} minutes`

  return (
    <div className="site-popup-timer mt-6">
      <p className="text-sm font-semibold tracking-wide uppercase">{label}</p>
      {/* Screen readers get a single summary instead of a value that changes every second */}
      <p className="sr-only">{`${label} ${spoken}`}</p>
      <div aria-hidden className="mt-2 flex gap-2">
        {parts.map((p) => (
          <div key={p.unit} className="min-w-[60px] rounded-lg border border-current/20 px-2 py-2 text-center">
            <div className="text-2xl leading-none font-bold tabular-nums" style={{color: colour}}>
              {pad(p.value)}
            </div>
            <div className="mt-1 text-xs">{p.unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

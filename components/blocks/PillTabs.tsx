'use client'

import {useRef, useState, type KeyboardEvent, type ReactNode} from 'react'
import {cn} from '@/lib/cn'
import {wrapIndex} from '@/lib/tabs'

export type PillTab = {id: string; label: string; content: ReactNode}

/** Pill tabs (same look as TabbedMedia / PackageTabs) around any content, e.g. price tables. All panels stay in the HTML. */
export function PillTabs({tabs, label}: Readonly<{tabs: PillTab[]; label: string}>) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1
    const next = {ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last}[e.key]
    if (next === undefined) return
    e.preventDefault()
    const i = wrapIndex(next, last)
    setActive(i)
    refs.current[i]?.focus()
  }

  return (
    <div>
      <div className="flex justify-center">
        <div role="tablist" aria-label={label} className="flex max-w-full gap-2 overflow-x-auto rounded-[32px] border border-line bg-surface p-2">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                'shrink-0 rounded-3xl border px-5 py-2.5 text-base leading-6 font-semibold whitespace-nowrap transition-colors',
                i === active ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={i !== active} className="mt-8">
          {tab.content}
        </div>
      ))}
    </div>
  )
}

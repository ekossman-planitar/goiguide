'use client'

import {useRef, useState, type KeyboardEvent, type ReactNode} from 'react'
import {cn} from '@/lib/cn'
import {MediaView} from './MediaView'
import type {Media} from './types'

export type MediaTab = {id: string; label: string; media: Media; title?: string; text?: ReactNode}

/**
 * Pill tabs (live-site style) switching between images, videos or embeds,
 * each with optional caption. Embeds load only when their tab is first opened.
 */
export function TabbedMedia({tabs, label, align = 'center'}: {tabs: MediaTab[]; label: string; align?: 'left' | 'center'}) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number, focus = false) => {
    setActive(i)
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
    if (focus) refs.current[i]?.focus()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1
    const next = {ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last}[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next < 0 ? last : next > last ? 0 : next, true)
  }

  return (
    <div>
      <div className={cn('flex', align === 'center' && 'justify-center')}>
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="flex max-w-full gap-2 overflow-x-auto rounded-[32px] bg-[#e6edf3] p-2"
        >
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
              onClick={() => select(i)}
              className={cn(
                'shrink-0 rounded-3xl border px-5 py-2.5 text-base leading-6 font-semibold whitespace-nowrap transition-colors',
                i === active
                  ? 'border-primary bg-[#d0edf8] text-primary'
                  : 'border-[#e7edf6] bg-white text-ink hover:border-primary hover:text-primary',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={i !== active} className="mt-8">
          {(tab.media.type !== 'embed' || loaded.has(i)) && <MediaView media={tab.media} />}
          {(tab.title || tab.text) && (
            <div className={cn('mt-6', align === 'center' && 'mx-auto max-w-3xl text-center')}>
              {tab.title && <h4 className="text-xl font-bold text-ink">{tab.title}</h4>}
              {tab.text && <div className="mt-2 text-lg leading-7 text-body">{tab.text}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

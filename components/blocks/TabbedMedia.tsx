'use client'

import {useRef, useState, type KeyboardEvent, type ReactNode} from 'react'
import {cn} from '@/lib/cn'
import {MediaView} from './MediaView'
import {ZoomImage} from './ZoomImage'
import type {Media} from './types'
import {wrapIndex} from '@/lib/tabs'

export type MediaTab = {
  id: string
  label: string
  media: Media
  title?: string
  text?: ReactNode
  /** Hidden when a landing page's USD / CAD switch is on CAD */
  usOnly?: boolean
  /** Clicking the image opens this URL in a new tab */
  href?: string
}

/**
 * Pill tabs (live-site style) switching between images, videos or embeds,
 * each with optional caption. Embeds load only when their tab is first opened.
 */
export function TabbedMedia({
  tabs,
  label,
  align = 'center',
  mediaClassName,
  zoom = false,
}: Readonly<{
  tabs: MediaTab[]
  label: string
  align?: 'left' | 'center'
  /** e.g. keep small drawings from stretching */
  mediaClassName?: string
  /** Images open full screen when clicked */
  zoom?: boolean
}>) {
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
    select(wrapIndex(next, last), true)
  }

  return (
    <div>
      <div className={cn('flex', align === 'center' && 'justify-center')}>
        <div
          role="tablist"
          aria-label={label}
          className="flex max-w-full gap-2 overflow-x-auto rounded-[32px] border border-line bg-surface p-2"
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
              data-us-only={tab.usOnly || undefined}
              aria-selected={i === active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKeyDown}
              className={cn(
                'shrink-0 rounded-3xl border px-5 py-2.5 text-base leading-6 font-semibold whitespace-nowrap transition-colors',
                i === active
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={i !== active}
          data-us-only={tab.usOnly || undefined}
          className="mt-8"
        >
          {(tab.media.type !== 'embed' || loaded.has(i)) && <TabMedia tab={tab} zoom={zoom} className={tab.media.type === 'image' ? mediaClassName : undefined} />}
          {(tab.title || tab.text) && (
            <div className={cn('mt-6', align === 'center' && 'mx-auto max-w-3xl text-center')}>
              {tab.title && <h4 className="text-xl font-semibold text-ink">{tab.title}</h4>}
              {tab.text && <div className="mt-2 text-lg leading-7 text-body">{tab.text}</div>}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/** A tab's media: linked image, zoomable image, or the plain media */
function TabMedia({tab, zoom, className}: Readonly<{tab: MediaTab; zoom: boolean; className?: string}>) {
  if (tab.media.type === 'image' && tab.href) {
    return (
      <a href={tab.href} target="_blank" rel="noopener noreferrer" className="block">
        <MediaView media={tab.media} className={className} />
      </a>
    )
  }
  if (tab.media.type === 'image' && zoom) return <ZoomImage image={tab.media.image} className={className} />
  return <MediaView media={tab.media} className={className} />
}

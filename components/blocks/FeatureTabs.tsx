'use client'

import {useRef, useState, type KeyboardEvent, type ReactNode} from 'react'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {MediaView} from './MediaView'
import type {Media} from './types'

export type FeatureTab = {
  id: string
  title: string
  text?: ReactNode
  link?: {label: string; href: string; newTab?: boolean}
  /** Optional: items without media keep the previous visual on screen */
  media?: Media
}

/**
 * Vertical list of features beside one visual. Replaces long stacks of
 * alternating text/image rows so the whole section fits in one screen.
 * Every item's text is in the HTML; only the active one is expanded.
 */
export function FeatureTabs({
  items,
  label,
  mediaSide = 'right',
  headingLevel = 'h3',
}: {
  items: FeatureTab[]
  label: string
  mediaSide?: 'left' | 'right'
  /** Item titles are headings (accordion pattern), h2 when the section has no heading of its own */
  headingLevel?: 'h2' | 'h3'
}) {
  const Heading = headingLevel
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number, focus = false) => {
    setActive(i)
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
    if (focus) refs.current[i]?.focus()
  }
  const onKeyDown = (e: KeyboardEvent) => {
    const last = items.length - 1
    const next = {ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: last}[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next < 0 ? last : next > last ? 0 : next, true)
  }

  // Show the nearest item at or before the active one that has media
  let mediaIndex = active
  while (mediaIndex > 0 && !items[mediaIndex].media) mediaIndex--
  const hasMedia = items.some((item) => item.media)

  return (
    <div className={cn('grid items-center gap-10', hasMedia && 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14')}>
      <div role="group" aria-label={label} onKeyDown={onKeyDown} className={cn('space-y-3', mediaSide === 'left' && 'lg:order-2')}>
        {items.map((item, i) => {
          const open = i === active
          return (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border transition-colors',
                open ? 'border-primary bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]' : 'border-[#e7edf6] bg-white/60 hover:border-primary',
              )}
            >
              <Heading className="text-lg leading-7 font-bold text-ink">
                <button
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  type="button"
                  id={`feature-tab-${item.id}`}
                  aria-expanded={open}
                  aria-controls={`feature-text-${item.id}`}
                  onClick={() => select(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  {item.title}
                  <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-full', open ? 'bg-primary' : 'bg-[#d5dde5]')} />
                </button>
              </Heading>
              {/* Text stays in the DOM for search engines; collapsed visually */}
              <div
                id={`feature-text-${item.id}`}
                inert={!open}
                className={cn('grid transition-[grid-template-rows] duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 px-6 pb-5 text-base leading-6 text-body [&_strong]:text-ink">
                    {item.text}
                    {item.link && (
                      <SmartLink
                        href={item.link.href}
                        className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                        {...(item.link.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                      >
                        {item.link.label}
                        <ArrowRight width={16} height={16} />
                      </SmartLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {hasMedia && (
        <div className={cn('min-w-0', mediaSide === 'left' && 'lg:order-1')}>
          {items.map((item, i) =>
            item.media ? (
              <div key={item.id} hidden={i !== mediaIndex}>
                {(item.media.type !== 'embed' || loaded.has(i)) && (
                  <MediaView media={item.media} className="max-h-[70vh] rounded-2xl object-contain" />
                )}
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}

'use client'

import {ArrowRight} from '@/components/ui/icons'
import {useRef, useState, type KeyboardEvent} from 'react'
import {cn} from '@/lib/cn'
import {CheckList} from './CheckList'
import {MediaView} from './MediaView'
import type {Img} from './types'
import {wrapIndex} from '@/lib/tabs'

export type PackageTab = {
  id: string
  label: string
  heading: string
  text: string
  list: string[]
  image: Img
  links: {label: string; href: string}[]
}

/**
 * Pill tabs, one package per panel: description, checklist, preview image and
 * sample links (live: /design-construction "iGuide Packages", #packageTabs).
 */
export function PackageTabs({tabs, label}: Readonly<{tabs: PackageTab[]; label: string}>) {
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
    <div id="packageTabs">
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
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={i !== active}
          className="mx-auto mt-8 max-w-[1080px] rounded-2xl border border-line bg-white p-8 shadow-card md:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="type-heading-md text-ink">{tab.heading}</h3>
              <p className="mt-4 text-base leading-7 whitespace-pre-line text-body">{tab.text}</p>
              <CheckList items={tab.list} className="mt-6" />
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <MediaView media={{type: 'image', image: tab.image}} />
            </div>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-base">
            {tab.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-link">
                  {l.label}
                  <ArrowRight width={16} height={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

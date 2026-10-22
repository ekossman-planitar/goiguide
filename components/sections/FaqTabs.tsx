'use client'

import {useRef, useState, type KeyboardEvent, type ReactNode} from 'react'
import {ChevronDown} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {wrapIndex} from '@/lib/tabs'

type FaqGroup = {id: string; label: string; items: {q: string; a: ReactNode}[]}

/**
 * FAQ with one tab per audience (live: /au-agent-offers "Real Estate Agents" / "Real Estate Photographers").
 * Tabs styled like PackageTabs; accordions like Faq. Every answer stays in the HTML.
 * Place inside a Section, which supplies the heading and background.
 */
export function FaqTabs({groups, label}: Readonly<{groups: FaqGroup[]; label: string}>) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent) => {
    const last = groups.length - 1
    const next = {ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last}[e.key]
    if (next === undefined) return
    e.preventDefault()
    const i = wrapIndex(next, last)
    setActive(i)
    refs.current[i]?.focus()
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-center">
        <div role="tablist" aria-label={label} className="flex max-w-full gap-2 overflow-x-auto rounded-[32px] border border-line bg-surface p-2">
          {groups.map((group, i) => (
            <button
              key={group.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`faq-tab-${group.id}`}
              aria-selected={i === active}
              aria-controls={`faq-panel-${group.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                'shrink-0 rounded-3xl border px-5 py-2.5 text-base leading-6 font-semibold whitespace-nowrap transition-colors',
                i === active ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover',
              )}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>
      {groups.map((group, i) => (
        <ul
          key={group.id}
          role="tabpanel"
          id={`faq-panel-${group.id}`}
          aria-labelledby={`faq-tab-${group.id}`}
          hidden={i !== active}
          className="mt-8 space-y-3"
        >
          {group.items.map((item) => (
            <li key={item.q}>
              <details className="group rounded-xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-lg leading-7 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown width={20} height={20} className="shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-base leading-6 text-body [&_p+p]:mt-3">{typeof item.a === 'string' ? <p>{item.a}</p> : item.a}</div>
              </details>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

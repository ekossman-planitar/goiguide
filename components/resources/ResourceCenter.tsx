'use client'

import {useSearchParams} from 'next/navigation'
import {useMemo, useState} from 'react'
import {cn} from '@/lib/cn'
import {resourceTypes} from '@/lib/resourceTypes'
import type {ResourceCardData} from '@/sanity/lib/types'
import {ResourceCard} from './ResourceCard'

const ALL = 'all'

/** Maps a ?tab= value (any capitalisation) to a document type name. */
function typeFromTab(tab: string | null) {
  if (!tab) return ALL
  return resourceTypes.find((t) => t.tab.toLowerCase() === tab.toLowerCase())?.name ?? ALL
}

type Props = {items: ResourceCardData[]}

/**
 * Filter pills + card grid. The active filter is kept in the URL as ?tab=…
 * (same values as the live site) so filtered views can be linked to.
 * Wrap in <Suspense fallback={<ResourceCenterView items={items} />}>.
 */
export function ResourceCenter({items}: Props) {
  const searchParams = useSearchParams()
  return <ResourceCenterView items={items} initialType={typeFromTab(searchParams.get('tab'))} />
}

/** The filter UI without reading the URL (used as the static fallback). */
export function ResourceCenterView({items, initialType = ALL}: Props & {initialType?: string}) {
  const [active, setActive] = useState<string>(initialType)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of items) map.set(item._type, (map.get(item._type) ?? 0) + 1)
    return map
  }, [items])

  const visible = active === ALL ? items : items.filter((item) => item._type === active)

  const choose = (name: string) => {
    setActive(name)
    const url = new URL(window.location.href)
    const tab = resourceTypes.find((t) => t.name === name)?.tab
    if (tab) url.searchParams.set('tab', tab)
    else url.searchParams.delete('tab')
    window.history.replaceState(null, '', url)
  }

  const filters = [{name: ALL, label: 'All', count: items.length}].concat(
    resourceTypes.map((t) => ({name: t.name, label: t.label, count: counts.get(t.name) ?? 0})),
  )

  return (
    <>
      <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter.name === active
          return (
            <button
              key={filter.name}
              type="button"
              aria-pressed={isActive}
              onClick={() => choose(filter.name)}
              className={cn(
                'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-colors',
                isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-white text-body hover:border-primary hover:text-primary',
              )}
            >
              {filter.label}
              <span
                className={cn(
                  'rounded-full px-2 text-xs tabular-nums',
                  isActive ? 'bg-white/20 text-white' : 'bg-surface text-muted',
                )}
              >
                {filter.count}
              </span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'resource' : 'resources'} shown
      </p>

      {visible.length ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visible.map((item) => (
            <li key={item._id}>
              <ResourceCard item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center text-muted">
          Nothing here yet. Check back soon.
        </p>
      )}
    </>
  )
}

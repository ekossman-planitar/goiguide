'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {cn} from '@/lib/cn'
import {categoryLabel, getResourceType, listedResourceTypes, RESOURCE_CENTER_PATH, resourceCenterTitle} from '@/lib/resourceTypes'
import type {ResourceCardData} from '@/sanity/lib/types'
import {ResourceCard} from './ResourceCard'

const ALL = 'all'
const PAGE_SIZE = 12

type Props = {
  items: ResourceCardData[]
  /** Pre-selected type (set by the listing route, e.g. /blogs → blogPost) */
  initialType?: string
}

const pill = (active: boolean) =>
  cn(
    'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-colors',
    active ? 'border-primary bg-primary text-white' : 'border-line bg-white text-body hover:border-primary-hover hover:text-primary-hover',
  )

/**
 * Filter pills + card grid. Each type filter has its own clean URL: "All" is
 * /resource-center, Blog is /blogs, Videos is /video, etc. Types with
 * categories get a second row of filters, kept in ?category= like the live
 * site (so links such as /customer-stories?category=insurance-and-restoration
 * keep working). Choosing a filter updates the address bar without reloading.
 */
export function ResourceCenter({items, initialType = ALL}: Props) {
  const [active, setActive] = useState<string>(initialType)
  const [category, setCategory] = useState<string>(ALL)
  const [shown, setShown] = useState(PAGE_SIZE)
  const type = getResourceType(active)
  const categories = Object.entries((type?.categories ?? {}) as Record<string, string>)

  // Read ?category= once on load (keeps the page static: no useSearchParams)
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('category')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl) setCategory(fromUrl)
  }, [])

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of items) map.set(item._type, (map.get(item._type) ?? 0) + 1)
    return map
  }, [items])

  const visible = items.filter(
    (item) => (active === ALL || item._type === active) && (category === ALL || item.categories?.includes(category)),
  )

  const updateUrl = (typeName: string, cat: string) => {
    const config = getResourceType(typeName)
    const url = new URL(config?.basePath ?? RESOURCE_CENTER_PATH, window.location.origin)
    if (cat !== ALL) url.searchParams.set('category', cat)
    window.history.replaceState(null, '', url)
  }

  const chooseType = (name: string) => {
    setActive(name)
    setCategory(ALL)
    setShown(PAGE_SIZE)
    updateUrl(name, ALL)
  }

  const chooseCategory = (cat: string) => {
    setCategory(cat)
    setShown(PAGE_SIZE)
    updateUrl(active, cat)
  }

  // Keep the tab title in step with the URL after a filter change
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    document.title = resourceCenterTitle(getResourceType(active))
  }, [active])

  const filters = [{name: ALL, label: 'All', count: items.length}].concat(
    listedResourceTypes.map((t) => ({name: t.name, label: t.label, count: counts.get(t.name) ?? 0})),
  )

  return (
    <>
      <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter.name === active
          return (
            <button key={filter.name} type="button" aria-pressed={isActive} onClick={() => chooseType(filter.name)} className={pill(isActive)}>
              {filter.label}
              <span className={cn('rounded-full px-2 text-xs tabular-nums', isActive ? 'bg-white/20 text-white' : 'bg-surface text-muted')}>
                {filter.count}
              </span>
            </button>
          )
        })}
      </div>

      {categories.length > 0 && (
        <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="mr-1 text-sm font-semibold text-muted">Category:</span>
          {[[ALL, 'All categories'] as const, ...categories].map(([slug, label]) => (
            <button
              key={slug}
              type="button"
              aria-pressed={category === slug}
              onClick={() => chooseCategory(slug)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                category === slug ? 'bg-primary-soft text-primary' : 'text-body hover:text-primary-hover',
              )}
            >
              {slug === ALL ? label : categoryLabel(type, slug)}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'resource' : 'resources'} shown
      </p>

      {visible.length ? (
        <>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visible.slice(0, shown).map((item) => (
              <li key={item._id}>
                <ResourceCard item={item} />
              </li>
            ))}
          </ul>
          {visible.length > shown && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="rounded-lg border border-primary bg-white px-6 py-3 font-semibold text-primary transition-colors hover:border-primary-hover hover:text-primary-hover"
              >
                Show more ({visible.length - shown} more)
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center text-muted">Nothing here yet. Check back soon.</p>
      )}
    </>
  )
}

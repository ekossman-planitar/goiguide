'use client'

import {Search, X} from 'lucide-react'
import {useEffect, useMemo, useRef, useState} from 'react'
import {buttonClass} from '@/components/ui/Button'
import {Select} from '@/components/ui/Select'
import {cn} from '@/lib/cn'
import {
  categoryLabel,
  getResourceType,
  isIndustry,
  listedResourceTypes,
  RESOURCE_CENTER_PATH,
  resourceCenterTitle,
  resourceIndustries,
} from '@/lib/resourceTypes'
import type {ResourceCardData} from '@/sanity/lib/types'
import {ResourceCard} from './ResourceCard'

const ALL = 'all'
const PAGE_SIZE = 12

type Props = {
  items: ResourceCardData[]
  /** Pre-selected type (set by the listing route, e.g. /blogs → blogPost) */
  initialType?: string
}

/** Content types, alphabetical after "All" */
const typeFilters = [{name: ALL, label: 'All'}].concat(
  [...listedResourceTypes].map((t) => ({name: t.name as string, label: t.label as string})).sort((a, b) => a.label.localeCompare(b.label)),
)

const industryOptions = [{value: ALL, label: 'All industries'}, ...resourceIndustries.map((i) => ({value: i.slug as string, label: i.label as string}))]

/**
 * Resource Center filters: a search box, an industry dropdown, content-type tabs
 * (alphabetical) and, for types that have them, topic chips. Each type keeps its
 * own clean URL ("All" is /resource-center, Blog is /blogs…). Industry and topic
 * are kept in ?category= like the live site, so links such as
 * /customer-stories?category=insurance-and-restoration keep working; when both
 * are set the industry moves to ?industry=. Filtering updates the address bar
 * without reloading.
 */
export function ResourceCenter({items, initialType = ALL}: Readonly<Props>) {
  const [active, setActive] = useState<string>(initialType)
  const [industry, setIndustry] = useState<string>(ALL)
  const [topic, setTopic] = useState<string>(ALL)
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE_SIZE)
  const type = getResourceType(active)
  const topics = Object.entries((type?.categories ?? {}) as Record<string, string>)
    .filter(([slug]) => !isIndustry(slug))
    .sort((a, b) => a[1].localeCompare(b[1]))

  // Read ?category= / ?industry= once on load (keeps the page static: no useSearchParams)
  useEffect(() => {
    const params = new URLSearchParams(globalThis.location.search)
    const category = params.get('category')
    const ind = params.get('industry')
    /* eslint-disable react-hooks/set-state-in-effect */
    if (category && isIndustry(category)) setIndustry(category)
    else if (category) setTopic(category)
    if (ind && isIndustry(ind)) setIndustry(ind)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const searching = query.trim().length > 0
  const visible = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    return items.filter((item) => {
      if (active !== ALL && item._type !== active) return false
      if (industry !== ALL && !item.categories?.includes(industry)) return false
      if (topic !== ALL && !item.categories?.includes(topic)) return false
      if (!words.length) return true
      const text = `${item.title ?? ''} ${item.excerpt ?? ''}`.toLowerCase()
      return words.every((w) => text.includes(w))
    })
  }, [items, active, industry, topic, query])

  const updateUrl = (typeName: string, ind: string, top: string) => {
    const config = getResourceType(typeName)
    const url = new URL(config?.basePath ?? RESOURCE_CENTER_PATH, globalThis.location.origin)
    if (top !== ALL) url.searchParams.set('category', top)
    if (ind !== ALL) url.searchParams.set(top !== ALL ? 'industry' : 'category', ind)
    globalThis.history.replaceState(null, '', url)
  }

  const chooseType = (name: string) => {
    setActive(name)
    setTopic(ALL)
    setShown(PAGE_SIZE)
    updateUrl(name, industry, ALL)
  }

  const chooseIndustry = (slug: string) => {
    setIndustry(slug)
    setShown(PAGE_SIZE)
    updateUrl(active, slug, topic)
  }

  const chooseTopic = (slug: string) => {
    setTopic(slug)
    setShown(PAGE_SIZE)
    updateUrl(active, industry, slug)
  }

  const filtered = active !== ALL || industry !== ALL || topic !== ALL || searching
  const clearAll = () => {
    setQuery('')
    setActive(ALL)
    setIndustry(ALL)
    setTopic(ALL)
    setShown(PAGE_SIZE)
    updateUrl(ALL, ALL, ALL)
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

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShown(PAGE_SIZE)
            }}
            placeholder="Search articles, stories, videos…"
            className="resource-search h-12 w-full rounded-lg border border-muted bg-white pr-3 pl-10 text-base text-ink placeholder:text-muted focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          />
        </div>
        <Select id="resource-industry" label="Industry" options={industryOptions} value={industry} onChange={chooseIndustry} size="lg" className="md:w-72" />
      </div>

      <div role="group" aria-label="Filter by type" className="mt-6 flex max-w-full gap-2 overflow-x-auto rounded-[32px] border border-line bg-surface p-2">
        {typeFilters.map((filter) => {
          const isActive = filter.name === active
          return (
            <button
              key={filter.name}
              type="button"
              aria-pressed={isActive}
              data-type={filter.name}
              onClick={() => chooseType(filter.name)}
              className={cn(
                'resource-type-filter shrink-0 rounded-3xl border px-5 py-2.5 text-base leading-6 font-semibold whitespace-nowrap transition-colors',
                isActive ? 'border-primary bg-primary text-white' : 'border-transparent text-ink hover:text-primary-hover',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {topics.length > 0 && (
        <div role="group" aria-label="Filter by topic" className="mt-4 flex min-w-0 flex-wrap items-center gap-2">
          {[[ALL, 'All topics'] as const, ...topics].map(([slug, label]) => (
            <button
              key={slug}
              type="button"
              aria-pressed={topic === slug}
              onClick={() => chooseTopic(slug)}
              className={cn(
                'type-small rounded-full border px-3 py-1.5 font-semibold transition-colors',
                topic === slug ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover',
              )}
            >
              {slug === ALL ? label : categoryLabel(type, slug)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="type-small text-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'resource' : 'resources'}
        </p>
        {filtered && (
          <button type="button" onClick={clearAll} className="text-link type-small">
            <X aria-hidden width={16} height={16} />
            Clear filters
          </button>
        )}
      </div>

      {visible.length ? (
        <>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visible.slice(0, shown).map((item) => (
              <li key={item._id}>
                <ResourceCard item={item} />
              </li>
            ))}
          </ul>
          {visible.length > shown && (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setShown((n) => n + PAGE_SIZE)} className={buttonClass('secondary', 'lg')}>
                Show more ({visible.length - shown} more)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-line p-12 text-center">
          <p className="type-body text-muted">Nothing matches these filters yet.</p>
          {filtered && (
            <button type="button" onClick={clearAll} className="text-link mt-3">
              Clear filters
            </button>
          )}
        </div>
      )}
    </>
  )
}

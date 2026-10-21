'use client'

import {CalendarDays, List, Search, X} from 'lucide-react'
import {useEffect, useMemo, useState} from 'react'
import {Select} from '@/components/ui/Select'
import {SmartLink} from '@/components/ui/SmartLink'
import {cn} from '@/lib/cn'
import {attendanceModes, categoryTitle, DEFAULT_TIME_ZONE, eventCategories, eventTypes, isLive, isUpcoming, monthKey, monthLabel} from '@/lib/events'
import {EventCalendar} from './EventCalendar'
import {EventCard} from './EventCard'
import type {EventCardData} from './types'

type View = 'list' | 'calendar'

/**
 * /events: list (grouped by month) or calendar, with a filter bar: search
 * (name, place, description), type, industry, in person / online and country.
 * Filters only list values that upcoming events actually have.
 * Ended events drop off automatically: the server only sends upcoming ones,
 * and the browser re-checks every minute in case the page was cached.
 * View and filters are kept in the URL (?view=calendar&type=…&industry=…&attend=…&country=…&q=…) so they can be shared.
 * GTM: the filter bar is #events-filters; its controls have name attributes (q, type, industry, attend, country).
 */
type Filters = {q: string; type: string; industry: string; attend: string; country: string}
const NO_FILTERS: Filters = {q: '', type: 'all', industry: 'all', attend: 'all', country: 'all'}
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
const matches = (e: EventCardData, f: Filters) =>
  (f.type === 'all' || e.eventType === f.type) &&
  (f.industry === 'all' || (e.categories ?? []).includes(f.industry)) &&
  (f.attend === 'all' || (f.attend === 'online' ? e.attendance !== 'in-person' : e.attendance !== 'online')) &&
  (f.country === 'all' || (e.attendance !== 'online' && e.country === f.country)) &&
  (!f.q.trim() ||
    norm([e.title, e.venue, e.city, e.region, e.country, e.shortDescription, ...(e.categories ?? []).map(categoryTitle)].filter(Boolean).join(' ')).includes(
      norm(f.q.trim()),
    ))
export function EventsBrowser({events, renderedAt}: {events: EventCardData[]; renderedAt: number}) {
  const [now, setNow] = useState(renderedAt)
  const [view, setView] = useState<View>('list')
  const [filters, setFilters] = useState<Filters>(NO_FILTERS)
  const [month, setMonth] = useState<string>()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    /* eslint-disable react-hooks/set-state-in-effect -- read the URL once after hydration */
    if (params.get('view') === 'calendar') setView('calendar')
    setFilters({
      q: params.get('q') ?? '',
      type: params.get('type') ?? 'all',
      industry: params.get('industry') ?? 'all',
      attend: params.get('attend') ?? 'all',
      country: params.get('country') ?? 'all',
    })
    setNow(Date.now())
    /* eslint-enable react-hooks/set-state-in-effect */
    const timer = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const updateUrl = (next: {view?: View; filters?: Filters}) => {
    const params = new URLSearchParams(window.location.search)
    const v = next.view ?? view
    const f = next.filters ?? filters
    if (v === 'calendar') params.set('view', 'calendar')
    else params.delete('view')
    for (const k of ['type', 'industry', 'attend', 'country'] as const) {
      if (f[k] !== 'all') params.set(k, f[k])
      else params.delete(k)
    }
    if (f.q.trim()) params.set('q', f.q.trim())
    else params.delete('q')
    const qs = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`)
  }
  const setFilter = (k: keyof Filters, value: string) => {
    const next = {...filters, [k]: value}
    setFilters(next)
    updateUrl({filters: next})
  }

  const upcoming = useMemo(() => events.filter((e) => isUpcoming(e, now)), [events, now])
  // Only offer options that upcoming events actually have
  const typesPresent = eventTypes.filter((t) => upcoming.some((e) => e.eventType === t.value))
  const industriesPresent = eventCategories.filter((c) => upcoming.some((e) => e.categories?.includes(c.value)))
  const countriesPresent = [...new Set(upcoming.filter((e) => e.attendance !== 'online' && e.country).map((e) => e.country!))].sort()
  const shown = useMemo(() => upcoming.filter((e) => matches(e, filters)), [upcoming, filters])
  const filtered = JSON.stringify(filters) !== JSON.stringify(NO_FILTERS)

  const groups = useMemo(() => {
    const map = new Map<string, EventCardData[]>()
    for (const e of shown) {
      const key = monthKey(e.startAt, e.timeZone || DEFAULT_TIME_ZONE)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    }
    return [...map.entries()]
  }, [shown])

  const nowDate = new Date(now)
  const currentMonth = `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}`
  const firstMonth = currentMonth
  const lastMonth = groups.length ? groups[groups.length - 1][0] : currentMonth
  const activeMonth = month ?? (groups[0]?.[0] && groups[0][0] > currentMonth ? groups[0][0] : currentMonth)
  // In calendar view, a multi-day event that started last month still belongs to this month's list
  const calendarList = shown.filter((e) => {
    const tz = e.timeZone || DEFAULT_TIME_ZONE
    return monthKey(e.startAt, tz) <= activeMonth && monthKey(e.endAt || e.startAt, tz) >= activeMonth
  })

  const toggle = 'inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors'

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <form
          id="events-filters"
          role="search"
          aria-label="Filter events"
          onSubmit={(ev) => ev.preventDefault()}
          className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <label className="relative block sm:min-w-[260px] sm:flex-1 lg:max-w-sm">
            <span className="sr-only">Search events</span>
            <Search aria-hidden width={18} height={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
            <input
              type="search"
              name="q"
              value={filters.q}
              onChange={(ev) => setFilter('q', ev.target.value)}
              placeholder="Search events, cities or venues"
              className="h-11 w-full rounded-lg border border-line bg-white pr-3 pl-10 text-sm text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </label>
          {typesPresent.length > 0 && (
            <Select
              name="type"
              label="Event type"
              size="sm"
              className="w-full sm:w-auto sm:min-w-[170px]"
              buttonClassName="h-11"
              options={[{value: 'all', label: 'All types'}, ...typesPresent.map((t) => ({value: t.value, label: t.plural}))]}
              value={filters.type}
              onChange={(v) => setFilter('type', v)}
            />
          )}
          {industriesPresent.length > 0 && (
            <Select
              name="industry"
              label="Industry"
              size="sm"
              className="w-full sm:w-auto sm:min-w-[170px]"
              buttonClassName="h-11"
              options={[{value: 'all', label: 'All industries'}, ...industriesPresent.map((c) => ({value: c.value, label: c.title}))]}
              value={filters.industry}
              onChange={(v) => setFilter('industry', v)}
            />
          )}
          {upcoming.length > 0 && (
            <Select
              name="attend"
              label="In person or online"
              size="sm"
              className="w-full sm:w-auto sm:min-w-[170px]"
              buttonClassName="h-11"
              options={[
                {value: 'all', label: 'In person & online'},
                ...attendanceModes.filter((m) => m.value !== 'hybrid').map((m) => ({value: m.value, label: m.title})),
              ]}
              value={filters.attend}
              onChange={(v) => setFilter('attend', v)}
            />
          )}
          {countriesPresent.length > 0 && (
            <Select
              name="country"
              label="Country"
              size="sm"
              className="w-full sm:w-auto sm:min-w-[170px]"
              buttonClassName="h-11"
              options={[{value: 'all', label: 'All countries'}, ...countriesPresent.map((c) => ({value: c, label: c}))]}
              value={filters.country}
              onChange={(v) => setFilter('country', v)}
            />
          )}
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setFilters(NO_FILTERS)
                updateUrl({filters: NO_FILTERS})
              }}
              className="inline-flex cursor-pointer items-center gap-1 self-start text-sm font-semibold text-primary hover:text-primary-hover sm:self-center"
            >
              <X aria-hidden width={16} height={16} /> Clear filters
            </button>
          )}
        </form>
        <div role="group" aria-label="View" className="inline-flex self-start rounded-xl bg-surface p-1 lg:self-auto">
          {(
            [
              {v: 'list', label: 'List', icon: List},
              {v: 'calendar', label: 'Calendar', icon: CalendarDays},
            ] as const
          ).map(({v, label, icon: Icon}) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => {
                setView(v)
                updateUrl({view: v})
              }}
              className={cn(toggle, view === v ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-primary-hover')}
            >
              <Icon aria-hidden width={18} height={18} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {shown.length} upcoming {shown.length === 1 ? 'event' : 'events'}
        {filtered ? (shown.length === 1 ? ' matches your filters' : ' match your filters') : ''}
      </p>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-surface px-6 py-12 text-center">
          {filtered && upcoming.length ? (
            <>
              <p className="text-xl font-semibold text-ink">No events match your filters</p>
              <p className="mt-2 text-body">Try a different search, or clear the filters to see all upcoming events.</p>
            </>
          ) : (
            <>
              <p className="text-xl font-semibold text-ink">No upcoming events right now</p>
              <p className="mt-2 text-body">Check back soon, or watch past sessions in our webinar library.</p>
            </>
          )}
          <SmartLink
            href="/webinars"
            className="mt-6 inline-flex rounded-lg border border-primary px-5 py-2.5 font-semibold text-primary hover:border-primary-hover hover:text-primary-hover"
          >
            Browse webinars
          </SmartLink>
        </div>
      ) : view === 'list' ? (
        <div className="mt-10 space-y-12">
          {groups.map(([key, list]) => (
            <section key={key} aria-labelledby={`month-${key}`}>
              <h2 id={`month-${key}`} className="border-b border-line pb-3 text-2xl font-semibold text-ink md:text-[28px]">
                {monthLabel(key)}
              </h2>
              <ul className="mt-6 space-y-5">
                {list.map((e) => (
                  <li key={e._id}>
                    <EventCard event={e} live={isLive(e, now)} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EventCalendar events={shown} month={activeMonth} onMonthChange={setMonth} firstMonth={firstMonth} lastMonth={lastMonth} />
          <section className="mt-10" aria-label={`Events in ${monthLabel(activeMonth)}`}>
            {calendarList.length ? (
              <ul className="space-y-5">
                {calendarList.map((e) => (
                  <li key={e._id}>
                    <EventCard event={e} live={isLive(e, now)} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl bg-surface px-6 py-8 text-center text-body">No events in {monthLabel(activeMonth)}.</p>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

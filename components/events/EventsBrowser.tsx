'use client'

import {CalendarDays, List} from 'lucide-react'
import {useEffect, useMemo, useState} from 'react'
import {SmartLink} from '@/components/ui/SmartLink'
import {cn} from '@/lib/cn'
import {DEFAULT_TIME_ZONE, eventTypes, isLive, isUpcoming, monthKey, monthLabel} from '@/lib/events'
import {EventCalendar} from './EventCalendar'
import {EventCard} from './EventCard'
import type {EventCardData} from './types'

type View = 'list' | 'calendar'

/**
 * /events: list (grouped by month) or calendar, with a type filter.
 * Ended events drop off automatically: the server only sends upcoming ones,
 * and the browser re-checks every minute in case the page was cached.
 * The view is kept in the URL (?view=calendar) so it can be shared.
 */
export function EventsBrowser({events, renderedAt}: {events: EventCardData[]; renderedAt: number}) {
  const [now, setNow] = useState(renderedAt)
  const [view, setView] = useState<View>('list')
  const [type, setType] = useState<string>('all')
  const [month, setMonth] = useState<string>()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    /* eslint-disable react-hooks/set-state-in-effect -- read the URL once after hydration */
    if (params.get('view') === 'calendar') setView('calendar')
    const t = params.get('type')
    if (t && eventTypes.some((x) => x.value === t)) setType(t)
    setNow(Date.now())
    /* eslint-enable react-hooks/set-state-in-effect */
    const timer = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const updateUrl = (next: {view?: View; type?: string}) => {
    const params = new URLSearchParams(window.location.search)
    const v = next.view ?? view
    const t = next.type ?? type
    if (v === 'calendar') params.set('view', 'calendar')
    else params.delete('view')
    if (t !== 'all') params.set('type', t)
    else params.delete('type')
    const qs = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`)
  }

  const upcoming = useMemo(() => events.filter((e) => isUpcoming(e, now)), [events, now])
  const typesPresent = eventTypes.filter((t) => upcoming.some((e) => e.eventType === t.value))
  const shown = type === 'all' ? upcoming : upcoming.filter((e) => e.eventType === type)

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
  const chip = 'cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors'

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {typesPresent.length > 1 ? (
          <div role="group" aria-label="Filter by event type" className="flex flex-wrap gap-2">
            {[{value: 'all', plural: 'All events'}, ...typesPresent].map((t) => (
              <button
                key={t.value}
                type="button"
                aria-pressed={type === t.value}
                onClick={() => {
                  setType(t.value)
                  updateUrl({type: t.value})
                }}
                className={cn(chip, type === t.value ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover')}
              >
                {t.plural}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div role="group" aria-label="View" className="inline-flex self-start rounded-xl bg-surface p-1 md:self-auto">
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

      {shown.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-surface px-6 py-12 text-center">
          <p className="text-xl font-semibold text-ink">No upcoming events right now</p>
          <p className="mt-2 text-body">Check back soon, or watch past sessions in our webinar library.</p>
          <SmartLink href="/webinars" className="mt-6 inline-flex rounded-lg border border-primary px-5 py-2.5 font-semibold text-primary hover:border-primary-hover hover:text-primary-hover">
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

'use client'

import {ChevronLeft, ChevronRight} from 'lucide-react'
import {useMemo, useState} from 'react'
import {SmartLink} from '@/components/ui/SmartLink'
import {DEFAULT_TIME_ZONE, eventDays, eventPath, monthLabel} from '@/lib/events'
import type {EventCardData} from './types'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const pad = (n: number) => String(n).padStart(2, '0')
const addMonths = (key: string, n: number) => {
  const [y, m] = key.split('-').map(Number)
  const d = new Date(Date.UTC(y, m - 1 + n, 1))
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`
}

/**
 * Month grid. Each event shows on every day it covers (in its own time zone).
 * Phones get a dot per day; larger screens list titles in the cells. The list
 * of that month's events is rendered by the parent underneath.
 */
export function EventCalendar({events, month, onMonthChange, firstMonth, lastMonth}: {
  events: EventCardData[]
  month: string
  onMonthChange: (m: string) => void
  firstMonth: string
  lastMonth: string
}) {
  const [y, m] = month.split('-').map(Number)
  const byDay = useMemo(() => {
    const map = new Map<string, EventCardData[]>()
    for (const e of events) {
      for (const day of eventDays(e.startAt, e.endAt, e.timeZone || DEFAULT_TIME_ZONE)) {
        if (!map.has(day)) map.set(day, [])
        map.get(day)!.push(e)
      }
    }
    return map
  }, [events])

  const first = new Date(Date.UTC(y, m - 1, 1))
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const cells: (number | null)[] = [...Array(first.getUTCDay()).fill(null), ...Array.from({length: daysInMonth}, (_, i) => i + 1)]
  while (cells.length % 7) cells.push(null)
  const weeks = Array.from({length: cells.length / 7}, (_, i) => cells.slice(i * 7, i * 7 + 7))
  const [today] = useState(() => {
    const t = new Date()
    return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
  })

  const navButton = 'flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink'

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-ink md:text-[28px]" aria-live="polite">
          {monthLabel(month)}
        </h2>
        <div className="flex gap-2">
          <button type="button" className={navButton} onClick={() => onMonthChange(addMonths(month, -1))} disabled={month <= firstMonth} aria-label="Previous month">
            <ChevronLeft aria-hidden width={20} height={20} />
          </button>
          <button type="button" className={navButton} onClick={() => onMonthChange(addMonths(month, 1))} disabled={month >= lastMonth} aria-label="Next month">
            <ChevronRight aria-hidden width={20} height={20} />
          </button>
        </div>
      </div>
      <table className="mt-6 w-full table-fixed border-collapse overflow-hidden rounded-2xl bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <caption className="sr-only">Events in {monthLabel(month)}</caption>
        <thead>
          <tr>
            {WEEKDAYS.map((d) => (
              <th key={d} scope="col" className="border border-line bg-surface py-2 text-xs font-semibold tracking-wide text-muted uppercase">
                <span className="sm:hidden">{d[0]}</span>
                <span className="hidden sm:inline">{d}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (!day) return <td key={di} className="h-14 border border-line bg-surface/50 md:h-28" />
                const key = `${month}-${pad(day)}`
                const list = byDay.get(key) ?? []
                const isToday = key === today
                return (
                  <td key={di} className="h-14 border border-line p-1 align-top md:h-28 md:p-2">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${isToday ? 'bg-primary font-semibold text-white' : 'text-ink'}`}
                      aria-label={isToday ? `${day}, today` : undefined}
                    >
                      {day}
                    </span>
                    {list.length > 0 && (
                      <>
                        <span className="mt-1 flex gap-1 md:hidden" aria-hidden>
                          {list.slice(0, 3).map((e) => (
                            <span key={e._id} className="h-1.5 w-1.5 rounded-full bg-primary-hover" />
                          ))}
                        </span>
                        <ul className="mt-1 hidden space-y-1 md:block">
                          {list.slice(0, 2).map((e) => (
                            <li key={e._id}>
                              <SmartLink
                                href={eventPath(e.slug)}
                                className="block truncate rounded bg-primary px-1.5 py-0.5 text-xs font-medium text-white hover:bg-primary-hover"
                                title={e.title}
                              >
                                {e.title}
                              </SmartLink>
                            </li>
                          ))}
                          {list.length > 2 && <li className="px-1.5 text-xs text-muted">+{list.length - 2} more</li>}
                        </ul>
                        <span className="sr-only md:hidden">{list.length === 1 ? '1 event' : `${list.length} events`}</span>
                      </>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Events (Studio → Events): option lists shared by the Sanity schema and the
 * site, plus date helpers. Times are stored as exact moments (UTC) and shown in
 * the event's own time zone.
 */

export const EVENTS_PATH = '/events'
export const eventPath = (slug: string) => `/event/${slug}`

export const eventTypes = [
  {value: 'conference', title: 'Conference / trade show', plural: 'Conferences'},
  {value: 'webinar', title: 'Webinar', plural: 'Webinars'},
  {value: 'workshop', title: 'Workshop / training', plural: 'Workshops'},
  {value: 'meetup', title: 'Meetup / networking', plural: 'Meetups'},
  {value: 'virtual', title: 'Virtual event', plural: 'Virtual events'},
  {value: 'other', title: 'Other', plural: 'Other'},
] as const
export type EventType = (typeof eventTypes)[number]['value']

export const eventCategories = [
  {value: 'real-estate', title: 'Residential real estate'},
  {value: 'photography', title: 'Real estate photography'},
  {value: 'aec', title: 'Architecture & remodeling'},
  {value: 'design-construction', title: 'Design & construction'},
  {value: 'insurance', title: 'Insurance & restoration'},
  {value: 'forensic', title: 'Forensic investigation'},
  {value: 'facilities', title: 'Facility management'},
  {value: 'general', title: 'General / all industries'},
] as const

export const attendanceModes = [
  {value: 'in-person', title: 'In person'},
  {value: 'online', title: 'Online'},
  {value: 'hybrid', title: 'In person + online'},
] as const
export type Attendance = (typeof attendanceModes)[number]['value']

export const eventTimeZones = [
  {value: 'America/Toronto', title: 'Eastern (Toronto, New York)'},
  {value: 'America/Chicago', title: 'Central (Chicago, Winnipeg)'},
  {value: 'America/Denver', title: 'Mountain (Denver, Calgary)'},
  {value: 'America/Phoenix', title: 'Arizona (Phoenix)'},
  {value: 'America/Los_Angeles', title: 'Pacific (Los Angeles, Vancouver)'},
  {value: 'America/Halifax', title: 'Atlantic (Halifax)'},
  {value: 'America/St_Johns', title: 'Newfoundland'},
  {value: 'Pacific/Honolulu', title: 'Hawaii'},
  {value: 'America/Anchorage', title: 'Alaska'},
  {value: 'Europe/London', title: 'UK (London)'},
  {value: 'Europe/Berlin', title: 'Central Europe (Berlin, Paris)'},
  {value: 'Australia/Melbourne', title: 'Australia: Melbourne, Sydney'},
  {value: 'Australia/Brisbane', title: 'Australia: Brisbane'},
  {value: 'Australia/Adelaide', title: 'Australia: Adelaide'},
  {value: 'Australia/Perth', title: 'Australia: Perth'},
  {value: 'Pacific/Auckland', title: 'New Zealand'},
  {value: 'UTC', title: 'UTC'},
] as const
export const DEFAULT_TIME_ZONE = 'America/Toronto'

export const typeTitle = (v?: string | null) => eventTypes.find((t) => t.value === v)?.title.split(' /')[0] ?? 'Event'
export const categoryTitle = (v: string) => eventCategories.find((c) => c.value === v)?.title ?? v

/** Still upcoming or happening at `now` (an event disappears once it has ended) */
export const isUpcoming = (e: {startAt: string; endAt?: string | null}, now: number) => Date.parse(e.endAt || e.startAt) > now
export const isLive = (e: {startAt: string; endAt?: string | null}, now: number) =>
  Date.parse(e.startAt) <= now && Date.parse(e.endAt || e.startAt) > now

/** Calendar date (y, m 1-12, d) of a moment in a time zone */
export function zonedDate(iso: string, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone, year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date(iso))
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value)
  return {y: get('year'), m: get('month'), d: get('day')}
}

export const monthKey = (iso: string, timeZone: string) => {
  const {y, m} = zonedDate(iso, timeZone)
  return `${y}-${String(m).padStart(2, '0')}`
}

export const monthLabel = (key: string) => {
  const [y, m] = key.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'UTC'})
}

/** Every calendar day (YYYY-MM-DD, event's time zone) the event covers */
export function eventDays(startAt: string, endAt: string | null | undefined, timeZone: string): string[] {
  const s = zonedDate(startAt, timeZone)
  // An event ending exactly at midnight doesn't run into the next day
  const startMs = Date.parse(startAt)
  const endMs = Math.max(startMs, Date.parse(endAt || startAt) - 1000)
  const e = zonedDate(new Date(endMs).toISOString(), timeZone)
  const days: string[] = []
  const cur = new Date(Date.UTC(s.y, s.m - 1, s.d))
  const last = Date.UTC(e.y, e.m - 1, e.d)
  for (let i = 0; cur.getTime() <= last && i < 60; i++) {
    days.push(cur.toISOString().slice(0, 10))
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
  return days
}

/** "Nov 4–6, 2026", "Nov 4, 2026 · 1:00 – 2:00 PM EST" */
export function formatEventDate(e: {startAt: string; endAt?: string | null; allDay?: boolean | null; timeZone?: string | null}, opts: {weekday?: boolean} = {}) {
  const timeZone = e.timeZone || DEFAULT_TIME_ZONE
  const start = new Date(e.startAt)
  const end = new Date(e.endAt || e.startAt)
  const days = eventDays(e.startAt, e.endAt, timeZone)
  const dateFmt = (d: Date, withYear = true) =>
    d.toLocaleDateString('en-US', {timeZone, month: 'short', day: 'numeric', ...(withYear ? {year: 'numeric'} : {}), ...(opts.weekday ? {weekday: 'short'} : {})})
  let date: string
  if (days.length <= 1) date = dateFmt(start)
  else {
    const s = zonedDate(e.startAt, timeZone)
    const last = days[days.length - 1].split('-').map(Number)
    const sameMonth = s.y === last[0] && s.m === last[1]
    date = sameMonth && !opts.weekday
      ? `${start.toLocaleDateString('en-US', {timeZone, month: 'short', day: 'numeric'})}–${last[2]}, ${last[0]}`
      : `${dateFmt(start, s.y !== last[0])} – ${dateFmt(new Date(Date.UTC(last[0], last[1] - 1, last[2], 12)))}`
  }
  if (e.allDay || days.length > 1) return date
  const time = (d: Date, zone = false) =>
    d.toLocaleTimeString('en-US', {timeZone, hour: 'numeric', minute: '2-digit', ...(zone ? {timeZoneName: 'short'} : {})})
  return e.endAt && e.endAt !== e.startAt ? `${date} · ${time(start)} – ${time(end, true)}` : `${date} · ${time(start, true)}`
}

/** Session formats for "On stage" */
export const sessionFormats = [
  {value: 'keynote', title: 'Keynote'},
  {value: 'talk', title: 'Talk'},
  {value: 'panel', title: 'Panel'},
  {value: 'workshop', title: 'Workshop'},
  {value: 'demo', title: 'Live demo'},
  {value: 'fireside', title: 'Fireside chat'},
] as const

export const sessionFormatTitle = (v?: string | null) => sessionFormats.find((f) => f.value === v)?.title ?? 'Session'

/** "Tue, Mar 3 · 2:00 – 2:45 PM EST" for a session, in the event's time zone */
export function formatSessionTime(s: {startAt?: string | null; endAt?: string | null}, timeZone: string) {
  if (!s.startAt) return null
  const start = new Date(s.startAt)
  const day = start.toLocaleDateString('en-US', {timeZone, weekday: 'short', month: 'short', day: 'numeric'})
  const t = (d: Date, zone = false) => d.toLocaleTimeString('en-US', {timeZone, hour: 'numeric', minute: '2-digit', ...(zone ? {timeZoneName: 'short'} : {})})
  return s.endAt ? `${day} · ${t(start)} – ${t(new Date(s.endAt), true)}` : `${day} · ${t(start, true)}`
}

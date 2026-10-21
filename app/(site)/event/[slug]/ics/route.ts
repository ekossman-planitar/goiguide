import type {EventDetailData} from '@/components/events/types'
import {eventPath} from '@/lib/events'
import {fetchSanity} from '@/sanity/lib/fetch'
import {EVENT_QUERY} from '@/sanity/lib/queries'

/** /event/<slug>/ics: "Add to calendar" file for Outlook, Apple Calendar and others. */
export const revalidate = 60

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, (m) => `\\${m}`)
const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export async function GET(_req: Request, {params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const e = await fetchSanity<EventDetailData | null>(EVENT_QUERY, null, {slug})
  if (!e) return new Response('Not found', {status: 404})
  const url = `https://goiguide.com${eventPath(slug)}`
  const location = e.attendance === 'online' ? 'Online' : [e.venue, e.address, e.city, e.region, e.country].filter(Boolean).join(', ')
  const description = `${e.shortDescription ?? ''}\n\n${url}`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//iGUIDE//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${e._id}@goiguide.com`,
    `DTSTAMP:${stamp(e._updatedAt)}`,
    `DTSTART:${stamp(e.startAt)}`,
    `DTEND:${stamp(e.endAt || e.startAt)}`,
    `SUMMARY:${esc(e.title)}`,
    `DESCRIPTION:${esc(description)}`,
    location ? `LOCATION:${esc(location)}` : '',
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)
  return new Response(lines.join('\r\n'), {
    headers: {'content-type': 'text/calendar; charset=utf-8', 'content-disposition': `attachment; filename="${slug}.ics"`},
  })
}

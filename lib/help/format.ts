const rtf = new Intl.RelativeTimeFormat('en', {numeric: 'auto'})
const steps: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

/** "12 days ago", like Zendesk's activity feed */
export function timeAgo(iso: string, now = Date.now()): string {
  const seconds = (new Date(iso).getTime() - now) / 1000
  for (const [unit, size] of steps) if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  return 'just now'
}

/** "October 3, 2026" */
export const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Toronto'})

/** Forum-style activity age, as forum.goiguide.com shows it: "9h", "12d", "Sep '18" */
export function forumAge(iso: string, now = Date.now()): string {
  const mins = Math.max(0, (now - new Date(iso).getTime()) / 60000)
  if (mins < 60) return `${Math.max(1, Math.floor(mins))}m`
  if (mins < 60 * 24) return `${Math.floor(mins / 60)}h`
  if (mins < 60 * 24 * 30) return `${Math.floor(mins / 1440)}d`
  const d = new Date(iso)
  const month = d.toLocaleDateString('en-US', {month: 'short', timeZone: 'America/Toronto'})
  return d.getFullYear() === new Date(now).getFullYear() ? `${month} ${d.getDate()}` : `${month} '${String(d.getFullYear()).slice(2)}`
}

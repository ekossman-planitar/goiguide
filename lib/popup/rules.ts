/**
 * Rules shared by the Sanity "Pop-up" type and the site's pop-up component:
 * which page a pop-up shows on, whether it's inside its schedule, and colour checks.
 */

export const BRAND_COLOURS = [
  {title: 'Black', value: '#2e2c30'},
  {title: 'Red', value: '#e31f2e'},
  {title: 'White', value: '#ffffff'},
  {title: 'Light grey', value: '#f4f4f5'},
] as const

export const DEFAULT_COLOURS = {background: '#ffffff', text: '#2e2c30', highlight: '#e31f2e'}

export const HEX_PATTERN = /^#[0-9a-f]{6}$/i

export type PopupTargeting = {
  /** Global site (default) or the Australia section (/au pages); each only ever shows in its own region */
  region?: 'global' | 'au' | null
  showOn?: 'all' | 'only' | null
  paths?: string[] | null
  excludePaths?: string[] | null
  includeLandingPages?: boolean | null
}

/** "/blogs/*" matches every page under /blogs; anything else must match exactly. */
export function pathMatches(pattern: string, path: string): boolean {
  const clean = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p).toLowerCase()
  const pat = clean(pattern.trim())
  const target = clean(path)
  if (pat.endsWith('/*')) {
    const base = pat.slice(0, -2)
    return target === base || target.startsWith(`${base}/`)
  }
  return pat === target
}

/** The Australia section: /au and every page under it */
export const isAustraliaPath = (path: string) => pathMatches('/au/*', path)

/**
 * Should a pop-up / announcement with these settings appear on `path`?
 * Australia items only show on /au pages, and global items never do.
 */
export function showsOnPath(t: PopupTargeting, path: string, isLandingPage: boolean): boolean {
  if ((t.excludePaths ?? []).some((p) => p && pathMatches(p, path))) return false
  if ((t.region === 'au') !== isAustraliaPath(path)) return false
  if (t.showOn === 'only') return (t.paths ?? []).some((p) => p && pathMatches(p, path))
  return isLandingPage ? !!t.includeLandingPages : true
}

/** Inside the schedule at `now` (ms)? Empty start/end means no limit. */
export function inSchedule(startAt: string | null | undefined, endAt: string | null | undefined, now: number): boolean {
  if (startAt && Date.parse(startAt) > now) return false
  if (endAt && Date.parse(endAt) <= now) return false
  return true
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two #rrggbb colours (1 to 21). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

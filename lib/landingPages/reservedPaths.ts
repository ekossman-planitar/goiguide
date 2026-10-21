/**
 * URLs a landing page may not use, because a page, redirect or system route
 * already lives there. Used by the Studio's URL check and by the site.
 * Keep `plannedPages` in step with pages still to be built.
 */
import {catalogues} from '../catalogue'
import {goneUrls, legacyRedirects} from '../legacyRedirects'
import {resourceTypes} from '../resourceTypes'
import {adLandingPages, noindexPages, sitemapPages} from '../sitemapPages'

/** Live pages not rebuilt yet (site-inventory.md, section A). Landing pages must not take these URLs. */
const plannedPages = ['/marketing-catalogue']

/** Whole sections of the site: nothing under these may be a landing page */
const reservedPrefixes = [
  ...resourceTypes.map((t) => t.basePath),
  ...catalogues.map((c) => c.path),
  '/iguide', '/au', '/compare', '/csc', '/get-iguide/tools', '/get-iguide/irc', '/project-group', '/reports', '/event', '/events', '/solutions', '/support', '/help',
  '/studio', '/api', '/assets', '/_resources', '/_next', '/homepage', '/landing-templates', '/blog',
]

const reservedExact = new Set(
  [...sitemapPages, ...noindexPages, ...plannedPages, ...legacyRedirects.map((r) => r.source), ...goneUrls, '/sitemap.xml', '/robots.txt', '/llms.txt', '/favicon.ico']
    // The paid-media pages themselves are landing pages
    .filter((p) => !adLandingPages.includes(p)),
)

export const LANDING_PATH_PATTERN = /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/

/**
 * Checks a landing page URL path. Returns true if it can be used, or a
 * message saying why not (shown in the Studio).
 */
export function checkLandingPath(path: string | undefined): true | string {
  if (!path) return 'Enter the page URL, e.g. /get-iguide/rep/spring-offer'
  if (!LANDING_PATH_PATTERN.test(path))
    return 'Use lowercase letters, numbers and hyphens, starting with / and with no / at the end (e.g. /get-iguide/rep/spring-offer)'
  if (path.length > 120) return 'Keep the URL under 120 characters'
  if (reservedExact.has(path)) return `${path} is already a page or redirect on goiguide.com. Choose another URL.`
  const prefix = reservedPrefixes.find((p) => path === p || path.startsWith(`${p}/`))
  if (prefix) return `URLs under ${prefix} belong to another part of the site. Choose another URL.`
  return true
}

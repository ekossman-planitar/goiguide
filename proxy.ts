import {NextResponse, type NextRequest} from 'next/server'
import {GEO_PREVIEW_PARAM, REGION_COOKIE, REGION_PARAM, isBot} from '@/lib/geo'
import {goneUrls} from '@/lib/legacyRedirects'
import {getResourceTypeByTab} from '@/lib/resourceTypes'

const gone = new Set(goneUrls)

/**
 * 1. Old Resource Center filter links (/resource-center?tab=blog, the live
 *    site's format) permanently redirect to the clean listing URL (/blogs).
 *    Any other query parameters (e.g. ?category=) are kept.
 * 2. Pages the live site marks as removed answer 410 Gone, like live.
 * 3. Homepage: visitors in Australia are sent to /au (temporary redirect, query
 *    string kept), unless they chose the global site (cookie) or are a bot.
 */
export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl
  if (pathname === '/') return homepageRegion(request)
  if (gone.has(pathname)) {
    return new NextResponse(
      '<!doctype html><title>Page removed | iGUIDE</title><meta name="robots" content="noindex"><p style="font-family:sans-serif;padding:3rem">This page has been removed. <a href="/">Go to the iGUIDE homepage</a>.</p>',
      {status: 410, headers: {'content-type': 'text/html; charset=utf-8'}},
    )
  }
  const type = getResourceTypeByTab(request.nextUrl.searchParams.get('tab'))
  if (pathname !== '/resource-center' || !type) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = type.basePath
  url.searchParams.delete('tab')
  return NextResponse.redirect(url, 301)
}

const YEAR = 60 * 60 * 24 * 365

function homepageRegion(request: NextRequest) {
  const params = request.nextUrl.searchParams
  // An explicit choice (?region=global / ?region=au) is remembered for a year
  const choice = params.get(REGION_PARAM)
  if (choice === 'global' || choice === 'au') {
    const url = request.nextUrl.clone()
    url.searchParams.delete(REGION_PARAM)
    if (choice === 'au') url.pathname = '/au'
    const res = NextResponse.redirect(url, 307)
    res.cookies.set(REGION_COOKIE, choice, {maxAge: YEAR, path: '/', sameSite: 'lax'})
    return res
  }
  if (request.cookies.get(REGION_COOKIE)?.value === 'global' || isBot(request.headers.get('user-agent'))) return NextResponse.next()
  const country = params.get(GEO_PREVIEW_PARAM)?.toUpperCase() ?? request.headers.get('x-vercel-ip-country')
  if (country !== 'AU' && request.cookies.get(REGION_COOKIE)?.value !== 'au') return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = '/au'
  url.searchParams.delete(GEO_PREVIEW_PARAM)
  const res = NextResponse.redirect(url, 307)
  res.headers.set('Cache-Control', 'private, no-store')
  return res
}

// Must be literal: keep in step with goneUrls in lib/legacyRedirects.ts
export const config = {
  matcher: [
    '/',
    '/resource-center',
    '/blog/grow-your-real-estate-photography-business-coronavirus',
    '/blog/3d-tour-virtual-tour-technology',
    '/blog/virtual-tour-speed-capture',
    '/tech-videos-2',
    '/blog/stop-killing-your-listings-with-inaccurate-measurements',
    '/virtual-showing',
    '/blog/proptech-what-does-it-mean-for-real-estate-agents',
  ],
}

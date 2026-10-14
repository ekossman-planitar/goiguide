import {NextResponse, type NextRequest} from 'next/server'
import {goneUrls} from '@/lib/legacyRedirects'
import {getResourceTypeByTab} from '@/lib/resourceTypes'

const gone = new Set(goneUrls)

/**
 * 1. Old Resource Center filter links (/resource-center?tab=blog, the live
 *    site's format) permanently redirect to the clean listing URL (/blogs).
 *    Any other query parameters (e.g. ?category=) are kept.
 * 2. Pages the live site marks as removed answer 410 Gone, like live.
 */
export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl
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

// Must be literal: keep in step with goneUrls in lib/legacyRedirects.ts
export const config = {
  matcher: [
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

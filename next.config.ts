import type {NextConfig} from 'next'
import {helpArticleRedirects} from './lib/help/redirects'
import {legacyRedirects} from './lib/legacyRedirects'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
    // Image quality (Evan, 2026-10-27): Next.js defaults to 75, which softens photos and fine lines. With one allowed
    // value, every next/image on the site is served at 90 (a value not in the list snaps to the closest one).
    // AVIF first (sharper at the same weight), WebP as fallback.
    qualities: [90],
    formats: ['image/avif', 'image/webp'],
  },
  // Live serves the 3D virtual tours page at this second address too (canonical points to /iguide/3d-virtual-tours)
  async rewrites() {
    return [{source: '/iguide/virtual-tours-new', destination: '/iguide/3d-virtual-tours'}]
  },
  // Old live-site URLs (see lib/legacyRedirects.ts)
  async redirects() {
    return [
      ...legacyRedirects.map(({source, destination}) => ({source, destination, statusCode: 301 as const})),
      // Help Center articles that moved to a site page (lib/help/redirects.ts), whatever the slug,
      // from the current /support address and the earlier /help one
      ...Object.entries(helpArticleRedirects).flatMap(([id, destination]) =>
        ['/support', '/help'].map((base) => ({source: `${base}/articles/:slug(${id}(?:-.*)?)`, destination, statusCode: 301 as const})),
      ),
      // The Help Center moved from /help to /support (Evan, 2026-10-22): every /help address
      // goes to the same page under /support (query strings such as ?query= are kept)
      {source: '/help', destination: '/support', statusCode: 301 as const},
      {source: '/help/:path*', destination: '/support/:path*', statusCode: 301 as const},
    ]
  },
}

export default nextConfig

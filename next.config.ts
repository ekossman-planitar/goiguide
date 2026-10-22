import type {NextConfig} from 'next'
import {helpArticleRedirects} from './lib/help/redirects'
import {legacyRedirects} from './lib/legacyRedirects'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
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

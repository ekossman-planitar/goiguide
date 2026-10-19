import type {NextConfig} from 'next'
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
    return legacyRedirects.map(({source, destination}) => ({source, destination, statusCode: 301 as const}))
  },
}

export default nextConfig

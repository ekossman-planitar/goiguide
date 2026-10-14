import type {NextConfig} from 'next'
import {legacyRedirects} from './lib/legacyRedirects'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
  // Old live-site URLs (see lib/legacyRedirects.ts)
  async redirects() {
    return legacyRedirects.map(({source, destination}) => ({source, destination, statusCode: 301 as const}))
  },
}

export default nextConfig

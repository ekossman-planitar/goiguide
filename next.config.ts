import type {NextConfig} from 'next'

/**
 * Resource hub URLs that the live site redirects to Resource Center tabs
 * (checked 2026-10-07). Status code assumed 301 (Silverstripe redirectedurls
 * default); confirm against the baseline crawl. Next.js keeps any incoming
 * query string (e.g. ?category=…), which the live site drops.
 */
const resourceRedirects: [string, string][] = [
  ['/blogs', 'blog'],
  ['/customer-stories', 'customer-stories'],
  ['/webinars', 'webinars'],
  ['/video', 'Videos'],
  ['/brochures', 'Brochures'],
  ['/news', 'news'],
  ['/white-papers-and-ebooks', 'white-papers'],
  ['/resources-and-media/iguide-gallery', 'iguide-gallery'],
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
  async redirects() {
    return resourceRedirects.map(([source, tab]) => ({
      source,
      destination: `/resource-center?tab=${tab}`,
      statusCode: 301 as const,
    }))
  },
}

export default nextConfig

import {rssFeed} from '@/lib/rss'

// Live URL: /brochures/rss
export const revalidate = 60

export function GET() {
  return rssFeed('brochure')
}

import {rssFeed} from '@/lib/rss'

// Live URL: /video/rss
export const revalidate = 60

export function GET() {
  return rssFeed('video')
}

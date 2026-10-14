import {rssFeed} from '@/lib/rss'

// Live URL: /webinars/rss
export const revalidate = 60

export function GET() {
  return rssFeed('webinar')
}

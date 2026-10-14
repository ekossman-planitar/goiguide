import {rssFeed} from '@/lib/rss'

// Live URL: /customer-stories/rss
export const revalidate = 60

export function GET() {
  return rssFeed('customerStory')
}

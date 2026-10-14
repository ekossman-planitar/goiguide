import {rssFeed} from '@/lib/rss'

// Live URL: /blogs/rss
export const revalidate = 60

export function GET() {
  return rssFeed('blogPost')
}

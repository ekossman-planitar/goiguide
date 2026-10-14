import {rssFeed} from '@/lib/rss'

// Live URL: /white-papers-and-ebooks/rss
export const revalidate = 60

export function GET() {
  return rssFeed('whitePaper')
}

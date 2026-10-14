import {rssFeed} from '@/lib/rss'

// Live URL: /ebooks/rss
export const revalidate = 60

export function GET() {
  return rssFeed('ebook')
}

import {rssFeed} from '@/lib/rss'

// Live URL: /news/rss
export const revalidate = 60

export function GET() {
  return rssFeed('newsArticle')
}

import {rssFeed} from '@/lib/rss'

// Live URL: /resources-and-media/iguide-gallery/rss
export const revalidate = 60

export function GET() {
  return rssFeed('galleryItem')
}

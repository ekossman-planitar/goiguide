import {getResourceType, type ResourceTypeName} from '@/lib/resourceTypes'
import {fetchSanity} from '@/sanity/lib/fetch'
import {RSS_ITEMS_QUERY} from '@/sanity/lib/queries'

const SITE = 'https://goiguide.com'

/**
 * RSS feeds the live site serves at /<holder>/rss (Silverstripe blog module).
 * Channel titles and descriptions copied from the live feeds on 2026-10-09.
 */
const feeds: Record<ResourceTypeName, {title: string; description: string}> = {
  blogPost: {
    title: 'iGUIDE Blogs: Learn About iGUIDE 3D Virtual Tours and Floor Plans',
    description: 'Dive into the world of innovation with iGUIDE Explore blogs for insider tips on mastering 3D virtual tours and floor plans.',
  },
  newsArticle: {
    title: 'Unlock the Latest iGUIDE News Updates – Read Now!',
    description: "Get the scoop on all things iGUIDE! From iGUIDE news updates to insider tips, we've got your back. Click to read more!",
  },
  customerStory: {
    title: 'Real Results: How iGUIDE Helped Businesses Thrive - Customer Stories',
    description: "iGUIDE's impact on businesses is undeniable. Click to read success stories from our diverse community of thriving customers.",
  },
  webinar: {
    title: 'Unlock Success with iGUIDE Webinars: Boost Your Skills Now',
    description:
      'Get ahead with iGUIDE Webinars: Explore a new angle and learn new tips to accelerate your skills. Simple steps, big results. Start now and see the change!',
  },
  video: {
    title: 'Boost Your Skills with These iGuide Videos – Watch Now!',
    description: 'Want to craft amazing virtual tours? Our iGUIDE videos show you how in simple steps. Start making 3D tours and floor plans now!',
  },
  brochure: {
    title: 'iGUIDE Brochures & Downloads. Click to explore!',
    description: 'Looking for detailed information on iGUIDE? Our downloadable brochures are packed with tips and tricks. Explore more now!',
  },
  whitePaper: {
    title: 'Unlock the Future of PropTech: Discover Insights in Our iGUIDE Whitepapers',
    description: "Unlock the future of tech with our iGUIDE whitepapers. Get the latest insights on innovation that's reshaping industries now.",
  },
  galleryItem: {
    title: 'iGUIDE Gallery',
    description: 'Explore sample iGUIDE properties. Choose a category, then explore a property of interest. Get started now.',
  },
  ebook: {
    title: 'Ebooks',
    description:
      'iGUIDE ebooks are available on a range of subjects to help users maximize their experience, learn how to use iGUIDE in their lines of business, and more.',
  },
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')

type RssItem = {title: string; slug: string; publishedAt: string; excerpt?: string | null}

/** GET handler body for a type's /rss route */
export async function rssFeed(type: ResourceTypeName): Promise<Response> {
  const config = getResourceType(type)!
  const feed = feeds[type]
  const link = `${SITE}${config.basePath}`
  const items = await fetchSanity<RssItem[]>(RSS_ITEMS_QUERY, [], {type})

  const xml = `<?xml version="1.0"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
\t<channel>
\t\t<title>${esc(feed.title)}</title>
\t\t<link>${link}</link>
\t\t<atom:link href="${link}" rel="self" type="application/rss+xml" />
\t\t<description>${esc(feed.description)}</description>
${items
  .map((item) => {
    const url = `${link}/${item.slug}`
    return `\t\t<item>
\t\t\t<title>${esc(item.title)}</title>
\t\t\t<link>${url}</link>${item.excerpt ? `\n\t\t\t<description>${esc(item.excerpt)}</description>` : ''}
\t\t\t<pubDate>${new Date(item.publishedAt).toUTCString().replace('GMT', '+0000')}</pubDate>
\t\t\t<guid>${url}</guid>
\t\t</item>`
  })
  .join('\n')}
\t</channel>
</rss>
`
  return new Response(xml, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}})
}

import type {MetadataRoute} from 'next'

/**
 * Allow everything. Landing pages stay out of search through their noindex tag
 * (a robots.txt block would stop crawlers from seeing it). The ?stage= rules are
 * kept from the live robots.txt (they block Silverstripe draft-preview URLs).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/*?stage=Live', '/*?stage=Stage'],
    },
    sitemap: 'https://goiguide.com/sitemap.xml',
  }
}

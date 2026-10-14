import type {MetadataRoute} from 'next'
import {adLandingPages} from '@/lib/sitemapPages'

/**
 * Allow everything except the paid-ad landing pages. The ?stage= rules are kept
 * from the live robots.txt (they block Silverstripe draft-preview URLs).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/*?stage=Live', '/*?stage=Stage', ...adLandingPages],
    },
    sitemap: 'https://goiguide.com/sitemap.xml',
  }
}

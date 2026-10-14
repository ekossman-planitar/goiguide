import {catalogues} from '@/lib/catalogue'
import {RESOURCE_CENTER_PATH, resourceTypes} from '@/lib/resourceTypes'

/**
 * Hand-built pages listed in sitemap.xml. Resource and catalogue entries are
 * added from Sanity in app/sitemap.ts.
 *
 * Add each new page here when it's built. Leave out ad landing pages: they are
 * noindex on live and stay out of the sitemap (see `adLandingPages`).
 */
export const sitemapPages: string[] = [
  '/',
  '/iguide/3d-virtual-tours',
  '/iguide/floor-plans',
  '/iguide/cad-deliverables',
  '/iguide/site-plans',
  '/iguide/xactimate-sketches',
  '/iguide/integrations',
  '/camera-hardware',
  '/industries',
  '/residential-real-estate',
  '/real-estate-photography',
  '/architecture-engineering-construction',
  '/design-construction',
  '/insurance-restoration',
  '/forensic-investigation',
  '/facility-management',
  '/pricing',
  '/downloads',
  RESOURCE_CENTER_PATH,
  ...resourceTypes.map((t) => t.basePath),
  ...catalogues.map((c) => c.path),
]

/** Paid-ad landing pages: built, but noindex and never in the sitemap (live: robots "noindex,no-follow") */
export const adLandingPages = [
  '/get-iguide/rep/learn-more',
  '/get-iguide/rep/learn-more-b',
  '/get-iguide/aec/learn-more',
  '/get-iguide/aec/learn-more-b',
]

import {catalogues} from './catalogue'
import {RESOURCE_CENTER_PATH, resourceTypes} from './resourceTypes'

/**
 * Hand-built pages listed in sitemap.xml. Resource and catalogue entries are
 * added from Sanity in app/sitemap.ts.
 *
 * Add each new page here when it's built. Leave out ad landing pages: they are
 * noindex on live and stay out of the sitemap (see `adLandingPages`).
 * /resellers and /get-iguide/irc/fire-investigation are also noindex on live,
 * so they are left out (see `noindexPages`).
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
  '/solutions',
  '/events',
  '/support/marketing-catalogue',
  '/support/marketing-catalogue/getting-started',
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
  '/au',
  '/au/residential-real-estate',
  '/au/real-estate-photography',
  '/au/immersive-campaign-terms-and-conditions',
  // Standalone pages (indexable on live, not in the nav)
  '/discover',
  '/au-agent-offers',
  '/blacklisted-cameras',
  '/calculator-contact',
  '/ion-terms-and-conditions',
  '/no-subscription-alternative',
  '/ulta-beauty',
  // Company, legal and event pages
  '/about',
  '/careers',
  '/book-a-demo',
  '/partnership',
  '/office-holidays',
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  '/pmre',
  '/pmre-2025',
  '/pmre-rules-regulations',
  '/r1-unboxing',
  '/haunted-tours',
  '/iguide-holmes-approved',
  '/advanced-capture-program',
  '/how-to-build-a-thriving-real-estate-photography-business-in-2025',
  '/stop-waiting-start-building-webinar',
  '/reports/framing-whats-next-2026',
  // Compare
  '/compare',
  '/compare/iguide-vs-matterport',
  '/compare/iguide-vs-docusketch',
  '/compare/iguide-vs-zillow3dhome',
  '/compare/iguide-vs-manual-measurement',
  '/compare/iguide-vs-cubicasa',
  // Customer success, demo and request pages
  '/csc',
  '/csc/csc2018',
  '/csc/csc2019',
  '/csc/csc2020',
  '/csc/csc2021',
  '/project-group/demo',
  '/projectrequest',
  '/download-iguide-planix-app',
  // Tools and campaign pages
  '/get-iguide/tools/costs-calc-can',
  '/get-iguide/tools/costs-calc-usd',
  '/get-iguide/tools/how-to-iguide-analytics',
  '/get-iguide/tools/how-to-iguide-photos-report',
  '/get-iguide/tools/how-to-iguide-report',
  '/get-iguide/tools/planix-survey-simulator',
  '/get-iguide/tools/planix-survey-simulator-tablet',
  '/get-iguide/irc/esx',
  '/get-iguide/irc/embed',
  '/get-iguide/rep/iguide-photos',
  '/get-iguide/iguide/lead-magnet',
  ...catalogues.map((c) => c.path),
]

/** Paid-ad landing pages: built, but noindex and never in the sitemap (live: robots "noindex,no-follow") */
export const adLandingPages = [
  '/get-iguide/rep/learn-more',
  '/get-iguide/rep/learn-more-b',
  '/get-iguide/aec/learn-more',
  '/get-iguide/aec/learn-more-b',
  '/get-iguide/rep/iguide-for-real-estate-photographers-au',
]

/** Built, but noindex on live (robots "noindex,no-follow"), so kept out of the sitemap */
export const noindexPages = ['/resellers', '/get-iguide/irc/fire-investigation']

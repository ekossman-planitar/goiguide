/**
 * Live goiguide.com pages brought into Sanity as landing pages by
 * scripts/import-live-landing-pages.mjs (unlisted-pages audit, 2026-10-19).
 * folder: Studio folder ID; chrome: 'site' = full site navigation (as on live).
 */
export const folders = [
  {_id: 'landingPageFolder-thank-you', title: 'Thank-you pages', description: 'Shown after a form or booking. Hidden from search.'},
  {_id: 'landingPageFolder-showcase', title: 'Showcase pages', description: 'Demo / showcase pages shared by sales.'},
  {_id: 'landingPageFolder-ads', title: 'Ad pages', description: 'Paid-media landing pages.'},
  {_id: 'landingPageFolder-surveys', title: 'Survey pages', description: 'Customer feedback surveys (HubSpot forms).'},
]

const thankYou = [
  '/get-iguide/aec/thank-you',
  '/get-iguide/aec/thank-you-demo',
  '/get-iguide/camera/appointment-scheduled',
  '/get-iguide/camera/thank-you',
  '/get-iguide/camera/thank-you-demo',
  '/get-iguide/cd/thank-you',
  '/get-iguide/cd/thank-you-demo',
  '/get-iguide/fm/thank-you-demo',
  '/get-iguide/irc/fire-thank-you',
  '/get-iguide/irc/thank-you',
  '/get-iguide/irc/thank-you-demo',
  '/get-iguide/rep/thank-you',
  '/get-iguide/rep/thank-you-demo',
].map((path) => ({path, folder: 'landingPageFolder-thank-you', chrome: 'site', layout: 'thank-you'}))

// chrome follows live: most ad pages show the full site navigation; three have only the slim top bar
const adsWithSiteNav = [
  '/get-iguide/aec/fr-learn-more',
  '/get-iguide/camera/referral-program',
  '/get-iguide/irc/learn-more',
  '/get-iguide/irc/storm-season',
  '/get-iguide/rep/fr-learn-more',
  '/get-iguide/rep/iguide-instant',
  '/get-iguide/rep/planix-theta',
]
const adsStripped = [
  '/get-iguide/cd/learn-more',
  '/get-iguide/iguide/real-estate-agents',
  '/get-iguide/site-plans',
  // Found after the 2026-10-19 audit (linked from old redirects / events); same slim top bar on live
  '/get-iguide/rep/learn-more-2025-07-24',
  '/get-iguide/aec/learn-more-old',
  '/get-iguide/rep/nar',
]
const ads = [...adsWithSiteNav.map((path) => ({path, chrome: 'site'})), ...adsStripped.map((path) => ({path, chrome: 'landing'}))].map((p) => ({
  ...p,
  folder: 'landingPageFolder-ads',
  layout: 'lead-form',
}))

// Showcase pages shared by sales (noindex on live). Their hand-built sections are read by showcase.mjs.
// Live shows only a slim top bar on these, so they use the landing page header and footer.
const showcase = [
  '/get-iguide/aec/showcase',
  '/get-iguide/fm/showcase',
  '/get-iguide/irc/showcase',
  '/get-iguide/irc/showcase-forensic',
  '/get-iguide/irc/show',
  '/get-iguide/rep/showcase',
  '/get-iguide/rep-au/showcase',
].map((path) => ({path, folder: 'landingPageFolder-showcase', chrome: 'landing', layout: 'product-showcase'}))

// Customer surveys: a HubSpot form under a short intro, slim top bar on live
const surveys = ['/get-iguide/survey/tell-us-how-we-did', '/get-iguide/survey/tell-us-how-we-did-non-re'].map((path) => ({
  path,
  folder: 'landingPageFolder-surveys',
  chrome: 'landing',
  layout: 'minimal',
}))

export const livePages = [...thankYou, ...ads, ...showcase, ...surveys]

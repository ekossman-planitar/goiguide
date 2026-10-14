/**
 * Old URLs the live site redirects (Silverstripe "Redirected URLs"), found by
 * crawling every page on 2026-10-08. This is only what the crawl could see:
 * the full list lives in the CMS table and must be added from the database
 * export. Status codes assumed 301 (the CMS default); confirm with the baseline crawl.
 *
 * Kept exactly as live, including targets that themselves 404 on live
 * (marked "broken on live").
 */
export const legacyRedirects: {source: string; destination: string}[] = [
  {source: '/contact', destination: '/book-a-demo'},
  {source: '/floor-plans', destination: '/iguide/floor-plans'},
  {source: '/commercial-design', destination: '/design-construction'},
  {source: '/virtual-tours', destination: '/iguide/3d-virtual-tours'},
  {source: '/3d-virtual-tours-old', destination: '/iguide/3d-virtual-tours'},
  {source: '/howto-analytics', destination: '/get-iguide/tools/how-to-iguide-analytics'},
  {source: '/residential-real-estate-old', destination: '/residential-real-estate'},
  {source: '/floor-plans-old', destination: '/'},
  {source: '/home-old', destination: '/'},
  {source: '/home', destination: '/'},
  {source: '/operator', destination: 'https://ion.goiguide.com/'},
  // Australia pages moved under /au (Evan, 2026-10-14)
  {source: '/residential-real-estate-au', destination: '/au/residential-real-estate'},
  {source: '/real-estate-photography-au', destination: '/au/real-estate-photography'},
  {source: '/au-immersive-campaign-terms-and-conditions', destination: '/au/immersive-campaign-terms-and-conditions'},
  {source: '/dwg', destination: '/'},
  {source: '/aec', destination: '/'},
  {source: '/showcase', destination: '/'},
  {source: '/tags', destination: '/iguide/3d-virtual-tours'},
  {source: '/advanced-measurement', destination: '/iguide/floor-plans'},
  {source: '/floorplanner', destination: '/iguide/3d-virtual-tours'},
  {source: '/vr', destination: '/iguide/3d-virtual-tours'},
  {source: '/iguide', destination: '/camera-hardware'},
  {source: '/efficient-dwg-floorplans-iguide', destination: '/blogs/efficient-dwg-floorplans-iguide'},
  {source: '/architecture-engineering-construction-old', destination: '/architecture-engineering-construction'},
  {source: '/success-stories', destination: '/customer-stories'},
  {source: '/iguide-gallery', destination: '/resources-and-media/iguide-gallery'},
  {source: '/pricing/iguide-pricing', destination: '/pricing'},
  {source: '/stop-waiting-start-building-how-top-firms-are-speeding-up-projects-today', destination: '/stop-waiting-start-building-webinar'},
  {source: '/marketing-catalogue', destination: 'https://help.youriguide.com/marketing-materials/iguide-marketing-catalogue'},
  {source: '/blogs/how-to-create-floor-plans-for-real-estate', destination: '/blogs/real-estate-floor-plans-your-secret-to-winning-listings'},
  {source: '/blog/best-ways-to-get-into-real-estate-photography', destination: '/blogs/best-ways-to-get-into-real-estate-photography'},
  {source: '/blog/iguide-introduces-new-feature-designed', destination: '/news/iguide-introduces-new-feature-designed'},
  {
    source: '/blog/the-makers-of-iguide-introduces-instant-3d-virtual-tour-product',
    destination: '/news/planitar-inc-the-makers-of-iguide-introduces-instant-3d-virtual-tour-product-and-ai-automated-floor-plan-drafting-technology',
  },
  {source: '/blog/iguide-powering-the-future-of-digital-twins', destination: '/news/iguide-powering-the-future-of-digital-twins'},
  {source: '/blog/why-your-buyer-may-be-dissatisfied-with-their-new-home', destination: '/blogs/why-your-buyer-may-be-dissatisfied-with-their-new-home'},
  {source: '/blog/definition-of-professionalism', destination: '/ebooks/a-new-definition-of-professionalism'},
  // broken on live (target 404s)
  {source: '/blog/3d-tour-virtual-showing', destination: '/blogs/3d-tour-virtual-showing'},
  {source: '/blog/real-estate-agent-mistakes', destination: '/blogs/real-estate-agent-mistakes'},
  {source: '/blog/photography-tips-beginners', destination: '/blogs/photography-tips-beginners'},
  {source: '/blog/iguide-advantages', destination: '/blogs/iguide-advantages'},
  {source: '/blog/technology-for-real-estate-agents', destination: '/blogs/technology-for-real-estate-agents'},
  {source: '/blog/real-estate-buyer-leads', destination: '/blogs/real-estate-buyer-leads'},
  {source: '/blog/sell-my-home-fast', destination: '/blogs/sell-my-home-fast'},
  {source: '/blog/better-real-estate-photos', destination: '/blogs/new-to-real-estate-photography-tips-to-getting-started-and-acing-your-shoots'},
  {source: '/blog/how-to-brand-yourself-in-real-estate-2', destination: '/blogs/how-to-brand-yourself-in-real-estate-2'},
  {source: '/blog/why-use-3d-tours-to-engage-buyers', destination: '/blogs/why-use-3d-tours-to-engage-buyers'},
  {source: '/blog/real-estate-analytics', destination: '/get-iguide/tools/how-to-iguide-analytics'},
  {source: '/blog/technology-for-real-estate-agents-2', destination: '/blogs/technology-for-real-estate-agents-2'},
  {source: '/blog/irc-documenting-insurance-restoration-claims', destination: '/blogs/irc-documenting-insurance-restoration-claims'},
  {source: '/blog/irc-iguide-technology-insurance-restoration', destination: '/blogs/irc-iguide-technology-insurance-restoration'},
  {source: '/blog/irc-streamlining-the-insurance-restoration-process', destination: '/blogs/irc-streamlining-the-insurance-restoration-process'},
  {source: '/blog/building-your-real-estate-brand', destination: '/blogs/unforgettable-brand-real-estate'},
  {source: '/blog/real-estate-technology-2021', destination: '/blogs/real-estate-technology-2021'},
  {source: '/blog/future-of-real-estate-photography', destination: '/blogs/technology-for-real-estate-agents'},
  {source: '/blog/roxanne-barton', destination: '/customer-stories/roxanne-barton'},
  {source: '/blog/3d-tour-camera-led-to-a-lucrative-career-in-real-estate-photography', destination: '/'},
  {source: '/blog/iguide-powers-a-400-percent-increase-in-business', destination: '/customer-stories/iguide-powers-a-400-percent-increase-in-business'},
  {source: '/blog/why-floor-plans-important', destination: '/blogs/why-floor-plans-important'},
  {source: '/blog/make-money-as-a-photographer', destination: '/blogs/make-money-as-a-photographer'},
]

/** Old URLs the live site answers with 410 Gone */
export const goneUrls: string[] = [
  '/blog/grow-your-real-estate-photography-business-coronavirus',
  '/blog/3d-tour-virtual-tour-technology',
  '/blog/virtual-tour-speed-capture',
  '/tech-videos-2',
  '/blog/stop-killing-your-listings-with-inaccurate-measurements',
  '/virtual-showing',
  '/blog/proptech-what-does-it-mean-for-real-estate-agents',
]

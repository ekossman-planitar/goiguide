import {PricingSideBySide} from '@/components/pricing/PricingSideBySide'
import {CmsCustomerStories} from '@/components/cms/CmsCustomerStories'
import {Faq} from '@/components/sections/Faq'
import {Hero} from '@/components/sections/Hero'
import {LatestResources} from '@/components/sections/LatestResources'
import {LogoCarousel} from '@/components/sections/LogoCarousel'
import {RatingRow} from '@/components/sections/RatingRow'
import {StepsTimeline} from '@/components/sections/StepsTimeline'
import {TourShowcase} from '@/components/sections/TourShowcase'
import {heroFallback, howItWorks, logoHeadingFallback} from '@/lib/content/home'
import {
  customerStories,
  faq,
  latestResources,
  pricing,
  tourShowcase,
} from '@/lib/content/homeSections'
import {pageMetadata} from '@/lib/pageMetadata'
import {fetchSanity} from '@/sanity/lib/fetch'
import {HOME_PAGE_QUERY, LATEST_RESOURCES_QUERY} from '@/sanity/lib/queries'
import type {HomePageData, ResourceCardData} from '@/sanity/lib/types'

// Refetch Sanity content at most once a minute
export const revalidate = 60

// Title, description and canonical copied from the live homepage (2026-10-09)
export const metadata = pageMetadata({
  title: 'Accurate Floor Plans & 3D Tours | iGUIDE',
  description:
    'Capture detailed floor plans, 3D tours, and 1,000s of measurements in minutes. iGUIDE helps pros share precise property data confidently, no subscriptions.',
  path: '/',
})

// Organization schema the live homepage emits (logo kept at its old URL in public/_resources)
const LOGO = 'https://goiguide.com/_resources/themes/main/public/images/favicons/android-chrome-192x192.png'
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  image: LOGO,
  url: 'https://goiguide.com',
  logo: LOGO,
  name: 'iGUIDE',
  description: 'Precise floor plans & 3D virtual tours made easy',
  telephone: '1-844-568-1723',
}

export default async function HomePage() {
  const [home, resources] = await Promise.all([
    fetchSanity<HomePageData>(HOME_PAGE_QUERY, null),
    fetchSanity<ResourceCardData[]>(LATEST_RESOURCES_QUERY, [], {limit: latestResources.count}),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd)}} />
      {/* Above the fold: hero + logos */}
      <Hero data={home?.hero ?? heroFallback} footer={<RatingRow />} />
      <LogoCarousel heading={home?.logoCarousel?.heading ?? logoHeadingFallback} logos={(home?.logoCarousel?.logos ?? []).filter((logo) => logo?.src)} />

      <StepsTimeline id="how-it-works" heading={howItWorks.heading} subheading={howItWorks.subheading} steps={howItWorks.steps} />

      <TourShowcase {...tourShowcase} />

      <CmsCustomerStories {...customerStories} />

      <PricingSideBySide data={pricing} />

      <LatestResources {...latestResources} items={resources} />

      <Faq {...faq} />
    </>
  )
}


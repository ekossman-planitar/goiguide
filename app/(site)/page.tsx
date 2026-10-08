import {PricingSideBySide} from '@/components/pricing/PricingSideBySide'
import {CustomerStories} from '@/components/sections/CustomerStories'
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
import {fetchSanity} from '@/sanity/lib/fetch'
import {HOME_PAGE_QUERY, LATEST_RESOURCES_QUERY} from '@/sanity/lib/queries'
import type {HomePageData, ResourceCardData} from '@/sanity/lib/types'

// Refetch Sanity content at most once a minute
export const revalidate = 60

export default async function HomePage() {
  const [home, resources] = await Promise.all([
    fetchSanity<HomePageData>(HOME_PAGE_QUERY, null),
    fetchSanity<ResourceCardData[]>(LATEST_RESOURCES_QUERY, [], {limit: latestResources.count}),
  ])

  return (
    <>
      {/* Above the fold: hero + logos */}
      <Hero data={home?.hero ?? heroFallback} footer={<RatingRow />} />
      <LogoCarousel heading={home?.logoCarousel?.heading ?? logoHeadingFallback} logos={(home?.logoCarousel?.logos ?? []).filter((logo) => logo?.src)} />

      <StepsTimeline id="how-it-works" heading={howItWorks.heading} subheading={howItWorks.subheading} steps={howItWorks.steps} />

      <TourShowcase {...tourShowcase} />

      <CustomerStories {...customerStories} />

      <PricingSideBySide data={pricing} />

      <LatestResources {...latestResources} items={resources} />

      <Faq {...faq} />
    </>
  )
}


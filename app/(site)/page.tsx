import {Hero} from '@/components/sections/Hero'
import {LogoCarousel} from '@/components/sections/LogoCarousel'
import {RatingRow} from '@/components/sections/RatingRow'
import {StepsTimeline} from '@/components/sections/StepsTimeline'
import {heroFallback, howItWorks, logoHeadingFallback} from '@/lib/content/home'
import {fetchSanity} from '@/sanity/lib/fetch'
import {HOME_PAGE_QUERY} from '@/sanity/lib/queries'
import type {HomePageData} from '@/sanity/lib/types'

// Refetch Sanity content at most once a minute
export const revalidate = 60

export default async function HomePage() {
  const home = await fetchSanity<HomePageData>(HOME_PAGE_QUERY, null)

  return (
    <>
      {/* Above the fold: hero + logos */}
      <Hero data={home?.hero ?? heroFallback} footer={<RatingRow />} />
      <LogoCarousel heading={home?.logoCarousel?.heading ?? logoHeadingFallback} logos={home?.logoCarousel?.logos ?? []} />

      <StepsTimeline heading={howItWorks.heading} subheading={howItWorks.subheading} steps={howItWorks.steps} />
    </>
  )
}

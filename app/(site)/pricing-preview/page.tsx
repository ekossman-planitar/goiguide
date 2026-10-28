import type {Metadata} from 'next'
import {Check, X} from 'lucide-react'
import {CheckList} from '@/components/blocks/CheckList'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {Section} from '@/components/blocks/Section'
import {CmsCustomerStories} from '@/components/cms/CmsCustomerStories'
import {EarningsCalculator} from '@/components/pricing/EarningsCalculator'
import {PricingCalculator} from '@/components/pricing/PricingCalculator'
import {PricingHeroCard} from '@/components/pricing/PricingHeroCard'
import {PricingSideBySide} from '@/components/pricing/PricingSideBySide'
import {Faq} from '@/components/sections/Faq'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {Pill} from '@/components/ui/Pill'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {customerStories} from '@/lib/content/homeSections'
import {addOns, faq, hero, meta, packages} from '@/lib/content/pricing'
import {book} from '@/lib/content/solutions/shared'
import {pageMetadata} from '@/lib/pageMetadata'

/** Draft redesign of /pricing for review (Evan, 2026-10-27). Not indexed, not in the sitemap; /pricing is unchanged. */
export const metadata: Metadata = {...pageMetadata({...meta, path: '/pricing-preview'}), robots: {index: false, follow: false}}

/** Subscription vs iGuide: wording from the pricing FAQ ("Why does iGuide use a pay-per-project model…") */
const comparison = [
  {theirs: 'Monthly fees, even when you’re not scanning', ours: 'No monthly fees. You only pay when you scan'},
  {theirs: 'Surprise fees as you grow', ours: 'Per-project pricing based on property size'},
  {theirs: 'Storage limits', ours: 'No storage limits'},
  {theirs: 'Penalties', ours: 'No penalties'},
]

const steps = [
  {title: 'Get a camera', text: 'Buy the PLANIX R1 once and it’s yours, or hire an iGuide Pro to capture for you.'},
  {title: 'Capture and upload', text: 'Scan the property and upload to the iGuide Portal. Processing is priced by billable square footage.'},
  {title: 'Get your iGuide', text: 'iGuides with all required data uploaded are processed within 24 hours.'},
]

export default function PricingPreviewPage() {
  return (
    <>
      {/* Hero: the headline and the real numbers, side by side */}
      <section className="bg-surface py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
          <div>
            <Pill label="Transparent pricing" tone="white" />
            <h1 className="type-display mt-6 text-ink">{hero.heading}</h1>
            <p className="type-lead mt-5 max-w-xl text-muted">Buy the camera once. Pay per project, only when you scan. No monthly fees, ever.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#calculator" size="lg">
                Estimate cost
              </Button>
              <Button href="#earnings" size="lg" variant="secondary">
                See what you could earn
              </Button>
            </div>
            <p className="type-small mt-10 font-semibold text-ink">Included with every iGuide*</p>
            <CheckList items={hero.included} className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 [&>li]:mb-0" />
            <p className="type-caption mt-4 max-w-xl text-muted">{hero.footnote}</p>
          </div>
          <PricingHeroCard />
        </Container>
      </section>

      {/* The separator: no subscription */}
      <Section heading="Why iGuide has no subscription" subheading="Subscription platforms charge you whether you scan or not. iGuide doesn’t.">
        <div className="overflow-hidden rounded-2xl border border-line shadow-card">
          <div className="grid grid-cols-2 bg-surface">
            <p className="type-heading-xs p-4 text-muted md:px-6">Typical subscription platform</p>
            <p className="type-heading-xs bg-primary p-4 text-white md:px-6">iGuide</p>
          </div>
          <ul className="divide-y divide-line bg-white">
            {comparison.map((row) => (
              <li key={row.ours} className="grid grid-cols-2">
                <span className="type-body flex gap-3 p-4 text-muted md:px-6">
                  <X aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    <span className="sr-only">Subscription platform: </span>
                    {row.theirs}
                  </span>
                </span>
                <span className="type-body flex gap-3 border-l border-line p-4 font-medium text-ink md:px-6">
                  <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <span className="sr-only">iGuide: </span>
                    {row.ours}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <SmartLink href="/blogs/why-subscription-fees-suck-and-why-iguides-pay-per-project-model-respects-your-business" className="text-link mt-6">
          Why we don’t charge subscriptions
          <ArrowRight width={16} height={16} />
        </SmartLink>
      </Section>

      {/* How pricing works, with the pricing video at a supporting size */}
      <Section heading="How iGuide pricing works" background="surface">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="type-heading-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">{i + 1}</span>
                <div>
                  <h3 className="type-heading-sm text-ink">{step.title}</h3>
                  <p className="type-body mt-1 text-body">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure>
            <MediaView media={hero.video} className="rounded-2xl" />
            <figcaption className="type-small mt-3 text-muted">iGuide pricing explained, with Chris</figcaption>
          </figure>
        </div>
      </Section>

      <Section id="earnings" heading="See what you could earn" subheading="You know what an iGuide costs. Here’s what you could make on top of it.">
        <EarningsCalculator />
      </Section>

      <Section
        id="calculator"
        background="surface"
        heading="Price a specific project"
        subheading="Pick your industry, package and property size for a processing estimate."
      >
        <PricingCalculator />
      </Section>

      <PricingSideBySide data={{...packages, allLink: {label: 'Explore add-ons', href: '#add-ons'}}} />

      <Section id="add-ons" background="surface" heading="Build smarter, add the extras that matter">
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {addOns.map((addOn) => (
            <li key={addOn.title} className="grid grid-cols-[96px_minmax(0,1fr)] gap-5 rounded-2xl border border-line bg-white p-5 shadow-card">
              <FallbackImage
                src={addOn.image.src}
                alt={addOn.image.alt}
                width={192}
                height={192}
                className="aspect-square h-auto w-full rounded-xl bg-surface object-cover"
                fallback={<div className="aspect-square w-full rounded-xl bg-surface" />}
              />
              <div>
                <h3 className="type-heading-xs text-ink">{addOn.title}</h3>
                <p className="mt-1.5 text-sm leading-5 text-body">{addOn.summary}</p>
                <p className="mt-3 text-sm text-muted">
                  iGuide package + <span className="text-base font-semibold text-ink">{addOn.priceCAD}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CmsCustomerStories {...customerStories} />

      <Faq heading={faq.heading} items={faq.items} />
      <div className="bg-sky pb-16 lg:pb-[60px]">
        <CtaButtons ctas={[book()]} className="justify-center" />
      </div>
    </>
  )
}

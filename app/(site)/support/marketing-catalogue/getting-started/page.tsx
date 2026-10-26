import {DemoTours, StarterSteps} from '@/components/catalogue/GettingStarted'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronLeft} from '@/components/ui/icons'
import {MARKETING_CATALOGUE_GETTING_STARTED_PATH, MARKETING_CATALOGUE_SUPPORT_PATH} from '@/lib/content/marketingCatalogue'
import {pageMetadata} from '@/lib/pageMetadata'

/**
 * NEW PAGE (2026-10-19): getting started with iGuide marketing, for new operators.
 * Spun off the Marketing Catalogue; linked from that page's hero.
 */
export const metadata = pageMetadata({
  title: 'Getting Started with iGuide Marketing | iGuide',
  description:
    'New iGuide operator? Add a demo tour to your website, prepare your first clients and start promoting your services with ready-to-use materials.',
  path: MARKETING_CATALOGUE_GETTING_STARTED_PATH,
})

const DEMO_TOURS = 'demo-tours'

export default function GettingStartedPage() {
  return (
    <>
      <section className="bg-surface pt-8 pb-12 lg:pt-12 lg:pb-14">
        <Container>
          <SmartLink
            href={MARKETING_CATALOGUE_SUPPORT_PATH}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
          >
            <ChevronLeft /> Marketing Catalogue
          </SmartLink>
          <div className="mt-5 max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-primary-hover uppercase">New to iGuide?</p>
            <h1 className="type-display mt-2 text-ink">Getting started</h1>
            <p className="mt-5 text-xl leading-[30px] text-muted">Three things that help new operators win their first clients.</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="gs-steps" className="py-16 lg:py-[60px]">
        <Container>
          <h2 id="gs-steps" className="sr-only">
            Three steps
          </h2>
          <StarterSteps demoTourAnchor={DEMO_TOURS} />
        </Container>
      </section>

      <section id={DEMO_TOURS} aria-labelledby="gs-tours" className="scroll-mt-28 pb-12 lg:pb-16">
        <Container>
          <h2 id="gs-tours" className="type-heading-lg text-ink">
            Demo tours for your website
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-body">
            Copy the code and paste it into your website builder&apos;s HTML or embed block. Swap in your own tours once you have them.
          </p>
          <div className="mt-8">
            <DemoTours />
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-[60px]">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-primary px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
            <div className="max-w-2xl">
              <h2 className="type-heading-lg">Ready for more?</h2>
              <p className="mt-3 text-lg leading-7 text-white/85">Browse every brochure, presentation, photo and video in the Marketing Catalogue.</p>
            </div>
            <SmartLink
              href={MARKETING_CATALOGUE_SUPPORT_PATH}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-primary-hover hover:bg-primary-hover hover:text-white"
            >
              Browse the catalogue
              <ArrowRight width={18} height={18} />
            </SmartLink>
          </div>
        </Container>
      </section>
    </>
  )
}

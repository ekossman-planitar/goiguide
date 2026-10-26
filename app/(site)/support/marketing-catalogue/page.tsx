import {MarketingCatalogue} from '@/components/catalogue/MarketingCatalogue'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronLeft} from '@/components/ui/icons'
import {HELP_CENTER_URL, MARKETING_CATALOGUE_GETTING_STARTED_PATH, MARKETING_CATALOGUE_SUPPORT_PATH} from '@/lib/content/marketingCatalogue'
import {pageMetadata} from '@/lib/pageMetadata'

/**
 * NEW PAGE: replaces the Zendesk article "iGuide Marketing Catalogue"
 * (help.youriguide.com/hc/en-us/articles/28225392683154). Files live in HubSpot.
 */
export const metadata = pageMetadata({
  title: 'iGuide Marketing Catalogue: Brochures, Videos, Photos & More | iGuide',
  description: 'Download ready-to-use iGuide marketing materials: brochures, one-pagers, presentations, checklists, photos, videos and CAD drawing samples.',
  path: MARKETING_CATALOGUE_SUPPORT_PATH,
})

export default function MarketingCataloguePage() {
  return (
    <>
      <section className="bg-surface pt-8 pb-12 lg:pt-12 lg:pb-14">
        <Container>
          <SmartLink href={HELP_CENTER_URL} className="text-link gap-1 text-sm">
            <ChevronLeft /> Support
          </SmartLink>
          <div className="mt-5 max-w-3xl">
            <h1 className="type-display text-ink">Marketing Catalogue</h1>
            <p className="mt-5 text-xl leading-[30px] text-muted">
              Ready-to-use iGuide marketing materials for your listings, website, presentations and social channels. Find what you need and download it in one
              click.
            </p>
            {/* Signpost for new operators (GTM: .catalogue-getting-started) */}
            <SmartLink
              href={MARKETING_CATALOGUE_GETTING_STARTED_PATH}
              className="catalogue-getting-started group mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-white py-1.5 pr-4 pl-1.5 text-base font-semibold text-ink shadow-sm transition-colors hover:border-primary-hover"
            >
              <span className="rounded-full bg-primary-hover px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">New to iGuide?</span>
              Start here
              <ArrowRight width={16} height={16} />
            </SmartLink>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-[60px]">
        <Container>
          <MarketingCatalogue />
        </Container>
      </section>

      <section className="pb-16 lg:pb-[60px]">
        <Container>
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-primary px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
            <div className="max-w-2xl">
              <h2 className="type-heading-lg">Looking for help articles, training or product updates?</h2>
              <p className="mt-3 text-lg leading-7 text-white/85">
                The iGuide Help Center has how-to guides, release notes and support for every iGuide product.
              </p>
              <p className="mt-4 text-base text-white/85">
                Using these materials? See the{' '}
                <SmartLink
                  href="/support/articles/28224993459730-iGUIDE-Branding-Guide"
                  className="font-semibold text-white underline underline-offset-2 hover:text-white/80"
                >
                  iGuide Branding Guide
                </SmartLink>{' '}
                and{' '}
                <SmartLink
                  href="/support/articles/27696902963858"
                  className="font-semibold text-white underline underline-offset-2 hover:text-white/80"
                >
                  how to add your branding in the iGuide Portal
                </SmartLink>.
              </p>
            </div>
            <a
              href={HELP_CENTER_URL}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-primary-hover hover:bg-primary-hover hover:text-white"
            >
              Visit the Help Center
              <ArrowRight width={18} height={18} />
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}

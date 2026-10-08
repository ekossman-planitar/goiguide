import {CtaBanner} from '@/components/blocks/CtaBanner'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {book} from '@/lib/content/solutions/shared'
import {mainNav} from '@/lib/navigation'
import {pageMetadata} from '@/lib/pageMetadata'

/**
 * NEW URL: goiguide.com has no /industries page today (it 404s). This overview
 * exists because the new nav's "Industries" item links here. Copy is draft.
 */
export const metadata = pageMetadata({
  title: 'Industries | iGUIDE',
  description:
    'See how real estate, photography, architecture, construction, insurance, forensic and facility teams use iGUIDE to measure, document and share spaces.',
  path: '/industries',
})

const industries = mainNav.find((item) => item.label === 'Industries')!.menu!

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-[60px]">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-balance text-[40px] font-bold leading-[normal] text-ink md:text-[56px]">One capture. Every industry.</h1>
            <p className="mt-6 text-xl leading-[30px] text-muted">{industries.description}</p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.links.map(({label, href, description, icon: Icon}) => (
              <li key={href}>
                <SmartLink
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-colors hover:border-primary"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon aria-hidden width={24} height={24} />
                  </span>
                  <span className="mt-5 text-xl leading-7 font-bold text-ink">{label}</span>
                  <span className="mt-2 flex-1 text-base leading-6 text-body">{description}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary">
                    Learn more
                    <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBanner
        heading="Not sure where iGUIDE fits?"
        text="Talk to a product expert about your workflow and the deliverables you need."
        ctas={[book(), {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/', variant: 'secondary'}]}
      />
    </>
  )
}

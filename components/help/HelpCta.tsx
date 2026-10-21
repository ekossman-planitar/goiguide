import {Container} from '@/components/ui/Container'
import {supportContact, zendeskLinks} from '@/lib/help/navigation'

/** "Looking for more assistance?" band, as at the bottom of the help.youriguide.com homepage. */
export function HelpCta() {
  return (
    <section className="pb-16 lg:pb-[60px]">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-primary px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
          <div className="max-w-2xl">
            <h2 className="text-[28px] leading-tight font-semibold md:text-[32px]">Looking for more assistance?</h2>
            <p className="mt-3 text-lg leading-7 text-white/85">Our support team is available {supportContact.hours}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={supportContact.phone.href}
              className="help-call inline-flex items-center gap-2 rounded-lg border border-white bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-primary-hover hover:bg-primary-hover hover:text-white"
            >
              Give us a call
            </a>
            <a
              href={zendeskLinks.submitRequest}
              className="help-submit-request inline-flex items-center gap-2 rounded-lg border border-white px-6 py-3 font-semibold text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
            >
              Submit a request
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

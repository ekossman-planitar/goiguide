import Image from 'next/image'
import {LanguageSwitcher} from '@/components/layout/LanguageSwitcher'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {legal} from '@/lib/footerNavigation'
import {helpFooterColumns, supportContact, zendeskLinks} from '@/lib/help/navigation'

const external = {target: '_blank', rel: 'noopener noreferrer'}

/** Help Center footer: support hours and contact, article link columns, legal. Ported from help.youriguide.com. */
export function HelpFooter() {
  return (
    <footer className="border-t border-line bg-white pt-14 pb-10">
      <Container>
        <nav aria-label="Help Center footer" className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {helpFooterColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="type-heading-sm text-ink">{col.heading}</h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className="text-[15px] leading-6 text-body hover:text-primary-hover" {...(l.external ? external : {})}>
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-12 rounded-2xl bg-surface px-6 py-5 text-[15px] leading-6 text-body">
          <p>
            <span className="font-semibold text-ink">Support hours:</span> {supportContact.hours} (except for holidays, view{' '}
            <a href={supportContact.holidays.href} className="underline underline-offset-2 hover:text-primary-hover">
              {supportContact.holidays.label}
            </a>)
          </p>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <span>
              <span className="font-semibold text-ink">Call us:</span>{' '}
              <a href={supportContact.phone.href} className="help-call underline underline-offset-2 hover:text-primary-hover">
                {supportContact.phone.label}
              </a>
            </span>
            <a href={zendeskLinks.submitRequest} className="help-submit-request font-semibold text-ink underline underline-offset-2 hover:text-primary-hover">
              Submit a request
            </a>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page loads for GTM */}
            <a href="/" aria-label="iGuide home" className="inline-block">
              <Image src="/iGUIDE-Logo.svg" alt="iGuide" width={1330} height={368} className="h-auto w-[120px]" />
            </a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page loads for GTM */}
            <a href="/" className="text-sm font-semibold text-ink hover:text-primary-hover">
              Back to goiguide.com
            </a>
          </div>
          <div className="text-sm leading-6 text-body lg:text-right">
            <div className="mb-3 flex lg:justify-end">
              <LanguageSwitcher />
            </div>
            <p>{legal.copyright}</p>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
              <SmartLink href="/privacy-policy" className="underline underline-offset-2 hover:text-primary-hover">
                Privacy Policy
              </SmartLink>
              <a href="https://youriguide.com/terms/" className="underline underline-offset-2 hover:text-primary-hover" {...external}>
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

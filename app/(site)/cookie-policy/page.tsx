import {LegalPage} from '@/components/pages/LegalPage'
import {SmartLink} from '@/components/ui/SmartLink'
import {pageMetadata} from '@/lib/pageMetadata'

/** /cookie-policy — TITLE/DESC and copy from the live page (checked 2026-10-14). */
export const metadata = pageMetadata({
  title: 'Planitar Cookie Policy | iGUIDE',
  description:
    'At Planitar Inc., we respect your privacy and give you control over which cookies are stored on your device allowing you to customize your experience.',
  path: '/cookie-policy',
})

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Planitar Cookie Policy">
      <p>
        <strong>Manage Your Cookie Preferences</strong>
      </p>
      <p>
        At Planitar Inc., we respect your privacy and give you control over which cookies are stored on your device. Adjust your preferences below
        to customize your experience.
      </p>
      <div className="mt-8">
        {/* TODO: wire to the new consent tool (CookieYes or HubSpot, decision pending) so this opens its preferences panel.
            Live: <button class="cookie-preference-toggle btn btn-primary"> opened the old Silverstripe cookie box. */}
        <button
          type="button"
          data-cookie-preferences
          className="cookie-preference-toggle inline-flex items-center justify-center rounded-lg border border-primary bg-primary px-6 py-3 text-base leading-6 font-semibold text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
        >
          Adjust my preferences
        </button>
      </div>
      <p className="mt-8!">
        For more information about how we use cookies, please refer to our <SmartLink href="/privacy-policy">Privacy Policy</SmartLink>.
      </p>
    </LegalPage>
  )
}

import {LegalPage} from '@/components/pages/LegalPage'
import {Button} from '@/components/ui/Button'
import {html, title} from '@/lib/content/legal/ionTerms'
import {pageMetadata} from '@/lib/pageMetadata'

/** Title from the live page; it has no meta description */
export const metadata = pageMetadata({title: 'ION Terms and Conditions | iGuide', path: '/ion-terms-and-conditions'})

export default function IonTermsPage() {
  return (
    <>
      <LegalPage title={title} html={html} />
      {/* Outside the legal text so the button keeps its own styling */}
      <div className="-mt-6 flex justify-center pb-20">
        <Button href="https://ion.goiguide.com/join-ion-directory/ion-registration/" size="lg">
          Join ION
        </Button>
      </div>
    </>
  )
}

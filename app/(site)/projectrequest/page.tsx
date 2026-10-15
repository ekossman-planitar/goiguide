import {FormHero} from '@/components/pages/FormHero'
import {hero, meta} from '@/lib/content/pages/projectRequest'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function ProjectRequestPage() {
  return <FormHero {...hero} />
}

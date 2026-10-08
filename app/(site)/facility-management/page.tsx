import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/industries/facilityManagement'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function FacilityManagementPage() {
  return <Blocks blocks={blocks} />
}

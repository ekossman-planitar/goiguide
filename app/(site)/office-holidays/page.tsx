import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/officeHolidays'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function OfficeHolidaysPage() {
  return <Blocks blocks={blocks} />
}

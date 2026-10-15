import {Blocks} from '@/components/blocks/Blocks'
import {FormHero} from '@/components/pages/FormHero'
import {blocks, hero, meta} from '@/lib/content/pages/compareManualMeasurement'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function CompareManualMeasurementPage() {
  return (
    <>
      <FormHero {...hero} />
      <Blocks blocks={blocks} />
    </>
  )
}

import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/industries/architectureEngineeringConstruction'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function ArchitectureEngineeringConstructionPage() {
  return <Blocks blocks={blocks} />
}

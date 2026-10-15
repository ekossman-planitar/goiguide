import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/planixSurveySimulator'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function PlanixSurveySimulatorPage() {
  return <Blocks blocks={blocks} />
}

import {Blocks} from '@/components/blocks/Blocks'
import {FormHero} from '@/components/pages/FormHero'
import {blocks, hero, meta} from '@/lib/content/pages/compareCubicasa'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function CompareCubicasaPage() {
  return (
    <>
      <FormHero {...hero} />
      <Blocks blocks={blocks} />
    </>
  )
}

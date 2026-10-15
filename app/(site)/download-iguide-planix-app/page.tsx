import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {blocks, eyebrow, meta} from '@/lib/content/pages/downloadIguidePlanixApp'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

/** Single hero block, rendered with PageHero directly so the live lead-in sits above the h1. */
export default function DownloadIguidePlanixAppPage() {
  const hero = blocks[0]
  if (hero.type !== 'hero') return null
  return (
    <PageHero
      eyebrow={{label: eyebrow}}
      heading={hero.heading}
      subheading={hero.subheading}
      media={<MediaView media={hero.media.type === 'image' ? {...hero.media, priority: true} : hero.media} />}
    >
      {hero.extra}
    </PageHero>
  )
}

/** /get-iguide/irc/embed — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'

export const meta = {
  title: 'embed | iGuide',
  // NEW description (live had none)
  description: 'Embedded iGuide RADIX 3D walkthrough of 1121 Sample Road, Kitchener, ON.',
  path: '/get-iguide/irc/embed',
}

/**
 * Live: only an h1 ("embed") and an Embed Script element that loads
 * //iguideradix.com/js/embedded.js and calls initEmbeddedIGuide() for
 * //iguideradix.com/embed/1121_sample_road_kitchener_on with {unbranded: 1, bgcolor: 'FFFFFF'}.
 * Rendered here as a plain iframe of that URL with the same arguments (the embed script itself was not ported).
 */
export const blocks: Block[] = [
  {
    type: 'custom',
    children: (
      <>
        <h1 className="text-[40px] font-semibold leading-[normal] text-ink md:text-[56px]">embed</h1>
        <MediaView
          media={{
            type: 'embed',
            src: 'https://iguideradix.com/embed/1121_sample_road_kitchener_on?unbranded=1&bgcolor=FFFFFF',
            title: 'iGuide RADIX 3D walkthrough of 1121 Sample Road, Kitchener, ON',
          }}
          className="mt-10"
        />
      </>
    ),
  },
]

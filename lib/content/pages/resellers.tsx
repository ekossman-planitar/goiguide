/** /resellers — copy, links and asset paths from the live page (checked 2026-10-14). Live is noindex. */
import type {Block} from '@/components/blocks/Blocks'
import {ResellerDirectory} from '@/components/pages/ResellerDirectory'
import {RatingRow} from '@/components/sections/RatingRow'

export const meta = {
  title: 'Find a iGuide reseller in your area | iGuide',
  description: 'Ready to start with iGuide? Find your local iGuide Reseller and discover the impact the PLANIX R1 system can have on your business.',
  path: '/resellers',
}

export const blocks: Block[] = [
  {
    type: 'custom',
    background: 'sky',
    children: (
      <>
        <h1 className="text-balance text-[40px] font-bold leading-[normal] text-ink md:text-[56px]">Find a Reseller in your area</h1>
        <div className="mt-6 mb-8 flex flex-wrap items-center justify-between gap-6">
          <p className="text-xl leading-[30px] text-muted">
            Ready to start with iGuide? Find your local Reseller and explore the PLANIX R1 camera system today.
          </p>
          <div className="hidden md:block">
            <RatingRow />
          </div>
        </div>
        <ResellerDirectory />
      </>
    ),
  },
  // Live also has a "Turn your passion into revenue" band on this page, but it is hidden (display: none), so it is left out.
]

/** /get-iguide/tools/costs-calc-usd — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {costsCalcBlocks} from './costsCalcShared'

export const meta = {
  title: 'Cost Calculator - USA | iGuide',
  // NEW description (live had none)
  description: 'Estimate the cost of an iGuide in the USA with the iGuide pricing calculator, and see the per-square-foot rates used to calculate it.',
  path: '/get-iguide/tools/costs-calc-usd',
}

export const blocks: Block[] = costsCalcBlocks({
  heading: 'Cost Calculator - USA',
  tables: [
    {
      heading: 'iGuide',
      rows: [
        ['Up to 1,500 ft²', '$33'],
        ['1,501-10,000 ft²', '$0.022 per ft²'],
        ['10,001-30,000 ft²', '$220 + $0.017 per ft² from 10,001-30,000'],
        ['30,001-100,000 ft²', '$560 + $0.012 per ft² from 30,001-100,000'],
        ['Over 100,000 ft²', '$1400 + $0.010 per ft² over 100,000'],
      ],
    },
    {
      heading: 'Premium iGuide',
      rows: [
        ['Up to 1,500 ft²', '$45'],
        ['1,501-10,000 ft²', '$0.03 per ft²'],
        ['10,001-30,000 ft²', '$300 + $0.023 per ft² from 10,001-30,000'],
        ['30,001-100,000 ft²', '$760 + $0.017 per ft² from 30,001-100,000'],
        ['Over 100,000 ft²', '$1950 + $0.013 per ft² over 100,000'],
      ],
    },
  ],
})

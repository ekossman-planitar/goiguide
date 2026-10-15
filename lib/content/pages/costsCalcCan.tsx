/** /get-iguide/tools/costs-calc-can — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {costsCalcBlocks} from './costsCalcShared'

export const meta = {
  title: 'Cost Calculator - Canada | iGUIDE',
  // NEW description (live had none)
  description: 'Estimate the cost of an iGUIDE in Canada with the iGUIDE pricing calculator, and see the per-square-foot rates used to calculate it.',
  path: '/get-iguide/tools/costs-calc-can',
}

export const blocks: Block[] = costsCalcBlocks({
  heading: 'Cost Calculator - Canada',
  tables: [
    {
      heading: 'iGUIDE',
      rows: [
        ['Up to 1,500 ft²', '$45'],
        ['1,501-10,000 ft²', '$0.03 per ft²'],
        ['10,001-30,000 ft²', '$300 + $0.023 per ft² from 10,001-30,000'],
        ['30,001-100,000 ft²', '$760 + $0.016 per ft² from 30,001-100,000'],
        ['Over 100,000 ft²', '$1880 + $0.013 per ft² over 100,000'],
      ],
    },
    {
      heading: 'Premium iGUIDE',
      rows: [
        ['Up to 1,500 ft²', '$63'],
        ['1,501-10,000 ft²', '$0.042 per ft²'],
        ['10,001-30,000 ft²', '$420 + $0.032 per ft² from 10,001-30,000'],
        ['30,001-100,000 ft²', '$1060 + $0.024 per ft² from 30,001-100,000'],
        ['Over 100,000 ft²', '$2740 + $0.018 per ft² over 100,000'],
      ],
    },
  ],
})

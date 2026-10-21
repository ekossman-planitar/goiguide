/**
 * Shared layout for /get-iguide/tools/costs-calc-can and -usd: the pricing
 * calculator plus the "Method of Calculation" rate tables (copied per page from live).
 */
import type {Block} from '@/components/blocks/Blocks'
import {PricingCalculator} from '@/components/pricing/PricingCalculator'

export type RateTable = {heading: string; rows: [size: string, rate: string][]}

function Rates({table}: {table: RateTable}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <table className="w-full text-left text-base">
        <caption className="bg-surface px-5 py-4 text-left text-xl font-semibold text-ink">{table.heading}</caption>
        <thead>
          <tr className="border-b border-line text-sm text-muted">
            <th scope="col" className="w-2/5 px-5 py-3 font-semibold">
              Size, ft²
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map(([size, rate]) => (
            <tr key={size} className="border-b border-line last:border-0">
              <td className="px-5 py-3 text-ink">{size}</td>
              <td className="px-5 py-3 text-body">{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function costsCalcBlocks({heading, tables}: {heading: string; tables: RateTable[]}): Block[] {
  return [
    {
      type: 'custom',
      id: 'calculator',
      background: 'surface',
      children: (
        <>
          {/* Live page has no h1; this uses the live page title */}
          <h1 className="mb-10 text-balance text-[40px] font-semibold leading-[normal] text-ink md:text-[56px]">{heading}</h1>
          {/* Live calculator also opens in CAD on this page */}
          <PricingCalculator />
        </>
      ),
    },
    {
      type: 'custom',
      heading: 'Method of Calculation',
      align: 'center',
      children: (
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {tables.map((t) => (
            <Rates key={t.heading} table={t} />
          ))}
        </div>
      ),
    },
  ]
}

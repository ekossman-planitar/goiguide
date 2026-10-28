'use client'

import {useState} from 'react'
import {cn} from '@/lib/cn'
import {pricing} from '@/lib/content/homeSections'

const currencies = ['USD', 'CAD', 'AUD'] as const
type Cur = (typeof currencies)[number]
const standard = pricing.packages.find((p) => p.id === 'standard')

/** Pricing hero: what iGuide actually costs, in one card (prices from the shared package data). */
export function PricingHeroCard() {
  const [currency, setCurrency] = useState<Cur>('USD')
  const rows = [
    {label: 'PLANIX R1 camera', note: 'One-time purchase. Yours to keep.', value: pricing.camera.prices[currency] ?? '–', prefix: ''},
    {
      label: 'iGuide Standard',
      note: 'Per project, priced by square footage. One year of hosting included.',
      value: standard?.prices[currency] ?? '–',
      prefix: 'From ',
    },
  ]
  return (
    <div className="pricing-hero-card rounded-2xl border border-line bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="type-overline text-muted">What you pay</p>
        <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-line bg-surface p-1">
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={currency === c}
              onClick={() => setCurrency(c)}
              className={cn(
                'type-small rounded-full px-3 py-1 font-semibold transition-colors',
                currency === c ? 'bg-primary text-white' : 'text-ink hover:text-primary-hover',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <dl className="mt-6 divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-6 py-4">
            <dt>
              <span className="type-heading-xs block text-ink">{r.label}</span>
              <span className="type-small block text-muted">{r.note}</span>
            </dt>
            <dd className="type-heading-sm shrink-0 text-right whitespace-nowrap text-ink tabular-nums">
              {r.prefix && <span className="type-small font-normal text-muted">{r.prefix}</span>}
              {r.value}
            </dd>
          </div>
        ))}
        <div className="flex items-start justify-between gap-6 py-4">
          <dt>
            <span className="type-heading-xs block text-ink">Monthly subscription</span>
            <span className="type-small block text-muted">No monthly fees, no storage limits, no penalties.</span>
          </dt>
          <dd className="shrink-0 text-right text-5xl leading-none font-semibold text-ink tabular-nums">$0</dd>
        </div>
      </dl>
    </div>
  )
}

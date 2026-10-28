'use client'

import {useId, useState} from 'react'
import {Button} from '@/components/ui/Button'
import {Select} from '@/components/ui/Select'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {
  cameraPrice,
  earningsCurrencies,
  earningsIndustries,
  processingCost,
  suggestedCharge,
  type EarningsCurrency,
  type EarningsIndustry,
} from '@/lib/content/earnings'
import {book} from '@/lib/content/solutions/shared'

const field =
  'h-12 w-full rounded-lg border border-muted bg-white pr-16 pl-4 text-base text-ink focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
const label = 'type-small mb-1.5 block font-medium text-ink'
const unit = 'type-small pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-semibold text-muted'

const money0 = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const money2 = (n: number) => `$${n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
const num = (v: string) => Number.parseFloat(v) || 0

function NumberField({
  id,
  labelText,
  value,
  onChange,
  suffix,
  step,
  hint,
}: Readonly<{id: string; labelText: string; value: string; onChange: (v: string) => void; suffix: string; step: number; hint?: string}>) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {labelText}
      </label>
      <div className="relative">
        <input id={id} type="number" inputMode="decimal" min={0} step={step} value={value} onChange={(e) => onChange(e.target.value)} className={field} />
        <span className={unit}>{suffix}</span>
      </div>
      {hint && <p className="type-small mt-1.5 text-muted">{hint}</p>}
    </div>
  )
}

/**
 * "See what you could earn": what an operator keeps per job and how fast the
 * PLANIX R1 pays for itself. Pure estimate in the browser: nothing is sent anywhere.
 * GTM: root has .earnings-calculator; the CTA keeps the booking button's classes.
 */
export function EarningsCalculator() {
  const uid = useId()
  const [currency, setCurrency] = useState<EarningsCurrency>('USD')
  const [industry, setIndustry] = useState<EarningsIndustry>(earningsIndustries[0])
  const [size, setSize] = useState(String(earningsIndustries[0].sqft))
  const [charge, setCharge] = useState<string | null>(null) // null = use the suggested charge
  const [jobs, setJobs] = useState(earningsIndustries[0].jobs)
  const [own, setOwn] = useState('0')
  const [cams, setCams] = useState('1')

  const sqft = num(size)
  const chargeValue = charge ?? String(suggestedCharge(industry, sqft, currency))
  const cameras = Math.max(1, Math.round(num(cams)))
  const totalJobs = cameras * jobs
  const cost = processingCost(industry, sqft, currency)
  const perJob = num(chargeValue) - cost - num(own)
  const margin = num(chargeValue) > 0 ? (perJob / num(chargeValue)) * 100 : 0
  const monthly = perJob * totalJobs
  const outlay = cameraPrice[currency] * cameras
  const payback = perJob > 0 && monthly > 0 ? Math.ceil(outlay / monthly) : null

  const chooseIndustry = (id: string) => {
    const next = earningsIndustries.find((i) => i.id === id) ?? earningsIndustries[0]
    setIndustry(next)
    setSize(String(next.sqft))
    setJobs(next.jobs)
    setCharge(null)
  }

  return (
    <div className="earnings-calculator grid overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:grid-cols-[minmax(0,1fr)_420px]">
      {/* Inputs */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="type-heading-sm text-ink">Your numbers</h3>
          <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-line bg-surface p-1">
            {earningsCurrencies.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={currency === c}
                onClick={() => {
                  setCurrency(c)
                  setCharge(null)
                }}
                className={cn(
                  'type-small rounded-full px-4 py-1.5 font-semibold transition-colors',
                  currency === c ? 'bg-primary text-white' : 'text-ink hover:text-primary-hover',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor={`${uid}-industry`} className={label}>
              What kind of work do you do?
            </label>
            <Select
              id={`${uid}-industry`}
              options={earningsIndustries.map((i) => ({value: i.id, label: i.label}))}
              value={industry.id}
              onChange={chooseIndustry}
              size="lg"
              tone="field"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField id={`${uid}-size`} labelText="Typical property size" value={size} onChange={setSize} suffix="sq ft" step={100} />
            <NumberField
              id={`${uid}-charge`}
              labelText="You would charge"
              value={chargeValue}
              onChange={setCharge}
              suffix={currency}
              step={5}
              hint={industry.hint || undefined}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-jobs`} className={cn(label, 'flex justify-between')}>
              <span>{cameras > 1 ? 'Jobs per camera, per month' : 'Jobs per month'}</span>
              <span className="font-semibold tabular-nums">{jobs}</span>
            </label>
            <input
              id={`${uid}-jobs`}
              type="range"
              min={1}
              max={60}
              step={1}
              value={jobs}
              onChange={(e) => setJobs(Number(e.target.value))}
              className="w-full accent-primary"
            />
            {cameras > 1 && (
              <p className="type-small mt-1.5 text-muted">
                {cameras} cameras × {jobs} = <strong className="text-ink">{totalJobs} jobs a month</strong>
              </p>
            )}
          </div>

          <details className="group border-t border-line pt-4">
            <summary className="type-small flex cursor-pointer list-none items-center gap-2 font-semibold text-ink transition-colors hover:text-primary-hover [&::-webkit-details-marker]:hidden">
              <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full border border-current leading-none">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
              Add your own costs and cameras
            </summary>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <NumberField
                id={`${uid}-own`}
                labelText="Your cost per job"
                value={own}
                onChange={setOwn}
                suffix={currency}
                step={5}
                hint="Time, travel and editing."
              />
              <NumberField id={`${uid}-cams`} labelText="Cameras" value={cams} onChange={setCams} suffix="cameras" step={1} />
            </div>
          </details>
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col bg-surface p-6 md:p-8" aria-live="polite">
        <p className="type-overline text-muted">You could keep</p>
        <p className="mt-2 text-5xl leading-none font-semibold text-ink tabular-nums">
          {money0(Math.max(0, monthly))}
          <span className="type-body ml-2 font-semibold text-muted">{currency}</span>
        </p>
        <p className="type-body mt-3 text-body">
          a month, or <strong className="text-ink">{money0(Math.max(0, monthly * 12))}</strong> a year
        </p>

        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <p className="type-overline text-muted">Your camera pays for itself in</p>
          <p className="type-heading-md mt-1 text-ink">
            {payback === null ? '–' : payback <= 1 ? 'Under a month' : payback > 60 ? 'Over 5 years' : `${payback} months`}
          </p>
          <p className="type-small mt-1 text-muted">
            {payback === null
              ? 'Set a price above the iGuide cost to see payback.'
              : `Based on ${money0(outlay)} ${currency} for ${cameras === 1 ? 'a PLANIX R1' : `${cameras} PLANIX R1s`} at this volume. Then it keeps earning.`}
          </p>
        </div>

        <dl className="type-small mt-6 space-y-2 border-t border-line pt-4">
          {[
            ['You charge', money0(num(chargeValue))],
            ['iGuide costs you', money2(cost)],
            [num(own) > 0 ? 'You keep, after your costs' : 'You keep, before your own time', money0(Math.max(0, perJob))],
            ['Margin', `${Math.round(Math.max(0, margin))}%`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-muted">{k}</dt>
              <dd className="font-semibold text-ink tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="type-small mt-3 text-muted">
          Priced on <strong className="text-ink">{industry.packageName}</strong> at {Math.round(sqft).toLocaleString('en-US')} sq ft, 2026 list pricing.
        </p>
        {payback === null && (
          <p role="alert" className="type-small mt-4 rounded-lg border border-error bg-white p-3 text-error">
            At that price the job doesn’t cover what iGuide charges to deliver it.
          </p>
        )}

        <div className="mt-6 flex flex-col items-start gap-3">
          <Button href={book('Book a demo').href} size="lg" className={cn('w-full', book().className)}>
            Book a demo
          </Button>
          <SmartLink href="#calculator" className="text-link">
            Or price a specific project
            <ArrowRight width={16} height={16} />
          </SmartLink>
        </div>
        <p className="type-caption mt-6 text-muted">
          Estimate only, based on the figures you enter. Actual earnings depend on your pricing, your volume and the properties you capture.
          {industry.id === 'residential' && ' If you bundle iGuide with photography, your photo costs are not included.'}
        </p>
      </div>
    </div>
  )
}

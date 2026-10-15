'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {Button} from '@/components/ui/Button'
import {cn} from '@/lib/cn'
import {calcAddons, calcIndustries, calcPackages, calculator} from '@/lib/content/pricing'

type Currency = (typeof calculator.currencies)[number]
type Result =
  {state: 'idle' | 'loading' | 'error'} | {state: 'done'; total: string; currency: string; customQuote: boolean}

const field =
  'h-12 w-full rounded-lg border border-[#d4d4d8] bg-white px-4 text-base text-ink focus:border-primary focus:outline-2 focus:outline-primary/30 disabled:cursor-not-allowed disabled:border-[#e4e4e7] disabled:bg-surface disabled:text-muted'

/** Native select with our own chevron, inset from the edge */
function Select({className, children, ...props}: React.ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select {...props} className={cn(field, 'appearance-none pr-11', className)}>
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="m5 7.5 5 5 5-5" />
      </svg>
    </div>
  )
}
const labelCls = 'mb-2 block text-sm font-semibold tracking-wide text-ink uppercase'

function Segmented<T extends string>({
  name,
  options,
  value,
  onChange,
  labels,
}: {
  name: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  labels?: Record<string, string>
}) {
  return (
    <div className="inline-flex h-12 items-stretch rounded-lg border border-[#d4d4d8] bg-white p-1">
      {options.map((opt) => (
        <label
          key={opt}
          className={cn(
            'flex cursor-pointer items-center rounded-md px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary',
            value === opt ? 'bg-primary text-white' : 'text-ink hover:text-primary-hover',
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="sr-only"
          />
          {labels?.[opt] ?? opt}
        </label>
      ))}
    </div>
  )
}

/**
 * Pricing calculator. Same inputs and rules as the live Silverstripe element:
 * industry → packages → add-ons, size in ft² or m², 500 ms debounced estimates.
 */
export function PricingCalculator() {
  const [currency, setCurrency] = useState<Currency>(calculator.defaultCurrency)
  const [industryId, setIndustryId] = useState(calcIndustries[0].id)
  const industry = calcIndustries.find((i) => i.id === industryId)!
  const [packageId, setPackageId] = useState<number | ''>(calcIndustries[0].packages[0] ?? '')
  const pkg = packageId === '' ? undefined : calcPackages[packageId]
  const [addons, setAddons] = useState<string[]>([])
  const [unit, setUnit] = useState<'ft' | 'm'>('ft')
  const [size, setSize] = useState(String(calculator.defaultSize))
  const [result, setResult] = useState<Result>({state: 'idle'})
  const requestId = useRef(0)

  const isRadix = pkg?.iguideType === 'radix'
  const sizeNumber = Math.min(Number(size.replace(/\D/g, '')) || 0, isRadix ? 75 : Infinity)

  const selectIndustry = (id: number) => {
    setIndustryId(id)
    // Pre-select the industry's first package so an estimate shows straight away
    const first = calcIndustries.find((i) => i.id === id)?.packages[0]
    setPackageId(first ?? '')
    setAddons(first ? (calcPackages[first].autoSelected ?? []) : [])
    setResult({state: 'idle'})
  }
  const selectPackage = (id: number | '') => {
    setPackageId(id)
    setAddons(id === '' ? [] : (calcPackages[id].autoSelected ?? []))
  }
  const toggleAddon = (code: string) => {
    if (pkg?.required?.includes(code)) return
    setAddons((prev) => (prev.includes(code) ? prev.filter((a) => a !== code) : [...prev, code]))
  }

  const payload = useMemo(
    () => (pkg && sizeNumber > 0 ? {currency, packageId: pkg.id, addons, unit, size: sizeNumber} : null),
    [currency, pkg, addons, unit, sizeNumber],
  )

  const calculate = async () => {
    if (!payload) return
    const id = ++requestId.current
    setResult({state: 'loading'})
    try {
      const res = await fetch('/api/pricing-calculator', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (id !== requestId.current) return
      setResult(
        data.status
          ? {state: 'done', total: data.total, currency: data.currency, customQuote: data.enableCustomQuote}
          : {state: 'error'},
      )
    } catch {
      if (id === requestId.current) setResult({state: 'error'})
    }
  }

  // Recalculate 500 ms after the last change (live behaviour)
  useEffect(() => {
    if (!payload) return
    const t = setTimeout(calculate, 500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload])

  const noCalc = industry.noCalc
  const total = result.state === 'done' && !result.customQuote ? result.total : '$0.00'

  return (
    <div className="grid overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <form
        id="Form_PricingCalculatorForm"
        className="space-y-6 p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault()
          calculate()
        }}
      >
        <Segmented name="Country" options={calculator.currencies} value={currency} onChange={setCurrency} />

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="Form_PricingCalculatorForm_Industry" className={labelCls}>
              Industry:
            </label>
            <Select
              id="Form_PricingCalculatorForm_Industry"
              value={industryId}
              onChange={(e) => selectIndustry(Number(e.target.value))}
            >
              {calcIndustries.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.title}
                </option>
              ))}
            </Select>
          </div>
          {/* Industries priced by quote (Design & Construction) hide the remaining fields; the panel explains why */}
          {!noCalc && (
            <div>
              <label htmlFor="Form_PricingCalculatorForm_Package" className={labelCls}>
                iGUIDE Selector:
              </label>
              <Select
                id="Form_PricingCalculatorForm_Package"
                value={packageId}
                onChange={(e) => selectPackage(e.target.value === '' ? '' : Number(e.target.value))}
              >
                <option value="">-- select one --</option>
                {industry.packages.map((id) => (
                  <option key={id} value={id}>
                    {calcPackages[id].title}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>

        {!noCalc && (
          <>
            <fieldset id="Form_PricingCalculatorForm_Addons">
              <legend className={labelCls}>Add-ons:</legend>
              {pkg && pkg.addons.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {pkg.addons.map((code) => {
                    const checked = addons.includes(code)
                    const locked = pkg.required?.includes(code)
                    return (
                      <label
                        key={code}
                        className={cn(
                          'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary',
                          checked
                            ? 'border-primary bg-primary-soft text-primary'
                            : 'border-[#d4d4d8] text-ink hover:border-primary-hover',
                          locked && 'cursor-default',
                        )}
                      >
                        <input
                          type="checkbox"
                          name={`Addons[${code}]`}
                          checked={checked}
                          disabled={locked}
                          onChange={() => toggleAddon(code)}
                          className="sr-only"
                        />
                        {calcAddons[code]}
                        {locked && <span className="text-xs text-muted">(included)</span>}
                      </label>
                    )
                  })}
                </div>
              ) : (
                <p className="text-base text-muted">{pkg ? 'No add-ons available' : 'Please select an add-on'}</p>
              )}
            </fieldset>

            <div className="flex flex-wrap items-end gap-4">
              <div className="min-w-[180px] flex-1">
                <label htmlFor="Form_PricingCalculatorForm_Size" className={labelCls}>
                  {isRadix ? 'Number of scans:' : 'Property size:'}
                </label>
                <input
                  id="Form_PricingCalculatorForm_Size"
                  inputMode="numeric"
                  className={field}
                  value={sizeNumber ? sizeNumber.toLocaleString('en-US') : ''}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              {!isRadix && (
                <Segmented
                  name="Unit"
                  options={['ft', 'm'] as const}
                  value={unit}
                  onChange={setUnit}
                  labels={{ft: 'ft²', m: 'm²'}}
                />
              )}
              <button
                type="submit"
                id="Form_PricingCalculatorForm_action_doCalculate"
                disabled={!payload}
                className="h-12 rounded-lg border border-primary bg-primary px-6 font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                Calculate
              </button>
            </div>
          </>
        )}
      </form>

      <div id="calculator-content" className="flex flex-col bg-sky p-6 sm:p-8" aria-live="polite">
        {noCalc ? (
          <>
            <h3 className="text-2xl font-semibold text-ink">{noCalc.title}</h3>
            <p className="mt-3 text-lg leading-7 text-body">{noCalc.message}</p>
          </>
        ) : (
          <>
            <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">Estimated Cost</h3>
            <p className="mt-2 flex items-baseline gap-2">
              <span
                id="calculator-calculated-cost"
                className={cn('text-5xl font-bold text-ink', result.state === 'loading' && 'opacity-40')}
              >
                {total}
              </span>
              <span id="calculator-calculated-currency" className="text-lg font-semibold text-ink">
                {result.state === 'done' ? result.currency : currency}
              </span>
            </p>
            {result.state === 'done' && result.customQuote && (
              <p className="mt-4 text-base leading-6 text-ink">{calculator.customQuoteMessage}</p>
            )}
            {result.state === 'error' && (
              <p className="mt-4 text-base text-ink">We couldn’t calculate an estimate right now. Please try again.</p>
            )}
            <p className="mt-6 text-sm leading-5 text-muted">{calculator.disclaimer}</p>
          </>
        )}
        <div className="mt-auto pt-6">
          {/* Live: opens a "Book your demo today" HubSpot form pre-filled with the estimate */}
          <Button href="/book-a-demo" size="lg" variant="secondary" className="pricing-calc-contact-button w-full">
            Get started
          </Button>
        </div>
      </div>
    </div>
  )
}

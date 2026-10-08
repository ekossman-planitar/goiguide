'use client'

import {FallbackImage} from '@/components/ui/FallbackImage'
import {useId, useMemo, useState} from 'react'
import {cn} from '@/lib/cn'
import {currencies, industries, type Currency, type IndustryId, type Package, type Prices} from '@/lib/content/homeSections'

export type PackageData = Package
export type CameraData = {
  name: string
  prices: Prices
  intro: string
  body: string
  cta: {label: string; href: string}
  shopLink: {label: string; href: string}
  review: {quote: string; name: string; role: string; company: string}
  image: string
}
export type PricingData = {
  heading: string
  subheading: string
  allLink: {label: string; href: string}
  camera: CameraData
  packages: PackageData[]
}

/** Currency + industry state shared by every pricing layout. */
export function usePricingFilters(packages: PackageData[]) {
  const [currency, setCurrency] = useState<Currency>('CAD')
  const [industry, setIndustry] = useState<IndustryId>('all')
  const visible = useMemo(
    () =>
      packages.filter(
        (pkg) =>
          // Hide packages with no price in this currency (e.g. Instant has no CAD price)
          pkg.prices[currency] && (industry === 'all' || pkg.industries.includes(industry)),
      ),
    [packages, currency, industry],
  )
  return {currency, setCurrency, industry, setIndustry, visible}
}

/** Segmented CAD / USD / AUD switch. */
export function CurrencySwitch({value, onChange}: {value: Currency; onChange: (c: Currency) => void}) {
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-full border border-line bg-white p-1">
      {currencies.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          onClick={() => onChange(c)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm leading-5 font-semibold transition-colors',
            value === c ? 'bg-primary text-white' : 'text-ink hover:text-primary',
          )}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

/** Industry filter, as chips or a compact dropdown. */
export function IndustryFilter({
  value,
  onChange,
  variant = 'chips',
}: {
  value: IndustryId
  onChange: (i: IndustryId) => void
  variant?: 'chips' | 'select'
}) {
  const id = useId()
  if (variant === 'select') {
    return (
      <div className="relative">
        <label htmlFor={id} className="sr-only">
          Industry
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as IndustryId)}
          className="h-10 appearance-none rounded-full border border-line bg-white pr-10 pl-4 text-sm font-medium text-ink"
        >
          {industries.map((i) => (
            <option key={i.id} value={i.id}>
              {i.label}
            </option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    )
  }
  return (
    <div role="radiogroup" aria-label="Industry" className="flex flex-wrap gap-2">
      {industries.map((i) => (
        <button
          key={i.id}
          type="button"
          role="radio"
          aria-checked={value === i.id}
          onClick={() => onChange(i.id)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm leading-5 font-medium transition-colors',
            value === i.id
              ? 'border-primary bg-primary-soft text-primary'
              : 'border-line bg-white text-ink hover:border-primary hover:text-primary',
          )}
        >
          {i.label}
        </button>
      ))}
    </div>
  )
}

/** "Starting at / $48.00 CAD" */
export function PriceTag({
  label,
  prices,
  currency,
  size = 'md',
}: {
  label?: string
  prices: Prices
  currency: Currency
  size?: 'sm' | 'md' | 'lg'
}) {
  const price = prices[currency]
  return (
    <div>
      {label && <p className="text-sm leading-5 font-semibold text-ink">{label}</p>}
      <p className="mt-1 flex items-baseline gap-1.5">
        <span
          className={cn(
            'font-bold text-ink tabular-nums',
            size === 'sm' && 'text-2xl',
            size === 'md' && 'text-[32px] leading-10',
            size === 'lg' && 'text-[32px] leading-10 sm:text-[40px] sm:leading-[48px]',
          )}
        >
          {price ?? '—'}
        </span>
        <span className="text-xs font-semibold text-ink">{currency}</span>
      </p>
    </div>
  )
}

/** Image, or a neutral placeholder until the file is added to /public. */
export function PackageImage({
  src,
  alt,
  className,
  thumb = false,
  bare = false,
}: {
  src: string
  alt: string
  className?: string
  thumb?: boolean
  /** No background box or padding around the image */
  bare?: boolean
}) {
  return (
    <div className={cn('relative overflow-hidden', !bare && 'bg-surface', thumb ? 'rounded-lg' : 'rounded-xl', className)}>
      <FallbackImage
        src={src}
        alt={alt}
        fill
        sizes={thumb ? '64px' : '(min-width: 1024px) 25vw, 50vw'}
        className={cn('object-contain', !bare && (thumb ? 'p-1' : 'p-3'))}
      />
    </div>
  )
}

/** Checkmark list of what a package includes. */
export function IncludesList({items}: {items: string[]}) {
  return (
    <ul className="mt-3 space-y-1.5 text-sm leading-[22px] text-body">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12.5 10 17 19 7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Camera photo, or an empty panel until the file is added. */
export function CameraImage({src, alt, sizes}: {src: string; alt: string; sizes: string}) {
  return (
    <FallbackImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-contain"
      fallback={<div className="h-full w-full rounded-xl bg-surface" />}
    />
  )
}

/** Small text link with arrow. */
export function ArrowLink({href, children, className}: {href: string; children: React.ReactNode; className?: string}) {
  return (
    <a href={href} className={cn('group inline-flex items-center gap-1.5 text-sm font-semibold text-primary', className)}>
      {children}
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}

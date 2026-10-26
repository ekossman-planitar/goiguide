'use client'

import {Check} from 'lucide-react'
import {ArrowRight} from '@/components/ui/icons'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {useMemo, useState} from 'react'
import {Select} from '@/components/ui/Select'
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
export function CurrencySwitch({value, onChange}: Readonly<{value: Currency; onChange: (c: Currency) => void}>) {
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
            value === c ? 'bg-primary text-white' : 'text-ink hover:text-primary-hover',
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
}: Readonly<{
  value: IndustryId
  onChange: (i: IndustryId) => void
  variant?: 'chips' | 'select'
}>) {
  if (variant === 'select') {
    return (
      <Select
        label="Industry"
        shape="pill"
        options={industries.map((i) => ({value: i.id, label: i.label}))}
        value={value}
        onChange={(v) => onChange(v as IndustryId)}
        className="w-56"
        align="right"
      />
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
              : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover',
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
}: Readonly<{
  label?: string
  prices: Prices
  currency: Currency
  size?: 'sm' | 'md' | 'lg'
}>) {
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
          {price ?? '–'}
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
}: Readonly<{
  src: string
  alt: string
  className?: string
  thumb?: boolean
  /** No background box or padding around the image */
  bare?: boolean
}>) {
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
export function IncludesList({items}: Readonly<{items: string[]}>) {
  return (
    <ul className="mt-3 space-y-1.5 text-sm leading-[22px] text-body">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Camera photo, or an empty panel until the file is added. */
export function CameraImage({src, alt, sizes}: Readonly<{src: string; alt: string; sizes: string}>) {
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
export function ArrowLink({href, children, className}: Readonly<{href: string; children: React.ReactNode; className?: string}>) {
  return (
    <a href={href} className={cn('text-link text-sm', className)}>
      {children}
      <ArrowRight aria-hidden width={16} height={16} />
    </a>
  )
}

'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {ChevronDown} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {
  ArrowLink,
  CurrencySwitch,
  IndustryFilter,
  IncludesList,
  CameraImage,
  PackageImage,
  PriceTag,
  usePricingFilters,
  type PricingData,
} from './shared'

/** Pricing: camera on the left (1/3), packages as an expandable list on the right (2/3). */
export function PricingSideBySide({data}: {data: PricingData}) {
  const {currency, setCurrency, industry, setIndustry, visible} = usePricingFilters(data.packages)
  const [open, setOpen] = useState<string | null>(null)
  const {camera} = data

  return (
    <section className="py-10 lg:py-[60px]">
      <Container>
        <div className="rounded-2xl bg-surface px-4 py-12 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading heading={data.heading} subheading={data.subheading} className="lg:flex-1" />
            <CurrencySwitch value={currency} onChange={setCurrency} />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Step 1: camera */}
            <article className="flex min-w-0 flex-col rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold text-primary">Step 1 · Get the camera</p>
              <h3 className="mt-1 text-2xl font-bold text-ink">{camera.name}</h3>
              <div className="relative my-6 h-56">
                <CameraImage src={camera.image} alt={camera.name} sizes="(min-width: 1024px) 25vw, 80vw" />
              </div>
              <PriceTag prices={camera.prices} currency={currency} size="lg" />
              <p className="mt-4 text-body">{camera.intro}</p>
              <div className="mt-auto pt-6">
                <Button href={camera.cta.href} size="lg" className="w-full">
                  {camera.cta.label}
                </Button>
                <ArrowLink href={camera.shopLink.href} className="mt-4">
                  {camera.shopLink.label}
                </ArrowLink>
              </div>
            </article>

            {/* Step 2: packages */}
            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:col-span-2 lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Step 2 · Choose a package</p>
                  <h3 className="mt-1 text-2xl font-bold text-ink">iGUIDE packages</h3>
                </div>
                <IndustryFilter value={industry} onChange={setIndustry} variant="select" />
              </div>

              <ul className="mt-6 divide-y divide-line border-y border-line" aria-live="polite">
                {visible.map((pkg) => {
                  const isOpen = open === pkg.id
                  return (
                    <li key={pkg.id}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`pkg-${pkg.id}`}
                        onClick={() => setOpen(isOpen ? null : pkg.id)}
                        // Hovering anywhere on the row (or having it open) turns the name blue
                        className="group flex w-full items-center gap-3 py-3 text-left sm:gap-4"
                      >
                        <PackageImage src={pkg.image} alt="" thumb className="h-10 w-12 shrink-0 sm:h-12 sm:w-16" />
                        <span
                          className={cn(
                            'min-w-0 flex-1 text-base font-semibold transition-colors group-hover:text-primary sm:text-lg',
                            isOpen ? 'text-primary' : 'text-ink',
                          )}
                        >
                          {pkg.name}
                        </span>
                        <span className="hidden text-sm text-muted sm:inline">{pkg.priceLabel}</span>
                        <span className="shrink-0 text-right text-base font-bold whitespace-nowrap text-ink tabular-nums sm:w-28 sm:text-lg">
                          {pkg.prices[currency]} <span className="text-xs font-semibold">{currency}</span>
                        </span>
                        <ChevronDown className={cn('shrink-0 text-primary transition-transform', isOpen && 'rotate-180')} />
                      </button>
                      <div id={`pkg-${pkg.id}`} hidden={!isOpen} className="pb-6">
                        {/* Image, Includes and Best for side by side, no extra click */}
                        <div className="grid gap-4 md:grid-cols-3">
                          <PackageImage src={pkg.image} alt={pkg.name} bare className="aspect-[4/3] md:aspect-auto md:min-h-[200px]" />
                          <div className="rounded-xl bg-surface p-5">
                            <h4 className="text-sm font-semibold text-ink">Includes</h4>
                            <IncludesList items={pkg.includes} />
                          </div>
                          <div className="rounded-xl border border-line bg-white p-5">
                            <h4 className="text-sm font-semibold text-ink">Best for</h4>
                            <p className="mt-3 text-sm leading-[22px] text-body">{pkg.bestFor}</p>
                          </div>
                        </div>
                        {pkg.sample && (
                          <ArrowLink href={pkg.sample.href} className="mt-4">
                            {pkg.sample.label}
                          </ArrowLink>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <ArrowLink href={data.allLink.href} className="mt-6 text-base">
                {data.allLink.label}
              </ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

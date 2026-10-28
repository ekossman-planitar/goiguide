/**
 * Earnings (ROI) calculator for /pricing: from Marketing's "iGUIDE Earnings
 * Calculator Block v2" (2026-10-27). Processing rates are the 2026 master price
 * list (Essential portal); checked against the Portal cost API on 2026-10-27
 * (Standard 2,000 sq ft = $46.00 USD / $64.00 CAD, Premium 3,000 sq ft =
 * $93.00 / $132.00, Standard Sketch 1,800 sq ft = $77.40 / $108.00).
 */
import {pricing as homePricing} from './homeSections'

export type EarningsCurrency = 'USD' | 'CAD'
export const earningsCurrencies: EarningsCurrency[] = ['USD', 'CAD']

/** Tier breakpoints (sq ft): the first 1,500 sq ft are in the base price */
export const processingTiers = [1500, 10000, 30000, 100000]

export const packageRates: Record<'Standard' | 'Premium', Record<EarningsCurrency, {base: number; rates: number[]}>> = {
  Standard: {USD: {base: 34.5, rates: [0.023, 0.017, 0.012, 0.01]}, CAD: {base: 48, rates: [0.032, 0.023, 0.016, 0.013]}},
  Premium: {USD: {base: 46.5, rates: [0.031, 0.023, 0.017, 0.013]}, CAD: {base: 66, rates: [0.044, 0.032, 0.024, 0.018]}},
}

/** Xactimate ESX: billed from the first sq ft, breaks at 10k / 30k / 100k */
export const esxRates: Record<EarningsCurrency, number[]> = {USD: [0.02, 0.015, 0.011, 0.009], CAD: [0.028, 0.021, 0.015, 0.012]}
export const esxTiers = [10000, 30000, 100000]

/** PLANIX R1 price: the same figures the homepage and pricing packages show */
const toNumber = (price: string) => Number(price.replace(/[^0-9.]/g, ''))
export const cameraPrice: Record<EarningsCurrency, number> = {
  USD: toNumber(homePricing.camera.prices.USD ?? '0'),
  CAD: toNumber(homePricing.camera.prices.CAD ?? '0'),
}

export type EarningsIndustry = {
  id: 'residential' | 'irc' | 'aec' | 'fm'
  label: string
  pkg: 'Standard' | 'Premium'
  esx: boolean
  packageName: string
  sqft: number
  jobs: number
  /** Suggested charge: one value, or one per size bracket (<1,500 / <2,500 / <4,000 / larger) */
  charge: Record<EarningsCurrency, number | number[]>
  hint: string
}

/*
 * Real estate charges come from 26 published operator rate cards (CAD: the iGuide
 * uplift in CMC Photo's matrix; USD: Square Foot Photography / Reflecting Walls /
 * Pixelray ladders). The other three industries' charges are placeholders in the
 * source file, to be confirmed with Sales before launch.
 */
export const earningsIndustries: EarningsIndustry[] = [
  {
    id: 'residential',
    label: 'Real estate listings',
    pkg: 'Standard',
    esx: false,
    packageName: 'iGuide Standard',
    sqft: 2000,
    jobs: 20,
    charge: {USD: [185, 245, 275, 349], CAD: [150, 195, 280, 400]},
    hint: 'Bundle it with photos? Use what it adds to your package.',
  },
  {
    id: 'irc',
    label: 'Insurance and restoration',
    pkg: 'Standard',
    esx: true,
    packageName: 'iGuide Standard Sketch',
    sqft: 1800,
    jobs: 15,
    charge: {USD: 300, CAD: 400},
    hint: 'Includes the Xactimate ESX sketch.',
  },
  {
    id: 'aec',
    label: 'Architecture and remodel',
    pkg: 'Premium',
    esx: false,
    packageName: 'iGuide Premium',
    sqft: 3000,
    jobs: 10,
    charge: {USD: 450, CAD: 600},
    hint: 'Premium adds fixtures, cabinets and ceilings to the plan.',
  },
  {
    id: 'fm',
    label: 'Facility management',
    pkg: 'Standard',
    esx: false,
    packageName: 'iGuide Standard',
    sqft: 5000,
    jobs: 8,
    charge: {USD: 600, CAD: 800},
    hint: '',
  },
]

function tiered(sqft: number, p: {base: number; rates: number[]}) {
  if (sqft <= 0) return 0
  let total = p.base
  let prev = processingTiers[0]
  for (let i = 0; i < p.rates.length; i++) {
    const cap = processingTiers[i + 1] ?? Infinity
    total += Math.max(0, Math.min(sqft, cap) - prev) * p.rates[i]
    prev = cap
    if (sqft <= cap) break
  }
  return total
}

function esx(sqft: number, currency: EarningsCurrency) {
  const r = esxRates[currency]
  let total = 0
  let prev = 0
  for (let i = 0; i < r.length; i++) {
    const cap = esxTiers[i] ?? Infinity
    total += Math.max(0, Math.min(sqft, cap) - prev) * r[i]
    prev = cap
    if (sqft <= cap) break
  }
  return total
}

/** iGuide processing cost for one job */
export function processingCost(industry: EarningsIndustry, sqft: number, currency: EarningsCurrency) {
  return tiered(sqft, packageRates[industry.pkg][currency]) + (industry.esx ? esx(sqft, currency) : 0)
}

export function suggestedCharge(industry: EarningsIndustry, sqft: number, currency: EarningsCurrency) {
  const c = industry.charge[currency]
  if (typeof c === 'number') return c
  return c[sqft < 1500 ? 0 : sqft < 2500 ? 1 : sqft < 4000 ? 2 : 3]
}

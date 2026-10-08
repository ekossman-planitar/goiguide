/** /pricing — copy, prices and calculator setup from the live page (checked 2026-10-07). */
import {SmartLink} from '@/components/ui/SmartLink'
import type {Deliverable} from '@/components/blocks/DeliverableCards'
import {pricing as homePricing} from './homeSections'

export const meta = {
  title: 'iGUIDE Pricing, Packages, Options and Add-ons | iGUIDE',
  description:
    'Find the right fit for your needs and budget with per-project pricing, no fees, and flexible add-ons. Learn more about iGUIDE pricing today!',
  path: '/pricing',
}

export const hero = {
  heading: 'No subscriptions, no surprises',
  included: ['Interactive 3D virtual tour', 'Accurate floor plan', 'Measurement tool', 'Shareable property link'],
  footnote:
    '*Included with all iGUIDE packages, except iGUIDE Radix (no floor plan) and iGUIDE Instant (interactive floor plan only, not downloadable).',
  image: {src: '/assets/Pricing-w-Chris-Logo.png', alt: 'pricing w chris'},
}

/** Same package data as the homepage pricing section, with this page's heading */
export const packages = {
  ...homePricing,
  heading: 'Find the right fit for your project',
  subheading: 'Tailored solutions for real estate, insurance, architecture and construction.',
}

/**
 * Add-on prices: the live page shows them in the visitor's currency (picked by
 * IP location). Only CAD values were captured; USD/AUD still to be supplied.
 */
export const addOns: (Deliverable & {priceCAD: string})[] = [
  {
    title: 'Site Plan',
    summary:
      'Site Plans provide a schematic view of the entire property, including buildings and outdoor features. Powered by aerial data and onsite PLANIX captures, they extend iGUIDE value beyond the interior.',
    image: {src: '/assets/Site_Plans_Add-On.jpg', alt: 'image - Site Plan'},
    includes: [],
    priceCAD: '$45 CAD',
  },
  {
    title: 'CAD Floor Plan (DWG)',
    summary:
      'Drafted floor plan in DWG format with LOD 200 detail. Includes AIA standard layers, annotations and LiDAR point cloud data (DXF). Annotations are only included with iGUIDE Premium or Advanced Drawing Packages.',
    image: {src: '/assets/CS0001-Premium-Floor-Plans.png', alt: 'image - CAD Floor Plans'},
    includes: [],
    priceCAD: '$0.028 CAD',
  },
  {
    title: 'Roof Plan',
    summary: 'Drafted roof plan in DWG format. Includes slopes and roof edges of the primary structure. Requires iGUIDE Premium or Advanced Drawing Package.',
    image: {src: '/assets/CS0001-Roof-Plan.png', alt: 'image - Roof Plan'},
    includes: [],
    priceCAD: '$0.042 CAD',
  },
  {
    title: 'Exterior Elevations',
    summary:
      'Drafted exterior elevation drawings in DWG format, including front, rear and side building façades. Requires iGUIDE Premium or Advanced Drawing Package.',
    image: {src: '/assets/CS0001-Exterior-Elevations.png', alt: 'image - Exterior Elevations'},
    includes: [],
    priceCAD: '$0.042 CAD',
  },
  {
    title: 'Reflected Ceiling Plan',
    summary:
      'Drafted reflected ceiling plan (DWG format) with elements like bulkheads, lighting and ceiling height indicators. Requires iGUIDE Premium or Advanced Drawing Package.',
    image: {src: '/assets/RS0001-Reflected-Ceiling-Plans.png', alt: 'image - Reflected Ceiling Plan'},
    includes: [],
    priceCAD: '$0.042 CAD',
  },
  {
    title: '3D Model',
    summary: '3D model of drafted floors (Revit or DWG). Includes walls, doors, windows and basic structural elements. Requires iGUIDE Premium or Advanced Drawing Package.',
    image: {src: '/assets/CS0001-3DModel-DWG.png', alt: 'image - 3D Model'},
    includes: [],
    priceCAD: '$0.110 CAD',
  },
]

export const faq = {
  heading: 'Frequently asked questions',
  items: [
    {
      q: 'How does the pricing work?',
      a: 'iGUIDE processing fees are based on billable area per project. When hiring a provider, their capture fee is separate and varies by location.',
    },
    {
      q: 'How fast will I receive my iGUIDE deliverables, and what does it cost?',
      a: (
        <>
          <p>
            <strong>Pricing guides:</strong>
          </p>
          <ul>
            <li>
              <a href="https://help.youriguide.com/hc/en-us/articles/31597372907154-US-and-Rest-of-World-Pricing" target="_blank" rel="noopener noreferrer">
                USD Imperial
              </a>
            </li>
            <li>
              <a href="https://help.youriguide.com/hc/en-us/articles/31597338688658-Canada-Pricing" target="_blank" rel="noopener noreferrer">
                CAD Imperial
              </a>
            </li>
            <li>
              <a href="https://help.youriguide.com/hc/en-us/articles/31538722129682-Australia-Pricing" target="_blank" rel="noopener noreferrer">
                AUD Metric
              </a>
            </li>
          </ul>
          <p>
            <strong>Processing</strong>
          </p>
          <ul>
            <li>Charges are based on billable ft².</li>
            <li>The processing fees include hosting in the iGUIDE Cloud (no hosting fee is currently charged after the first year).</li>
            <li>Processed iGUIDEs can be downloaded for offline viewing or self-hosting.</li>
            <li>
              Total Delivery Cost: iGUIDE processing fees are one part of the total delivery cost, which also includes the cost of data collection,
              as determined by on-site scanning time multiplied by the hourly pay rate of a camera operator. iGUIDE is the leader in
              cost-efficiency, allowing you to service more volume with fewer cameras and camera operators, saving you time and money.
            </li>
          </ul>
          <p>
            <strong>Delivery time and additional requirements</strong>
          </p>
          <ul>
            <li>iGUIDEs with all required data uploaded to the Portal will be processed within 24 hours.</li>
            <li>The exact completion time is contingent on the daily volume of iGUIDEs.</li>
            <li>iGUIDEs are drafted in the order in which the files are uploaded to the Portal.</li>
            <li>No drafting occurs on official holidays in Ontario, Canada.</li>
            <li>
              For iGUIDEs greater than 10,000 sq ft, the standard turnaround time for the completed iGUIDE is not guaranteed. The size and complexity
              of the property will determine the delivery date.
            </li>
            <li>
              You can read additional details regarding{' '}
              <a href="https://help.youriguide.com/hc/en-us/articles/27362487646098-iGUIDE-Delivery-Time-Estimates" target="_blank" rel="noopener noreferrer">
                iGUIDE delivery time estimates
              </a>{' '}
              in our help center.
            </li>
          </ul>
        </>
      ),
    },
    {
      q: 'Why does iGUIDE use a pay-per-project model instead of subscription fees?',
      a: (
        <p>
          Subscription platforms often charge you even when you’re not scanning—and hit you with surprise fees as you grow. iGUIDE does it
          differently. There are no monthly fees, no storage limits, and no penalties. You only pay when you scan. It’s a flexible, transparent
          model that adapts to your workflow and respects your business. Learn more about how{' '}
          <SmartLink href="/blogs/why-subscription-fees-suck-and-why-iguides-pay-per-project-model-respects-your-business">
            iGUIDE&apos;s per-project pricing model respects your business
          </SmartLink>
          .
        </p>
      ),
    },
    {
      q: 'Can I order just the floor plans?',
      // "becuase" is the live site's spelling
      a: 'Discrete floor plans are not available to order. This is becuase the 3D tour is an integral part of every iGUIDE. However, floor plans can be shared discretely if the 3D tour is not required.',
    },
    {
      q: 'What is the processing time for an iGUIDE with a Site Plan Add-on?',
      a: 'iGUIDEs with a Site Plan Add‑on for conventional lot sizes will be processed within 24 hours when all required data is uploaded to the iGUIDE Portal; however, this timeline may not apply to properties with more than 10,000 sq ft (929 sq m) of interior space, extensive acreage or complex site features. In such cases, delivery of the iGUIDE + Site Plan Add-on will depend on overall size and complexity and may exceed 48 hours.',
    },
  ],
}

/* ---------- Pricing calculator ---------- */

/**
 * Industries, packages and add-ons as the live calculator serves them
 * (/pricing/element/2300/updatedFields and /updatedAddonsField, read 2026-10-07).
 * `iguideType` is the Silverstripe CalcPackage "CalciguideType" sent to the cost
 * API. It isn't exposed by the live site: values are inferred from package names
 * and MUST be confirmed against the CMS before launch (Advanced Drawing Package
 * especially).
 */
export type CalcPackage = {
  id: number
  title: string
  iguideType: '' | 'premium' | 'instant' | 'instant-sketch' | 'radix'
  addons: string[]
  autoSelected?: string[]
  required?: string[]
  addonMustBeSelected?: boolean
}

export const calcAddons: Record<string, string> = {
  'dwg-init': 'Floor Plan (DWG)',
  'ads-pdf-reflected-ceiling': 'Reflected Ceiling Plan',
  'dwg-elevation': 'Exterior Elevations',
  'dwg-roof': 'Roof Plan',
  'dwg-plotted-pdf': 'Plotted Drawings',
  'rvt-init': '3D Model',
  'esx-init': 'Xactimate ESX',
}

const cadAddons = ['dwg-init', 'ads-pdf-reflected-ceiling', 'dwg-elevation', 'dwg-roof', 'rvt-init']
const adpAddons = ['dwg-init', 'ads-pdf-reflected-ceiling', 'dwg-elevation', 'dwg-roof', 'dwg-plotted-pdf', 'rvt-init']

export const calcPackages: Record<number, CalcPackage> = {
  1: {id: 1, title: 'Standard', iguideType: '', addons: []},
  3: {id: 3, title: 'Radix', iguideType: 'radix', addons: []},
  4: {id: 4, title: 'Instant Sketch', iguideType: 'instant-sketch', addons: []},
  5: {id: 5, title: 'Standard Sketch', iguideType: '', addons: ['esx-init'], autoSelected: ['esx-init'], required: ['esx-init'], addonMustBeSelected: true},
  6: {id: 6, title: 'Premium Sketch', iguideType: 'premium', addons: ['esx-init'], autoSelected: ['esx-init'], required: ['esx-init']},
  11: {id: 11, title: 'Standard', iguideType: '', addons: []},
  12: {id: 12, title: 'Premium', iguideType: 'premium', addons: []},
  13: {id: 13, title: 'Standard', iguideType: '', addons: ['dwg-init']},
  14: {id: 14, title: 'Premium', iguideType: 'premium', addons: cadAddons},
  15: {
    id: 15,
    title: 'Advanced Drawing Package',
    iguideType: '',
    addons: adpAddons,
    autoSelected: ['dwg-init', 'dwg-plotted-pdf'],
    required: ['dwg-init', 'dwg-plotted-pdf'],
  },
}

export const calcIndustries: {id: number; title: string; packages: number[]; noCalc?: {title: string; message: string}}[] = [
  {id: 1, title: 'Real Estate', packages: [11, 12]},
  {id: 2, title: 'Architecture & Remodeling', packages: [3, 13, 14, 15]},
  {
    id: 3,
    title: 'Design & Construction',
    packages: [],
    noCalc: {
      title: 'Looking for Design & Construction Services?',
      message:
        "We're ready to craft a personalized quote based on the product package you've chosen. Simply set up a call with an iGUIDE Specialist to learn more.",
    },
  },
  {id: 4, title: 'Insurance, Restoration & Forensics', packages: [1, 4, 5, 6]},
  {id: 5, title: 'Facility Management', packages: [3, 13, 14, 15]},
]

export const calculator = {
  heading: 'Pricing Calculator',
  customQuoteMessage:
    "It looks like your property exceeds 10,000 square feet (929 square meters), you're eligible for special pricing. Set up a call with an iGUIDE Specialist to learn more.",
  currencies: ['AUD', 'CAD', 'USD'] as const,
  defaultCurrency: 'CAD' as const,
  defaultSize: 1500,
  /** Silverstripe default for Calculator.CustomQuoteMaxSizeFt; confirm the CMS value */
  customQuoteMaxSizeFt: 10000,
  disclaimer:
    'Disclaimer: The price shown is an estimate based on the provided square footage or square meters and is subject to change. Final pricing may vary depending on the details of the project submitted to the iGUIDE Portal. Prices displayed are inclusive of 10% GST (Australia only).',
}

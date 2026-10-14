import * as home from '@/lib/content/home'
import * as homeSections from '@/lib/content/homeSections'
import * as aec from '@/lib/content/industries/architectureEngineeringConstruction'
import * as designConstruction from '@/lib/content/industries/designConstruction'
import * as facilityManagement from '@/lib/content/industries/facilityManagement'
import * as forensicInvestigation from '@/lib/content/industries/forensicInvestigation'
import * as insuranceRestoration from '@/lib/content/industries/insuranceRestoration'
import * as realEstatePhotography from '@/lib/content/industries/realEstatePhotography'
import * as residentialRealEstate from '@/lib/content/industries/residentialRealEstate'
import * as pricing from '@/lib/content/pricing'
import {cadDeliverables} from '@/lib/content/solutions/cadDeliverables'
import {cameraHardware} from '@/lib/content/solutions/cameraHardware'
import {floorPlans} from '@/lib/content/solutions/floorPlans'
import {sitePlans} from '@/lib/content/solutions/sitePlans'
import {virtualTours} from '@/lib/content/solutions/virtualTours'
import {xactimateSketches} from '@/lib/content/solutions/xactimateSketches'
import {logoBandId, testimonialId} from '@/lib/cmsKeys.mjs'

/**
 * DEV ONLY (404 in production). Lists every logo band and testimonial written
 * in lib/content, with the Sanity ID each one gets, for
 * scripts/seed-cms-library.mjs. Temporary: delete app/api/dev/ before launch.
 */
const sources: {page: string[]; content: unknown}[] = [
  {page: ['/'], content: home},
  {page: ['/', '/pricing'], content: homeSections},
  {page: ['/architecture-engineering-construction'], content: aec},
  {page: ['/design-construction'], content: designConstruction},
  {page: ['/facility-management'], content: facilityManagement},
  {page: ['/forensic-investigation'], content: forensicInvestigation},
  {page: ['/insurance-restoration'], content: insuranceRestoration},
  {page: ['/real-estate-photography'], content: realEstatePhotography},
  {page: ['/residential-real-estate'], content: residentialRealEstate},
  {page: ['/pricing'], content: pricing},
  {page: ['/iguide/cad-deliverables'], content: cadDeliverables},
  {page: ['/camera-hardware'], content: cameraHardware},
  {page: ['/iguide/floor-plans'], content: floorPlans},
  {page: ['/iguide/site-plans'], content: sitePlans},
  {page: ['/iguide/3d-virtual-tours'], content: virtualTours},
  {page: ['/iguide/xactimate-sketches'], content: xactimateSketches},
]

// Quotes in code that no page renders as a testimonial
const SKIP_KEYS = new Set(['review', 'closingQuote'])

type Logo = {src: string; alt: string}
type Band = {_id: string; band: string; title: string; logos: Logo[]; usedOn: string[]}
type Testimonial = Record<string, unknown> & {_id: string; usedOn: string[]}

const isLogo = (v: unknown): v is Logo => !!v && typeof v === 'object' && typeof (v as Logo).src === 'string' && typeof (v as Logo).alt === 'string'

export async function GET() {
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', {status: 404})
  const bands = new Map<string, Band>()
  const testimonials = new Map<string, Testimonial>()
  const conflicts: string[] = []

  const addBand = (band: string, title: string | undefined, logos: Logo[], page: string[]) => {
    const _id = logoBandId(band)
    const existing = bands.get(_id)
    if (existing) {
      if (JSON.stringify(existing.logos.map((l) => l.src)) !== JSON.stringify(logos.map((l) => l.src))) conflicts.push(`Band "${band}" has different logos on ${existing.usedOn} and ${page}`)
      existing.usedOn = [...new Set([...existing.usedOn, ...page])]
      return
    }
    bands.set(_id, {_id, band, title: title ?? band, logos: logos.map(({src, alt}) => ({src, alt})), usedOn: page})
  }

  const walk = (value: unknown, page: string[], seen: Set<unknown>) => {
    if (!value || typeof value !== 'object' || seen.has(value)) return
    if ('$$typeof' in (value as object)) return // React elements
    seen.add(value)
    if (Array.isArray(value)) return value.forEach((v) => walk(v, page, seen))
    const o = value as Record<string, unknown>
    // Logo bands: {band, logos | items} or {logosBand, logos}
    const band = typeof o.band === 'string' ? o.band : typeof o.logosBand === 'string' ? o.logosBand : undefined
    const list = Array.isArray(o.logos) ? o.logos : Array.isArray(o.items) ? o.items : undefined
    if (band && list?.every(isLogo)) addBand(band, typeof o.heading === 'string' ? o.heading : undefined, list, page)
    // Testimonials: anything with a quote and a person, company or company logo
    if (typeof o.quote === 'string' && (typeof o.name === 'string' || typeof o.company === 'string' || isLogo(o.logo))) {
      const q = o as {quote: string; name?: string; company?: string}
      const _id = testimonialId(q)
      const existing = testimonials.get(_id)
      if (existing) existing.usedOn = [...new Set([...existing.usedOn, ...page])]
      else
        testimonials.set(_id, {
          _id,
          quote: q.quote,
          detail: o.detail,
          name: o.name,
          role: o.role,
          company: o.company,
          // Quote cards: {label, href}; story cards: href
          link: o.link ?? (typeof o.href === 'string' ? {label: 'Read their story', href: o.href} : undefined),
          photo: isLogo(o.photo) ? o.photo : undefined,
          logo: isLogo(o.logo) ? o.logo : typeof o.logo === 'string' ? {src: o.logo, alt: `logo - ${q.company ?? ''}`} : undefined,
          hasVideo: !!o.media,
          usedOn: page,
        })
    }
    for (const [key, v] of Object.entries(o)) if (!SKIP_KEYS.has(key)) walk(v, page, seen)
  }

  for (const s of sources) walk(s.content, s.page, new Set())
  return Response.json({bands: [...bands.values()], testimonials: [...testimonials.values()], conflicts})
}

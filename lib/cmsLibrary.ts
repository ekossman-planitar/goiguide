import type {Quote} from '@/components/blocks/Testimonials'
import type {Img} from '@/components/blocks/types'
import type {StoryCard} from '@/components/sections/CustomerStories'
import {fetchSanity} from '@/sanity/lib/fetch'
import {urlFor} from '@/sanity/lib/image'
import {CMS_LIBRARY_QUERY} from '@/sanity/lib/queries'
import {logoBandId, testimonialId} from './cmsKeys.mjs'

/**
 * Logo bands and testimonials are written in code (lib/content) and seeded into
 * Sanity by scripts/seed-cms-library.mjs. Once a document exists in Sanity it
 * wins; until then, or if Sanity can't be reached, the code version shows, so
 * pages never go blank.
 */

type SanityLogo = {name: string; url?: string; dims?: {width: number; height: number}}
type SanityTestimonial = {
  _id: string
  hidden?: boolean
  quote?: string
  detail?: string
  name?: string
  role?: string
  company?: string
  link?: {label?: string; href?: string}
  photo?: {alt?: string; asset?: {_id: string; url: string}; hotspot?: unknown; crop?: unknown}
  companyLogo?: SanityLogo | null
}
type Library = {bands: {_id: string; logos: SanityLogo[] | null}[]; testimonials: SanityTestimonial[]}

const empty: Library = {bands: [], testimonials: []}

async function getLibrary() {
  // Same query and options on every call, so Next.js fetches it once per render
  const lib = await fetchSanity<Library>(CMS_LIBRARY_QUERY, empty)
  return {
    bands: new Map((lib.bands ?? []).map((b) => [b._id, b])),
    testimonials: new Map((lib.testimonials ?? []).map((t) => [t._id, t])),
  }
}

const logoImg = (logo: SanityLogo): Img => ({src: logo.url!, alt: logo.name, width: logo.dims?.width, height: logo.dims?.height})

/** A page's logos: the Sanity band with this ID if it has logos, otherwise the list in code. */
export async function resolveLogos(band: string | undefined, fallback: Img[]): Promise<Img[]> {
  if (!band) return fallback
  const doc = (await getLibrary()).bands.get(logoBandId(band))
  const logos = (doc?.logos ?? []).filter((l) => l?.url)
  return logos.length ? logos.map(logoImg) : fallback
}

function fromSanity(t: SanityTestimonial) {
  const photo = t.photo?.asset
    ? {src: urlFor(t.photo).width(600).height(600).fit('crop').auto('format').url(), alt: t.photo.alt ?? t.name ?? '', width: 600, height: 600}
    : undefined
  return {
    quote: t.quote ?? '',
    detail: t.detail || undefined,
    name: t.name || undefined,
    role: t.role || undefined,
    company: t.company || undefined,
    link: t.link?.href && t.link.label ? {label: t.link.label, href: t.link.href} : undefined,
    photo,
    logo: t.companyLogo?.url ? logoImg(t.companyLogo) : undefined,
  }
}

/** Testimonials as edited in Sanity (hidden ones removed). Videos stay as set in code. */
export async function resolveQuotes(quotes: Quote[]): Promise<Quote[]> {
  const {testimonials} = await getLibrary()
  return quotes.flatMap((q) => {
    const doc = testimonials.get(testimonialId(q))
    if (!doc) return [q]
    if (doc.hidden || !doc.quote) return []
    return [{...fromSanity(doc), media: q.media}]
  })
}

/** Homepage / pricing customer story cards, from the same testimonial documents. */
export async function resolveStories(stories: StoryCard[]): Promise<StoryCard[]> {
  const {testimonials} = await getLibrary()
  return stories.flatMap((s) => {
    const doc = testimonials.get(testimonialId(s))
    if (!doc) return [s]
    if (doc.hidden || !doc.quote) return []
    return [
      {
        quote: doc.quote,
        name: doc.name ?? '',
        role: doc.role ?? '',
        company: doc.company ?? '',
        href: doc.link?.href ?? s.href,
        logo: doc.companyLogo?.url ?? s.logo,
      },
    ]
  })
}

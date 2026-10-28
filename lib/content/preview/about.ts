/**
 * Content for /about-preview (draft redesign, Evan 2026-10-27). Copy from "iGuide About Page" (Marketing),
 * with Evan's comments applied. The milestones, testimonials and stats are plain data so they can move into
 * Sanity later without changing the layout. Items marked TBC still need confirming.
 */
import type {Milestone} from '@/components/about/Timeline'
import type {CarouselQuote, QuoteSlot} from '@/components/about/QuoteCarousel'

export const meta = {
  title: 'About iGuide | iGuide',
  description: 'iGuide makes property intelligence accessible to everyone. One capture gives you an immersive 3D tour, precise floor plans and measurements you can act on.',
  path: '/about-preview',
}

/** In order of the journey, oldest first. The newest entry carries the "New" tag; "Coming soon" stays hidden until it is used. Years not given are still to be confirmed (TBC), and so is the order of the middle entries. */
export const milestones: Milestone[] = [
  {year: '2013', title: 'Where it started', copy: 'A better way to share a property: rock-solid measurements meet immersive 3D tours.'},
  {title: 'First real estate projects', copy: 'A handful of projects and a lot of conviction.'},
  {title: 'Beyond real estate', copy: 'Insurance, architecture, construction and facilities come knocking.'},
  {title: '1 billion ft² mapped', copy: 'That’s a lot of floor plans.'},
  {
    title: 'R1 launches',
    copy: 'The PLANIX R1 camera joins the lineup.',
    media: {src: '/assets/PLANIX-R1.png', alt: 'iGuide PLANIX R1 camera', width: 901, height: 667},
  },
  {title: 'ION Job Board launches', copy: 'iGuide pros get a place to find great jobs.'},
  {title: 'REA Group acquisition', copy: 'REA Group completes its majority acquisition of iGuide.'},
  {year: '2026', title: 'A new look', copy: 'Same iGuide, dressed for the next chapter.', isNew: true},
  {title: 'Coming soon', copy: 'Reserved for upcoming announcements.', hidden: true},
]

export type StatItem = {value: string; label: string; note?: string; counter?: boolean; pending?: boolean}

/** Only confirmed figures. Properties captured, pros and countries are left out for now (Evan: "we may not want to share this"). */
export const stats: StatItem[] = [
  {value: '1B+ ft²', label: 'Mapped and counting', note: 'That’s roughly 17,000 football fields.', counter: true},
  {value: '2013', label: 'Where it all started'},
  {value: '', label: 'Stat pending', pending: true},
  {value: '', label: 'Stat pending', pending: true},
]

export const quotes: CarouselQuote[] = [
  {
    quote: 'Since incorporating iGuide into our services, our business has grown 10X!',
    name: 'Lauren Murphy',
    role: 'Photographer',
    company: 'Monster Media House',
    logo: {src: '/homepage/stories/monster-media-house.png', alt: 'Monster Media House', width: 180, height: 64},
    link: {label: 'Read their story', href: '/customer-stories/how-iguide-helped-monster-media-house-boost-revenue-by-10x'},
  },
  {
    quote: 'The value speaks for itself. I can’t picture MC3 working without iGuide now.',
    name: 'John McKenna',
    role: 'Owner',
    company: 'MC3 Design',
    logo: {src: '/homepage/stories/mc3-design.png', alt: 'MC3 Design', width: 180, height: 64},
    link: {label: 'Read their story', href: '/customer-stories/mc3-design-cuts-measurement-time-by-50-with-iguide-technology'},
  },
  {
    quote: 'Simply seeing how much value it’s brought to Deft, we fell in love with it!',
    name: 'Jeremiah Kiefer',
    role: 'Founder & CEO',
    company: 'The Deft Group',
    logo: {src: '/homepage/stories/deft.png', alt: 'The Deft Group', width: 180, height: 64},
    link: {label: 'Read their story', href: '/customer-stories/the-deft-group-case-study'},
  },
  {
    quote: 'iGuide brought a unique convenience and comfort to our buyer’s search experience.',
    name: 'Rachel Morgan',
    role: 'Realtor',
    company: 'Morgan Wasley',
    logo: {src: '/homepage/stories/morgan-wasley.png', alt: 'Morgan Wasley', width: 180, height: 64},
    link: {label: 'Read their story', href: '/customer-stories/creating-an-enhanced-buyer-experience-with-iguide'},
  },
]

/** Testimonial slots from the copy doc that have no quote yet */
export const quoteSlots: QuoteSlot[] = [{slot: 'Facilities or property management', ask: 'A quote on keeping track of a portfolio.'}]


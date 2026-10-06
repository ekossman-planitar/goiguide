import type {TimelineStep} from '@/components/sections/StepsTimeline'
import type {HeroData} from '@/sanity/lib/types'

/**
 * Hard-coded homepage content. Copy and links are from the live goiguide.com
 * homepage (checked 2026-10-06).
 */

/** Used only until the Home page document is published in Sanity. */
export const heroFallback: HeroData = {
  eyebrow: {label: 'New: Site Plans for residential listings', href: '/iguide/site-plans'},
  heading: 'Your fastest path to accurate floor plans and 3D virtual tours',
  subheading: 'Own your data, floor plans and virtual tour—all from a single scan.',
  cta: {label: 'Book your personalized product tour', href: '/book-a-demo'},
  media: null,
}

export const logoHeadingFallback = 'Trusted by **thousands** of professionals worldwide'

export const howItWorks = {
  heading: 'Capture, measure and share spaces with confidence',
  subheading: 'See how iGUIDE reduces steps, removes guesswork and helps your team move faster.',
  steps: [
    {
      title: 'Buy a PLANIX camera or hire an iGUIDE Pro',
      body: (
        <p>
          Capture the space yourself with a PLANIX camera or <a href="https://ion.goiguide.com/">hire an iGUIDE Pro</a>{' '}
          to do it for you. They&apos;re fast, trained and available across North America.
        </p>
      ),
      cta: {label: 'See camera options', href: '/#pricingTabs'},
    },
    {
      title: 'Choose the package that fits your project',
      body: (
        <p>
          Every iGUIDE includes a 3D virtual tour. Just choose the level of detail and file types that fit your
          workflow, like floor plans or CAD files.
        </p>
      ),
      cta: {label: 'Compare packages', href: '/#pricingTabs'},
    },
    {
      title: 'Add only the extras your project requires',
      body: (
        <p>
          Customize your order with optional add-ons like DWG, ESX, RVT files, Site Plans and more. Only pay for what
          your project requires.
        </p>
      ),
      cta: {label: 'See available add-ons', href: '/pricing#add-ons'},
    },
    {
      title: 'Receive your deliverables quickly',
      body: (
        <p>
          Get your floor plans, 3D tour, property report and all selected files delivered fast, ready to use, share
          and move forward.
        </p>
      ),
      cta: {label: 'See samples in our gallery', href: '/resources-and-media/iguide-gallery'},
    },
  ] satisfies TimelineStep[],
}

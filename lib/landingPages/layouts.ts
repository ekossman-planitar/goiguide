/**
 * Paid-media landing page layouts. Each layout is a starting arrangement of
 * sections: picking one in the Studio pre-fills the page with those sections
 * (with sample copy), and the editor can then edit, reorder, add or remove
 * sections. Shared by the Studio (layout picker, templates) and the site
 * (/landing-templates previews), so it must stay free of server-only code.
 */
export type LpSectionType =
  | 'lpHero'
  | 'lpLogos'
  | 'lpFeatures'
  | 'lpSplit'
  | 'lpSteps'
  | 'lpTestimonials'
  | 'lpStats'
  | 'lpCompare'
  | 'lpTabs'
  | 'lpTourDemo'
  | 'lpVideos'
  | 'lpResources'
  | 'lpForm'
  | 'lpFaq'
  | 'lpCta'
  | 'lpNotice'
  | 'lpAnchorNav'
  | 'lpTables'
  | 'lpReport'

export type HeroStyle = 'form' | 'media' | 'centered' | 'banner'

export type LpLayout = {
  id: string
  name: string
  /** One line: what it's for */
  bestFor: string
  heroStyle: HeroStyle
  sections: LpSectionType[]
  /** Page header and footer: the stripped landing page bar (default) or the full site navigation */
  chrome?: 'landing' | 'site'
}

export const lpLayouts: LpLayout[] = [
  {
    id: 'lead-form',
    name: 'Lead form',
    bestFor: 'Demo or contact requests: the form is visible the moment the page loads.',
    heroStyle: 'form',
    sections: ['lpHero', 'lpLogos', 'lpFeatures', 'lpSplit', 'lpTestimonials', 'lpFaq', 'lpCta'],
  },
  {
    id: 'product-showcase',
    name: 'Product showcase',
    bestFor: 'Show the product in action first (video or live iGuide tour), then explain.',
    heroStyle: 'media',
    sections: ['lpHero', 'lpLogos', 'lpSplit', 'lpSplit', 'lpSteps', 'lpTestimonials', 'lpForm'],
  },
  {
    id: 'offer',
    name: 'Offer or promotion',
    bestFor: 'Limited-time offers, pricing or packages, with terms at the bottom.',
    heroStyle: 'centered',
    sections: ['lpHero', 'lpStats', 'lpFeatures', 'lpForm', 'lpFaq', 'lpNotice'],
  },
  {
    id: 'comparison',
    name: 'Comparison',
    bestFor: 'Competitor or "vs" campaigns: a side-by-side table with proof.',
    heroStyle: 'form',
    sections: ['lpHero', 'lpCompare', 'lpTestimonials', 'lpFeatures', 'lpFaq', 'lpCta'],
  },
  {
    id: 'deliverables',
    name: 'Deliverables explorer',
    bestFor: 'Technical audiences who want to see samples (tabs of tours, drawings and files).',
    heroStyle: 'form',
    sections: ['lpHero', 'lpLogos', 'lpFeatures', 'lpTestimonials', 'lpTabs', 'lpVideos', 'lpFaq'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    bestFor: 'Short, single-message ads: headline, three reasons and a form. Nothing else.',
    heroStyle: 'centered',
    sections: ['lpHero', 'lpFeatures', 'lpForm'],
  },
  {
    id: 'thank-you',
    name: 'Thank-you page',
    bestFor: 'After a form or booking: full site navigation, banner, next steps, live tour and testimonials. Hidden from search.',
    heroStyle: 'banner',
    chrome: 'site',
    sections: ['lpHero', 'lpFeatures', 'lpLogos', 'lpTourDemo', 'lpTestimonials'],
  },
]

export const getLpLayout = (id: string | undefined) => lpLayouts.find((l) => l.id === id) ?? lpLayouts[0]

/** Labels used in the Studio and the wireframes */
export const lpSectionLabels: Record<LpSectionType, string> = {
  lpHero: 'Hero',
  lpLogos: 'Logo band',
  lpFeatures: 'Feature grid',
  lpSplit: 'Text + media',
  lpSteps: 'Steps',
  lpTestimonials: 'Testimonials',
  lpStats: 'Stats',
  lpCompare: 'Comparison table',
  lpTabs: 'Tabs (samples)',
  lpTourDemo: 'Live tour with tips',
  lpVideos: 'Video row',
  lpResources: 'Resource cards',
  lpForm: 'Form',
  lpFaq: 'FAQ',
  lpCta: 'Call to action',
  lpNotice: 'Small print',
  lpAnchorNav: 'In-page menu',
  lpTables: 'Tables (e.g. pricing)',
  lpReport: 'Sample report',
}

/**
 * Footer links. Every link from the live goiguide.com footer (checked
 * 2026-10-07) is kept, with the nav changes applied (Client Portal added,
 * Marketing Catalogue / Downloads under Support, Find an iGuide Pro added).
 *
 * 2026-10-20 (Evan): regrouped into four columns. Each column shows a few
 * top links; longer lists fold into accordions (e.g. Comparisons under
 * Resources). Accordion links stay in the page HTML, so search engines still
 * see them.
 */
import {MARKETING_CATALOGUE_SUPPORT_PATH} from '@/lib/content/marketingCatalogue'
import {zendeskLinks} from '@/lib/help/navigation'

export type FooterLink = {label: string; href: string; external?: boolean}
/** A fold-out group of links; `all` is an optional "view all" link at the end */
export type FooterAccordion = {accordion: string; links: FooterLink[]; all?: FooterLink}
export type FooterItem = FooterLink | FooterAccordion
export type FooterColumn = {heading: FooterLink; items: FooterItem[]}

export const isAccordion = (item: FooterItem): item is FooterAccordion => 'accordion' in item

export const footerColumns: FooterColumn[] = [
  {
    // Same target as the "Solutions" nav item
    heading: {label: 'iGuide', href: '/iguide/floor-plans'},
    items: [
      {label: 'Pricing', href: '/pricing'},
      {label: 'Capture Hardware', href: '/camera-hardware'},
      {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/'},
      {
        accordion: 'Solutions',
        links: [
          {label: 'Floor Plans', href: '/iguide/floor-plans'},
          {label: '3D Virtual Tours', href: '/iguide/3d-virtual-tours'},
          {label: 'CAD Deliverables', href: '/iguide/cad-deliverables'},
          {label: 'Xactimate Sketches', href: '/iguide/xactimate-sketches'},
          {label: 'Site Plans', href: '/iguide/site-plans'},
          {label: 'Integrations', href: '/iguide/integrations'},
        ],
      },
      {
        // Same target as the "Industries" nav item (new URL)
        accordion: 'Industries',
        links: [
          {label: 'Residential Real Estate', href: '/residential-real-estate'},
          {label: 'Real Estate Photography', href: '/real-estate-photography'},
          {label: 'Architecture & Remodeling', href: '/architecture-engineering-construction'},
          {label: 'Design & Construction', href: '/design-construction'},
          {label: 'Insurance & Restoration', href: '/insurance-restoration'},
          {label: 'Forensic Investigation', href: '/forensic-investigation'},
          {label: 'Facility Management', href: '/facility-management'},
        ],
        all: {label: 'All industries', href: '/industries'},
      },
    ],
  },
  {
    heading: {label: 'Resources & Media', href: '/resource-center'},
    items: [
      {label: 'Blog', href: '/blogs'},
      {label: 'Customer Stories', href: '/customer-stories'},
      {label: 'iGuide Gallery', href: '/resources-and-media/iguide-gallery'},
      {
        accordion: 'Learn more',
        links: [
          {label: 'Webinars', href: '/webinars'},
          {label: 'Videos', href: '/video'},
          {label: 'Brochures', href: '/brochures'},
          {label: 'White Papers & eBooks', href: '/white-papers-and-ebooks'},
          {label: 'News', href: '/news'},
        ],
      },
      {
        // New URL: no Compare overview page exists on the live site yet
        accordion: 'Comparisons',
        links: [
          {label: 'iGuide vs Matterport', href: '/compare/iguide-vs-matterport'},
          {label: 'iGuide vs DocuSketch', href: '/compare/iguide-vs-docusketch'},
          {label: 'iGuide vs CubiCasa', href: '/compare/iguide-vs-cubicasa'},
          {label: 'iGuide vs Zillow3D Home', href: '/compare/iguide-vs-zillow3dhome'},
          {label: 'iGuide vs Manual Measurement', href: '/compare/iguide-vs-manual-measurement'},
        ],
        all: {label: 'All comparisons', href: '/compare'},
      },
    ],
  },
  {
    // Same target as the "Support" nav item
    heading: {label: 'Support & Training', href: '/support'},
    items: [
      {label: 'Help Center', href: '/support'},
      // Tickets stay on Zendesk (same link as the Help Center's "Submit a request")
      {label: 'Ask for Help', href: zendeskLinks.submitRequest, external: true},
      {label: 'Client Portal', href: 'https://manage.youriguide.com/', external: true},
      {
        accordion: 'Training & tools',
        links: [
          {label: 'Training', href: '/support/categories/27462998868498-Getting-Started-with-iGUIDE'},
          {label: 'iGuide Forum', href: 'https://forum.goiguide.com/', external: true},
          {label: 'Marketing Catalogue', href: MARKETING_CATALOGUE_SUPPORT_PATH},
          {label: 'Downloads', href: '/downloads'},
        ],
      },
    ],
  },
  {
    heading: {label: 'Company', href: '/about'},
    items: [
      {label: 'About iGuide', href: '/about'},
      {label: 'Careers', href: '/careers'},
      {label: 'Partnership', href: '/partnership'},
      {label: 'Find a Reseller', href: '/resellers'},
      {label: 'Office Hours', href: '/office-holidays', external: true},
    ],
  },
]

export const socialLinks = [
  {name: 'Instagram', href: 'https://www.instagram.com/go_iguide/'},
  {name: 'Facebook', href: 'https://www.facebook.com/Planitar/'},
  {name: 'LinkedIn', href: 'https://www.linkedin.com/company/planitar/'},
  {name: 'YouTube', href: 'https://www.youtube.com/channel/UCA8ZLAabRkKYMRESoFVS43Q'},
] as const

/** Third-party review badges, loaded from the review sites exactly as on live. */
export const reviewBadges = [
  {
    alt: 'badge - Capterra, 4.9 star rating',
    src: 'https://assets.capterra.com/badge/83a6f1e08215a35a1c2ab7bd650fdc2d.svg?v=2152532&p=212030',
    href: 'https://www.capterra.com/p/212030/iGUIDE/reviews?utm_source=vendor&utm_medium=badge&utm_campaign=capterra_reviews_badge',
    width: 200,
    height: 65,
    newTab: false,
  },
  {
    alt: 'iGuide Reviews',
    src: 'https://b.sf-syn.com/badge_img/3372173/customers-love-us-white?&variant_id=sf&r=https://goiguide.com/',
    href: 'https://sourceforge.net/software/product/iGUIDE/?pk_campaign=badge&pk_source=vendor',
    width: 90,
    height: 97,
    newTab: true,
  },
]

export const legal = {
  copyright: '© 2012–2026 Planitar Inc. All Rights Reserved. iGuide and Planitar are registered trademarks of Planitar Inc.',
  address: {
    label: '560 Parkside Drive, Unit 401 Waterloo, ON, Canada N2L 5Z4',
    href: 'https://www.google.com/maps?q=560+Parkside+Drive,+Unit+401,+Waterloo,+ON,+Canada+N2L+5Z4',
  },
  links: [
    {label: 'Cookie Policy', href: '/cookie-policy'},
    {label: 'Privacy Policy', href: '/privacy-policy'},
  ],
}

/** The existing HubSpot newsletter form on the live footer (public IDs, not secrets). */
export const subscribeForm = {
  portalId: '6828755',
  formId: '882f819f-56c4-4def-b392-22f97de7e51f',
}

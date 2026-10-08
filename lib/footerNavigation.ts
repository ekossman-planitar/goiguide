/**
 * Footer links (hard-coded for the demo). Copied from the live goiguide.com
 * footer (checked 2026-10-07), with the nav changes applied:
 * Client Portal added and Marketing Catalogue / Downloads moved to Support,
 * iGUIDE Gallery also listed under Resources, Find an iGUIDE Pro added.
 */
export type FooterLink = {label: string; href: string; external?: boolean}
export type FooterColumn = {heading: FooterLink; links: FooterLink[]}

export const footerColumns: FooterColumn[][] = [
  // Each inner array is one grid column (iGUIDE + Compare share a column, as on live)
  [
    {
      // Same target as the "Solutions" nav item
      heading: {label: 'iGUIDE', href: '/iguide/floor-plans'},
      links: [
        {label: 'Floor Plans', href: '/iguide/floor-plans'},
        {label: '3D Virtual Tours', href: '/iguide/3d-virtual-tours'},
        {label: 'CAD Deliverables', href: '/iguide/cad-deliverables'},
        {label: 'Xactimate Sketches', href: '/iguide/xactimate-sketches'},
        {label: 'Site Plans', href: '/iguide/site-plans'},
        {label: 'Integrations', href: '/iguide/integrations'},
        {label: 'Capture Hardware', href: '/camera-hardware'},
        {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/'},
        {label: 'Pricing', href: '/pricing'},
        {label: 'iGUIDE Gallery', href: '/resources-and-media/iguide-gallery'},
      ],
    },
    {
      // New URL: no Compare overview page exists on the live site yet
      heading: {label: 'Compare iGUIDE', href: '/compare'},
      links: [
        {label: 'iGUIDE vs Matterport', href: '/compare/iguide-vs-matterport'},
        {label: 'iGUIDE vs DocuSketch', href: '/compare/iguide-vs-docusketch'},
        {label: 'iGUIDE vs CubiCasa', href: '/compare/iguide-vs-cubicasa'},
        {label: 'iGUIDE vs Zillow3D Home', href: '/compare/iguide-vs-zillow3dhome'},
        {label: 'iGUIDE vs Manual Measurement', href: '/compare/iguide-vs-manual-measurement'},
      ],
    },
  ],
  [
    {
      heading: {label: 'Company', href: '/about'},
      links: [
        {label: 'About Planitar', href: '/about'},
        {label: 'Office Hours', href: '/office-holidays', external: true},
        {label: 'Careers', href: '/careers'},
        {label: 'Partnership', href: '/partnership'},
        {label: 'Find a Reseller', href: '/resellers'},
      ],
    },
  ],
  [
    {
      heading: {label: 'Resources & Media', href: '/resource-center'},
      links: [
        {label: 'Customer Stories', href: '/resource-center?tab=customer-stories'},
        {label: 'Blog', href: '/resource-center?tab=blog'},
        {label: 'Webinars', href: '/resource-center?tab=webinars'},
        {label: 'Videos', href: '/resource-center?tab=Videos'},
        {label: 'Brochures', href: '/resource-center?tab=Brochures'},
        {label: 'News', href: '/resource-center?tab=news'},
        {label: 'White Papers & eBooks', href: '/resource-center?tab=white-papers'},
        {label: 'iGUIDE Gallery', href: '/resources-and-media/iguide-gallery'},
      ],
    },
  ],
  [
    {
      // Same target as the "Support" nav item
      heading: {label: 'Support & Training', href: 'https://help.youriguide.com', external: true},
      links: [
        {label: 'Help Center', href: 'https://help.youriguide.com/hc/en-us', external: true},
        {label: 'Ask for Help', href: 'https://help.youriguide.com/requests/new', external: true},
        {label: 'iGUIDE Forum', href: 'https://forum.goiguide.com/', external: true},
        {label: 'Training', href: 'https://help.youriguide.com/hc/en-us/categories/27462998868498-Getting-Started-with-iGUIDE', external: true},
        {label: 'Client Portal', href: 'https://manage.youriguide.com/', external: true},
        {
          label: 'Marketing Catalogue',
          href: 'https://help.youriguide.com/hc/en-us/articles/28225392683154-iGUIDE-Marketing-Catalogue',
        },
        {label: 'Downloads', href: '/downloads'},
      ],
    },
  ],
  [
    {
      // Same target as the "Industries" nav item (new URL)
      heading: {label: 'Industries', href: '/industries'},
      links: [
        {label: 'Residential Real Estate', href: '/residential-real-estate'},
        {label: 'Real Estate Photography', href: '/real-estate-photography'},
        {label: 'Architecture & Remodeling', href: '/architecture-engineering-construction'},
        {label: 'Design & Construction', href: '/design-construction'},
        {label: 'Insurance & Restoration', href: '/insurance-restoration'},
        {label: 'Forensic Investigation', href: '/forensic-investigation'},
        {label: 'Facility Management', href: '/facility-management'},
      ],
    },
  ],
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
    alt: 'iGUIDE Reviews',
    src: 'https://b.sf-syn.com/badge_img/3372173/customers-love-us-white?&variant_id=sf&r=https://goiguide.com/',
    href: 'https://sourceforge.net/software/product/iGUIDE/?pk_campaign=badge&pk_source=vendor',
    width: 90,
    height: 97,
    newTab: true,
  },
]

export const legal = {
  copyright: '© 2012–2026 Planitar Inc. All Rights Reserved. iGUIDE and Planitar are registered trademarks of Planitar Inc.',
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

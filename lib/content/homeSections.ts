/**
 * Hard-coded content for homepage sections 3–8.
 * Copy, links, tour URLs and prices are taken from the live goiguide.com
 * homepage (checked 2026-10-06). Images are expected in public/homepage/.
 */

/* ---------- Section: tour showcase ---------- */

export const tourShowcase = {
  heading: 'Experience how easy it is to explore, measure and understand a space',
  subheading: 'Try a real iGUIDE tour and see it for yourself.',
  tours: [
    {
      id: 'real-estate',
      label: 'Real Estate',
      title: 'iGUIDE virtual tour — Real Estate with Site Plans',
      src: 'https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1&autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
    },
    {
      id: 'insurance',
      label: 'Insurance & Restoration',
      title: 'iGUIDE virtual tour — Insurance and Restoration',
      src: 'https://youriguide.com/embed/urwkb_1121_sample_road_kitchener_on?branded=1&autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
    },
    {
      id: 'architecture',
      label: 'Architecture & Remodeling',
      title: 'iGUIDE virtual tour — Architecture and Remodeling',
      src: 'https://youriguide.com/embed/pre_and_post_construction?branded=1&autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
    },
    {
      id: 'facility',
      label: 'Facility Management',
      title: 'iGUIDE virtual tour — Facility Management',
      src: 'https://youriguide.com/embed/v4H2RMIUYYJDD1?branded=1&autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
    },
  ],
}

/* ---------- Section: customer stories ---------- */

export type CustomerStory = {
  quote: string
  name: string
  role: string
  company: string
  href: string
  /** Path in /public. Company name shows instead if the file is missing. */
  logo: string
}

export const customerStories = {
  // Two lines on desktop; the break goes after "it,"
  heading: ["Don't take our word for it,", 'hear it from the pros.'],
  subheading: 'Real stories from professionals using iGUIDE to win more business, save time and deliver better results.',
  link: {label: 'View customer stories', href: '/customer-stories'},
  stories: [
    {
      quote: 'Since incorporating iGUIDE into our services, our business has grown 10X!',
      name: 'Lauren Murphy',
      role: 'Photographer',
      company: 'Monster Media House',
      href: '/customer-stories/how-iguide-helped-monster-media-house-boost-revenue-by-10x',
      logo: '/homepage/stories/monster-media-house.png',
    },
    {
      quote: "The value speaks for itself. I can't picture MC3 working without iGUIDE now.",
      name: 'John McKenna',
      role: 'Owner',
      company: 'MC3 Design',
      href: '/customer-stories/mc3-design-cuts-measurement-time-by-50-with-iguide-technology',
      logo: '/homepage/stories/mc3-design.png',
    },
    {
      quote: "Simply seeing how much value it's brought to Deft, we fell in love with it!",
      name: 'Jeremiah Kiefer',
      role: 'Founder & CEO',
      company: 'The Deft Group',
      href: '/customer-stories/the-deft-group-case-study',
      logo: '/homepage/stories/deft.png',
    },
    {
      quote: "iGUIDE brought a unique convenience and comfort to our buyer's search experience.",
      name: 'Rachel Morgan',
      role: 'Realtor',
      company: 'Morgan Wasley',
      href: '/customer-stories/creating-an-enhanced-buyer-experience-with-iguide',
      logo: '/homepage/stories/morgan-wasley.png',
    },
  ] satisfies CustomerStory[],
}

/* ---------- Section: pricing ---------- */

export const currencies = ['CAD', 'USD', 'AUD'] as const
export type Currency = (typeof currencies)[number]
export type Prices = Partial<Record<Currency, string>>

export const industries = [
  {id: 'all', label: 'All industries'},
  {id: 'real-estate', label: 'Real Estate'},
  {id: 'insurance', label: 'Insurance, Restoration & Forensics'},
  {id: 'architecture', label: 'Architecture & Remodelling'},
  {id: 'facility', label: 'Facility Management'},
] as const
export type IndustryId = (typeof industries)[number]['id']

export type Package = {
  id: string
  name: string
  priceLabel: 'Per project' | 'Starting at'
  prices: Prices
  industries: Exclude<IndustryId, 'all'>[]
  includes: string[]
  bestFor: string
  sample?: {label: string; href: string}
  image: string
}

export const pricing = {
  heading: 'No subscriptions. Powerful tools.',
  subheading: 'Explore the PLANIX R1 camera and iGUIDE packages to find the setup that fits your workflow.',
  allLink: {label: 'See all packages and add-ons', href: '/pricing'},
  camera: {
    name: 'iGUIDE PLANIX R1',
    prices: {CAD: '$3,499.00', USD: '$2,599.00', AUD: '$3,850.00'} as Prices,
    intro:
      'The PLANIX R1 is a professional-grade scanning camera built for real estate professionals, appraisers, inspectors and insurance adjusters. One visit. Complete property data.',
    body: 'Walk through a property room by room. The PLANIX R1 produces 3D virtual tours, accurate floor plans, room-by-room measurements and property reports. Automatically.',
    cta: {label: 'Get started', href: 'https://store.goiguide.com/products/iguide-planix-r1'},
    shopLink: {label: 'Shop the PLANIX R1 and accessories', href: 'https://store.goiguide.com/'},
    review: {
      quote:
        'With 100 shoots under my belt, I can honestly say that this is a fabulous product. Easy to learn, easy to use, and clients love the end result.',
      name: 'Alan R',
      role: 'Real Estate Photographer',
      company: 'Self Employed',
    },
    image: '/homepage/pricing/planix-r1.jpg',
  },
  packages: [
    {
      id: 'radix',
      name: 'iGUIDE RADIX',
      priceLabel: 'Per project',
      prices: {CAD: '$6.99', USD: '$4.99', AUD: '$8.79'},
      industries: ['insurance', 'architecture', 'facility'],
      includes: ['3D virtual tour with point cloud', 'Downloadable file for self-hosting', 'Downloadable DXF file'],
      bestFor:
        'Professionals who need rapid and highly shareable documentation of space powered by LiDAR for inspection, assessment, progress monitoring or early-stage planning.',
      sample: {label: 'View sample RADIX', href: 'https://iguideradix.com/4c99c640-7f84-4003-b48d-cc2faa902ac0?__avoid-embed-load__&nosplash'},
      image: '/homepage/pricing/radix.png',
    },
    {
      id: 'instant',
      name: 'iGUIDE Instant',
      priceLabel: 'Per project',
      // No CAD price on the live site
      prices: {USD: '$7.99', AUD: '$14.29'},
      industries: ['real-estate', 'insurance'],
      includes: [
        '3D virtual tour with AI drafted floor plans',
        'Measurement tools and lead generation features',
        '120 days of hosting',
      ],
      bestFor:
        'Professionals who need quick and highly shareable 3D tour with a basic floor plan, without waiting for manual drafting.',
      sample: {label: 'Try Instant demo', href: 'https://youriguide.com/87n9g_150_chattel_st_middletown_ny?__avoid-embed-load__&nosplash'},
      image: '/homepage/pricing/instant.png',
    },
    {
      id: 'standard',
      name: 'iGUIDE Standard',
      priceLabel: 'Starting at',
      prices: {CAD: '$48.00', USD: '$34.50', AUD: '$59.40'},
      industries: ['real-estate', 'insurance', 'architecture', 'facility'],
      includes: [
        '3D virtual tour',
        'Color-coded floor plans',
        'Measurement tools and lead generation features',
        'Downloadable files and Floorplanner export for offline use',
        'ANSI-Z765 / RMS compliant 2D square footage calculations',
        'One-year hosting package',
      ],
      bestFor:
        'Professionals who need accurate, measurement-compliant floor plans and a 3D virtual tour to market, list, or appraise a property with confidence.',
      sample: {label: 'Explore Standard tour', href: 'https://youriguide.com/150_chattel_st_middletown_ny?__avoid-embed-load__&nosplash'},
      image: '/homepage/pricing/standard.png',
    },
    {
      id: 'premium',
      name: 'iGUIDE Premium',
      priceLabel: 'Starting at',
      prices: {CAD: '$66.00', USD: '$46.50', AUD: '$82.50'},
      industries: ['real-estate', 'architecture', 'facility'],
      includes: [
        'Everything in iGUIDE Standard',
        'Enhanced detailed floor plans with objects, fixtures, and appliances',
        'VR compatible',
      ],
      bestFor:
        'Professionals who need detailed, visually rich floor plans with furniture and fixtures, combined with a 3D virtual tour for high-end marketing and client presentations.',
      sample: {label: 'Explore Premium tour', href: 'https://youriguide.com/100_chattel_st_haverhill_ma?__avoid-embed-load__&nosplash'},
      image: '/homepage/pricing/premium.png',
    },
    {
      id: 'adp',
      name: 'iGUIDE Advanced Drawing Package',
      priceLabel: 'Starting at',
      prices: {CAD: '$210.00', USD: '$150.00', AUD: '$273.90'},
      industries: ['architecture', 'facility'],
      includes: [
        '3D virtual tour',
        'Plotted drawing package (PDF)',
        'CAD floor plan (DWG)',
        'LiDAR point cloud data (DXF)',
      ],
      bestFor:
        'Professionals who need accurate, CAD-ready drawings and virtual tours to support design, permitting, or construction projects.',
      image: '/homepage/pricing/advanced-drawing.png',
    },
    {
      id: 'instantsketch',
      name: 'iGUIDE Instant Sketch',
      priceLabel: 'Per project',
      prices: {CAD: '$34.99', USD: '$24.99', AUD: '$43.99'},
      industries: ['insurance'],
      includes: [
        'Receive sketch in minutes',
        '3D virtual tour',
        'Site documentation',
        'Verisk Xactimate integration — delivers ESX file',
      ],
      bestFor:
        'Professionals who need a fast, AI-generated Xactimate sketch with an integrated 3D tour to speed up estimating and claims work.',
      image: '/homepage/pricing/instant-sketch.png',
    },
    {
      id: 'standardsketch',
      name: 'iGUIDE Standard Sketch',
      priceLabel: 'Starting at',
      prices: {CAD: '$90.00', USD: '$64.50', AUD: '$113.40'},
      industries: ['insurance'],
      includes: ['3D virtual tour', 'Colour-coded floor plans', 'ESX file', 'Outdoor features (decks, patios, porches)'],
      bestFor:
        'Professionals who need an accurate, professionally drafted Xactimate sketch with an integrated 3D tour for reliable estimating and documentation.',
      image: '/homepage/pricing/standard-sketch.png',
    },
    {
      id: 'premiumsketch',
      name: 'iGUIDE Premium Sketch',
      priceLabel: 'Starting at',
      prices: {CAD: '$108.00', USD: '$76.50', AUD: '$136.50'},
      industries: ['insurance'],
      includes: [
        'Includes cabinetry and complex ceilings',
        '3D virtual tour',
        'Color-coded floor plan',
        'ESX file',
        'Outdoor features (decks, patios, porches)',
        'Appliances and plumbing symbols',
      ],
      bestFor:
        'Professionals who need a detailed Xactimate sketch with complex elements like cabinets and ceilings, combined with a 3D tour for comprehensive damage assessment and estimating.',
      image: '/homepage/pricing/premium-sketch.png',
    },
  ] satisfies Package[],
}

/* ---------- Section: FAQ ---------- */

export const faq = {
  heading: 'What people ask before getting started',
  subheading: 'From setup to deliverables, here’s what most new users want to know.',
  /** Questions shown before "Show more" (live site shows 3) */
  initiallyVisible: 3,
  items: [
    {
      q: 'Does iGUIDE only capture interiors?',
      a: 'No. While iGUIDE captures immersive interior tours and floor plans, it can also include Site Plans that show how the home sits on the property and how interior and exterior spaces connect. From a single iGUIDE capture, listings can include both interior and exterior context—helping buyers understand the full property, not just what’s inside.',
    },
    {
      q: 'Can I brand the virtual tour or floor plan?',
      a: 'Yes, iGUIDE lets you add your logo and customize the virtual tour and floor plans with branding options including company logo, contact information and customized colour schemes.',
    },
    {
      q: 'Is the virtual tour automatically created?',
      a: 'Once a property is scanned with the PLANIX camera system, an immersive 3D virtual tour, schematic floor plan and rich property data is generated, no stitching or manual post-processing required.',
    },
    {
      q: 'Can I use iGUIDE for more than just real estate?',
      a: 'Yes! iGUIDE is used across industries including insurance, restoration, architecture and construction, thanks to its accuracy and format flexibility.',
    },
    {
      q: 'Do I need to pay for a subscription to access my data?',
      a: 'No subscriptions required. You own your data and can download it anytime, or choose to host it on our secure platform.',
    },
    {
      q: 'What file formats are available?',
      a: 'You can export your data in multiple formats including SVG, PDF, DWG, RVT, ESX and FML (coming soon), ready for use across a variety of platforms including CAD tools, Verisk Xactimate, or search portals / web listings.',
    },
    {
      q: 'How accurate are the floor plans and measurements?',
      a: 'Typical iGUIDE measurement uncertainty in distance measurement on a floor plan is 0.5% or better and the corresponding uncertainty in square footage is 1% or better, providing you the confidence required.',
    },
    {
      q: 'How long does it take to capture a property?',
      a: 'With the PLANIX R1 camera system, a 2,500 sq ft space can be fully captured in under 15 minutes, up to 3x faster than traditional methods.',
    },
  ],
}

/* ---------- Section: resources ---------- */

export const latestResources = {
  heading: 'Get more out of iGUIDE',
  subheading: 'Whether you’re just getting started or looking to level up, we’ve got you covered.',
  link: {label: 'View all resources', href: '/resource-center'},
  count: 3,
}

/* ---------- Section: closing quote ---------- */

export const closingQuote = {
  quote:
    "Tech is important, but it's only part of it. What matters is having a partner like iGUIDE who helps us scale and keeps things running smoothly.",
  name: 'Glen MacIsaac',
  role: 'Photography Manager',
  company: 'Royal LePage Atlantic',
  image: '/homepage/glen-macisaac.png',
  primary: {label: 'Shop PLANIX R1', href: 'https://store.goiguide.com/'},
  secondary: {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/'},
}

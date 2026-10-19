/**
 * Sample content for each layout. Used two ways:
 *  - /landing-templates/<layout> renders it as a full example page
 *  - the Studio "New landing page: <layout>" templates start from it
 *    (studioTemplateValue strips the preview-only fields)
 * Copy is taken from existing iGuide pages so the examples read realistically.
 */
import {getLpLayout, type LpSectionType} from './layouts'

type Sample = Record<string, unknown> & {_type: LpSectionType}

const img = (src: string, alt = '') => ({_preview: src, alt})
const button = (label: string, action: 'form' | 'demo' | 'url' = 'form', url?: string) => ({_type: 'lpButton', label, action, url})

const samples: Record<LpSectionType, (heroStyle: string) => Sample> = {
  lpHero: (style) => ({
    _type: 'lpHero',
    style,
    eyebrow: 'For real estate photographers',
    heading: 'Capture professional 3D tours and detailed floor plans in one shoot',
    subheading: 'Scan a 3,000 sq ft home in as little as 15 minutes with deliverables in 24 hours. No monthly subscriptions. No hosting fees.',
    bullets: style === 'centered' ? ['3D tour, floor plans and measurements from one scan', 'Delivered in 24 hours', 'Pay per project'] : undefined,
    buttons: style === 'form' ? undefined : [button(style === 'media' ? 'Book a demo' : 'Get started', style === 'media' ? 'demo' : 'form')],
    showRating: style !== 'banner',
    ...(style === 'banner'
      ? {heading: 'Thanks for getting in touch!', subheading: 'We\'ll reach out shortly.', eyebrow: undefined, buttons: undefined, backgroundImage: img('/assets/Uploads/Real_estate_photographers_150dpi.jpg')}
      : {}),
    media: style === 'media' ? {kind: 'tour', url: 'https://youriguide.com/100_chattel_st_haverhill_ma', title: 'Sample iGuide 3D tour'} : undefined,
    formHeading: 'Connect with an iGuide Specialist!',
    // Real HubSpot form IDs are added per page (so template previews never send real leads)
    _previewForm: true,
  }),
  lpLogos: () => ({
    _type: 'lpLogos',
    heading: 'Trusted by thousands of professionals worldwide',
    _previewLogos: ['Scrolling-LogosRemax.png', 'Scrolling-LogosKW.png', 'Scrolling-LogosRoyalLePage.png', 'Scrolling-LogosVisual.png', 'Scrolling-LogosPrepTours.png'].map(
      (f) => `/assets/Uploads/${f}`,
    ),
  }),
  lpFeatures: () => ({
    _type: 'lpFeatures',
    heading: 'Why real estate photographers choose iGuide',
    columns: 3,
    items: [
      {_type: 'feature', title: 'Speed of capture', text: 'Capture 3D virtual tours and detailed floor plans in minutes, not hours.', icon: img('/assets/Uploads/Icons_3D-Tour__FitMaxWzYwLDYwXQ.png')},
      {_type: 'feature', title: 'No recurring fees', text: 'No subscriptions, hosting fees or credits. Pay only for the processing and files you need.', icon: img('/assets/Uploads/Icons-_No-Fees__FitMaxWzYwLDYwXQ.png')},
      {_type: 'feature', title: 'Data ownership', text: 'Keep a digital download or host your files on our secure platform.', icon: img('/assets/Uploads/Icons-_Your-Data__FitMaxWzYwLDYwXQ.png')},
    ],
    background: 'surface',
  }),
  lpSplit: () => ({
    _type: 'lpSplit',
    heading: 'The real estate camera for floor plans and tours',
    body: 'The PLANIX R1 camera system captures 360° images and LiDAR measurements of each room to create an iGuide in minutes.',
    bullets: ['Easy set up', 'Fast capture: 15–20 minutes for 3,000 sq ft', 'Quick turnaround: deliverables in under 24 hours*'],
    footnote: '*Delivery time depends on the complexity of the file.',
    media: {kind: 'youtube', url: 'https://www.youtube.com/watch?v=waROUizarks', title: 'iGuide PLANIX R1 overview'},
    mediaSide: 'right',
  }),
  lpSteps: () => ({
    _type: 'lpSteps',
    heading: 'iGuide is as easy as 1-2-3',
    steps: [
      {_type: 'step', title: 'Capture', text: 'Connect the camera to your smart device, create a project and start scanning.'},
      {_type: 'step', title: 'Process', text: 'Request your floor plan, virtual tour and feature sheet in the iGuide Portal.'},
      {_type: 'step', title: 'Utilize', text: 'Share, post, upload or download your files. iGuide works with MLS systems and listing portals.'},
    ],
  }),
  lpTestimonials: () => ({
    _type: 'lpTestimonials',
    heading: 'What our customers say',
    _previewQuotes: [
      {
        quote: 'Adding iGuide virtual tours has helped my Realtor clients sell more properties, save more time by showing fewer properties that fit home buyer’s needs.',
        name: 'Paul Maynard',
        company: 'Colorful Virtual Tours',
        photo: '/assets/paul.png',
      },
      {
        quote: 'I do photos and iGuide 3D tour with floor plan for almost every single listing I do. So, it gives me more revenue.',
        name: 'Todd Wasylyshyn',
        company: 'Nanaimo Photography',
        photo: '/assets/todd.png',
      },
    ],
  }),
  lpStats: () => ({
    _type: 'lpStats',
    heading: 'The numbers',
    items: [
      {_type: 'stat', value: '15 min', text: 'to scan a 3,000 sq ft home'},
      {_type: 'stat', value: '24 hrs', text: 'to get floor plans and a 3D tour'},
      {_type: 'stat', value: '$0', text: 'monthly subscription'},
    ],
    background: 'surface',
  }),
  lpCompare: () => ({
    _type: 'lpCompare',
    heading: 'iGuide vs. the alternatives',
    oursLabel: 'iGuide',
    theirsLabel: 'Others',
    rows: [
      {_type: 'row', label: 'LiDAR-accurate floor plans', ours: 'Yes', theirs: 'No'},
      {_type: 'row', label: 'Monthly subscription', ours: 'No, pay per project', theirs: 'Yes'},
      {_type: 'row', label: 'You own the data', ours: 'Yes', theirs: 'Varies'},
    ],
  }),
  lpTabs: () => ({
    _type: 'lpTabs',
    heading: 'Experience iGuide',
    subheading: 'Every project is different. Explore the deliverables that work best for your needs.',
    tabs: [
      {_type: 'tab', label: 'iGuide Virtual Walkthrough', text: 'Track, document and share project progress with no site revisit.', media: {kind: 'tour', url: 'https://youriguide.com/pre_and_post_construction', title: 'iGuide walkthrough'}},
      {_type: 'tab', label: 'DWG Add-on', text: 'DWG floor plans for any iGuide Standard or Premium, delivered in 48 hours or less.', media: {kind: 'image', image: img('/assets/Uploads/DWG-v3.png', 'DWG example')}, buttons: [button('Commercial Premium DWG', 'url', '/assets/Sample-Drawing-Packages/Commercial-Premium-DWG.zip')]},
    ],
  }),
  lpTourDemo: () => ({
    _type: 'lpTourDemo',
    heading: 'Experience the power of iGuide for yourself',
    tips: [
      {icon: img('/assets/Uploads/Icons_Floorplans-copy.png'), text: 'Click the Main Floor on the iGuide to view different floors of the property.'},
      {icon: img('/assets/Uploads/Icons_iGUIDE-Embed-2.png'), text: 'Use the green dots on the floor plan to navigate different rooms.'},
      {icon: img('/assets/Uploads/Icons_iGUIDE-Embed-3.png'), text: 'Click the ruler to try using the measurement feature.'},
    ],
    tours: [{media: {kind: 'tour', url: 'https://youriguide.com/embed/100_chattel_st_haverhill_ma?unbranded=1', title: 'Sample iGuide 3D tour'}}],
    background: 'surface',
  }),
  lpVideos: () => ({
    _type: 'lpVideos',
    heading: 'Hear it from customers',
    videos: [
      {_type: 'video', title: 'MC3 Design shares their iGuide experience', url: 'https://www.youtube.com/watch?v=6VXKsBK0DnE'},
      {_type: 'video', title: 'Levco Builders shares their iGuide experience', url: 'https://www.youtube.com/watch?v=MFywiM0oFwc'},
    ],
  }),
  lpResources: () => ({_type: 'lpResources', heading: 'Learn more', items: []}),
  lpForm: () => ({
    _type: 'lpForm',
    heading: 'Book your demo today',
    subheading: 'Tell us about your business and an iGuide specialist will be in touch.',
    _previewForm: true,
    background: 'sky',
  }),
  lpFaq: () => ({
    _type: 'lpFaq',
    heading: 'Frequently asked questions',
    items: [
      {_type: 'qa', question: 'How fast are deliverables ready?', answer: 'Floor plans and tours are delivered within 24 hours of uploading your data, and generally much faster.'},
      {_type: 'qa', question: 'Is there a subscription?', answer: 'No. iGuide is pay-per-project with no subscriptions or hosting fees.'},
    ],
  }),
  lpCta: () => ({_type: 'lpCta', heading: 'Ready to grow your business?', text: 'See iGuide in action with a personalized product tour.', buttons: [button('Book your demo', 'demo')]}),
  lpNotice: () => ({_type: 'lpNotice', text: 'Offer valid for new customers only. Terms and conditions apply. Prices in CAD/USD exclude applicable taxes.'}),
}

/** Full sample page for a layout (preview fields included) */
export function sampleSections(layoutId: string) {
  const layout = getLpLayout(layoutId)
  return layout.sections.map((type, i) => ({...samples[type](layout.heroStyle), _key: `${type}-${i}`}))
}

/** Remove preview-only fields (keys starting with "_preview") so the value is valid for the Studio */
function strip(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(strip)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) {
      if (k.startsWith('_preview') || v === undefined) continue
      // Sample images have no uploaded file yet: leave the image empty, keep the alt text
      if (v && typeof v === 'object' && '_preview' in (v as object)) continue
      out[k] = strip(v)
    }
    return out
  }
  return value
}

let keySeq = 0
function addKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((v) => (v && typeof v === 'object' && !Array.isArray(v) ? {_key: `k${(keySeq++).toString(36)}`, ...(addKeys(v) as object)} : addKeys(v)))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, addKeys(v)]))
  return value
}

/** Initial value for "New landing page" from a layout in the Studio */
export function studioTemplateValue(layoutId: string) {
  return {layout: layoutId, live: true, chrome: getLpLayout(layoutId).chrome ?? 'landing', sections: addKeys(strip(sampleSections(layoutId)))}
}

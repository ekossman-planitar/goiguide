/** /compare/iguide-vs-manual-measurement — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {VsColumns} from '@/components/pages/VsColumns'
import {closingCta, compareHeroFormId, compareLogos, comparePlanixImage, logosHeading, lookInsideV2} from './compareShared'

export const meta = {
  title: 'iGuide vs Manual Measurement | Faster, Accurate Floor Plans | iGuide',
  description:
    'Compare iGuide vs manual measurement. Capture accurate floor plans and 3D walkthroughs in one visit with faster delivery and fewer return trips.',
  path: '/compare/iguide-vs-manual-measurement',
}

export const hero = {
  heading: 'iGuide vs manual measurement: digital precision, manual no more',
  subheading:
    'Ditch manual measuring for fast, accurate floor plans and immersive 3D walkthroughs, captured in a single visit and delivered within 24 hours.',
  rating: true,
  formHeading: 'See how iGuide compares to manual measurement',
  formId: compareHeroFormId,
}

export const blocks: Block[] = [
  {type: 'logos', heading: logosHeading, logos: compareLogos(lookInsideV2)},
  {
    type: 'cards',
    id: 'key-reasons',
    align: 'center',
    heading: 'Why leading real estate professionals choose iGuide over manual measurement',
    columns: 3,
    cards: [
      {
        title: 'Faster capture on site',
        text: 'iGuide captures the entire property in a single efficient visit (often in under 15 minutes) delivering floor plans, site plans, and immersive walkthroughs without manual measuring.',
      },
      {
        title: 'Precision measurements',
        text: 'iGuide delivers professional floor plans, Site Plans and walkthroughs in as little as six hours*, no manual hand-sketching required.',
      },
      {
        title: 'Immersive 3D virtual tours',
        text: 'iGuide combines floor plans, Site Plans and immersive walkthroughs to show layout, flow and how spaces connect.',
      },
      {title: 'Own your data, forever', text: 'iGuide gives you permanent ownership and access to your projects, with no ongoing subscriptions.'},
      {
        title: 'Fewer return visits, lower costs',
        text: 'iGuide captures measurements and visuals in one visit, reducing the need for return trips.',
      },
    ],
    after: (
      <p className="text-sm leading-6 text-muted">
        *Note: iGuide Instant is delivered within minutes. iGuide Standard and Premium are delivered within a 24 hr SLA.
      </p>
    ),
  },
  {
    type: 'quote',
    background: 'surface',
    quote: {
      quote:
        'Being able to shoot 4–5 houses in a day would not be possible by hand without iGuide. The reliability and accuracy are unmatched. Clients rely on it, even in legal disputes. iGuide’s accuracy can stand up in court.',
      name: 'Saad Khan',
      role: 'Photographer',
      company: 'Northern Spruce Media',
      photo: {src: '/assets/Testimonial-Headshots/Saad-Khan.png', alt: 'photo - Saad Khan'},
    },
  },
  {
    type: 'cards',
    id: 'trusted-by-professionals',
    align: 'center',
    heading: 'Trusted by professionals',
    columns: 3,
    cards: [
      {title: 'For fast, accurate photographers', text: 'Ditch measuring tapes. Capture accurate floor plans and 3D tours in one visit.'},
      {title: 'Elevated listings for agents', text: 'Go beyond floor plans with 3D tours that show fit and flow, and elevate your brand.'},
      {title: 'Fewer return visits', text: 'Capture every detail in one pass, reducing costly return trips.'},
    ],
  },
  {
    type: 'custom',
    id: 'compare',
    background: 'surface',
    align: 'center',
    heading: 'iGuide vs manual measurement at a glance',
    children: (
      <VsColumns
        ours={{
          name: 'iGuide',
          image: comparePlanixImage,
          items: [
            {text: 'Fast, professional camera system', ok: true},
            {text: '~15 minutes capture speed 2,500 sq ft property', ok: true},
            {text: 'Professional LiDAR measurements', ok: true},
            {text: 'Professional floor plan quality', ok: true},
            {text: 'Walkthrough experience included', ok: true},
            {text: 'Revisions are rare', ok: true},
            {text: 'Return visits unlikely', ok: true},
          ],
        }}
        theirs={{
          name: 'Hand-sketching',
          image: {src: '/assets/iGUIDE_Hand_Sketching.png', alt: 'photo - hand sketching'},
          items: [
            {text: 'Estimated floor plans, not ANSI/RMS compliant', ok: false},
            {text: '~45+ minutes capture speed 2,500 sq ft property', ok: false},
            {text: 'Variable measurements', ok: false},
            {text: 'Inconsistent floor plan quality', ok: false},
            {text: 'Walkthrough experience not available', ok: false},
            {text: 'Revisions are common', ok: false},
            {text: 'Return visits often required', ok: false},
          ],
        }}
      />
    ),
  },
  {
    type: 'custom',
    id: 'modern-listings',
    align: 'center',
    heading: 'A better fit for modern listings',
    subheading:
      'Today’s listings demand speed, accuracy, and clarity. iGuide delivers precise measurements, fast turnaround and immersive walkthroughs, without manual measuring.',
    children: null,
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'How long does it take to capture a property?',
        a: 'With the PLANIX R1 camera system, a 2,500 sq ft / 232.26 square meters space can be fully captured in under 15 minutes, up to 3x faster than traditional methods.',
      },
      {
        q: 'How accurate are the floor plans and measurements?',
        a: 'Typical iGuide measurement uncertainty in distance measurement on a floor plan is 0.5% or better and the corresponding uncertainty in square footage is 1% or better, providing you the confidence required.',
      },
      {
        q: 'What file formats are available?',
        a: 'You can export your data in multiple formats including SVG, PDF, DWG, RVT, ESX and FML (coming soon), ready for use across a variety of platforms including CAD tools, Verisk Xactimate, or search portals / web listings.',
      },
      {
        q: 'Is iGuide suitable for different types of residential listings?',
        a: 'iGuide is designed to scale across a wide range of residential properties, delivering consistent results regardless of size or complexity.',
      },
      {
        q: 'Does iGuide reduce the need to revisit the property?',
        a: 'Yes. Because measurements and visuals are captured digitally, iGuide significantly reduces the likelihood of return visits for missed dimensions or additional context.',
      },
      {
        q: 'Can iGuide replace hand-sketching entirely?',
        a: 'Yes, iGuide provides accurate measurements, professional floor plans and a walkthrough experience from a single capture, removing the need for manual measurement and hand-sketching.',
      },
      {
        q: 'Do buyers care about floor plans and walkthroughs?',
        a: 'Yes. Floor plans help buyers understand layout at a glance, while walkthroughs provide spatial context and flow. Together, they help buyers decide whether a property is right for them before booking an inspection.',
      },
      {
        q: 'Are hand-sketched floor plans accurate?',
        a: 'Hand-sketched floor plans rely on manual measuring and handwritten notes, which can introduce variability. iGuide uses the PLANIX R1 camera system, which is LiDAR-equipped, to produce consistent, repeatable results.',
      },
    ],
  },
  closingCta({
    heading: 'See how iGuide fits into your workflow',
    secondary: {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/'},
  }),
]

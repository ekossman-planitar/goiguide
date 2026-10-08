/** /iguide/floor-plans — copy, links and asset paths from the live page (checked 2026-10-07). */
import {book} from './shared'

export const floorPlans = {
  meta: {
    title: 'iGUIDE Floor Plans: PDF, CAD (DWG), ESX & 3D Model Exports | iGUIDE',
    description:
      'Get accurate floor plans with every iGUIDE. Download branded schematic PDFs, CAD (DWG) files, ESX exports, and 3D models for real estate, insurance, architecture, contractor, and BIM workflows.',
    path: '/iguide/floor-plans',
    ogImage: '/assets/iGUIDE-Meta-Thumbnail.png',
  },
  hero: {
    eyebrow: {label: 'New: Branded Property Overviews for residential listings', href: '#branded-property-overviews'},
    heading: 'Accurate, detailed floor plans with every iGUIDE',
    subheading: 'From branded schematic PDFs to CAD and ESX exports, iGUIDE delivers accurate floor plans for every workflow.',
    ctas: [book()],
    tabs: [
      {id: 'schematic-pdf', label: 'Schematic PDF', image: {src: '/assets/schematic-pdf-floorplan.png', alt: 'iGUIDE schematic PDF floor plan sample', width: 800, height: 745}},
      {id: 'cad-dwg', label: 'CAD (DWG)', image: {src: '/assets/plotted-cropped.png', alt: 'iGUIDE CAD DWG floor plan export sample', width: 960, height: 755}},
      {id: 'esx', label: 'ESX', image: {src: '/assets/esx-floorplan-sample.png', alt: 'iGUIDE ESX floor plan export sample', width: 960, height: 488}},
      {id: '3d', label: '3D Model', image: {src: '/assets/3D-model-floorplan.png', alt: 'iGUIDE 3D model floor plan export sample', width: 960, height: 640}},
    ],
  },
  software: {
    heading: 'Files delivered ready for',
    logos: [
      {src: '/assets/autocad-logo-aec.png', alt: 'AutoCAD'},
      {src: '/assets/revit-logo-aec.png', alt: 'Revit'},
      {src: '/assets/sketchup-logo-aec.png', alt: 'SketchUp'},
      {src: '/assets/chief-architect-logo-aec.png', alt: 'Chief Architect'},
      {src: '/assets/vectorworks-logo-aec.png', alt: 'Vectorworks'},
      {src: '/assets/xacimate-logo-aec.png', alt: 'Xactimate'},
    ],
  },
  workflows: {
    heading: 'Built for every workflow',
    subheading: 'From real estate listings to insurance claims and CAD drafting, iGUIDE floor plans fit directly into your existing process.',
    cards: [
      {title: 'Real estate', text: 'Fast branded floor plans for listings'},
      {title: 'Insurance', text: 'ESX compatible documentation workflows'},
      {title: 'Architecture', text: 'CAD compatible drafting exports'},
      {title: 'Contractors', text: 'Accurate measurements and offline files'},
    ],
  },
  deliverables: {
    heading: 'Floor plan deliverables for every workflow',
    subheading: 'Choose the floor plan deliverables that fit your workflow.',
    items: [
      {
        title: 'Schematic PDF Floor Plan',
        summary: 'Best for real estate listings, marketing, property documentation.',
        image: {src: '/assets/Schematic-PDF-Floor-Plan-462.png', alt: 'Schematic PDF floor plan sample showing a color-coded iGUIDE layout', width: 462, height: 346},
        includesLabel: 'Includes:',
        includes: ['Color coded floor plans', 'Room labels', 'Measurements', 'Square footage calculations', 'PDF / SVG exports'],
        note: 'Requires: iGUIDE Standard or Premium',
        cta: {label: 'Download PDF sample', href: '/assets/iGUIDE-Schematic-Floor-Plan.pdf'},
      },
      {
        title: 'CAD Floor Plan (DWG)',
        summary: 'Best for architects, contractors, drafting workflows.',
        image: {src: '/assets/CAD-Floor-Plan-462.png', alt: 'CAD DWG floor plan export sample for architectural drafting', width: 462, height: 346},
        includes: ['DWG floor plan at LOD 200 detail', 'AIA standard layers and annotations', 'LiDAR point cloud data exported in DXF format'],
        note: 'Requires: iGUIDE Premium or Advanced Drawing Package',
        cta: {label: 'Download CAD sample', href: '/assets/Help_Center_Assets/Residential-CAD-samples/Residential-Floor-Plans.zip'},
      },
      {
        title: 'ESX Floor Plan',
        summary: 'Best for adjusters, restoration, claims documentation.',
        image: {src: '/assets/ESX-Floor-Plan-462.png', alt: 'ESX floor plan export sample for insurance claims and restoration workflows', width: 462, height: 346},
        includes: ['ESX compatible exports', 'Detailed measurements', 'Integrated walkthrough', 'Fast turnaround'],
        note: 'Requires: iGUIDE Instant Sketch, Standard Sketch or Premium Sketch',
        cta: {label: 'Download ESX sample', href: '/assets/downloads/iGUIDE_ESX_Sketch_Samples.zip', newTab: true},
      },
      {
        title: '3D Model (DWG or RVT)',
        summary: 'Best for architects, contractors, engineers and BIM workflows.',
        image: {src: '/assets/3D-Model-Floor-Plan-462.png', alt: '3D model of drafted floors in Revit or DWG', width: 462, height: 346},
        includes: ['3D model of drafted floors in Revit or DWG', 'Walls, doors, windows and basic structural elements'],
      },
    ],
  },
  overviews: {
    id: 'branded-property-overviews',
    heading: 'Branded property overviews that clients can actually understand',
    body: 'Combine floor plans, measurements, visuals and property details into polished branded reports ready for presentations, listings and documentation.',
    image: {src: '/assets/Branded-Property-Overviews.png', alt: 'img - Branded Property Overviews', width: 1200, height: 900},
  },
  testimonial: {
    quote: "We've had our measurements challenged at least 200 times. Every single time, iGUIDE has been accurate. Not once has it been wrong.",
    name: 'Ryan Hagel',
    role: 'Owner',
    company: 'Calgary Real Estate Photos',
    photo: {src: '/assets/ryan.jpg', alt: 'photo - Ryan Hagel'},
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {q: 'How quickly will I get my floor plans after capture?', a: 'Interactive floor plans are available within minutes with iGUIDE Instant. Standard and Premium schematic floor plans are drafted and delivered within 24 hours, so you can move projects forward without delays.'},
      {q: 'How accurate are the measurements?', a: 'iGUIDE floor plans are created with a LiDAR-equipped PLANIX camera system that delivers a typical measurement uncertainty of 0.5% or better. That means agents, contractors, designers, insurance adjusters and fire investigators can rely on the numbers for marketing, estimates, design and documentation.'},
      {q: 'What formats are available?', a: 'Floor plans can be downloaded as PDFs, SVGs and JPGS for quick use, or as CAD files (DXF, DWG, RVT) for architects and contractors. Insurance professionals can also receive Xactimate Sketch deliverables.'},
      {q: 'How will iGUIDE floor plans help my business?', a: 'Whether you’re an agent looking to win more listings, a photographer adding value for clients, or a contractor or adjuster documenting a site, iGUIDE floor plans save time, reduce rework and deliver trusted data your clients can act on.'},
      {q: 'Who uses iGUIDE floor plans today?', a: 'Trusted across real estate, design, construction, insurance and facility management—thousands of professionals rely on iGUIDE to capture, document and share spaces with accuracy and speed.'},
      {
        q: 'Are Branded Property Overviews the same as a measurement report?',
        a: (
          <>
            <p>No. Branded Property Overviews are a separate, presentation-focused report, not a measurement or compliance report.</p>
            <p>
              They are designed to present property information in a polished, agent-branded format for real estate listings, while
              measurement reports focus on detailed measurements and technical property data. Both can be generated from the same iGUIDE
              capture, but each serves a different purpose.
            </p>
          </>
        ),
      },
    ],
  },
  cta: {heading: 'Get the floor plan that fits your needs', ctas: [book('Talk to a product expert')]},
}

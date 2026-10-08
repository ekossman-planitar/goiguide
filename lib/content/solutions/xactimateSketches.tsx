/** /iguide/xactimate-sketches — copy, links and asset paths from the live page (checked 2026-10-07). */
import {book} from './shared'

export const xactimateSketches = {
  meta: {
    title: 'iGUIDE: Create Xactimate Sketches with 3D Walkthroughs | iGUIDE',
    description:
      'Speed up claims and restoration with iGUIDE. Instantly create Xactimate ESX Sketches and 3D walkthroughs for fast, accurate, and detailed documentation.',
    path: '/iguide/xactimate-sketches',
    ogImage: '/assets/iGUIDE-Meta-Thumbnail.png',
  },
  hero: {
    heading: 'Create Xactimate Sketches with an integrated 3D Virtual Walkthrough',
    subheading: 'Accelerate claims and restoration projects with fast, accurate and detailed loss documentation.',
    ctas: [book()],
    video: {src: '/assets/xacimate-integration.mp4', label: 'iGUIDE and Xactimate integration demo'},
  },
  logos: {
    heading: 'Trusted by thousands of IRC professionals worldwide',
    items: [
      {src: '/assets/noblesville-fire-department.png', alt: 'logo - Noblesville Fire Department'},
      {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
      {src: '/assets/Uploads/Scrolling-LogosGrindley.png', alt: 'logo - Grindley Williams Engineering'},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours-v2.png', alt: 'logo - PuroClean'},
      {src: '/assets/Uploads/compass.png', alt: 'logo - Compass Building Services'},
      {src: '/assets/Icons/all-seasons-adjusting-logo.png', alt: 'logo - All Seasons Adjusting'},
      {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: 'logo - SeekNow'},
      {src: '/assets/Uploads/Scrolling-LogosColonial-Claims.png', alt: 'Colonial Claims'},
    ],
  },
  audiences: {
    heading: 'Who benefits from accurate Sketch files with an integrated iGUIDE virtual walkthrough?',
    subheading: 'Accurate measurements, area totals, sketch files and comprehensive images benefit anyone documenting a loss.',
    cards: [
      {title: 'Adjusters', text: 'Capture and submit claims documentation faster to speed up processing', icon: {src: '/assets/adjusters.svg', alt: 'icon - Stamped Document'}},
      {title: 'Restoration contractors', text: 'Produce more accurate repair estimates with precise measurements and visuals', icon: {src: '/assets/contractors.svg', alt: 'icon - Ruler'}},
      {title: 'Policy holders', text: 'Receive timely updates and have claims resolved faster', icon: {src: '/assets/policy.svg', alt: 'icon - Documents in hand'}},
      {title: 'Forensics investigators', text: 'Access comprehensive visual records for detailed analysis', icon: {src: '/assets/forensics.svg', alt: 'icon - Photos'}},
    ],
  },
  testimonials: [
    {
      quote: 'iGUIDE makes documenting fire scenes simple, fast, and more accurate than ever.',
      name: 'Todd Estes',
      role: 'Division Chief - Planning, Investigations',
      company: 'Noblesville Fire Department',
      photo: {src: '/assets/Todd-Estes.png', alt: 'photo - Todd Estes'},
    },
    {
      quote: "With iGUIDE, I'm getting back at least 20 hours a week. And that's being conservative. While someone else is still hand-sketching one property, I've already done four.",
      name: 'Jeremy Murray',
      role: 'Independent Adjuster',
      company: 'Gale-Force Adjusters LLC',
      photo: {src: '/assets/Jeremy-Murray.jpg', alt: 'photo - Jeremy Murray'},
    },
  ],
  included: {
    // "Whats" is the live wording
    heading: 'Whats included in every iGUIDE?',
    cards: [
      {title: 'Enhanced speed and efficiency', text: 'Eliminate the need for manual measurements, sketching or repetitive site visits. Document a 3,000 sq ft property in 15 minutes.'},
      {title: 'Industry leading accuracy', text: 'Take 1000s of LiDAR based measurements instantly with each scan.'},
      {title: 'Comprehensive visual documentation', text: 'Quickly and easily inspect and assess damages using 360-degree visuals.'},
      {title: 'Per-project pricing, data ownership and offline downloads', text: 'Avoid monthly subscriptions, lengthy commitments and control your data.'},
    ],
  },
  sketches: {
    heading: 'Flexible Sketch detail levels for every workflow',
    subheading: 'See and compare what you get with each type of iGUIDE Sketch.',
    items: [
      {
        title: 'iGUIDE Instant Sketch',
        image: {src: '/assets/Instant-Sketch.png', alt: 'iGUIDE Instant Sketch'},
        includesLabel: 'Includes:',
        includes: ['Available directly in Xactimate via integration', 'Basic structure such as walls and openings', 'Delivery in minutes'],
      },
      {
        title: 'iGUIDE Standard Sketch',
        image: {src: '/assets/Standard-Sketch_Pricing.png', alt: 'iGUIDE Standard Sketch'},
        includes: [
          'All details found in iGUIDE Instant Sketch',
          'ESX direct download',
          'Windows, doors & door styles',
          'Room names & types',
          'Stairs & elevations',
          'Structural columns',
          'Ledges & fireplaces',
          'Floor materials',
          'Ceiling heights (flat/box only)',
          'Delivery within 24 hours',
          'Outdoor features (decks, patios, porches)',
        ],
      },
      {
        title: 'iGUIDE Premium Sketch',
        image: {src: '/assets/Premium-Sketch_Pricing.png', alt: 'iGUIDE Premium Sketch'},
        includes: ['All details found in iGUIDE Standard Sketch', 'Complex ceilings', 'Cabinetry'],
      },
    ],
    cta: {label: 'Download Sketch samples', href: '/assets/downloads/iGUIDE_ESX_Sketch_Samples.zip', variant: 'secondary' as const},
  },
  stories: {
    heading: 'See how iGUIDE helps insurance and restoration teams work faster',
    link: {label: 'View all IRC customer stories', href: '/customer-stories?category=insurance-and-restoration'},
    quotes: [
      {
        quote:
          'Everything lived in the cloud with Matterport. There were chain-of-custody concerns, subscription fees and we couldn’t store the raw data ourselves. Our clients—especially public agencies—care about data control. I couldn’t download or store the raw data. That was a dealbreaker.',
        name: 'Robert Toth',
        role: 'Owner & Certified Fire Investigator',
        company: 'IRIS Fire',
        media: {type: 'image' as const, image: {src: '/assets/Uploads/iris_fire_customerstory.png', alt: 'header image - IRIS Fire Customer Story'}},
      },
      {
        quote:
          'The reports look sharp, the floor plans are accurate, and the 3D walkthrough helps me catch every detail—even after I’ve left the site. All the documentation I need is in one place.',
        name: 'Jeremy Murray',
        role: 'Independent Adjuster',
        company: 'Gale-Force Adjusters LLC',
        media: {
          type: 'image' as const,
          image: {src: '/assets/Uploads/Customer-Story-header-image-Gale-Force-Adjusters-LLC-July-14.png', alt: 'header image - Gale-force Adjusters LLC Customer Story'},
        },
      },
      {
        quote:
          '10 adjusters and 9 of them don’t know how to frame a shot. If you let us take an iGUIDE virtual tour, then you’ll have a million still images. iGUIDE technology has given Deft a huge competitive advantage. Simply seeing how much value it’s brought to deft, we fell in love with it!',
        name: 'Jeremiah Kiefer',
        role: 'Founder & CEO',
        company: 'The Deft Group',
        media: {type: 'embed' as const, src: 'https://www.youtube.com/embed/4H4R9HuK_Cc?si=-arPN-JLq8Q4prNa', title: 'The Deft Group customer story video'},
      },
    ],
  },
  steps: {
    heading: 'Get an iGUIDE Sketch in 4 steps',
    steps: [
      {title: 'Capture', body: 'Capture the property with the iGUIDE PLANIX system in minutes, not hours.', image: {src: '/assets/Uploads/iGUIDE_Contractor_900x760-copy.jpg', alt: 'photo - iGUIDE Capture Professional'}},
      {title: 'Tag', body: 'Add on-site notes with Real-Time Tags to document the loss.', image: {src: '/assets/Uploads/IRC_iGUIDE_Showcase-2.png', alt: 'photo - Reviewing Floor Plans on Tablet'}},
      {title: 'Draft', body: 'Submit the capture for processing and choose your Sketch detail level.', image: {src: '/assets/irc-sketch-step-3.png', alt: 'photo - PLANIX App in Use'}},
      {title: 'Deliver', body: 'Receive your Sketch, files and walkthrough within the listed turnaround time.', image: {src: '/assets/irc-sketch-step-4.png', alt: 'image - Verisk Xactimate Sketch'}},
    ],
    // Live "Lets chat about iGUIDE" opens a "Get in touch" pop-up with these options
    ctas: [book('Lets chat about iGUIDE'), {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/', variant: 'secondary' as const}],
  },
  cta: {
    heading: 'Start capturing your own jobs and streamline your workflow',
    ctas: [{label: 'Shop PLANIX R1', href: 'https://store.goiguide.com/'}],
  },
}

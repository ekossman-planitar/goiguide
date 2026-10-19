/**
 * Live pages built from hand-written HTML (embedscript elements with their own
 * CSS and scripts) that the converter can't read. Their sections are written out
 * here from the live page (checked 2026-10-19) using the same markers as the
 * converter: {img} images, {ref} testimonials, logoImages logo lists.
 * convertPage() uses these instead of reading the page body; title and SEO
 * fields still come from the live page.
 */
import {copy} from './convert-live.mjs'

let n = 0
const k = () => `m${(n++).toString(36)}`
const img = (src, alt = '') => ({img: src, alt})
const c = (s) => copy(s)

export const manualPages = {
  '/get-iguide/irc/storm-season': () => {
    const jeremy = {
      _id: 'testimonial-lp-jeremy-murray-storm',
      _type: 'testimonial',
      quote: c(
        "With iGUIDE, I'm getting back at least 20 hours a week. And that's being conservative. While someone else is still hand-sketching one property, I've already done four.",
      ),
      name: 'Jeremy Murray',
      role: 'Independent Adjuster',
      company: 'Gale-Force Adjusters LLC',
      photo: {src: '/assets/Jeremy-Murray.jpg', alt: 'Jeremy Murray'},
    }
    return {
      testimonials: [jeremy],
      sections: [
        {
          _type: 'lpHero',
          _key: k(),
          style: 'banner',
          centerText: true,
          heading: c('Document and close claims faster. Be storm ready with iGUIDE.'),
          subheading: c(
            'Capture accurate measurements, floor plans, and immersive visuals in a single visit — ready to support storm claims with fast analysis and clear reporting.',
          ),
          backgroundImage: img('/assets/Landing-Page-V1.png'),
          formHeading: 'Book your demo',
          formText: c('Connect with an iGUIDE Specialist to book a demo and see how iGUIDE can help you deliver fast and accurate insurance claims.'),
          hubspotFormId: '719ea139-61e5-41d8-8331-8b286162cbd4',
        },
        {
          _type: 'lpLogos',
          _key: k(),
          heading: c('Trusted by thousands of IRC professionals worldwide'),
          logoImages: [
            {src: '/assets/noblesville-fire-department.png', alt: ''},
            {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
            {src: '/assets/Uploads/Scrolling-LogosGrindley.png', alt: ''},
            {src: '/assets/Uploads/Scrolling-LogosPrepTours-v2.png', alt: ''},
            {src: '/assets/Uploads/compass.png', alt: ''},
            {src: '/assets/Icons/all-seasons-adjusting-logo.png', alt: 'logo - All Seasons Adjusting'},
            {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: ''},
            {src: '/assets/Uploads/Scrolling-LogosColonial-Claims.png', alt: ''},
          ],
        },
        {
          _type: 'lpFeatures',
          _key: k(),
          heading: c('Why Insurance Claims & Restoration Professionals choose iGUIDE'),
          subheading: c('Accurate measurements, floor plans with ESXs and immersive 3D virtual tours ensure quality reports and court-ready documentation.'),
          columns: 3,
          items: [
            [
              'Quick capture technology',
              'Spend less time on-site with PLANIX R1’s fast, high-res visuals and precise LiDAR scans.',
              '/assets/spend-less-time-on-site.svg',
            ],
            [
              'Accurate and reliable',
              'Eliminate guesswork and reduce human error. Automate sketch creation and capture critical data with precision.',
              '/assets/fasttrack-your-cad-workflow.svg',
            ],
            [
              'Real-Time Tagging feature',
              'Add photos, notes, and videos to your iGUIDE 3D Walkthrough as you scan — capturing every detail with ease.',
              '/assets/forensics.svg',
            ],
            [
              'Data ownership',
              'The choice is yours – keep a digital download of your files or host them on our secure hosting platform.',
              '/assets/Icons/cloud.png',
            ],
            [
              'Pay-per project pricing',
              'No recurring fees. Pay only for the processing and files you need instead of an expensive subscription.',
              '/assets/policy.svg',
            ],
            [
              'Verisk Xactimate integration',
              'Instantly convert your iGUIDE data into Xactimate-compatible formats to streamline reporting and claims.',
              '/assets/capture-comprehensive-data.svg',
            ],
          ].map(([title, text, icon]) => ({_type: 'feature', _key: k(), title: c(title), text: c(text), icon: img(icon)})),
        },
        {_type: 'lpTestimonials', _key: k(), items: [{ref: jeremy._id}]},
        {
          _type: 'lpSplit',
          _key: k(),
          heading: c('Significantly reduce the time spent documenting your claims'),
          body: c(
            'The iGUIDE PLANIX R1 does more than just take pictures. Unlike a conventional camera system, it measures and photographs a space simultaneously, giving you both visuals and accurate measurements in one visit.',
          ),
          media: {
            _type: 'lpMedia',
            kind: 'tour',
            url: 'https://youriguide.com/urwkb_1121_sample_road_kitchener_on?autostart=1',
            title: 'iGuide 3D virtual tour',
          },
          mediaSide: 'left',
        },
        {
          _type: 'lpSplit',
          _key: k(),
          heading: c('Create Xactimate Sketches with an integrated 3D Virtual Walkthrough'),
          body: c(
            'Accelerate claims and restoration projects with fast, accurate and detailed loss documentation that combines floor plans, measurements, and immersive visuals.',
          ),
          media: {_type: 'lpMedia', kind: 'image', image: img('/assets/iGUIDE-Tour-in-Xactimate-short-version.gif', 'iGuide in Xactimate')},
          mediaSide: 'right',
        },
        {
          _type: 'lpSteps',
          _key: k(),
          heading: c('Get an iGUIDE Sketch in 3 steps'),
          steps: [
            [
              'Capture',
              'Use the iGUIDE PLANIX R1 camera system to scan the space in minutes, adding real-time tags for points of interest.',
              '/assets/capture_72dpi.jpg',
            ],
            [
              'Draft',
              'Automatically generate floor plans with Instant Sketch. Upgrade to iGUIDE Standard or Premium ESX files for enhanced capabilities.',
              '/assets/Uploads/Process_72dpi.jpg',
            ],
            ['Deliver', 'Receive your Sketch, files and walkthrough within the listed turnaround time.', '/assets/Xactimate_72dpi.jpg'],
          ].map(([title, text, image]) => ({_type: 'step', _key: k(), title, text: c(text), image: img(image)})),
        },
        {
          _type: 'lpVideos',
          _key: k(),
          heading: c('See how iGUIDE helps firms work faster and smarter'),
          fullWidth: true,
          videos: [{_key: k(), title: 'Master Trades Group and iGuide', url: 'https://www.youtube.com/watch?v=LNUlPZBeQAM'}],
        },
      ],
    }
  },

  '/get-iguide/site-plans': () => ({
    extra: {floatingBookButton: true},
    sections: [
      {
        _type: 'lpHero',
        _key: k(),
        style: 'form',
        eyebrow: 'New: Site Plans for residential listings',
        heading: c('Grow your real estate photography business—without adding complexity.'),
        subheading: c('Deliver Site Plans alongside virtual tours and floor plans, all from a single iGUIDE capture.'),
        bullets: ['One visit', 'Higher-value deliverables', 'No added time onsite'],
        showRating: true,
        formHeading: c('Connect with an iGUIDE Specialist'),
        hubspotFormId: '0d755dfc-cbcb-4c65-9344-b0634832680d',
      },
      {
        _type: 'lpLogos',
        _key: k(),
        heading: 'Trusted by thousands of professionals worldwide',
        logoImages: [
          ['Scrolling-LogosRemax.png', 'RE/MAX'],
          ['Scrolling-LogosKW.png', 'Keller Williams'],
          ['Scrolling-LogosRoyalLePage.png', 'Royal LePage'],
          ['loookinside-logo.png', 'LooOK INside'],
          ['Scrolling-LogosSeeknow.png', 'SeekNow'],
          ['Scrolling-LogosPrepTours.png', 'PREP Tours'],
          ['Scrolling-LogosVisual.png', 'Visual Advantage'],
        ].map(([f, alt]) => ({src: `/assets/Uploads/${f}`, alt: `logo - ${alt}`})),
      },
      {
        _type: 'lpTourDemo',
        _key: k(),
        eyebrow: 'Now includes exterior Site Plans',
        heading: 'Tours show the home. Site Plans help you deliver more per shoot.',
        subheading: c('Interior tours show the home. Site Plans show how the home sits on the property—captured once and reused across deliverables.'),
        tips: [],
        tours: [
          {
            _type: 'tour',
            _key: k(),
            media: {
              _type: 'lpMedia',
              kind: 'tour',
              url: 'https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1',
              title: 'iGuide 3D tour with Site Plan: 334 South Lake Shore Drive',
            },
          },
        ],
        listHeading: 'From the same source of truth, you can offer:',
        list: [
          'Interior and exterior context from a single visit',
          'Fewer return visits and follow-up requests',
          'Listing-ready assets agents understand and use',
        ],
        closing: 'One capture means fewer tools, less post-production and more to deliver on every job.',
        background: 'white',
      },
      {
        _type: 'lpCta',
        _key: k(),
        heading: c('Expand what you deliver with iGUIDE Site Plans'),
        text: c('Differentiate your services and grow your offering—without changing your workflow.'),
        buttons: [{_type: 'lpButton', _key: k(), label: c('Talk to an iGUIDE specialist'), action: 'demo'}],
      },
    ],
  }),
}

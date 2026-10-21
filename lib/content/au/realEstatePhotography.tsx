/**
 * /au/real-estate-photography (was /real-estate-photography-au) — copy, links
 * and asset paths from the live page (checked 2026-10-14).
 */
import type {Block} from '@/components/blocks/Blocks'
import {premiumPackage, standardPackage} from '@/lib/content/industries/shared'
import {AU_TERMS_PATH, auDemo, book, danielNik, launchVideo, rea, reaLogo} from './shared'

export const meta = {
  title: 'All-in-One Real Estate Photography Platform | Tours, Floor Plans & More | iGuide Australia | iGuide',
  description:
    'Build a scalable real estate photography business with iGuide. Capture virtual tours, floor plans, property measurements and Site Plans in one visit and deliver the listing assets agents expect.',
  path: '/au/real-estate-photography',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'The listing standard has changed. Be the photographer who meets it.',
    subheading:
      'realestate.com.au’s NextGen listing experience is raising the bar for immersive content. iGuide lets you complete the listing in a single property visit.',
    ctas: [book()],
    media: launchVideo,
  },
  {
    type: 'split',
    id: 'rea',
    background: 'surface',
    heading: 'realestate.com.au is covering iGuide processing',
    body: (
      <p>
        From September 1st, 2026 to March 31st, 2027, processing on eligible residential iGuide Premium and Site Plan orders is funded by {rea}{' '}
        nationally. Add iGuide to your service with that cost off the table.
      </p>
    ),
    listHeading: 'How it works',
    list: [
      'Shoot the iGuide as part of your normal workflow. Nothing changes for you or the agent.',
      'Upload to the listing within 60 days of creating the iGuide, on realestate.com.au.',
      'Processing is covered by realestate.com.au. If a job isn’t uploaded in time, standard processing charges apply.',
    ],
    after: (
      <>
        <p>Already set up? Add iGuide to your next listing.</p>
        <p className="text-sm text-muted">
          iGuide Processing: Complimentary processing applies to residential iGuide Instant, Express, Standard or Premium and Site Plan Add-on
          orders uploaded to realestate.com.au within 60 days of creation. Limit of one processing credit per listing. Offer ends 31 March 2027
          and may be withdrawn earlier on 14 days&apos; notice. Terms &amp; Conditions apply. <a href={AU_TERMS_PATH}>Full terms</a>
        </p>
      </>
    ),
    ctas: [auDemo('Book your demo today')],
    media: {type: 'image', image: {...reaLogo, width: 600, height: 120}},
    mediaClassName: 'mx-auto max-w-sm rounded-xl bg-rea-red p-8',
  },
  {
    type: 'cards',
    heading: 'One capture. Multiple deliverables. One scalable workflow.',
    subheading:
      'With iGuide, you capture virtual tours, floor plans, site plans and property measurements in one visit and deliver the immersive assets your agents now expect on realestate.com.au.',
    columns: 4,
    cards: [
      {
        title: 'Simple, repeatable capture workflow',
        text: 'Capture floor plans, Site Plans and visuals in a single property visit using a consistent, easy-to-learn workflow you can rely on every time.',
        icon: {src: '/assets/Icons/camera-v2.png', alt: 'icon - camera'},
      },
      {
        title: 'Faster turnaround, less post',
        text: 'Spend less time editing and reworking files so you can deliver faster, take on more shoots each week and grow your revenue.',
        icon: {src: '/assets/spend-less-time-on-site.svg', alt: 'icon - Stop Watch'},
      },
      {
        title: 'Elevated listings',
        text: 'Offer the immersive assets that serious buyers engage with on realestate.com.au, while giving your agents a powerful reason to keep booking you.',
        icon: {src: '/assets/forensics.svg', alt: 'icon - Photos'},
      },
      {
        title: 'Support built for growing businesses',
        text: 'Access training, resources and support designed to help you price confidently, work faster and scale your photography business sustainably.',
        icon: {src: '/assets/Icons/photographers.png', alt: 'icon - photographers'},
      },
    ],
  },
  {type: 'quote', quote: danielNik},
  {
    type: 'split',
    heading: 'Designed for how buyers actually shop',
    body: (
      <p>
        Buyers don’t explore listings in order. They jump to what matters most. Kitchens, living spaces, primary bedrooms. iGuide gets them there
        instantly with an interactive floor plan and downloadable files.
      </p>
    ),
    media: {type: 'image', image: {src: '/assets/Australia/Hook-Serious-Buyers.webp', alt: 'photo - Explore iGuide'}},
  },
  {
    type: 'split',
    heading: 'Now deliver the full picture, inside and out',
    body: (
      <p>
        Virtual tours show buyers what’s inside, but Australian buyers and agents increasingly want the full picture. iGuide Site Plans deliver
        that exterior context in a single visit alongside your interior work. No return trips. No extra time.
      </p>
    ),
    ctas: [{label: 'Learn more about Site Plans', href: '/iguide/site-plans'}],
    media: {type: 'video', src: '/assets/Site-Plans-Feature-Launch-Video.mp4', label: 'iGuide Site Plans feature video'},
    mediaSide: 'left',
    background: 'surface',
  },
  {
    type: 'split',
    heading: 'Give agents something worth paying more for',
    body: (
      <p>
        Branded Property Overviews turn your iGuide capture into a polished, client-ready deliverable agents can share with confidence, helping you
        stand out and increase your value per shoot.
      </p>
    ),
    media: {type: 'image', image: {src: '/assets/Australia/AUS-Branded-Property-Overview.png', alt: 'Photo - Branded Property Overview'}},
  },
  {
    type: 'packages',
    heading: 'Find the right iGuide package for your services',
    subheading: 'Compare iGuide options to match different property types and agent needs.',
    columns: 2,
    items: [standardPackage, premiumPackage],
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What is iGuide?',
        a: 'iGuide is a capture and delivery system designed for real estate photographers. Using the iGuide PLANIX camera, you capture a property in a single visit and deliver interactive 3D virtual tours, accurate floor plans, verified measurements and Site Plans, all ready to share with your agent clients and publish directly to realestate.com.au.',
      },
      {
        q: 'Who is REA?',
        a: 'REA Group is a global digital real estate company and the owner of realestate.com.au, Australia’s leading property marketplace where agents list and buyers search for homes.',
      },
      {
        q: 'What is the native REA × iGuide experience?',
        a: (
          <>
            <p>The native REA × iGuide experience means iGuide is fully integrated within realestate.com.au listings, not just linked externally. With iGuide, buyers can:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>View enhanced media directly in the listing</li>
              <li>Jump to rooms from the interface</li>
              <li>Use a mobile-optimized viewer</li>
            </ul>
            <p className="mt-3">This delivers a more seamless, immersive experience, and helps agents present a more complete, modern listing.</p>
          </>
        ),
      },
      {
        q: 'What does iGuide cost?',
        a: 'iGuide uses simple pay-per-project pricing with no subscriptions or lock-in contracts. This makes it straightforward to calculate your return, price your services with confidence and scale your business without unexpected costs.',
      },
      {
        q: 'Does iGuide integrate with realestate.com.au?',
        a: 'Yes. iGuide virtual tours and floor plans are built to integrate seamlessly with realestate.com.au’s NextGen listing experience, so every asset you deliver is ready to go live on Australia’s #1 property platform.',
      },
      {
        q: 'How quickly are deliverables ready?',
        a: 'Your floor plans, virtual tours and Site Plans are delivered within 24 hours of uploading your data to the iGuide Portal (and generally much faster!), so you can turn around jobs faster and take on more shoots each week.',
      },
      {
        q: 'How fast is the iGuide PLANIX camera?',
        a: 'The PLANIX camera has one of the fastest capture rates available, with a 10–16 second scan time per position, a property of around 280m² can typically be completed in as little as 20 minutes on site.',
      },
      {
        q: 'How does iGuide help me grow my photography business?',
        a: 'iGuide lets you deliver more value without adding time or complexity. Capture once, reduce time on site, speed up turnaround and offer the bundled, immersive assets that agents are increasingly demanding, so you can stand out, price confidently and build stronger long-term relationships with your real estate clients.',
      },
    ],
  },
  {
    type: 'cta',
    heading: 'Agents expect immersive listings. Deliver them.',
    text: 'See how iGuide helps you stand out, increase your value per shoot, and scale your services, backed by realestate.com.au’s NextGen listing experience.',
    ctas: [book('Book a 15-minute walkthrough')],
  },
]

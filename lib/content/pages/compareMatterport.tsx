/** /compare/iguide-vs-matterport — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {VsColumns} from '@/components/pages/VsColumns'
import {closingCta, compareHeroFormId, compareLogos, comparePlanixImage, logosHeading, lookInsideV2, ProList} from './compareShared'

export const meta = {
  title: 'iGuide vs Matterport: Comparing camera systems for photographers & contractors | iGuide',
  description:
    'Photographers and contractors choose iGuide over Matterport because of speed, cost, accuracy, and no subscriptions. See the full comparison.',
  path: '/compare/iguide-vs-matterport',
}

export const hero = {
  heading: 'iGuide vs Matterport: less flash, more function',
  subheading: 'Matterport locks you in. iGuide sets you free with faster capture, lower costs and true data ownership.',
  rating: true,
  formHeading: 'See how iGuide compares to Matterport',
  formId: compareHeroFormId,
}

export const blocks: Block[] = [
  {type: 'logos', heading: logosHeading, logos: compareLogos(lookInsideV2)},
  {
    type: 'cards',
    id: 'key-reasons',
    align: 'center',
    heading: 'Why professionals continue to choose iGuide over Matterport',
    subheading:
      'Matterport looks good, but looks only go so far. iGuide delivers what professionals actually need: precision, speed and complete control over your data. No subscriptions. No headaches. Just real results.',
    columns: 3,
    cards: [
      {
        title: 'Own your data, forever',
        text: 'With Matterport, you don’t own your data and have to keep paying to host it. iGuide gives you full ownership with offline access, forever.',
      },
      {
        title: 'Faster capture on-site',
        text: 'With Matterport, scanning a property can take hours. iGuide captures 3,000 sq ft in just 15–30 minutes and delivers finished assets in under 24 hours.',
      },
      {
        title: 'Accurate, measurement-compliant floor plans',
        text: 'Matterport floor plans aren’t measurement-compliant. iGuide delivers ANSI and RMS-compliant layouts with precise square footage.',
      },
      {
        title: 'Under 24 hours turnaround time',
        text: 'Matterport processing can take 2–3 days. iGuide delivers floor plans, 3D tours, and measurements in less than 24 hours.',
      },
      {
        title: 'Easy-to-navigate 3D virtual tours',
        text: 'Matterport’s dollhouse looks flashy but is hard to use. iGuide combines floor plans with 360° photos for simple, intuitive navigation.',
      },
      {
        title: 'Pay-per-use pricing, no subscriptions',
        text: 'Matterport locks you into monthly subscriptions and hosting fees. iGuide lets you pay per project with no ongoing costs.',
      },
    ],
  },
  {
    type: 'quote',
    background: 'surface',
    quote: {
      quote:
        'With Matterport, we went over our monthly limit by 4,000 scans. The hosting fees and penalties were ridiculous. And no one even flagged it.',
      name: 'Glen MacIsaac',
      role: 'Photography Manager',
      company: 'Royal LePage Atlantic',
      photo: {src: '/assets/Glen_M_Transparent-Headshot.png', alt: 'photo - Glen Maclsaac'},
    },
  },
  {
    type: 'split',
    id: 'trusted-by-professionals',
    heading: 'Trusted by professionals',
    body: (
      <ProList
        items={[
          {
            title: 'Photographers who need speed and reliability',
            text: 'Capture spaces up to 3x faster and deliver floor plans and 3D tours clients can trust every time.',
          },
          {
            title: 'Contractors and designers who need a faster start',
            text: 'Kick off projects with accurate floor plans and visuals that save time and reduce costly mistakes.',
          },
          {
            title: 'Agents who need marketing tools that sell homes',
            text: 'Stand out with detailed floor plans, immersive 3D tours and assets that close deals faster.',
          },
        ]}
      />
    ),
    media: {type: 'image', image: {src: '/assets/R1-Camera.png', alt: 'r1 planix camera'}},
    mediaSide: 'left',
  },
  {
    type: 'custom',
    id: 'compare',
    background: 'surface',
    align: 'center',
    heading: 'iGuide wins where it matters most',
    subheading: 'Don’t get locked into a closed ecosystem. Choose the platform that puts you in control.',
    children: (
      <VsColumns
        ours={{
          name: 'iGuide',
          image: comparePlanixImage,
          items: [
            {text: 'Schematic floor plans included as PDF / SVG files', ok: true},
            {text: 'Measurement standard compliant floor plans', ok: true},
            {text: '3D tours with integrated floor plan + 360° photos', ok: true},
            {text: 'Content delivery platform with video + photos', ok: true},
            {text: 'Under 24 hours turnaround time', ok: true},
            {text: 'Pay-per-use pricing, no subscriptions', ok: true},
            {text: 'Data control with offline access', ok: true},
            {text: 'No hosting fees', ok: true},
          ],
        }}
        theirs={{
          name: 'Matterport',
          image: {src: '/assets/iguide-vs-matterport-pro2.png', alt: 'icon - Pro 2 Silhouette'},
          items: [
            {text: 'Schematic floor plans are an add-on', ok: false},
            {text: 'Measurement standards not guaranteed', ok: false},
            {text: '3D tours with dollhouse navigation + 360° photos', ok: false},
            {text: 'Multimedia content available via tag only', ok: false},
            {text: '24-72 hours turnaround time', ok: false},
            {text: 'Monthly subscriptions required', ok: false},
            {text: 'No data ownership, hosting required', ok: false},
            {text: 'Monthly hosting fees required', ok: false},
          ],
        }}
      />
    ),
  },
  {
    type: 'quote',
    quote: {
      quote:
        'Everything lived in the cloud with Matterport. There were chain-of-custody concerns, subscription fees and we couldn’t store the raw data ourselves. Our clients, especially public agencies, care about data control. I couldn’t download or store the raw data. That was a dealbreaker.',
      name: 'Robert Toth',
      role: 'Owner & Certified Fire Investigator',
      company: 'IRIS Fire',
      photo: {src: '/assets/iguide-vs-matterport-bob.png', alt: 'photo - Robert Toth'},
    },
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'Do I own my data with Matterport?',
        a: 'Matterport requires you to host your content on their cloud and locks you into ongoing subscription fees. With iGuide, you own your data outright, with full download and self-hosting options, giving you long-term control and flexibility.',
      },
      {
        q: 'How does iGuide pricing compare to Matterport?',
        a: 'Matterport forces you into monthly subscriptions and hosting fees just to keep your tours live. iGuide uses a simple pay-per-project model: no subscriptions, no hosting fees and no hidden costs.',
      },
      {
        q: 'What deliverables do I get with iGuide that Matterport doesn’t include?',
        a: 'With iGuide you always get ANSI Z765/RECA RMS-compliant floor plans, immersive 3D tours, property details and downloadable files (PDF, SVG, DXF, DWG, RVT, ESX). Matterport charges extra for floor plans and does not provide measurement-standard-compliant deliverables.',
      },
      {
        q: 'How accurate are iGuide measurements compared to Matterport?',
        a: 'iGuide delivers typical measurement uncertainty of 0.5% or better, meeting recognized industry standards (ANSI Z765-2021, RECA RMS 2017). Matterport does not produce measurement-compliant floor plans, meaning its outputs are not suitable for regulated use or professional documentation.',
      },
    ],
  },
  closingCta({
    heading: 'Experience faster capture, lower costs and data you truly own.',
    secondary: {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/'},
  }),
]

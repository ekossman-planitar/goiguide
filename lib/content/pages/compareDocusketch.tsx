/** /compare/iguide-vs-docusketch — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {VsColumns} from '@/components/pages/VsColumns'
import {ircLogos} from '@/lib/content/industries/shared'
import {closingCta, compareHeroFormId, comparePlanixImage, logosHeading, ProList} from './compareShared'

export const meta = {
  title: 'iGuide vs DocuSketch: Comparing camera systems for fire investigators, insurance adjusters, & contractors | iGuide',
  description:
    'Compare iGuide vs. DocuSketch to see why pros choose iGuide -faster scans, accurate measurements, full data ownership, and offline access.',
  path: '/compare/iguide-vs-docusketch',
}

export const hero = {
  heading: 'iGuide vs DocuSketch: laser accuracy, no b.s.',
  subheading: 'You can’t build accuracy on bad data. iGuide\'s LiDAR measurements provide defensible property data that stands up to scrutiny.',
  rating: true,
  formHeading: 'See how iGuide compares to DocuSketch',
  formId: compareHeroFormId,
}

export const blocks: Block[] = [
  // Same eight logos (and alts) as the IRC band on the industry pages
  {type: 'logos', band: 'irc', heading: logosHeading, logos: ircLogos},
  {
    type: 'cards',
    id: 'key-reasons',
    align: 'center',
    heading: 'Why professionals continue to choose iGuide over DocuSketch',
    subheading: 'From the field to the courtroom, iGuide gives adjusters and investigators the speed, precision and reliability they need.',
    columns: 3,
    cards: [
      {
        title: 'Better accuracy',
        text: 'Measurement uncertainty is 2% or better on iGuide’s provided area totals. DocuSketch makes no quantifiable claim regarding their sketch accuracy.',
      },
      {
        title: 'Faster & more comprehensive data capture',
        text: 'While both iGuide and Docusketch have a “place and click” workflow, only iGuide can comprehensively capture 360° images and LiDAR data simultaneously.',
      },
      {
        title: 'Flexible Sketch detail levels',
        text: 'iGuide offers three sketch detail levels so you can choose the right sketch for your needs. DocuSketch is one size fits all.',
      },
      {
        title: 'Fast delivery',
        text: 'iGuide allows you to get a simple sketch in minutes or a more detailed sketch in less than 24 hours. DocuSketch will deliver a sketch in 2 business days or overnight for an additional fee.',
      },
      {
        title: 'Offline data control',
        text: 'DocuSketch ties their 3D tour to their platform. iGuide allows for offline download of all assets, including 3D virtual walkthrough, keeping data under your control for legal reasons and long-term storage.',
      },
      {
        title: 'No subscription traps',
        text: 'iGuide keeps it simple. Pay per project, no subscriptions. DocuSketch runs on a credit-based system with subscription plans.',
      },
    ],
  },
  {
    type: 'quote',
    background: 'surface',
    quote: {
      quote:
        'Accurately documenting fire scenes can be a challenge, but iGuide has changed that for us. After extensive research and speaking with industry peers, we chose the PLANIX R1, and we couldn’t be happier. The setup is simple, the deliverables are fast and the value is unmatched.',
      name: 'Todd Estes',
      role: 'Division Chief - Planning, Investigations',
      company: 'Noblesville Fire Department',
      photo: {src: '/assets/Todd-Estes.png', alt: 'photo - Todd Estes'},
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
            title: 'Adjusters and restoration teams',
            text: 'Get consistent, standards-ready documentation that integrates with Xactimate and speeds up claims decisions.',
          },
          {
            title: 'Fire investigators',
            text: 'Save critical time on-site with rapid scans and courtroom-ready outputs including floor plans, walkthroughs and ESX files.',
          },
          {
            title: 'Forensic consultants',
            text: 'Protect chain-of-custody with offline data control and downloadable deliverables. No third-party access required.',
          },
          {
            title: 'Legal teams',
            text: 'Rely on accurate documentation and visual records that stay archived and retrievable whenever litigation arises.',
          },
        ]}
      />
    ),
    media: {type: 'image', image: {src: '/assets/iguide-vs-docusketch-r1.png', alt: 'r1 planix camera'}},
    mediaSide: 'left',
  },
  {
    type: 'custom',
    id: 'compare',
    background: 'surface',
    align: 'center',
    heading: 'iGuide wins where it matters most',
    subheading: 'Don’t settle. Choose the platform built for compliance, precision and ownership.',
    children: (
      <VsColumns
        ours={{
          name: 'iGuide',
          image: comparePlanixImage,
          items: [
            {text: 'LiDAR measurements', ok: true},
            {text: 'Accuracy: 2% uncertainty for area total', ok: true},
            {text: '3 Sketch detail levels', ok: true},
            {text: 'Typical turnaround in less the 24 hours or less', ok: true},
            {text: 'Pay-per-project pricing, no commitments', ok: true},
            {text: 'Full offline access for viewing & storage', ok: true},
          ],
        }}
        theirs={{
          name: 'DocuSketch',
          image: {src: '/assets/iguide-vs-docusketch-ds1.png', alt: 'icon - 360 Degree Camera Silhouette'},
          items: [
            {text: 'Software based measurements from 360° images', ok: false},
            {text: 'No stated accuracy', ok: false},
            {text: '1 Sketch detail level', ok: false},
            {text: 'Typical turnaround in 2 business day', ok: false},
            {text: 'Credit-based subscriptions, monthly commitments', ok: false},
            {text: 'Platform-hosted 3D tour', ok: false},
          ],
        }}
      />
    ),
  },
  {
    type: 'quote',
    quote: {
      quote:
        'I can confidently say that the iGuide technology has given Deft a huge competitive advantage. Even a very good adjuster who knows how to use a laser can’t match the accuracy we’ll get from iGuide. Simply seeing how much value it’s brought to Deft, we fell in love with it!',
      name: 'Jeremiah Kiefer',
      role: 'Founder & CEO',
      company: 'The Deft Group',
      photo: {src: '/assets/iguide-vs-docusketch-jeremiah.jpg', alt: 'photo - Jeremiah Kiefer'},
    },
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What’s the difference between iGuide and DocuSketch?',
        a: 'iGuide delivers accurate floor plans / sketches, immersive 3D tours and full data ownership, all with faster turnaround and professional-grade hardware. DocuSketch provides basic floor plans and 360° photos but requires cloud-only access, includes less accurate measurements and operates on a subscription-based pricing model.',
      },
      {
        q: 'Does iGuide support ESX file output for Xactimate?',
        a: 'Yes. iGuide includes optional ESX file exports, making it easy to integrate with estimating software like Verisk Xactimate, ideal for insurance adjusters, restoration contractors and forensic documentation. This helps streamline workflows and ensures deliverables are court-ready when needed.',
      },
      {
        q: 'Can I store and access iGuide data offline?',
        a: 'Yes. iGuide allows users to download and archive all project files locally. This is a key advantage over DocuSketch, which requires cloud-based access and does not provide raw data storage, raising concerns for chain of custody in legal or insurance workflows.',
      },
    ],
  },
  closingCta({
    heading: 'Ready to upgrade to a professional solution?',
    text: 'Professional tools mean professional results and that’s what sets you apart.',
    secondary: {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/'},
  }),
]

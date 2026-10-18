/** /stop-waiting-start-building-webinar — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {HeroFormColumns} from '@/components/pages/HeroFormColumns'
import {Button} from '@/components/ui/Button'

export const meta = {
  title: 'Watch on-demand: Stop waiting, start building: how top firms are speeding up projects today | iGuide',
  description:
    'Watch an on-demand roundtable featuring a builder, architect, and co-founder as they share how modern tools like 3D scans, digital floor plans, and data-rich visuals are transforming workflows, boosting collaboration, and cutting costly rework.',
  path: '/stop-waiting-start-building-webinar',
  ogImage: '/assets/AEC_June-24_Webinar_Facebook.png',
}

const learn: [string, string][] = [
  ['Spot the real bottlenecks:', 'Where projects stall, and proven ways to speed things up.'],
  ['Ditch the clipboard:', 'How 3D tools are replacing tape measures and manual site sketches.'],
  ['Consultation and pre-design decoded:', 'Why solid processes and clear retainers lead to smoother starts and fewer surprises.'],
  ['Build trust with floor plans:', 'How rapid, accurate floor plans improve coordination and build trust across teams.'],
  ['Drive decisions with visuals:', 'Why immersive visuals help clients, contractors and stakeholders make faster, smarter decisions'],
  ['Tools your competitors already use:', 'Stay ahead with tech that boosts accuracy and wins projects.'],
]

const speaker = (role: string, bio: string) => (
  <>
    <span className="block font-semibold text-muted">{role}</span>
    <span className="mt-3 block">{bio}</span>
  </>
)

export const blocks: Block[] = [
  {
    type: 'custom',
    background: 'surface',
    children: (
      <HeroFormColumns
        heading="Watch on-demand:"
        subheading={
          <>
            <span className="text-ink">Stop waiting, start building:</span>
            <br />
            <span className="text-primary">how top firms are speeding up projects today</span>
          </>
        }
        formHeading="Don’t miss out: access the webinar instantly"
        formId="11ae3133-8b26-49a6-8132-6fc7d12f0811"
        formAnchorId="webinar-form"
      />
    ),
  },
  {
    type: 'custom',
    children: (
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-balance text-[32px] font-semibold leading-[normal] text-ink md:text-5xl md:leading-[normal]">
            Made for architects, engineers and builders who need reliable data and visual clarity
          </h2>
          {/* Live: the link points at https://youtu.be/AbQ4W_Ikn1s, but a page script cancels it and scrolls back up to the form */}
          <Button href="#webinar-form" size="lg" variant="secondary" className="mt-8">
            Watch now
          </Button>
        </div>
        <div className="rounded-2xl bg-sky p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-ink">What you&apos;ll learn...</h3>
          <ul className="mt-6 space-y-4">
            {learn.map(([lead, text]) => (
              <li key={lead} className="flex gap-3 text-base leading-6 text-body">
                <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12.5 10 17 19 7" />
                </svg>
                <span>
                  <strong className="font-semibold text-ink">{lead}</strong> {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    type: 'cards',
    heading: 'Meet the speakers',
    subheading: 'Real experts. Real experience.',
    align: 'center',
    background: 'surface',
    columns: 3,
    cards: [
      {
        title: 'Scott Hanson',
        image: {src: '/assets/Uploads/AEC-Webinar_July-3-2025_Headshots_Scott-Hanson_V2.png', alt: ''},
        text: speaker('Founder, Hanson Homes (Vancouver, BC)', 'Custom builder known for clean design, cinematic detail, and ditching dated workflows.'),
      },
      {
        title: 'John Mckenna, AIA',
        image: {src: '/assets/Uploads/AEC-Webinar_July-3-2025_Headshots_John-Mckenna_V2.png', alt: ''},
        text: speaker(
          'Founder, MC3 Design (Virginia)',
          'Architect big on clean design, smart planning, and keeping projects moving. Knows the art of the possible, and how to get it approved.',
        ),
      },
      {
        title: 'Kevin Klages',
        image: {src: '/assets/Uploads/AEC-Webinar_July-3-2025_Headshots_Kevin-Klages_V2-v2.png', alt: ''},
        text: speaker(
          'Co-Founder, iGuide',
          'Co-founder of iGuide® and champion of as-built clarity, Kevin believes your data should work harder than your tape measure.',
        ),
      },
    ],
  },
]

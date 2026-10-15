/** /advanced-capture-program — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {ReactNode} from 'react'
import type {Block} from '@/components/blocks/Blocks'
import {CheckList} from '@/components/blocks/CheckList'
import {MediaView} from '@/components/blocks/MediaView'
import {Button} from '@/components/ui/Button'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {SmartLink} from '@/components/ui/SmartLink'

export const meta = {
  title: 'Become an Advanced Capture Pro | iGUIDE',
  description:
    "Commercial work pays more per capture, repeats more often and doesn't swing with the housing market. This program shows you how to win it, and iGUIDE backs you with the tools, the directory and the support to grow.",
  path: '/advanced-capture-program',
}

const training = 'https://planitarexternal.myabsorb.ca/?KeyName=ACPv2Open'

const Eyebrow = ({children}: {children: ReactNode}) => (
  <span className="inline-flex rounded-full bg-[#ffd6a0] px-3 py-2 text-xs font-semibold text-black">{children}</span>
)

const card = 'flex flex-col rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)] md:p-8'

const pros = [
  {
    photo: {src: '/assets/Uploads/Dan-Richard.jpg', alt: 'Dan Richard'},
    name: 'Dan Richard',
    business: 'Measure My Space · Moncton, NB',
    text: 'Adopted iGUIDE in 2020 for pandemic-era virtual tours. Repositioned the business around documentation, floor plans and building plans, then expanded into commercial work.',
    stat: '70/30 commercial to residential · ~3.8M sq ft in 2025',
    quote: "Don't position yourself as a photographer. Position yourself as the expert.",
    link: {label: "Read Dan's story →", href: '/customer-stories/how-measure-my-space-expanded-into-commercial-property-work'},
  },
  {
    photo: {src: '/assets/Uploads/london_Ron.png', alt: 'Ron Elias'},
    name: 'Ron Elias',
    business: 'London House Photography · Ontario',
    text: 'Grew beyond residential listings into commercial and AEC through referrals. Accurate, repeatable measurements across repeat visits became the reason clients kept coming back.',
    stat: 'CAD-ready outputs · same sq ft five years apart',
    quote: "We love the fact that it's totally independent of the real estate market.",
    link: {label: "Read Ron's story →", href: '/customer-stories/london-house-photography-expanded-beyond-residential-listings'},
  },
]

const downloads = [
  {
    title: "What's in it for you",
    text: 'The program at a glance: benefits, revenue opportunities and the project types certification opens up.',
    cta: {label: 'Download the one-pager', href: '/assets/downloads/b05797abcb/ION_Directory_1Pager_Getting_Started.pdf'},
  },
  {
    title: 'The deliverables menu',
    text: 'Every deliverable you can offer post-certification, from CAD files and floor plans to roof plans and elevations, with real examples.',
    cta: {label: 'Download the menu', href: '/assets/brochures/Advanced-Drawing-Package-Deliverables.pdf'},
  },
  {
    title: 'The AEC business toolkit',
    text: 'How two iGUIDE Pros moved into commercial work, plus a step-by-step plan: who to approach, what to charge and a 30-day checklist.',
    cta: {label: 'Download the toolkit', href: '/assets/downloads/iGUIDE-ION-AEC-Growth-Guide.pdf'},
  },
]

const faqs: {q: string; a: string}[] = [
  {
    q: 'Who is this training for?',
    a: 'iGUIDE operators who want to add commercial and AEC work to their business. If you already capture residential properties, the course builds directly on skills you have. New capture technicians are welcome too.',
  },
  {
    q: 'How long does the training take to complete?',
    a: 'About 4 hours across 6 modules. It is self-paced, so you can finish in one sitting or spread it out over a week. Your progress saves as you go.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes. Complete all modules and you earn your Advanced Capture certification. Certified operators also receive the Advanced Capture Badge on their ION profile, so clients searching the network can see you are qualified for advanced work.',
  },
  {
    q: 'What software do I need?',
    a: 'An iGUIDE camera and access to your iGUIDE account; the CAD modules show the workflow but do not require you to own CAD software to complete the course.',
  },
  {
    q: 'Can I access the downloads without signing up?',
    a: 'Yes. All three resources are free to everyone, no account needed. Sign up when you are ready to start the modules and work toward certification.',
  },
  {
    q: "What can I do once I'm certified?",
    a: 'Take on commercial and AEC clients: CAD-deliverables, floor plans, site surveys and immersive virtual walkthroughs for contractors, architects, property managers and more. The clients pay more and come back for the next project.',
  },
]

export const blocks: Block[] = [
  {
    type: 'custom',
    id: 'hero1',
    background: 'surface',
    children: (
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <Eyebrow>For iGUIDE Pros</Eyebrow>
          <h1 className="mt-6 text-balance text-[40px] font-semibold leading-[1.15] text-ink md:text-[56px]">Become an Advanced Capture Pro</h1>
          <p className="mt-6 text-xl leading-[30px] text-muted">
            Commercial work pays more per capture, repeats more often and doesn&apos;t swing with the housing market. This program shows you how to
            win it, and iGUIDE backs you with the tools, the directory and the support to grow.
          </p>
          {/* Live hero stats (note: the FAQ below says "About 4 hours across 6 modules") */}
          <dl className="mt-8 flex flex-wrap items-center gap-6">
            {[
              ['11', 'modules'],
              ['2 hrs', 'total time'],
              ['✓', 'certificate'],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col">
                <dt className="order-2 text-sm text-muted">{label}</dt>
                <dd className="order-1 text-2xl font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <Button href={training} size="lg" newTab className="mt-8">
            Start the training
          </Button>
        </div>
        <FallbackImage
          src="/assets/Advanced_Course2.jpg"
          alt="Advanced Capture Pro course"
          width={1200}
          height={900}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-2xl shadow-lg"
        />
      </div>
    ),
  },
  {
    type: 'custom',
    id: 'pros-shift',
    children: (
      <>
        <SectionHeading
          eyebrow={<Eyebrow>Real results</Eyebrow>}
          heading="Pros who made the shift"
          subheading="Two iGUIDE Pros who moved from residential listings into commercial and AEC work. You can do the same."
          className="mb-10 max-w-3xl"
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {pros.map((pro) => (
            <li key={pro.name} className={card}>
              <div className="flex items-center gap-4">
                <FallbackImage src={pro.photo.src} alt={pro.photo.alt} width={128} height={128} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-xl font-semibold text-ink">{pro.name}</h3>
                  <p className="text-sm text-muted">{pro.business}</p>
                </div>
              </div>
              <p className="mt-5 text-base leading-6 text-body">{pro.text}</p>
              <div className="mt-5 w-fit rounded-lg bg-sky px-3 py-2 text-sm font-semibold text-primary">{pro.stat}</div>
              <hr className="my-6 border-[#e7edf6]" />
              <p className="flex-1 text-lg leading-7 font-medium text-ink italic">{pro.quote}</p>
              <SmartLink href={pro.link.href} className="mt-6 font-semibold text-primary">
                {pro.link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <figure className="mx-auto mt-12 max-w-3xl text-center">
          <blockquote className="text-2xl leading-[1.35] font-semibold text-ink md:text-[28px]">
            &quot;Once iGUIDE started doing CAD files I saw the potential with that. I expanded into commercial.&quot;
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold tracking-wide text-muted">DAN RICHARD, FOUNDER · MEASURE MY SPACE</figcaption>
        </figure>
      </>
    ),
  },
  {
    type: 'custom',
    id: 'section',
    background: 'surface',
    heading: 'What certification lets you take on',
    children: (
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h3 className="text-2xl font-semibold text-ink">Build the skills to take on commercial and AEC work</h3>
          <p className="mt-4 text-base leading-6 text-body">
            Learn how to choose the right deliverables and run a CAD workflow that holds up to AEC standards — so you can take on your next
            commercial project with confidence.
          </p>
          <p className="mt-6 font-semibold text-ink">In this training you&apos;ll cover:</p>
          <CheckList
            className="mt-3"
            items={[
              'Capture requirements for commercial spaces and how they differ from residential',
              'Choosing the right deliverables, from CAD files and floor plans to roof plans, elevations and ceiling plans',
              'The CAD workflow, scan to finished drawing',
              'Field mistakes that trigger a return visit',
              'Client handoff: what AEC clients expect',
            ]}
          />
          <p className="mt-6 font-semibold text-ink">Who this is for:</p>
          <CheckList
            className="mt-3"
            items={[
              'Residential operators expanding into commercial and AEC work',
              'New capture technicians building advanced skills',
              'Teams onboarding their first commercial clients',
            ]}
          />
          <Button
            href="https://planitar.sharepoint.com/:u:/s/iGUIDE-Resources-and-Assets/IQACZgIxsrJoT4e2YjfPZd-cAbpG2iksX_yaT9Ra9e3__ro?e=fgij9z"
            size="lg"
            variant="secondary"
            newTab
            className="mt-8 w-fit"
          >
            Download CAD sample files
          </Button>
        </div>
        <div className={card}>
          <h3 className="text-2xl font-semibold text-ink">Interactive CAD Example</h3>
          <MediaView
            media={{
              type: 'embed',
              src: 'https://gmail5402658.autodesk360.com/shares/public/SH286ddQT78850c0d8a4cce1bb25622332a1?mode=embed',
              title: 'Interactive CAD Example',
              aspect: 'aspect-[4/3]',
            }}
            className="mt-6 flex-1"
          />
        </div>
      </div>
    ),
  },
  {
    type: 'custom',
    id: 'beyond-cert',
    children: (
      <>
        <SectionHeading
          eyebrow={<Eyebrow>Beyond the certificate</Eyebrow>}
          heading="The training is the start, not the finish"
          subheading="Certification gets you the skills. Staying an Advanced Capture Pro gets you the rest: the tools to sell, a profile clients can find and support that keeps going after you finish."
          className="mb-10 max-w-3xl"
        />
        <ul className="grid gap-6 md:grid-cols-2">
          <li className={card}>
            <h3 className="text-xl font-semibold text-ink">A toolkit that sells for you</h3>
            <p className="mt-3 text-base leading-6 text-body">
              Outreach templates, a deliverables menu and a 30-day plan for landing commercial clients. Free, no sign-up needed.
            </p>
          </li>
          <li className={card}>
            <h3 className="text-xl font-semibold text-ink">A profile clients can find</h3>
            <p className="mt-3 text-base leading-6 text-body">
              Set up your{' '}
              <a href="https://ion.goiguide.com/signup/" target="_blank" rel="noopener noreferrer">
                ION directory profile
              </a>{' '}
              so commercial clients searching in your area find you first.
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    type: 'custom',
    id: 'download',
    background: 'sky',
    heading: 'Start growing today, free',
    subheading: 'No sign-up required. Take these whether you enroll today or not.',
    children: (
      <ol className="grid gap-6 md:grid-cols-3">
        {downloads.map((d, i) => (
          <li key={d.title} className={card}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">{i + 1}</span>
            <h3 className="mt-5 text-xl font-semibold text-ink">{d.title}</h3>
            <p className="mt-3 flex-1 text-base leading-6 text-body">{d.text}</p>
            <Button href={d.cta.href} size="lg" newTab className="mt-6 w-fit">
              {d.cta.label}
            </Button>
          </li>
        ))}
      </ol>
    ),
  },
  // Live shows all six questions open to expand (no "show more")
  {
    type: 'custom',
    id: 'faq',
    heading: 'Frequently asked questions',
    align: 'center',
    children: (
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-xl border border-[#e7edf6] bg-white p-4 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="text-2xl leading-none text-primary transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-base leading-6 text-body">{f.a}</p>
          </details>
        ))}
      </div>
    ),
  },
]

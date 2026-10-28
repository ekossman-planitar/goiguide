import {Box, Building2, Database, FileCode, Handshake, HardHat, Home, Layout, Lightbulb, MapPin, Ruler, ShieldCheck, Store, Target, Warehouse} from 'lucide-react'
import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import {CountUp} from '@/components/about/CountUp'
import {QuoteCarousel} from '@/components/about/QuoteCarousel'
import {ScrollLine} from '@/components/about/RedLine'
import {Timeline} from '@/components/about/Timeline'
import {Section} from '@/components/blocks/Section'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {Pill} from '@/components/ui/Pill'
import {cn} from '@/lib/cn'
import {meta, milestones, quoteSlots, quotes, stats} from '@/lib/content/preview/about'
import {headerButtons} from '@/lib/navigation'
import {pageMetadata} from '@/lib/pageMetadata'

/** Draft redesign of /about for review (Evan, 2026-10-27). Not indexed, not in the sitemap; /about is unchanged. */
export const metadata: Metadata = {...pageMetadata(meta), robots: {index: false, follow: false}}

const deliverables = [
  {icon: Box, title: '3D tours', text: 'Walk through a space from anywhere, as it really is.'},
  {icon: Layout, title: 'Floor plans', text: 'Clear, precise and ready to share.'},
  {icon: Ruler, title: 'Measurements', text: 'Room dimensions and square footage you can act on.'},
  {icon: FileCode, title: 'CAD-ready files', text: 'A head start for anyone who needs to plan, design or build.'},
  {icon: Database, title: 'Property data', text: 'A record that keeps working long after the capture’s done.'},
]

const properties = [
  {icon: Home, label: 'Homes'},
  {icon: Building2, label: 'Offices'},
  {icon: Warehouse, label: 'Warehouses'},
  {icon: Store, label: 'Retail spaces'},
  {icon: HardHat, label: 'Job sites'},
]

const values = [
  {icon: ShieldCheck, title: 'Integrity', text: 'We do what we say and we tell it straight.'},
  {icon: Handshake, title: 'Teamwork', text: 'We win together and share what we know.'},
  {icon: Lightbulb, title: 'Innovation', text: 'We look for a better way to try it.'},
  {icon: Target, title: 'Accountability', text: 'We own our outcomes and follow through.'},
]

function IconSquare({icon: Icon}: Readonly<{icon: typeof Box}>) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
      <Icon width={24} height={24} aria-hidden />
    </span>
  )
}

function Overline({children}: Readonly<{children: ReactNode}>) {
  return <p className="type-overline mb-4 text-muted">{children}</p>
}

export default function AboutPreviewPage() {
  return (
    <>
      <ScrollLine />

      {/* Hero */}
      <section className="overflow-hidden bg-white py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Pill label="About iGuide" />
            <h1 className="type-display mt-6 text-ink">Real still matters.</h1>
            <p className="type-lead mt-5 max-w-xl text-muted">
              iGuide makes property intelligence accessible to everyone. One capture gives you an immersive 3D tour, precise floor plans and measurements you
              can act on, so everyone’s working from the same page. Or at least the same floor plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#milestones" size="lg">
                See how we got here
              </Button>
              <Button href="/about-preview/leadership" size="lg" variant="secondary">
                Meet our leaders
              </Button>
            </div>
          </div>
          <FallbackImage
            src="/assets/about-team-image.png"
            alt="The iGuide team at a town hall meeting"
            width={4096}
            height={2009}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-2xl"
            fallback={<div className="aspect-[2/1] w-full rounded-2xl bg-surface" />}
          />
        </Container>
      </section>

      {/* Our story + numbers */}
      <Section id="story" background="surface">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="type-h2 text-ink">Our story</h2>
            <div className="type-body mt-6 space-y-4 text-body">
              <p>
                It started with a simple frustration: floor plans you couldn’t trust. Our founders figured there had to be a better way, so they paired
                rock-solid measurements with immersive 3D tours and changed how properties get shared and understood.
              </p>
              <p>
                We started small, with a handful of real estate projects and a lot of conviction. Helping show homes as they really are is where we cut our
                teeth, and real estate is still home.
              </p>
              <p>
                But word travels. The more properties we captured, the more people came knocking: insurers needing an accurate picture of a claim,
                architects and builders planning projects from real conditions, facility teams keeping track of what they manage. Today iGuide supports the
                full property life cycle, from the first sale to the next renovation and every chapter in between, with over 1 billion ft² mapped and
                counting.
              </p>
              <p>
                <strong className="font-semibold text-ink">New look, same iGuide.</strong> We’ve refreshed our brand to match where we’re headed, but the
                thing that got us here hasn’t changed: doing it right, every time.
              </p>
            </div>
          </div>
          <div>
            <h3 className="type-overline mb-4 text-muted">By the numbers</h3>
            <dl className="grid grid-cols-2 gap-4">
              {stats.map((s, i) =>
                s.pending ? (
                  <div key={i} className="flex min-h-[160px] flex-col justify-center rounded-2xl border-2 border-dashed border-line bg-white p-6">
                    <dt className="type-overline text-muted">{s.label}</dt>
                    <dd className="type-small mt-1 text-muted">Number to confirm</dd>
                  </div>
                ) : (
                  <div key={i} className="flex min-h-[160px] flex-col justify-center rounded-2xl border border-line bg-white p-6 shadow-card">
                    <dd className="order-1 mt-2 text-xl font-semibold text-ink">{s.label}</dd>
                    <dt className="order-0">
                      <span className="block text-4xl leading-tight font-bold text-primary xl:text-5xl">
                        {s.counter ? <CountUp end={1} suffix="B+ ft²" finalText={s.value} /> : s.value}
                      </span>
                    </dt>
                    {s.note && <dd className="type-small order-2 mt-2 text-muted">{s.note}</dd>}
                  </div>
                ),
              )}
            </dl>
          </div>
        </div>
      </Section>

      {/* Milestones */}
      <Section id="milestones" heading="Big moments, so far." subheading="From a handful of real estate projects to the full property life cycle. Here’s how we got here, and we’re nowhere near done.">
        <Timeline milestones={milestones} />
      </Section>

      {/* Values */}
      <Section id="values" background="surface">
        <div className="mb-12 max-w-3xl">
          <h2 className="type-h2 text-ink">What we value</h2>
          <p className="type-lead mt-6 text-muted">What we stand for.</p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li
              key={v.title}
              className={cn(
                'group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-primary p-7 text-white shadow-card transition-transform duration-300 hover:-translate-y-2',
              )}
            >
              <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-12 text-[13rem] leading-none font-bold text-white/10 select-none">
                {v.title[0]}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-rea-red text-white transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                <v.icon width={28} height={28} aria-hidden />
              </span>
              <div className="relative">
                <h3 className="type-heading-lg">{v.title}</h3>
                <span aria-hidden className="mt-3 block h-1 w-12 rounded-full bg-rea-red transition-all duration-300 group-hover:w-24" />
                <p className="type-body mt-4 text-white/90">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* What we do */}
      <Section>
        <Overline>What we do</Overline>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 className="type-h2 text-ink">Every property measured, mapped, and online.</h2>
          <p className="type-lead text-muted">
            That’s the mission and here’s how we deliver it. We make every space knowable. One quick pass with our camera captures a property exactly as it
            stands, and from there we draft it into everything you need.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {deliverables.map((d) => (
            <li key={d.title} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
              <IconSquare icon={d.icon} />
              <h3 className="type-heading-sm mt-5 text-ink">{d.title}</h3>
              <p className="type-small mt-2 text-body">{d.text}</p>
            </li>
          ))}
        </ul>
        <p className="type-body mt-8 max-w-3xl text-body">
          And we keep it simple. Fast to capture, quick to turn around and no subscriptions to sign up for, because nobody should need a monthly plan to know
          how big a room is.
        </p>
      </Section>

      {/* The pros */}
      <Section background="surface">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <h2 className="type-h2 text-ink">The pros behind every iGuide</h2>
            <div className="type-body mt-6 space-y-4 text-body">
              <p>
                Behind it all is a growing network of iGuide pros: independent businesses who capture properties every day and do it properly. We give them
                the camera, the tools and the support to do their best work, and we help them find great jobs and build great businesses.
              </p>
              <p>So wherever there’s something to capture, there’s someone ready to capture it.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
            <IconSquare icon={MapPin} />
            <h3 className="type-heading-md mt-5 text-ink">Need something captured?</h3>
            <p className="type-body mt-2 text-body">Find an iGuide Pro near you.</p>
            <Button href={headerButtons.findPro.href} size="lg" className="mt-6">
              Find an iGuide Pro
            </Button>
          </div>
        </div>
      </Section>

      {/* Built for every property */}
      <Section heading="Built for every property">
        <ul className="flex flex-wrap gap-3">
          {properties.map((p) => (
            <li key={p.label} className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-semibold text-ink">
              <p.icon width={20} height={20} aria-hidden />
              {p.label}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="type-body space-y-4 text-body">
            <p>
              Homes, offices, warehouses, retail spaces and job sites all have one thing in common: the people working on them need to know what’s really
              there. Whether a property is being sold, designed, built, insured or managed, iGuide gives everyone the same accurate view of it, from the
              pros who capture it to the owners and consumers who rely on it.
            </p>
          </div>
          <p className="type-heading-lg text-ink">Fewer site visits, fewer surprises and a lot less back-and-forth. That’s what happens when everyone’s looking at the same floor plan.</p>
        </div>
      </Section>

      {/* What people say */}
      <Section heading="Don’t just take our word for it." subheading="The people who use iGuide every day tell it better than we do." background="surface">
        <QuoteCarousel label="Customer quotes" quotes={quotes} slots={quoteSlots} />
      </Section>
    </>
  )
}

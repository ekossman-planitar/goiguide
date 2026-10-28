import {Building2, GraduationCap, Handshake, HeartPulse, Laptop, Lightbulb, Palmtree, PartyPopper, ShieldCheck, Target} from 'lucide-react'
import type {Metadata} from 'next'
import {InstagramCarousel} from '@/components/about/InstagramCarousel'
import {RedlineEasterEgg} from '@/components/about/RedLine'
import {SkillPie} from '@/components/about/SkillPie'
import {Section} from '@/components/blocks/Section'
import {BambooHrJobs} from '@/components/pages/BambooHrJobs'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {Pill} from '@/components/ui/Pill'
import {instagram, meta, perks, steps, traits, values} from '@/lib/content/preview/careers'
import {pageMetadata} from '@/lib/pageMetadata'

/** Draft redesign of /careers for review (Evan, 2026-10-27). Not indexed, not in the sitemap; /careers is unchanged. */
export const metadata: Metadata = {...pageMetadata(meta), robots: {index: false, follow: false}}

const valueIcons = [ShieldCheck, Handshake, Lightbulb, Target]
const perkIcons = [HeartPulse, Palmtree, Laptop, GraduationCap, Building2, PartyPopper]

/** "See open roles" jumps straight to the job board */
function RolesButton() {
  return (
    <Button href="#roles" size="lg">
      See open roles
    </Button>
  )
}

export default function CareersPreviewPage() {
  return (
    <>
      <RedlineEasterEgg />

      {/* Hero */}
      <section className="bg-white py-16 lg:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Pill label="Careers at iGuide" />
            <h1 className="type-display mt-6 text-ink">Help us map the world. One property at a time.</h1>
            <p className="type-lead mt-5 max-w-xl text-muted">
              We’re iGuiders: makers, drafters, engineers, marketers and problem-solvers who care about getting it right. If that sounds like you, pull up a
              chair.
            </p>
            <div className="mt-8">
              <RolesButton />
            </div>
          </div>
          <FallbackImage
            src="/assets/about-group-shot-image.jpg"
            alt="The iGuide team at the Imaging USA 2025 show"
            width={1080}
            height={608}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full rounded-2xl"
            fallback={<div className="aspect-[16/9] w-full rounded-2xl bg-surface" />}
          />
        </Container>
      </section>

      {/* Why iGuide + values */}
      <Section background="surface">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div>
            <h2 className="type-h2 text-ink">Why iGuide</h2>
            <div className="type-body mt-6 space-y-4 text-body">
              <p>
                We started with a handful of real estate projects. Today, iGuide is trusted by real estate, insurance, architecture, design, construction and
                facilities teams around the world, from Waterloo, Canada to Sydney, Australia and well beyond. Every property, every industry, every corner of
                the map: if it’s a space, we’re capturing it.
              </p>
              <p>That means real problems to solve, real room to grow and work that shows up in the world every single day. And we’re just getting started.</p>
              <p>
                We’re big enough to have impact and small enough that you’ll actually see yours. Ideas don’t disappear into a queue here. If you spot a better
                way, you’ll probably be the one to build it.
              </p>
            </div>
            <div className="mt-8">
              <RolesButton />
            </div>
          </div>

          <div id="values" className="scroll-mt-24 lg:pt-1">
            <ul className="grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => {
                const Icon = valueIcons[i]
                return (
                  <li key={v.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon width={24} height={24} aria-hidden />
                    </span>
                    <h3 className="type-heading-sm mt-5 text-ink">{v.title}</h3>
                    <p className="type-body mt-2 text-body">{v.text}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* Who we're looking for: humble, hungry, smart */}
      <Section className="lg:py-24">
        <div className="mb-12">
          <div className="max-w-3xl">
            <h2 className="type-h2 text-ink">Who we’re looking for</h2>
            <p className="type-lead mt-5 text-muted">
              We hire for skill and will: the know-how to do the job well and the drive to keep raising the bar. The best iGuiders are humble, hungry and
              smart, in balance. If you’re quick to share credit, keen to learn and good at reading the room, you’ll fit right in.
            </p>
          </div>
        </div>
        <SkillPie traits={traits} />
      </Section>

      {/* What to expect */}
      <Section background="surface">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-3xl">
            <h2 className="type-h2 text-ink">Applying to iGuide, step by step.</h2>
            <p className="type-lead mt-4 text-muted">No black holes, no mystery. Here’s how it works.</p>
          </div>
          <div className="shrink-0">
            <RolesButton />
          </div>
        </div>
        <ol className="mt-2">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative border-l-2 border-line pb-8 pl-8 last:pb-0 lg:inline-block lg:w-1/5 lg:border-t-2 lg:border-l-0 lg:pt-8 lg:pr-6 lg:pb-0 lg:pl-0 lg:align-top"
            >
              <span aria-hidden className="absolute top-0 -left-[9px] h-4 w-4 rounded-full bg-rea-red lg:-top-[9px] lg:left-0" />
              <p className="type-caption text-muted">Step {i + 1}</p>
              <h3 className="type-heading-sm mt-1 text-ink">{s.title}</h3>
              <p className="type-body mt-2 text-body">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Perks */}
      <Section>
        <h2 className="type-h2 mb-10 text-ink">Perks and benefits</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => {
            const Icon = perkIcons[i]
            return (
              <li key={p.title} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon width={24} height={24} aria-hidden />
                </span>
                <h3 className="type-heading-sm mt-5 text-ink">{p.title}</h3>
                <p className="type-body mt-2 text-body">{p.text}</p>
              </li>
            )
          })}
        </ul>
      </Section>

      {/* Open roles */}
      <Section id="roles" background="surface" heading="Open roles" subheading="Find your spot. If nothing fits, send us a note anyway. Good people have a way of creating their own roles.">
        <BambooHrJobs />
      </Section>

      {/* Life at iGuide */}
      <Section heading="Life at iGuide" subheading="A week at iGuide, straight from the team.">
        <InstagramCarousel handle={instagram.handle} posts={instagram.posts} />
      </Section>
    </>
  )
}

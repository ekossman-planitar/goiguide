'use client'

import {useCallback, useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent} from 'react'
import {Button, buttonClass} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {AgentIcon, ArchitectIcon, BuilderIcon, FacilityIcon, PhotographerIcon} from './IndustryIcons'

/*
 * Homepage industry picker: tabs on the left, and for each audience the live
 * iGuide tour (from the old "Experience how easy it is…" section) beside what
 * iGuide does for them and a link to their industry page. Copy is drawn from
 * each industry page. Every panel's text is in the HTML (inactive ones hidden)
 * for search; only the active panel loads its tour.
 * Auto-advances every 9 s; the red bar under the active tab fills as a timer.
 * Pauses while the pointer is over the section, while anything in it has focus,
 * after a tap (until it scrolls out of view) and while off screen. Resumes from
 * where it stopped. Doesn't auto-advance for visitors who prefer reduced motion.
 * Facility Management shows on desktop only (lg+); phones keep the 2x2 grid of four.
 * GTM: .industry-picker-tab and .industry-picker-cta, each with data-industry
 */

const SLIDE_MS = 9000

type Industry = {
  id: string
  name: string
  icon: typeof AgentIcon
  headline: string
  points: {strong: string; text: string}[]
  deliverables: string[]
  href: string
  /** Live tour shown in the panel while its tab is active */
  demo: {src: string; title: string}
  /** Hidden below the lg breakpoint */
  desktopOnly?: boolean
}

const industries: Industry[] = [
  {
    id: 'real-estate',
    name: 'Residential Real Estate',
    icon: AgentIcon,
    headline: 'The listing tool that gives agents a competitive edge',
    points: [
      {
        strong: 'Generate leads',
        text: 'with immersive tours, Site Plans and Branded Property Overviews.',
      },
      {
        strong: 'Save time',
        text: 'with floor plans, dimensions and square footage in one platform.',
      },
      {
        strong: 'Increase exposure',
        text: 'so every listing stands out to a larger pool of buyers.',
      },
    ],
    deliverables: ['3D virtual tours', 'Floor plans', 'Site Plans', 'Branded Property Overviews'],
    href: '/residential-real-estate',
    demo: {src: 'https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash', title: 'iGuide 3D tour with Site Plan of 334 South Lake Shore Drive, Thousand Oaks'},
  },
  {
    id: 'photography',
    name: 'Real Estate Photography',
    icon: PhotographerIcon,
    headline: 'Grow a more profitable real estate photography business',
    points: [
      {
        strong: 'One simple, repeatable workflow',
        text: 'captures floor plans, Site Plans and visuals in a single visit.',
      },
      {
        strong: 'Faster turnaround, less post',
        text: 'so you can take on more shoots each week.',
      },
      {
        strong: 'Stand out in listing presentations',
        text: 'with deliverables agents can’t get from photos alone.',
      },
    ],
    deliverables: ['3D virtual tours', 'Floor plans', 'Site Plans'],
    href: '/real-estate-photography',
    demo: {src: 'https://youriguide.com/100_chattel_st_haverhill_ma?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash', title: 'iGuide 3D tour of 100 Chattel St, Haverhill MA'},
  },
  {
    id: 'architecture',
    name: 'Architecture & Remodeling',
    icon: ArchitectIcon,
    headline: 'Measured existing conditions without the tape',
    points: [
      {
        strong: 'Spend less time on site',
        text: 'and reduce field time by up to 50%.',
      },
      {
        strong: 'Fast-track your CAD workflow',
        text: 'with CAD-ready files from one visit.',
      },
      {
        strong: 'Work together from anywhere',
        text: 'with shareable 3D walkthroughs.',
      },
    ],
    deliverables: ['DWG & RVT files', 'Measured floor plans', '3D walkthroughs'],
    href: '/architecture-engineering-construction',
    demo: {src: 'https://youriguide.com/embed/pre_and_post_construction?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash', title: 'iGuide 3D tour: pre- and post-construction'},
  },
  {
    id: 'design-construction',
    name: 'Design & Construction',
    icon: BuilderIcon,
    headline: 'Fast, consistent site surveys for every location, nationwide',
    points: [
      {
        strong: 'Purpose built',
        text: 'for fast-moving QSR and retail rollouts.',
      },
      {
        strong: 'A field technician on site',
        text: 'within five business days of approval.',
      },
      {
        strong: 'Drawings, photos and a walkthrough',
        text: 'within 7 business days of the site visit.',
      },
    ],
    deliverables: ['Advanced Drawing Package', 'As-built drawings', 'Virtual walkthrough'],
    href: '/design-construction',
    demo: {src: 'https://youriguide.com/a425761f-6319-4955-bd18-97abdc5f3660?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash', title: 'iGuide Premium walkthrough of a quick-service restaurant'},
  },
  {
    // Copy from /facility-management (lib/content/industries/facilityManagement.tsx)
    id: 'facility',
    name: 'Facility Management',
    icon: FacilityIcon,
    headline: 'Turn every site visit into a reliable building record',
    points: [
      {
        strong: 'Create reliable building records',
        text: 'with accurate floor plans, measurements and visual documentation in one system.',
      },
      {
        strong: 'Reduce repeat site visits',
        text: 'by verifying conditions and scoping work remotely.',
      },
      {
        strong: 'Scale across portfolios',
        text: 'with consistent documentation and secure data sharing.',
      },
    ],
    deliverables: ['Floor plans', 'DWG files', '3D visual documentation'],
    href: '/facility-management',
    demo: {src: 'https://youriguide.com/embed/v4H2RMIUYYJDD1?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash', title: 'iGuide tour of a commercial facility'},
    desktopOnly: true,
  },
]

const isDesktop = () => globalThis.matchMedia('(min-width: 1024px)').matches
/** Next tab for autoplay, skipping desktop-only tabs on smaller screens */
const nextIndex = (a: number) => {
  let n = (a + 1) % industries.length
  if (industries[n].desktopOnly && !isDesktop()) n = (n + 1) % industries.length
  return n
}

export function IndustryPicker() {
  const [active, setActive] = useState(0)
  const [stopped, setStopped] = useState(false) // reduced motion
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const fill = useRef<HTMLSpanElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const elapsed = useRef(0)
  const holds = useRef({hover: false, focus: false, touch: false, offscreen: true})
  const uid = useId().replaceAll(/:/g, '')

  const select = useCallback((i: number) => {
    elapsed.current = 0
    setActive(i)
  }, [])

  useEffect(() => {
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) setStopped(true) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  // Timer: advances only while nothing is holding it, and keeps its progress when paused
  useEffect(() => {
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      const h = holds.current
      if (!stopped && !h.hover && !h.focus && !h.touch && !h.offscreen) {
        elapsed.current += dt
        if (elapsed.current >= SLIDE_MS) {
          elapsed.current = 0
          setActive(nextIndex)
        }
      }
      if (fill.current) fill.current.style.transform = `scaleX(${stopped ? 0 : Math.min(elapsed.current / SLIDE_MS, 1)})`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [stopped])

  // Pause while off screen; a tap pauses until the section scrolls away
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        holds.current.offscreen = !entry.isIntersecting
        if (!entry.isIntersecting) holds.current.touch = false
      },
      {threshold: 0.25},
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}
    const usable = industries.map((_, i) => i).filter((i) => !industries[i].desktopOnly || isDesktop())
    const pos = usable.indexOf(active)
    let next: number
    if (e.key in keys) next = usable[(pos + keys[e.key] + usable.length) % usable.length]
    else if (e.key === 'Home') next = usable[0]
    else if (e.key === 'End') next = usable.at(-1)!
    else return
    e.preventDefault()
    select(next)
    tabs.current[next]?.focus()
  }

  const allIndustries = (
    <Button href="/industries" variant="secondary" size="lg" className="shrink-0">
      Explore all industries
    </Button>
  )

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="pb-16 lg:pb-24"
      aria-labelledby={`${uid}-heading`}
      onMouseEnter={() => (holds.current.hover = true)}
      onMouseLeave={() => (holds.current.hover = false)}
      onFocus={() => (holds.current.focus = true)}
      onBlur={(e: FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) holds.current.focus = false
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') holds.current.touch = true
      }}
    >
      <Container>
        <div className="flex items-center justify-between gap-6">
          <h2 id={`${uid}-heading`} className="type-h2 text-ink">
            Built for the way you work
          </h2>
          <div className="hidden md:block">{allIndustries}</div>
        </div>
        <p className="mt-3 text-xl leading-[30px] text-muted">See what one iGuide scan does for you.</p>

        <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6">
          <div
            role="tablist"
            aria-label="Choose your industry"
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:content-start"
          >
            {industries.map((ind, i) => {
              const selected = i === active
              const Icon = ind.icon
              return (
                <button
                  key={ind.id}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  id={`${uid}-tab-${ind.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel-${ind.id}`}
                  tabIndex={selected ? 0 : -1}
                  data-industry={ind.id}
                  onClick={() => select(i)}
                  onKeyDown={onKey}
                  className={cn(
                    ind.desktopOnly && 'max-lg:hidden',
                    'industry-picker-tab group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary max-lg:flex-col max-lg:items-start lg:px-5 lg:py-5',
                    selected
                      ? 'border-primary bg-primary text-white shadow-lg'
                      : 'border-line bg-surface text-ink hover:border-primary-hover hover:bg-white lg:hover:translate-x-0.5',
                  )}
                >
                  <Icon className={cn('h-10 w-10 shrink-0 lg:h-12 lg:w-12', selected ? 'text-white' : 'text-ink')} />
                  <span className="block text-base leading-snug font-semibold md:text-lg">{ind.name}</span>
                  {selected && (
                    // Timer bar: fills until the next tab
                    <span aria-hidden className="absolute right-0 bottom-0 left-0 h-1 bg-white/15">
                      <span ref={fill} className="block h-full w-full origin-left bg-primary-hover" style={{transform: 'scaleX(0)'}} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {industries.map((ind, i) => {
            return (
              <div
                key={ind.id}
                id={`${uid}-panel-${ind.id}`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${ind.id}`}
                hidden={i !== active}
                className={cn(
                  ind.desktopOnly && 'max-lg:hidden',
                  'overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:[&[hidden]]:hidden',
                )}
              >
                {/* Tour on the left, words on the right (stacked on small screens) */}
                <div className="relative aspect-[16/10] bg-surface lg:aspect-auto lg:min-h-[440px]">
                  {i === active && (
                    <iframe src={ind.demo.src} title={ind.demo.title} allow="fullscreen; xr-spatial-tracking" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
                  )}
                </div>

                <div className="flex flex-col gap-6 p-6 md:p-8 lg:justify-center">
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-primary-hover uppercase">{ind.name}</p>
                    <h3 className="type-heading-md mt-2 text-ink">{ind.headline}</h3>
                    <ul className="mt-5 space-y-2.5">
                      {ind.points.map((p) => (
                        <li key={p.strong} className="flex gap-3 text-base leading-6 text-body">
                          <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-hover" />
                          <span>
                            <strong className="font-semibold text-ink">{p.strong}</strong> {p.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="text-sm font-semibold text-ink">Deliverables</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {ind.deliverables.map((d) => (
                          <li key={d} className="rounded-full bg-surface px-3 py-1 text-sm text-ink">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <SmartLink
                      href={ind.href}
                      data-industry={ind.id}
                      className={cn('industry-picker-cta group self-start', buttonClass('primary', 'lg'))}
                    >
                      Learn more<span className="sr-only"> about iGuide for {ind.name}</span>
                      <ArrowRight width={18} height={18} />
                    </SmartLink>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 md:hidden">{allIndustries}</div>
      </Container>
    </section>
  )
}

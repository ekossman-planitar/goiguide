'use client'

import Image from 'next/image'
import {useId, useRef, useState, type KeyboardEvent} from 'react'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {AgentIcon, ArchitectIcon, BuilderIcon, PhotographerIcon} from './IndustryIcons'

/*
 * Homepage "who are you?" picker: one tab per audience, each showing what iGUIDE
 * does for them and linking to their industry page. Copy is drawn from each
 * industry page. Every panel is in the HTML (inactive ones hidden) for search.
 * GTM: .industry-picker-tab (data-industry), .industry-picker-cta (data-industry)
 */

type Industry = {
  id: string
  name: string
  role: string
  icon: typeof AgentIcon
  headline: string
  points: {strong: string; text: string}[]
  deliverables: string[]
  href: string
  cta: string
  image: {src: string; alt: string; width: number; height: number}
}

const industries: Industry[] = [
  {
    id: 'real-estate',
    name: 'Residential Real Estate',
    role: 'I’m an agent or broker',
    icon: AgentIcon,
    headline: 'The listing tool that gives agents a competitive edge',
    points: [
      {strong: 'Generate leads', text: 'with immersive tours, Site Plans and Branded Property Overviews.'},
      {strong: 'Save time', text: 'with floor plans, dimensions and square footage in one platform.'},
      {strong: 'Increase exposure', text: 'so every listing stands out to a larger pool of buyers.'},
    ],
    deliverables: ['3D virtual tours', 'Floor plans', 'Site Plans', 'Branded Property Overviews'],
    href: '/residential-real-estate',
    cta: 'See iGUIDE for agents',
    image: {src: '/assets/Uploads/Industries-Real-Estate-Lower-Image-1.png', alt: 'Homebuyer exploring an iGUIDE 3D tour and floor plan on a tablet', width: 1875, height: 1458},
  },
  {
    id: 'photography',
    name: 'Real Estate Photography',
    role: 'I’m a photographer',
    icon: PhotographerIcon,
    headline: 'Grow a more profitable real estate photography business',
    points: [
      {strong: 'One simple, repeatable workflow', text: 'captures floor plans, Site Plans and visuals in a single visit.'},
      {strong: 'Faster turnaround, less post', text: 'so you can take on more shoots each week.'},
      {strong: 'Stand out in listing presentations', text: 'with deliverables agents can’t get from photos alone.'},
    ],
    deliverables: ['3D virtual tours', 'Floor plans', 'Site Plans'],
    href: '/real-estate-photography',
    cta: 'See iGUIDE for photographers',
    image: {src: '/assets/Uploads/Process_72dpi.jpg', alt: 'Photographer controlling the PLANIX R1 camera from a phone', width: 1682, height: 1121},
  },
  {
    id: 'architecture',
    name: 'Architecture & Remodeling',
    role: 'I’m an architect or remodeler',
    icon: ArchitectIcon,
    headline: 'Measured existing conditions without the tape',
    points: [
      {strong: 'Spend less time on site', text: 'and reduce field time by up to 50%.'},
      {strong: 'Fast-track your CAD workflow', text: 'with CAD-ready files from one visit.'},
      {strong: 'Work together from anywhere', text: 'with shareable 3D walkthroughs.'},
    ],
    deliverables: ['DWG & RVT files', 'Measured floor plans', '3D walkthroughs'],
    href: '/architecture-engineering-construction',
    cta: 'See iGUIDE for architects',
    image: {src: '/assets/Uploads/AEC-Images-After.png', alt: 'iGUIDE floor plan beside the renovated interior it documents', width: 900, height: 800},
  },
  {
    id: 'design-construction',
    name: 'Design & Construction',
    role: 'I manage builds and rollouts',
    icon: BuilderIcon,
    headline: 'Fast, consistent site surveys for every location, nationwide',
    points: [
      {strong: 'Purpose built', text: 'for fast-moving QSR and retail rollouts.'},
      {strong: 'A field technician on site', text: 'within five business days of approval.'},
      {strong: 'Drawings, photos and a walkthrough', text: 'within 7 business days of the site visit.'},
    ],
    deliverables: ['Advanced Drawing Package', 'As-built drawings', 'Virtual walkthrough'],
    href: '/design-construction',
    cta: 'See iGUIDE for design & construction',
    image: {src: '/assets/premium_rest.png', alt: 'iGUIDE drawing and 3D tour of a quick-service restaurant', width: 800, height: 592},
  },
]

export function IndustryPicker() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId().replace(/:/g, '')

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}
    let next = active
    if (e.key in keys) next = (active + keys[e.key] + industries.length) % industries.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = industries.length - 1
    else return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="who-its-for" className="py-16 lg:py-24" aria-labelledby={`${uid}-heading`}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 id={`${uid}-heading`} className="text-[32px] leading-tight font-semibold text-ink md:text-[48px]">
            Built for the way you work
          </h2>
          <p className="mt-4 text-xl leading-[30px] text-muted">Tell us who you are and see what one iGUIDE scan does for you.</p>
        </div>

        <div role="tablist" aria-label="Choose your industry" onKeyDown={onKey} className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
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
                onClick={() => setActive(i)}
                className={cn(
                  'industry-picker-tab group relative flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:p-5',
                  selected
                    ? 'border-primary bg-primary text-white shadow-lg'
                    : 'border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-primary-hover hover:bg-white',
                )}
              >
                <Icon className={cn('h-10 w-10 md:h-14 md:w-14', selected ? 'text-white' : 'text-ink')} />
                <span>
                  <span className={cn('block text-sm', selected ? 'text-white/80' : 'text-muted')}>{ind.role}</span>
                  <span className="mt-0.5 block text-base leading-snug font-semibold md:text-lg">{ind.name}</span>
                </span>
                {selected && <span aria-hidden className="absolute right-4 bottom-0 left-4 h-1 rounded-t bg-primary-hover" />}
              </button>
            )
          })}
        </div>

        {industries.map((ind, i) => (
          <div
            key={ind.id}
            id={`${uid}-panel-${ind.id}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${ind.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="relative aspect-[16/10] bg-surface lg:aspect-auto lg:min-h-[420px]">
                <Image
                  src={ind.image.src}
                  alt={ind.image.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover motion-safe:animate-[fadeIn_400ms_ease-out]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <p className="text-sm font-semibold tracking-wide text-primary-hover uppercase">{ind.name}</p>
                <h3 className="mt-2 text-[26px] leading-tight font-semibold text-ink md:text-[32px]">{ind.headline}</h3>
                <ul className="mt-6 space-y-3">
                  {ind.points.map((p) => (
                    <li key={p.strong} className="flex gap-3 text-lg leading-7 text-body">
                      <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary-hover" />
                      <span>
                        <strong className="font-semibold text-ink">{p.strong}</strong> {p.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="sr-only">Deliverables:</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {ind.deliverables.map((d) => (
                    <li key={d} className="rounded-full bg-surface px-3 py-1 text-sm text-ink">
                      {d}
                    </li>
                  ))}
                </ul>
                <SmartLink
                  href={ind.href}
                  data-industry={ind.id}
                  className="industry-picker-cta group mt-8 inline-flex items-center gap-2 self-start rounded-lg border border-primary bg-primary px-6 py-3 font-semibold text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
                >
                  {ind.cta}
                  <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                </SmartLink>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

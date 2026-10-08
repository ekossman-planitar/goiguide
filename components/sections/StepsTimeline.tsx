'use client'

import {useEffect, useRef, useState, type ReactNode} from 'react'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {cn} from '@/lib/cn'

export type TimelineStep = {
  title: string
  body: ReactNode
  cta?: {label: string; href: string}
  /** Path in /public or a full URL. Shows a placeholder when missing. */
  image?: {src: string; alt: string}
}

type Props = {
  /** Anchor id, so other links can jump to this section. */
  id?: string
  heading: string
  subheading?: string
  steps: TimelineStep[]
  /** Milliseconds per step while auto-playing. */
  interval?: number
  /** Hide the image area on each card (text-only steps). */
  showImages?: boolean
}

/**
 * Interactive step-by-step timeline. Desktop: a progress rail with clickable
 * nodes above a row of image cards. Mobile: a vertical timeline.
 * Steps auto-advance once the section is on screen, until the visitor
 * hovers, clicks or focuses a step.
 */
export function StepsTimeline({id, heading, subheading, steps, interval = 4000, showImages = true}: Props) {
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.4})
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!autoplay || !inView || steps.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setActive((i) => (i + 1) % steps.length), interval)
    return () => clearInterval(timer)
  }, [autoplay, inView, steps.length, interval])

  const select = (i: number) => {
    setAutoplay(false)
    setActive(i)
  }

  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100

  return (
    <section ref={sectionRef} id={id} className="scroll-mt-24 py-20 lg:py-[60px]">
      <Container>
        <div>
          <h2 className="text-balance text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">{heading}</h2>
          {subheading && <p className="mt-5 text-xl leading-[30px] text-muted">{subheading}</p>}
        </div>

        {/* Desktop progress rail */}
        <div className="relative mt-14 hidden lg:block" aria-hidden>
          <div
            className="absolute top-6 h-1 -translate-y-1/2 rounded-full bg-line"
            style={{left: `${50 / steps.length}%`, right: `${50 / steps.length}%`}}
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{width: `${progress}%`}}
            />
          </div>
          <div className="relative grid" style={{gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`}}>
            {steps.map((step, i) => (
              <div key={step.title} className="flex justify-center">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => select(i)}
                  className={cn(
                    'relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-bold transition-all duration-500',
                    i < active && 'border-primary bg-primary text-white',
                    i === active && 'scale-110 border-primary bg-primary text-white shadow-lg shadow-primary/30',
                    i > active && 'border-line bg-white text-muted hover:border-primary hover:text-primary',
                  )}
                >
                  {i === active && <span className="absolute inset-0 animate-ping rounded-full bg-primary/25" />}
                  <span className="relative">{i + 1}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cards. Vertical timeline on mobile, row on desktop */}
        <ol
          className="relative mt-12 grid gap-8 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-0.5 before:bg-line lg:mt-8 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-6 lg:before:hidden"
          style={{'--steps': steps.length} as React.CSSProperties}
        >
          {steps.map((step, i) => {
            const isActive = i === active
            return (
              <li
                key={step.title}
                className="relative pl-14 lg:pl-0"
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
              >
                {/* Mobile node */}
                <span
                  aria-hidden
                  className={cn(
                    'absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-colors lg:hidden',
                    i <= active ? 'border-primary bg-primary text-white' : 'border-line bg-white text-muted',
                  )}
                >
                  {i + 1}
                </span>

                <article
                  onClick={() => select(i)}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border bg-white p-3 transition-all duration-500',
                    isActive
                      ? 'border-primary/60 shadow-xl shadow-primary/10 lg:-translate-y-2'
                      : 'border-line lg:opacity-80',
                  )}
                >
                  {showImages && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                    {/* Placeholder shows until the image file exists */}
                    {step.image ? (
                      <FallbackImage
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className={cn('object-cover transition-transform duration-700', isActive && 'scale-105')}
                        fallback={
                      <div
                        className={cn(
                          'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-soft to-surface transition-transform duration-700',
                          isActive && 'scale-105',
                        )}
                        aria-hidden
                      >
                        <span className="text-7xl font-bold text-primary/15">{i + 1}</span>
                      </div>
                        }
                      />
                    ) : (
                      <div
                        className={cn(
                          'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-soft to-surface transition-transform duration-700',
                          isActive && 'scale-105',
                        )}
                        aria-hidden
                      >
                        <span className="text-7xl font-bold text-primary/15">{i + 1}</span>
                      </div>
                    )}
                  </div>
                  )}

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                    <span className="w-fit rounded-[28px] bg-cream px-3 py-2 text-xs leading-[18px] font-semibold text-ink">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-4 text-2xl font-bold leading-[normal] text-ink">{step.title}</h3>
                    <div className="mt-3 flex-1 text-base leading-6 text-body [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary">
                      {step.body}
                    </div>
                    {step.cta && (
                      <Button href={step.cta.href} variant="secondary" size="lg" className="mt-6 w-full">
                        {step.cta.label}
                      </Button>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}

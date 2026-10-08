'use client'

import {useRef, useState, type KeyboardEvent} from 'react'
import {Container} from '@/components/ui/Container'
import {Pill} from '@/components/ui/Pill'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {cn} from '@/lib/cn'

export type Tour = {id: string; label: string; title: string; src: string}

type Props = {
  eyebrow?: {label: string; href: string}
  heading: string
  subheading?: string
  tours: Tour[]
}

/**
 * Live iGUIDE tour demo. Tabs on the left (1/4), the embedded tour on the
 * right (3/4). Each tour only loads when its tab is first opened, then stays
 * loaded so switching back is instant.
 */
export function TourShowcase({eyebrow, heading, subheading, tours}: Props) {
  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number, focus = false) => {
    setActive(i)
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
    if (focus) tabRefs.current[i]?.focus()
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: KeyboardEvent) => {
    const last = tours.length - 1
    const next = {ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last}[
      e.key
    ]
    if (next === undefined) return
    e.preventDefault()
    select(next < 0 ? last : next > last ? 0 : next, true)
  }

  return (
    <section className="py-10 lg:py-[60px]">
      <Container>
        <div className="rounded-2xl bg-surface px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
          <SectionHeading
            align="center"
            heading={heading}
            subheading={subheading}
            eyebrow={eyebrow && <Pill {...eyebrow} />}
            className="max-w-4xl"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-4 lg:gap-8">
            <div
              role="tablist"
              aria-label="Example tours"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex gap-2 overflow-x-auto rounded-[32px] bg-[#e6edf3] p-2 lg:flex-col lg:self-start lg:overflow-visible"
            >
              {tours.map((tour, i) => {
                const selected = i === active
                return (
                  <button
                    key={tour.id}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`tour-tab-${tour.id}`}
                    aria-selected={selected}
                    aria-controls={`tour-panel-${tour.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    // Same pill style as the live site's tabs
                    className={cn(
                      'shrink-0 rounded-3xl border px-6 py-3 text-left text-base leading-6 font-semibold whitespace-nowrap transition-colors lg:whitespace-normal',
                      selected
                        ? 'border-primary bg-[#d0edf8] text-primary'
                        : 'border-[#e7edf6] bg-white text-ink hover:border-primary hover:text-primary',
                    )}
                  >
                    {tour.label}
                  </button>
                )
              })}
            </div>

            <div className="lg:col-span-3">
              {tours.map((tour, i) => (
                <div
                  key={tour.id}
                  role="tabpanel"
                  id={`tour-panel-${tour.id}`}
                  aria-labelledby={`tour-tab-${tour.id}`}
                  hidden={i !== active}
                  // Taller frame on phones so the tour is usable
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-sm sm:aspect-video"
                >
                  {loaded.has(i) && (
                    <iframe
                      title={tour.title}
                      src={tour.src}
                      className="absolute inset-0 h-full w-full"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

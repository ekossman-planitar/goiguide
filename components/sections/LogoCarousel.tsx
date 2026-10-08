'use client'

import {Fragment} from 'react'
import {Container} from '@/components/ui/Container'
import {Marquee} from '@/components/ui/Marquee'
import type {LogoItem} from '@/sanity/lib/types'

type Props = {
  heading?: string
  logos: LogoItem[]
  /** Autoplay speed in pixels per second. */
  speed?: number
}

/** Renders `**word**` in the heading as bold. */
function renderHeading(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-bold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** Sanity-hosted raster logos get resized; SVGs are used as-is. */
function logoSrc(src: string) {
  return src.endsWith('.svg') ? src : `${src}?h=120&fit=max&auto=format`
}

/**
 * Infinite logo strip. Autoplays, pauses on hover, can be dragged with mouse or
 * touch. Logos are not links. Autoplay is off when the user prefers reduced motion.
 */
export function LogoCarousel({heading, logos, speed = 40}: Props) {
  if (!logos.length) return null

  return (
    <section aria-label="Customers" className="pb-10 pt-2">
      {/* Same width as the rest of the page: logos scroll between the content edges */}
      <Container>
        {heading && <p className="mb-6 text-center text-base leading-6 text-body">{renderHeading(heading)}</p>}
        <Marquee
          label="Customer logos"
          speed={speed}
          itemKeys={logos.map((logo) => logo._id)}
          items={logos.map((logo) => (
            <div key={logo._id} className="flex h-20 items-center px-8 lg:px-11">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG logos */}
              <img
                src={logoSrc(logo.src)}
                alt={logo.name}
                draggable={false}
                loading="eager"
                className="pointer-events-none h-[50px] w-auto max-w-[170px] object-contain"
              />
            </div>
          ))}
        />
      </Container>
    </section>
  )
}

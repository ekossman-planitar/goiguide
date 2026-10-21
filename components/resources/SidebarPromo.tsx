'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'
import {inSchedule} from '@/lib/popup/rules'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImage} from '@/sanity/lib/types'
import {Button} from '@/components/ui/Button'

export type SidebarPromoData = {
  _id: string
  eyebrow?: string | null
  heading: string
  text?: string | null
  image?: SanityImage | null
  button?: {label?: string | null; href?: string | null} | null
  newTab?: boolean | null
  startAt?: string | null
  endAt?: string | null
}

/** Picks one live promo at random after the page loads (so cached pages still rotate). */
function pick(promos: SidebarPromoData[]) {
  const live = promos.filter((p) => inSchedule(p.startAt, p.endAt, Date.now()))
  return live.length ? live[Math.floor(Math.random() * live.length)] : null
}

export function SidebarPromo({promos}: Readonly<{promos: SidebarPromoData[]}>) {
  const [promo, setPromo] = useState<SidebarPromoData | null>(null)
  useEffect(() => setPromo(pick(promos)), [promos]) // eslint-disable-line react-hooks/set-state-in-effect

  if (!promo) return null
  return (
    <aside aria-label={promo.heading} data-promo={promo._id} className="overflow-hidden rounded-2xl border border-line bg-white motion-safe:animate-[fadeIn_300ms_ease-out]">
      {promo.image?.asset && (
        <Image
          src={urlFor(promo.image).width(640).height(360).fit('crop').auto('format').url()}
          alt={promo.image.alt ?? ''}
          width={640}
          height={360}
          sizes="320px"
          className="aspect-[16/9] w-full object-cover"
        />
      )}
      <div className="p-6">
        {promo.eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-primary-hover">{promo.eyebrow}</p>}
        <p className="mt-1 text-xl leading-tight font-semibold text-ink">{promo.heading}</p>
        {promo.text && <p className="mt-3 leading-relaxed text-body">{promo.text}</p>}
        {promo.button?.href && (
          <Button
            href={promo.button.href}
            newTab={!!promo.newTab}
            className="blog-sidebar-promo mt-5 w-full justify-center"
          >
            {promo.button.label || 'Learn more'}
          </Button>
        )}
      </div>
    </aside>
  )
}

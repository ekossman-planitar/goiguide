'use client'

import {useState} from 'react'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {ChevronDown} from '@/components/ui/icons'
import type {Img} from '@/components/blocks/types'

export type GallerySample = {key: string; label: string; url: string; image?: Img}

/** Thumbnails that open more sample tours in a new tab; the first row shows, the rest open with "More samples" (live: showcase pages). */
export function SampleGallery({samples, heading, visible = 4}: Readonly<{samples: GallerySample[]; heading?: string; visible?: number}>) {
  const [open, setOpen] = useState(false)
  const hasMore = samples.length > visible
  return (
    <div className="mt-10">
      {heading && <h3 className="mb-6 text-2xl font-semibold text-ink">{heading}</h3>}
      <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {samples.map((s, i) => (
          <li key={s.key} hidden={!open && i >= visible}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="group block text-center">
              <span className="block overflow-hidden rounded-xl bg-surface">
                {s.image && (
                  <FallbackImage
                    src={s.image.src}
                    alt={s.image.alt}
                    width={s.image.width ?? 535}
                    height={s.image.height ?? 300}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    fallback={<span className="block aspect-[16/10] w-full" />}
                  />
                )}
              </span>
              <span className="mt-3 block text-sm font-semibold text-ink transition-colors group-hover:text-primary-hover md:text-base">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="text-link">
            {open ? 'Fewer samples' : 'More samples'}
            <ChevronDown width={16} height={16} className={open ? 'rotate-180' : ''} />
          </button>
        </div>
      )}
    </div>
  )
}

'use client'

import {ZoomIn} from 'lucide-react'
import {useRef} from 'react'
import {MediaView} from './MediaView'
import type {Img} from './types'

/** Image that opens full screen when clicked (live: showcase floor plans). Esc, the × or a click closes it. */
export function ZoomImage({image, className}: Readonly<{image: Img; className?: string}>) {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="group relative block w-full cursor-zoom-in"
        aria-label={`View full screen${image.alt ? `: ${image.alt}` : ''}`}
      >
        <MediaView media={{type: 'image', image}} className={className} />
        <span aria-hidden className="absolute right-3 bottom-3 rounded-full bg-white/90 p-2 text-ink shadow transition-colors group-hover:text-primary-hover">
          <ZoomIn aria-hidden width={20} height={20} />
        </span>
      </button>
      <dialog
        ref={ref}
        aria-label={image.alt || 'Full screen image'}
        onClick={() => ref.current?.close()}
        className="m-auto h-dvh max-h-none w-dvw max-w-none bg-black/90 p-0 backdrop:bg-black/80"
      >
        <button type="button" aria-label="Close" className="absolute top-4 right-5 z-10 cursor-pointer text-4xl leading-none text-white">
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element -- full-size original */}
        <img src={image.src} alt={image.alt} className="h-full w-full object-contain p-6" />
      </dialog>
    </>
  )
}

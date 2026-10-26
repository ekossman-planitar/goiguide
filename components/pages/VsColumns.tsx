import {Check, X} from 'lucide-react'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {cn} from '@/lib/cn'
import type {Img} from '@/components/blocks/types'

export type VsItem = {text: string; ok: boolean}
export type VsSide = {name: string; image: Img; items: VsItem[]}

function Mark({ok}: Readonly<{ok: boolean}>) {
  return ok ? (
    <>
      <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <span className="sr-only">Yes</span>
    </>
  ) : (
    <>
      <X aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
      <span className="sr-only">No</span>
    </>
  )
}

/** iGuide vs. a competitor as two cards (image, name, ticked / crossed list), as on the live compare pages. */
export function VsColumns({ours, theirs}: Readonly<{ours: VsSide; theirs: VsSide}>) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[ours, theirs].map((side, i) => (
        <div
          key={side.name}
          className={cn(
            'flex flex-col rounded-2xl border p-6 shadow-card md:p-8',
            i === 0 ? 'border-primary bg-white' : 'border-line bg-surface',
          )}
        >
          <div className="flex h-40 items-center justify-center">
            <FallbackImage
              src={side.image.src}
              alt={side.image.alt}
              width={side.image.width ?? 320}
              height={side.image.height ?? 320}
              sizes="(min-width: 768px) 320px, 60vw"
              className="h-full w-auto object-contain"
              fallback={<div className="h-full w-40" />}
            />
          </div>
          <h3 className={cn('type-heading-md mt-6', i === 0 ? 'text-primary' : 'text-ink')}>{side.name}</h3>
          <ul className="mt-5 space-y-3">
            {side.items.map((item) => (
              <li key={item.text} className={cn('flex gap-3 text-base leading-6', item.ok ? 'text-ink' : 'text-muted')}>
                <Mark ok={item.ok} />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

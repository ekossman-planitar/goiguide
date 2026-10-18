import {FallbackImage} from '@/components/ui/FallbackImage'
import {cn} from '@/lib/cn'
import type {Img} from '@/components/blocks/types'

export type VsItem = {text: string; ok: boolean}
export type VsSide = {name: string; image: Img; items: VsItem[]}

function Mark({ok}: {ok: boolean}) {
  return ok ? (
    <svg aria-label="Yes" role="img" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12.5 10 17 19 7" />
    </svg>
  ) : (
    <svg aria-label="No" role="img" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

/** iGuide vs. a competitor as two cards (image, name, ticked / crossed list), as on the live compare pages. */
export function VsColumns({ours, theirs}: {ours: VsSide; theirs: VsSide}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {[ours, theirs].map((side, i) => (
        <div
          key={side.name}
          className={cn(
            'flex flex-col rounded-2xl border p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)] md:p-8',
            i === 0 ? 'border-primary bg-white' : 'border-[#e4e4e7] bg-surface',
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
          <h3 className={cn('mt-6 text-2xl font-semibold', i === 0 ? 'text-primary' : 'text-ink')}>{side.name}</h3>
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

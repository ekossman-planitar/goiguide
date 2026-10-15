import type {ReactNode} from 'react'

/**
 * Two-column page-top layout for pages whose right column is a form or
 * interactive widget (PageHero only takes media). Used inside a `custom` block.
 */
export function HeroColumns({heading, children, aside}: {heading: string; children?: ReactNode; aside: ReactNode}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="min-w-0">
        <h1 className="text-balance text-[40px] font-semibold leading-[normal] text-ink md:text-[56px]">{heading}</h1>
        {children && <div className="mt-6 space-y-4 text-lg leading-7 text-muted">{children}</div>}
      </div>
      <div className="min-w-0">{aside}</div>
    </div>
  )
}

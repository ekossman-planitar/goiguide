import {cn} from '@/lib/cn'

/** Bulleted list with brand checkmarks. */
export function CheckList({items, className}: {items: string[]; className?: string}) {
  return (
    <ul className={cn('space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-6 text-body">
          <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12.5 10 17 19 7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  )
}

import {Check} from 'lucide-react'
import {cn} from '@/lib/cn'

/** Bulleted list with brand checkmarks. */
export function CheckList({items, className}: Readonly<{items: string[]; className?: string}>) {
  return (
    <ul className={cn('space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-6 text-body">
          <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  )
}

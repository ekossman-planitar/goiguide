import {Search} from 'lucide-react'
import {cn} from '@/lib/cn'

/** Search box: a plain GET form to /support/search, so it works without JavaScript. */
export function HelpSearchForm({defaultValue, size = 'md', className}: Readonly<{defaultValue?: string; size?: 'md' | 'lg'; className?: string}>) {
  return (
    <form role="search" action="/support/search" method="get" className={cn('help-search relative', className)}>
      <label htmlFor={`help-query-${size}`} className="sr-only">
        Search the Help Center
      </label>
      <Search aria-hidden width={size === 'lg' ? 20 : 18} height={size === 'lg' ? 20 : 18} className={cn('absolute top-1/2 -translate-y-1/2 text-muted', size === 'lg' ? 'left-5' : 'left-3.5')} />
      <input
        id={`help-query-${size}`}
        type="search"
        name="query"
        defaultValue={defaultValue}
        placeholder="Search"
        autoComplete="off"
        className={cn(
          'w-full border border-muted bg-white text-ink focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary',
          size === 'lg' ? 'h-14 rounded-full pr-5 pl-13 text-lg' : 'h-11 rounded-lg pr-3 pl-10 text-base',
        )}
      />
    </form>
  )
}

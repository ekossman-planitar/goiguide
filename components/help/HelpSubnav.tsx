import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ChevronRight} from '@/components/ui/icons'
import {HelpSearchForm} from './HelpSearchForm'

export type Crumb = {label: string; href: string}

/** Breadcrumbs and the search box, above every inner Help Center page. */
export function HelpSubnav({crumbs, query}: {crumbs: Crumb[]; query?: string}) {
  const all: Crumb[] = [{label: 'Help Center', href: '/help'}, ...crumbs]
  return (
    <div className="border-b border-line bg-surface">
      <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
            {all.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden width={14} height={14} className="text-muted" />}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {c.label}
                  </span>
                ) : (
                  <SmartLink href={c.href} className="text-muted hover:text-primary-hover">
                    {c.label}
                  </SmartLink>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <HelpSearchForm defaultValue={query} className="w-full md:w-[320px] md:shrink-0" />
      </Container>
    </div>
  )
}

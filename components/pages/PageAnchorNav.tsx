import {SmartLink} from '@/components/ui/SmartLink'
import {Container} from '@/components/ui/Container'

/** Row of in-page jump links under a hero (the live site's "Sub navigation" bar). */
export function PageAnchorNav({links, label = 'On this page'}: {links: {label: string; href: string}[]; label?: string}) {
  return (
    <div className="border-y border-line bg-white">
      <Container>
        <nav aria-label={label} className="-mb-px flex flex-wrap gap-x-2">
          {links.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              className="border-b-4 border-transparent px-4 py-3 text-base font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>
      </Container>
    </div>
  )
}

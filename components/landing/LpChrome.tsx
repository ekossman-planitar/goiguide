import Image from 'next/image'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {legal} from '@/lib/footerNavigation'
import {lpCta} from './convert'
import type {LpButton} from './types'

/** Landing page header: the logo (links home) and an optional button. No navigation, so visitors stay on the page. */
export function LpHeader({button}: {button?: LpButton | null}) {
  const cta = button?.label ? lpCta(button) : null
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Native <a>: full page load keeps GTM page views working */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label="iGuide home" className="shrink-0">
          <Image src="/iGUIDE-Logo.svg" alt="iGuide" width={1330} height={368} priority className="h-auto w-[130px] md:w-[150px]" />
        </a>
        {cta && (
          <Button href={cta.href} className={cta.className} newTab={cta.newTab}>
            {cta.label}
          </Button>
        )}
      </Container>
    </header>
  )
}

/** Landing page footer: copyright and the legal links forms need (privacy). No site navigation. */
export function LpFooter() {
  return (
    <footer className="border-t border-line bg-white py-8">
      <Container className="flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{legal.copyright}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {legal.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-hover hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}

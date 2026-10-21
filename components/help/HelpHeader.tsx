'use client'

import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronDown, CloseIcon, MenuIcon} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {helpHeaderLinks, zendeskLinks} from '@/lib/help/navigation'

export type HelpNavCategory = {name: string; description: string; href: string}

const external = {target: '_blank', rel: 'noopener noreferrer'}

/**
 * Help Center microsite header (/help): its own navigation, separate from the
 * marketing site's. Topics menu lists the Zendesk categories. Sign in, My
 * requests and Submit a request stay on Zendesk.
 */
export function HelpHeader({categories}: {categories: HelpNavCategory[]}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [topicsOpen, setTopicsOpen] = useState(false)
  const topicsRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!topicsOpen) return
    const onPointer = (e: PointerEvent) => {
      if (!topicsRef.current?.contains(e.target as Node)) setTopicsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTopicsOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [topicsOpen])

  const linkClass = 'rounded-lg p-2 text-base leading-6 text-ink hover:text-primary-hover'

  return (
    <header className="help-header sticky top-0 z-40 border-b border-line bg-white">
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Native <a> on purpose: full page loads keep GTM triggers working */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page loads for GTM */}
        <a href="/help" className="flex shrink-0 items-center gap-3" aria-label="iGuide Help Center home">
          <Image src="/iGUIDE-Logo.svg" alt="" width={1330} height={368} priority className="h-auto w-[132px]" />
          <span aria-hidden className="h-7 w-px bg-line" />
          <span className="font-display text-lg leading-none font-semibold text-ink">Help Center</span>
        </a>

        <nav aria-label="Help Center" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li ref={topicsRef} className="relative">
              <button
                type="button"
                className={cn('flex items-center gap-1', linkClass, topicsOpen && 'text-primary-hover')}
                aria-expanded={topicsOpen}
                aria-controls="help-topics"
                onClick={() => setTopicsOpen((o) => !o)}
              >
                Topics
                <ChevronDown className={cn('transition-transform duration-200', topicsOpen && 'rotate-180')} />
              </button>
              <div
                id="help-topics"
                className={cn(
                  'absolute top-full left-1/2 mt-3 w-[640px] -translate-x-1/2 rounded-2xl border border-line bg-white p-4 shadow-xl shadow-black/5 transition-all duration-200',
                  topicsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                )}
              >
                <ul className="grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <li key={c.href}>
                      <SmartLink href={c.href} className="help-nav-category group block rounded-xl p-3 transition-colors hover:bg-surface">
                        <span className="block font-semibold text-ink group-hover:text-primary-hover">{c.name}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted">{c.description}</span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
                <SmartLink href="/help" className="mt-2 px-3 py-2 text-link">
                  All topics
                  <ArrowRight width={16} height={16} />
                </SmartLink>
              </div>
            </li>
            {helpHeaderLinks.map((l) => (
              <li key={l.href}>
                <SmartLink href={l.href} className={cn('block', linkClass)} {...(l.external ? external : {})}>
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SmartLink href={zendeskLinks.myRequests} className={cn('help-my-requests', linkClass)}>
            My requests
          </SmartLink>
          <SmartLink href={zendeskLinks.signIn} className={cn('help-sign-in', linkClass)}>
            Sign in
          </SmartLink>
          <Button href={zendeskLinks.submitRequest} className="help-submit-request ml-2">
            Submit a request
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="help-mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {mobileOpen && (
        <nav id="help-mobile-nav" aria-label="Help Center" className="border-t border-line bg-white lg:hidden">
          <Container className="max-h-[calc(100svh-5rem)] overflow-y-auto py-4">
            <ul className="divide-y divide-line">
              <li>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-lg text-ink [&::-webkit-details-marker]:hidden">
                    Topics
                    <ChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="pb-3">
                    {categories.map((c) => (
                      <li key={c.href}>
                        <SmartLink href={c.href} className="help-nav-category block py-2 pl-3 text-body">
                          {c.name}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              {helpHeaderLinks.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} className="block py-3 text-lg text-ink" {...(l.external ? external : {})}>
                    {l.label}
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink href={zendeskLinks.myRequests} className="help-my-requests block py-3 text-lg text-ink">
                  My requests
                </SmartLink>
              </li>
              <li>
                <SmartLink href={zendeskLinks.signIn} className="help-sign-in block py-3 text-lg text-ink">
                  Sign in
                </SmartLink>
              </li>
            </ul>
            <div className="mt-4 grid">
              <Button href={zendeskLinks.submitRequest} className="help-submit-request">
                Submit a request
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  )
}

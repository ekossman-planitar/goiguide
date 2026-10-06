'use client'

import Image from 'next/image'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronDown, CloseIcon, MenuIcon} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {headerButtons, mainNav, type NavItem} from '@/lib/navigation'

/** Delay before a mega menu closes, so the pointer can travel from the trigger to the panel. */
const CLOSE_DELAY = 150

/** Sticky site header: logo, main nav with full-width mega menus, and the two action buttons. */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const headerRef = useRef<HTMLElement>(null)

  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), [])
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY)
  }, [])

  // Close on outside click and Escape
  useEffect(() => {
    if (!openMenu) return
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${openMenu}"]`)
      setOpenMenu(null)
      trigger?.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-white">
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Native <a> on purpose: full page loads keep GTM triggers working */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="shrink-0" aria-label="iGUIDE home">
          {/* Drop the logo file at public/logo.svg */}
          <Image src="/logo.svg" alt="iGUIDE" width={170} height={34} priority className="h-8 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                open={openMenu === item.label}
                onOpen={() => {
                  cancelClose()
                  setOpenMenu(item.label)
                }}
                onToggle={() => setOpenMenu((current) => (current === item.label ? null : item.label))}
                onClose={() => setOpenMenu(null)}
                onPointerLeave={scheduleClose}
                onPointerEnterPanel={cancelClose}
                onHoverPlainLink={() => {
                  cancelClose()
                  setOpenMenu(null)
                }}
              />
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={headerButtons.findPro.href} variant="secondary">
            {headerButtons.findPro.label}
          </Button>
          <Button href={headerButtons.shop.href}>{headerButtons.shop.label}</Button>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {mobileOpen && <MobileNav />}
    </header>
  )
}

type DesktopNavItemProps = {
  item: NavItem
  open: boolean
  onOpen: () => void
  onToggle: () => void
  onClose: () => void
  onPointerLeave: () => void
  onPointerEnterPanel: () => void
  onHoverPlainLink: () => void
}

function DesktopNavItem({
  item,
  open,
  onOpen,
  onToggle,
  onClose,
  onPointerLeave,
  onPointerEnterPanel,
  onHoverPlainLink,
}: DesktopNavItemProps) {
  const panelId = `mega-${item.label.toLowerCase().replace(/\W+/g, '-')}`
  const linkClass = 'flex items-center gap-1 rounded-md px-3 py-2 text-[17px] text-ink hover:text-primary'

  if (!item.menu) {
    return (
      <li onPointerEnter={(e) => e.pointerType === 'mouse' && onHoverPlainLink()}>
        <SmartLink href={item.href} className={linkClass}>
          {item.label}
        </SmartLink>
      </li>
    )
  }

  const {menu} = item

  return (
    // Not `relative`: the panel is positioned against the full-width header
    <li
      onPointerEnter={(e) => e.pointerType === 'mouse' && onOpen()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onPointerLeave()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose()
      }}
    >
      {/* The label is a link; the chevron opens the menu for keyboard and touch users */}
      <div className="flex items-center">
        <SmartLink href={item.href} className={cn(linkClass, 'pr-1', open && 'text-primary')}>
          {item.label}
        </SmartLink>
        <button
          type="button"
          data-menu-trigger={item.label}
          className={cn('-ml-1 rounded-md p-1.5 text-ink hover:text-primary', open && 'text-primary')}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.label} menu`}
          onClick={onToggle}
        >
          <ChevronDown className={cn('transition-transform duration-200', open && 'rotate-180')} />
        </button>
      </div>

      <div
        id={panelId}
        onPointerEnter={onPointerEnterPanel}
        className={cn(
          'absolute inset-x-0 top-full border-b border-line bg-white shadow-xl shadow-black/5 transition-all duration-200',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <Container className="grid grid-cols-4 gap-10 py-10">
          {/* Left 1/4: the top-level item */}
          <div className="border-r border-line pr-10">
            <SmartLink href={item.href} className="text-2xl font-bold text-ink hover:text-primary">
              {item.label}
            </SmartLink>
            <p className="mt-3 leading-relaxed text-muted">{menu.description}</p>
            <SmartLink href={item.href} className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-primary">
              {menu.overviewLabel}
              <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </SmartLink>
          </div>

          {/* Right 3/4: sub-links */}
          <ul className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-2">
            {menu.links.map(({label, href, description, icon: Icon}) => (
              <li key={href + label}>
                <SmartLink href={href} className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-surface">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink group-hover:text-primary">{label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-muted">{description}</span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </li>
  )
}

function MobileNav() {
  return (
    <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-white lg:hidden">
      <Container className="max-h-[calc(100svh-5rem)] overflow-y-auto py-4">
        <ul className="divide-y divide-line">
          {mainNav.map((item) =>
            item.menu ? (
              <li key={item.label}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-lg text-ink [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="pb-3">
                    <li>
                      <SmartLink href={item.href} className="block py-2 pl-3 font-semibold text-primary">
                        {item.menu.overviewLabel}
                      </SmartLink>
                    </li>
                    {item.menu.links.map(({label, href, icon: Icon}) => (
                      <li key={href + label}>
                        <SmartLink href={href} className="flex items-center gap-3 py-2 pl-3 text-body">
                          <Icon size={18} strokeWidth={1.75} className="text-primary" aria-hidden />
                          {label}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={item.label}>
                <SmartLink href={item.href} className="block py-3 text-lg text-ink">
                  {item.label}
                </SmartLink>
              </li>
            ),
          )}
        </ul>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Button href={headerButtons.findPro.href} variant="secondary">
            {headerButtons.findPro.label}
          </Button>
          <Button href={headerButtons.shop.href}>{headerButtons.shop.label}</Button>
        </div>
      </Container>
    </nav>
  )
}

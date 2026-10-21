'use client'

import {useEffect, useState} from 'react'
import {cn} from '@/lib/cn'

/**
 * "On this page" menu beside a customer story. Highlights the section being
 * read. Plain #anchor links, so it works without JavaScript too.
 */
export function StoryToc({items}: Readonly<{items: {id: string; label: string}[]}>) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    // The active section is the last one whose top has scrolled past ~a third of the screen
    const update = () => {
      const line = globalThis.innerHeight / 3
      let current = els[0]?.id
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
      setActive(current)
    }
    update()
    globalThis.addEventListener('scroll', update, {passive: true})
    globalThis.addEventListener('resize', update)
    return () => {
      globalThis.removeEventListener('scroll', update)
      globalThis.removeEventListener('resize', update)
    }
  }, [items])

  return (
    <nav aria-label="On this page" className="story-toc">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'location' : undefined}
              className={cn(
                'story-toc-link -ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors',
                active === i.id ? 'border-primary-hover font-semibold text-ink' : 'border-transparent text-muted hover:text-ink',
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

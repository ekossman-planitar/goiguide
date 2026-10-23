'use client'

import {FileText, Search} from 'lucide-react'
import {useEffect, useId, useRef, useState} from 'react'
import {cn} from '@/lib/cn'

type Suggestion = {title: string; href: string; section: string | null}

const MIN_LENGTH = 2
const DEBOUNCE_MS = 200

/**
 * Help Center search box with type-ahead suggestions (Zendesk's article search
 * via /api/support-search). Still a plain GET form to /support/search, so
 * pressing Enter (or using it without JavaScript) opens the full results page.
 * Keyboard: ↑/↓ to move, Enter to open, Esc to close.
 * GTM: suggestion links have .help-search-suggestion (data-query = what was typed).
 */
export function HelpSearchForm({defaultValue, size = 'md', className}: Readonly<{defaultValue?: string; size?: 'md' | 'lg'; className?: string}>) {
  const id = useId()
  const inputId = `help-query-${id}`
  const listId = `help-suggest-${id}`
  const [query, setQuery] = useState(defaultValue ?? '')
  // Suggestions are kept with the query they answer, so a stale answer is never shown
  const [answer, setAnswer] = useState<{query: string; results: Suggestion[]}>({query: '', results: []})
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const rootRef = useRef<HTMLFormElement>(null)

  // Fetch suggestions shortly after typing stops; older requests are cancelled
  useEffect(() => {
    const q = query.trim()
    if (q.length < MIN_LENGTH) return
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/support-search?${new URLSearchParams({query: q})}`, {signal: controller.signal})
        const data: {results: Suggestion[]} = res.ok ? await res.json() : {results: []}
        setAnswer({query: q, results: data.results})
      } catch {
        if (!controller.signal.aborted) setAnswer({query: q, results: []})
      }
      setActive(-1)
    }, DEBOUNCE_MS)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  // Close when clicking outside
  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [open])

  const q = query.trim()
  const loading = q.length >= MIN_LENGTH && answer.query !== q
  // While the next answer loads, keep the previous suggestions on screen (no flicker)
  const results = answer.query === q || (loading && answer.query) ? answer.results : []
  const showList = open && q.length >= MIN_LENGTH && (results.length > 0 || !loading)
  const allResultsHref = `/support/search?${new URLSearchParams({query: q})}`

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false)
      setActive(-1)
      return
    }
    if (!showList || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1))
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault()
      // Full page load, like every other link on the site (GTM)
      window.location.href = results[active].href
    }
  }

  return (
    <form ref={rootRef} role="search" action="/support/search" method="get" className={cn('help-search relative', className)}>
      <label htmlFor={inputId} className="sr-only">
        Search the Help Center
      </label>
      <Search
        aria-hidden
        width={size === 'lg' ? 20 : 18}
        height={size === 'lg' ? 20 : 18}
        className={cn('pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted', size === 'lg' ? 'left-5' : 'left-3.5')}
      />
      <input
        id={inputId}
        type="search"
        name="query"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
        className={cn(
          'w-full border border-muted bg-white text-ink focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary',
          size === 'lg' ? 'h-14 rounded-full pr-5 pl-13 text-lg' : 'h-11 rounded-lg pr-3 pl-10 text-base',
        )}
      />

      {showList && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-white text-left shadow-xl shadow-black/10">
          {results.length > 0 ? (
            <ul id={listId} role="listbox" aria-label="Suggested articles" className="max-h-[60vh] overflow-y-auto py-2">
              {results.map((r, i) => (
                <li key={r.href} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                  <a
                    href={r.href}
                    data-query={q}
                    className={cn('help-search-suggestion flex items-start gap-3 px-4 py-2.5 text-ink', i === active ? 'bg-surface' : 'hover:bg-surface')}
                    onMouseEnter={() => setActive(i)}
                  >
                    <FileText aria-hidden width={18} height={18} className="mt-0.5 shrink-0 text-muted" />
                    <span className="min-w-0">
                      <span className="block text-[15px] leading-snug font-semibold">
                        <Highlight text={r.title} query={q} />
                      </span>
                      {r.section && <span className="mt-0.5 block text-sm text-muted">{r.section}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p id={listId} className="px-4 py-3 text-[15px] text-muted">
              No matching articles
            </p>
          )}
          <a href={allResultsHref} className="help-search-all block border-t border-line px-4 py-3 text-sm font-semibold text-primary hover:bg-surface hover:text-primary-hover">
            See all results for “{q}”
          </a>
        </div>
      )}
    </form>
  )
}

/** Bold the words the visitor typed */
function Highlight({text, query}: {text: string; query: string}) {
  const words = query
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (words.length === 0) return <>{text}</>
  const parts = text.split(new RegExp(`(${words.join('|')})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-transparent text-primary-hover">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

'use client'

import {Search} from 'lucide-react'
import {useEffect, useMemo, useState} from 'react'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'

/**
 * Reseller finder from the live /resellers page (checked 2026-10-14).
 * Live loads https://goiguide.com/assets/resellers.csv on every visit (cache-busted),
 * so the list can be edited without touching the page; this keeps the same file path.
 * Columns used: Name, Locations (comma-separated), Contact, Email, Phone, Mobile,
 * Address, Description, Website (comma-separated, one per location).
 */
const CSV_PATH = '/assets/resellers.csv'

type Reseller = Record<string, string>

/**
 * The CSV is saved from Excel, which writes Windows-1252, not UTF-8: read as UTF-8, names like
 * "Fermín Díaz" showed as "Fermin D?az". Read it as UTF-8 when it is, otherwise as Windows-1252.
 */
function decodeCsv(buffer: ArrayBuffer) {
  try {
    return new TextDecoder('utf-8', {fatal: true}).decode(buffer)
  } catch {
    return new TextDecoder('windows-1252').decode(buffer)
  }
}

/** Reads a quoted run starting just after its opening quote; `""` is an escaped quote. */
function readQuoted(text: string, start: number) {
  let value = ''
  let i = start
  while (i < text.length) {
    if (text[i] !== '"') {
      value += text[i]
      i++
    } else if (text[i + 1] === '"') {
      value += '"'
      i += 2
    } else {
      return {value, end: i + 1}
    }
  }
  return {value, end: i}
}

/** Splits CSV text into rows of fields (quoted fields, escaped quotes, CRLF) */
function csvRows(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  const endField = () => {
    row.push(field)
    field = ''
  }
  const endRow = () => {
    endField()
    rows.push(row)
    row = []
  }
  let i = 0
  while (i < text.length) {
    const c = text[i]
    if (c === '"') {
      const quoted = readQuoted(text, i + 1)
      field += quoted.value
      i = quoted.end
    } else if (c === ',') {
      endField()
      i++
    } else if (c === '\n' || c === '\r') {
      i += c === '\r' && text[i + 1] === '\n' ? 2 : 1
      endRow()
    } else {
      field += c
      i++
    }
  }
  if (field || row.length) endRow()
  return rows
}

/** Minimal RFC 4180 CSV parser, header row → objects */
function parseCsv(text: string): Reseller[] {
  const [header = [], ...data] = csvRows(text)
  const keys = header.map((h) => h.replace(/^\uFEFF/, '').trim())
  return data
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ''])))
    .filter((r) => Object.values(r).some((v) => v && v.trim() !== ''))
}

const split = (value?: string) => (value ? value.split(',').map((v) => v.trim()).filter(Boolean) : [])

export function ResellerDirectory() {
  const [resellers, setResellers] = useState<Reseller[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [term, setTerm] = useState('')
  const [location, setLocation] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${CSV_PATH}?ts=${Date.now()}`, {cache: 'no-store'})
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.arrayBuffer()
      })
      .then(decodeCsv)
      .then((text) => {
        const rows = parseCsv(text)
        rows.sort((a, b) => (split(a.Locations)[0] ?? '').toLowerCase().localeCompare((split(b.Locations)[0] ?? '').toLowerCase()))
        setResellers(rows)
      })
      .catch(() => setFailed(true))
  }, [])

  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const r of resellers ?? []) for (const loc of split(r.Locations)) counts[loc] = (counts[loc] || 0) + 1
    return counts
  }, [resellers])

  const visible = (resellers ?? []).filter((r) => {
    const locs = split(r.Locations).map((l) => l.toLowerCase())
    if (location && !locs.includes(location.toLowerCase())) return false
    if (term) return Object.values(r).join(' ').toLowerCase().includes(term.toLowerCase().trim())
    return true
  })

  const websiteFor = (r: Reseller) => {
    const locs = split(r.Locations).map((l) => l.toLowerCase())
    const sites = split(r.Website)
    if (location) {
      const i = locs.indexOf(location.toLowerCase())
      if (i !== -1 && sites[i]) return sites[i]
    }
    return sites[0]
  }

  return (
    <div>
      <div className="relative">
        <label htmlFor="reseller-search" className="sr-only">
          Search by country or region
        </label>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          id="reseller-search"
          className="search h-12 w-full rounded-lg border border-muted bg-white pr-3 pl-10 text-base text-ink placeholder:text-muted focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          type="text"
          placeholder="Search by country or region"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value)
            setLocation(null)
          }}
        />
      </div>

      {failed && <p className="mt-8 text-body">The reseller list could not be loaded. Please try again later.</p>}

      {resellers && (
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,15%)_minmax(0,85%)] lg:gap-12">
          <div className="min-w-0">
            <h2 className="type-heading-xs mb-3 text-ink">
              Locations <span>({Object.keys(locationCounts).length})</span>
            </h2>
            <ul className="flex gap-4 overflow-x-auto pb-4 md:flex-col md:gap-2 md:pb-0">
              {Object.keys(locationCounts)
                .sort((a, b) => a.localeCompare(b))
                .map((loc) => {
                  const active = location === loc
                  return (
                    <li key={loc} className="shrink-0">
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setLocation(active ? null : loc)}
                        className={cn('location-filters text-left font-medium whitespace-nowrap hover:text-primary-hover md:whitespace-normal', active && 'active text-primary')}
                      >
                        {loc} ({locationCounts[loc]})
                        {active && (
                          <span className="chip-close ml-2 font-semibold text-ink" aria-hidden>
                            ×
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className="min-w-0">
            <p className="result-count mb-4 font-medium" aria-live="polite">
              {visible.length} result{visible.length === 1 ? '' : 's'} found
            </p>
            <ul className="grid gap-6 md:grid-cols-2">
              {visible.map((r, i) => {
                const site = websiteFor(r)
                return (
                  <li key={`${r.Name}-${i}`} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h3 className="type-heading-md flex-1 break-words text-ink">{r.Name}</h3>
                      {split(r.Locations).length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                          {split(r.Locations).map((loc) => (
                            <span key={loc} className="rounded-[28px] bg-cream px-3 py-2 text-xs font-semibold text-ink">
                              {loc}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-6 space-y-1">
                      {r.Contact && (
                        <p>
                          <strong>Contact:</strong> {r.Contact}
                        </p>
                      )}
                      {r.Email && (
                        <p>
                          <strong>Email:</strong> <a href={`mailto:${r.Email}`}>{r.Email}</a>
                        </p>
                      )}
                      {r.Phone && (
                        <p>
                          <strong>Phone:</strong> {r.Phone}
                        </p>
                      )}
                      {r.Mobile && (
                        <p>
                          <strong>Mobile:</strong> {r.Mobile}
                        </p>
                      )}
                      {r.Address && (
                        <p>
                          <strong>Address:</strong> {r.Address}
                        </p>
                      )}
                    </div>
                    {r.Description && <p className="mt-6">{r.Description}</p>}
                    {site && (
                      <a href={site} target="_blank" rel="noopener noreferrer" className="card-link mt-6 text-link">
                        Visit website
                        <ArrowRight width={20} height={20} />
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

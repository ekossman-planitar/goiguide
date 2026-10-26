import {Check, X} from 'lucide-react'
import {cn} from '@/lib/cn'

/**
 * A text cell shows ✓ (ours) or ✗ (theirs) beside the text; `marks: false` shows the text alone.
 * A true/false cell shows only ✓ or ✗ (e.g. both columns ✓ for a shared feature).
 */
export type CompareRow = {label: string; ours: string | boolean; theirs: string | boolean; marks?: boolean}

function Mark({ok}: Readonly<{ok: boolean}>) {
  return ok ? (
    <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
  ) : (
    <X aria-hidden strokeWidth={2.5} className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
  )
}

/** Two-column comparison: iGuide vs. alternatives, row by row. */
export function CompareTable({
  rows,
  columns,
  caption,
  footnote,
}: Readonly<{
  rows: CompareRow[]
  columns: {label: string; ours: string; theirs: string}
  caption: string
  footnote?: string
}>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <table className="w-full border-collapse text-left text-base leading-6">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-surface text-sm font-semibold tracking-wide text-ink uppercase">
            <th scope="col" className="px-5 py-4 max-md:hidden">
              {columns.label}
            </th>
            <th scope="col" className="px-5 py-4 text-primary">
              {columns.ours}
            </th>
            <th scope="col" className="px-5 py-4 text-muted">
              {columns.theirs}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-line align-top">
              <th scope="row" className="px-5 py-3 font-semibold text-ink max-md:hidden">
                {row.label}
              </th>
              {[
                {key: 'ours', value: row.ours, ours: true},
                {key: 'theirs', value: row.theirs, ours: false},
              ].map((cell) => (
                <td key={cell.key} className={cn('px-5 py-3', cell.ours ? 'text-ink' : 'text-muted')}>
                  {/* On phones the row label sits above each value */}
                  <span className="mb-1 block text-xs font-semibold text-muted uppercase md:hidden">{row.label}</span>
                  {typeof cell.value === 'boolean' ? (
                    <span className="flex gap-2.5">
                      <Mark ok={cell.value} />
                      <span className="sr-only">{cell.value ? 'Yes' : 'No'}</span>
                    </span>
                  ) : (
                    <span className="flex gap-2.5">
                      {row.marks !== false && <Mark ok={cell.ours} />}
                      {cell.value}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && <p className="border-t border-line px-5 py-3 text-sm text-muted">{footnote}</p>}
    </div>
  )
}

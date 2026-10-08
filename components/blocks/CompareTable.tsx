import {cn} from '@/lib/cn'

export type CompareRow = {label: string; ours: string; theirs: string}

function Mark({ok}: {ok: boolean}) {
  return ok ? (
    <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12.5 10 17 19 7" />
    </svg>
  ) : (
    <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

/** Two-column comparison: iGUIDE vs. alternatives, row by row. */
export function CompareTable({
  rows,
  columns,
  caption,
  footnote,
}: {
  rows: CompareRow[]
  columns: {label: string; ours: string; theirs: string}
  caption: string
  footnote?: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7edf6] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
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
            <tr key={row.label} className="border-t border-[#e7edf6] align-top">
              <th scope="row" className="px-5 py-3 font-semibold text-ink max-md:hidden">
                {row.label}
              </th>
              {[
                {text: row.ours, ok: true},
                {text: row.theirs, ok: false},
              ].map((cell) => (
                <td key={cell.text} className={cn('px-5 py-3', cell.ok ? 'text-ink' : 'text-muted')}>
                  {/* On phones the row label sits above each value */}
                  <span className="mb-1 block text-xs font-semibold text-muted uppercase md:hidden">{row.label}</span>
                  <span className="flex gap-2.5">
                    <Mark ok={cell.ok} />
                    {cell.text}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && <p className="border-t border-[#e7edf6] px-5 py-3 text-sm text-muted">{footnote}</p>}
    </div>
  )
}

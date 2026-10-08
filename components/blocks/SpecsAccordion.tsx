import {ChevronDown} from '@/components/ui/icons'

export type SpecGroup = {heading: string; rows: [label: string, value: string][]}

/** Collapsible technical specifications table. */
export function SpecsAccordion({title, groups}: {title: string; groups: SpecGroup[]}) {
  return (
    <details className="group rounded-2xl border border-[#e7edf6] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-ink hover:text-primary [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown width={20} height={20} className="shrink-0 text-primary transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-8 px-6 pb-8 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.heading}>
            <h4 className="font-bold text-ink">{g.heading}</h4>
            <dl className="mt-3 divide-y divide-line border-y border-line text-sm leading-5">
              {g.rows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-2.5">
                  <dt className="font-medium text-ink">{label}</dt>
                  <dd className="text-body">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </details>
  )
}

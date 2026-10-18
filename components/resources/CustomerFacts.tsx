import {Button} from '@/components/ui/Button'
import type {CtaLink} from '@/sanity/lib/types'

/** The customer details box on customer stories (Location, Industry, Use case…), with its button. */
export function CustomerFacts({facts, cta}: {facts: {_key: string; label: string; value: string}[]; cta?: CtaLink | null}) {
  return (
    <aside aria-label="Customer details" className="rounded-2xl border border-line bg-surface p-6">
      <dl className="space-y-4">
        {facts.map((f) => (
          <div key={f._key}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</dt>
            <dd className="mt-1 font-medium leading-snug text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      {cta?.href && (
        <Button href={cta.href} className="mt-6 w-full justify-center">
          {cta.label || 'Book a demo'}
        </Button>
      )}
    </aside>
  )
}

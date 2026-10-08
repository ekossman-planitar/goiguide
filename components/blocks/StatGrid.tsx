import {cn} from '@/lib/cn'

export type Stat = {value: string; label?: string; text: string}

/** Large figures with a short explanation each. */
export function StatGrid({stats}: {stats: Stat[]}) {
  return (
    <dl className={cn('grid gap-6', stats.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4')}>
      {stats.map((stat) => (
        <div key={stat.value} className="flex flex-col rounded-2xl border border-[#e7edf6] bg-white p-8 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
          <dt className="order-1">
            <span className="block text-4xl leading-tight font-bold text-primary md:text-5xl">{stat.value}</span>
            {stat.label && <span className="mt-1 block text-xl font-bold text-ink">{stat.label}</span>}
          </dt>
          <dd className="order-2 mt-4 text-base leading-6 text-body">{stat.text}</dd>
        </div>
      ))}
    </dl>
  )
}

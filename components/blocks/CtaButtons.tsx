import {Button} from '@/components/ui/Button'
import {cn} from '@/lib/cn'
import type {Cta} from './types'

export function CtaButtons({ctas, className}: {ctas: Cta[]; className?: string}) {
  if (!ctas.length) return null
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {ctas.map((cta) => (
        <Button key={cta.label} href={cta.href} size="lg" variant={cta.variant ?? 'primary'} className={cta.className} newTab={cta.newTab}>
          {cta.label}
        </Button>
      ))}
    </div>
  )
}

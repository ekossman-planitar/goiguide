import type {Cta} from '@/components/blocks/types'

/**
 * Booking buttons. On the live site these carry the `openCalendly` class, which
 * opens the Calendly + HubSpot booking pop-up. The class is kept so GTM triggers
 * keep matching; until that script is ported they fall back to /book-a-demo.
 */
export const book = (label = 'Book your personalized product tour'): Cta => ({
  label,
  href: '/book-a-demo',
  className: 'openCalendly',
})

export const shopPlanix: Cta = {label: 'Shop PLANIX R1', href: 'https://store.goiguide.com/', variant: 'secondary'}

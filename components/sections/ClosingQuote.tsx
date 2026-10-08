import {FallbackImage} from '@/components/ui/FallbackImage'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'

type Props = {
  quote: string
  name: string
  role: string
  company: string
  /** Headshot path in /public */
  image: string
  primary: {label: string; href: string}
  secondary: {label: string; href: string}
}

/** Closing testimonial with headshot and the two main calls to action. */
export function ClosingQuote({quote, name, role, company, image, primary, secondary}: Props) {
  return (
    <section className="py-16 lg:py-[60px]">
      <Container>
        <figure className="grid items-center gap-8 overflow-hidden rounded-2xl bg-sky px-6 pt-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12 md:px-12 md:pt-12">
          <div className="relative mx-auto aspect-[4/5] w-56 self-end md:w-full">
            <FallbackImage
              src={image}
              alt={name}
              fill
              sizes="280px"
              className="object-contain object-bottom"
              fallback={<div className="h-full w-full rounded-t-2xl bg-white/60" />}
            />
          </div>
          <div className="pb-10 md:pb-12">
            <span aria-hidden className="block text-6xl leading-none font-bold text-brand">“</span>
            <blockquote className="mt-2 text-2xl leading-[1.35] font-semibold text-ink md:text-[32px] md:leading-[1.3]">
              {quote}
            </blockquote>
            <figcaption className="mt-6 text-base">
              <span className="font-semibold text-ink">{name}</span>
              <span className="text-muted">
                {' '}
                / {role}, {company}
              </span>
            </figcaption>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primary.href} size="lg">
                {primary.label}
              </Button>
              <Button href={secondary.href} size="lg" variant="secondary">
                {secondary.label}
              </Button>
            </div>
          </div>
        </figure>
      </Container>
    </section>
  )
}

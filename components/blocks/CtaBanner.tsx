import {Container} from '@/components/ui/Container'
import {CtaButtons} from './CtaButtons'
import type {Cta} from './types'

/** Closing call-to-action band. */
export function CtaBanner({heading, text, ctas}: {heading: string; text?: string; ctas: Cta[]}) {
  return (
    <section className="py-16 lg:py-[60px]">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-sky px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="max-w-2xl">
            <h2 className="text-[28px] leading-tight font-bold text-ink md:text-[32px]">{heading}</h2>
            {text && <p className="mt-3 text-lg leading-7 text-muted">{text}</p>}
          </div>
          <CtaButtons ctas={ctas} className="shrink-0" />
        </div>
      </Container>
    </section>
  )
}

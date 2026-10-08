import {ResourceCard} from '@/components/resources/ResourceCard'
import {Container} from '@/components/ui/Container'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import type {ResourceCardData} from '@/sanity/lib/types'

type Props = {
  heading: string
  subheading?: string
  link: {label: string; href: string}
  items: ResourceCardData[]
}

/** Newest Resource Center items, using the same cards as /resource-center. Hidden when empty. */
export function LatestResources({heading, subheading, link, items}: Props) {
  if (!items.length) return null
  return (
    <section className="py-16 lg:py-[60px]">
      <Container>
        <SectionHeading align="center" heading={heading} subheading={subheading} className="max-w-3xl" />
        <div className="mt-4 flex justify-center">
          <SmartLink href={link.href} className="group inline-flex items-center gap-1.5 font-semibold text-primary">
            {link.label}
            <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item) => (
            <li key={item._id}>
              <ResourceCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

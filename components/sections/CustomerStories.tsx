'use client'

import {useCallback} from 'react'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {Marquee} from '@/components/ui/Marquee'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'

export type StoryCard = {
  quote: string
  name: string
  role: string
  company: string
  href: string
  /** Path in /public; the company name shows if the file is missing */
  logo: string
}

type Props = {
  /** Each entry is one line on desktop */
  heading: string[]
  subheading?: string
  link?: {label: string; href: string}
  stories: StoryCard[]
}

const GAP = 24

/**
 * Layout matches the live site: heading on the left, subheading and link on
 * the right. Below, an endless auto-scrolling, draggable row of story cards
 * (3 visible on desktop, 2 on tablet, 1 on mobile).
 */
export function CustomerStories({heading, subheading, link, stories}: Props) {
  const cardWidth = useCallback((viewport: number) => {
    const perView = viewport >= 1024 ? 3 : viewport >= 640 ? 2 : 1.15
    return (viewport - GAP * (Math.ceil(perView) - 1)) / perView
  }, [])

  return (
    <section className="bg-sky py-16 lg:py-[60px]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          <h2 className="text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal] lg:flex-1">
            {heading.map((line, i) => (
              <span key={line}>
                {i > 0 && <br className="hidden lg:block" />}
                {i > 0 && <span className="lg:hidden"> </span>}
                {line}
              </span>
            ))}
          </h2>
          <div className="lg:flex-1">
            {subheading && <p className="text-xl leading-[30px] text-muted">{subheading}</p>}
            {link && (
              <SmartLink
                href={link.href}
                className="group mt-6 inline-flex items-center gap-1.5 text-base leading-6 font-semibold text-ink hover:text-primary"
              >
                {link.label}
                <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
              </SmartLink>
            )}
          </div>
        </div>

        <Marquee
          label="Customer stories"
          className="mt-10 py-2"
          speed={30}
          gap={GAP}
          draggable={false}
          itemWidth={cardWidth}
          itemKeys={stories.map((story) => story.href)}
          items={stories.map((story) => (
            <StoryCardView key={story.href} story={story} />
          ))}
        />
      </Container>
    </section>
  )
}

function StoryCardView({story}: {story: StoryCard}) {
  return (
    // The whole card links to the story
    <SmartLink
      href={story.href}
      draggable={false}
      aria-label={`Read ${story.company}'s story: ${story.quote}`}
      className="group flex w-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <figure className="flex w-full flex-col rounded-2xl border border-[#e7edf6] bg-white p-8 shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-shadow group-hover:shadow-lg">
        <blockquote className="flex-1">
          <p className="text-2xl leading-[1.35] font-semibold text-ink">
            <span aria-hidden className="mr-1 text-brand">
              “
            </span>
            {story.quote}
            <span aria-hidden className="text-brand">
              ”
            </span>
          </p>
        </blockquote>

        <figcaption className="mt-8 border-t border-line pt-6">
          {/* Name and role on the left, company logo opposite */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-semibold text-ink">{story.name}</p>
              <p className="text-sm leading-5 text-muted">{story.role}</p>
            </div>
            <div className="flex h-10 shrink-0 items-center">
              <FallbackImage
                src={story.logo}
                alt={story.company}
                width={144}
                height={40}
                draggable={false}
                className="h-8 w-auto max-w-[104px] object-contain object-right sm:h-10 sm:max-w-[128px]"
                fallback={<span className="text-sm font-bold text-ink">{story.company}</span>}
              />
            </div>
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
            Read story
            <ArrowRight width={14} height={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </figcaption>
      </figure>
    </SmartLink>
  )
}

/**
 * Shared layout for the CSC Student Design Challenge pages (/csc and /csc/csc2018–2021).
 * Each page file passes its own copy, links and asset paths (copied from the live page);
 * this builder turns them into the same section order the live pages use.
 */
import type {ReactNode} from 'react'
import type {Block} from '@/components/blocks/Blocks'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import type {Cta, Img} from '@/components/blocks/types'
import {Button} from '@/components/ui/Button'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'

export type CscPage = {
  path: string
  hero: {heading: string; subheading: string; banner: Img; ctas?: Cta[]}
  tour: {src: string; title: string; links: Cta[]}
  winner?: {team: string; school: {label: string; href: string}; image: Img}
  downloads: {title: string; icon: Img; href: string; newTab?: boolean}[]
  map: {src: string; title: string}
  photos: {image: Img; download?: {label: string; href: string}}
  about: {description: string[]; renderings?: Img; developer: {image: Img; href?: string}}
  competition: {
    website: Img
    description: ReactNode
    ctas: Cta[]
    image: Img
  }
  /** Past competitions cards (the 2018 page shows the heading with no cards, so it is left out there) */
  past?: {label: string; href: string; image: Img}[]
}

/** Links shared by every CSC page's tour section (live: venobox video pop-ups; here they open in a new tab). */
export const tourVideoLinks = (measureLabel: string): Cta[] => [
  {label: 'Tour tips', href: 'https://youtu.be/vxHUsp8DDtg', newTab: true},
  {label: measureLabel, href: 'https://youtu.be/iUYMj5L5i7A?si=pEL5iWd-9k_bzXF5', variant: 'secondary', newTab: true},
]

/** Past competition cards shown on /csc and the 2019–2021 pages. */
export const pastCompetitions: NonNullable<CscPage['past']> = [
  {label: 'CSC 2021', href: '/csc/csc2021', image: {src: '/assets/Uploads/past_events_489_eagle.jpg', alt: 'CSC 2021 property, 498 Eagle', width: 625, height: 470}},
  {label: 'CSC 2020', href: '/csc/csc2020', image: {src: '/assets/Uploads/past_events_321_courtland.jpg', alt: 'CSC 2020 property, 321 Courtland', width: 625, height: 470}},
  {label: 'CSC 2019', href: '/csc/csc2019', image: {src: '/assets/Uploads/1655DUPONT.jpg', alt: 'CSC 2019 property, 1655 Dupont', width: 625, height: 470}},
]

/** Shared description paragraph used by the 2018–2021 pages. */
export const competitionDescription =
  'Construction Specifications Canada (CSC) Grand Valley and Toronto Chapters proudly present the annual Student Design Competition open to all current post-secondary school students in Ontario with an interest in construction-related activities including architecture, landscape architecture, engineering, interior design, construction management, innovative products, and manufacturing. Entries can be submitted by individuals, or by teams consisting of up to 4 people.'

/** In-page links under the hero (same three on every CSC page). */
export const cscAnchors = (path: string) => [
  {label: 'iGuide tools', href: `${path}#tools`},
  {label: 'About project', href: `${path}#about`},
  {label: 'Competition information', href: `${path}#competition`},
]

const h3 = 'text-2xl font-semibold leading-[normal] text-ink md:text-[30px]'

function Picture({image, href, className}: Readonly<{image: Img; href?: string; className?: string}>) {
  const img = (
    <FallbackImage
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1431}
      height={image.height ?? 430}
      sizes="(min-width: 1280px) 1200px, 100vw"
      className={className ?? 'h-auto w-full rounded-2xl'}
      fallback={<div className="aspect-[3/1] w-full rounded-2xl bg-surface" />}
    />
  )
  if (!href) return img
  return (
    <SmartLink href={href} target="_blank" rel="noopener noreferrer" className="block">
      {img}
    </SmartLink>
  )
}

export function cscBlocks(p: CscPage): Block[] {
  const blocks: Block[] = [
    {
      type: 'hero',
      heading: p.hero.heading,
      subheading: p.hero.subheading,
      ctas: p.hero.ctas,
      media: {type: 'image', image: p.hero.banner},
    },
    {
      type: 'custom',
      id: 'tools',
      heading: 'iGuide Tools',
      children: (
        <div className="space-y-16">
          <div>
            <h3 className={h3}>iGuide Tour</h3>
            <MediaView media={{type: 'embed', src: p.tour.src, title: p.tour.title, aspect: 'aspect-[100/57]'}} className="mt-6" />
            <CtaButtons ctas={p.tour.links} className="mt-8" />
          </div>

          {p.winner && (
            <div>
              <h3 className={h3}>Winning Submission</h3>
              <p className="mt-4 text-lg leading-7 text-body">
                <strong className="text-ink">Team Name:</strong> {p.winner.team}
                <br />
                <strong className="text-ink">School:</strong>{' '}
                <SmartLink href={p.winner.school.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                  {p.winner.school.label}
                </SmartLink>
              </p>
              <Picture image={p.winner.image} className="mt-6 h-auto w-full rounded-2xl" />
            </div>
          )}

          <div>
            <h3 className={h3}>Floor Plan Downloads</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.downloads.map((d) => (
                <li key={d.href} className="flex flex-col gap-5 rounded-2xl bg-surface p-7">
                  <FallbackImage
                    src={d.icon.src}
                    alt={d.icon.alt}
                    width={d.icon.width ?? 623}
                    height={d.icon.height ?? 974}
                    className="h-40 w-auto self-start object-contain"
                    fallback={<span className="block h-40 w-28 rounded-xl bg-white" aria-hidden />}
                  />
                  <h4 className="type-heading-md text-ink">{d.title}</h4>
                  <Button href={d.href} size="lg" newTab={d.newTab} className="mt-auto self-start">
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={h3}>Property Map</h3>
            <MediaView media={{type: 'embed', src: p.map.src, title: p.map.title, aspect: 'aspect-[4/3] sm:aspect-video'}} className="mt-6" />
          </div>

          <div>
            <h3 className={h3}>Property Photos</h3>
            <Picture image={p.photos.image} className="mt-6 h-auto w-full rounded-2xl" />
            {p.photos.download && (
              <Button href={p.photos.download.href} size="lg" className="mt-8">
                {p.photos.download.label}
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      type: 'custom',
      id: 'about',
      heading: 'About Project',
      background: 'surface',
      children: (
        <div className="space-y-12">
          <div>
            <h3 className={h3}>Description</h3>
            <div className="mt-5 max-w-4xl space-y-4 text-lg leading-7 text-body">
              {p.about.description.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </div>
          {p.about.renderings && (
            <div>
              <h3 className={h3}>Developer Renderings</h3>
              <Picture image={p.about.renderings} className="mt-6 h-auto w-full rounded-2xl" />
            </div>
          )}
          <div>
            <h3 className={h3}>Developer Information</h3>
            <div className="mt-6">
              <Picture image={p.about.developer.image} href={p.about.developer.href} />
            </div>
          </div>
        </div>
      ),
    },
    {
      type: 'custom',
      id: 'competition',
      heading: 'CSC Competition Information',
      children: (
        <div className="space-y-16">
          <div>
            <h3 className={h3}>CSC Competition Website</h3>
            <div className="mt-6">
              <Picture image={p.competition.website} href="https://www.cscdesignchallenge.ca/" />
            </div>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <h3 className={h3}>Competition Description</h3>
              <div className="mt-5 space-y-4 text-lg leading-7 text-body [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2">
                {p.competition.description}
              </div>
              <CtaButtons ctas={p.competition.ctas} className="mt-8" />
            </div>
            <div className="min-w-0">
              <Picture image={p.competition.image} />
            </div>
          </div>
        </div>
      ),
    },
  ]

  if (p.past?.length) {
    blocks.push({
      type: 'custom',
      heading: 'Past Competitions',
      align: 'center',
      background: 'surface',
      children: (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.past.map((c) => (
            <li key={c.href} className="flex flex-col gap-6 rounded-2xl bg-white p-7">
              <FallbackImage
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width ?? 625}
                height={c.image.height ?? 470}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full rounded-xl"
                fallback={<div className="aspect-[4/3] w-full rounded-xl bg-surface" />}
              />
              <Button href={c.href} size="lg" className="self-start">
                {c.label}
              </Button>
            </li>
          ))}
        </ul>
      ),
    })
  }

  return blocks
}

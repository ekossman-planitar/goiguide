/** /reports/framing-whats-next-2026 — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {ReactNode} from 'react'
import type {Block} from '@/components/blocks/Blocks'
import type {Cta} from '@/components/blocks/types'
import {MediaView} from '@/components/blocks/MediaView'
import {Button} from '@/components/ui/Button'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: 'Real estate photography industry outlook 2026 | iGUIDE',
  description:
    'Explore the 2026 real estate photography industry outlook with insights from 10 creators on trends, workflows, AI adoption and where the field is heading.',
  path: '/reports/framing-whats-next-2026',
}

/** Live: HubSpot CTA tracking redirect to the report download */
const REPORT_URL =
  'https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLLKKdFIdAae2dSX2bEfFr%2FtRxDnkMBr5GhhijVKhltjO0LnC0F%2B3nGliehHoG8SJvkxby2iTeZhKiqQGa1nkC0B51UPod2ed2GkHd8CiQLOYV4%3D&webInteractiveContentId=206886030187&portalId=6828755'
const download: Cta = {label: 'Download the full report', href: REPORT_URL, newTab: true}
const cover = {src: '/assets/Framing-Whats-Next-Industry-Report-iGUIDE-1.jpg', alt: 'Real estate photography industry outlook 2026 report cover'}

const trends: {label: string; text: ReactNode}[] = [
  {
    label: '2026 market predictions and growth trends',
    text: (
      <>
        Buyer behaviour is shifting fast. With <strong>74% of buyers starting online</strong> and professional photos driving{' '}
        <strong>61% more views</strong> and <strong>50% faster sales</strong>, the report shows why clear, accurate visuals—and fast delivery—will
        matter more than ever in 2026.
      </>
    ),
  },
  {
    label: 'Lessons from scaling top real estate photography businesses',
    text: (
      <>
        Growth isn’t magic. Northern Spruce Media’s jump from <strong>$30,000 to over $1 million</strong> with a <strong>20-person team</strong>{' '}
        shows what happens when you document your process, train consistently and make the client experience easy from start to finish.
      </>
    ),
  },
  {
    label: 'Tech adoption and the AI advantage',
    text: (
      <>
        AI isn’t a trend—it’s part of the workflow now. With <strong>71% of real-estate photographers using AI tools</strong> and some reporting{' '}
        <strong>up to 90% faster editing</strong>, the report breaks down where automation genuinely helps and where human judgment still carries
        the work.
      </>
    ),
  },
  {
    label: 'How creators stay competitive',
    text: (
      <>
        There’s a major opportunity hiding in plain sight. Listings with video get <strong>403% more inquiries</strong>, yet only{' '}
        <strong>38% of agents use video</strong> and just <strong>9% create listing videos</strong>. Add in the fact that{' '}
        <strong>73% of consumers</strong> value the overall experience as much as the product, and it’s clear: reliability, communication and a
        clean process now separate the great from the good.
      </>
    ),
  },
  {
    label: 'Actionable insights to strengthen your business',
    text: (
      <>
        The contributors keep it simple: tighten your systems, make booking and delivery effortless and back your visuals with data clients can
        trust. With <strong>86% of buyers</strong> relying on listing photos and <strong>72% of agents</strong> saying great photos help win
        listings, the fundamentals still move the needle.
      </>
    ),
  },
]

const videos = [
  'https://www.youtube.com/embed/BNQ3BWKMlS4?si=EPLD8aJE6Q7N4gBw',
  'https://www.youtube.com/embed/fYL2-T5BVNs?si=hLPpw8JP00Q9GVsr',
  'https://www.youtube.com/embed/_h58wbsr_Hw?si=QbgTP-kNXw39QQO4',
  'https://www.youtube.com/embed/tHkAhjSXEj0?si=NuMsyCtkqJxgyLYK',
]

const contributors: {photo: string; name: string; role: string; company: string; bio: string}[] = [
  {
    photo: '/assets/reed-fish-upmarket.jpeg',
    name: 'Reed Fish',
    role: 'CEO',
    company: 'Upmarket Media',
    bio: 'Reed Fish turned burnout into balance by merging with his biggest competitor and building Upmarket Media around teamwork and sanity. Through the Upmarket Podcast, he’s helped creators find connection in a lonely industry, proving that collaboration beats competition.',
  },
  {
    photo: '/assets/nathan-cool-photography.jpeg',
    name: 'Nathan Cool',
    role: 'Owner',
    company: 'Nathan Cool Photo',
    bio: 'Nathan Cool built one of the most trusted voices in real-estate media by combining an engineer’s precision with a creator’s eye. His philosophy is simple: skip the hype, master your systems and let reliability and service speak louder than trends.',
  },
  {
    photo: '/assets/Matthew_Anderson.jpg',
    name: 'Matthew Anderson',
    role: 'Owner',
    company: 'Matthew Anderson Photography',
    bio: 'Matthew Anderson turned a karaoke night conversation into a thriving photography career built on authenticity, education and ease of service. From real estate to architecture and design, he’s proved that keeping things real never goes out of style.',
  },
  {
    photo: '/assets/cheyenne-crawford-infinite-views.jpeg',
    name: 'Cheyenne Crawford',
    role: 'General Manager',
    company: 'Infinite Views',
    bio: 'Cheyenne Crawford went from late night edits to leading one of the top real-estate media teams in the South. Known for her clean, story-driven aesthetic, she proves that ambition scales best when paired with structure.',
  },
  {
    photo: '/assets/alex-coombs-northern-spruce-media.jpeg',
    name: 'Alex Coombs',
    role: 'Owner',
    company: 'Northern Spruce Media',
    bio: 'Northern Spruce Media is an Ontario-based creative studio serving 600+ real-estate clients with full-service photo, video, design and storytelling. Founded by Alex Coombs in 2016, it has grown from a one-woman operation to a million-dollar firm.',
  },
  {
    photo: '/assets/Brandon_Cooper.jpg',
    name: 'Brandon Cooper',
    role: 'Owner',
    company: 'RealPics',
    bio: 'From solo creator to community builder, Brandon Cooper turned the isolation of real-estate photography into PMRE, the world’s largest gathering of real-estate media professionals. Today, the event reflects a maturing industry where collaboration, systems and business mindset matter as much as the work itself.',
  },
  {
    photo: '/assets/fraser-almeida-luxury-homes.jpeg',
    name: 'Fraser Almeida',
    role: 'Owner',
    company: 'Luxury Homes Photography',
    bio: 'Fraser Almeida turned a single referral shoot into a 13-year career defining Las Vegas luxury real-estate photography. His playbook blends artistic intent, disciplined business systems and an unwavering focus on client experience.',
  },
  {
    photo: '/assets/dominic-wilkerson-dom-does-media.jpeg',
    name: 'Dominic Wilkerson',
    role: 'Owner',
    company: 'Dom Does Media',
    bio: 'After breaking his leg twice in the Air Force, Dominic Wilkerson traded patrol shifts for property shoots. Eight years later, he runs one of Washington’s busiest real-estate media companies built on discipline, efficiency and integrity.',
  },
  {
    photo: '/assets/phil-maurion-visual-advantage.jpeg',
    name: 'Phil Maurion',
    role: 'Founder & CEO',
    company: 'Visual Advantage Inc.',
    bio: 'Phil Maurion launched Visual Advantage in 2009, blending his love of real estate with hard-earned startup experience. With a newborn at home and a camera in hand, he turned a small creative experiment into one of Ontario’s most recognized visual marketing firms built on quality, consistency and an almost obsessive focus on customer service.',
  },
  {
    photo: '/assets/chris-white-iguide.jpeg',
    name: 'Chris White',
    role: 'Product Manager',
    company: 'iGUIDE',
    bio: 'Chris White believes the next wave of real-estate marketing won’t just change how properties are shown, it will change what buyers believe is real. As AI tools blur the line between accuracy and artistry, he argues that trust, transparency and a sense of humour may be what keep the industry grounded.',
  },
]

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Real estate photography industry outlook 2026',
    subheading: 'A practical, data-backed report featuring insights from 10 leading real-estate media creators.',
    ctas: [download],
    media: {type: 'image', image: cover},
  },
  {
    type: 'custom',
    id: 'section-2',
    background: 'surface',
    heading: 'Key trends shaping real estate photography in 2026',
    children: (
      <>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trends.map((t) => (
            <li key={t.label} className="rounded-2xl border border-[#e4e4e7] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
              <h3 className="text-xl font-semibold text-ink">{t.label}</h3>
              <p className="mt-3 text-base leading-6 text-body">{t.text}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center rounded-2xl bg-primary p-6 text-white">
            <p className="text-xl font-semibold">Dive into the data and continue reading</p>
            <Button href={REPORT_URL} size="lg" variant="secondary" newTab className="mt-6 w-fit">
              Download the full report
            </Button>
          </li>
        </ul>
      </>
    ),
  },
  {
    type: 'custom',
    id: 'section-3',
    heading: 'Insights from creators shaping real estate photography in 2026',
    subheading:
      "Meet the creators and entrepreneurs sharing their perspectives on what's next. Their views on scaling, technology and creativity inform the foundation of this year's report.",
    children: (
      <>
        {/* Live: swipeable one-at-a-time carousel of these four videos */}
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((src, i) => (
            <MediaView key={src} media={{type: 'embed', src, title: `Creator insights video ${i + 1}`}} />
          ))}
        </div>
        <h3 className="mt-16 text-[28px] font-semibold text-ink md:text-[32px]">Contributors</h3>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {contributors.map((c) => (
            <li key={c.name} className="flex flex-col rounded-2xl border border-[#e4e4e7] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
              <FallbackImage
                src={c.photo}
                alt={c.name}
                width={400}
                height={400}
                sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw"
                className="aspect-square w-full rounded-xl object-cover"
                fallback={<div className="aspect-square w-full rounded-xl bg-surface" />}
              />
              <p className="mt-4 font-semibold text-ink">
                {c.name} / {c.role}
              </p>
              <p className="text-sm text-muted">{c.company}</p>
              {/* Live: the bio is collapsed until "Read their full bio" is clicked */}
              <details className="group mt-3">
                <summary className="cursor-pointer list-none font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  Read their full bio <span aria-hidden>›</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-body">{c.bio}</p>
              </details>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    type: 'split',
    id: 'section-5',
    background: 'sky',
    heading: 'Discover the trends, pressures and possibilities defining real estate media in 2026',
    ctas: [download],
    media: {type: 'image', image: cover},
  },
]

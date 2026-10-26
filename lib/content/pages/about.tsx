/** /about — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: 'Meet iGuide | The Team Behind iGuide | iGuide',
  description:
    'Learn about iGuide, the makers of iGuide. Discover our vision, values, and commitment to sustainability, meet our leadership team, and explore how we’re shaping the future of real estate technology.',
  path: '/about',
}

const leaders = [
  {
    name: 'Jarrad Morden',
    role: 'Chief Executive Officer',
    photo: {src: '/assets/about-jarrad-image.png', alt: 'photo - Jarrad Morden', width: 189, height: 271},
    linkedin:
      'https://www.linkedin.com/in/jarradmorden?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAQvqEUBs-zuZGZjHYNmwPiR3rrJUK4oGF0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BlinT%2B1voQbu3ydBslnmBWg%3D%3D',
  },
  {
    name: 'Skylar Lawrence-LeBel',
    role: 'VP, Growth',
    photo: {src: '/assets/about-skylar-image.png', alt: 'photo - Skylar Lawrence-LeBel', width: 189, height: 271},
    linkedin:
      'https://www.linkedin.com/in/skylarlebel?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAaQL74Briz6rtLvgqd9-0vmZmYb9puBNIY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BxlYnbhTpSpyRY%2BF6r9SKOg%3D%3D',
  },
  {
    name: 'Michael Brown',
    role: 'VP, Engineering',
    photo: {src: '/assets/about-mb-image.png', alt: 'photo - Michael Brown', width: 189, height: 271},
    linkedin: 'https://www.linkedin.com/in/michael-brown-3b09ba96/',
  },
  {
    name: 'Matt Ignor',
    role: 'VP, Operations',
    photo: {src: '/assets/about-mi.png', alt: 'photo - Matt Ignor', width: 635, height: 911},
    linkedin: 'https://www.linkedin.com/in/mattignor/',
  },
]

function LeadershipGrid() {
  return (
    <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {leaders.map((l) => (
        <li key={l.name} className="flex flex-col rounded-2xl border border-line bg-white p-4 shadow-card sm:p-6">
          <FallbackImage
            src={l.photo.src}
            alt={l.photo.alt}
            width={l.photo.width}
            height={l.photo.height}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="aspect-[189/271] h-auto w-full rounded-xl object-cover"
            fallback={<div className="aspect-[189/271] w-full rounded-xl bg-surface" />}
          />
          <h3 className="type-heading-sm mt-5 text-ink">{l.name}</h3>
          <p className="mt-1 flex-1 text-base text-muted">{l.role}</p>
          <a
            href={l.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${l.name} on LinkedIn`}
            className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-primary hover:text-primary-hover"
          >
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Meet iGuide, the team behind iGuide',
    subheading:
      'At iGuide, we believe every space tells a story. iGuide was born in 2013 when co-founders Alex Likholyot and Kevin Klages decided there had to be a better way than misleading floor plans. Their idea paired rock-solid measurements with immersive 3D tours, a simple fix that changed how properties were shared and understood.',
    extra: (
      <p>
        What began with just a handful of projects has grown into over 1 billion ft² mapped, helping people experience spaces in ways that are
        accurate and engaging. And behind it all is a team that believes in doing things right and making property data smarter for everyone.
      </p>
    ),
    media: {type: 'image', image: {src: '/assets/about-team-image.png', alt: 'photo - iGuide Town Hall Meeting', width: 4096, height: 2009}},
  },
  {
    type: 'cards',
    id: 'values',
    heading: 'The vision and values that drive us',
    subheading:
      'A world where people can understand and share spaces with confidence. We believe reliable spatial data should feel simple and accessible, helping everyone make better decisions about the places that matter most.',
    background: 'sky',
    columns: 4,
    cards: [
      {title: 'Integrity', text: 'Do the right thing, even when it’s hard.'},
      {title: 'Teamwork', text: 'One team on a big mission.'},
      {title: 'Innovation', text: 'Creative solutions for emerging opportunities.'},
      {title: 'Accountability', text: 'Honour our commitments.'},
    ],
  },
  {
    type: 'split',
    id: 'sustainability',
    heading: 'Our commitment to sustainability',
    body: (
      <p>
        We care about building technology that makes a difference without adding strain on the planet. From sharing resources online to reducing
        office waste, sustainability is part of how we work every day. And with iGuide, we help cut down on travel and extra site visits, lowering
        the footprint across the industries we serve.
      </p>
    ),
    media: {type: 'image', image: {src: '/assets/about-kyle-image.png', alt: 'photo - Assembling the PLANIX Camera System', width: 3840, height: 2160}},
    mediaClassName: 'rounded-2xl',
  },
  {
    type: 'custom',
    id: 'leadership',
    heading: 'Leadership at iGuide',
    subheading:
      'Behind iGuide is a group of leaders who blend experience in technology, real estate, and business with a genuine passion for helping people. Their support and vision keep our mission on track and our team inspired.',
    background: 'surface',
    children: <LeadershipGrid />,
  },
  {
    type: 'split',
    id: 'join',
    heading: 'Become an iGuider and join our mission',
    body: (
      <p>
        We’re looking for passionate people who want to help shape the future of real estate technology. Join our team and be part of making 3D
        visualization more accessible to more people, in more places.
      </p>
    ),
    ctas: [{label: 'View open positions', href: '/careers#apply'}],
    media: {type: 'image', image: {src: '/assets/about-group-shot-image.jpg', alt: 'photo - iGuide Team at  Imaging USA 2025 show', width: 1080, height: 608}},
    mediaSide: 'left',
    mediaClassName: 'rounded-2xl',
  },
]

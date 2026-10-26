/** /pmre-2025 — copy and images from the live page (checked 2026-10-14).
 *  On live, the prize list and key dates were injected by inline scripts; they are plain content here. */
import type {Block} from '@/components/blocks/Blocks'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: 'Explore PMRE 2025 with iGuide | Enter Sweepstakes Now | iGuide',
  description:
    'We’re sending one lucky winner on an all-expenses-paid trip to PMRE 2025, the ultimate real estate media conference in Las Vegas. Flights, hotel, car service, and full-access passes are all covered.',
  path: '/pmre-2025',
}

const prizes = [
  {emoji: '🎫', label: 'Full-access ticket to PMRE', rest: ' (November 18th - 20th, 2025)'},
  {emoji: '✈️', label: 'Round-trip flight', rest: ' from anywhere in the continental US/Canada'},
  {emoji: '🏨', label: '3-night hotel stay', rest: ' at The Palms, Las Vegas'},
  {emoji: '🚗', label: 'Private car service', rest: ' to and from the airport'},
  {emoji: '🎁', label: 'iGuide swag pack', rest: ' to show off at the event'},
]

const dates = [
  {title: '🎟️ Entry Open', desc: 'May 13th, 2025'},
  {title: '🌅 Early Bird Draw', desc: 'July 8th, 2025'},
  {title: '🏆 Grand Prize Draw', desc: 'September 16th, 2025'},
  {title: '🎉 PMRE Event', desc: 'November 18th - 20th, 2025'},
]

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Win* a Trip to PMRE 2025!',
    subheading: 'We’re sending one lucky winner on an all-expenses-paid trip to PMRE 2025, the ultimate real estate media conference in Las Vegas.',
    // Live used this as the hero background
    media: {type: 'image', image: {src: '/assets/Uploads/Road-to-PMRE_-Export.png', alt: 'Road to PMRE', width: 1440, height: 600}},
  },
  {
    type: 'custom',
    id: 'e1990',
    background: 'sky',
    children: (
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-8 text-center shadow-card md:p-10">
        <h2 className="type-h2 text-ink">The Sweepstakes is now closed.</h2>
        <p className="mt-5 text-lg leading-7 text-body">
          Good luck to everyone who entered. Stay tuned to the{' '}
          <a href="https://www.instagram.com/go_iguide/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
            iGuide Instagram
          </a>{' '}
          page to find out who our two winners are!
        </p>
      </div>
    ),
  },
  {
    type: 'custom',
    id: 'e2005',
    heading: 'What you can win',
    subheading: 'A prize package designed to get you to PMRE in style.',
    align: 'center',
    children: (
      // Live showed this list over a confetti background image (served through next/image: the original PNG is 4.4 MB)
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-4 md:p-8">
        <FallbackImage
          src="/assets/Uploads/PMRE_Confetti_May-15th_2025.png"
          alt=""
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
        <ul className="relative space-y-4">
          {prizes.map((p) => (
            <li key={p.label} className="rounded-xl bg-white/95 p-5 text-lg shadow-sm md:p-6">
              <span aria-hidden="true">{p.emoji}</span> <strong className="font-semibold text-ink">{p.label}</strong>
              {p.rest}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    type: 'custom',
    id: 'e2006',
    heading: 'Key dates to keep in mind',
    align: 'center',
    background: 'surface',
    children: (
      <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        {dates.map((d) => (
          <li key={d.title} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-ink">{d.title}</div>
            <div className="mt-2 text-base text-muted">{d.desc}</div>
          </li>
        ))}
      </ul>
    ),
  },
]

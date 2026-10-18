/** /haunted-tours — copy, tours, images and form from the live page (scripts/.import-samples/pg-haunted-tours.html, checked 2026-10-14). */
import type {ReactNode} from 'react'
import type {Block} from '@/components/blocks/Blocks'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: "iGuide Haunted Tours: Discover North America's Haunted Sites | iGuide",
  description:
    'Explore America’s haunted sites with iGuide\'s 3D virtual tours, featuring eerie stories and chilling history for paranormal fans and thrill-seekers alike.',
  path: '/haunted-tours',
  ogImage: '/assets/iGUIDE_Haunted_Tours_72dpi.jpg',
}

/** Pumpkin border above and spider-web border below each tour, as on live (live alt text kept as is). */
function HauntedTour({src, title}: {src: string; title: string}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <FallbackImage src="/assets/02cb574580/pumpkin_bw.png" alt="Girl in a jacket" width={25011} height={2559} sizes="(min-width: 1280px) 1248px, 100vw" className="h-auto w-full" />
      <div className="relative aspect-[100/57] w-full">
        <iframe src={src} title={title} className="absolute inset-0 h-full w-full border-0" allowFullScreen loading="lazy" />
      </div>
      <FallbackImage src="/assets/8f8319eeb6/spide.png" alt="Girl in a jacket" width={26005} height={2775} sizes="(min-width: 1280px) 1248px, 100vw" className="h-auto w-full" />
    </div>
  )
}

const copy = (children: ReactNode) => <div className="mb-10 max-w-4xl space-y-4 text-xl leading-8 text-body [&_strong]:font-semibold [&_strong]:text-ink">{children}</div>

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Spooktober Series',
    subheading:
      "Explore some of America's most haunting places. Immerse yourself in the 3D virtual tours and uncover the chilling events that took place at each property.",
    ctas: [
      {label: 'Jefferson Hotel', href: '/haunted-tours#jefferson', variant: 'secondary'},
      {label: 'Ma-Barker House', href: '/haunted-tours#barker', variant: 'secondary'},
      // Live button carries the class "Arts Center"; kept in case a GTM trigger uses it
      {label: 'Arts Center', href: '/haunted-tours#arts', variant: 'secondary', className: 'Arts Center'},
    ],
    // Live used this as the hero background
    media: {type: 'image', image: {src: '/assets/Uploads/3-2.png', alt: 'Spooktober Series'}},
  },
  {
    type: 'custom',
    id: 'jefferson',
    heading: 'The Historic Jefferson Hotel',
    background: 'surface',
    children: (
      <>
        {copy(
          <>
            <p>
              Established in 1851, this hotel spans over 13,000 square feet and is filled with unique antiques. It is also known as &quot;
              <strong>The most haunted hotel in the world</strong>&quot;. Each area of The Historic Jefferson Hotel is rich with stories and ghostly
              murmurs, providing a distinct and exciting escape from the everyday.
            </p>
            <p>If you&apos;re curious about ghosts, watch the video in this tour. It will give you goosebumps!</p>
          </>,
        )}
        <HauntedTour src="https://youriguide.com/embed/the-historic-jefferson-hotel?branded=1&autostart=1&bgcolor=FFFFFF" title="iGuide tour of The Historic Jefferson Hotel" />
      </>
    ),
  },
  {
    type: 'custom',
    id: 'barker',
    heading: 'The Bradford-ma Barker House',
    children: (
      <>
        {copy(
          <>
            <p>
              In 1935, this home became famous for being the <strong>location of the longest gun battle in FBI history</strong>.
            </p>
            <p>
              The homeowner, Mr. Carson Bradford, unknowingly leased his place to Ma Barker, a notorious gangster, and her son Fred. They were on the
              run from the FBI, having been declared Public Enemy #1 after the agency caught or killed John Dillinger, Al Capone and Pretty Boy Floyd.
            </p>
            <p>
              As you step through the virtual tour, you’ll notice several bullet holes along the walls and in some of the furniture. You’ll also find a
              few articles that go into this story in more detail.
            </p>
          </>,
        )}
        <HauntedTour src="https://youriguide.com/bradford_ma_barker_house?branded=1&autostart=1&bgcolor=FFFFFF" title="iGuide tour of The Bradford-Ma Barker House" />
      </>
    ),
  },
  {
    type: 'custom',
    id: 'arts',
    heading: 'The Collingwood Arts Center',
    background: 'surface',
    children: (
      <>
        {copy(
          <>
            <p>
              Before it started serving as a hub for community creativity in 1985, the Collingwood Arts Center was a teaching convent for nuns in the
              Ursuline Order of the Sacred Heart.
            </p>
            <p>
              The basement of the Collingwood Arts Center is often described as one of the building&apos;s most haunted spots. It is reported that in
              the 1950s, a distraught nun hung herself. Many claim to have felt an intense and sometimes menacing presence, with a{' '}
              <strong>dark shadowy figure roaming the vast basement corridors</strong>.
            </p>
          </>,
        )}
        <HauntedTour src="https://youriguide.com/embed/2413_collingwood_blvd_toledo_oh?autostart=1&bgcolor=FFFFFF" title="iGuide tour of The Collingwood Arts Center" />
      </>
    ),
  },
  {
    // Live gave this section a duplicate id="arts" too; left without an id so #arts keeps pointing at the Arts Center
    type: 'custom',
    heading: 'Good Family Farm',
    children: (
      <>
        {copy(
          <>
            <p>
              Byron and Karen&apos;s farm has been part of the Good family legacy for over six decades. Since 1994, they’ve been in the pumpkin
              business. It all started with a surplus of pumpkins in their small patch, which they decided to sell at the roadside. They quickly
              realized that people wanted to buy them! With each passing year, the patch expanded to include squash, gourds, straw bales and festive
              corn, offering a full array of fall delights.
            </p>
            <p>
              Today, they cultivate more than 100 different kinds of squash, pumpkins and gourds to cater to their customers&apos; varied tastes and
              decoration ideas. Naturally, they also have plenty of perfect pumpkins ready for carving classic Halloween Jack-O-Lanterns.
            </p>
            <p>If you&apos;re near Kitchener-Waterloo, don&apos;t miss a visit to the Good Family Farm.</p>
          </>,
        )}
        <HauntedTour src="https://youriguide.com/embed/909_bridge_st_e_waterloo_on?autostart=1&bgcolor=FFFFFF" title="iGuide tour of Good Family Farm" />
      </>
    ),
  },
  {
    type: 'custom',
    id: 'e1376',
    heading: 'What haunted property should iGuide visit next?',
    background: 'sky',
    children: (
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-2xl font-semibold text-ink">Let us know!</h3>
          <HubSpotForm formId="850a3110-157b-4f6f-8e0b-b1f40880eda4" className="mt-6 min-h-[320px]" />
        </div>
        <FallbackImage src="/assets/haunted-places-google-maps-2.png" alt="Map Image" width={628} height={468} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full rounded-2xl" />
      </div>
    ),
  },
]

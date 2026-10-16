import {CtaBanner} from '@/components/blocks/CtaBanner'
import {EventsBrowser} from '@/components/events/EventsBrowser'
import type {EventCardData} from '@/components/events/types'
import {Container} from '@/components/ui/Container'
import {book} from '@/lib/content/solutions/shared'
import {EVENTS_PATH} from '@/lib/events'
import {pageMetadata} from '@/lib/pageMetadata'
import {fetchSanity} from '@/sanity/lib/fetch'
import {UPCOMING_EVENTS_QUERY} from '@/sanity/lib/queries'

/** NEW PAGE: upcoming events from Sanity (Studio → Events). Ended events drop off automatically. */
export const revalidate = 60

export const metadata = pageMetadata({
  title: 'Events: Trade Shows, Webinars & Workshops | iGUIDE',
  description: 'Meet the iGUIDE team at upcoming conferences and trade shows, or join a live webinar or workshop.',
  path: EVENTS_PATH,
})

async function getEvents() {
  const events = await fetchSanity<EventCardData[]>(UPCOMING_EVENTS_QUERY, [])
  return {events, fetchedAt: Date.now()}
}

export default async function EventsPage() {
  const {events, fetchedAt} = await getEvents()
  return (
    <>
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-[60px]">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-balance text-[40px] leading-[normal] font-semibold text-ink md:text-[56px]">Events</h1>
            <p className="mt-6 text-xl leading-[30px] text-muted">
              Meet the iGUIDE team at conferences and trade shows, or join us online for live webinars and workshops.
            </p>
          </div>
          <div className="mt-12">
            <EventsBrowser events={events} renderedAt={fetchedAt} />
          </div>
        </Container>
      </section>
      <CtaBanner
        heading="Can’t make it to an event?"
        text="Book a one-on-one demo and see iGUIDE in action at a time that suits you."
        ctas={[book(), {label: 'Watch on-demand webinars', href: '/webinars', variant: 'secondary'}]}
      />
    </>
  )
}

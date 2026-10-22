import {Award, Heart, MessageSquare, MessagesSquare, Users} from 'lucide-react'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {eventPath, typeTitle, zonedDate, DEFAULT_TIME_ZONE} from '@/lib/events'
import {forumAge} from '@/lib/help/format'
import {forumLinks, type ForumBadge, type ForumStats, type ForumTopic} from '@/lib/help/forum'
import type {EventCardData} from '@/components/events/types'

const external = {target: '_blank', rel: 'noopener noreferrer'}
const compact = new Intl.NumberFormat('en', {notation: 'compact', maximumFractionDigits: 1})
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const tierColour: Record<ForumBadge['tier'], string> = {
  Gold: 'bg-[#f5c542] text-ink',
  Silver: 'bg-[#c9ccd1] text-ink',
  Bronze: 'bg-[#cd8b5a] text-white',
}

/**
 * Community Conversations (latest forum topics) with a side column for
 * gamification (community totals + badges, no member names) and upcoming events.
 */
export function HomeCommunity({
  topics,
  stats,
  badges,
  events,
}: Readonly<{
  topics: ForumTopic[]
  stats: ForumStats | null
  badges: ForumBadge[]
  events: EventCardData[]
}>) {
  const hasSide = !!stats || badges.length > 0 || events.length > 0
  if (topics.length === 0 && !hasSide) return null

  return (
    <section aria-labelledby="help-community" className="bg-surface py-14 lg:py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="help-community" className="text-[28px] leading-tight font-semibold text-ink md:text-[36px]">
              Community conversations
            </h2>
            <p className="mt-2 text-lg text-muted">Ask questions, share tips and suggest features with other iGuide operators.</p>
          </div>
          <a href={forumLinks.newTopic} className="help-ask-community inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-4 py-2 font-semibold text-primary hover:border-primary-hover hover:text-primary-hover" {...external}>
            <MessageSquare aria-hidden width={18} height={18} />
            Ask the community
          </a>
        </div>

        <div className={cn('mt-8 grid items-start gap-8', hasSide && 'lg:grid-cols-[minmax(0,1fr)_360px]')}>
          {topics.length > 0 && (
            <div className="rounded-2xl border border-line bg-white">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">Latest</h3>
                <a href={forumLinks.latest} className="text-link text-sm" {...external}>
                  See all
                  <ArrowRight width={14} height={14} />
                </a>
              </div>
              <ul className="divide-y divide-line">
                {topics.map((t) => (
                  <li key={t.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                    <div className="min-w-0 flex-1">
                      <a href={t.url} className="help-forum-topic font-semibold text-ink hover:text-primary-hover" data-category={t.categoryName} {...external}>
                        {t.title}
                      </a>
                      <span className="mt-1 block text-xs font-semibold tracking-wide text-muted uppercase">{t.categoryName}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-5 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5" title="Replies">
                        <MessagesSquare aria-hidden width={16} height={16} />
                        {t.replies}
                        <span className="sr-only">replies</span>
                      </span>
                      <span className="w-16 text-right whitespace-nowrap" title="Last activity">{forumAge(t.lastActivity)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasSide && (
            <div className="space-y-6">
              {(stats || badges.length > 0) && (
                <div className="rounded-2xl border border-line bg-white p-5">
                  {stats && (
                    <>
                      <h3 className="font-display text-lg font-semibold text-ink">Community at a glance</h3>
                      <dl className="mt-4 grid grid-cols-2 gap-3">
                        {[
                          {label: 'Members', value: stats.members, icon: Users},
                          {label: 'Posts', value: stats.posts, icon: MessageSquare},
                          {label: 'Likes given', value: stats.likes, icon: Heart},
                          {label: 'Active this month', value: stats.activeThisMonth, icon: Award},
                        ].map(({label, value, icon: Icon}) => (
                          <div key={label} className="rounded-xl bg-surface p-3">
                            <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
                              <Icon aria-hidden width={14} height={14} />
                              {label}
                            </dt>
                            <dd className="mt-1 font-display text-2xl font-semibold text-ink">{compact.format(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  )}

                  {badges.length > 0 && (
                    <div className={cn(stats && 'mt-6 border-t border-line pt-5')}>
                      <h3 className="font-display text-lg font-semibold text-ink">Earn badges</h3>
                      <p className="mt-1 text-sm text-muted">Get involved on the forum to collect badges and level up.</p>
                      <ul className="mt-4 space-y-3">
                        {badges.map((b) => (
                          <li key={b.id}>
                            <a href={b.url} className="help-forum-badge group flex items-start gap-3" data-badge={b.name} {...external}>
                              <span aria-hidden className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full', tierColour[b.tier])}>
                                <Award width={16} height={16} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[15px] font-semibold text-ink group-hover:text-primary-hover">
                                  {b.name} <span className="font-normal text-muted">· {b.tier}</span>
                                </span>
                                <span className="block text-sm leading-snug text-muted">
                                  {b.description}. Earned by {b.earnedBy.toLocaleString('en')} members.
                                </span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      <a href={forumLinks.signUp} className="help-join-forum mt-5 inline-flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-4 py-2.5 font-semibold text-white hover:border-primary-hover hover:bg-primary-hover" {...external}>
                        Join the forum
                      </a>
                    </div>
                  )}
                </div>
              )}

              {events.length > 0 && (
                <div className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-ink">Upcoming events</h3>
                    <SmartLink href="/events" className="text-link text-sm">
                      See all
                      <ArrowRight width={14} height={14} />
                    </SmartLink>
                  </div>
                  <ul className="mt-4 space-y-4">
                    {events.map((e) => {
                      const {m, d} = zonedDate(e.startAt, e.timeZone || DEFAULT_TIME_ZONE)
                      const place = e.attendance === 'online' ? 'Online' : [e.city, e.region].filter(Boolean).join(', ')
                      return (
                        <li key={e._id}>
                          <SmartLink href={eventPath(e.slug)} className="help-event group flex items-start gap-3">
                            <span aria-hidden className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-surface py-1.5">
                              <span className="text-[11px] font-semibold tracking-wide text-primary-hover">{MONTHS[m - 1]}</span>
                              <span className="font-display text-xl leading-none font-semibold text-ink">{d}</span>
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[15px] leading-snug font-semibold text-ink group-hover:text-primary-hover">{e.title}</span>
                              <span className="mt-0.5 block text-sm text-muted">{[typeTitle(e.eventType), place].filter(Boolean).join(' · ')}</span>
                            </span>
                          </SmartLink>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

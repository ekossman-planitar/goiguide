/**
 * iGuide Forum (forum.goiguide.com, Discourse): public, read-only JSON used
 * on the Help Center homepage. No credentials. No member names or avatars are
 * shown (Evan, 2026-10-20): only topics, community totals and badges.
 * Every function returns null/[] if the forum can't be reached, so the
 * homepage still renders.
 */

export const FORUM_ORIGIN = 'https://forum.goiguide.com'
/** Where the JSON is read from. Override with FORUM_API_ORIGIN (e.g. a local mock). */
const FORUM_API_ORIGIN = process.env.FORUM_API_ORIGIN ?? FORUM_ORIGIN
/** Seconds a forum response is reused (same timer as the Zendesk content) */
const FORUM_REVALIDATE = 120

/** Categories shown in Community Conversations. Camera Buy and Sell (id 14) is left out on purpose. */
export const FORUM_CATEGORIES = [
  {id: 8, slug: 'general-discussion', name: 'General Discussions'},
  {id: 7, slug: 'feature-suggestions', name: 'Feature Suggestions'},
] as const

/** Badges shown in "Earn badges", in this order (forum badge ids) */
const FEATURED_BADGE_IDS = [5, 11, 45, 36, 44, 24]

export const forumLinks = {
  home: FORUM_ORIGIN,
  latest: `${FORUM_ORIGIN}/latest`,
  newTopic: `${FORUM_ORIGIN}/new-topic`,
  signUp: `${FORUM_ORIGIN}/signup`,
  badges: `${FORUM_ORIGIN}/badges`,
}

export type ForumTopic = {
  id: number
  title: string
  url: string
  categoryName: string
  replies: number
  views: number
  likes: number
  lastActivity: string
}
export type ForumStats = {members: number; posts: number; topics: number; likes: number; activeThisMonth: number}
export type ForumBadge = {id: number; name: string; description: string; tier: 'Gold' | 'Silver' | 'Bronze'; earnedBy: number; url: string}

async function forum<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${FORUM_API_ORIGIN}${path}`, {next: {revalidate: FORUM_REVALIDATE, tags: ['help-forum']}, headers: {accept: 'application/json'}})
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as T
  } catch (error) {
    console.error(`[forum] ${path} failed`, error)
    return null
  }
}

type DiscourseTopic = {
  id: number
  title: string
  slug: string
  reply_count: number
  views: number
  like_count: number
  last_posted_at: string | null
  bumped_at: string
  pinned: boolean
  visible: boolean
  category_id: number
}

/** Latest topics from the shown categories, newest activity first (pinned "About" topics left out) */
export async function getLatestTopics(limit = 8): Promise<ForumTopic[]> {
  const lists = await Promise.all(
    FORUM_CATEGORIES.map((c) => forum<{topic_list: {topics: DiscourseTopic[]}}>(`/c/${c.slug}/${c.id}.json`)),
  )
  const names = new Map<number, string>(FORUM_CATEGORIES.map((c) => [c.id, c.name]))
  return lists
    .flatMap((l) => l?.topic_list.topics ?? [])
    .filter((t) => !t.pinned && t.visible !== false && names.has(t.category_id))
    .map((t) => ({
      id: t.id,
      title: t.title.trim(),
      url: `${FORUM_ORIGIN}/t/${t.slug}/${t.id}`,
      categoryName: names.get(t.category_id)!,
      replies: t.reply_count,
      views: t.views,
      likes: t.like_count,
      lastActivity: t.last_posted_at ?? t.bumped_at,
    }))
    .sort((a, b) => b.lastActivity.localeCompare(a.lastActivity))
    .slice(0, limit)
}

export async function getForumStats(): Promise<ForumStats | null> {
  const data = await forum<{about: {stats: Record<string, number>}}>('/about.json')
  if (!data) return null
  const s = data.about.stats
  return {members: s.user_count, posts: s.post_count, topics: s.topic_count, likes: s.like_count, activeThisMonth: s.active_users_30_days}
}

type DiscourseBadge = {id: number; name: string; description: string; grant_count: number; badge_type_id: number; slug: string; enabled: boolean}
const TIERS: Record<number, ForumBadge['tier']> = {1: 'Gold', 2: 'Silver', 3: 'Bronze'}

export async function getFeaturedBadges(): Promise<ForumBadge[]> {
  const data = await forum<{badges: DiscourseBadge[]}>('/badges.json')
  if (!data) return []
  return FEATURED_BADGE_IDS.map((id) => data.badges.find((b) => b.id === id && b.enabled))
    .filter((b): b is DiscourseBadge => !!b)
    .map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description.replace(/<[^>]+>/g, '').trim(),
      tier: TIERS[b.badge_type_id] ?? 'Bronze',
      earnedBy: b.grant_count,
      url: `${FORUM_ORIGIN}/badges/${b.id}/${b.slug}`,
    }))
}

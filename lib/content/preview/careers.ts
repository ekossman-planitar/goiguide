/**
 * Content for /careers-preview (draft, Evan 2026-10-27). Copy from "iGuide Careers Page" (People and Marketing).
 * Perk details are marked [confirm] in the copy doc: confirm with the People Team before launch.
 */
export const meta = {
  title: 'Careers at iGuide | iGuide',
  description: 'Help us map the world, one property at a time. Join the makers, drafters, engineers, marketers and problem-solvers at iGuide.',
  path: '/careers-preview',
}

export const values = [
  {title: 'Integrity', text: 'We do what we say and tell it straight. No spin, no surprises.'},
  {title: 'Teamwork', text: 'We win together and share what we know. Nobody hoards the good stuff.'},
  {title: 'Innovation', text: 'We look for a better way and try it. Then we try again.'},
  {title: 'Accountability', text: 'We own our outcomes and follow through. If it’s yours, it’s yours.'},
]

export const steps = [
  {title: 'Apply', text: 'Send us your application. A real person reads every one.'},
  {title: 'Intro chat', text: 'A quick call with our People Team so we can get to know each other.'},
  {title: 'Meet the team', text: 'Conversations with your future leader and a few teammates.'},
  {title: 'Show us how you think', text: 'For some roles, a short, practical exercise. Nothing you’d need a weekend for.'},
  {title: 'Offer', text: 'If it’s a fit on both sides, we’ll make it official and start getting your day one kit ready.'},
]

export const perks = [
  {title: 'Health and wellness', text: 'Coverage that actually covers things.'},
  {title: 'Time off', text: 'Real time off, and we mean it when we say log off.'},
  {title: 'Flexible work', text: 'Work where you do your best work.'},
  {title: 'Learning budget', text: 'Grow your skills on us.'},
  {title: 'New office', text: 'A space we designed ourselves, and yes, we’ve captured it.'},
  {title: 'Team events', text: 'Trade shows, town halls and the occasional very competitive trivia night.'},
]

/** Instagram post codes for the carousel (@go_iguide). For instagram.com/p/AbC123xyz/ the code is AbC123xyz. Empty shows placeholders. */
export const instagram = {handle: 'go_iguide', posts: [] as string[]}

/** Humble, hungry, smart (careers copy). "How it shows up" reuses the team's own lines from the earlier "how we show up" and dictionary sections. */
export const traits = [
  {
    label: 'Humble',
    line: 'Quick to share credit.',
    fill: 'var(--color-snowgum-700)',
    items: [
      {term: 'One team.', meaning: 'We’re all pulling in the same direction. We think beyond our own team and win together by sharing context.'},
      {term: 'Tough conversations, positive intent.', meaning: 'We raise hard things early and assume the best of each other.'},
      {term: 'Disagree and commit', meaning: 'Debate openly. Once a decision is made, we all back it.'},
    ],
  },
  {
    label: 'Hungry',
    line: 'Keen to learn, with the drive to keep raising the bar.',
    fill: 'var(--color-slate)',
    items: [
      {term: 'Every “no” comes with what it would take to make it a “yes.”', meaning: 'When we hit a roadblock, we name what it would take to get there.'},
      {term: 'What would it take?', meaning: 'Our answer to roadblocks: name the conditions that make a “yes” possible.'},
      {term: 'Over-communicate', meaning: 'When in doubt, share it. Silence creates silos.'},
    ],
  },
  {
    label: 'Smart',
    line: 'The know-how to do the job well, and good at reading the room.',
    fill: 'var(--color-snowgum-400)',
    items: [
      {term: 'Customer first', meaning: 'Every role serves the customer, directly or by supporting someone who does.'},
      {term: 'Outside in', meaning: 'Start with what the customer needs, then work back to how we deliver it.'},
    ],
  },
]

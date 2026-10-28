'use client'

import {Plus} from 'lucide-react'
import {useState} from 'react'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {QuoteMark} from '@/components/ui/QuoteMark'
import {SmartLink} from '@/components/ui/SmartLink'
import {SocialIcon} from '@/components/ui/socialIcons'
import {ChevronLeft, ChevronRight} from '@/components/ui/icons'
import {Modal} from './Modal'

export type Leader = {
  name: string
  /** Leave out while the title is still to be confirmed */
  title?: string
  photo?: {src: string; alt: string}
  /** Leave out while it is still to be confirmed */
  linkedin?: string
  /** The short version: what they lead, what they've done, why it matters */
  short: string
  /** The human bit: one line of personality */
  human: string
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

function Portrait({leader, className}: Readonly<{leader: Leader; className: string}>) {
  const placeholder = (
    <div className={`${className} flex items-center justify-center bg-surface text-5xl font-semibold text-slate`} aria-hidden>
      {initials(leader.name)}
    </div>
  )
  if (!leader.photo) return placeholder
  return (
    <FallbackImage
      src={leader.photo.src}
      alt={leader.photo.alt}
      width={640}
      height={800}
      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
      className={`${className} object-cover object-top`}
      fallback={placeholder}
    />
  )
}

/** Leadership grid (5 across on desktop). Clicking a leader opens their bio in a modal. */
export function LeadershipGrid({leaders}: Readonly<{leaders: Leader[]}>) {
  const [index, setIndex] = useState<number | null>(null)
  const leader = index === null ? null : leaders[index]
  const step = (d: 1 | -1) => setIndex((i) => (i === null ? i : (i + d + leaders.length) % leaders.length))

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {leaders.map((l, i) => (
          <li key={l.name} className="flex flex-col">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Read ${l.name}’s bio`}
              className="group block rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span className="relative block overflow-hidden rounded-2xl bg-surface">
                <Portrait leader={l} className="aspect-square w-full transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-card transition-colors group-hover:bg-primary-hover group-hover:text-white">
                  <Plus width={20} height={20} aria-hidden />
                </span>
              </span>
              <span className="type-heading-xs mt-4 block text-ink transition-colors group-hover:text-primary-hover">{l.name}</span>
              <span className="type-small mt-1 block text-muted">{l.title ?? 'Title to be confirmed'}</span>
            </button>
            {l.linkedin && (
              <a
                href={l.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${l.name} on LinkedIn`}
                className="mt-3 flex h-9 w-9 items-center justify-center rounded-lg border border-line text-primary transition-colors hover:border-primary-hover hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <SocialIcon name="LinkedIn" width={18} height={18} />
              </a>
            )}
          </li>
        ))}
      </ul>

      <Modal open={leader !== null} onClose={() => setIndex(null)} label={leader ? `${leader.name}, bio` : 'Bio'}>
        {leader && (
          <div>
            <div className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <Portrait leader={leader} className="aspect-[4/5] w-full rounded-t-2xl sm:h-full sm:rounded-l-2xl sm:rounded-tr-none" />
              <div className="p-6 sm:p-8">
                <h2 className="type-heading-md text-ink">{leader.name}</h2>
                <p className="type-body mt-1 text-muted">{leader.title ?? 'Title to be confirmed'}</p>
                <p className="type-body mt-6 text-body">{leader.short}</p>
                <div className="mt-6 rounded-xl bg-surface p-5">
                  <QuoteMark className="mb-2 h-6 w-6" />
                  <p className="type-overline text-slate">The human bit</p>
                  <p className="type-body mt-1 text-ink">{leader.human}</p>
                </div>
                {leader.linkedin && (
                  <SmartLink href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-link mt-6">
                    <SocialIcon name="LinkedIn" width={18} height={18} />
                    Connect on LinkedIn
                  </SmartLink>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-line px-6 py-4 sm:px-8">
              <button type="button" onClick={() => step(-1)} className="text-link">
                <ChevronLeft width={16} height={16} />
                Previous
              </button>
              <button type="button" onClick={() => step(1)} className="text-link">
                Next
                <ChevronRight width={16} height={16} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

'use client'

import {useState} from 'react'
import {ChevronDown} from '@/components/ui/icons'
import type {Release} from '@/lib/content/downloads'

/**
 * Stitch release notes. Every version is in the HTML; older ones are hidden
 * behind "Show older versions" so the section fits on one screen.
 */
export function VersionHistory({releases, initiallyVisible = 5}: {releases: Release[]; initiallyVisible?: number}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <ul className="space-y-3">
        {releases.map((release, i) => (
          <li key={release.version} hidden={!expanded && i >= initiallyVisible}>
            <details open={i === 0} className="group rounded-xl border border-[#e7edf6] bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-bold text-ink">{release.version}</h3>
                <ChevronDown width={20} height={20} className="shrink-0 text-primary transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-4 px-5 pb-5">
                {release.groups.map((group, g) => (
                  <div key={g}>
                    {group.title && <h4 className="mb-2 font-semibold text-ink">{group.title}</h4>}
                    <ul className="ml-5 list-disc space-y-1 text-base leading-6 text-body">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          </li>
        ))}
      </ul>
      {releases.length > initiallyVisible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
        >
          {expanded ? 'Show fewer versions' : `Show older versions (${releases.length - initiallyVisible})`}
          <ChevronDown width={16} height={16} className={expanded ? 'rotate-180' : undefined} />
        </button>
      )}
    </div>
  )
}

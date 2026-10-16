/**
 * Original line illustrations for the homepage industry picker.
 * Black line work (currentColor) with a brand-red accent.
 */
type IconProps = {className?: string}
const base = {width: 56, height: 56, viewBox: '0 0 56 56', fill: 'none', 'aria-hidden': true, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const}
const RED = 'var(--color-primary-hover)'

/** House with a "sold" sign */
export function AgentIcon({className}: IconProps) {
  return (
    <svg {...base} className={className} stroke="currentColor">
      <path d="M6 27 25 11l19 16" />
      <path d="M11 23v22h28V23" />
      <rect x="20" y="31" width="10" height="14" />
      <path d="M44 30v18" />
      <rect x="38" y="30" width="14" height="9" rx="1.5" fill={RED} stroke={RED} />
      <path d="m42 34.5 2 2 4-4" stroke="#fff" />
    </svg>
  )
}

/** Camera with a floor plan in the lens */
export function PhotographerIcon({className}: IconProps) {
  return (
    <svg {...base} className={className} stroke="currentColor">
      <path d="M6 18h9l3.5-5h13l3.5 5h9a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z" />
      <circle cx="26" cy="31" r="10" />
      <path d="M21 27h10v8H21zM26 27v4h5" stroke={RED} />
      <circle cx="43" cy="24" r="1.5" fill={RED} stroke={RED} />
    </svg>
  )
}

/** Floor plan with a set square and pencil */
export function ArchitectIcon({className}: IconProps) {
  return (
    <svg {...base} className={className} stroke="currentColor">
      <rect x="5" y="8" width="34" height="40" rx="2" />
      <path d="M11 15h22v26H11zM11 28h11v13M22 15v7M27 28h6" />
      <path d="M38 47 52 33l-4-4-14 14-1.5 5.5z" fill={RED} stroke={RED} />
      <path d="m45 32 4 4" stroke="#fff" />
    </svg>
  )
}

/** Storefront under a crane */
export function BuilderIcon({className}: IconProps) {
  return (
    <svg {...base} className={className} stroke="currentColor">
      <path d="M8 48V8M8 8h40M8 14h26M44 8v10" />
      <path d="M41 18h6v5h-6z" fill={RED} stroke={RED} />
      <path d="M18 48V30h30v18M15 48h36" />
      <path d="M18 30l3-6h24l3 6" stroke={RED} />
      <path d="M26 48v-9h6v9M37 36h6v5h-6z" />
    </svg>
  )
}

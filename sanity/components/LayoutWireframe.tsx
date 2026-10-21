import type {HeroStyle, LpSectionType} from '../../lib/landingPages/layouts'

/**
 * Small wireframe of a landing page layout: one band per section, drawn the
 * way that section looks on the page. Used by the Studio layout picker and
 * the /landing-templates overview.
 */
const W = 120
const ink = '#a1a1aa'
const soft = '#e4e4e7'
const blue = '#2e2c30'

function Band({type, heroStyle, y}: Readonly<{type: LpSectionType; heroStyle: HeroStyle; y: number}>) {
  const lines = (x: number, yy: number, widths: number[], h = 2.5) =>
    widths.map((w, i) => <rect key={i} x={x} y={yy + i * 5} width={w} height={h} rx={1} fill={i === 0 ? ink : soft} />)
  switch (type) {
    case 'lpHero':
      if (heroStyle === 'banner')
        return (
          <g>
            <rect x={0} y={y - 1} width={W} height={34} fill={blue} opacity={0.85} />
            {[54, 40].map((w, i) => <rect key={i} x={10} y={y + 10 + i * 7} width={w} height={i === 0 ? 4 : 3} rx={1} fill="#fff" opacity={i ? 0.7 : 1} />)}
          </g>
        )
      if (heroStyle === 'centered')
        return (
          <g>
            {lines(30, y + 6, [60, 44, 52], 3)}
            <rect x={47} y={y + 24} width={26} height={6} rx={2} fill={blue} />
          </g>
        )
      return (
        <g>
          {lines(8, y + 6, [44, 50, 36], 3)}
          <rect x={8} y={y + 24} width={22} height={6} rx={2} fill={blue} />
          {heroStyle === 'form' ? (
            <g>
              <rect x={70} y={y + 3} width={42} height={30} rx={2} fill="#fff" stroke={soft} />
              {[0, 1, 2].map((i) => <rect key={i} x={74} y={y + 7 + i * 6} width={34} height={3.5} rx={1} fill={soft} />)}
              <rect x={74} y={y + 26} width={20} height={4} rx={1} fill={blue} />
            </g>
          ) : (
            <g>
              <rect x={66} y={y + 3} width={46} height={30} rx={2} fill={soft} />
              <path d={`M${86} ${y + 13} l8 5 l-8 5 z`} fill="#fff" />
            </g>
          )}
        </g>
      )
    case 'lpTourDemo':
      return (
        <g>
          {lines(8, y + 3, [50])}
          {[0, 1, 2].map((i) => <rect key={i} x={8 + i * 36} y={y + 10} width={30} height={3} rx={1} fill={soft} />)}
          <rect x={8} y={y + 16} width={104} height={20} rx={2} fill={soft} />
        </g>
      )
    case 'lpLogos':
      return <g>{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={10 + i * 21} y={y + 6} width={16} height={5} rx={1} fill={soft} />)}</g>
    case 'lpFeatures':
      return (
        <g>
          {lines(35, y + 3, [50])}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={22 + i * 38} cy={y + 14} r={3} fill={blue} opacity={0.6} />
              {lines(10 + i * 38, y + 20, [24, 20])}
            </g>
          ))}
        </g>
      )
    case 'lpSplit':
      return (
        <g>
          {lines(8, y + 6, [44, 48, 40, 30])}
          <rect x={66} y={y + 3} width={46} height={22} rx={2} fill={soft} />
        </g>
      )
    case 'lpSteps':
      return (
        <g>
          {lines(35, y + 3, [50])}
          <line x1={20} y1={y + 15} x2={100} y2={y + 15} stroke={soft} />
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={20 + i * 26.6} cy={y + 15} r={3.5} fill={blue} />)}
          {[0, 1, 2, 3].map((i) => <rect key={`t${i}`} x={12 + i * 26.6} y={y + 21} width={16} height={2.5} rx={1} fill={soft} />)}
        </g>
      )
    case 'lpTestimonials':
      return (
        <g>
          {[0, 1].map((i) => (
            <g key={i}>
              <rect x={8 + i * 54} y={y + 3} width={50} height={20} rx={2} fill="#fff" stroke={soft} />
              <text x={12 + i * 54} y={y + 11} fontSize={8} fill={blue}>“</text>
              {lines(18 + i * 54, y + 7, [34, 30, 20])}
            </g>
          ))}
        </g>
      )
    case 'lpStats':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 34} y={y + 4} width={22} height={7} rx={1} fill={blue} opacity={0.75} />
              <rect x={12 + i * 34} y={y + 14} width={26} height={2.5} rx={1} fill={soft} />
            </g>
          ))}
        </g>
      )
    case 'lpCompare':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={10} y={y + 3 + i * 6} width={100} height={5} fill={i === 0 ? soft : '#fff'} stroke={soft} strokeWidth={0.5} />
              {i > 0 && <circle cx={70} cy={y + 5.5 + i * 6} r={1.5} fill={blue} />}
            </g>
          ))}
        </g>
      )
    case 'lpTabs':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => <rect key={i} x={20 + i * 21} y={y + 3} width={18} height={4} rx={2} fill={i === 0 ? blue : soft} />)}
          <rect x={20} y={y + 10} width={80} height={16} rx={2} fill={soft} />
        </g>
      )
    case 'lpVideos':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={10 + i * 35} y={y + 4} width={30} height={17} rx={2} fill={soft} />
              <path d={`M${22 + i * 35} ${y + 9} l6 3.5 l-6 3.5 z`} fill="#fff" />
            </g>
          ))}
        </g>
      )
    case 'lpResources':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={10 + i * 35} y={y + 4} width={30} height={12} rx={2} fill={soft} />
              <rect x={10 + i * 35} y={y + 18} width={24} height={2.5} rx={1} fill={soft} />
            </g>
          ))}
        </g>
      )
    case 'lpForm':
      return (
        <g>
          {lines(40, y + 3, [40])}
          <rect x={35} y={y + 9} width={50} height={18} rx={2} fill="#fff" stroke={soft} />
          {[0, 1].map((i) => <rect key={i} x={39} y={y + 12 + i * 5} width={42} height={3} rx={1} fill={soft} />)}
          <rect x={39} y={y + 22} width={18} height={3.5} rx={1} fill={blue} />
        </g>
      )
    case 'lpFaq':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={20} y={y + 4 + i * 6} width={70} height={2.5} rx={1} fill={soft} />
              <text x={96} y={y + 7 + i * 6} fontSize={5} fill={blue}>+</text>
            </g>
          ))}
        </g>
      )
    case 'lpCta':
      return (
        <g>
          <rect x={8} y={y + 3} width={104} height={16} rx={2} fill={blue} />
          <rect x={40} y={y + 7} width={40} height={2.5} rx={1} fill="#fff" />
          <rect x={50} y={y + 12} width={20} height={4} rx={1} fill="#fff" />
        </g>
      )
    case 'lpNotice':
      return <g>{lines(10, y + 3, [100, 100, 70], 1.5)}</g>
  }
}

const heights: Partial<Record<LpSectionType, number>> = {lpTourDemo: 40, lpHero: 36, lpLogos: 16, lpNotice: 14, lpCta: 22, lpFaq: 24, lpStats: 20}

export function LayoutWireframe({sections, heroStyle, width = 160}: Readonly<{sections: LpSectionType[]; heroStyle: HeroStyle; width?: number}>) {
  // Top of each band, computed up front
  const tops = sections.reduce<number[]>((acc, type, i) => [...acc, i === 0 ? 10 : acc[i - 1] + (heights[sections[i - 1]] ?? 30)], [])
  const total = (tops.at(-1) ?? 10) + (heights[sections.at(-1)!] ?? 30) + 8
  const bands = sections.map((type, i) => (
    <g key={i}>
      {i > 0 && <line x1={0} y1={tops[i] - 1} x2={W} y2={tops[i] - 1} stroke="#f0f0f1" />}
      <Band type={type} heroStyle={heroStyle} y={tops[i]} />
    </g>
  ))
  return (
    <svg viewBox={`0 0 ${W} ${total}`} width={width} role="img" aria-label="Layout wireframe" style={{display: 'block', background: '#fff', borderRadius: 6, border: '1px solid #e4e4e7'}}>
      {/* Header: logo only */}
      <rect x={0} y={0} width={W} height={7} fill="#f7f7f8" />
      <rect x={6} y={2} width={16} height={3} rx={1} fill={blue} />
      {bands}
      {/* Footer: copyright + legal */}
      <rect x={0} y={total - 6} width={W} height={6} fill="#f7f7f8" />
    </svg>
  )
}

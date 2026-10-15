import {set, type StringInputProps} from 'sanity'
import {lpLayouts, lpSectionLabels} from '../../lib/landingPages/layouts'
import {LayoutWireframe} from './LayoutWireframe'

/** Layout choice as visual cards with a wireframe of each layout and a link to a full example. */
export function LayoutPicker(props: StringInputProps) {
  const {value, onChange, readOnly} = props
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12}}>
      {lpLayouts.map((layout) => {
        const selected = value === layout.id
        return (
          <div
            key={layout.id}
            style={{
              border: `2px solid ${selected ? '#006e9e' : '#e3e8ee'}`,
              borderRadius: 8,
              padding: 10,
              background: selected ? '#e3f3fb' : 'transparent',
            }}
          >
            <button
              type="button"
              disabled={readOnly}
              onClick={() => onChange(set(layout.id))}
              aria-pressed={selected}
              style={{all: 'unset', cursor: readOnly ? 'default' : 'pointer', display: 'block', width: '100%'}}
            >
              <LayoutWireframe sections={layout.sections} heroStyle={layout.heroStyle} width={168} />
              <div style={{marginTop: 8, fontWeight: 600, fontSize: 14}}>
                {selected ? '✓ ' : ''}
                {layout.name}
              </div>
              <div style={{marginTop: 4, fontSize: 12, lineHeight: 1.4, opacity: 0.8}}>{layout.bestFor}</div>
              <div style={{marginTop: 6, fontSize: 11, opacity: 0.6}}>{layout.sections.map((s) => lpSectionLabels[s]).join(' · ')}</div>
            </button>
            <a href={`/landing-templates/${layout.id}`} target="_blank" rel="noreferrer" style={{display: 'inline-block', marginTop: 8, fontSize: 12}}>
              See a full example ↗
            </a>
          </div>
        )
      })}
    </div>
  )
}

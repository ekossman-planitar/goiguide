import {set, unset, type StringInputProps} from 'sanity'
import {BRAND_COLOURS} from '../../lib/popup/rules'

/** Hex colour field with one-click brand swatches. Empty = the default shown in the description. */
export function ColourInput(props: StringInputProps) {
  const {value, onChange, readOnly, elementProps} = props
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8}}>
      {BRAND_COLOURS.map((c) => {
        const selected = value?.toLowerCase() === c.value
        return (
          <button
            key={c.value}
            type="button"
            disabled={readOnly}
            title={`${c.title} ${c.value}`}
            aria-label={`${c.title} ${c.value}`}
            aria-pressed={selected}
            onClick={() => onChange(set(c.value))}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: c.value,
              border: selected ? '3px solid #e4002b' : '1px solid #a1a1aa',
              cursor: readOnly ? 'default' : 'pointer',
            }}
          />
        )
      })}
      <input
        {...elementProps}
        type="text"
        value={value ?? ''}
        placeholder="#rrggbb"
        readOnly={readOnly}
        onChange={(e) => onChange(e.currentTarget.value ? set(e.currentTarget.value.trim()) : unset())}
        style={{width: 110, height: 32, padding: '0 8px', border: '1px solid #a1a1aa', borderRadius: 6, fontFamily: 'monospace'}}
      />
      {value && /^#[0-9a-f]{6}$/i.test(value) && (
        <span aria-hidden style={{width: 32, height: 32, borderRadius: 6, background: value, border: '1px solid #a1a1aa'}} />
      )}
      {value && !readOnly && (
        <button type="button" onClick={() => onChange(unset())} style={{background: 'none', border: 0, color: '#2e2c30', textDecoration: 'underline', cursor: 'pointer'}}>
          Use default
        </button>
      )}
    </div>
  )
}

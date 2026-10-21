import type {StringInputProps} from 'sanity'
import {LANDING_PATH_PATTERN} from '../../lib/landingPages/reservedPaths'

/** URL field with the full address underneath (the duplicate/reserved check shows as a validation message). */
export function LandingPathInput(props: Readonly<StringInputProps>) {
  const {value} = props
  return (
    <div>
      {props.renderDefault(props)}
      {value && LANDING_PATH_PATTERN.test(value) && (
        <div style={{marginTop: 6, fontSize: 12, opacity: 0.75}}>
          Full address: <code>https://goiguide.com{value}</code>
        </div>
      )}
    </div>
  )
}

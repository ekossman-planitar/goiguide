'use client'

import {useState} from 'react'
import {Select, type SelectOption} from '@/components/ui/Select'

const industries: SelectOption[] = [
  {value: 'all', label: 'All industries'},
  {value: 'rre', label: 'Real estate'},
  {value: 'irc', label: 'Insurance & restoration'},
  {value: 'aec', label: 'Architecture, engineering & construction'},
]

const countries: SelectOption[] = [
  {value: 'ca', label: 'Canada'},
  {value: 'us', label: 'United States'},
  {value: 'au', label: 'Australia'},
]

/** /brand-guideline: the site's dropdown in its two uses (filter bar, form field). */
export function SelectDemos() {
  const [industry, setIndustry] = useState('all')
  const [country, setCountry] = useState('')
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <p className="type-small mb-2 font-medium text-ink">Filter (40px, light border)</p>
        <Select options={industries} value={industry} onChange={setIndustry} label="Industry" />
      </div>
      <div>
        <label htmlFor="bg-country" className="type-small mb-1.5 block font-medium text-ink">
          Form field (48px, strong border)
        </label>
        <Select id="bg-country" options={countries} value={country} onChange={setCountry} size="lg" tone="field" placeholder="Select a country" />
      </div>
    </div>
  )
}

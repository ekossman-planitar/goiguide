'use client'

import {Globe} from 'lucide-react'
import Script from 'next/script'
import {useState, useSyncExternalStore} from 'react'
import {Select} from '@/components/ui/Select'

/**
 * GTranslate, as on live (same languages, English default, follows the
 * visitor's browser language), but as a small dropdown in the footer instead
 * of the large floating button. Free widget: translation happens in the
 * browser via Google Translate.
 */
const LANGUAGES = [
  'af', 'am', 'ar', 'az', 'be', 'bg', 'bn', 'bs', 'ca', 'ceb', 'co', 'cs', 'cy', 'da', 'de', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi',
  'fr', 'fy', 'ga', 'gd', 'gl', 'gu', 'ha', 'haw', 'hi', 'hmn', 'hr', 'ht', 'hu', 'hy', 'id', 'ig', 'is', 'it', 'iw', 'ja', 'jw', 'ka', 'kk',
  'km', 'kn', 'ko', 'ku', 'ky', 'la', 'lb', 'lo', 'lt', 'lv', 'mg', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'ne', 'nl', 'no', 'ny',
  'pa', 'pl', 'ps', 'pt', 'ro', 'ru', 'sd', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th',
  'tl', 'tr', 'uk', 'ur', 'uz', 'vi', 'xh', 'yi', 'yo', 'zh-CN', 'zh-TW', 'zu',
]

const settings = {
  default_language: 'en',
  detect_browser_language: true,
  languages: LANGUAGES,
  wrapper_selector: '.gtranslate_wrapper',
}

// Names as GTranslate shows them, for the codes Intl names differently or not at all
const NAME_OVERRIDES: Record<string, string> = {iw: 'Hebrew', jw: 'Javanese', 'zh-CN': 'Chinese (Simplified)', 'zh-TW': 'Chinese (Traditional)'}
const names = new Intl.DisplayNames(['en'], {type: 'language'})
const OPTIONS = LANGUAGES.map((code) => ({value: code, label: NAME_OVERRIDES[code] ?? names.of(code) ?? code})).sort((a, b) =>
  a.label.localeCompare(b.label),
)

const noop = () => () => {}

/** Current language from Google Translate's cookie (googtrans=/en/fr) */
const currentLanguage = () => /(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/.exec(document.cookie)?.[1] ?? 'en'

/**
 * Our styled dropdown drives GTranslate's own (hidden) select: picking a
 * language sets that select and fires its change event, exactly as if the
 * visitor had used it, so translation works as on live.
 */
export function LanguageSwitcher() {
  // Read the cookie after hydration (the server always renders English)
  const saved = useSyncExternalStore(noop, currentLanguage, () => 'en')
  const [picked, setPicked] = useState<string | null>(null)
  const language = picked ?? saved

  const choose = (code: string) => {
    setPicked(code)
    const select = document.querySelector<HTMLSelectElement>('.gtranslate_wrapper select')
    if (!select) return
    const option = [...select.options].find((o) => o.value === code || o.value.endsWith(`|${code}`))
    if (!option) return
    select.value = option.value
    select.dispatchEvent(new Event('change', {bubbles: true}))
  }

  return (
    <div className="notranslate flex items-center gap-2 text-sm text-body">
      <Globe aria-hidden className="h-4 w-4 text-muted" />
      <Select label="Language" size="sm" placement="top" align="right" options={OPTIONS} value={language} onChange={choose} className="w-48" />
      {/* GTranslate's widget renders here; hidden, driven by the dropdown above */}
      <div className="gtranslate_wrapper hidden" aria-hidden />
      <Script id="gtranslate-settings" strategy="lazyOnload">{`window.gtranslateSettings = ${JSON.stringify(settings)};`}</Script>
      <Script src="https://cdn.gtranslate.net/widgets/latest/dropdown.js" strategy="lazyOnload" />
    </div>
  )
}

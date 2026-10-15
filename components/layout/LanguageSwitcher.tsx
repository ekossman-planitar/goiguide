'use client'

import Script from 'next/script'

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

export function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-2 text-sm text-body">
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <span className="sr-only">Language</span>
      <div className="gtranslate_wrapper [&_select]:rounded-md [&_select]:border [&_select]:border-line [&_select]:bg-white [&_select]:px-2 [&_select]:py-1 [&_select]:text-sm" />
      <Script id="gtranslate-settings" strategy="lazyOnload">{`window.gtranslateSettings = ${JSON.stringify(settings)};`}</Script>
      <Script src="https://cdn.gtranslate.net/widgets/latest/dropdown.js" strategy="lazyOnload" />
    </div>
  )
}

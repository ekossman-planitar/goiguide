import Script from 'next/script'

/**
 * Zendesk messaging widget (the chat bubble on help.youriguide.com, including
 * its AI agent), loaded on every Help Center page (/support). Same widget and
 * key as the live help center, so conversations land in Zendesk as today.
 * The key is the public Web Widget key every visitor's browser already sees on
 * the live help center; it is not a secret. Zendesk needs the id "ze-snippet".
 */
const ZENDESK_WIDGET_SRC = 'https://static.zdassets.com/ekr/snippet.js?key=web_widget/iguide.zendesk.com'

export function ZendeskChat() {
  return <Script id="ze-snippet" src={ZENDESK_WIDGET_SRC} strategy="lazyOnload" />
}

'use client'

import {useEffect, useRef} from 'react'

/**
 * Zendesk article body. The support team's accordions (a `.accordion` heading
 * followed by a `.panel`) open and close as on help.youriguide.com, and are
 * keyboard accessible. Panels only collapse once this script runs, so the
 * content is still readable without JavaScript.
 */
export function ArticleBody({html}: {html: string}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const cleanups: (() => void)[] = []
    root.querySelectorAll<HTMLElement>('.accordion').forEach((trigger, i) => {
      const panel = trigger.nextElementSibling as HTMLElement | null
      if (!panel?.classList.contains('panel')) return
      panel.id ||= `help-panel-${i}`
      trigger.setAttribute('role', 'button')
      trigger.setAttribute('tabindex', '0')
      trigger.setAttribute('aria-expanded', 'false')
      trigger.setAttribute('aria-controls', panel.id)
      let timer: ReturnType<typeof setTimeout> | undefined
      const toggle = () => {
        const open = trigger.classList.toggle('active')
        trigger.setAttribute('aria-expanded', String(open))
        clearTimeout(timer)
        panel.style.maxHeight = `${panel.scrollHeight}px`
        if (open) {
          // Lift the limit once open, so images that load later aren't cut off
          timer = setTimeout(() => (panel.style.maxHeight = 'none'), 250)
        } else {
          void panel.offsetHeight
          panel.style.maxHeight = ''
        }
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }
      trigger.addEventListener('click', toggle)
      trigger.addEventListener('keydown', onKey)
      cleanups.push(() => {
        trigger.removeEventListener('click', toggle)
        trigger.removeEventListener('keydown', onKey)
        clearTimeout(timer)
      })
    })
    root.dataset.accordions = 'ready'
    return () => cleanups.forEach((fn) => fn())
  }, [html])

  return <div ref={ref} className="help-article-body" dangerouslySetInnerHTML={{__html: html}} />
}

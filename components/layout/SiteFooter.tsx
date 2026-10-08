import Image from 'next/image'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {SocialIcon} from '@/components/ui/socialIcons'
import {footerColumns, legal, reviewBadges, socialLinks, subscribeForm, type FooterLink} from '@/lib/footerNavigation'
import {SubscribeForm} from './SubscribeForm'

const newTab = (link: FooterLink) => (link.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})

/** Sitewide footer: subscribe form, link columns (headings are links too), social, badges and legal. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white pt-16 pb-10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* Subscribe */}
          <div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full page loads for GTM */}
            <a href="/" aria-label="iGUIDE home" className="inline-block">
              <Image src="/iGUIDE-Logo.svg" alt="iGUIDE" width={720} height={175} className="h-auto w-[156px]" />
            </a>
            <h2 className="mt-8 text-xl leading-7 font-bold text-ink">Subscribe to stay current</h2>
            <p className="mt-2 text-base leading-6 text-body">Receive information on the latest releases, tips and updates.</p>
            <div className="mt-6">
              <SubscribeForm {...subscribeForm} />
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column[0].heading.label} className="space-y-10">
                {column.map((group) => (
                  <div key={group.heading.label}>
                    <h3 className="text-base leading-6 font-bold text-ink">
                      <SmartLink href={group.heading.href} {...newTab(group.heading)} className="hover:text-primary">
                        {group.heading.label}
                      </SmartLink>
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <SmartLink href={link.href} {...newTab(link)} className="text-base leading-6 text-body hover:text-primary">
                            {link.label}
                          </SmartLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <ul className="flex gap-5">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-primary">
                    <span className="sr-only">{social.name}</span>
                    <SocialIcon name={social.name} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6">
              {reviewBadges.map((badge) => (
                <a key={badge.href} href={badge.href} {...(badge.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- badges are served by the review sites */}
                  <img src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} loading="lazy" className="h-auto" style={{width: badge.width * 0.8}} />
                </a>
              ))}
            </div>
          </div>
          <div className="text-sm leading-6 text-body xl:text-right">
            <p>{legal.copyright}</p>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 xl:justify-end">
              <a href={legal.address.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
                {legal.address.label}
              </a>
              {legal.links.map((link) => (
                <SmartLink key={link.href} href={link.href} className="underline underline-offset-2 hover:text-primary">
                  {link.label}
                </SmartLink>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

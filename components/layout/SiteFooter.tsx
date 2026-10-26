import Image from 'next/image'
import {cn} from '@/lib/cn'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {SocialIcon} from '@/components/ui/socialIcons'
import {ChevronDown} from '@/components/ui/icons'
import {footerColumns, isAccordion, legal, reviewBadges, socialLinks, subscribeForm, type FooterAccordion, type FooterLink} from '@/lib/footerNavigation'
import {LanguageSwitcher} from './LanguageSwitcher'
import {SubscribeForm} from './SubscribeForm'

const newTab = (link: FooterLink) => (link.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})

function FooterLinkItem({link}: Readonly<{link: FooterLink}>) {
  return (
    <SmartLink href={link.href} {...newTab(link)} className="text-base leading-6 text-body hover:text-primary-hover">
      {link.label}
    </SmartLink>
  )
}

/** Native <details> accordion: works without JavaScript, and the links stay in the HTML for search engines. */
function FooterAccordionGroup({group}: Readonly<{group: FooterAccordion}>) {
  return (
    <details className="footer-accordion group">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-base leading-6 text-body hover:text-primary-hover [&::-webkit-details-marker]:hidden">
        {group.accordion}
        <ChevronDown aria-hidden width={16} height={16} className="transition-transform group-open:rotate-180" />
      </summary>
      <ul className="mt-3 space-y-3 border-l border-line pl-4">
        {group.links.map((link) => (
          <li key={link.label}>
            <SmartLink href={link.href} {...newTab(link)} className="text-[15px] leading-6 text-muted hover:text-primary-hover">
              {link.label}
            </SmartLink>
          </li>
        ))}
        {group.all && (
          <li>
            <SmartLink href={group.all.href} className="text-[15px] leading-6 font-semibold text-ink hover:text-primary-hover">
              {group.all.label}
            </SmartLink>
          </li>
        )}
      </ul>
    </details>
  )
}

function SocialLinks({className}: Readonly<{className?: string}>) {
  return (
    <ul className={cn('flex gap-5', className)}>
      {socialLinks.map((social) => (
        <li key={social.name}>
          <a href={social.href} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-primary-hover">
            <span className="sr-only">{social.name}</span>
            <SocialIcon name={social.name} />
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Sitewide footer: subscribe form, link columns (headings are links too), social, badges and legal. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white pt-16 pb-10">
      <Container>
        {/* Link columns first, "Connect with Us" (newsletter + social) last (Evan, 2026-10-20) */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Link columns: a few top links each, longer lists in accordions */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {footerColumns.map((column, i) => (
              <div key={column.heading.label}>
                <h3 className="flex h-6 items-center text-base leading-6 font-semibold text-ink">
                  {i === 0 ? (
                    // The iGuide column is headed by the logo (links home) instead of the word "iGuide"
                    // eslint-disable-next-line @next/next/no-html-link-for-pages -- full page loads for GTM
                    <a href="/" aria-label="iGuide home" className="inline-block">
                      <Image src="/iGUIDE-Logo.svg" alt="iGuide" width={1330} height={368} className="h-6 w-auto" />
                    </a>
                  ) : (
                    <SmartLink href={column.heading.href} {...newTab(column.heading)} className="hover:text-primary-hover">
                      {column.heading.label}
                    </SmartLink>
                  )}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) =>
                    isAccordion(item) ? (
                      <li key={item.accordion}>
                        <FooterAccordionGroup group={item} />
                      </li>
                    ) : (
                      <li key={item.label}>
                        <FooterLinkItem link={item} />
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>

          {/* Connect with Us: newsletter, then social (also in the bottom row, while Evan compares the two spots) */}
          <div>
            <h2 className="type-heading-sm text-ink">Connect with Us</h2>
            <p className="mt-2 text-base leading-6 text-body">Receive information on the latest releases, tips and updates.</p>
            <div className="mt-6">
              <SubscribeForm {...subscribeForm} />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col gap-8 border-t border-line pt-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <SocialLinks />
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
            <div className="mb-3 flex xl:justify-end">
              <LanguageSwitcher />
            </div>
            <p>{legal.copyright}</p>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 xl:justify-end">
              <a href={legal.address.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-hover">
                {legal.address.label}
              </a>
              {legal.links.map((link) => (
                <SmartLink key={link.href} href={link.href} className="hover:text-primary-hover">
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

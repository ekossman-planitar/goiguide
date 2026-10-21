import {SmartLink} from '@/components/ui/SmartLink'
import {FileText} from 'lucide-react'
import {articlePath, type HelpArticleSummary} from '@/lib/help/zendesk'

/** Plain list of article links (category and section pages) */
export function ArticleLinkList({articles}: Readonly<{articles: HelpArticleSummary[]}>) {
  return (
    <ul className="space-y-1">
      {articles.map((a) => (
        <li key={a.id}>
          <SmartLink href={articlePath(a)} className="help-article-link group flex items-start gap-3 rounded-lg py-1.5 text-body hover:text-primary-hover">
            <FileText aria-hidden width={18} height={18} className="mt-[3px] shrink-0 text-muted group-hover:text-primary-hover" />
            <span>{a.title}</span>
          </SmartLink>
        </li>
      ))}
    </ul>
  )
}

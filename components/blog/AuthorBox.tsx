import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {Author} from '@/sanity/lib/types'

/** "About the author" panel shown at the end of an article. */
export function AuthorBox({author}: {author: Author}) {
  return (
    <aside aria-label="About the author" className="mt-16 flex gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      {author.photo?.asset ? (
        <Image
          src={urlFor(author.photo).width(160).height(160).fit('crop').auto('format').url()}
          alt=""
          width={80}
          height={80}
          className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
        />
      ) : (
        <span
          aria-hidden
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold text-primary sm:h-20 sm:w-20"
        >
          {author.name.charAt(0)}
        </span>
      )}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Written by</p>
        <p className="mt-1 text-xl font-bold text-ink">{author.name}</p>
        {author.role && <p className="text-muted">{author.role}</p>}
        {author.bio && <p className="mt-3 leading-relaxed text-body">{author.bio}</p>}
        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-semibold text-primary hover:text-primary-hover"
          >
            Connect on LinkedIn
          </a>
        )}
      </div>
    </aside>
  )
}

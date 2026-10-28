import {ScrollRail} from './ScrollRail'

/**
 * Carousel of the team's Instagram posts, using Instagram's own public post embeds (no access token needed).
 * `posts` are the post codes: for instagram.com/p/AbC123xyz/ the code is AbC123xyz (reels: instagram.com/reel/<code>/).
 * With no posts yet, placeholder tiles show so the layout can be reviewed.
 */
export function InstagramCarousel({handle, posts}: Readonly<{handle: string; posts: string[]}>) {
  return (
    <>
      <ScrollRail label={`Latest posts from @${handle}`} trackClassName="gap-6" arrows="sides">
        {posts.length > 0
          ? posts.map((code) => (
              <div key={code} className="w-[328px] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-card md:w-[360px]">
                <iframe
                  src={`https://www.instagram.com/p/${code}/embed`}
                  title={`Instagram post from @${handle}`}
                  loading="lazy"
                  scrolling="no"
                  allowTransparency
                  className="block h-[560px] w-full border-0"
                />
              </div>
            ))
          : [1, 2, 3, 4].map((n) => (
              <div key={n} className="flex h-[420px] w-[300px] shrink-0 snap-start flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-white p-8 text-center md:w-[340px]">
                <p className="type-overline text-muted">Instagram post {n}</p>
                <p className="type-body mt-2 text-muted">Posts from @{handle} appear here.</p>
              </div>
            ))}
      </ScrollRail>
    </>
  )
}

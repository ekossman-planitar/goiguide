# Standalone pages (rebuilt from the live site)

One file per page: `export const meta = {title, description, path}` (copied from the live
page) and `export const blocks: Block[]` (see components/blocks/Blocks.tsx). The route
file in app/(site)/<path>/page.tsx renders `<Blocks blocks={blocks} />` with
`pageMetadata(meta)`.

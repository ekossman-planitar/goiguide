import {Blocks} from '@/components/blocks/Blocks'
import {FormDialogButton} from '@/components/pages/FormDialogButton'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {blocks, hero, meta} from '@/lib/content/pages/projectGroupDemo'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function ProjectGroupDemoPage() {
  return (
    <>
      <section
        className="relative flex min-h-[340px] items-center overflow-hidden bg-primary bg-cover bg-center bg-no-repeat py-20 lg:py-28"
        style={{backgroundImage: `url('${hero.background}')`}}
      >
        <div aria-hidden className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/75" />
        <Container className="relative">
          <h1 className="type-display max-w-4xl text-white">{hero.heading}</h1>
          <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-center">
            <Button href={hero.request.href} size="lg" newTab>
              {hero.request.label}
            </Button>
            <FormDialogButton label={hero.meet.label} title={hero.meet.title} formId={hero.meet.formId} variant="secondary" />
          </div>
        </Container>
      </section>
      <Blocks blocks={blocks} />
    </>
  )
}

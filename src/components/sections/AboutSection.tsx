import Image from 'next/image'
import type { HomePage } from '@/payload-types'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CmsIcon } from '@/components/ui/Icon'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { mediaAlt, mediaPosition, mediaUrl } from '@/lib/media'
import { translations, type Locale } from '@/lib/translations'
import { cn, safeHref } from '@/lib/utils'

export function AboutSection({ data, locale }: { data?: HomePage['aboutUsSection']; locale: Locale }) {
  const t = translations[locale]
  const images = (data?.aboutUsSectionImages ?? [])
    .map((i) => ({ src: mediaUrl(i.image), alt: i.alt || mediaAlt(i.image), position: mediaPosition(i.image) }))
    .filter((i) => i.src)
    .slice(0, 3)
  const highlights = data?.highlights ?? []

  return (
    <section className="section-y relative isolate overflow-hidden bg-white">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          {images.length > 1 ? (
            <div className="grid aspect-square grid-cols-6 grid-rows-6 gap-3">
              {images.map((img, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.12}
                  className={cn(
                    'relative overflow-hidden rounded-[var(--radius-card)]',
                    i === 0 && 'col-span-4 col-start-1 row-span-4 row-start-1',
                    i === 1 && 'col-span-2 col-start-5 row-span-4 row-start-1',
                    i === 2 && 'col-span-4 col-start-3 row-span-2 row-start-5',
                    images.length === 2 && i === 1 && 'row-span-6',
                  )}
                >
                  <Image src={img.src!} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" style={{ objectPosition: img.position }} />
                </Reveal>
              ))}
              <div aria-hidden className={cn('col-span-2 col-start-1 row-span-2 row-start-5 grid place-items-center', images.length === 2 && 'col-span-4')}>
                <div className="size-20 animate-spin-slow rounded-full border-2 border-dashed border-primary-300" />
              </div>
            </div>
          ) : (
            <Reveal className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image src={images[0]?.src ?? '/hero.jpg'} alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{t.ui.ourAssociation}</Eyebrow>
            <h2 className="text-h2 mt-5">{data?.aboutUsSectionTitle || t.nav.about}</h2>
            {data?.aboutUsSectionSubtitle && <p className="text-lead mt-4 text-ink-500">{data.aboutUsSectionSubtitle}</p>}
          </Reveal>
          {data?.aboutUsSectionDescription && (
            <Reveal delay={0.1} className="mt-6">
              <RichText data={data.aboutUsSectionDescription as never} size="base" />
            </Reveal>
          )}
          {highlights.length > 0 && (
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <StaggerItem key={h.id ?? i} className="flex gap-4 rounded-2xl bg-ink-50 p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-600 text-white">
                    <CmsIcon name={h.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-ink-900">{h.title}</h3>
                    {h.description && <p className="mt-1 text-sm text-ink-500">{h.description}</p>}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
          <Reveal delay={0.2} className="mt-10">
            <ButtonLink href={safeHref(data?.aboutUsSectionButtonLink, '/a-propos')} arrow>
              {data?.aboutUsSectionButtonText || t.common.learnMore}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

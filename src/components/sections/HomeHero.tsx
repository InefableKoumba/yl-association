import type { HomePage } from '@/payload-types'
import { ButtonLink } from '@/components/ui/Button'
import { CountUp } from '@/components/ui/CountUp'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { HeroTitle } from '@/components/ui/HeroTitle'
import { CmsIcon } from '@/components/ui/Icon'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { translations, type Locale } from '@/lib/translations'
import { safeHref } from '@/lib/utils'
import { HeroSlideshow } from './HeroSlideshow'

export function HomeHero({ data, locale }: { data?: HomePage['heroSection']; locale: Locale }) {
  const t = translations[locale]
  const images =
    data?.heroImages
      ?.map((i) => ({ src: mediaUrl(i.heroImage), position: mediaPosition(i.heroImage) }))
      .filter((i): i is { src: string; position: string | undefined } => Boolean(i.src)) ?? []
  const slides = images.length ? images : [{ src: '/hero2.jpg', position: undefined }]
  const stats = data?.heroStats ?? []

  return (
    <header className="relative isolate overflow-hidden bg-ink-950 text-white">
      <HeroSlideshow images={slides} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 size-[36rem] rounded-full bg-primary-600/40 blur-3xl" />

      <div className="container-page flex min-h-[100svh] flex-col justify-end pt-40 pb-12 md:pb-16">
        <div className="max-w-4xl">
          <Reveal className="mb-7">
            <Eyebrow tone="light">{data?.heroSubtitle || 'Young Leaders Association'}</Eyebrow>
          </Reveal>
          <HeroTitle text={data?.heroTitle || t.ui.trainingsTitle} className="text-display text-white" />
          {data?.heroDescription && (
            <Reveal delay={0.35} className="text-lead mt-7 max-w-2xl text-white/75">
              {data.heroDescription}
            </Reveal>
          )}
          <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={safeHref(data?.heroPrimaryButtonLink, '/domaine-de-formation')} size="lg" arrow>
              {data?.heroPrimaryButtonText || t.common.seeAllTrainings}
            </ButtonLink>
            <ButtonLink href={safeHref(data?.heroSecondaryButtonLink, '/a-propos')} size="lg" variant="glass">
              {data?.heroSecondaryButtonText || t.common.learnMore}
            </ButtonLink>
          </Reveal>
        </div>

        {stats.length > 0 && (
          <Stagger
            className={`mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 backdrop-blur-xl md:mt-24 ${
              ['', '', 'sm:grid-cols-2', 'sm:grid-cols-3', 'sm:grid-cols-2 lg:grid-cols-4'][Math.min(stats.length, 4)]
            }`}
            stagger={0.1}
          >
            {stats.slice(0, 4).map((stat, i) => (
              <StaggerItem key={stat.id ?? i} className="flex items-center gap-4 bg-ink-950/30 p-6 md:p-7">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-sun-400">
                  <CmsIcon name={stat.icon} className="size-6" />
                </span>
                <div>
                  <CountUp value={stat.value} className="font-display block text-3xl font-bold tracking-tight md:text-4xl" />
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </header>
  )
}

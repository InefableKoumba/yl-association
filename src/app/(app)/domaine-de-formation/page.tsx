import type { Metadata } from 'next'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { FilterableGrid } from '@/components/sections/FilterableGrid'
import { TrainingDomainCard } from '@/components/sections/TrainingDomainCard'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getTrainingDomains } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('trainingsPage').catch(() => null)
  const locale = await getLocale()
  return { title: page?.heroTitle || translations[locale].nav.trainings, description: page?.heroDescription || undefined }
}

export default async function TrainingsPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const [page, domains] = await Promise.all([getGlobal('trainingsPage'), getTrainingDomains()])
  const total = domains.reduce((n, d) => n + (d.trainings?.length ?? 0), 0)

  return (
    <>
      <PageHero
        eyebrow={t.nav.trainings}
        title={page.heroTitle || t.ui.trainingsTitle}
        description={page.heroDescription || t.ui.trainingsDescription}
        image={mediaUrl(page.heroImage, '/hero.jpg')}
        imagePosition={mediaPosition(page.heroImage)}
        actions={
          <>
            <ButtonLink href="#catalogue" size="lg" arrow>{page.heroButtonText || t.common.seeAllTrainings}</ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="glass">{t.common.contactUs}</ButtonLink>
          </>
        }
      >
        <div className="mt-14 flex gap-10 text-white">
          {[
            { v: domains.length, l: locale === 'fr' ? 'domaines' : 'domains' },
            { v: total, l: locale === 'fr' ? 'formations' : 'trainings' },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-4xl font-bold">{s.v}</p>
              <p className="text-sm text-white/60">{s.l}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section id="catalogue" className="section-y">
        <div className="container-page">
          <SectionHeader eyebrow={t.ui.trainingCatalog} title={page.trainingsSectionTitle || t.ui.trainingsTitle} description={page.trainingsSectionDescription} />
          {domains.length ? (
            <FilterableGrid
              placeholder={t.ui.searchTrainings}
              clearLabel={t.ui.clearSearch}
              emptyLabel={t.ui.noSearchResults}
              items={domains.map((d, i) => ({
                key: d.id,
                text: [d.name, d.description, ...(d.trainings ?? []).map((tr) => `${tr.name} ${tr.shortDescription ?? ''}`)].join(' '),
                node: <TrainingDomainCard domain={d} locale={locale} index={i} />,
              }))}
            />
          ) : (
            <p className="py-16 text-center text-ink-500">{t.ui.noTrainings}</p>
          )}
        </div>
      </section>

      <CtaBanner title={page.ctaTitle || t.ui.customTrainingTitle} description={page.ctaDescription || t.ui.customTrainingDescription}>
        <ButtonLink href="/contact" variant="white" size="lg" arrow>{t.common.contactUs}</ButtonLink>
      </CtaBanner>
    </>
  )
}

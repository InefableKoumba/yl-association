import type { Metadata } from 'next'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { FilterableGrid } from '@/components/sections/FilterableGrid'
import { ProgramCard } from '@/components/sections/ProgramCard'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getPrograms } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('programsPage').catch(() => null)
  const locale = await getLocale()
  return { title: page?.heroTitle || translations[locale].nav.programs, description: page?.heroDescription || undefined }
}

export default async function ProgramsPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const [page, upcoming, past] = await Promise.all([getGlobal('programsPage'), getPrograms('upcoming'), getPrograms('past')])
  const tabs = [
    { value: 'upcoming', label: page.upcomingProgramsSectionTitle || t.common.upcomingPrograms },
    { value: 'past', label: page.pastProgramsSectionTitle || t.common.pastPrograms },
  ].filter((tab) => (tab.value === 'upcoming' ? upcoming.length : past.length) > 0)

  return (
    <>
      <PageHero
        eyebrow={t.ui.programsEyebrow}
        title={page.heroTitle || t.programs.heroTitle}
        description={page.heroDescription || t.programs.heroDescription}
        image={mediaUrl(page.heroImage, '/hero.jpg')}
        imagePosition={mediaPosition(page.heroImage)}
      />
      <section className="section-y">
        <div className="container-page">
          {upcoming.length + past.length === 0 ? (
            <div className="rounded-[var(--radius-card)] border border-dashed border-ink-300 py-20 text-center">
              <p className="text-h3">{t.common.noUpcomingPrograms}</p>
              <p className="mt-2 text-ink-500">{t.common.checkBackSoon}</p>
            </div>
          ) : (
            <FilterableGrid
              tabs={tabs}
              placeholder={t.ui.searchPrograms}
              clearLabel={t.ui.clearSearch}
              emptyLabel={t.ui.noSearchResults}
              items={[...upcoming, ...past].map((p) => ({
                key: p.id,
                group: p.status,
                text: `${p.title} ${p.location} ${p.shortDescription}`,
                node: <ProgramCard program={p} locale={locale} />,
              }))}
            />
          )}
        </div>
      </section>
      <CtaBanner title={page.ctaSectionTitle || t.common.proposeTitle} description={page.ctaSectionDescription || t.common.proposeDescription}>
        <ButtonLink href="/contact" variant="white" size="lg" arrow>{page.proposeProgramButtonText || t.common.proposeProgram}</ButtonLink>
        <ButtonLink href="/contact" variant="glass" size="lg">{page.becomeSpeakerButtonText || t.common.becomeSpeaker}</ButtonLink>
      </CtaBanner>
    </>
  )
}

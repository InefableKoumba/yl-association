import type { Metadata } from 'next'
import Image from 'next/image'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { MissionVision } from '@/components/sections/MissionVision'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { RichText } from '@/components/ui/RichText'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getLocale, translations } from '@/lib/i18n'
import { mediaAlt, mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getTeam } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('aboutPage').catch(() => null)
  const locale = await getLocale()
  return { title: page?.heroTitle || translations[locale].nav.about, description: page?.heroDescription || undefined }
}

export default async function AboutPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const page = await getGlobal('aboutPage')
  const [home, team] = await Promise.all([
    page.showValues !== false ? getGlobal('homePage') : null,
    page.showTeam !== false ? getTeam() : [],
  ])
  const gallery = (page.aboutUsGallerySectionImages ?? [])
    .map((g) => ({ src: mediaUrl(g.image), alt: mediaAlt(g.image), position: mediaPosition(g.image) }))
    .filter((g) => g.src)

  return (
    <>
      <PageHero
        eyebrow={t.about.ourHistory}
        title={page.heroTitle || (locale === 'fr' ? 'Découvrez Young Leaders' : 'Discover Young Leaders')}
        description={page.heroDescription}
        image={mediaUrl(page.heroImage, '/hero2.jpg')}
        imagePosition={mediaPosition(page.heroImage)}
        size="lg"
        actions={
          <>
            <ButtonLink href="#histoire" size="lg" arrow>{page.heroButtonText || t.common.learnMore}</ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="glass">{t.common.contactUs}</ButtonLink>
          </>
        }
      />

      <section id="histoire" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>{t.about.ourMission}</Eyebrow>
              <h2 className="text-h2 mt-5">{page.aboutUsSectionTitle || 'Young Leaders'}</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            {page.aboutUsSectionDescription ? (
              <RichText data={page.aboutUsSectionDescription as never} />
            ) : (
              <p className="text-lead text-ink-500">{t.footer.missionStatement}</p>
            )}
          </Reveal>
        </div>
      </section>

      {home && home.missionVisionSection?.enabled !== false && (
        <div className="bg-ink-50">
          <MissionVision data={home.missionVisionSection} locale={locale} />
        </div>
      )}

      {gallery.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <SectionHeader eyebrow={t.ui.gallery} title={page.aboutUsGallerySectionTitle || t.ui.photos} description={page.aboutUsGallerySectionDescription} />
            <Stagger className="grid auto-rows-[14rem] grid-cols-2 gap-4 md:auto-rows-[18rem] md:grid-cols-3">
              {gallery.map((g, i) => (
                <StaggerItem key={i} className={`group relative overflow-hidden rounded-[var(--radius-card)] ${i % 5 === 0 ? 'row-span-2' : ''}`}>
                  <Image src={g.src!} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" style={{ objectPosition: g.position }} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="section-y bg-ink-50">
          <div className="container-page">
            <SectionHeader eyebrow={t.ui.ourTeam} title={home?.teamSection?.title || t.ui.teamTitle} description={home?.teamSection?.description || t.ui.teamDescription} />
            <TeamGrid members={team} />
          </div>
        </section>
      )}

      <div className="pt-24 md:pt-32">
        <CtaBanner title={page.joinMissionTitle || t.about.joinOurMission} description={page.joinMissionDescription || t.about.contactUsDescription}>
          <ButtonLink href="/contact" variant="white" size="lg" arrow>{t.common.contactUs}</ButtonLink>
          <ButtonLink href="/faire-un-don" variant="glass" size="lg">{t.nav.donateButton}</ButtonLink>
        </CtaBanner>
      </div>
    </>
  )
}

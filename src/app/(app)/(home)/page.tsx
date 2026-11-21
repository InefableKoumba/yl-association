import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/forms/ContactForm'
import { AboutSection } from '@/components/sections/AboutSection'
import { BlogCard } from '@/components/sections/BlogCard'
import { ContactDetails } from '@/components/sections/ContactDetails'
import { HomeHero } from '@/components/sections/HomeHero'
import { MissionVision } from '@/components/sections/MissionVision'
import { PartnersStrip } from '@/components/sections/PartnersStrip'
import { ProgramCard } from '@/components/sections/ProgramCard'
import { StatsBand } from '@/components/sections/StatsBand'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { Testimonials } from '@/components/sections/Testimonials'
import { TrainingDomainCard } from '@/components/sections/TrainingDomainCard'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getLocale, translations } from '@/lib/i18n'
import { mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getBlogPosts, getFaqs, getPartners, getPrograms, getTeam, getTrainingDomains, relationIds } from '@/lib/queries'
import { safeHref } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const seo = (await getGlobal('homePage').catch(() => null))?.seo
  const og = mediaUrl(seo?.ogImage)
  return {
    ...(seo?.metaTitle ? { title: { absolute: seo.metaTitle } } : {}),
    ...(seo?.metaDescription ? { description: seo.metaDescription } : {}),
    ...(og ? { openGraph: { images: [{ url: og }] } } : {}),
  }
}

/** Sections are shown unless explicitly switched off in the CMS. */
const on = (value?: boolean | null) => value !== false

export default async function HomePage() {
  const locale = await getLocale()
  const t = translations[locale]
  const [page, settings, dictionary] = await Promise.all([
    getGlobal('homePage', 1),
    getGlobal('site-settings'),
    getGlobal('dictionary'),
  ])

  const s = {
    mission: page.missionVisionSection,
    trainings: page.trainingsSection,
    programs: page.programsSection,
    about: page.aboutUsSection,
    stats: page.statsSection,
    team: page.teamSection,
    testimonials: page.testimonialsSection,
    partners: page.partnersSection,
    blog: page.blogSection,
    faq: page.faqSection,
    contact: page.contactSection,
  }

  const [domains, programs, team, partners, posts, faqs] = await Promise.all([
    on(s.trainings?.enabled) ? getTrainingDomains(relationIds(s.trainings?.trainingDomainsToFeature as never)) : [],
    on(s.programs?.enabled) ? getPrograms('upcoming', 3) : [],
    on(s.team?.enabled) ? getTeam() : [],
    on(s.partners?.enabled) ? getPartners(relationIds(s.partners?.partnersToShow as never)) : [],
    on(s.blog?.enabled) ? getBlogPosts(3) : [],
    on(s.faq?.enabled) ? getFaqs(relationIds(s.faq?.frequentlyAskedQuestions as never), 6) : [],
  ])

  const testimonials = (s.testimonials?.testimonials ?? []).map((item, i) => ({
    id: item.id ?? String(i),
    name: item.name,
    role: item.role,
    content: item.content,
    photo: mediaUrl(item.photo),
  }))

  return (
    <>
      <HomeHero data={page.heroSection} locale={locale} />

      {on(s.mission?.enabled) && <MissionVision data={s.mission} locale={locale} />}

      {on(s.trainings?.enabled) && domains.length > 0 && (
        <section id="trainings" className="section-y bg-ink-50">
          <div className="container-page">
            <SectionHeader
              eyebrow={t.ui.trainingsEyebrow}
              title={s.trainings?.ourTrainingsSectionTitle || t.ui.trainingsTitle}
              description={s.trainings?.ourTrainingsSectionDescription || t.ui.trainingsDescription}
              action={
                <ButtonLink href={safeHref(s.trainings?.trainingsSectionButtonLink, '/domaine-de-formation')} variant="outline" arrow>
                  {s.trainings?.trainingsSectionButtonText || t.common.seeAllTrainings}
                </ButtonLink>
              }
            />
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {domains.slice(0, 6).map((d, i) => (
                <StaggerItem key={d.id}>
                  <TrainingDomainCard domain={d} locale={locale} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {on(s.programs?.enabled) && programs.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <SectionHeader
              eyebrow={t.ui.programsEyebrow}
              title={s.programs?.title || t.common.upcomingPrograms}
              description={s.programs?.description || t.common.upcomingProgramsDescription}
              action={<ButtonLink href="/programmes" variant="outline" arrow>{t.common.viewAllPrograms}</ButtonLink>}
            />
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => (
                <StaggerItem key={p.id}>
                  <ProgramCard program={p} locale={locale} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {on(s.about?.enabled) && <AboutSection data={s.about} locale={locale} />}

      {s.stats?.statsSectionEnabled !== false && <StatsBand data={s.stats} />}

      {on(s.team?.enabled) && team.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <SectionHeader eyebrow={t.ui.ourTeam} title={s.team?.title || t.ui.teamTitle} description={s.team?.description || t.ui.teamDescription} />
            <TeamGrid members={team} />
          </div>
        </section>
      )}

      {s.testimonials?.testimonialsSectionEnabled !== false && testimonials.length > 0 && (
        <section className="section-y relative isolate overflow-hidden bg-primary-700 text-white">
          <div aria-hidden className="bg-grid-light mask-radial absolute inset-0 -z-10" />
          <div className="container-page grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow tone="light">{t.ui.testimonials}</Eyebrow>
              <h2 className="text-h2 mt-5 text-white">{s.testimonials?.testimonialsSectionTitle || t.common.successStories}</h2>
              <p className="text-lead mt-5 text-white/70">{s.testimonials?.testimonialsSectionDescription || t.common.testimonialsDescription}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <Testimonials items={testimonials} prevLabel={t.ui.previous} nextLabel={t.ui.next} />
            </Reveal>
          </div>
        </section>
      )}

      {on(s.partners?.enabled) && partners.length > 0 && (
        <section className="section-y">
          <div className="container-page">
            <SectionHeader
              align="center"
              eyebrow={t.ui.trustedBy}
              title={s.partners?.ourPartnersSectionTitle || t.ui.allPartnersTitle}
              description={s.partners?.ourPartnersSectionDescription || t.ui.partnersDescription}
            />
          </div>
          <Reveal>
            <PartnersStrip partners={partners} />
          </Reveal>
          {s.partners?.showAllPartnersLink !== false && (
            <div className="mt-12 text-center">
              <ButtonLink href="/partenaires" variant="ghost" arrow>
                {s.partners?.allPartnersLinkText || t.common.seeAllPartners}
              </ButtonLink>
            </div>
          )}
        </section>
      )}

      {on(s.blog?.enabled) && posts.length > 0 && (
        <section className="section-y bg-ink-50">
          <div className="container-page">
            <SectionHeader
              eyebrow={t.ui.blog}
              title={s.blog?.title || t.ui.latestNews}
              description={s.blog?.description || t.ui.latestNewsDescription}
              action={<ButtonLink href="/blog" variant="outline" arrow>{t.ui.viewAllArticles}</ButtonLink>}
            />
            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <StaggerItem key={p.id}>
                  <BlogCard post={p} locale={locale} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {on(s.faq?.enabled) && faqs.length > 0 && (
        <section className="section-y">
          <div className="container-page grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>{t.ui.faqEyebrow}</Eyebrow>
              <h2 className="text-h2 mt-5">{s.faq?.faqSectionTitle || t.ui.faqHomeTitle}</h2>
              <p className="text-lead mt-5 text-ink-500">{s.faq?.faqSectionDescription || t.ui.faqHomeDescription}</p>
              <ButtonLink href={safeHref(s.faq?.faqSectionButtonLink, '/faq')} variant="outline" arrow className="mt-8">
                {s.faq?.faqSectionButtonText || t.contact.viewFaq}
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} defaultOpen={faqs[0]?.id} />
            </Reveal>
          </div>
        </section>
      )}

      {on(s.contact?.enabled) && (
        <section id="contact" className="section-y bg-ink-50">
          <div className="container-page">
            <SectionHeader
              align="center"
              eyebrow={t.ui.contactEyebrow}
              title={s.contact?.contactUsSectionTitle || t.ui.contactTitle}
              description={s.contact?.contactUsSectionDescription || t.ui.contactDescription}
            />
            <div className="grid gap-6 lg:grid-cols-5">
              <Reveal className="lg:col-span-3">
                <ContactForm locale={locale} dictionary={dictionary} />
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-2">
                {mediaUrl(s.contact?.contactUsSectionImage) && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
                    <Image src={mediaUrl(s.contact?.contactUsSectionImage)!} alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                  </div>
                )}
                <ContactDetails info={settings.contactInfo} locale={locale} />
              </Reveal>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

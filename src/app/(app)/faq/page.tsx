import type { Metadata } from 'next'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { FaqExplorer } from '@/components/sections/FaqExplorer'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'
import { getFaqs } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('faqPage').catch(() => null)
  const locale = await getLocale()
  return { title: page?.heroTitle || translations[locale].common.frequentlyAskedQuestions, description: page?.heroDescription || undefined }
}

export default async function FaqPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const [page, faqs] = await Promise.all([getGlobal('faqPage'), getFaqs()])

  return (
    <>
      <PageHero
        eyebrow={t.common.frequentlyAskedQuestions}
        title={page.heroTitle || t.faq.heroTitle}
        description={page.heroDescription || t.faq.heroDescription}
        image={mediaUrl(page.heroImage)}
        imagePosition={mediaPosition(page.heroImage)}
        size="sm"
      />
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-h2">{page.faqSectionTitle || t.faq.faqSectionTitle}</h2>
              <p className="mt-5 text-ink-500">{page.faqSectionDescription || t.faq.faqSectionDescription}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            {faqs.length ? (
              <FaqExplorer
                items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
                placeholder={t.ui.searchFaq}
                clearLabel={t.ui.clearSearch}
                emptyLabel={t.ui.noSearchResults}
                resultsLabel={t.ui.results}
              />
            ) : (
              <p className="text-ink-500">{t.ui.noFaq}</p>
            )}
          </Reveal>
        </div>
      </section>
      <CtaBanner title={t.faq.notFindingAnswer} description={t.contact.faqDescription}>
        <ButtonLink href="/contact" variant="white" size="lg" arrow>{t.common.contactUs}</ButtonLink>
      </CtaBanner>
    </>
  )
}

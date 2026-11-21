import type { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import { ContactDetails } from '@/components/sections/ContactDetails'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal, getPayloadClient } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('contactPage').catch(() => null)
  const locale = await getLocale()
  return { title: page?.heroTitle || translations[locale].nav.contact, description: page?.heroDescription || undefined }
}

export default async function ContactPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const [page, settings, dictionary, payload] = await Promise.all([getGlobal('contactPage'), getGlobal('site-settings'), getGlobal('dictionary'), getPayloadClient()])
  const privacy = await payload
    .find({ collection: 'pages', where: { slug: { in: ['politique-de-confidentialite', 'confidentialite', 'privacy'] } }, limit: 1, depth: 0 })
    .then((r) => r.docs[0]?.slug)
    .catch(() => undefined)

  return (
    <>
      <PageHero
        eyebrow={t.common.contactUs}
        title={page.heroTitle || t.ui.contactTitle}
        description={page.heroDescription || t.ui.contactDescription}
        image={mediaUrl(page.heroImage)}
        imagePosition={mediaPosition(page.heroImage)}
        size="sm"
      />
      <section className="section-y">
        <div className="container-page grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm locale={locale} dictionary={dictionary} privacyHref={privacy ? `/${privacy}` : undefined} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <ContactDetails info={settings.contactInfo} locale={locale} />
          </Reveal>
        </div>
        <Reveal className="container-page mt-20 text-center">
          <h2 className="text-h2">{t.contact.stillHaveQuestions}</h2>
          <p className="text-lead mx-auto mt-4 max-w-2xl text-ink-500">{t.contact.faqDescription}</p>
          <ButtonLink href="/faq" variant="outline" arrow className="mt-8">{t.contact.viewFaq}</ButtonLink>
        </Reveal>
      </section>
    </>
  )
}

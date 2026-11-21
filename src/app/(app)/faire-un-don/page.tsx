import { CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Accordion } from '@/components/ui/Accordion'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal'
import { getLocale, translations } from '@/lib/i18n'
import { mediaPosition, mediaUrl } from '@/lib/media'
import { getGlobal } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('donationPage').catch(() => null)
  const locale = await getLocale()
  return { title: page?.hero?.title || translations[locale].nav.donateButton, description: page?.hero?.subtitle || undefined }
}

export default async function DonatePage() {
  const locale = await getLocale()
  const t = translations[locale]
  const d = t.donate
  const [page, settings] = await Promise.all([getGlobal('donationPage'), getGlobal('site-settings')])
  const url = settings.donationExternalUrl || '/contact'
  const cta = page.hero?.cta || d.hero.cta
  const tiers = page.impact?.tiers?.length
    ? page.impact.tiers
    : [d.impact.tier1, d.impact.tier2, d.impact.tier3].map((x, i) => ({ id: String(i), ...x }))
  const faqs = page.faq?.questions?.length
    ? page.faq.questions.map((q, i) => ({ id: q.id ?? i, question: q.question ?? '', answer: q.answer ?? '' }))
    : ([1, 2, 3, 4] as const).map((n) => ({ id: n, question: d.faq[`q${n}`], answer: d.faq[`a${n}`] }))

  return (
    <>
      <PageHero
        eyebrow={t.ui.donateEyebrow}
        title={page.hero?.title || d.hero.title}
        description={page.hero?.subtitle || d.hero.subtitle}
        image={mediaUrl(page.hero?.image, '/hero2.jpg')}
        imagePosition={mediaPosition(page.hero?.image)}
        actions={<ButtonLink href={url} size="lg" variant="white" arrow>{cta}</ButtonLink>}
      />
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><h2 className="text-h2">{page.impact?.title || d.impact.title}</h2></Reveal>
            <Stagger className="mt-10 space-y-4">
              {tiers.map((tier, i) => (
                <StaggerItem key={tier.id ?? i} className="group flex gap-5 rounded-[var(--radius-card)] border border-ink-200/80 bg-white p-6 transition hover:border-primary-200 hover:shadow-[var(--shadow-soft)] md:p-7">
                  <span className="font-display grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-lg font-bold text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-h3">{tier.title}</h3>
                    <p className="mt-2 text-ink-500">{tier.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1} className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-ink-950 p-8 text-white lg:sticky lg:top-32">
              <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-60 rounded-full bg-primary-600/50 blur-3xl" />
              <h2 className="text-h3 text-white">{page.donateCard?.title || t.ui.readyToContribute}</h2>
              <p className="mt-4 text-white/70">{page.donateCard?.description || t.ui.donateCardDescription}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><CheckCircle2 className="size-4 shrink-0 text-sun-400" />{d.form.important_desc}</li>
              </ul>
              <ButtonLink href={url} size="lg" className="mt-8 w-full" icon={<ExternalLink className="size-4" />}>{cta}</ButtonLink>
              <p className="mt-6 flex gap-3 rounded-2xl bg-white/5 p-4 text-xs text-white/60">
                <ShieldCheck className="size-5 shrink-0 text-emerald-400" />
                {page.donateCard?.notice || t.ui.redirectNoticeText}
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
      <section className="section-y bg-ink-50">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4"><h2 className="text-h2">{page.faq?.title || d.faq.title}</h2></Reveal>
          <Reveal delay={0.1} className="lg:col-span-8"><Accordion items={faqs} /></Reveal>
        </div>
      </section>
      <div className="pt-24">
        <CtaBanner title={page.help?.title || d.help.title} description={page.help?.description || d.help.description}>
          <ButtonLink href="/contact" variant="white" size="lg" arrow>{page.help?.cta || d.help.cta}</ButtonLink>
        </CtaBanner>
      </div>
    </>
  )
}

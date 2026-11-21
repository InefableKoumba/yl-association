import type { Metadata } from 'next'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { PartnerLogo } from '@/components/sections/PartnersStrip'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Stagger, StaggerItem } from '@/components/ui/Reveal'
import { getLocale, translations } from '@/lib/i18n'
import { getPartners } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const t = translations[await getLocale()]
  return { title: t.ui.allPartnersTitle, description: t.ui.allPartnersDescription }
}

export default async function PartnersPage() {
  const locale = await getLocale()
  const t = translations[locale]
  const partners = await getPartners()
  return (
    <>
      <PageHero eyebrow={t.ui.trustedBy} title={t.ui.allPartnersTitle} description={t.ui.allPartnersDescription} size="sm" />
      <section className="section-y">
        <div className="container-page">
          {partners.length ? (
            <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {partners.map((p) => (
                <StaggerItem key={p.id} className="[&>*]:h-32 [&>*]:w-full">
                  <PartnerLogo partner={p} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <p className="py-16 text-center text-ink-500">{t.ui.noPartners}</p>
          )}
        </div>
      </section>
      <CtaBanner title={t.common.proposeTitle} description={t.ui.partnersDescription}>
        <ButtonLink href="/contact" variant="white" size="lg" arrow>{t.common.contactUs}</ButtonLink>
      </CtaBanner>
    </>
  )
}

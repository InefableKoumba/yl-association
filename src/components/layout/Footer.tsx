import Image from 'next/image'
import Link from 'next/link'
import { translations, type Locale } from '@/lib/translations'
import { NewsletterForm } from './NewsletterForm'

type Props = {
  locale: Locale
  description?: string | null
  missionStatement?: string | null
  socialLinks?: Record<string, string | null | undefined> | null
  legalPages?: { title: string; slug: string }[]
  newsletter?: { placeholder?: string | null; success?: string | null; error?: string | null } | null
}

export default function Footer({ locale, description, missionStatement, socialLinks, legalPages = [], newsletter }: Props) {
  const t = translations[locale]
  const socials = Object.entries(socialLinks ?? {}).filter(
    ([key, url]) => key !== 'id' && typeof url === 'string' && url.length > 0,
  ) as [string, string][]
  const explore = [
    { href: '/', label: t.nav.home },
    { href: '/a-propos', label: t.nav.about },
    { href: '/domaine-de-formation', label: t.nav.trainings },
    { href: '/programmes', label: t.nav.programs },
    { href: '/blog', label: t.ui.blog },
  ]
  const info = [
    { href: '/faq', label: t.ui.faq },
    { href: '/partenaires', label: t.ui.partners },
    { href: '/contact', label: t.nav.contact },
    { href: '/faire-un-don', label: t.nav.donateButton },
    ...legalPages.map((p) => ({ href: `/${p.slug}`, label: p.title })),
  ]

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white/70">
      <div aria-hidden className="bg-grid-light mask-fade-b absolute inset-0 -z-10 opacity-40" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary-600/30 blur-3xl" />
      <div className="container-page pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={48} height={48} className="size-12 rounded-xl bg-white object-contain p-1" />
              <span className="font-display text-xl font-bold text-white">Young Leaders</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm">{description || t.footer.associationDescription}</p>
            <p className="mt-3 max-w-sm text-sm text-white/50">{missionStatement || t.footer.missionStatement}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.ui.followUs}>
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-semibold capitalize text-white transition hover:border-primary-400 hover:bg-primary-600">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav className="lg:col-span-2" aria-label={t.ui.explore}>
            <h2 className="mb-5 text-sm font-semibold tracking-widest text-white uppercase">{t.ui.explore}</h2>
            <ul className="space-y-3 text-sm">
              {explore.map((l) => (
                <li key={l.href}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav className="lg:col-span-2" aria-label={t.footer.information}>
            <h2 className="mb-5 text-sm font-semibold tracking-widest text-white uppercase">{t.footer.information}</h2>
            <ul className="space-y-3 text-sm">
              {info.map((l) => (
                <li key={l.href}><Link href={l.href} className="transition hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <h2 className="mb-5 text-sm font-semibold tracking-widest text-white uppercase">{t.footer.newsletter}</h2>
            <p className="mb-4 text-sm">{t.footer.stayInformed}</p>
            <NewsletterForm
              placeholder={newsletter?.placeholder || t.footer.emailPlaceholder}
              submitLabel={t.footer.subscribe}
              successMessage={newsletter?.success || t.ui.newsletterSuccess}
              errorMessage={newsletter?.error || t.ui.genericError}
            />
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Young Leaders Association. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}

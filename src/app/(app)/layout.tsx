import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import './global.css'
import Footer from '@/components/layout/Footer'
import { LivePreview } from '@/components/layout/LivePreview'
import Navbar from '@/components/layout/Navbar'
import { PreviewBar } from '@/components/layout/PreviewBar'
import { getLocale, translations } from '@/lib/i18n'
import { mediaUrl } from '@/lib/media'
import { getGlobal, getPayloadClient, isDraftMode } from '@/lib/payload'

const heading = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const fallback = {
    title: 'Young Leaders Association',
    description: 'Développement du leadership et des compétences des jeunes au Congo.',
  }
  try {
    const seo = (await getGlobal('site-settings'))?.seo
    const og = mediaUrl(seo?.ogImage)
    const title = seo?.metaTitle || fallback.title
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
      title: { default: title, template: `%s — ${title}` },
      description: seo?.metaDescription || fallback.description,
      icons: { icon: '/favicons/favicon.ico', apple: '/favicons/apple-touch-icon.png' },
      openGraph: og ? { images: [{ url: og }] } : undefined,
    }
  } catch {
    return fallback
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const t = translations[locale]
  const draft = await isDraftMode()
  const [siteSettings, dictionary, legal] = await Promise.all([
    getGlobal('site-settings').catch(() => null),
    getGlobal('dictionary').catch(() => null),
    getPayloadClient()
      .then((p) => p.find({ collection: 'pages', locale, where: { showInFooter: { equals: true } }, limit: 10, depth: 0 }))
      .then((r) => r.docs.map((d) => ({ title: d.title, slug: d.slug })))
      .catch(() => []),
  ])

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          {t.ui.skipToContent}
        </a>
        <Navbar
          locale={locale}
          navigation={siteSettings?.navigation}
          announcement={siteSettings?.announcement}
          contactLabel={dictionary?.common?.contactUs}
        />
        <main id="main">{children}</main>
        <Footer
          locale={locale}
          description={siteSettings?.footer?.description}
          missionStatement={siteSettings?.footer?.missionStatement}
          socialLinks={siteSettings?.socialLinks}
          legalPages={legal}
          newsletter={dictionary?.newsletter}
        />
        {draft && (
          <>
            <LivePreview />
            <PreviewBar locale={locale} />
          </>
        )}
      </body>
    </html>
  )
}

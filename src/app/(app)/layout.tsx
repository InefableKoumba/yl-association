import type { Metadata } from 'next'
import './global.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getLocale } from '@/lib/i18n'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Young Leaders | Site officiel',
  description:
    'Young Leaders est une association qui accompagne les jeunes dans leur développement personnel et professionnel.',
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/favicon-32x32.png',
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/site.webmanifest',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className="bg-gray-50">
        <Navbar />
        <div className="pt-24 md:pt-28">{children}</div>
        <Footer socialLinks={siteSettings?.socialLinks} />
      </body>
    </html>
  )
}

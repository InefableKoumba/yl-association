import type { Metadata } from 'next'
import './global.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getLocale } from '@/lib/i18n'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  try {
    const payload = await getPayload({ config })
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as any,
    })

    const seo = siteSettings?.seo

    return {
      title: seo?.metaTitle || 'Young Leaders Association',
      description: seo?.metaDescription || 'Développement du leadership et des compétences des jeunes au Congo.',
      openGraph: seo?.ogImage && typeof seo.ogImage !== 'number' ? {
        images: [{ url: seo.ogImage.url || '' }],
      } : undefined,
    }
  } catch (error) {
    return {
      title: 'Young Leaders Association',
      description: 'Développement du leadership et des compétences des jeunes au Congo.',
    }
  }
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as any,
  })

  const dictionary = await payload.findGlobal({
    slug: 'dictionary',
    locale: locale as any,
  })

  return (
    <html lang={locale}>
      <body className="bg-gray-50">
        <Navbar 
          locale={locale as any} 
          navigation={siteSettings?.navigation} 
          dictionary={dictionary} 
        />
        <main>{children}</main>
        <Footer 
          socialLinks={siteSettings?.socialLinks} 
          description={siteSettings?.footer?.description} 
          missionStatement={siteSettings?.footer?.missionStatement}
          dictionary={dictionary}
        />
      </body>
    </html>
  )
}

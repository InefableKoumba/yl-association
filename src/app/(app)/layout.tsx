import type { Metadata } from 'next'
import './global.css'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Young Leaders | Site officiel',
  description:
    'Young Leaders est une association qui accompagne les jeunes dans leur développement personnel et professionnel.',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <Navbar />
        <div className="pt-24 md:pt-28">{children}</div>
      </body>
    </html>
  )
}

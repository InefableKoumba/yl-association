import type { Metadata } from 'next'
import './global.css'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Young Leaders | Site officiel',
  description:
    'Young Leaders est une association qui accompagne les jeunes dans leur développement personnel et professionnel.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <Navbar />
      <body className="bg-gray-50 pt-20">{children}</body>
    </html>
  )
}

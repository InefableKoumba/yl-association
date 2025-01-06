import type { Metadata } from 'next'
import './global.css'

export const metadata: Metadata = {
  title: 'YOUNG LEADERS',
  description: 'YOUNG LEADERS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}

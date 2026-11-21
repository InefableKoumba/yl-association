import { withPayload } from '@payloadcms/next/withPayload'

const remotePatterns = [
  { protocol: 'https', hostname: 'pub-59c23b9ceeb249b1b01773cfe02677b7.r2.dev' },
  { protocol: 'https', hostname: '*.r2.dev' },
  { protocol: 'https', hostname: '*.r2.cloudflarestorage.com' },
]

// Allow images served from the configured public bucket / site URL
for (const value of [process.env.NEXT_PUBLIC_CLOUDFLARE_PUB_URL, process.env.NEXT_PUBLIC_SERVER_URL]) {
  try {
    if (value) {
      const url = new URL(value)
      remotePatterns.push({ protocol: url.protocol.replace(':', ''), hostname: url.hostname })
    }
  } catch {
    // ignore malformed URLs
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Legacy / CMS default links that pointed to routes that never existed
    return [
      { source: '/about', destination: '/a-propos', permanent: true },
      { source: '/formations', destination: '/domaine-de-formation', permanent: true },
      { source: '/trainings', destination: '/domaine-de-formation', permanent: true },
      { source: '/programs', destination: '/programmes', permanent: true },
      { source: '/donate', destination: '/faire-un-don', permanent: true },
      { source: '/partners', destination: '/partenaires', permanent: true },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

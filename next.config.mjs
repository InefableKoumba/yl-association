import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-59c23b9ceeb249b1b01773cfe02677b7.r2.dev',
        protocol: 'https',
      },
    ],
  },
}

export default withPayload(nextConfig)

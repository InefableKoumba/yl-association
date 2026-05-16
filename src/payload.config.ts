// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { fr } from '@payloadcms/translations/languages/fr'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { TrainingDomains } from './collections/TrainingDomains'
import { s3Storage } from '@payloadcms/storage-s3'
import { Partners } from './collections/Partner'
import { FAQ } from './collections/FAQ'
import { Programs } from './collections/Programs'
import {
  HomeConfig,
  AboutConfig,
  TrainingsConfig,
  ContactConfig,
  FaqConfig,
  ProgramsConfig,
} from './globals/pages'
import { SiteSettings } from './globals/site-settings'
import { Team } from './collections/Team'
import { Blog } from './collections/Blog'
import { Dictionary } from './globals/dictionary'
import { DonationPage } from './globals/pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Young Leaders',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicons/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          url: '/favicons/apple-touch-icon.png',
        },
      ],
    },
  },
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { fr, en },
  },
  collections: [Users, Media, TrainingDomains, Partners, FAQ, Programs, Team, Blog],
  globals: [
    HomeConfig,
    AboutConfig,
    TrainingsConfig,
    ContactConfig,
    FaqConfig,
    ProgramsConfig,
    SiteSettings,
    DonationPage,
    Dictionary,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || '',
    },
    push: false
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})

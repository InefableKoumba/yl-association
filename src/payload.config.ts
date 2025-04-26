// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { fr } from '@payloadcms/translations/languages/fr'
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
import { Programs } from './collections/Program'
import { Events } from './collections/Events'
import {
  HomeConfig,
  AboutConfig,
  TrainingsConfig,
  ContactConfig,
  FaqConfig,
  ProgramsConfig,
  EventsConfig,
} from './globals/pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { fr },
  },
  collections: [Users, Media, TrainingDomains, Partners, FAQ, Programs, Events],
  globals: [
    HomeConfig,
    AboutConfig,
    TrainingsConfig,
    ContactConfig,
    FaqConfig,
    ProgramsConfig,
    EventsConfig,
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

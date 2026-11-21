import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Blog } from './collections/Blog'
import { FAQ } from './collections/FAQ'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partner'
import { Programs } from './collections/Programs'
import { Team } from './collections/Team'
import { TrainingDomains } from './collections/TrainingDomains'
import { Users } from './collections/Users'
import { Dictionary } from './globals/dictionary'
import {
  AboutConfig,
  BlogPage,
  ContactConfig,
  DonationPage,
  FaqConfig,
  HomeConfig,
  ProgramsConfig,
  TrainingsConfig,
} from './globals/pages'
import { SiteSettings } from './globals/site-settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
const s3Enabled = Boolean(process.env.S3_BUCKET)

/** Builds the URL the admin "live preview" iframe loads for a document. */
const previewURL = (pathname: string, locale?: string) => {
  const params = new URLSearchParams({ path: pathname })
  if (locale) params.set('locale', locale)
  return `${serverURL}/next/preview?${params.toString()}`
}

const globalPaths: Record<string, string> = {
  homePage: '/',
  aboutPage: '/a-propos',
  trainingsPage: '/domaine-de-formation',
  programsPage: '/programmes',
  contactPage: '/contact',
  faqPage: '/faq',
  donationPage: '/faire-un-don',
  blogPage: '/blog',
}

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Young Leaders',
      description: "Administration du site Young Leaders Association",
      icons: [
        { rel: 'icon', type: 'image/x-icon', url: '/favicons/favicon.ico' },
        { rel: 'apple-touch-icon', url: '/favicons/apple-touch-icon.png' },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Logo#Icon',
      },
      beforeDashboard: ['/components/admin/Dashboard'],
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig, locale }) => {
        const code = typeof locale === 'string' ? locale : locale?.code
        if (globalConfig) return previewURL(globalPaths[globalConfig.slug] ?? '/', code)
        switch (collectionConfig?.slug) {
          case 'blog':
            return previewURL(`/blog/${data?.slug ?? ''}`, code)
          case 'programs':
            return previewURL(`/programmes/${data?.id ?? ''}`, code)
          case 'pages':
            return previewURL(`/${data?.slug ?? ''}`, code)
          default:
            return previewURL('/', code)
        }
      },
      collections: ['blog', 'programs', 'pages'],
      globals: Object.keys(globalPaths),
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablette', name: 'tablet', width: 820, height: 1180 },
        { label: 'Bureau', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  localization: {
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { fr, en },
    fallbackLanguage: 'fr',
  },
  collections: [
    // Contenu
    Blog,
    Programs,
    TrainingDomains,
    FAQ,
    Team,
    Partners,
    Media,
    // Pages
    Pages,
    // Configuration
    Users,
  ],
  globals: [
    HomeConfig,
    AboutConfig,
    TrainingsConfig,
    ProgramsConfig,
    BlogPage,
    ContactConfig,
    FaqConfig,
    DonationPage,
    SiteSettings,
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
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: s3Enabled,
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})

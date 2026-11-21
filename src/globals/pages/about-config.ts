import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { aboutPageFields } from './about'

export const AboutConfig: GlobalConfig = {
  slug: 'aboutPage',
  label: "Page À propos",
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/a-propos`,
  },
  fields: aboutPageFields,
}

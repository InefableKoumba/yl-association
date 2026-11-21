import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { homePageFields } from './home'

export const HomeConfig: GlobalConfig = {
  slug: 'homePage',
  label: "Page d'accueil",
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/`,
  },
  fields: homePageFields,
}

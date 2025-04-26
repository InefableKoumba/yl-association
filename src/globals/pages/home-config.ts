import type { GlobalConfig } from 'payload'
import { homePageFields } from './home'

export const HomeConfig: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: () => true,
  },
  fields: homePageFields,
}

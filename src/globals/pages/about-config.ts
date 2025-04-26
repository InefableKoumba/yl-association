import type { GlobalConfig } from 'payload'
import { aboutPageFields } from './about'

export const AboutConfig: GlobalConfig = {
  slug: 'aboutPage',
  access: {
    read: () => true,
  },
  fields: aboutPageFields,
}

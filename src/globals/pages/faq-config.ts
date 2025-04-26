import type { GlobalConfig } from 'payload'
import { faqPageFields } from './faq'

export const FaqConfig: GlobalConfig = {
  slug: 'faqPage',
  access: {
    read: () => true,
  },
  fields: faqPageFields,
}

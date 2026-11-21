import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { faqPageFields } from './faq'

export const FaqConfig: GlobalConfig = {
  slug: 'faqPage',
  label: "Page FAQ",
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/faq`,
  },
  fields: faqPageFields,
}

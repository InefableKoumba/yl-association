import type { GlobalConfig } from 'payload'
import { contactPageFields } from './contact'

export const ContactConfig: GlobalConfig = {
  slug: 'contactPage',
  access: {
    read: () => true,
  },
  fields: contactPageFields,
}

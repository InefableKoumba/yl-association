import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { contactPageFields } from './contact'

export const ContactConfig: GlobalConfig = {
  slug: 'contactPage',
  label: "Page Contact",
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    description:
      'Téléphone, email, adresse et horaires : voir « Paramètres du site → Contact ».',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/contact`,
  },
  fields: contactPageFields,
}

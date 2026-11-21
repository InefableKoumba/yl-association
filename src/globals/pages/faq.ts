import type { Field } from 'payload'
import { heroFields } from '../../fields/hero'

export const faqPageFields: Field[] = [
  ...heroFields({ withButton: true }),
  {
    name: 'faqSectionTitle',
    type: 'text',
    defaultValue: 'Foire aux questions',
    label: 'Titre de la section FAQ',
    localized: true,
  },
  {
    name: 'faqSectionDescription',
    type: 'textarea',
    label: 'Description de la section FAQ',
    localized: true,
  },
]

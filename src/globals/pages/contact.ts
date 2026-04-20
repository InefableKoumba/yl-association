import type { Field } from 'payload'

export const contactPageFields: Field[] = [
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: "Iimage d'en-tête",
  },
  {
    name: 'heroTitle',
    type: 'text',
    label: "Titre sur l'image d'en-tête",
    localized: true,
  },
  {
    name: 'heroDescription',
    type: 'textarea',
    label: "Description sur l'image d'en-tête",
    localized: true,
  },
]

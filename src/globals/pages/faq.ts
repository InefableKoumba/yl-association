import type { Field } from 'payload'

export const faqPageFields: Field[] = [
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
  {
    name: 'heroButtonText',
    type: 'text',
    defaultValue: "Je veux m'inscrire",
    label: "Texte du bouton sur l'image d'en-tête",
    localized: true,
  },
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

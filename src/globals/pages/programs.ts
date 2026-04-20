import type { Field } from 'payload'

export const programsPageFields: Field[] = [
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
    defaultValue: 'Nous contacter',
    label: "Texte du bouton sur l'image d'en-tête",
    localized: true,
  },
  {
    name: 'programsSectionTitle',
    type: 'text',
    defaultValue: 'Nos programmes',
    label: 'Titre de la section Programmes',
    localized: true,
  },
  {
    name: 'programsSectionDescription',
    type: 'textarea',
    label: 'Description de la section Programmes',
    localized: true,
  },
]

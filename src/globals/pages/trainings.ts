import type { Field } from 'payload'

export const trainingsPageFields: Field[] = [
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
    name: 'trainingsSectionTitle',
    type: 'text',
    defaultValue: 'Nos formations',
    label: 'Titre de la section formations',
    localized: true,
  },
  {
    name: 'trainingsSectionDescription',
    type: 'textarea',
    label: 'Description de la section formations',
    localized: true,
  },
]

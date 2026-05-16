import type { Field } from 'payload'

export const aboutPageFields: Field[] = [
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: "Image d'en-tête",
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
    name: 'aboutUsSectionTitle',
    type: 'text',
    defaultValue: 'A propos de ',
    label: 'Titre de la section "A propos de "',
    localized: true,
  },
  {
    name: 'aboutUsSectionDescription',
    type: 'richText',
    label: 'Description de la section "A propos de "',
    localized: true,
  },
  {
    name: 'aboutUsGallerySectionTitle',
    type: 'text',
    defaultValue: 'Gallérie photos',
    label: 'Titre de la section "Gallérie photos"',
    localized: true,
  },
  {
    name: 'aboutUsGallerySectionDescription',
    type: 'textarea',
    label: 'Description de la section "Gallérie photos"',
    localized: true,
  },
  {
    name: 'aboutUsGallerySectionImages',
    type: 'array',
    maxRows: 6,
    label: 'Photos de la gallérie',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    name: 'joinMissionTitle',
    type: 'text',
    label: 'Titre "Rejoignez notre mission"',
    localized: true,
  },
  {
    name: 'joinMissionDescription',
    type: 'textarea',
    label: 'Description "Rejoignez notre mission"',
    localized: true,
  },
]

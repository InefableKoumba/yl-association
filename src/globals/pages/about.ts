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
  },
  {
    name: 'heroDescription',
    type: 'textarea',
    label: "Description sur l'image d'en-tête",
  },
  {
    name: 'heroButtonText',
    type: 'text',
    defaultValue: "Je veux m'inscrire",
    label: "Texte du bouton sur l'image d'en-tête",
  },
  {
    name: 'aboutUsSectionTitle',
    type: 'text',
    defaultValue: 'A propos de ',
    label: 'Titre de la section "A propos de "',
  },
  {
    name: 'aboutUsSectionDescription',
    type: 'richText',
    label: 'Description de la section "A propos de "',
  },
  {
    name: 'aboutUsGallerySectionTitle',
    type: 'text',
    defaultValue: 'Gallérie photos',
    label: 'Titre de la section "Gallérie photos"',
  },
  {
    name: 'aboutUsGallerySectionDescription',
    type: 'textarea',
    label: 'Description de la section "Gallérie photos"',
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
]

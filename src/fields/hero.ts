import type { Field } from 'payload'

/** Standard hero fields shared by the inner pages (data stays top-level). */
export const heroFields = ({ withButton = false } = {}): Field[] => [
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: "Image d'en-tête",
  },
  {
    name: 'heroTitle',
    type: 'text',
    label: 'Titre',
    localized: true,
  },
  {
    name: 'heroDescription',
    type: 'textarea',
    label: 'Description',
    localized: true,
  },
  ...(withButton
    ? ([
        {
          name: 'heroButtonText',
          type: 'text',
          defaultValue: "Je veux m'inscrire",
          label: 'Texte du bouton',
          localized: true,
        },
      ] as Field[])
    : []),
]

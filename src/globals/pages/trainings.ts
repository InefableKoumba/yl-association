import type { Field } from 'payload'
import { heroFields } from '../../fields/hero'

export const trainingsPageFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Héro',
        fields: heroFields({ withButton: true }),
      },
      {
        label: 'Catalogue',
        fields: [
          {
            name: 'trainingsSectionTitle',
            type: 'text',
            defaultValue: 'Nos formations',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'trainingsSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
        ],
      },
      {
        label: 'Appel à l’action',
        fields: [
          {
            name: 'ctaTitle',
            type: 'text',
            label: 'Titre',
            localized: true,
            admin: { placeholder: "Besoin d'une formation sur mesure ?" },
          },
          {
            name: 'ctaDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
        ],
      },
    ],
  },
]

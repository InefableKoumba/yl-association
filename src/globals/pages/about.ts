import type { Field } from 'payload'
import { heroFields } from '../../fields/hero'

export const aboutPageFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Héro',
        fields: heroFields({ withButton: true }),
      },
      {
        label: 'Notre histoire',
        fields: [
          {
            name: 'aboutUsSectionTitle',
            type: 'text',
            defaultValue: 'A propos de ',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'aboutUsSectionDescription',
            type: 'richText',
            label: 'Texte',
            localized: true,
          },
          {
            name: 'showValues',
            type: 'checkbox',
            label: "Afficher la mission, la vision et les valeurs (contenu de la page d'accueil)",
            defaultValue: true,
          },
          {
            name: 'showTeam',
            type: 'checkbox',
            label: "Afficher l'équipe",
            defaultValue: true,
          },
        ],
      },
      {
        label: 'Galerie',
        fields: [
          {
            name: 'aboutUsGallerySectionTitle',
            type: 'text',
            defaultValue: 'Gallérie photos',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'aboutUsGallerySectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'aboutUsGallerySectionImages',
            type: 'array',
            maxRows: 6,
            label: 'Photos',
            labels: { singular: 'Photo', plural: 'Photos' },
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
              },
            ],
          },
        ],
      },
      {
        label: 'Appel à l’action',
        fields: [
          {
            name: 'joinMissionTitle',
            type: 'text',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'joinMissionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
        ],
      },
    ],
  },
]

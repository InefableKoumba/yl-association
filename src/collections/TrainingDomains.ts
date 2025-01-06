import type { CollectionConfig } from 'payload'

export const TrainingDomains: CollectionConfig = {
  slug: 'trainingDomains',
  labels: {
    singular: 'Domaine de formation',
    plural: 'Domaines de formation',
  },
  fields: [
    {
      name: 'name',
      label: 'Nom du domaine de formation',
      type: 'text',
    },
    {
      name: 'trainings',
      label: 'Liste des formations de ce domaine',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Nom de la formation',
          type: 'text',
        },
        {
          name: 'shortDescription',
          label: 'Description de la formation',
          type: 'textarea',
        },
        {
          name: 'longDescription',
          label: 'Description détaillée de la formation',
          type: 'richText',
        },
        {
          name: 'price',
          label: 'Prix',
          type: 'text',
        },
      ],
    },
  ],
}

import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const TrainingDomains: CollectionConfig = {
  slug: 'trainingDomains',
  labels: {
    singular: 'Domaine de formation',
    plural: 'Domaines de formation',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Formations & Programmes',
    useAsTitle: 'name',
    defaultColumns: ['name', 'image', 'order', 'updatedAt'],
    description: 'Chaque domaine regroupe plusieurs formations.',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      label: 'Nom du domaine de formation',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      label: 'Description du domaine',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      admin: { position: 'sidebar' },
    },
    {
      name: 'trainings',
      label: 'Liste des formations de ce domaine',
      type: 'array',
      labels: { singular: 'Formation', plural: 'Formations' },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '/components/admin/RowLabel#TrainingRowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          label: 'Nom de la formation',
          type: 'text',
          localized: true,
        },
        {
          name: 'shortDescription',
          label: 'Description courte',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'longDescription',
          label: 'Description détaillée',
          type: 'richText',
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'price',
              label: 'Prix',
              type: 'text',
              localized: true,
              admin: { placeholder: 'Sur demande', width: '50%' },
            },
            {
              name: 'duration',
              label: 'Durée',
              type: 'text',
              localized: true,
              admin: { placeholder: '2-5 jours', width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'participants',
              label: 'Participants',
              type: 'text',
              localized: true,
              admin: { placeholder: '15 maximum', width: '33%' },
            },
            {
              name: 'nextSession',
              label: 'Prochaine session',
              type: 'text',
              localized: true,
              admin: { placeholder: 'Sur demande', width: '33%' },
            },
            {
              name: 'format',
              label: 'Lieu / Format',
              type: 'text',
              localized: true,
              admin: { placeholder: 'En présentiel ou à distance', width: '33%' },
            },
          ],
        },
        {
          name: 'learningPoints',
          label: 'Ce que vous apprendrez',
          type: 'array',
          labels: { singular: 'Point', plural: 'Points' },
          fields: [
            {
              name: 'point',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

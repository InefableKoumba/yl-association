import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Programme',
    plural: 'Programmes',
  },
  fields: [
    {
      name: 'name',
      label: 'Nom du domaine de programme',
      type: 'text',
      localized: true,
    },
    {
      name: 'shortDescription',
      label: 'Courte description du programme',
      type: 'text',
      localized: true,
    },
    {
      name: 'longDescription',
      label: 'Description détaillée du programme',
      type: 'richText',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

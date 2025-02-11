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
    },
    {
      name: 'shortDescription',
      label: 'Courte description du programme',
      type: 'text',
    },
    {
      name: 'longDescription',
      label: 'Description détaillée du programme',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

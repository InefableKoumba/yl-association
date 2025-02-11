import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partenaire',
    plural: 'Partenaires',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du partenaire',
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Lien du site web du partenaire',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo du partenaire',
    },
  ],
}

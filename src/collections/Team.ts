import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom complet',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Rôle / Fonction',
      localized: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Biographie',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      admin: {
        description: 'Plus le nombre est petit, plus le membre apparaît en premier',
      },
    },
  ],
}

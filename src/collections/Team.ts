import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: "Membre de l'équipe",
    plural: 'Équipe',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Contenu',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'updatedAt'],
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
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
      ],
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
        position: 'sidebar',
        description: 'Plus le nombre est petit, plus le membre apparaît en premier',
      },
    },
  ],
}

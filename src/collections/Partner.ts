import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partenaire',
    plural: 'Partenaires',
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
    defaultColumns: ['name', 'logo', 'websiteUrl', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom du partenaire',
      localized: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Lien du site web du partenaire',
      admin: { description: 'Adresse complète, ex : https://www.exemple.org' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo du partenaire',
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      admin: { position: 'sidebar' },
    },
  ],
}

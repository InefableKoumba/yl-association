import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

/** Simple content pages: legal notice, privacy policy, terms of use… */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page de contenu',
    plural: 'Pages de contenu',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Pages du site',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'showInFooter', 'updatedAt'],
    description:
      'Pages simples (mentions légales, confidentialité, conditions…) accessibles à l’adresse /slug.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
      localized: true,
    },
    slugField('title'),
    {
      name: 'showInFooter',
      type: 'checkbox',
      label: 'Afficher dans le pied de page',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}

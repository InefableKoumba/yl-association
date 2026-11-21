import type { CollectionConfig } from 'payload'
import { authenticated, publishedOrAuthenticated } from '../access'
import { slugField } from '../fields/slug'

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Article',
    plural: 'Blog',
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', '_status', 'updatedAt'],
    description: 'Articles et actualités. Enregistrez un brouillon puis publiez quand il est prêt.',
    listSearchableFields: ['title', 'slug', 'author'],
  },
  defaultSort: '-publishedDate',
  versions: {
    drafts: {
      autosave: { interval: 1500 },
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image à la une',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extrait / Résumé',
      localized: true,
      admin: {
        description: 'Court texte affiché dans la liste des articles et dans les moteurs de recherche.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenu',
      localized: true,
    },
    slugField('title'),
    {
      name: 'author',
      type: 'text',
      label: 'Auteur',
      defaultValue: 'Young Leaders',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Date de publication',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM yyyy',
        },
      },
    },
  ],
}

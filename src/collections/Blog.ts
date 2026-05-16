import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedDate', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL unique de l\'article (ex: mon-article-passionnant)',
      },
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
        description: 'Court texte affiché dans la liste des articles',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenu',
      localized: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Auteur',
      defaultValue: 'Young Leaders',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Date de publication',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM yyyy',
        },
      },
    },
  ],
}

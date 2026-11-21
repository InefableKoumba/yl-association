import type { FieldHook, TextField } from 'payload'

export const slugify = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const formatSlug =
  (sourceField: string): FieldHook =>
  ({ value, data, originalDoc, operation }) => {
    if (typeof value === 'string' && value.trim().length > 0) return slugify(value)
    if (operation === 'create' || !originalDoc?.slug) {
      const source = data?.[sourceField] ?? originalDoc?.[sourceField]
      if (typeof source === 'string' && source.length > 0) return slugify(source)
    }
    return value
  }

/**
 * A unique, URL-safe slug. Left empty, it is generated from `sourceField`
 * (the title) the first time the document is saved.
 */
export const slugField = (sourceField = 'title'): TextField => ({
  name: 'slug',
  type: 'text',
  label: 'Slug (URL)',
  unique: true,
  index: true,
  required: true,
  admin: {
    position: 'sidebar',
    description: 'Généré automatiquement depuis le titre si laissé vide. Ex : mon-article',
  },
  hooks: {
    beforeValidate: [formatSlug(sourceField)],
  },
})

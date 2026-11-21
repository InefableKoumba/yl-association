import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { heroFields } from '../../fields/hero'

export const BlogPage: GlobalConfig = {
  slug: 'blogPage',
  label: 'Page Blog',
  access: { read: anyone },
  admin: { group: 'Pages du site' },
  fields: heroFields(),
}

import type { GlobalConfig } from 'payload'
import { programsPageFields } from './programs'

export const ProgramsConfig: GlobalConfig = {
  slug: 'programsPage',
  access: {
    read: () => true,
  },
  fields: programsPageFields,
}

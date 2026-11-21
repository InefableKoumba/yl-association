import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { programsPageFields } from './programs'

export const ProgramsConfig: GlobalConfig = {
  slug: 'programsPage',
  label: "Page Programmes",
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/programmes`,
  },
  fields: programsPageFields,
}

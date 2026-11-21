import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'
import { trainingsPageFields } from './trainings'

export const TrainingsConfig: GlobalConfig = {
  slug: 'trainingsPage',
  label: "Page Formations",
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/domaine-de-formation`,
  },
  fields: trainingsPageFields,
}

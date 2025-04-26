import type { GlobalConfig } from 'payload'
import { trainingsPageFields } from './trainings'

export const TrainingsConfig: GlobalConfig = {
  slug: 'trainingsPage',
  access: {
    read: () => true,
  },
  fields: trainingsPageFields,
}

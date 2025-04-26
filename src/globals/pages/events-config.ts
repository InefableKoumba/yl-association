import type { GlobalConfig } from 'payload'
import { eventsPageFields } from './events'

export const EventsConfig: GlobalConfig = {
  slug: 'eventsPage',
  access: {
    read: () => true,
  },
  fields: eventsPageFields,
}

import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    plural: 'Foire aux questions',
    singular: 'Question',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Contenu',
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'updatedAt'],
    description: 'Questions fréquentes affichées sur la page FAQ (et sur l’accueil si sélectionnées).',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Question',
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Réponse',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: "Ordre d'affichage",
      admin: {
        position: 'sidebar',
        description: 'Plus le nombre est petit, plus la question apparaît tôt.',
      },
    },
  ],
}

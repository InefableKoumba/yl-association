import type { GlobalConfig } from 'payload'

export const DonationPage: GlobalConfig = {
  slug: 'donationPage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Section Héro',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Sous-titre',
          localized: true,
        },
        {
          name: 'cta',
          type: 'text',
          label: 'Texte du bouton',
          localized: true,
        },
      ],
    },
    {
      name: 'impact',
      type: 'group',
      label: 'Section Impact',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre de la section',
          localized: true,
        },
        {
          name: 'tiers',
          type: 'array',
          label: "Paliers d'impact",
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titre du palier',
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'faq',
      type: 'group',
      label: 'Section FAQ',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre de la section',
          localized: true,
        },
        {
          name: 'questions',
          type: 'array',
          label: 'Questions / Réponses',
          fields: [
            {
              name: 'question',
              type: 'text',
              label: 'Question',
              localized: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              label: 'Réponse',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'help',
      type: 'group',
      label: 'Section Aide',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titre',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
        },
        {
          name: 'cta',
          type: 'text',
          label: 'Texte du bouton',
          localized: true,
        },
      ],
    },
  ],
}

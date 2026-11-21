import type { GlobalConfig } from 'payload'
import { anyone } from '../../access'

export const DonationPage: GlobalConfig = {
  slug: 'donationPage',
  label: 'Page Faire un don',
  access: {
    read: anyone,
  },
  admin: {
    group: 'Pages du site',
    description: 'Le lien vers la plateforme de don se règle dans « Paramètres du site → Dons ».',
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/faire-un-don`,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Héro',
          fields: [
            { name: 'title', type: 'text', label: 'Titre', localized: true },
            { name: 'subtitle', type: 'textarea', label: 'Sous-titre', localized: true },
            { name: 'cta', type: 'text', label: 'Texte du bouton de don', localized: true },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Image de fond' },
          ],
        },
        {
          name: 'impact',
          label: 'Impact',
          fields: [
            { name: 'title', type: 'text', label: 'Titre de la section', localized: true },
            {
              name: 'tiers',
              type: 'array',
              label: "Paliers d'impact",
              labels: { singular: 'Palier', plural: 'Paliers' },
              fields: [
                { name: 'title', type: 'text', label: 'Titre du palier', localized: true },
                { name: 'description', type: 'textarea', label: 'Description', localized: true },
              ],
            },
          ],
        },
        {
          name: 'donateCard',
          label: 'Encart de don',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Titre',
              localized: true,
              admin: { placeholder: 'Prêt à contribuer ?' },
            },
            { name: 'description', type: 'textarea', label: 'Description', localized: true },
            {
              name: 'notice',
              type: 'textarea',
              label: 'Note de redirection',
              localized: true,
            },
          ],
        },
        {
          name: 'faq',
          label: 'FAQ',
          fields: [
            { name: 'title', type: 'text', label: 'Titre de la section', localized: true },
            {
              name: 'questions',
              type: 'array',
              label: 'Questions / Réponses',
              labels: { singular: 'Question', plural: 'Questions' },
              fields: [
                { name: 'question', type: 'text', label: 'Question', localized: true },
                { name: 'answer', type: 'textarea', label: 'Réponse', localized: true },
              ],
            },
          ],
        },
        {
          name: 'help',
          label: 'Aide',
          fields: [
            { name: 'title', type: 'text', label: 'Titre', localized: true },
            { name: 'description', type: 'textarea', label: 'Description', localized: true },
            { name: 'cta', type: 'text', label: 'Texte du bouton', localized: true },
          ],
        },
      ],
    },
  ],
}

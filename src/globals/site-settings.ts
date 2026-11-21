import type { GlobalConfig } from 'payload'
import { anyone } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  access: {
    read: anyone,
  },
  admin: {
    group: 'Configuration',
    description: 'Navigation, coordonnées, réseaux sociaux et référencement pour tout le site.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navigation',
              type: 'array',
              label: 'Liens du menu',
              labels: { singular: 'Lien', plural: 'Liens' },
              admin: {
                description:
                  'Laissez vide pour utiliser le menu par défaut (Accueil, À propos, Formations, Programmes, Blog).',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Libellé',
                      required: true,
                      localized: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: 'URL',
                      required: true,
                      admin: { placeholder: '/a-propos' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'announcement',
              type: 'group',
              label: "Bandeau d'annonce",
              admin: { description: 'Petite barre bleue tout en haut du site.' },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Afficher le bandeau',
                  defaultValue: true,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Texte',
                  localized: true,
                  admin: { placeholder: "Soutenez notre mission en faisant un don aujourd'hui !" },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'linkLabel',
                      type: 'text',
                      label: 'Texte du lien',
                      localized: true,
                      admin: { placeholder: 'Faire un don' },
                    },
                    {
                      name: 'linkUrl',
                      type: 'text',
                      label: 'URL du lien',
                      admin: { placeholder: '/faire-un-don' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              label: 'Coordonnées',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'phone', type: 'text', label: 'Téléphone' },
                    { name: 'email', type: 'text', label: 'Email' },
                  ],
                },
                {
                  name: 'address',
                  type: 'textarea',
                  label: 'Adresse',
                  localized: true,
                },
                {
                  name: 'mapUrl',
                  type: 'text',
                  label: 'Lien Google Maps',
                  admin: {
                    description:
                      "Optionnel. Sinon, le lien « Voir sur la carte » recherche l'adresse ci-dessus.",
                  },
                },
                {
                  name: 'openingHours',
                  type: 'textarea',
                  label: "Horaires d'ouverture",
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Pied de page & réseaux',
          fields: [
            {
              name: 'footer',
              type: 'group',
              label: 'Pied de page',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                  label: "Description de l'association",
                  localized: true,
                },
                {
                  name: 'missionStatement',
                  type: 'textarea',
                  label: 'Phrase de mission',
                  localized: true,
                },
              ],
            },
            {
              name: 'socialLinks',
              type: 'group',
              label: 'Réseaux sociaux',
              admin: { description: 'Seuls les liens renseignés sont affichés.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'facebook', type: 'text', label: 'Facebook' },
                    { name: 'instagram', type: 'text', label: 'Instagram' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'linkedin', type: 'text', label: 'LinkedIn' },
                    { name: 'youtube', type: 'text', label: 'YouTube' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Dons',
          fields: [
            {
              name: 'donationExternalUrl',
              type: 'text',
              label: 'URL de la plateforme de don',
              required: true,
              defaultValue: 'https://partner-donation-site.com',
              admin: {
                description: 'Les visiteurs sont redirigés vers ce lien pour effectuer un don.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'Référencement par défaut',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Meta titre',
                  localized: true,
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta description',
                  localized: true,
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image de partage (Open Graph)',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Programme',
    plural: 'Programmes',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Formations & Programmes',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status', 'isRegistrationAvailable'],
    description: 'Événements, conférences et ateliers. Passez le statut à « Passé » une fois terminé.',
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      label: 'Titre du programme',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  label: 'Date',
                  type: 'date',
                  required: true,
                  admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
                },
                {
                  name: 'time',
                  label: 'Heure',
                  type: 'text',
                  required: true,
                  admin: { placeholder: '09h00 - 17h00' },
                },
              ],
            },
            {
              name: 'location',
              label: 'Lieu',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image principale',
            },
            {
              name: 'shortDescription',
              label: 'Description courte',
              type: 'textarea',
              required: true,
              localized: true,
              admin: { description: 'Affichée sur les cartes de programme.' },
            },
            {
              name: 'longDescription',
              label: 'Description détaillée',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          label: 'Inscription',
          fields: [
            {
              name: 'isRegistrationAvailable',
              label: 'Inscription disponible',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'registrationLink',
              label: "Lien d'inscription",
              type: 'text',
              defaultValue: '#',
              admin: {
                description:
                  "Lien externe (formulaire, billetterie…). Laissez « # » ou vide pour rediriger vers la page de contact.",
                condition: (_, siblingData) => Boolean(siblingData?.isRegistrationAvailable),
              },
            },
            {
              name: 'maximumParticipants',
              label: 'Nombre maximum de participants',
              type: 'number',
              min: 1,
            },
          ],
        },
        {
          label: 'Galerie',
          description: 'Photos affichées sur la page du programme (idéal pour les programmes passés).',
          fields: [
            {
              name: 'gallery',
              label: 'Photos',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Photos' },
              maxRows: 24,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        { label: 'À venir', value: 'upcoming' },
        { label: 'Passé', value: 'past' },
      ],
      defaultValue: 'upcoming',
      required: true,
      admin: { position: 'sidebar' },
    },
  ],
}

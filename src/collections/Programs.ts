import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Programme',
    plural: 'Programmes',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status'],
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du programme',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select',
      options: [
        {
          label: 'À venir',
          value: 'upcoming',
        },
        {
          label: 'Passé',
          value: 'past',
        },
      ],
      defaultValue: 'upcoming',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
    },
    {
      name: 'time',
      label: 'Heure',
      type: 'text',
      required: true,
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
      label: 'Image',
    },
    {
      name: 'shortDescription',
      label: 'Description courte',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'longDescription',
      label: 'Description détaillée',
      type: 'richText',
      localized: true,
    },
    {
      name: 'registrationLink',
      label: "Lien d'inscription",
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'isRegistrationAvailable',
      label: 'Inscription disponible',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'maximumParticipants',
      label: 'Nombre maximum de participants',
      type: 'number',
    },
  ],
}

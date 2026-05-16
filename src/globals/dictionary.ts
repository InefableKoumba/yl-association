import type { GlobalConfig } from 'payload'

export const Dictionary: GlobalConfig = {
  slug: 'dictionary',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'common',
      type: 'group',
      label: 'Communs',
      fields: [
        { name: 'learnMore', type: 'text', label: 'En savoir plus', localized: true },
        { name: 'register', type: 'text', label: "S'inscrire", localized: true },
        { name: 'contactUs', type: 'text', label: 'Contactez-nous', localized: true },
        { name: 'search', type: 'text', label: 'Rechercher', localized: true },
        { name: 'submit', type: 'text', label: 'Envoyer', localized: true },
        { name: 'loading', type: 'text', label: 'Chargement...', localized: true },
      ],
    },
    {
      name: 'trainings',
      type: 'group',
      label: 'Formations',
      fields: [
        { name: 'duration', type: 'text', label: 'Durée', localized: true },
        { name: 'location', type: 'text', label: 'Lieu', localized: true },
        { name: 'price', type: 'text', label: 'Prix', localized: true },
        { name: 'upcoming', type: 'text', label: 'À venir', localized: true },
      ],
    },
    {
      name: 'forms',
      type: 'group',
      label: 'Formulaires',
      fields: [
        { name: 'fullName', type: 'text', label: 'Nom complet', localized: true },
        { name: 'email', type: 'text', label: 'Email', localized: true },
        { name: 'phone', type: 'text', label: 'Téléphone', localized: true },
        { name: 'subject', type: 'text', label: 'Sujet', localized: true },
        { name: 'message', type: 'text', label: 'Message', localized: true },
        { name: 'gender', type: 'text', label: 'Genre', localized: true },
        { name: 'send', type: 'text', label: 'Envoyer', localized: true },
        { name: 'sending', type: 'text', label: 'Envoi en cours...', localized: true },
        { name: 'successTitle', type: 'text', label: 'Succès', localized: true },
        { name: 'successMessage', type: 'textarea', label: 'Message de succès', localized: true },
        { name: 'errorMessage', type: 'textarea', label: "Message d'erreur", localized: true },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        { name: 'success', type: 'text', label: 'Succès inscription', localized: true },
        { name: 'error', type: 'text', label: 'Erreur inscription', localized: true },
        { name: 'placeholder', type: 'text', label: 'Placeholder email', localized: true },
      ],
    },
  ],
}

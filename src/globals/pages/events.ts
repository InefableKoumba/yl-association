import type { Field } from 'payload'

export const eventsPageFields: Field[] = [
  {
    name: 'heroImagePage',
    type: 'upload',
    relationTo: 'media',
    label: "Image d'en-tête",
  },
  {
    name: 'heroTitle',
    type: 'text',
    defaultValue: 'Événements',
    label: "Titre sur l'image d'en-tête",
  },
  {
    name: 'heroDescription',
    type: 'textarea',
    defaultValue:
      'Découvrez nos événements à venir et rejoignez notre communauté de jeunes leaders',
    label: "Description sur l'image d'en-tête",
  },
  {
    name: 'upcomingEventsSectionTitle',
    type: 'text',
    defaultValue: 'Événements à venir',
    label: 'Titre de la section événements à venir',
  },
  {
    name: 'pastEventsSectionTitle',
    type: 'text',
    defaultValue: 'Événements passés',
    label: 'Titre de la section événements passés',
  },
  {
    name: 'ctaSectionTitle',
    type: 'text',
    defaultValue: 'Vous souhaitez proposer un événement ou devenir intervenant?',
    label: "Titre de la section d'appel à l'action",
  },
  {
    name: 'ctaSectionDescription',
    type: 'textarea',
    defaultValue:
      "Nous sommes toujours à la recherche de nouvelles idées et de nouveaux talents pour enrichir notre communauté. Si vous avez une idée d'événement ou si vous souhaitez partager votre expertise, n'hésitez pas à nous contacter.",
    label: "Description de la section d'appel à l'action",
  },
  {
    name: 'proposeEventButtonText',
    type: 'text',
    defaultValue: 'Proposer un événement',
    label: 'Texte du bouton pour proposer un événement',
  },
  {
    name: 'becomeSpeakerButtonText',
    type: 'text',
    defaultValue: 'Devenir intervenant',
    label: 'Texte du bouton pour devenir intervenant',
  },
]

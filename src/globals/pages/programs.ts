import type { Field } from 'payload'

export const programsPageFields: Field[] = [
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: "Image d'en-tête",
  },
  {
    name: 'heroTitle',
    type: 'text',
    defaultValue: 'Nos Programmes',
    label: "Titre sur l'image d'en-tête",
    localized: true,
  },
  {
    name: 'heroDescription',
    type: 'textarea',
    defaultValue: 'Découvrez nos programmes et rejoignez notre communauté de jeunes leaders',
    label: "Description sur l'image d'en-tête",
    localized: true,
  },
  {
    name: 'upcomingProgramsSectionTitle',
    type: 'text',
    defaultValue: 'Programmes à venir',
    label: 'Titre de la section programmes à venir',
    localized: true,
  },
  {
    name: 'pastProgramsSectionTitle',
    type: 'text',
    defaultValue: 'Programmes passés',
    label: 'Titre de la section programmes passés',
    localized: true,
  },
  {
    name: 'ctaSectionTitle',
    type: 'text',
    defaultValue: 'Vous souhaitez proposer un programme ou devenir intervenant?',
    label: "Titre de la section d'appel à l'action",
    localized: true,
  },
  {
    name: 'ctaSectionDescription',
    type: 'textarea',
    defaultValue:
      "Nous sommes toujours à la recherche de nouvelles idées et de nouveaux talents pour enrichir notre communauté. Si vous avez une idée de programme ou si vous souhaitez partager votre expertise, n'hésitez pas à nous contacter.",
    label: "Description de la section d'appel à l'action",
    localized: true,
  },
  {
    name: 'proposeProgramButtonText',
    type: 'text',
    defaultValue: 'Proposer un programme',
    label: 'Texte du bouton pour proposer un programme',
    localized: true,
  },
  {
    name: 'becomeSpeakerButtonText',
    type: 'text',
    defaultValue: 'Devenir intervenant',
    label: 'Texte du bouton pour devenir intervenant',
    localized: true,
  },
]

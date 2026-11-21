import type { Field } from 'payload'

export const programsPageFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Héro',
        fields: [
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
            label: 'Titre',
            localized: true,
          },
          {
            name: 'heroDescription',
            type: 'textarea',
            defaultValue: 'Découvrez nos programmes et rejoignez notre communauté de jeunes leaders',
            label: 'Description',
            localized: true,
          },
        ],
      },
      {
        label: 'Sections',
        fields: [
          {
            name: 'upcomingProgramsSectionTitle',
            type: 'text',
            defaultValue: 'Programmes à venir',
            label: 'Titre — programmes à venir',
            localized: true,
          },
          {
            name: 'pastProgramsSectionTitle',
            type: 'text',
            defaultValue: 'Programmes passés',
            label: 'Titre — programmes passés',
            localized: true,
          },
        ],
      },
      {
        label: 'Appel à l’action',
        fields: [
          {
            name: 'ctaSectionTitle',
            type: 'text',
            defaultValue: 'Vous souhaitez proposer un programme ou devenir intervenant?',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'ctaSectionDescription',
            type: 'textarea',
            defaultValue:
              "Nous sommes toujours à la recherche de nouvelles idées et de nouveaux talents pour enrichir notre communauté. Si vous avez une idée de programme ou si vous souhaitez partager votre expertise, n'hésitez pas à nous contacter.",
            label: 'Description',
            localized: true,
          },
          {
            type: 'row',
            fields: [
              {
                name: 'proposeProgramButtonText',
                type: 'text',
                defaultValue: 'Proposer un programme',
                label: 'Bouton « proposer un programme »',
                localized: true,
              },
              {
                name: 'becomeSpeakerButtonText',
                type: 'text',
                defaultValue: 'Devenir intervenant',
                label: 'Bouton « devenir intervenant »',
                localized: true,
              },
            ],
          },
        ],
      },
    ],
  },
]

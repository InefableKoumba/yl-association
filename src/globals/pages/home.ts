import type { Field } from 'payload'
import { enabledField, iconOptions } from '../../fields/common'

/**
 * Home page content. Every tab is *named*, which stores its data exactly
 * like the groups used previously (heroSection, missionVisionSection, …).
 */
export const homePageFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      // Hero
      {
        name: 'heroSection',
        label: 'Héro',
        description: "Grande bannière en haut de la page d'accueil.",
        fields: [
          {
            name: 'heroImages',
            type: 'array',
            label: "Images d'en-tête",
            labels: { singular: 'Image', plural: 'Images' },
            maxRows: 5,
            fields: [
              {
                name: 'heroImage',
                type: 'upload',
                relationTo: 'media',
                label: 'Image',
              },
            ],
            admin: {
              description:
                "Jusqu'à 5 images. Plusieurs images défilent automatiquement en fondu.",
            },
          },
          {
            name: 'heroSubtitle',
            type: 'text',
            label: 'Sur-titre (petit texte au-dessus du titre)',
            localized: true,
            admin: { placeholder: 'Young Leaders Association' },
          },
          {
            name: 'heroTitle',
            type: 'text',
            label: 'Titre principal',
            localized: true,
          },
          {
            name: 'heroDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            type: 'row',
            fields: [
              {
                name: 'heroPrimaryButtonText',
                type: 'text',
                defaultValue: "S'inscrire",
                label: 'Texte du bouton principal',
                localized: true,
                admin: { width: '50%' },
              },
              {
                name: 'heroPrimaryButtonLink',
                type: 'text',
                defaultValue: '/contact',
                label: 'Lien du bouton principal',
                admin: { width: '50%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'heroSecondaryButtonText',
                type: 'text',
                defaultValue: 'En savoir plus',
                label: 'Texte du bouton secondaire',
                localized: true,
                admin: { width: '50%' },
              },
              {
                name: 'heroSecondaryButtonLink',
                type: 'text',
                defaultValue: '/about',
                label: 'Lien du bouton secondaire',
                admin: { width: '50%' },
              },
            ],
          },
          {
            name: 'heroStats',
            type: 'array',
            label: 'Chiffres clés du héro',
            labels: { singular: 'Chiffre', plural: 'Chiffres' },
            maxRows: 4,
            admin: {
              description: 'Affichés sous la bannière (ex : 425+ personnes formées).',
            },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'value',
                    type: 'text',
                    label: 'Valeur (ex: 425+)',
                    required: true,
                  },
                  {
                    name: 'label',
                    type: 'text',
                    label: 'Libellé (ex: personnes formées)',
                    required: true,
                    localized: true,
                  },
                  {
                    name: 'icon',
                    type: 'select',
                    label: 'Icône',
                    options: iconOptions,
                    required: true,
                    defaultValue: 'users',
                  },
                ],
              },
            ],
            defaultValue: [
              { value: '425+', label: 'personnes formées', icon: 'users' },
              { value: '45+', label: 'formations disponibles', icon: 'graduation' },
              { value: '25+', label: 'programmes organisés', icon: 'calendar' },
            ],
          },
        ],
      },

      // Mission & vision
      {
        name: 'missionVisionSection',
        label: 'Mission & Vision',
        fields: [
          enabledField(),
          {
            type: 'row',
            fields: [
              {
                name: 'missionTitle',
                type: 'text',
                defaultValue: 'Notre Mission',
                label: 'Étiquette mission',
                localized: true,
              },
              {
                name: 'visionTitle',
                type: 'text',
                defaultValue: 'Notre Vision',
                label: 'Étiquette vision',
                localized: true,
              },
            ],
          },
          {
            name: 'missionHeading',
            type: 'text',
            defaultValue: 'Former la prochaine génération de leaders',
            label: 'Titre de la mission',
            localized: true,
          },
          {
            name: 'missionDescription',
            type: 'textarea',
            defaultValue:
              'Notre mission est de développer le potentiel de leadership des jeunes talents à travers des formations innovantes, du mentorat personnalisé et des opportunités de mise en pratique concrètes.',
            label: 'Description de la mission (paragraphe 1)',
            localized: true,
          },
          {
            name: 'missionDescription2',
            type: 'textarea',
            defaultValue:
              "Nous nous engageons à créer un environnement favorable à l'apprentissage, l'échange et la croissance personnelle, où chacun peut développer les compétences nécessaires pour avoir un impact positif dans sa communauté et sa carrière.",
            label: 'Description de la mission (paragraphe 2)',
            localized: true,
          },
          {
            name: 'visionHeading',
            type: 'text',
            defaultValue: 'Un monde où chaque jeune peut réaliser son plein potentiel',
            label: 'Titre de la vision',
            localized: true,
          },
          {
            name: 'visionDescription',
            type: 'textarea',
            defaultValue:
              'Nous aspirons à créer une société où chaque jeune, indépendamment de son origine ou de son parcours, a accès aux ressources, aux formations et au soutien nécessaires pour développer ses compétences en leadership et contribuer positivement à un avenir durable et équitable.',
            label: 'Description de la vision',
            localized: true,
          },
          {
            name: 'valuesTitle',
            type: 'text',
            defaultValue: 'Nos Valeurs Fondamentales',
            label: 'Titre des valeurs',
            localized: true,
          },
          {
            name: 'values',
            type: 'array',
            label: 'Valeurs',
            labels: { singular: 'Valeur', plural: 'Valeurs' },
            minRows: 1,
            maxRows: 8,
            fields: [
              {
                name: 'title',
                type: 'text',
                label: 'Titre',
                required: true,
                localized: true,
              },
              {
                name: 'description',
                type: 'textarea',
                label: 'Description',
                required: true,
                localized: true,
              },
            ],
            defaultValue: [
              {
                title: 'Excellence',
                description:
                  "Nous nous efforçons d'offrir des programmes de la plus haute qualité, en constante amélioration.",
              },
              {
                title: 'Innovation',
                description:
                  'Nous adoptons des approches créatives et avant-gardistes dans notre enseignement.',
              },
              {
                title: 'Inclusivité',
                description:
                  'Nous valorisons la diversité et créons un environnement où chacun se sent respecté.',
              },
              {
                title: 'Impact',
                description:
                  'Nous mesurons notre succès par les changements positifs que nos participants génèrent.',
              },
            ],
          },
        ],
      },

      // Trainings
      {
        name: 'trainingsSection',
        label: 'Formations',
        fields: [
          enabledField(),
          {
            name: 'ourTrainingsSectionTitle',
            type: 'text',
            defaultValue: 'Nos formations',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'ourTrainingsSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'trainingDomainsToFeature',
            type: 'relationship',
            relationTo: 'trainingDomains',
            hasMany: true,
            label: 'Domaines de formation à mettre en avant',
            admin: { description: 'Laissez vide pour afficher tous les domaines.' },
          },
          {
            type: 'row',
            fields: [
              {
                name: 'trainingsSectionButtonText',
                type: 'text',
                defaultValue: 'Voir toutes nos formations',
                label: 'Texte du bouton',
                localized: true,
              },
              {
                name: 'trainingsSectionButtonLink',
                type: 'text',
                defaultValue: '/formations',
                label: 'Lien du bouton',
              },
            ],
          },
        ],
      },

      // Upcoming programs
      {
        name: 'programsSection',
        label: 'Programmes',
        description: 'Affiche automatiquement les 3 prochains programmes à venir.',
        fields: [
          enabledField(),
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
        ],
      },

      // About us
      {
        name: 'aboutUsSection',
        label: 'À propos',
        fields: [
          enabledField(),
          {
            name: 'aboutUsSectionTitle',
            type: 'text',
            defaultValue: 'À propos de nous',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'aboutUsSectionSubtitle',
            type: 'text',
            label: 'Sous-titre',
            localized: true,
          },
          {
            name: 'aboutUsSectionDescription',
            type: 'richText',
            label: 'Texte',
            localized: true,
          },
          {
            name: 'highlights',
            type: 'array',
            label: 'Points forts',
            labels: { singular: 'Point fort', plural: 'Points forts' },
            maxRows: 4,
            admin: { description: 'Cartes affichées dans la section (mission, communauté…).' },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'icon',
                    type: 'select',
                    label: 'Icône',
                    options: iconOptions,
                    defaultValue: 'target',
                    admin: { width: '30%' },
                  },
                  {
                    name: 'title',
                    type: 'text',
                    label: 'Titre',
                    required: true,
                    localized: true,
                    admin: { width: '70%' },
                  },
                ],
              },
              {
                name: 'description',
                type: 'textarea',
                label: 'Description',
                localized: true,
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                name: 'aboutUsSectionButtonText',
                type: 'text',
                defaultValue: 'En savoir plus',
                label: 'Texte du bouton',
                localized: true,
              },
              {
                name: 'aboutUsSectionButtonLink',
                type: 'text',
                defaultValue: '/about',
                label: 'Lien du bouton',
              },
            ],
          },
          {
            name: 'aboutUsSectionImages',
            type: 'array',
            label: 'Images',
            labels: { singular: 'Image', plural: 'Images' },
            maxRows: 6,
            fields: [
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                label: 'Image',
              },
              {
                name: 'alt',
                type: 'text',
                label: 'Texte alternatif',
              },
            ],
          },
        ],
      },

      // Statistics
      {
        name: 'statsSection',
        label: 'Chiffres',
        fields: [
          {
            name: 'statsSectionEnabled',
            type: 'checkbox',
            defaultValue: true,
            label: 'Afficher cette section',
          },
          {
            name: 'statsSectionTitle',
            type: 'text',
            defaultValue: 'Nos chiffres',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'statsSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'stats',
            type: 'array',
            label: 'Statistiques',
            labels: { singular: 'Statistique', plural: 'Statistiques' },
            maxRows: 4,
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'value',
                    type: 'text',
                    label: 'Valeur',
                    required: true,
                  },
                  {
                    name: 'label',
                    type: 'text',
                    label: 'Libellé',
                    required: true,
                    localized: true,
                  },
                ],
              },
              {
                name: 'icon',
                type: 'upload',
                relationTo: 'media',
                label: 'Icône (optionnel)',
              },
            ],
          },
        ],
      },

      // Team
      {
        name: 'teamSection',
        label: 'Équipe',
        description: "Les membres viennent de la collection « Équipe ».",
        fields: [
          enabledField(),
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
        ],
      },

      // Testimonials
      {
        name: 'testimonialsSection',
        label: 'Témoignages',
        fields: [
          {
            name: 'testimonialsSectionEnabled',
            type: 'checkbox',
            defaultValue: true,
            label: 'Afficher cette section',
          },
          {
            name: 'testimonialsSectionTitle',
            type: 'text',
            defaultValue: 'Ce que disent nos étudiants',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'testimonialsSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'testimonials',
            type: 'array',
            label: 'Témoignages',
            labels: { singular: 'Témoignage', plural: 'Témoignages' },
            minRows: 1,
            maxRows: 6,
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'name',
                    type: 'text',
                    label: 'Nom',
                    required: true,
                    localized: true,
                  },
                  {
                    name: 'role',
                    type: 'text',
                    label: 'Rôle / Position',
                    localized: true,
                  },
                ],
              },
              {
                name: 'content',
                type: 'textarea',
                label: 'Témoignage',
                required: true,
                localized: true,
              },
              {
                name: 'photo',
                type: 'upload',
                relationTo: 'media',
                label: 'Photo',
              },
            ],
          },
        ],
      },

      // Partners
      {
        name: 'partnersSection',
        label: 'Partenaires',
        fields: [
          enabledField(),
          {
            name: 'ourPartnersSectionTitle',
            type: 'text',
            defaultValue: 'Nos partenaires',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'ourPartnersSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'partnersToShow',
            type: 'relationship',
            relationTo: 'partners',
            hasMany: true,
            label: 'Partenaires à afficher',
            admin: { description: 'Laissez vide pour afficher tous les partenaires.' },
          },
          {
            name: 'showAllPartnersLink',
            type: 'checkbox',
            defaultValue: true,
            label: 'Afficher un lien "Voir tous nos partenaires"',
          },
          {
            name: 'allPartnersLinkText',
            type: 'text',
            defaultValue: 'Voir tous nos partenaires',
            label: 'Texte du lien',
            localized: true,
            admin: {
              condition: (_, siblingData) => siblingData?.showAllPartnersLink === true,
            },
          },
        ],
      },

      // Blog
      {
        name: 'blogSection',
        label: 'Blog',
        description: 'Affiche automatiquement les 3 derniers articles publiés.',
        fields: [
          enabledField(),
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
        ],
      },

      // FAQ
      {
        name: 'faqSection',
        label: 'FAQ',
        fields: [
          enabledField(),
          {
            name: 'faqSectionTitle',
            type: 'text',
            defaultValue: 'FAQ',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'faqSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'frequentlyAskedQuestions',
            type: 'relationship',
            relationTo: 'faq',
            hasMany: true,
            label: 'Questions à afficher',
            admin: { description: 'Laissez vide pour afficher les 6 premières questions.' },
          },
          {
            type: 'row',
            fields: [
              {
                name: 'faqSectionButtonText',
                type: 'text',
                defaultValue: 'Voir toutes les questions',
                label: 'Texte du bouton',
                localized: true,
              },
              {
                name: 'faqSectionButtonLink',
                type: 'text',
                defaultValue: '/faq',
                label: 'Lien du bouton',
              },
            ],
          },
        ],
      },

      // Contact
      {
        name: 'contactSection',
        label: 'Contact',
        fields: [
          enabledField(),
          {
            name: 'contactUsSectionTitle',
            type: 'text',
            defaultValue: 'Nous contacter',
            label: 'Titre',
            localized: true,
          },
          {
            name: 'contactUsSectionDescription',
            type: 'textarea',
            label: 'Description',
            localized: true,
          },
          {
            name: 'contactUsSectionImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Image',
          },
          {
            type: 'row',
            fields: [
              {
                name: 'contactUsSectionButtonText',
                type: 'text',
                defaultValue: 'Nous contacter',
                label: 'Texte du bouton',
                localized: true,
              },
              {
                name: 'contactUsSectionButtonLink',
                type: 'text',
                defaultValue: '/contact',
                label: 'Lien du bouton',
              },
            ],
          },
        ],
      },

      // SEO
      {
        name: 'seo',
        label: 'SEO',
        description: 'Remplace les réglages SEO globaux pour la page d’accueil.',
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
]

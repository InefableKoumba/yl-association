import type { Field } from 'payload'

export const homePageFields: Field[] = [
  // Hero Section
  {
    name: 'heroSection',
    type: 'group',
    label: 'Section Héro',
    fields: [
      {
        name: 'heroImages',
        type: 'array',
        maxRows: 3,
        fields: [
          {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
            label: "Image d'en-tête",
          },
        ],
        admin: {
          description: "Ajoutez jusqu'à 3 images pour le slider de la section héro",
        },
      },
      {
        name: 'heroTitle',
        type: 'text',
        label: "Titre sur l'image d'en-tête",
        localized: true,
      },
      {
        name: 'heroSubtitle',
        type: 'text',
        label: "Sous-titre sur l'image d'en-tête",
        required: false,
        localized: true,
      },
      {
        name: 'heroDescription',
        type: 'textarea',
        required: false,
        label: "Description sur l'image d'en-tête",
        localized: true,
      },
      {
        name: 'heroPrimaryButtonText',
        type: 'text',
        defaultValue: "S'inscrire",
        label: 'Texte du bouton principal',
        required: false,
        localized: true,
      },
      {
        name: 'heroPrimaryButtonLink',
        type: 'text',
        defaultValue: '/contact',
        label: 'Lien du bouton principal',
        required: false,
      },
      {
        name: 'heroSecondaryButtonText',
        type: 'text',
        defaultValue: 'En savoir plus',
        label: 'Texte du bouton secondaire',
        required: false,
        localized: true,
      },
      {
        name: 'heroSecondaryButtonLink',
        type: 'text',
        defaultValue: '/about',
        label: 'Lien du bouton secondaire',
        required: false,
      },
      {
        name: 'heroStats',
        type: 'array',
        label: 'Statistiques du héro',
        admin: {
          description: 'Statistiques affichées dans la section héro',
        },
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
            options: [
              {
                label: 'Utilisateurs',
                value: 'users',
              },
              {
                label: 'Diplôme',
                value: 'graduation',
              },
              {
                label: 'Calendrier',
                value: 'calendar',
              },
            ],
            required: true,
            defaultValue: 'users',
          },
        ],
        defaultValue: [
          {
            value: '425+',
            label: 'personnes formées',
            icon: 'users',
          },
          {
            value: '45+',
            label: 'formations disponibles',
            icon: 'graduation',
          },
          {
            value: '25+',
            label: 'programmes organisés',
            icon: 'calendar',
          },
        ],
      },
    ],
  },

  // Mission Vision Section
  {
    name: 'missionVisionSection',
    type: 'group',
    label: 'Section Mission et Vision',
    fields: [
      {
        name: 'missionTitle',
        type: 'text',
        defaultValue: 'Notre Mission',
        label: 'Titre de la mission',
        localized: true,
      },
      {
        name: 'missionHeading',
        type: 'text',
        defaultValue: 'Former la prochaine génération de leaders',
        label: 'En-tête de la mission',
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
        required: false,
        localized: true,
      },
      {
        name: 'visionTitle',
        type: 'text',
        defaultValue: 'Notre Vision',
        label: 'Titre de la vision',
        localized: true,
      },
      {
        name: 'visionHeading',
        type: 'text',
        defaultValue: 'Un monde où chaque jeune peut réaliser son plein potentiel',
        label: 'En-tête de la vision',
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

  // About Us Section
  {
    name: 'aboutUsSection',
    type: 'group',
    label: 'Section À propos',
    fields: [
      {
        name: 'aboutUsSectionTitle',
        type: 'text',
        defaultValue: 'À propos de nous',
        label: 'Titre de la section "À propos"',
        localized: true,
      },
      {
        name: 'aboutUsSectionSubtitle',
        type: 'text',
        label: 'Sous-titre de la section "À propos"',
        required: false,
        localized: true,
      },
      {
        name: 'aboutUsSectionDescription',
        type: 'richText',
        label: 'Description de la section À propos',
        localized: true,
      },
      {
        name: 'aboutUsSectionButtonText',
        type: 'text',
        defaultValue: 'En savoir plus',
        label: 'Texte du bouton de la section "À propos"',
        localized: true,
      },
      {
        name: 'aboutUsSectionButtonLink',
        type: 'text',
        defaultValue: '/about',
        label: 'Lien du bouton de la section "À propos"',
      },
      {
        name: 'aboutUsSectionImages',
        type: 'array',
        maxRows: 6,
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Image section À propos',
          },
          {
            name: 'alt',
            type: 'text',
            label: 'Texte alternatif',
            required: false,
          },
        ],
      },
    ],
  },

  // Statistics Section
  {
    name: 'statsSection',
    type: 'group',
    label: 'Section Statistiques',
    fields: [
      {
        name: 'statsSectionEnabled',
        type: 'checkbox',
        defaultValue: true,
        label: 'Activer la section statistiques',
      },
      {
        name: 'statsSectionTitle',
        type: 'text',
        defaultValue: 'Nos chiffres',
        label: 'Titre de la section statistiques',
        localized: true,
      },
      {
        name: 'statsSectionDescription',
        type: 'textarea',
        label: 'Description de la section statistiques',
        required: false,
        localized: true,
      },
      {
        name: 'stats',
        type: 'array',
        label: 'Statistiques',
        maxRows: 4,
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
          {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            label: 'Icône (optionnel)',
            required: false,
          },
        ],
      },
    ],
  },

  // Partners Section
  {
    name: 'partnersSection',
    type: 'group',
    label: 'Section Partenaires',
    fields: [
      {
        name: 'ourPartnersSectionTitle',
        type: 'text',
        defaultValue: 'Nos partenaires',
        label: 'Titre de la section "Nos partenaires"',
        localized: true,
      },
      {
        name: 'ourPartnersSectionDescription',
        type: 'textarea',
        label: 'Description de la section "Nos partenaires"',
        localized: true,
      },
      {
        name: 'partnersToShow',
        type: 'relationship',
        relationTo: 'partners',
        hasMany: true,
        label: 'Partenaires à afficher',
        required: false,
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
        label: 'Texte du lien "Voir tous nos partenaires"',
        localized: true,
        admin: {
          condition: (data, siblingData) => siblingData?.showAllPartnersLink === true,
        },
      },
    ],
  },

  // Training Section
  {
    name: 'trainingsSection',
    type: 'group',
    label: 'Section Formations',
    fields: [
      {
        name: 'ourTrainingsSectionTitle',
        type: 'text',
        defaultValue: 'Nos formations',
        label: 'Titre de la section "Nos formations"',
        localized: true,
      },
      {
        name: 'ourTrainingsSectionDescription',
        type: 'textarea',
        label: 'Description de la section "Nos formations"',
        localized: true,
      },
      {
        name: 'trainingDomainsToFeature',
        type: 'relationship',
        relationTo: 'trainingDomains',
        hasMany: true,
        label: 'Domaines de formation à mettre en avant',
        required: false,
      },
      {
        name: 'trainingsSectionButtonText',
        type: 'text',
        defaultValue: 'Voir toutes nos formations',
        label: 'Texte du bouton de la section formations',
        localized: true,
      },
      {
        name: 'trainingsSectionButtonLink',
        type: 'text',
        defaultValue: '/formations',
        label: 'Lien du bouton de la section formations',
      },
    ],
  },

  // Testimonials Section
  {
    name: 'testimonialsSection',
    type: 'group',
    label: 'Section Témoignages',
    fields: [
      {
        name: 'testimonialsSectionEnabled',
        type: 'checkbox',
        defaultValue: true,
        label: 'Activer la section témoignages',
      },
      {
        name: 'testimonialsSectionTitle',
        type: 'text',
        defaultValue: 'Ce que disent nos étudiants',
        label: 'Titre de la section témoignages',
        localized: true,
      },
      {
        name: 'testimonialsSectionDescription',
        type: 'textarea',
        label: 'Description de la section témoignages',
        required: false,
        localized: true,
      },
      {
        name: 'testimonials',
        type: 'array',
        label: 'Témoignages',
        minRows: 1,
        maxRows: 6,
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
            required: false,
            localized: true,
          },
          {
            name: 'content',
            type: 'textarea',
            label: 'Contenu du témoignage',
            required: true,
            localized: true,
          },
          {
            name: 'photo',
            type: 'upload',
            relationTo: 'media',
            label: 'Photo',
            required: false,
          },
        ],
      },
    ],
  },

  // FAQ Section
  {
    name: 'faqSection',
    type: 'group',
    label: 'Section FAQ',
    fields: [
      {
        name: 'faqSectionTitle',
        type: 'text',
        defaultValue: 'FAQ',
        label: 'Titre de la section "FAQ"',
        localized: true,
      },
      {
        name: 'faqSectionDescription',
        type: 'textarea',
        label: 'Description de la section "FAQ"',
        localized: true,
      },
      {
        name: 'frequentlyAskedQuestions',
        type: 'relationship',
        relationTo: 'faq',
        hasMany: true,
        label: 'Questions fréquemment posées à afficher',
        required: false,
      },
      {
        name: 'faqSectionButtonText',
        type: 'text',
        defaultValue: 'Voir toutes les questions',
        label: 'Texte du bouton de la section FAQ',
        localized: true,
      },
      {
        name: 'faqSectionButtonLink',
        type: 'text',
        defaultValue: '/faq',
        label: 'Lien du bouton de la section FAQ',
      },
    ],
  },

  // Contact Section
  {
    name: 'contactSection',
    type: 'group',
    label: 'Section Contact',
    fields: [
      {
        name: 'contactUsSectionTitle',
        type: 'text',
        defaultValue: 'Nous contacter',
        label: 'Titre de la section "Nous contacter"',
        localized: true,
      },
      {
        name: 'contactUsSectionDescription',
        type: 'textarea',
        label: 'Description de la section "Nous contacter"',
        localized: true,
      },
      {
        name: 'contactUsSectionImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Image du formulaire de contact',
      },
      {
        name: 'contactUsSectionButtonText',
        type: 'text',
        defaultValue: 'Nous contacter',
        label: 'Texte du bouton de la section "Nous contacter"',
        localized: true,
      },
      {
        name: 'contactUsSectionButtonLink',
        type: 'text',
        defaultValue: '/contact',
        label: 'Lien du bouton de la section "Nous contacter"',
      },
    ],
  },

  // SEO Section
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        label: 'Meta Titre',
        required: false,
        localized: true,
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        label: 'Meta Description',
        required: false,
        localized: true,
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Image Open Graph',
        required: false,
      },
    ],
  },
]

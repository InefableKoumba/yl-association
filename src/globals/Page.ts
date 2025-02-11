import type { GlobalConfig } from 'payload'

export const Pages: GlobalConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'home',
      label: "Page d'accueil",
      type: 'group',
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
              label: "Iimage d'en-tête",
            },
          ],
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: "Titre sur l'image d'en-tête",
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          required: false,
          label: "Description sur l'image d'en-tête",
        },
        {
          name: 'aboutUsSectionTitle',
          type: 'text',
          defaultValue: 'A propos de ',
          label: 'Titre de la section "A propos de "',
        },
        {
          name: 'aboutUsSectionDescription',
          type: 'textarea',
          label: 'Description de la section A propos',
        },
        {
          name: 'aboutUsSectionButtonText',
          type: 'text',
          defaultValue: 'En savoir plus',
          label: 'Texte du bouton de la section "A propos"',
        },
        {
          name: 'aboutUsSectionImages',
          type: 'array',
          maxRows: 6,
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image section A propos',
            },
          ],
        },

        {
          name: 'ourPartnersSectionTitle',
          type: 'textarea',
          defaultValue: 'Nos partenaires',
          label: 'Titre de la section "Nos partenaires"',
        },
        {
          name: 'ourPartnersSectionDescription',
          type: 'textarea',
          label: 'Description de la section "Nos partenaires"',
        },

        {
          name: 'ourTrainingsSectionTitle',
          type: 'textarea',
          defaultValue: 'Nos formations',
          label: 'Titre de la section "Nos formations"',
        },
        {
          name: 'ourTrainingsSectionDescription',
          type: 'textarea',
          label: 'Description de la section "Nos formations"',
        },

        {
          name: 'faqSectionTitle',
          type: 'textarea',
          defaultValue: 'FAQ',
          label: 'Titre de la section "FAQ"',
        },
        {
          name: 'faqSectionDescription',
          type: 'textarea',
          label: 'Description de la section "FAQ"',
        },

        {
          name: 'contactUsSectionTitle',
          type: 'textarea',
          label: 'Titre de la section "Nous contacter"',
        },
        {
          name: 'contactUsSectionDescription',
          type: 'textarea',
          label: 'Description de la section "Nous contacter"',
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
        },
        {
          name: 'newsletterSectionTitle',
          type: 'text',
          defaultValue: 'Réjoignez notre newsletter',
          label: 'Titre de la section "Newsletter"',
        },
        {
          name: 'newsletterSectionDescription',
          type: 'text',
          label: 'Description de la section "Newsletter"',
        },
      ],
    },
    {
      name: 'about',
      label: 'Page A propos',
      type: 'group',
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
          label: "Titre sur l'image d'en-tête",
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: "Description sur l'image d'en-tête",
        },
        {
          name: 'heroButtonText',
          type: 'text',
          defaultValue: "Je veux m'inscrire",
          label: "Texte du bouton sur l'image d'en-tête",
        },
        {
          name: 'aboutUsSectionTitle',
          type: 'text',
          defaultValue: 'A propos de ',
          label: 'Titre de la section "A propos de "',
        },
        {
          name: 'aboutUsSectionDescription',
          type: 'richText',
          label: 'Description de la section "A propos de "',
        },
        {
          name: 'aboutUsGallerySectionTitle',
          type: 'text',
          defaultValue: 'Gallérie photos',
          label: 'Titre de la section "Gallérie photos"',
        },
        {
          name: 'aboutUsGallerySectionDescription',
          type: 'textarea',
          label: 'Description de la section "Gallérie photos"',
        },
        {
          name: 'aboutUsGallerySectionImages',
          type: 'array',
          maxRows: 6,
          label: 'Photos de la gallérie',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'trainings',
      label: 'Page formations',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: "Iimage d'en-tête",
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: "Titre sur l'image d'en-tête",
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: "Description sur l'image d'en-tête",
        },
        {
          name: 'heroButtonText',
          type: 'text',
          defaultValue: "Je veux m'inscrire",
          label: "Texte du bouton sur l'image d'en-tête",
        },
        {
          name: 'trainingsSectionTitle',
          type: 'text',
          defaultValue: 'Nos formations',
          label: 'Titre de la section formations',
        },
        {
          name: 'trainingsSectionDescription',
          type: 'textarea',
          label: 'Description de la section formations',
        },
      ],
    },
    {
      name: 'contact',
      label: 'Page Contact',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: "Iimage d'en-tête",
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: "Titre sur l'image d'en-tête",
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: "Description sur l'image d'en-tête",
        },
      ],
    },
    {
      name: 'faq',
      label: 'Page FAQ',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: "Iimage d'en-tête",
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: "Titre sur l'image d'en-tête",
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: "Description sur l'image d'en-tête",
        },
        {
          name: 'heroButtonText',
          type: 'text',
          defaultValue: "Je veux m'inscrire",
          label: "Texte du bouton sur l'image d'en-tête",
        },
        {
          name: 'faqSectionTitle',
          type: 'text',
          defaultValue: 'Foire aux questions',
          label: 'Titre de la section FAQ',
        },
        {
          name: 'faqSectionDescription',
          type: 'textarea',
          label: 'Description de la section FAQ',
        },
      ],
    },
    {
      name: 'programs',
      label: 'Page Programmes',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: "Iimage d'en-tête",
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: "Titre sur l'image d'en-tête",
        },
        {
          name: 'heroDescription',
          type: 'textarea',
          label: "Description sur l'image d'en-tête",
        },
        {
          name: 'heroButtonText',
          type: 'text',
          defaultValue: 'Nous contacter',
          label: "Texte du bouton sur l'image d'en-tête",
        },
        {
          name: 'programsSectionTitle',
          type: 'text',
          defaultValue: 'Nos programmes',
          label: 'Titre de la section Programmes',
        },
        {
          name: 'programsSectionDescription',
          type: 'textarea',
          label: 'Description de la section Programmes',
        },
      ],
    },
  ],
}

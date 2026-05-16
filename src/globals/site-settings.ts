import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email Address',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Physical Address',
          localized: true,
        },
        {
          name: 'openingHours',
          type: 'textarea',
          label: 'Opening Hours',
          localized: true,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Content',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Association Description',
          localized: true,
        },
        {
          name: 'missionStatement',
          type: 'textarea',
          label: 'Mission Statement',
          localized: true,
        },
      ],
    },
    {
      name: 'donationExternalUrl',
      type: 'text',
      label: 'External Donation URL',
      required: true,
      defaultValue: 'https://partner-donation-site.com',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'Global SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Default Meta Title',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Default Meta Description',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Open Graph Image',
        },
      ],
    },
  ],
}

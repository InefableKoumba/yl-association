import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
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
  ],
}

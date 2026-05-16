import { getPayload } from 'payload'
import config from '@payload-config'
import { getLocale } from '@/lib/i18n'
import DonateForm from './DonateForm'

export default async function Page() {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const donationPage = await payload.findGlobal({
    slug: 'donationPage',
    locale: locale as any,
  })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <DonateForm 
      locale={locale} 
      externalUrl={siteSettings?.donationExternalUrl} 
      data={donationPage}
    />
  )
}

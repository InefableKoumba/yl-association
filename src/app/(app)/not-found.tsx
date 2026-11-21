import { StatusPage } from '@/components/ui/StatusPage'
import { getLocale, translations } from '@/lib/i18n'

export default async function NotFound() {
  const t = translations[await getLocale()]
  return <StatusPage code="404" title={t.ui.pageNotFoundTitle} description={t.ui.pageNotFoundDescription} actionLabel={t.common.backToHome} />
}

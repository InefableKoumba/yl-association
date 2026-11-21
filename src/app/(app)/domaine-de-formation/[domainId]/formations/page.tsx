import { redirect } from 'next/navigation'

export default async function FormationsIndex({ params }: { params: Promise<{ domainId: string }> }) {
  redirect(`/domaine-de-formation/${(await params).domainId}`)
}

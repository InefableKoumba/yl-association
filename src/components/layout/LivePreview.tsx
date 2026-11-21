'use client'
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** Refreshes server-rendered content when an editor saves in the admin live preview. */
export function LivePreview() {
  const router = useRouter()
  const origin = useSyncExternalStore(subscribe, () => window.location.origin, () => null)
  if (!origin) return null
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} />
}

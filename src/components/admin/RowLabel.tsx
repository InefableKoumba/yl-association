'use client'
import { useRowLabel } from '@payloadcms/ui'

export function TrainingRowLabel() {
  const { data, rowNumber } = useRowLabel<{ name?: string }>()
  return <span>{data?.name || `Formation ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}

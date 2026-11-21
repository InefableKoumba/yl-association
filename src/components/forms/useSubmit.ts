'use client'
import { useState } from 'react'

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

/** Posts JSON to an API route and tracks the request status. */
export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const submit = async (payload: Record<string, unknown>) => {
    setStatus('loading')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? 'success' : 'error')
      return res.ok
    } catch {
      setStatus('error')
      return false
    }
  }

  return { status, setStatus, submit }
}

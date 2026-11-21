import { NextResponse } from 'next/server'
import { sendBatchMail } from '@/lib/mail'
import { getPayloadClient } from '@/lib/payload'
import { clean, isEmail } from '@/lib/validation'

/** Bulk email — restricted to logged-in administrators. */
export async function POST(request: Request) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || (user as { role?: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { subject?: unknown; text?: unknown; recipients?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const subject = clean(body.subject, 200)
  const text = clean(body.text, 20000, true)
  const recipients = Array.isArray(body.recipients)
    ? (body.recipients as { email?: unknown; name?: unknown }[])
        .filter((r) => isEmail(r?.email))
        .slice(0, 500)
        .map((r) => ({ email: r.email as string, name: clean(r.name, 120) || undefined }))
    : []

  if (!subject || !text || recipients.length === 0) {
    return NextResponse.json({ error: 'Subject, text, and at least one valid recipient are required.' }, { status: 400 })
  }

  const result = await sendBatchMail({ subject, text, requests: recipients })
  return result.success
    ? NextResponse.json({ message: 'Batch emails sent successfully', count: recipients.length })
    : NextResponse.json({ error: 'Failed to send batch emails' }, { status: 502 })
}

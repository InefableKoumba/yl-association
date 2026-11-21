import { NextResponse } from 'next/server'
import { receiver, sendMail } from '@/lib/mail'
import { isEmail, readForm } from '@/lib/validation'

export async function POST(request: Request) {
  const body = await readForm(request)
  if (!body) return NextResponse.json({ message: 'ok' })
  if (!isEmail(body.email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const result = await sendMail({
    to: receiver(),
    subject: `Inscription newsletter : ${body.email}`,
    text: `Nouvelle inscription à la newsletter\n\nEmail : ${body.email}`,
  })

  return result.success
    ? NextResponse.json({ message: 'Subscribed successfully' })
    : NextResponse.json({ error: 'Failed to send notification' }, { status: 502 })
}

import { NextResponse } from 'next/server'
import { receiver, sendMail } from '@/lib/mail'
import { clean, isEmail, readForm } from '@/lib/validation'

export async function POST(request: Request) {
  const body = await readForm(request)
  // Silently accept bot submissions so they don't retry
  if (!body) return NextResponse.json({ message: 'ok' })

  const name = clean(body.name, 120)
  const email = body.email
  const subject = clean(body.subject, 200)
  const message = clean(body.message, 5000, true)

  if (!name || !isEmail(email) || !message) {
    return NextResponse.json({ error: 'Please provide a name, a valid email and a message.' }, { status: 400 })
  }

  const result = await sendMail({
    to: receiver(),
    replyTo: email,
    subject: `Nouveau contact : ${subject || name}`,
    text: `Nouveau message de contact\n\nNom : ${name}\nEmail : ${email}\nSujet : ${subject || 'Aucun'}\n\n${message}`,
  })

  return result.success
    ? NextResponse.json({ message: 'Email sent successfully' })
    : NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
}

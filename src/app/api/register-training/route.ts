import { NextResponse } from 'next/server'
import { receiver, sendMail } from '@/lib/mail'
import { clean, isEmail, readForm } from '@/lib/validation'

const GENDERS: Record<string, string> = { male: 'Masculin', female: 'Féminin', other: 'Autre' }

export async function POST(request: Request) {
  const body = await readForm(request)
  if (!body) return NextResponse.json({ message: 'ok' })

  const trainingName = clean(body.trainingName, 200)
  const domainName = clean(body.domainName, 200)
  const name = clean(body.name, 120)
  const phone = clean(body.phone, 40)
  const gender = GENDERS[clean(body.gender, 10)] ?? 'Non spécifié'
  const email = body.email

  if (!trainingName || !name || !phone || !isEmail(email)) {
    return NextResponse.json({ error: 'Missing or invalid fields.' }, { status: 400 })
  }

  const result = await sendMail({
    to: receiver(),
    replyTo: email,
    subject: `Nouvelle inscription : ${trainingName} — ${name}`,
    text: [
      'Nouvelle inscription à une formation',
      '',
      `Formation : ${trainingName}`,
      domainName ? `Domaine : ${domainName}` : '',
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone}`,
      `Genre : ${gender}`,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  return result.success
    ? NextResponse.json({ message: 'Registration email sent successfully' })
    : NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
}

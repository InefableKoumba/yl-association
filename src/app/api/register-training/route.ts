import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const { trainingName, name, email, phone, gender } = await request.json()

    if (!trainingName || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const emailContent = `
      Nouvelle inscription à une formation:
      Formation: ${trainingName}
      Nom: ${name}
      Email: ${email}
      Téléphone: ${phone}
      Genre: ${gender || 'Non spécifié'}
    `

    const result = await sendMail({
      to: process.env.EMAIL_RECEIVER || 'contact@yl-association.org',
      subject: `Nouvelle inscription: ${trainingName} - ${name}`,
      text: emailContent,
    })

    if (result.success) {
      return NextResponse.json({ message: 'Registration email sent successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

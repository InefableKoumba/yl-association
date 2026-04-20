import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message.' },
        { status: 400 }
      )
    }

    const emailContent = `
      Nouveau message de contact:
      Nom: ${name}
      Email: ${email}
      Sujet: ${subject || 'Aucun'}
      Message: ${message}
    `

    const result = await sendMail({
      to: process.env.EMAIL_RECEIVER || 'contact@yl-association.org',
      subject: `Nouveau contact: ${subject || name}`,
      text: emailContent,
    })

    if (result.success) {
      return NextResponse.json({ message: 'Email sent successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

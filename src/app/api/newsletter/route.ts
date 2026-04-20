import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      )
    }

    const emailContent = `
      Nouvelle inscription à la newsletter:
      Email: ${email}
    `

    const result = await sendMail({
      to: process.env.EMAIL_RECEIVER || 'contact@yl-association.org',
      subject: `Inscription Newsletter: ${email}`,
      text: emailContent,
    })

    if (result.success) {
      return NextResponse.json({ message: 'Subscribed successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

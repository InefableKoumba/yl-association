import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, phoneNumber, name, email, anonymous } = await request.json()

    // Validate the input
    if (!amount || parseInt(amount) < 100) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }

    if (!phoneNumber || phoneNumber.trim() === '') {
      return NextResponse.json({ error: 'Numéro de téléphone invalide' }, { status: 400 })
    }

    // Get auth token from MTN API
    const tokenResponse = await fetch('https://proxy.momoapi.mtn.com/collection/token/', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.COLLECTION_SUBSCRIPTION_PRIMARY_KEY!,
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.COLLECTION_API_USER + ':' + process.env.COLLECTION_API_KEY,
          ).toString('base64'),
      },
    })

    if (!tokenResponse.ok) {
      console.error('Token error:', await tokenResponse.text())
      return NextResponse.json(
        { error: "Erreur d'authentification avec le service de paiement" },
        { status: 500 },
      )
    }

    const tokenData = await tokenResponse.json()
    const token = tokenData.access_token

    // Request payment using token
    const paymentResponse = await fetch(
      'https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay',
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.COLLECTION_SUBSCRIPTION_PRIMARY_KEY!,
          Authorization: 'Bearer ' + token,
          'X-Target-Environment': 'mtncongo',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Reference-Id': process.env.COLLECTION_API_USER!,
        },
        body: JSON.stringify({
          amount,
          currency: 'XAF',
          externalId: Date.now().toString(), // Use timestamp as unique ID
          payer: {
            partyIdType: 'MSISDN',
            partyId: phoneNumber,
          },
          payerMessage: 'Don à Young Leaders Association',
          payeeNote: `Don de ${anonymous ? 'Anonyme' : name}`,
        }),
      },
    )

    if (!paymentResponse.ok) {
      console.error('Payment error:', await paymentResponse.text())
      return NextResponse.json({ error: 'Erreur lors du traitement du paiement' }, { status: 500 })
    }

    // If we reach here, the payment was successful
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors du traitement de votre demande' },
      { status: 500 },
    )
  }
}

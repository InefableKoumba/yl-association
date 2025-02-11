import Image from 'next/image'
import React from 'react'

export default function Page() {
  const requestPayment = async (form: FormData): Promise<void> => {
    'use server'

    const phone_number = form.get('phone_number')
    const amount = form.get('amount')
    const anonymous = form.get('anonymous')
    const name = form.get('name')
    const email = form.get('email')
    const country = form.get('country')

    const response = await fetch('https://proxy.momoapi.mtn.com/collection/token/', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.COLLECTION_SUBSCRIPTION_PRIMARY_KEY!,
        Authorization:
          'Basic ' + btoa(process.env.COLLECTION_API_USER + ':' + process.env.COLLECTION_API_KEY),
      },
    })

    if (response.ok) {
      const token = (await response.json())['access_token']
      await fetch('https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay', {
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
          externalId: '1234',
          payer: {
            partyIdType: 'MSISDN',
            partyId: phone_number,
          },
          payerMessage: 'Donation.',
          payeeNote: 'Merci pour le don.',
        }),
      })
    }
  }

  return (
    <div>
      <header>
        <div className="relative h-[40rem]">
          <div className="absolute left-0 top-0 w-full h-full -z-10">
            <div className="absolute left-0 top-0 w-full h-full bg-black from-black bg-opacity-60 z-10"></div>
            <Image fill className="object-top object-cover" src="/hero2.jpg" alt="Young Leaders" />
          </div>
          <div className="flex flex-col xl:flex-row items-center h-full px-4 xl:px-32">
            <div className="flex items-center">
              <div className="flex flex-col gap-4">
                <h2 className="font-extrabold text-white text-6xl leading-[5rem] text-center xl:text-left">
                  Faire un don
                </h2>
                <p className="text-gray-100 text-lg w-[80%] text-center xl:text-left">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                </p>
              </div>
              <form
                action={requestPayment}
                className="flex flex-col gap-4 w-[50rem] bg-white shadow-xl p-12 rounded-lg"
              >
                <div className="flex gap-2 items-center mb-4">
                  <input name="anonymous" type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Je préfère rester annonyme</span>
                </div>
                <input
                  type="text"
                  name="name"
                  className="border bg-white p-4 rounded"
                  placeholder="Votre nom & prénom"
                />
                <input
                  type="email"
                  name="email"
                  className="border bg-white p-4 rounded"
                  placeholder="Votre email"
                />
                <select
                  name="country"
                  defaultValue={"Pays d'origine"}
                  className="p-4 bg-white rounded border"
                >
                  <option value="">Congo</option>
                  <option value="">RDC</option>
                </select>
                <input
                  name="amount"
                  type="number"
                  min={100}
                  className="border bg-white p-4 rounded"
                  placeholder="Montant"
                />
                <div className="flex gap-2">
                  <div className="relative w-20 border">
                    <Image alt="Logo MTN" src={'/mtn.png'} fill />
                  </div>
                  <input
                    type="tel"
                    name="phone_number"
                    className="border bg-white w-full p-4 rounded"
                    placeholder="+242 06 000 00 00"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-background hover:bg-background/90 text-sm px-12 md:px-12 py-4 rounded text-white font-medium"
                >
                  Payer maintenant
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

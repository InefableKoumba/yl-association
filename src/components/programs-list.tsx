import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getLocale } from '@/lib/i18n'

export default async function ProgramsList() {
  const locale = await getLocale()
  try {
    const payload = await getPayload({ config })
    const programs = await payload.find({
      collection: 'programs',
      locale: locale as any,
    })

    return (
      <div className="mt-12">
        {programs.docs.map((program) => (
          <div className="border rounded flex" key={program.id}>
            <div className="relative h-[20rem] w-[50rem]">
              <Image alt="Mwassi-Telema" src={'/hero.jpg'} fill />
            </div>
            <div className="p-12 flex flex-col gap-4 justify-center">
              <span className="text-xl font-extrabold text-gray-800">{program.name}</span>
              <p>{program.shortDescription}</p>
              <div className="flex justify-end">
                <Link
                  href={'/programs/' + program.id}
                  className="border hover:bg-background duration-300 transition-colors hover:text-white px-12 py-4 rounded"
                >
                  En savoir
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } catch (error) {
    return null
  }
}

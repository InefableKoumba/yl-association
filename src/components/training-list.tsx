import { GraduationCap } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export default async function TrainingsList() {
  const payload = await getPayload({ config })
  const trainingDomains = await payload.find({
    collection: 'trainingDomains',
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {trainingDomains.docs.map((trainingDomain) => (
        <div className="border rounded-xl" key={trainingDomain.id}>
          <div className="relative h-56">
            <Image
              alt={trainingDomain.name ?? 'Formation'}
              className="object-cover object-top"
              src={'/1.jpg'}
              fill
            />
          </div>
          <div className=" p-8 ">
            {/* <GraduationCap strokeWidth={0.8} size={62} /> */}
            <div className="font-bold text-lg mt-2">{trainingDomain.name}</div>
            <div className="flex flex-col gap-2 mt-4">
              {trainingDomain.trainings &&
                trainingDomain.trainings.map((training) => (
                  <Link
                    href={'/domaine-de-formation/formations/' + training.id}
                    className="font-medium hover:text-primary"
                    key={training.id}
                  >
                    {training.name}
                  </Link>
                ))}
            </div>
            <Link
              href={'/'}
              className="py-3 font-medium block w-full border text-center mt-4 transition-colors duration-300 hover:bg-background hover:text-white rounded"
            >
              Plus de détails
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

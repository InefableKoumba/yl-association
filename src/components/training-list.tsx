import { GraduationCap } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'
import config from '@payload-config'
import Link from 'next/link'

export default async function TrainingsList() {
  const payload = await getPayload({ config })
  const trainingDomains = await payload.find({
    collection: 'trainingDomains',
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {trainingDomains.docs.map((trainingDomain) => (
        <div className="bg-[#0A46AB] p-8 rounded-xl" key={trainingDomain.id}>
          <GraduationCap className="text-gray-200" size={62} />
          <div className="text-white font-extrabold mt-2">{trainingDomain.name}</div>
          <div className="flex flex-col gap-2 mt-4">
            {trainingDomain.trainings &&
              trainingDomain.trainings.map((training) => (
                <Link
                  href={'/domaine-de-formation/formations/' + training.id}
                  className="font-medium text-white"
                  key={training.id}
                >
                  {training.name}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

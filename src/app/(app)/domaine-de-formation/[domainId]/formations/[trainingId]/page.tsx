import React from 'react'
import { GraduationCap } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export default async function page() {
  const payload = await getPayload({ config })
  const trainingDomains = await payload.find({
    collection: 'trainingDomains',
    where: {
      isd: {},
    },
  })
  return <div>page</div>
}

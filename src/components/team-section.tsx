import Image from 'next/image'
import React from 'react'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: 'Émilie Durand',
    role: 'Présidente',
    bio: "Experte en leadership et développement personnel avec plus de 10 ans d'expérience dans la formation des jeunes talents.",
    image: '/team/team-1.jpg',
  },
  {
    name: 'Alexandre Martin',
    role: 'Directeur des Programmes',
    bio: "Spécialiste en élaboration de programmes éducatifs innovants, passionné par l'impact social et le développement des compétences.",
    image: '/team/team-2.jpg',
  },
  {
    name: 'Sophie Berger',
    role: 'Responsable de Formation',
    bio: 'Coach certifiée spécialisée dans le leadership transformationnel et le mentorat des jeunes professionnels.',
    image: '/team/team-3.jpg',
  },
  {
    name: 'Thomas Laurent',
    role: 'Directeur des Partenariats',
    bio: "Expert en développement de partenariats stratégiques avec plus de 8 ans d'expérience dans le secteur associatif et entrepreneurial.",
    image: '/team/team-4.jpg',
  },
]

export default function TeamSection({
  teamMembers = defaultTeamMembers,
}: {
  teamMembers?: TeamMember[]
}) {
  return (
    <section className="px-4 md:px-8 xl:px-32 py-24 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold mb-4">Notre Équipe</h2>
        <p className="text-gray-600 md:w-2/3 mx-auto">
          Des professionnels passionnés et engagés qui guident notre association vers
          l&apos;excellence dans le développement du leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-64 w-full">
              <Image src={member.image} alt={member.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
              <p className="text-[#0039F0] font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

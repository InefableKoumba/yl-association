import TrainingsList from '@/components/training-list'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div>
      <header>
        <div className="relative h-[40rem]">
          <div className="absolute left-0 top-0 w-full h-full -z-10">
            <div className="absolute left-0 top-0 w-full h-full bg-black from-black bg-opacity-60 z-10"></div>
            <Image fill className="object-top object-cover" src="/hero2.jpg" alt="Young Leaders" />
          </div>
          <div className="flex flex-col xl:flex-row items-center h-full px-4 xl:px-32">
            <div className="flex xl:w-[50rem]">
              <div className="flex flex-col gap-4">
                <h2 className="font-extrabold text-white text-6xl leading-[5rem] text-center xl:text-left">
                  Une association qui accompagne les jeunes
                </h2>
                <p className="text-gray-100 text-lg w-[80%] text-center xl:text-left">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
                </p>
                <div className="flex justify-center xl:justify-start">
                  <a
                    href="#contact-us"
                    className="bg-background text-sm px-12 md:px-12 py-4 rounded text-white font-medium"
                  >
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="xl:px-32 py-24">
        <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold">
          Découvrez nos programmes
        </h2>
        <p className="xl:w-2/3 mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s.
        </p>
        <div className="mt-12">
          <div className="border  rounded flex">
            <div className="relative h-[20rem] w-[50rem]">
              <Image alt="Mwassi-Telema" src={'/hero.jpg'} fill />
            </div>
            <div className="p-12 flex flex-col gap-4 justify-center">
              <span className="text-xl font-extrabold text-gray-800">Mwassi-Telema</span>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non commodi est aperiam.
                Facere fugiat blanditiis, accusantium alias nulla maiores autem id culpa totam
                voluptatum obcaecati doloremque magnam quidem nostrum nam!
              </p>
              <div className="flex justify-end">
                <Link
                  href={'/'}
                  className="border hover:bg-background duration-300 transition-colors hover:text-white px-12 py-4 rounded"
                >
                  En savoir
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

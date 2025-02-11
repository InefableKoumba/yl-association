import Image from 'next/image'
import React from 'react'
import { CalendarDays, GraduationCap, UsersRound } from 'lucide-react'
import TrainingsList from '@/components/training-list'
import AboutUsSection from '@/components/about-us'
import { getPayload } from 'payload'
import config from '@payload-config'
import PartnersList from '@/components/partners-list'
import FAQ from '@/components/FAQ'

export default async function Page() {
  try {
    const payload = await getPayload({ config })
    const pageGlobal = await payload.findGlobal({
      slug: 'pages',
    })
    const heroImages = []
    if (pageGlobal.home?.heroImages && pageGlobal.home.heroImages.length > 0) {
      for (const image of pageGlobal.home.heroImages) {
        if (image.heroImage && typeof image.heroImage !== 'number' && image.heroImage.url) {
          heroImages.push(image.heroImage.url)
          break
        }
      }
    }

    return (
      <div>
        <header>
          <div className="relative h-[40rem]">
            <div className="absolute left-0 top-0 w-full h-full -z-10">
              <div className="absolute left-0 top-0 w-full h-full bg-black from-black bg-opacity-60 z-10"></div>
              <Image
                fill
                className="object-top object-cover"
                src={heroImages[0] ?? '/hero2.jpg'}
                alt="Young Leaders"
              />
            </div>
            <div className="flex flex-col xl:flex-row items-center h-full px-4 xl:px-32">
              <div className="flex xl:w-[50rem]">
                <div className="flex flex-col gap-4">
                  <h2 className="font-extrabold text-white text-6xl leading-[5rem] text-center xl:text-left">
                    {pageGlobal.home?.heroTitle}
                  </h2>
                  <p className="text-gray-100 text-lg w-[80%] text-center xl:text-left">
                    {pageGlobal.home?.heroDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-end gap-4 mx-auto text-sm">
                <div className="bg-white w-1/2 blur-0 bg-opacity-80 font-medium h-44 text-center flex flex-col rounded justify-center items-center gap-4">
                  <UsersRound color="#333" strokeWidth={1} size={42} />
                  425 personnes formées
                </div>
                <div className="bg-white w-1/2 blur-0 bg-opacity-80 font-medium h-44 text-center flex flex-col rounded justify-center items-center gap-4">
                  <CalendarDays color="#333" strokeWidth={1} size={42} />
                  25 événements organisés
                </div>
                <div className="bg-white w-1/2 blur-0 bg-opacity-80 font-medium h-44 text-center flex flex-col rounded justify-center items-center gap-4">
                  <GraduationCap color="#333" strokeWidth={1} size={42} />
                  45 formations disponibles
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="xl:px-32 py-24">
          <h2 className="text-3xl md:text-5xl text-gray-800 font-extrabold">
            {pageGlobal.home?.ourTrainingsSectionTitle}
          </h2>
          <p className="xl:w-2/3 mt-4">{pageGlobal.home?.ourTrainingsSectionDescription}</p>
          <div className="mt-12">
            <TrainingsList />
          </div>
        </section>

        <AboutUsSection />

        <section className="py-12">
          <div className="md:w-2/3 mx-auto text-center flex flex-col gap-4">
            <h2 className="text-black font-extrabold text-3xl md:text-5xl">
              {pageGlobal.home?.ourPartnersSectionTitle}
            </h2>
            <p className="text-gray-900">{pageGlobal.home?.ourPartnersSectionDescription}</p>
          </div>
          <PartnersList />
        </section>
        <section className="px-4 md:px-8 mt-24 xl:px-32 py-24 bg-[#f0f0f0]">
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-800 font-extrabold text-3xl md:text-5xl">
              {pageGlobal.home?.faqSectionTitle}
            </h2>
            <p className="text-gray-900 md:w-2/3">{pageGlobal.home?.faqSectionDescription}</p>
          </div>
          <FAQ />
        </section>
        <div className="px-4 md:px-8 xl:px-32 py-12">
          <div className="md:w-2/3 mx-auto text-center flex flex-col gap-4">
            <h2 className="text-gray-800 font-extrabold text-3xl md:text-5xl">
              {pageGlobal.home?.contactUsSectionTitle}
            </h2>
            <p className="text-gray-900">{pageGlobal.home?.contactUsSectionDescription}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 justify-between">
              <input className="bg-[#f0f0f0] p-4 rounded-full" placeholder="Nom" type="text" />
              <input
                className="bg-[#f0f0f0] p-4 rounded-full"
                placeholder="Adresse email"
                type="text"
              />
              <textarea
                className="bg-[#f0f0f0] p-4 rounded-3xl"
                placeholder="Votre message"
                name=""
                id=""
                cols={30}
                rows={10}
              ></textarea>
              <button className="bg-[#0039F0] p-4 rounded-full text-white font-medium">
                {pageGlobal.home?.contactUsSectionButtonText}
              </button>
            </div>
            {pageGlobal.home?.contactUsSectionImage &&
              typeof pageGlobal.home.contactUsSectionImage !== 'number' &&
              pageGlobal.home?.contactUsSectionImage?.url && (
                <div className="relative">
                  <Image
                    className="object-cover rounded-lg"
                    alt="Youlg Leaders"
                    src={pageGlobal.home.contactUsSectionImage.url}
                    fill
                  />
                </div>
              )}
          </div>
        </div>
        <footer className="px-4 md:px-8 xl:px-32 py-12 bg-[#D9D9D9]">
          <div className="md:w-2/3 flex flex-col gap-4">
            <h2 className="text-black font-bold text-3xl md:text-4xl">
              {pageGlobal.home?.newsletterSectionTitle}
            </h2>
            <p className="text-gray-900">{pageGlobal.home?.newsletterSectionDescription}</p>
          </div>
          <div className="mt-6 md:mt-12">
            <div className="relative md:w-[30rem] flex gap-2">
              <input
                className="bg-[#f0f0f0] p-4 rounded-full w-full h-full"
                placeholder="Votre adresse email"
                type="text"
              />
              <button className="bg-[#0039F0] text-white font-medium rounded-full py-3 px-6">
                S&apos;abonner
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-start gap-3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19.5" stroke="black" />
              <path
                d="M22.2 10.875C20.9734 10.875 19.797 11.3623 18.9296 12.2296C18.0623 13.097 17.575 14.2734 17.575 15.5V18.075H15.1C14.976 18.075 14.875 18.175 14.875 18.3V21.7C14.875 21.824 14.975 21.925 15.1 21.925H17.575V28.9C17.575 29.024 17.675 29.125 17.8 29.125H21.2C21.324 29.125 21.425 29.025 21.425 28.9V21.925H23.922C24.025 21.925 24.115 21.855 24.14 21.755L24.99 18.355C24.9984 18.3218 24.9991 18.2872 24.992 18.2537C24.985 18.2202 24.9704 18.1888 24.9494 18.1618C24.9283 18.1348 24.9014 18.1129 24.8707 18.0979C24.84 18.0829 24.8062 18.075 24.772 18.075H21.425V15.5C21.425 15.3982 21.445 15.2974 21.484 15.2034C21.5229 15.1094 21.58 15.024 21.652 14.952C21.724 14.88 21.8094 14.8229 21.9034 14.784C21.9974 14.745 22.0982 14.725 22.2 14.725H24.8C24.924 14.725 25.025 14.625 25.025 14.5V11.1C25.025 10.976 24.925 10.875 24.8 10.875H22.2Z"
                fill="#333"
              />
            </svg>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19.5" stroke="#333" />
              <path
                d="M14.94 13C14.9397 13.5305 14.7288 14.0391 14.3535 14.4139C13.9782 14.7888 13.4694 14.9993 12.939 14.999C12.4086 14.9988 11.9 14.7878 11.5251 14.4125C11.1502 14.0373 10.9397 13.5285 10.94 12.998C10.9403 12.4676 11.1512 11.959 11.5265 11.5841C11.9018 11.2092 12.4106 10.9988 12.941 10.999C13.4714 10.9993 13.98 11.2103 14.3549 11.5855C14.7298 11.9608 14.9403 12.4696 14.94 13ZM15 16.48H11V29H15V16.48ZM21.32 16.48H17.34V29H21.28V22.43C21.28 18.77 26.05 18.43 26.05 22.43V29H30V21.07C30 14.9 22.94 15.13 21.28 18.16L21.32 16.48Z"
                fill="#333"
              />
            </svg>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="19.5" stroke="#333" />
              <path
                d="M30.0617 14.9398C29.9422 14.4946 29.7078 14.0886 29.382 13.7624C29.0563 13.4363 28.6505 13.2014 28.2055 13.0813C26.5672 12.6406 20 12.6406 20 12.6406C20 12.6406 13.4328 12.6406 11.7945 13.0789C11.3493 13.1986 10.9433 13.4334 10.6175 13.7596C10.2917 14.0859 10.0574 14.4921 9.93828 14.9375C9.5 16.5781 9.5 20 9.5 20C9.5 20 9.5 23.4219 9.93828 25.0602C10.1797 25.9648 10.8922 26.6773 11.7945 26.9188C13.4328 27.3594 20 27.3594 20 27.3594C20 27.3594 26.5672 27.3594 28.2055 26.9188C29.1102 26.6773 29.8203 25.9648 30.0617 25.0602C30.5 23.4219 30.5 20 30.5 20C30.5 20 30.5 16.5781 30.0617 14.9398ZM17.9141 23.1406V16.8594L23.3516 19.9766L17.9141 23.1406Z"
                fill="#333"
              />
            </svg>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8 10H24.2C27.4 10 30 12.6 30 15.8V24.2C30 25.7383 29.3889 27.2135 28.3012 28.3012C27.2135 29.3889 25.7383 30 24.2 30H15.8C12.6 30 10 27.4 10 24.2V15.8C10 14.2617 10.6111 12.7865 11.6988 11.6988C12.7865 10.6111 14.2617 10 15.8 10ZM15.6 12C14.6452 12 13.7295 12.3793 13.0544 13.0544C12.3793 13.7295 12 14.6452 12 15.6V24.4C12 26.39 13.61 28 15.6 28H24.4C25.3548 28 26.2705 27.6207 26.9456 26.9456C27.6207 26.2705 28 25.3548 28 24.4V15.6C28 13.61 26.39 12 24.4 12H15.6ZM25.25 13.5C25.5815 13.5 25.8995 13.6317 26.1339 13.8661C26.3683 14.1005 26.5 14.4185 26.5 14.75C26.5 15.0815 26.3683 15.3995 26.1339 15.6339C25.8995 15.8683 25.5815 16 25.25 16C24.9185 16 24.6005 15.8683 24.3661 15.6339C24.1317 15.3995 24 15.0815 24 14.75C24 14.4185 24.1317 14.1005 24.3661 13.8661C24.6005 13.6317 24.9185 13.5 25.25 13.5ZM20 15C21.3261 15 22.5979 15.5268 23.5355 16.4645C24.4732 17.4021 25 18.6739 25 20C25 21.3261 24.4732 22.5979 23.5355 23.5355C22.5979 24.4732 21.3261 25 20 25C18.6739 25 17.4021 24.4732 16.4645 23.5355C15.5268 22.5979 15 21.3261 15 20C15 18.6739 15.5268 17.4021 16.4645 16.4645C17.4021 15.5268 18.6739 15 20 15ZM20 17C19.2044 17 18.4413 17.3161 17.8787 17.8787C17.3161 18.4413 17 19.2044 17 20C17 20.7956 17.3161 21.5587 17.8787 22.1213C18.4413 22.6839 19.2044 23 20 23C20.7956 23 21.5587 22.6839 22.1213 22.1213C22.6839 21.5587 23 20.7956 23 20C23 19.2044 22.6839 18.4413 22.1213 17.8787C21.5587 17.3161 20.7956 17 20 17Z"
                fill="#333"
              />
              <circle cx="20" cy="20" r="19.5" stroke="#333" />
            </svg>
          </div>
          <div className="mt-12">
            <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
              <a href="">Conditions d’utlisations</a>
              <a href="">Politique de confidentialité</a>
            </div>
            <div className="text-center mt-8 text-sm">
              <a href="">Copyright © 2025 | YOUNG LEADERS ASSOCIATION - Tous droits reservés</a>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    return null
  }
}

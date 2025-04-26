'use client'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-4 md:px-8 xl:px-32 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">Young Leaders</h3>
              <p className="text-gray-400 text-sm">
                Association pour le développement du leadership
              </p>
            </div>
            <p className="text-gray-300 mb-6">
              Notre mission est de former la prochaine génération de leaders inspirants et
              compétents.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.2 10.875C20.9734 10.875 19.797 11.3623 18.9296 12.2296C18.0623 13.097 17.575 14.2734 17.575 15.5V18.075H15.1C14.976 18.075 14.875 18.175 14.875 18.3V21.7C14.875 21.824 14.975 21.925 15.1 21.925H17.575V28.9C17.575 29.024 17.675 29.125 17.8 29.125H21.2C21.324 29.125 21.425 29.025 21.425 28.9V21.925H23.922C24.025 21.925 24.115 21.855 24.14 21.755L24.99 18.355C24.9984 18.3218 24.9991 18.2872 24.992 18.2537C24.985 18.2202 24.9704 18.1888 24.9494 18.1618C24.9283 18.1348 24.9014 18.1129 24.8707 18.0979C24.84 18.0829 24.8062 18.075 24.772 18.075H21.425V15.5C21.425 15.3982 21.445 15.2974 21.484 15.2034C21.5229 15.1094 21.58 15.024 21.652 14.952C21.724 14.88 21.8094 14.8229 21.9034 14.784C21.9974 14.745 22.0982 14.725 22.2 14.725H24.8C24.924 14.725 25.025 14.625 25.025 14.5V11.1C25.025 10.976 24.925 10.875 24.8 10.875H22.2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.94 13C14.9397 13.5305 14.7288 14.0391 14.3535 14.4139C13.9782 14.7888 13.4694 14.9993 12.939 14.999C12.4086 14.9988 11.9 14.7878 11.5251 14.4125C11.1502 14.0373 10.9397 13.5285 10.94 12.998C10.9403 12.4676 11.1512 11.959 11.5265 11.5841C11.9018 11.2092 12.4106 10.9988 12.941 10.999C13.4714 10.9993 13.98 11.2103 14.3549 11.5855C14.7298 11.9608 14.9403 12.4696 14.94 13ZM15 16.48H11V29H15V16.48ZM21.32 16.48H17.34V29H21.28V22.43C21.28 18.77 26.05 18.43 26.05 22.43V29H30V21.07C30 14.9 22.94 15.13 21.28 18.16L21.32 16.48Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                aria-label="YouTube"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.0617 14.9398C29.9422 14.4946 29.7078 14.0886 29.382 13.7624C29.0563 13.4363 28.6505 13.2014 28.2055 13.0813C26.5672 12.6406 20 12.6406 20 12.6406C20 12.6406 13.4328 12.6406 11.7945 13.0789C11.3493 13.1986 10.9433 13.4334 10.6175 13.7596C10.2917 14.0859 10.0574 14.4921 9.93828 14.9375C9.5 16.5781 9.5 20 9.5 20C9.5 20 9.5 23.4219 9.93828 25.0602C10.1797 25.9648 10.8922 26.6773 11.7945 26.9188C13.4328 27.3594 20 27.3594 20 27.3594C20 27.3594 26.5672 27.3594 28.2055 26.9188C29.1102 26.6773 29.8203 25.9648 30.0617 25.0602C30.5 23.4219 30.5 20 30.5 20C30.5 20 30.5 16.5781 30.0617 14.9398ZM17.9141 23.1406V16.8594L23.3516 19.9766L17.9141 23.1406Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-[#0039F0] transition-colors duration-300 rounded-full flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8 10H24.2C27.4 10 30 12.6 30 15.8V24.2C30 25.7383 29.3889 27.2135 28.3012 28.3012C27.2135 29.3889 25.7383 30 24.2 30H15.8C12.6 30 10 27.4 10 24.2V15.8C10 14.2617 10.6111 12.7865 11.6988 11.6988C12.7865 10.6111 14.2617 10 15.8 10ZM15.6 12C14.6452 12 13.7295 12.3793 13.0544 13.0544C12.3793 13.7295 12 14.6452 12 15.6V24.4C12 26.39 13.61 28 15.6 28H24.4C25.3548 28 26.2705 27.6207 26.9456 26.9456C27.6207 26.2705 28 25.3548 28 24.4V15.6C28 13.61 26.39 12 24.4 12H15.6ZM25.25 13.5C25.5815 13.5 25.8995 13.6317 26.1339 13.8661C26.3683 14.1005 26.5 14.4185 26.5 14.75C26.5 15.0815 26.3683 15.3995 26.1339 15.6339C25.8995 15.8683 25.5815 16 25.25 16C24.9185 16 24.6005 15.8683 24.3661 15.6339C24.1317 15.3995 24 15.0815 24 14.75C24 14.4185 24.1317 14.1005 24.3661 13.8661C24.6005 13.6317 24.9185 13.5 25.25 13.5ZM20 15C21.3261 15 22.5979 15.5268 23.5355 16.4645C24.4732 17.4021 25 18.6739 25 20C25 21.3261 24.4732 22.5979 23.5355 23.5355C22.5979 24.4732 21.3261 25 20 25C18.6739 25 17.4021 24.4732 16.4645 23.5355C15.5268 22.5979 15 21.3261 15 20C15 18.6739 15.5268 17.4021 16.4645 16.4645C17.4021 15.5268 18.6739 15 20 15ZM20 17C19.2044 17 18.4413 17.3161 17.8787 17.8787C17.3161 18.4413 17 19.2044 17 20C17 20.7956 17.3161 21.5587 17.8787 22.1213C18.4413 22.6839 19.2044 23 20 23C20.7956 23 21.5587 22.6839 22.1213 22.1213C22.6839 21.5587 23 20.7956 23 20C23 19.2044 22.6839 18.4413 22.1213 17.8787C21.5587 17.3161 20.7956 17 20 17Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/formations"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Nos formations
                </Link>
              </li>
              <li>
                <Link
                  href="/evenements"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Informations</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">Restez informé de nos actualités et événements.</p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-gray-100 focus:outline-none focus:border-[#0039F0]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0039F0] hover:bg-[#0030cc] transition-colors duration-300 text-white font-medium py-3 px-4 rounded-lg"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} Young Leaders Association. Tous droits reservés.
          </p>
          <div className="mt-4 md:mt-0 flex gap-4 text-sm text-gray-400">
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <span>|</span>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

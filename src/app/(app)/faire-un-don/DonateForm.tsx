'use client'

import Image from 'next/image'
import React from 'react'
import { Heart, Check, ExternalLink, Globe, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { translations, Locale } from '@/lib/translations'

interface DonateFormProps {
    locale: Locale
    externalUrl?: string | null
}

export default function DonateForm({ locale, externalUrl }: DonateFormProps) {
    const t = translations[locale].donate
    const url = externalUrl || '#'

    const handleRedirect = () => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <header className="relative py-20 md:py-32 bg-[#0039F0] overflow-hidden">
                <div className="absolute inset-0 opacity-20 scale-110">
                    <Image fill className="object-cover animate-subtle-zoom" src="/hero2.jpg" alt="Background pattern" priority />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0039F0] via-[#0039F0]/80 to-transparent"></div>
                
                <div className="container mx-auto px-4 md:px-8 xl:px-32 relative z-10">
                    <div className="max-w-3xl text-white">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/30">
                            <Heart className="text-white fill-white" size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">{locale === 'fr' ? 'Soutenez notre mission' : 'Support our mission'}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            {t.hero.title}
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed font-medium">
                            {t.hero.subtitle}
                        </p>
                    </div>
                </div>
            </header>

            {/* Impact & Redirect Section */}
            <div className="container mx-auto px-4 md:px-8 xl:px-32 -mt-16 relative z-20 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Impact Cards */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
                                <Zap className="text-[#0039F0] mr-3" size={32} />
                                {t.impact.title}
                            </h2>
                            
                            <div className="grid grid-cols-1 gap-8">
                                <div className="flex items-start space-x-5 p-6 rounded-2xl bg-blue-50 transition-all hover:bg-blue-100/50">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
                                        <Check className="text-white" size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-blue-900 mb-2">{t.impact.tier1.title}</h3>
                                        <p className="text-blue-800/70 leading-relaxed">
                                            {t.impact.tier1.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 p-6 rounded-2xl bg-emerald-50 transition-all hover:bg-emerald-100/50">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-600/20">
                                        <Check className="text-white" size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-emerald-900 mb-2">{t.impact.tier2.title}</h3>
                                        <p className="text-emerald-800/70 leading-relaxed">
                                            {t.impact.tier2.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-5 p-6 rounded-2xl bg-amber-50 transition-all hover:bg-amber-100/50">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-600/20">
                                        <Check className="text-white" size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-900 mb-2">{t.impact.tier3.title}</h3>
                                        <p className="text-amber-800/70 leading-relaxed">
                                            {t.impact.tier3.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Redirect Card */}
                    <div className="lg:col-span-5 sticky top-28">
                        <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-10 text-white border border-gray-800 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0039F0]/20 blur-3xl -mr-16 -mt-16"></div>
                            
                            <h3 className="text-2xl font-bold mb-6 relative z-10">
                                {locale === 'fr' ? 'Prêt à contribuer ?' : 'Ready to contribute?'}
                            </h3>
                            
                            <p className="text-gray-400 mb-8 leading-relaxed relative z-10">
                                {locale === 'fr' 
                                    ? 'Pour garantir la sécurité de vos transactions, nous utilisons une plateforme partenaire de confiance pour collecter les dons.'
                                    : 'To ensure the security of your transactions, we use a trusted partner platform to collect donations.'}
                            </p>

                            <button
                                onClick={handleRedirect}
                                className="w-full group bg-[#0039F0] hover:bg-[#0030cc] text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-blue-900/20 active:scale-95"
                            >
                                <span className="text-lg">{t.hero.cta}</span>
                                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>

                            <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/10 relative z-10">
                                <div className="flex items-start space-x-3">
                                    <ShieldCheck className="text-emerald-400 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        <strong className="text-white block mb-1">
                                            {locale === 'fr' ? 'Notice de redirection' : 'Redirection Notice'}
                                        </strong>
                                        {locale === 'fr'
                                            ? 'En cliquant sur le bouton ci-dessus, vous serez redirigé vers notre site partenaire sécurisé. Vos données sont protégées par des protocoles SSL de pointe.'
                                            : 'By clicking the button above, you will be redirected to our secure partner site. Your data is protected by state-of-the-art SSL protocols.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link href="/faq" className="text-gray-500 hover:text-[#0039F0] text-sm font-medium transition-colors inline-flex items-center">
                                <Globe size={16} className="mr-2" />
                                {t.faq.title}
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Help Section */}
            <section className="bg-gray-50 py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-gray-900 mb-4">{t.help.title}</h2>
                    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                        {t.help.description}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center py-4 px-10 bg-white border-2 border-[#0039F0] text-[#0039F0] hover:bg-[#0039F0] hover:text-white transition-all duration-300 font-bold rounded-2xl shadow-sm hover:shadow-lg"
                    >
                        {t.help.cta}
                    </Link>
                </div>
            </section>
        </div>
    )
}

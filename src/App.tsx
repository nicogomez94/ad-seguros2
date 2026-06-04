/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandsCarousel from './components/BrandsCarousel';
import Services from './components/Services';
import PASAlert from './components/PASAlert';
import FAQ from './components/FAQ';
import ProducerJoin from './components/ProducerJoin';
import OfficeMap from './components/OfficeMap';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppChat from './components/WhatsAppChat';
import { useTranslation } from './context/LanguageContext';
import { motion } from 'motion/react';
import partnerBg from './assets/images/partner_bg_1779841331965.png';
import contactBg from './assets/images/contact_wallpaper_bg_1780086600878.png';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-ad-dark font-sans text-ad-blue dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <BrandsCarousel />
        <Services />
        <PASAlert />
        <FAQ />
        <ProducerJoin />

        {/* Nosotros Section */}
         <section id="nosotros" className="py-24 bg-ad-blue dark:bg-[#00131d] relative overflow-hidden transition-colors duration-300">
           {/* Background Wallpaper Image */}
           <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
             <motion.img 
               src={partnerBg} 
               alt="Strategic Partner Wallpaper" 
               className="w-full h-full object-cover opacity-35 dark:opacity-20"
               referrerPolicy="no-referrer"
               loading="lazy"
               animate={{
                 scale: [1, 1.05, 1],
                 x: [0, 4, 0],
                 y: [0, -4, 0]
               }}
               transition={{
                 duration: 23,
                 repeat: Infinity,
                 ease: "linear"
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
             <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
           </div>

           <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full text-white">
              <div className="w-full lg:w-[48%] xl:w-[45%] shrink-0">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-ad-cyan/20 rounded-full animate-pulse" />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-ad-blue/5 dark:bg-ad-cyan/5 rounded-full blur-2xl animate-pulse" />
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=75&w=800" 
                    alt={t('about.imgAlt')}
                    className="relative z-10 w-full rounded-[3rem] shadow-2xl hover:scale-[1.02] transition-all duration-700 border border-white/10"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-full lg:w-[50%] xl:w-[48%] shrink-0">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase line-tight">
                  {t('about.title')}<br /><span className="text-ad-cyan">{t('about.titleColor')}</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 font-medium leading-relaxed">
                    {t('about.text1')}
                  </p>
                  <p className="text-gray-300 font-medium leading-relaxed">
                    {t('about.text2')}
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-black text-ad-cyan">{t('about.stat1Val')}</p>
                    <p className="text-[10px] font-black text-ad-cyan/75 uppercase tracking-widest">{t('about.stat1Label')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-ad-cyan">{t('about.stat2Val')}</p>
                    <p className="text-[10px] font-black text-ad-cyan/75 uppercase tracking-widest">{t('about.stat2Label')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Map Section */}
        <OfficeMap />
        
        {/* Contact CTA Section */}
        <section id="contacto" className="py-24 bg-ad-blue dark:bg-[#00131d] transition-colors duration-300 relative overflow-hidden">
          {/* Background Wallpaper Image */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
            <motion.img 
              src={contactBg} 
              alt="Contact Wallpaper" 
              className="w-full h-full object-cover opacity-55 dark:opacity-35"
              referrerPolicy="no-referrer"
              loading="lazy"
              animate={{
                scale: [1, 1.05, 1],
                x: [0, -4, 0],
                y: [0, 4, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl border border-white/10">
              {/* Inner card animated high-tech wallpaper with floating effects */}
              <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-30 mix-blend-overlay">
                <motion.img 
                  src={contactBg} 
                  alt="Contact Card Wallpaper" 
                  className="w-full h-full object-cover scale-[1.12]"
                  referrerPolicy="no-referrer"
                  animate={{
                    x: [-8, 8, -8],
                    y: [-6, 6, -6],
                    scale: [1.12, 1.18, 1.12],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className="absolute inset-0 z-0 bg-gradient-to-tr from-ad-blue/20 via-transparent to-ad-blue/20 dark:from-[#002236]/20 dark:via-transparent dark:to-[#002236]/20" />

              <div className="absolute top-0 right-0 w-64 h-64 bg-ad-cyan/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">
                {t('contact.title')}<br /> <span className="text-ad-cyan underline decoration-ad-cyan/30 underline-offset-8">{t('contact.titleColor')}</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto relative z-10">
                {t('contact.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <a 
                  href="https://wa.me/5491157811128" 
                  className="px-10 py-5 bg-gradient-to-r from-ad-cyan to-[#00f2fe] text-ad-blue font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-ad-cyan/20"
                >
                  {t('contact.whatsappBtn')}
                </a>
                <a 
                  href="mailto:alejandrodiaz.seguros@gmail.com" 
                  className="px-10 py-5 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
                >
                  {t('contact.emailBtn')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppChat />
    </div>
  );
}


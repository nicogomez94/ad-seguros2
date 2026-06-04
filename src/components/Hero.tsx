import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import QuoteGenerator from './QuoteGenerator';
import { useTranslation } from '../context/LanguageContext';
import heroBg from '../assets/images/office_workers_bg_1780030661226.png';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
        <motion.img 
          src={heroBg} 
          alt="AD Seguros Protección" 
          className="w-full h-full object-cover opacity-50 dark:opacity-30 filter saturate-50 contrast-75 brightness-105 dark:brightness-50"
          referrerPolicy="no-referrer"
          loading="lazy"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 8, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-white/75 dark:from-ad-dark/45 dark:via-ad-dark/15 dark:to-ad-dark/90 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-white/5 to-transparent dark:from-ad-dark/40 dark:via-ad-dark/10 dark:to-transparent transition-colors duration-300" />
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ad-blue/5 dark:bg-ad-cyan/5 blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0 w-full overflow-hidden rounded-[2.75rem] border border-white/25 dark:border-white/10 bg-white/20 dark:bg-[#001f30]/30 shadow-[0_20px_70px_-30px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="w-full lg:w-[56%] xl:w-[58%] shrink-0 text-left px-8 py-10 md:px-12 md:py-14 xl:px-16 xl:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full flex flex-col justify-center"
            >
              <div className="mb-6 inline-flex w-fit items-center gap-2 px-3 py-1 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-ad-cyan animate-pulse"></span>
                <span className="text-[10px] font-black text-ad-blue dark:text-white uppercase tracking-widest not-italic text-left">{t('hero.matricula')}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-sans font-black text-ad-blue dark:text-white leading-[1.1] mb-6">
                {t('hero.title1')}<span style={{ color: '#1e309b' }} className="italic font-light">{t('hero.titleItalic')}</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00334e] via-[#00334e] to-[#00e5bc] dark:from-white dark:via-slate-100 dark:to-[#00e5bc]">{t('hero.title2')}</span>
              </h1>
              <p style={{ color: '#000000' }} className="text-lg max-w-xl mb-10 leading-relaxed font-semibold">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-ad-cyan" size={18} />
                  <span className="text-sm font-bold text-ad-blue dark:text-white">{t('hero.feature1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-ad-cyan" size={18} />
                  <span className="text-sm font-bold text-ad-blue dark:text-white">{t('hero.feature2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-ad-cyan" size={18} />
                  <span className="text-sm font-bold text-ad-blue dark:text-white">{t('hero.feature3')}</span>
                </div>
              </div>

            <div className="inline-flex w-fit max-w-full flex-wrap gap-8 p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/60 dark:border-white/10 shadow-sm">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-ad-blue dark:text-white">{t('hero.stat1Val')}</span>
                <span style={{ color: '#233222' }} className="text-[9px] font-black uppercase tracking-widest">{t('hero.stat1Label')}</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-ad-blue dark:text-white">{t('hero.stat2Val')}</span>
                <span style={{ color: '#05070b' }} className="text-[9px] font-black uppercase tracking-widest">{t('hero.stat2Label')}</span>
              </div>
            </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-[44%] xl:w-[42%] flex items-stretch justify-center lg:justify-end bg-white/70 dark:bg-[#001f30]/60 border-t lg:border-t-0 lg:border-l border-white/50 dark:border-white/10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full flex items-stretch justify-center lg:justify-end p-0"
            >
              <QuoteGenerator />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

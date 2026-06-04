import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
          <div 
            style={{
              paddingLeft: '40px',
              paddingRight: '40px',
              paddingTop: '40px',
              paddingBottom: '40px',
              marginLeft: '-9px',
              marginBottom: '-2px',
              marginRight: '0px',
              marginTop: '0px',
              borderStyle: 'ridge',
              borderRadius: '44px',
              borderWidth: '1px',
              height: '720.81px',
              width: '570.397px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            className="w-full lg:w-[50%] xl:w-[46%] shrink-0 text-left bg-white/15 dark:bg-[#001f30]/25 border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                height: '666.794px',
                width: '547.365px'
              }}
              className="w-full xl:max-w-[729px]"
            >
              <div 
                style={{ marginBottom: '25px', marginRight: '0px', paddingRight: '12px' }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-full shadow-sm"
              >
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

            {/* Stats Section with Glass Effect */}
            <div 
              style={{
                paddingTop: '24px',
                paddingLeft: '12px',
                paddingRight: '12px',
                borderStyle: 'groove',
                borderRadius: '39px',
                marginLeft: '-40px',
                marginRight: '-6px',
                marginBottom: '-5px',
                marginTop: '-15px',
              }}
              className="flex gap-8 p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/60 dark:border-white/10 inline-flex shadow-sm"
            >
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

          <div className="w-full lg:w-[48%] xl:w-[45%] flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full flex justify-center lg:justify-end"
            >
              {/* Floating elements for dynamic feel */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 z-0 opacity-20 hidden lg:block"
              >
                <Shield size={120} className="text-ad-cyan" />
              </motion.div>

              <QuoteGenerator />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

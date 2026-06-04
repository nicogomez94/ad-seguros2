import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BellRing, Users, Zap, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import alejandroPortrait from '../assets/images/alejandro_diaz_portrait_1779820713310.png';
import notebookPasAlert from '../assets/images/notebook_pas_alert_1779840665511.png';

export default function PASAlert() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    setIsLargeScreen(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsLargeScreen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const cardStyle = isLargeScreen ? {
    width: '458px',
    height: '803.016px',
    paddingBottom: '24px',
    paddingRight: '24px',
    paddingLeft: '24px',
    paddingTop: '24px',
    marginRight: '-20px',
    marginLeft: '0px',
    marginBottom: '0px',
    marginTop: '0px'
  } : {};

  const glassLabelStyle = isLargeScreen ? {
    marginTop: '0px',
    marginLeft: '-14px',
    marginBottom: '0px',
    marginRight: '-9px'
  } : {};

  const nameStyle = isLargeScreen ? {
    fontSize: '16px'
  } : {};

  const roleStyle = isLargeScreen ? {
    fontSize: '11px',
    textAlign: 'left' as const,
    fontStyle: 'normal'
  } : {};

  const badgeStyle = isLargeScreen ? {
    marginRight: '-6px',
    marginLeft: '0px',
    paddingRight: '5px',
    paddingLeft: '6px',
    paddingTop: '2px',
    marginTop: '-17px'
  } : {};

  const message = `Hola, me llamo ${name.trim() || '__________'} soy PAS Matrícula ${matricula.trim() || '__________'} y quiero recibir información sobre el Sistema PAS Alert.`;
  const whatsappUrl = `https://wa.me/5491157811128?text=${encodeURIComponent(message)}`;

  const features = [
    { text: t('pas.fe_due'), icon: <BellRing className="text-ad-cyan" size={20} /> },
    { text: t('pas.fe_crm'), icon: <Users className="text-ad-cyan" size={20} /> },
    { text: t('pas.fe_comm'), icon: <Zap className="text-ad-cyan" size={20} /> },
  ];

  return (
    <section id="pas-alert" className="py-24 bg-ad-blue dark:bg-[#00131d] relative overflow-hidden transition-colors duration-300">
      {/* High-tech background visual detail */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={notebookPasAlert} 
          alt="PAS ALERT Dashboard Background" 
          className="w-full h-full object-cover opacity-40 dark:opacity-30 mix-blend-normal transition-opacity duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
      </div>

      {/* Subtle brand lettering */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h2 className="text-[20rem] font-bold italic rotate-12 select-none">PAS</h2>
      </div>

      <div 
        className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16 w-full">
          {/* Left Column - Core Pitch */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[50%] xl:w-[48%] flex flex-col justify-between text-left shrink-0"
          >
            <div>
              <span className="px-4 py-1.5 bg-ad-cyan text-ad-blue text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
                {t('pas.exclusivo')}
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mt-6 mb-8 italic flex items-center gap-3 flex-wrap">
                <span>PAS</span>
                <motion.span 
                  className="text-red-600 font-black inline-block"
                  style={{ textShadow: '-1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  ALERT
                </motion.span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
                {t('pas.toolDescription')}
              </p>

              <div className="space-y-6 mb-10">
                {features.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-white"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-lg font-medium text-gray-100">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Explainer / Security prevent blocks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-4 shadow-xl"
            >
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                {t('pas.desc1')}
              </p>
              <div className="h-px bg-white/10" />
              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                {t('pas.desc2')}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Brand Showcase Profile with Alejandro's Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[46%] xl:w-[44%] flex justify-center lg:justify-end shrink-0"
          >
            <div 
              style={cardStyle}
              className="relative w-full max-w-[450px] xl:max-w-[458px] bg-[#001f30] rounded-[2.5rem] shadow-deep border border-white/10 p-6 xl:p-8 flex flex-col justify-between overflow-hidden group xl:mr-[-20px]"
            >
              {/* Top ambient glow lights */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-ad-cyan/10 rounded-full blur-3xl pointer-events-none group-hover:bg-ad-cyan/15 transition-all duration-700" />
              <div className="absolute top-1/2 left-0 w-32 h-32 bg-red-650/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
                {/* Photo showcase frame */}
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-ad-cyan/20 group-hover:border-ad-cyan/40 transition-colors duration-500 bg-slate-950">
                  <img 
                    src={alejandroPortrait} 
                    alt="Alejandro Diaz" 
                    className="w-full h-full object-cover object-top scale-[1.02] group-hover:scale-[1.05] transition-all duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle glass brand label and signature badge */}
                  <div 
                    style={glassLabelStyle}
                    className="absolute bottom-4 left-4 right-4 glass p-3 md:p-4 rounded-2xl flex items-center justify-between border border-white/10 shadow-lg"
                  >
                    <div>
                      <h4 
                        style={nameStyle}
                        className="text-sm md:text-base font-bold text-white tracking-tight"
                      >
                        Alejandro Diaz
                      </h4>
                      <p 
                        style={roleStyle}
                        className="text-[10px] md:text-xs text-ad-cyan font-semibold text-left not-italic"
                      >
                        {t('pas.creatorRole')}
                      </p>
                    </div>
                    <span 
                      style={badgeStyle}
                      className="text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-ad-cyan text-ad-blue px-2 py-0.5 rounded-full shadow-inner"
                    >
                      Matricula Nacional N°107.126
                    </span>
                  </div>
                </div>

                {/* Highly compelling blockquote citation */}
                <div className="px-2 flex flex-col justify-center py-1">
                  <div className="text-ad-cyan mb-2 text-2xl font-serif leading-none">“</div>
                  <p className="text-base text-gray-100 font-bold leading-relaxed tracking-tight italic opacity-95 group-hover:text-white transition-colors duration-300">
                    {t('pas.quote')}
                  </p>
                  <div className="text-ad-cyan text-right text-2xl font-serif leading-none -mt-2">”</div>
                </div>

                {/* Form fields for Name and Matricula */}
                <div className="flex flex-col gap-4 px-2">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-widest text-ad-cyan uppercase mb-1.5 text-left">
                      {t('pas.formNameLabel')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('pas.formNamePlaceholder')}
                      className="w-full bg-white/5 border border-white/10 focus:border-ad-cyan/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-ad-cyan/30 transition-all font-medium text-left"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-black tracking-widest text-ad-cyan uppercase mb-1.5 text-left">
                      {t('pas.formMatriculaLabel')}
                    </label>
                    <input
                      type="text"
                      value={matricula}
                      onChange={(e) => setMatricula(e.target.value)}
                      placeholder={t('pas.formMatriculaPlaceholder')}
                      className="w-full bg-white/5 border border-white/10 focus:border-ad-cyan/40 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-ad-cyan/30 transition-all font-medium text-left"
                    />
                  </div>
                </div>

                {/* Request access CTA Button */}
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="w-full"
                >
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4.5 px-6 bg-gradient-to-r from-ad-cyan to-[#00f2fe] text-ad-blue font-black rounded-2xl shadow-lg border border-ad-cyan/25 hover:shadow-cyan-500/20 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-center"
                  >
                    <span>{t('pas.requestAccess')}</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


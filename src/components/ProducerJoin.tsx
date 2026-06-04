import { motion } from 'motion/react';
import { Rocket, Target, Users, Zap, CheckCircle2, MessageSquare } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import producerBg from '../assets/images/producer_bg_1779841165074.png';

export default function ProducerJoin() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Rocket className="text-ad-cyan" size={24} />,
      title: t('producer.benefit1Title'),
      description: t('producer.benefit1Desc')
    },
    {
      icon: <Target className="text-ad-cyan" size={24} />,
      title: t('producer.benefit2Title'),
      description: t('producer.benefit2Desc')
    },
    {
      icon: <Zap className="text-ad-cyan" size={24} />,
      title: t('producer.benefit3Title'),
      description: t('producer.benefit3Desc')
    },
    {
      icon: <Users className="text-ad-cyan" size={24} />,
      title: t('producer.benefit4Title'),
      description: t('producer.benefit4Desc')
    }
  ];

  const handleJoinClick = () => {
    const message = encodeURIComponent(t('producer.whatsappText'));
    window.open(`https://wa.me/5491157811128?text=${message}`, '_blank');
  };

  return (
    <section id="productores" className="py-24 bg-ad-blue dark:bg-[#00131d] relative overflow-hidden transition-colors duration-300">
      {/* Background Wallpaper Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={producerBg} 
          alt="Grow Your Career Backdrop" 
          className="w-full h-full object-cover opacity-35 dark:opacity-20 mix-blend-soft-light transition-opacity duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
      </div>

      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-ad-cyan/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-ad-cyan/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
              {t('producer.title')}<br />
              <span className="text-ad-cyan">{t('producer.titleColor')}</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium">
              {t('producer.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
            >
              <div className="mb-6 p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/5 dark:bg-[#001f30]/45 rounded-[3rem] p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl transition-colors duration-300 text-white backdrop-blur-md">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4 text-ad-cyan">
              <CheckCircle2 size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('producer.incorporation')}</span>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
              {t('producer.nextStepTitle')}
            </h3>
            <p className="text-gray-300 font-medium italic">
              {t('producer.nextStepQuote')}
            </p>
          </div>
          
          <button
            onClick={handleJoinClick}
            className="w-full md:w-auto px-10 py-6 bg-gradient-to-r from-ad-cyan to-[#00f2fe] text-ad-blue hover:scale-105 active:scale-95 transition-all font-black rounded-3xl flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest text-sm cursor-pointer"
          >
            {t('producer.joinNow')} <MessageSquare size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

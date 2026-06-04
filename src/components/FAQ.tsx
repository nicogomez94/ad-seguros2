import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import faqBg from '../assets/images/faq_bg_1779841876811.png';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  key?: React.Key;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Very subtle tilt on wide banners
    const rX = -(mouseY / height) * 6;
    const rY = (mouseX / width) * 4;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.018 : 1,
        y: isHovered ? -3 : 0,
        backgroundColor: isOpen 
          ? "rgba(255, 255, 255, 0.06)" 
          : isHovered 
            ? "rgba(255, 255, 255, 0.04)" 
            : "rgba(255, 255, 255, 0.015)"
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`mb-4 rounded-3xl border transition-all duration-200 overflow-hidden relative ${
        isOpen ? 'border-ad-cyan/40 shadow-lg shadow-ad-cyan/5' : 'border-white/10'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full py-5 px-6 flex items-center justify-between text-left group transition-colors cursor-pointer select-none relative z-10"
      >
        <span 
          style={{ transform: "translateZ(10px)" }}
          className={`text-lg font-bold transition-colors ${isOpen ? 'text-ad-cyan' : 'text-white group-hover:text-ad-cyan'}`}
        >
          {question}
        </span>
        <div 
          style={{ transform: "translateZ(15px)" }}
          className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          {isOpen ? (
            <Minus size={20} className="text-ad-cyan" />
          ) : (
            <Plus size={20} className="text-slate-400 group-hover:text-ad-cyan" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden relative z-10"
          >
            <p 
              style={{ transform: "translateZ(5px)" }}
              className="pb-5 px-6 text-gray-300 leading-relaxed max-w-3xl"
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  const faqData = [
    {
      question: t('faq.item1Q'),
      answer: t('faq.item1A')
    },
    {
      question: t('faq.item2Q'),
      answer: t('faq.item2A')
    },
    {
      question: t('faq.item3Q'),
      answer: t('faq.item3A')
    },
    {
      question: t('faq.item4Q'),
      answer: t('faq.item4A')
    },
    {
      question: t('faq.item5Q'),
      answer: t('faq.item5A')
    }
  ];

  return (
    <section id="faq" className="py-24 bg-ad-blue dark:bg-[#00131d] relative overflow-hidden transition-colors duration-300">
      {/* Background Wallpaper Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img 
          src={faqBg} 
          alt="FAQ Wallpaper" 
          className="w-full h-full object-cover opacity-45 dark:opacity-20"
          referrerPolicy="no-referrer"
          loading="lazy"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 5, 0],
            y: [0, -6, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
      </div>

      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 w-full">
          <div className="w-full lg:w-[35%] xl:w-[32%] shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32 bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] dark:shadow-none transition-all duration-300 text-white"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase line-tight">
                {t('faq.title')}<br /> <span className="text-ad-cyan">{t('faq.titleColor')}</span>
              </h2>
              <p className="text-gray-300 mb-8 font-bold font-sans text-sm md:text-base leading-relaxed">
                {t('faq.subtitle')}
              </p>
              <div className="p-6 bg-white/5 dark:bg-[#00273d]/45 backdrop-blur-md rounded-3xl border border-white/10 shadow-md">
                <p className="text-xs font-black text-ad-cyan uppercase tracking-widest mb-2">{t('faq.noFind')}</p>
                <p className="text-sm text-white font-bold mb-4">{t('faq.personalHelp')}</p>
                <a 
                  href="#contacto" 
                  className="inline-flex items-center gap-2 text-ad-cyan font-black text-xs uppercase tracking-widest hover:gap-3 transition-all font-sans"
                >
                  {t('faq.contactSupport')} <Plus size={14} />
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-[60%] xl:w-[58%] shrink-0">
            <div className="bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md rounded-[2.5rem] p-4 md:p-8 border border-white/10 transition-colors shadow-lg text-white">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

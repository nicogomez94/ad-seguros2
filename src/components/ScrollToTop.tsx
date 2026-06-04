import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Initial check
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="btn-volver-al-inicio"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          whileHover={{ scale: 1.1, translateY: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 bg-ad-cyan text-ad-blue font-black rounded-full shadow-2xl hover:bg-white dark:hover:bg-ad-dark dark:hover:text-ad-cyan border-2 border-ad-cyan hover:border-ad-blue/20 dark:hover:border-ad-cyan/50 transition-colors uppercase tracking-wider text-xs cursor-pointer"
          title={t('nav.volverInicio')}
          aria-label={t('nav.volverInicio')}
        >
          <span className="hidden md:inline pl-1">{t('nav.volverInicio')}</span>
          <div className="p-1 bg-ad-blue text-white rounded-full flex items-center justify-center">
            <ChevronUp size={16} strokeWidth={3} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

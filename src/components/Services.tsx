import { motion, AnimatePresence } from 'motion/react';
import { Car, Gavel, ShieldCheck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import servicesBg from '../assets/images/services_bg_1779841449931.png';

// Wrap Lucide icons with motion for specialized animations
const MotionCar = motion(Car);
const MotionGavel = motion(Gavel);
const MotionShield = motion(ShieldCheck);

const ServiceSkeleton = () => {
  return (
    <div className="bg-[#001f30] p-10 rounded-[2.5rem] shadow-polish border border-white/5 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full shimmer opacity-10 mb-8" />
      <div className="h-6 w-3/4 shimmer opacity-10 rounded-lg mb-4" />
      <div className="h-3 w-full shimmer opacity-10 rounded-lg mb-2" />
      <div className="h-3 w-5/6 shimmer opacity-10 rounded-lg mb-8" />
      <div className="mt-auto h-3 w-24 shimmer opacity-10 rounded-full opacity-50" />
    </div>
  );
};

interface ServiceCardProps {
  key?: React.Key;
  service: {
    title: string;
    desc: string;
    icon: any;
    iconVariants: any;
  };
  idx: number;
  checkAvailabilityLabel: string;
}

function ServiceCard({ service, idx, checkAvailabilityLabel }: ServiceCardProps) {
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
    
    // Compute 3D tilt rotations
    const rX = -(mouseY / height) * 14;
    const rY = (mouseX / width) * 14;
    
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.045 : 1,
        y: isHovered ? -12 : 0,
        boxShadow: isHovered 
          ? "0 25px 60px -15px rgba(0, 229, 188, 0.25)" 
          : "0 10px 30px -15px rgba(0, 0, 0, 0.4)"
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="bg-[#001f30] p-10 rounded-[2.5rem] border border-white/10 transition-all duration-200 group flex flex-col items-center text-center cursor-default text-white relative overflow-hidden"
    >
      {/* Glossy light effect tracking mouse movement */}
      <motion.div 
        animate={{
          opacity: isHovered ? 0.2 : 0,
          background: isHovered 
            ? `radial-gradient(circle 140px at ${rotateY * 20 + 170}px ${-rotateX * 20 + 170}px, rgba(0, 229, 188, 0.35), transparent)` 
            : 'none'
        }}
        className="absolute inset-0 pointer-events-none transition-all duration-150 z-0"
      />

      {/* Layer 1: Floating background elements */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-ad-cyan/20 rounded-full blur-2xl" />
      </div>

      {/* Layer 2: Floating Icon Box (translateZ depth) */}
      <motion.div 
        animate={{
          z: isHovered ? 50 : 0,
          scale: isHovered ? 1.12 : 1,
          backgroundColor: isHovered ? 'rgba(0, 229, 188, 0.15)' : 'rgba(255, 255, 255, 0.05)'
        }}
        style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
        className="w-20 h-20 rounded-full flex items-center justify-center text-white mb-8 shadow-inner relative overflow-hidden transition-colors duration-300 z-10"
      >
        <service.icon animate={isHovered ? "hover" : "initial"} className="text-white relative z-10" />
      </motion.div>
      
      {/* Layer 3: Title */}
      <motion.h3 
        style={{ transform: "translateZ(40px)" }}
        className="text-xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-ad-cyan transition-colors z-10"
      >
        {service.title}
      </motion.h3>
      
      {/* Layer 4: Description */}
      <motion.p 
        style={{ transform: "translateZ(20px)" }}
        className="text-sm text-gray-300 leading-relaxed mb-8 px-4 z-10"
      >
        {service.desc}
      </motion.p>
      
      {/* Layer 5: Availability Action */}
      <motion.div 
        style={{ transform: "translateZ(25px)" }}
        className="mt-auto z-10"
      >
        <span className="text-[10px] font-black text-ad-cyan uppercase tracking-[0.2em] group-hover:text-white transition-colors flex items-center justify-center gap-1.5">
           {checkAvailabilityLabel}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: t('services.item1Title'),
      desc: t('services.item1Desc'),
      icon: (props: any) => <MotionCar {...props} size={32} />,
      iconVariants: {
        hover: { x: [0, 5, 0], transition: { duration: 0.5, repeat: Infinity } }
      }
    },
    {
      title: t('services.item2Title'),
      desc: t('services.item2Desc'),
      icon: (props: any) => <MotionGavel {...props} size={32} />,
      iconVariants: {
        hover: { rotate: [0, -15, 0], transition: { duration: 0.4, repeat: Infinity } }
      }
    },
    {
      title: t('services.item3Title'),
      desc: t('services.item3Desc'),
      icon: (props: any) => <MotionShield {...props} size={32} />,
      iconVariants: {
        hover: { scale: [1, 1.2, 1], transition: { duration: 0.8, repeat: Infinity } }
      }
    }
  ];

  return (
    <section id="servicios" className="relative overflow-hidden py-24 bg-ad-blue dark:bg-[#00131d] transition-colors duration-300">
      {/* Background image reflecting specifications of each service */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img 
          src={servicesBg} 
          alt="Servicios AD Seguros" 
          className="w-full h-full object-cover opacity-45 dark:opacity-25"
          referrerPolicy="no-referrer"
          loading="lazy"
          animate={{
            scale: [1, 1.06, 1],
            x: [0, -6, 0],
            y: [0, 4, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
      </div>

      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md py-10 px-8 md:px-12 rounded-[2.5rem] border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] dark:shadow-none transition-all duration-300">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter"
          >
            {t('services.title')}<span className="text-ad-cyan">{t('services.titleColor')}</span>
          </motion.h2>
          <p className="text-gray-300 font-bold font-sans text-sm md:text-base leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <>
                <ServiceSkeleton />
                <ServiceSkeleton />
                <ServiceSkeleton />
              </>
            ) : (
              services.map((service, idx) => (
                <ServiceCard 
                  key={service.title} 
                  service={service} 
                  idx={idx} 
                  checkAvailabilityLabel={t('services.checkAvailability')} 
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


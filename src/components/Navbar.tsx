import { motion, AnimatePresence } from 'motion/react';
import { Shield, Menu, X, Sun, Moon, Globe, Search, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(location.hash || '#inicio');
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useTranslation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.hash) {
      setActiveHash(location.hash);
    } else {
      setActiveHash('#inicio');
    }
  }, [location.hash]);

  // Handle keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus the input when the search palette is triggered
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const navLinks = [
    { name: t('nav.inicio'), href: '#inicio' },
    { name: t('nav.servicios'), href: '#servicios' },
    { name: t('nav.pasAlert'), href: '#pas-alert', isStatCard: true },
    { name: t('nav.productores'), href: '#productores' },
    { name: t('nav.faq'), href: '#faq' },
    { name: t('nav.nosotros'), href: '#nosotros' },
    { name: t('nav.ubicacion'), href: '#ubicacion' },
  ];

  const searchItems = [
    {
      id: 'inicio',
      title: language === 'en' ? 'Home' : 'Inicio / Portada',
      subtitle: language === 'en' ? 'Main section with direct quote generator' : 'Sección principal y cotizador express',
      href: '#inicio',
      keywords: language === 'en' 
        ? ['home', 'start', 'quote', 'welcome', 'express', 'inicio', 'cotizador', 'bienvenido']
        : ['inicio', 'portada', 'cotizar', 'bienvenida', 'principal', 'home', 'arriba'],
      category: language === 'en' ? 'Navigation' : 'Navegación',
    },
    {
      id: 'servicios',
      title: language === 'en' ? 'Our Insurances & Services' : 'Nuestros Seguros y Servicios',
      subtitle: language === 'en' ? 'Auto, Home, Life & Business coverage specifications' : 'Auto, Hogar, Vida, Comercio y ART',
      href: '#servicios',
      keywords: language === 'en' 
        ? ['services', 'auto', 'car', 'home', 'house', 'life', 'accident', 'business', 'commerce', 'companies', 'art', 'work', 'workplace', 'coverage', 'cobertura', 'seguros', 'servicios', 'siniestros']
        : ['servicios', 'coberturas', 'auto', 'coche', 'carro', 'hogar', 'casa', 'vida', 'accidentes', 'comercio', 'empresas', 'art', 'trabajo', 'negocio', 'póliza', 'seguros'],
      category: language === 'en' ? 'Services' : 'Servicios',
    },
    {
      id: 'pas-alert',
      title: 'PAS Alert Software',
      subtitle: language === 'en' ? 'Exclusive automated claim notification software' : 'Software de alerta y vencimientos para productores',
      href: '#pas-alert',
      keywords: language === 'en' 
        ? ['pas alert', 'software', 'technology', 'commission', 'alarm', 'notice', 'notifications', 'automation']
        : ['pas alert', 'software', 'tecnologia', 'alertas', 'notificaciones', 'vencimientos', 'comisiones', 'alarma', 'automatizacion'],
      category: language === 'en' ? 'Technology' : 'Tecnología',
    },
    {
      id: 'productores',
      title: language === 'en' ? 'Join as a Producer / Broker' : 'Unite como Productor / Asesor',
      subtitle: language === 'en' ? 'Alliances, commissions and direct growth plans' : 'Alianzas organizativas, comisiones y planes de crecimiento',
      href: '#productores',
      keywords: language === 'en' 
        ? ['producers', 'brokers', 'join', 'alliance', 'work', 'careers', 'partners', 'grow', 'commissions']
        : ['productores', 'organizacion', 'unirse', 'alianza', 'trabajo', 'oportunidad', 'comisiones', 'crecer', 'asesores'],
      category: language === 'en' ? 'Partnership' : 'Asociarse',
    },
    {
      id: 'faq',
      title: language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes (FAQ)',
      subtitle: language === 'en' ? 'Resolving doubts about payments, claims, coverage limits' : 'Respuestas sobre pagos, siniestros, grúas y coberturas',
      href: '#faq',
      keywords: language === 'en' 
        ? ['faq', 'questions', 'answers', 'doubt', 'help', 'payments', 'tow', 'crane', 'claims', 'siniestros', 'ayuda', 'preguntas', 'respuestas']
        : ['faq', 'preguntas', 'respuestas', 'dudas', 'ayuda', 'pagos', 'siniestros', 'grua', 'remolque', 'cobertura', 'vencimiento'],
      category: language === 'en' ? 'Support' : 'Soporte',
    },
    {
      id: 'nosotros',
      title: language === 'en' ? 'Who We Are / Experience' : 'Quiénes Somos / Trayectoria',
      subtitle: language === 'en' ? 'More than 15 years in insurance brokerage led by Alejandro Diaz' : 'Más de 15 años de experiencia liderado por Alejandro Diaz',
      href: '#nosotros',
      keywords: language === 'en' 
        ? ['about', 'us', 'who', 'experience', 'trajectory', 'alejandro diaz', 'brokerage', 'nosotros', 'trayectoria', 'quienes']
        : ['nosotros', 'alejandro diaz', 'trayectoria', 'quienes somos', 'experiencia', 'broker', 'oficina', 'equipo'],
      category: language === 'en' ? 'Company' : 'Compañía',
    },
    {
      id: 'contacto',
      title: language === 'en' ? 'Get in Touch / Quote' : 'Contacto Directo',
      subtitle: language === 'en' ? 'Request consulting via WhatsApp or Direct Mail' : 'Consulta por WhatsApp o correo electrónico inmediato',
      href: '#contacto',
      keywords: language === 'en' 
        ? ['contact', 'whatsapp', 'phone', 'mail', 'email', 'card', 'quote', 'write', 'escribinos', 'cotizar', 'llamada']
        : ['contacto', 'whatsapp', 'telefono', 'mail', 'correo', 'escribinos', 'escribir', 'llamada', 'cotizar', 'direccion'],
      category: language === 'en' ? 'Contact' : 'Contacto',
    },
    {
      id: 'ubicacion',
      title: language === 'en' ? 'Our Offices / Map' : 'Nuestras Oficinas / Ubicación',
      subtitle: language === 'en' ? 'Interactive map and local details in Monte Grande' : 'Mapa interactivo y horarios de atención en Monte Grande',
      href: '#ubicacion',
      keywords: language === 'en' 
        ? ['map', 'location', 'office', 'headquarters', 'monte grande', 'directions', 'coordinates', 'address', 'hours']
        : ['mapa', 'ubicacion', 'oficina', 'monte grande', 'como llegar', 'direccion', 'coordenadas', 'horarios', 'horario'],
      category: language === 'en' ? 'Location' : 'Ubicación',
    }
  ];

  const filteredResults = searchQuery.trim() === ''
    ? searchItems 
    : searchItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );
      });

  const handleScrollToSection = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveHash(href);
      window.history.pushState(null, '', href);
    }
  };

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-ad-dark/85 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 h-20 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Link to="#inicio" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-ad-blue dark:bg-ad-cyan rounded-lg flex items-center justify-center text-ad-cyan dark:text-ad-blue transition-colors">
              <Shield size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-display font-bold text-ad-blue dark:text-white tracking-tight">
              AD <span className="text-ad-cyan">SEGUROS</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div 
          style={{ paddingRight: '-9px', paddingLeft: '-3px', marginLeft: '0px', marginRight: '-94px', marginTop: '0px' }}
          className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider"
        >
          {navLinks.map((link, idx) => {
            const isActive = activeHash === link.href;
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative"
              >
                <a
                  href={link.href}
                  className={`transition-all duration-300 hover:text-ad-cyan relative py-1 ${
                    isActive ? 'text-ad-blue dark:text-white' : 'text-slate-400 dark:text-slate-300'
                  } ${link.isStatCard ? 'font-black' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ad-cyan rounded-full"
                    />
                  )}
                </a>
              </motion.div>
            );
          })}

          {/* Spotlight Search Toggle Button (Desktop) */}
          <motion.button
            onClick={() => setIsSearchOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 flex items-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-slate-400 dark:text-slate-300 border border-slate-200/50 dark:border-white/5 rounded-full px-4 py-2.5 text-xs font-semibold cursor-pointer shadow-sm hover:scale-105 transition-all text-left w-36 xl:w-44 shrink-0"
            title={language === 'en' ? 'Search sections (Ctrl+K)' : 'Buscar secciones (Ctrl+K)'}
          >
            <Search size={14} className="text-slate-500 dark:text-ad-cyan shrink-0" />
            <span className="truncate hidden xl:inline">{language === 'en' ? 'Search...' : 'Buscar...'}</span>
            <span className="ml-auto text-[10px] bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono font-bold tracking-tight shrink-0">⌘K</span>
          </motion.button>

          {/* Theme Switch Button */}
          <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 p-2.5 rounded-full bg-slate-50 hover:bg-slate-150 dark:bg-white/5 dark:hover:bg-white/10 text-ad-blue dark:text-ad-cyan transition-all border border-slate-200/50 dark:border-white/5 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 shrink-0"
            title={`${theme === 'light' ? t('nav.toggleThemeDark') : t('nav.toggleThemeLight')} (Alt+T)`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={16} className="text-slate-600" />
            ) : (
              <Sun size={16} className="text-amber-300" />
            )}
          </motion.button>

          {/* Language Switch Button */}
          <motion.button
            onClick={toggleLanguage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 px-3 py-2.5 rounded-full bg-slate-50 hover:bg-slate-150 dark:bg-white/5 dark:hover:bg-white/10 text-ad-blue dark:text-ad-cyan transition-all border border-slate-200/50 dark:border-white/5 flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 text-xs font-bold shrink-0"
            title={t('nav.toggleLang')}
            aria-label="Toggle language"
          >
            <Globe size={14} className="text-slate-500 dark:text-ad-cyan" />
            <span className="font-mono text-[10px] tracking-wide">{language.toUpperCase()}</span>
          </motion.button>

          <motion.a
            href="https://pasalert.com/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.05, 1],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              },
              opacity: { duration: 0.3 },
              default: { ease: "easeOut" }
            }}
            className="ml-2 px-6 py-2.5 rounded-full text-sm md:text-base font-black uppercase tracking-widest bg-ad-blue dark:bg-slate-900 border border-slate-700/50 hover:bg-[#00273d] dark:hover:bg-[#001f30] transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="text-white uppercase font-black">PAS</span>
            <span 
              className="text-red-600 dark:text-red-500 uppercase font-black tracking-wider animate-pulse"
              style={{ textShadow: '-1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff' }}
            >
              ALERT
            </span>
          </motion.a>
        </div>

        {/* Mobile Toggle & Theme Switcher (Mobile) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full bg-slate-50 dark:bg-white/5 text-ad-blue dark:text-ad-cyan border border-slate-100 dark:border-white/5 mr-1"
            aria-label="Search"
          >
            <Search size={18} className="text-slate-600 dark:text-ad-cyan" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-50 dark:bg-white/5 text-ad-blue dark:text-ad-cyan border border-slate-100 dark:border-white/5"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} className="text-slate-600" /> : <Sun size={18} className="text-amber-300" />}
          </button>

          <button 
            className="text-ad-blue dark:text-white" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white dark:bg-ad-dark border-b border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-300"
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold uppercase tracking-widest transition-colors ${
                    isActive ? 'text-ad-cyan' : 'text-ad-blue dark:text-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Mobile Dark Theme Selector Bar */}
            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold uppercase tracking-widest text-xs text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>{theme === 'light' ? t('nav.toggleThemeDark') : t('nav.toggleThemeLight')}</span>
              <div className="p-1 bg-white dark:bg-ad-blue rounded-full shadow-sm text-slate-600 dark:text-ad-cyan">
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} className="text-amber-300" />}
              </div>
            </button>

            {/* Mobile Language Selector Bar */}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 font-bold uppercase tracking-widest text-xs text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>{language === 'es' ? 'Switch to English' : 'Cambiar a Español'}</span>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-ad-blue rounded-full shadow-sm text-slate-600 dark:text-ad-cyan">
                <Globe size={12} className="text-slate-500 dark:text-ad-cyan" />
                <span className="font-mono text-[9px] font-bold tracking-wider">{language.toUpperCase()}</span>
              </div>
            </button>

            <motion.a 
              href="https://pasalert.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              animate={{ 
                scale: [1, 1.04, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-full py-4 rounded-2xl text-center font-black uppercase tracking-widest text-base md:text-lg transition-all bg-ad-blue dark:bg-slate-900 border border-slate-700/50 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] flex items-center justify-center gap-1.5"
            >
              <span className="text-white uppercase font-black">PAS</span>
              <span 
                className="text-red-600 dark:text-red-500 uppercase font-black tracking-wider animate-pulse"
                style={{ textShadow: '-1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff, -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff' }}
              >
                ALERT
              </span>
            </motion.a>
          </div>
        </motion.div>
      )}

      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4 md:px-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-xl bg-white dark:bg-[#001f30] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 overflow-hidden flex flex-col transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input header */}
              <div className="relative p-5 border-b border-slate-100 dark:border-white/5 flex items-center">
                <Search size={20} className="text-slate-400 dark:text-ad-cyan absolute left-6" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Search sections, coverages, FAQs...' : 'Buscar secciones, coberturas, preguntas...'}
                  className="w-full pl-12 pr-12 py-3 bg-transparent text-slate-800 dark:text-white font-bold placeholder-slate-400 focus:outline-none text-base md:text-lg"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-6 p-1.5 hover:bg-slate-150 dark:hover:bg-white/10 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all text-xs font-mono font-bold border border-slate-150 dark:border-white/5"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
                <p className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase px-3 pb-1">
                  {searchQuery.trim() === '' 
                    ? (language === 'en' ? 'Quick sections / Suggestions' : 'Secciones rápidas / Sugerencias')
                    : (language === 'en' ? `Results for "${searchQuery}"` : `Resultados para "${searchQuery}"`)}
                </p>

                {filteredResults.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-slate-400 dark:text-slate-400 font-bold text-sm">
                      {language === 'en' ? 'No matches found...' : 'No se encontraron coincidencias...'}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {language === 'en' ? 'Try searching Auto, FAQ, PAS, Contact...' : 'Probá buscando Auto, FAQ, PAS, Contacto...'}
                    </p>
                  </div>
                ) : (
                  filteredResults.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleScrollToSection(item.href)}
                      className="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-[#00273d]/60 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-white/5 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-[10px] font-black text-ad-cyan uppercase tracking-wider block mb-0.5">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-ad-cyan transition-colors truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 dark:text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-ad-cyan group-hover:translate-x-1.5 transition-all shrink-0" />
                    </button>
                  ))
                )}
              </div>

              {/* Bottom footer bar */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between font-medium">
                <span>{language === 'en' ? 'Press ESC to close' : 'Presioná ESC para cerrar'}</span>
                <span>💡 {language === 'en' ? 'Keyboard navigation enabled' : 'Búsqueda inteligente de secciones'}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

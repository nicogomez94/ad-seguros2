import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../context/LanguageContext';
import officeBg from '../assets/images/office_bg_1780029926864.png';

export default function OfficeMap() {
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);

  // Load Leaflet and CSS dynamically
  useEffect(() => {
    let leafletCss = document.getElementById('leaflet-css') as HTMLLinkElement;
    if (!leafletCss) {
      leafletCss = document.createElement('link');
      leafletCss.id = 'leaflet-css';
      leafletCss.rel = 'stylesheet';
      leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(leafletCss);
    }

    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        setLeafletLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setLeafletLoaded(true);
    }
  }, []);

  // Initialize and update map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Approximate Coordinates for central Monte Grande, Buenos Aires:
    const position: [number, number] = [-34.8197, -58.4682];

    // Destroy existing instance to reinitialize
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: position,
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    // Detect theme structure
    const isDark = document.documentElement.classList.contains('dark');
    
    // Choose professional, high-end map background tiles:
    // CartoDB Voyager is extremely beautiful and clean.
    // We lock it to Voyager so the map style does not undergo changes in night mode.
    const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom Marker Icon: A sleek, glowing blue shield matching AD Seguros' identity
    const markerHtml = `
      <div class="relative flex items-center justify-center w-10 h-10">
        <span class="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-35 animate-ping"></span>
        <div class="relative flex items-center justify-center rounded-full bg-ad-blue dark:bg-[#001f30] text-ad-cyan border-2 border-ad-cyan w-8 h-8 shadow-lg shadow-cyan-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z"/>
          </svg>
        </div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: markerHtml,
      className: 'ad-map-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -10],
    });

    const marker = L.marker(position, { icon: customIcon }).addTo(map);

    // Dynamic PopUp details matching both languages
    const popupHtml = `
      <div class="p-3 font-sans max-w-[220px]">
        <span class="text-[9px] font-black uppercase text-ad-cyan tracking-wider block mb-0.5">Casa Central</span>
        <h4 class="font-bold text-sm text-[#00273d] mb-1">AD Seguros</h4>
        <p class="text-[11px] text-slate-500 leading-relaxed mb-2">Monte Grande, Buenos Aires, Argentina</p>
        <div class="h-px bg-slate-100 my-1.5"></div>
        <p class="text-[10px] text-slate-400 font-medium">Asesoramiento integral y personalizado</p>
      </div>
    `;

    marker.bindPopup(popupHtml, {
      closeButton: false,
      className: 'ad-popup-styled'
    });

    // Auto open popup for prompt visual onboarding
    marker.openPopup();

    // Listen to theme adjustments dynamically
    const observer = new MutationObserver(() => {
      // Keep static Voyager tiles, just ensure map redraws correctly if needed
      map.invalidateSize();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Handle initial resize refresh
    setTimeout(() => {
      map.invalidateSize();
    }, 400);

    return () => {
      observer.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Handle direct navigation to maps coordinate
  const coordinateQuery = "Monte Grande, Buenos Aires, Argentina";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinateQuery)}`;

  return (
    <section id="ubicacion" className="py-24 bg-ad-blue dark:bg-[#00131d] transition-colors duration-300 border-t border-white/5 relative overflow-hidden">
      {/* Background Wallpaper Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <motion.img 
          src={officeBg} 
          alt="Office Wallpaper" 
          className="w-full h-full object-cover opacity-55 dark:opacity-35"
          referrerPolicy="no-referrer"
          loading="lazy"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -4, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ad-blue/90 via-ad-blue/50 to-ad-blue/80 dark:from-[#00131d]/95 dark:via-[#00131d]/60 dark:to-[#00131d]/85 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-ad-blue/40 via-transparent to-ad-blue/40 dark:from-[#00131d]/40 dark:via-transparent dark:to-[#00131d]/40 transition-colors duration-300" />
      </div>

      {/* Background soft lighting details */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ad-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ad-blue/5 dark:bg-ad-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md py-10 px-8 rounded-[2.5rem] border border-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] dark:shadow-none transition-all duration-300">
          <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-ad-cyan text-xs font-black uppercase tracking-widest rounded-full shadow-sm">
            {t('map.badge') || 'NUESTRAS OFICINAS'}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-6 mb-4 tracking-tighter uppercase line-tight">
            {t('map.title') || 'VISITANOS EN '}<span className="text-ad-cyan">{t('map.titleColor') || 'MONTE GRANDE'}</span>
          </h2>
          <p className="text-gray-300 font-bold font-sans text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {t('map.subtitle') || 'Acercate a conversar con nuestros especialistas para conseguir un plan de protección diseñado a tu medida.'}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 w-full flex flex-col justify-between bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl text-white"
          >
            <div>
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight uppercase border-b border-white/10 pb-4">
                {t('map.cardTitle') || 'CASA CENTRAL'}
              </h3>
              
              <ul className="space-y-6 text-white">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-ad-cyan flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-ad-cyan uppercase tracking-widest block mb-1">
                      {t('map.addressLabel') || 'Dirección'}
                    </span>
                    <span className="text-base font-bold text-slate-200 leading-relaxed">
                      Monte Grande, Buenos Aires, Argentina
                    </span>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-ad-cyan flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-ad-cyan uppercase tracking-widest block mb-1">
                      {t('map.hoursLabel') || 'Horarios de Atención'}
                    </span>
                    <span className="text-base font-bold text-slate-200 block">
                      {t('map.hoursWeek') || 'Lunes a Viernes: 9:00 a 18:00 hs'}
                    </span>
                    <span className="text-sm font-bold text-gray-300 mt-1 block">
                      {t('map.hoursWeekend') || 'Sábados: 9:00 a 13:00 hs'}
                    </span>
                    <span className="text-xs text-rose-400 font-semibold mt-1 block">
                      {t('map.hoursClosed') || 'Domingos y feriados: Cerrado'}
                    </span>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-ad-cyan flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-ad-cyan uppercase tracking-widest block mb-1">
                      {t('map.phoneLabel') || 'Teléfono / WhatsApp'}
                    </span>
                    <a href="https://wa.me/5491157811128" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-slate-200 hover:text-ad-cyan transition-colors block">
                      +54 11 5781-1128
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 text-ad-cyan flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-ad-cyan uppercase tracking-widest block mb-1">
                      {t('map.emailLabel') || 'Correo Electrónico'}
                    </span>
                    <a href="mailto:alejandrodiaz.seguros@gmail.com" className="text-base font-bold text-slate-200 hover:text-ad-cyan transition-colors block break-all">
                      alejandrodiaz.seguros@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps Actions */}
            <div className="mt-10 pt-6 border-t border-white/10 space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-5 bg-gradient-to-r from-ad-cyan to-[#00f2fe] text-ad-blue font-black rounded-2xl shadow-md text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-350 cursor-pointer"
              >
                <Navigation size={14} />
                <span>{t('map.howToGet') || 'CÓMO LLEGAR'}</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            </div>
          </motion.div>

          {/* Right panel: Core Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-white/5 dark:bg-[#001f30]/40 backdrop-blur-md rounded-3xl p-3 border border-white/10 shadow-xl min-h-[420px] md:min-h-[500px] flex flex-col overflow-hidden relative"
          >
            {/* Interactive maps container */}
            <motion.div
              ref={mapContainerRef}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              animate={leafletLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex-1 rounded-2xl border border-white/10 overflow-hidden relative z-0 h-full min-h-[380px]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

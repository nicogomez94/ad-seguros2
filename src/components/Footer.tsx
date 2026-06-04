import { Instagram, Linkedin, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import adLogo from '../../4.svg';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="nosotros" className="bg-ad-blue dark:bg-[#001724] border-t border-transparent dark:border-white/5 text-white pt-24 pb-8 transition-colors duration-300">
      <div className="w-full max-w-[1550px] mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 xl:gap-12 mb-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img
                src={adLogo}
                alt="AD Seguros"
                className="logo-ad-footer"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              {t('footer.shortDesc')}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/ad_seguros_?igsh=dmU3ODJpdHUwMzB5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-ad-cyan hover:text-ad-blue transition-all group"
              >
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/company/ad-seguros/about/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-ad-cyan hover:text-ad-blue transition-all group"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://wa.me/5491157811128" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-ad-cyan hover:text-ad-blue transition-all group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-ad-cyan uppercase tracking-[0.2em]">{t('footer.servicesHeader')}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.insuranceAuto')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.insuranceHome')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.insuranceAccidents')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.insuranceLabor')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-ad-cyan uppercase tracking-[0.2em]">{t('footer.institucional')}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#nosotros" className="hover:text-white transition-colors">{t('nav.nosotros')}</a></li>
              <li><a href="#productores" className="hover:text-white transition-colors">{t('nav.productores')}</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">{t('nav.faq')}</a></li>
              <li><a href="#ubicacion" className="hover:text-white transition-colors">{t('nav.ubicacion')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-ad-cyan uppercase tracking-[0.2em]">{t('footer.software')}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">PAS Alert Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.crmProducers')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.technicalSupport')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-ad-cyan uppercase tracking-[0.2em]">{t('footer.contactHeader')}</h4>
            <ul className="space-y-6 text-slate-400 text-sm">
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Monte+Grande%2C+Buenos+Aires%2C+Argentina" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 hover:text-ad-cyan transition-colors duration-300 group cursor-pointer"
                >
                  <MapPin className="text-ad-cyan mt-1 shrink-0 group-hover:scale-110 transition-transform duration-300" size={16} />
                  <span>Monte Grande, <br />Buenos Aires, Argentina.</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5491157811128" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 hover:text-ad-cyan transition-colors duration-300 group cursor-pointer"
                >
                  <Phone className="text-ad-cyan shrink-0 group-hover:scale-110 transition-transform duration-300" size={16} />
                  <span>+54 11 5781-1128</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:alejandrodiaz.seguros@gmail.com" 
                  className="flex items-center gap-3 hover:text-ad-cyan transition-colors duration-300 group cursor-pointer"
                >
                  <Mail className="text-ad-cyan shrink-0 group-hover:scale-110 transition-transform duration-300" size={16} />
                  <span className="break-all">alejandrodiaz.seguros@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 w-full">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest text-center md:text-left">{t('footer.rightsReserved')}</span>
            <span className="text-[10px] text-white/50 font-bold tracking-[0.2em] uppercase text-center md:text-right">{t('footer.valuesHeader')}</span>
          </div>
          <a
            href="https://zigodev.com.ar"
            target="_blank"
            rel="noopener"
            className="text-[10px] text-slate-500 hover:text-ad-cyan transition-colors duration-300 uppercase tracking-[0.2em] text-center"
          >
            {t('footer.credit')}
          </a>
        </div>
      </div>
    </footer>
  );
}

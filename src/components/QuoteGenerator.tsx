import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Bike, Home, Landmark, ShieldCheck, ChevronRight, Send } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function QuoteGenerator() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('auto');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    model: '',
    year: '',
    gnc: 'No',
    zipCode: '',
    locality: '',
    province: '',
    homeType: '',
    surface: '',
    birthDate: '',
    retirementAge: '',
    contribution: '',
    query: ''
  });

  const insuranceTypes = [
    { id: 'auto', label: t('quote.typeAuto'), icon: <Car size={20} /> },
    { id: 'moto', label: t('quote.typeMoto'), icon: <Bike size={20} /> },
    { id: 'hogar', label: t('quote.typeHome'), icon: <Home size={20} /> },
    { id: 'retiro', label: t('quote.typeRetirement'), icon: <Landmark size={20} /> },
    { id: 'otros', label: t('quote.typeOther'), icon: <ShieldCheck size={20} /> },
  ];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let message = `${t('quote.msgPrefix')}${selectedType.toUpperCase()}*:\n\n`;
    message += `*${t('quote.fullName')}:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;

    if (selectedType === 'auto' || selectedType === 'moto') {
      message += `*${t('quote.brand')}:* ${formData.brand}\n`;
      message += `*${t('quote.model')}:* ${formData.model}\n`;
      message += `*${t('quote.year')}:* ${formData.year}\n`;
      if (selectedType === 'auto') message += `*${t('quote.gnc')}:* ${formData.gnc}\n`;
      message += `*C.P. / Zip:* ${formData.zipCode}\n`;
      message += `*${t('quote.locality')}:* ${formData.locality}\n`;
      message += `*${t('quote.province')}:* ${formData.province}\n`;
    } else if (selectedType === 'hogar') {
      message += `*${t('quote.homeType')}:* ${formData.homeType}\n`;
      message += `*${t('quote.surface')}:* ${formData.surface} m2\n`;
      message += `*C.P. / Zip:* ${formData.zipCode}\n`;
      message += `*${t('quote.locality')}:* ${formData.locality}\n`;
      message += `*${t('quote.province')}:* ${formData.province}\n`;
    } else if (selectedType === 'retiro') {
      message += `*${t('quote.birthDate')}:* ${formData.birthDate}\n`;
      message += `*${t('quote.retirementAge')}:* ${formData.retirementAge}\n`;
      message += `*Price:* $${formData.contribution}\n`;
    } else {
      message += `*${t('quote.query')}:* ${formData.query}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5491157811128?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setStep(1);
  };

  const renderCurrentFields = () => {
    if (selectedType === 'auto' || selectedType === 'moto') {
      return (
        <>
          <div className="grid grid-cols-2 gap-3">
            <InputField 
              label={t('quote.brand')} 
              placeholder={selectedType === 'auto' ? t('quote.brandAutoPlaceholder') : t('quote.brandMotoPlaceholder')} 
              value={formData.brand} 
              onChange={(v : string) => setFormData({...formData, brand: v})} 
            />
            <InputField 
              label={t('quote.model')} 
              placeholder={selectedType === 'auto' ? t('quote.modelAutoPlaceholder') : t('quote.modelMotoPlaceholder')} 
              value={formData.model} 
              onChange={(v : string) => setFormData({...formData, model: v})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InputField label={t('quote.year')} placeholder="2023" value={formData.year} onChange={(v : string) => setFormData({...formData, year: v})} />
            {selectedType === 'auto' && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest mb-1 ml-1">{t('quote.gnc')}</label>
                <select 
                  className="w-full h-12 bg-slate-50 dark:bg-ad-dark/50 border border-slate-100 dark:border-white/10 text-slate-800 dark:text-white rounded-2xl px-4 text-sm font-medium appearance-none outline-none focus:ring-2 focus:ring-ad-cyan"
                  value={formData.gnc}
                  onChange={(e) => setFormData({...formData, gnc: e.target.value})}
                >
                  <option value="No" className="dark:bg-[#001f30]">No</option>
                  <option value="Si" className="dark:bg-[#001f30]">Si</option>
                </select>
              </div>
            )}
          </div>
        </>
      );
    }
    if (selectedType === 'hogar') {
      return (
        <div className="grid grid-cols-2 gap-3">
          <InputField label={t('quote.homeType')} placeholder={t('quote.homeTypePlaceholder')} value={formData.homeType} onChange={(v : string) => setFormData({...formData, homeType: v})} />
          <InputField label={t('quote.surface')} placeholder={t('quote.surfacePlaceholder')} value={formData.surface} onChange={(v : string) => setFormData({...formData, surface: v})} />
        </div>
      );
    }
    if (selectedType === 'retiro') {
      return (
        <>
          <div className="grid grid-cols-2 gap-3">
            <InputField label={t('quote.birthDate')} type="date" value={formData.birthDate} onChange={(v : string) => setFormData({...formData, birthDate: v})} />
            <InputField label={t('quote.retirementAge')} placeholder={t('quote.retirementAgePlaceholder')} value={formData.retirementAge} onChange={(v : string) => setFormData({...formData, retirementAge: v})} />
          </div>
          <InputField label={t('quote.contribution')} placeholder={t('quote.contributionPlaceholder')} value={formData.contribution} onChange={(v : string) => setFormData({...formData, contribution: v})} />
        </>
      );
    }
    return <TextareaField label={t('quote.query')} placeholder={t('quote.queryPlaceholder')} value={formData.query} onChange={(v : string) => setFormData({...formData, query: v})} />;
  };

  const renderLocationFields = () => {
    if (['auto', 'moto', 'hogar'].includes(selectedType)) {
      return (
        <>
          <div className="grid grid-cols-2 gap-3">
            <InputField label={t('quote.zipCode')} placeholder="7600" value={formData.zipCode} onChange={(v : string) => setFormData({...formData, zipCode: v})} />
            <InputField label={t('quote.locality')} placeholder="Mar del Plata" value={formData.locality} onChange={(v : string) => setFormData({...formData, locality: v})} />
          </div>
          <InputField label={t('quote.province')} placeholder="Buenos Aires" value={formData.province} onChange={(v : string) => setFormData({...formData, province: v})} />
        </>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#001f30] rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5 p-8 w-full max-w-md relative z-20 overflow-hidden transition-colors pb-[32px] xl:mr-[-100px]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-ad-blue dark:bg-ad-cyan rounded-xl flex items-center justify-center text-ad-cyan dark:text-ad-blue shadow-inner transition-colors">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-ad-blue dark:text-white uppercase tracking-tight">{t('quote.title')}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('quote.subtitle')}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {insuranceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setStep(1);
              }}
              className={`group flex flex-col items-center gap-2 transition-all ${
                selectedType === type.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                selectedType === type.id 
                  ? 'bg-ad-blue dark:bg-ad-cyan text-ad-cyan dark:text-ad-blue shadow-lg scale-110' 
                  : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-300 group-hover:bg-slate-100 dark:group-hover:bg-white/10'
              }`}>
                {type.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter ${
                selectedType === type.id ? 'text-ad-blue dark:text-ad-cyan' : 'text-slate-400 dark:text-slate-400'
              }`}>
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <InputField label={t('quote.fullName')} placeholder={t('quote.fullNamePlaceholder')} value={formData.name} onChange={(v : string) => setFormData({...formData, name: v})} required />
              <InputField label={t('quote.emailContact')} type="email" placeholder="ejemplo@email.com" value={formData.email} onChange={(v : string) => setFormData({...formData, email: v})} required />
              
              {renderCurrentFields()}

              <button
                type="button"
                onClick={handleNext}
                className="w-full h-12 brand-gradient text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-ad-blue/10 uppercase tracking-widest text-xs transition-all hover:gap-3 cursor-pointer"
              >
                {t('quote.nextBtn')} <ChevronRight size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {renderLocationFields()}
              
              <div className="p-4 bg-slate-50 dark:bg-[#00273d] rounded-2xl border border-slate-100 dark:border-white/5">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest mb-2">{t('quote.finalStep')}</p>
                <p className="text-xs text-ad-blue dark:text-slate-250 font-bold">{t('quote.finalInfo')}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 border border-slate-100 dark:border-white/10 text-slate-400 dark:text-slate-200 font-black rounded-2xl uppercase tracking-widest text-xs transition-all hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                >
                  {t('quote.backBtn')}
                </button>
                <button
                  type="submit"
                  className="flex-[2] h-12 bg-[#25D366] text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 uppercase tracking-widest text-xs transition-all hover:gap-3 cursor-pointer"
                >
                  {t('quote.submitBtn')} <Send size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-ad-blue bg-slate-200 dark:bg-white/10 shimmer" />
          ))}
        </div>
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{t('quote.onlineSupport')}</span>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", required = false }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, type?: string, required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest mb-1 ml-1">{label}</label>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full h-12 bg-slate-50 dark:bg-ad-dark/50 border border-slate-100 dark:border-white/10 text-slate-800 dark:text-white rounded-2xl px-4 text-sm font-medium focus:ring-2 focus:ring-ad-cyan outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
  return (
    <div>
      <label className="block text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-widest mb-1 ml-1">{label}</label>
      <textarea
        placeholder={placeholder}
        className="w-full h-24 bg-slate-50 dark:bg-ad-dark/50 border border-slate-100 dark:border-white/10 text-slate-800 dark:text-white rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-ad-cyan outline-none transition-all resize-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

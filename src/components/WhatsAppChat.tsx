import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, ChevronRight, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export default function WhatsAppChat() {
  const { language, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Select insurance, 1: Enter name, 2: Final Redirect
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [clientName, setClientName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Translate string definitions based on current language state
  const isEn = language === 'en';
  
  const options = isEn ? [
    { id: 'auto', label: '🏎️ Auto Insurance', value: 'Auto Insurance' },
    { id: 'home', label: '🏠 Home Insurance', value: 'Home Insurance' },
    { id: 'life', label: '🏥 Life & Accident Insurance', value: 'Life & Accident Insurance' },
    { id: 'business', label: '💼 Business & Workers Risk', value: 'Business & Workers Risk' },
    { id: 'other', label: '✨ Other Coverages', value: 'Other Coverages' }
  ] : [
    { id: 'auto', label: '🏎️ Seguro de Auto', value: 'Seguro de Auto' },
    { id: 'hogar', label: '🏠 Seguro de Hogar', value: 'Seguro de Hogar' },
    { id: 'vida', label: '🏥 Vida y Accidentes', value: 'Seguro de Vida y Accidentes' },
    { id: 'comercio', label: '💼 Comercio y ART', value: 'Seguro Comercial e Integrales/ART' },
    { id: 'otro', label: '✨ Otros Seguros', value: 'Otras Coberturas Personalizadas' }
  ];

  const texts = {
    headerTitle: isEn ? 'ADA AI Advisor' : 'ADA Asesora Virtual',
    headerSub: isEn ? 'Active Agent' : 'IA de Guardia Online',
    welcome: isEn 
      ? 'Hello! 🤖 I am ADA, your intelligent virtual assistant from AD Seguros. What type of insurance are you interested in today?'
      : '¡Hola! 🤖 Soy ADA, tu asistente inteligente con IA de AD Seguros. Para ayudarte mejor, ¿qué tipo de seguro te interesa hoy?',
    askName: isEn
      ? 'Perfect choice! 🚀 To customize your digital offer and transfer you to a specialist, what is your name?'
      : '¡Excelente elección! 🚀 Para darte una propuesta a tu medida y transferirte con un asesor especializado, ¿cómo te llamás?',
    placeholderName: isEn ? 'Write your name...' : 'Escribí tu nombre...',
    submitName: isEn ? 'Continue' : 'Continuar',
    finalGreeting: (name: string, insValue: string) => isEn
      ? `Great to meet you, ${name}! 🎉 I have customized your request. A senior broker specializing in ${insValue} is waiting. Click below to start the WhatsApp chat.`
      : `¡Gracias, ${name}! 🎉 Ya preparé tu consulta para derivarle las opciones a nuestro asesor especialista en ${insValue}. Hacé clic abajo para abrir WhatsApp y recibir tus cotizaciones.`,
    btnOpenWhatsapp: isEn ? 'Start WhatsApp Chat' : 'Iniciar Chat en WhatsApp',
    badgeHelp: isEn ? 'Speak with ADA AI' : 'Consultá con ADA Inteligencia Artificial'
  };

  // Initialize conversation
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          { sender: 'bot', text: texts.welcome }
        ]);
        setIsTyping(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keep chat scrolled down
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectInsurance = (optValue: string) => {
    setSelectedInsurance(optValue);
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: optValue }]);
    setStep(1);
    
    // Simulate bot reply
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: texts.askName }]);
      setIsTyping(false);
    }, 850);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: clientName.trim() }]);
    setStep(2);

    // Simulate bot final reply
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'bot', text: texts.finalGreeting(clientName.trim(), selectedInsurance) }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const resetChat = () => {
    setStep(0);
    setSelectedInsurance('');
    setClientName('');
    setMessages([]);
  };

  // Generate WhatsApp link dynamically with pre-filled, polished message
  const getWhatsAppLink = () => {
    const phone = '5491157811128';
    const message = isEn 
      ? `Hello AD Seguros! My name is ${clientName} and I would like to get a quote/advice regarding *${selectedInsurance}*. Looking forward to hearing from you soon!`
      : `¡Hola AD Seguros! Mi nombre es ${clientName} y me interesa recibir asesoramiento y cotización para mi *${selectedInsurance}*. ¡Muchas gracias!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed bottom-28 right-8 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 70 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 70 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[90vw] md:w-[380px] h-[500px] mb-4 bg-[#001f30] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#001420] px-6 py-5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-ad-cyan shadow-inner bg-slate-900 flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=150"
                      alt="ADA AI Assistant Avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#001420]" style={{ width: '12px', height: '12px' }} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-black tracking-tight">{texts.headerTitle}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-ad-cyan text-xs font-semibold">{texts.headerSub}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#001825]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-ad-cyan to-[#00f2fe] text-ad-blue font-bold rounded-tr-none' 
                      : 'bg-[#00283e] text-slate-100 border border-white/10 rounded-tl-none font-medium'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#00283e] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Interactive Choices / Inputs */}
            <div className="p-5 border-t border-white/10 bg-[#001a28]">
              {step === 0 && !isTyping && (
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectInsurance(opt.value)}
                      className="w-full text-left px-4 py-2.5 bg-[#002a3d] border border-white/5 hover:border-ad-cyan rounded-2xl text-xs md:text-sm font-semibold text-slate-200 hover:bg-[#003852] transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ChevronRight size={14} className="text-slate-400 group-hover:text-ad-cyan transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && !isTyping && (
                <form onSubmit={handleNameSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={texts.placeholderName}
                      className="w-full pl-10 pr-4 py-3 bg-[#002233] border border-white/10 focus:border-ad-cyan focus:outline-none rounded-2xl text-sm font-semibold text-white"
                      autoFocus
                    />
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={!clientName.trim()}
                    className="p-3.5 bg-ad-cyan text-ad-blue hover:bg-[#00e2fc] disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Send size={16} strokeWidth={2.5} />
                  </button>
                </form>
              )}

              {step === 2 && !isTyping && (
                <div className="space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer"
                  >
                    <MessageCircle size={18} fill="currentColor" />
                    <span>{texts.btnOpenWhatsapp}</span>
                  </a>
                  <button
                    onClick={resetChat}
                    className="w-full py-1 text-center text-xs font-bold text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {isEn ? 'Start over' : 'Volver a empezar'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger Button with pulsating effects */}
      <div className="relative group/trigger flex items-center gap-3">
        {/* Subtle tooltip help widget */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="hidden lg:flex px-4 py-2 bg-[#001f30] text-slate-200 border border-white/10 text-xs font-black uppercase tracking-wider rounded-xl shadow-lg whitespace-nowrap"
            >
              <span className="text-ad-cyan mr-1.5">•</span> {texts.badgeHelp}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="btn-whatsapp-chat-lead"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) resetChat();
          }}
          whileHover={{ scale: 1.1, translateY: -4 }}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer relative z-40 ${
            isOpen 
              ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-white rotate-90' 
              : 'bg-emerald-500 text-white hover:bg-emerald-600'
          }`}
          aria-label="Abrir asistente de whatsapp"
        >
          {isOpen ? (
            <X size={24} strokeWidth={2.5} />
          ) : (
            <>
              {/* Outer pulsate waves */}
              <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping" />
              <MessageCircle size={26} fill="currentColor" className="relative z-10" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

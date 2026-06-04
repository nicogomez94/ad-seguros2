import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navbar
    'nav.inicio': 'Inicio',
    'nav.servicios': 'Servicios',
    'nav.pasAlert': 'PAS Alert',
    'nav.productores': 'Productores',
    'nav.faq': 'FAQ',
    'nav.nosotros': 'Nosotros',
    'nav.ubicacion': 'Ubicación',
    'nav.cotizar': 'Cotizar',
    'nav.cotizarAhora': 'Cotizar Ahora',
    'nav.toggleThemeLight': 'Cambiar a Modo Claro',
    'nav.toggleThemeDark': 'Cambiar a Modo Oscuro',
    'nav.toggleLang': 'Change to English',
    'nav.volverInicio': 'Volver al inicio',

    // Hero
    'hero.matricula': 'TÉCNICO SUPERIOR EN SEGUROS - MATRÍCULA SSN 107.126',
    'hero.title1': 'Protección ',
    'hero.titleItalic': 'Eficiente,',
    'hero.title2': 'Tranquilidad Real.',
    'hero.subtitle': 'Respaldo total para tu patrimonio con la gestión más ágil del mercado. Cotizá y asegurá tus bienes en minutos con tecnología de vanguardia.',
    'hero.feature1': 'Cotizaciones, Emisión y Endosos Online',
    'hero.feature2': 'Asesoramiento Legal',
    'hero.feature3': 'Seguros Patrimoniales y de Vida',
    'hero.stat1Val': '100%',
    'hero.stat1Label': 'Soporte de Gestión',
    'hero.stat2Val': '24/7',
    'hero.stat2Label': 'Respuesta Profesional',

    // Brands
    'brands.title': 'COMPAÑÍAS QUE NOS ACOMPAÑAN',

    // Services
    'services.title': 'Nuestros ',
    'services.titleColor': 'Servicios',
    'services.subtitle': 'Soluciones integrales diseñadas para la tranquilidad absoluta de nuestros clientes y productores asociados.',
    'services.item1Title': 'Asesoramiento Integral',
    'services.item1Desc': 'Protección total personalizada para individuos y empresas, adaptada a tus necesidades y presupuesto real.',
    'services.item2Title': 'Gestión de Siniestros',
    'services.item2Desc': 'Defensa técnica activa y acompañamiento continuo en momentos críticos. Facilitamos soluciones rápidas cuando más lo necesitás.',
    'services.item3Title': 'Alianzas Estratégicas',
    'services.item3Desc': 'Trabajamos con las aseguradoras líderes del mercado para garantizarte las mejores coberturas y costos eficientes.',
    'services.checkAvailability': 'Consultar Disponibilidad',

    // PAS Alert
    'pas.badge': 'PAS ALERT',
    'pas.exclusivo': 'Software Exclusivo',
    'pas.title': '¿Sos Productor de Seguros?',
    'pas.subtitle': 'Llegó el sistema inteligente que estabas esperando para potenciar tu cartera.',
    'pas.toolDescription': 'La herramienta definitiva para el Productor de Seguros moderno. Recuperá el control total de tu cartera y optimizá cada segundo de tu gestión.',
    'pas.fe_due': 'Alertas de vencimientos en tiempo real.',
    'pas.fe_crm': 'CRM especializado para clientes B2B/B2C.',
    'pas.fe_comm': 'Automatización de comunicación inteligente.',
    'pas.quote': '"Diseñé PAS Alert basándome en los desafíos reales que enfrentamos día a día. Es tecnología pensada por un productor para productores."',
    'pas.creatorRole': 'Fundador y Director General',
    'pas.desc1': 'PAS Alert es la innovadora plataforma inteligente que optimiza la relación con tus clientes, previniendo cancelaciones de pólizas por mora de forma automática.',
    'pas.desc2': 'Administrá tus alertas de cobranza y mantené tu cartera sana con nuestro motor de notificaciones en tiempo real, diseñado por y para productores.',
    'pas.fiatCronos': 'Seguro Automotor - Fiat Cronos',
    'pas.imminentDue': 'Vencimiento Próximo',
    'pas.in48h': 'En 48 horas',
    'pas.reportedClaim': 'Siniestro Reportado',
    'pas.allianz': 'Reclamo Global - Allianz',
    'pas.technicalReview': 'En revisión técnica',
    'pas.activeAlerts': 'Alertas Activas',
    'pas.interactiveDemo': 'Demo Interactiva',
    'pas.requestAccess': 'Solicitar Información',
    'pas.formNameLabel': 'Nombre y Apellido',
    'pas.formNamePlaceholder': 'Ej: Juan Pérez',
    'pas.formMatriculaLabel': 'Número de Matrícula',
    'pas.formMatriculaPlaceholder': 'Ej: 107126',
    'pas.onlineSupport': 'Atención inmediata en línea',

    'faq.title': 'Preguntas ',
    'faq.titleColor': 'Frecuentes',
    'faq.subtitle': 'Todo lo que necesitás saber sobre nuestros procesos y cómo podemos ayudarte a proteger lo que más importa.',
    'faq.noFind': '¿No encontrás tu duda?',
    'faq.personalHelp': 'Estamos para ayudarte de forma personalizada.',
    'faq.contactSupport': 'Contactar Soporte',

    'faq.item1Q': '¿Qué documentación necesito para una transferencia automotor?',
    'faq.item1A': 'Generalmente requerimos el Título del Vehículo, Cédula Verde, verificación policial (Formulario 12) y el DNI de ambas partes. Nosotros nos encargamos de verificar que no existan deudas de patentes o multas pendientes.',
    'faq.item2Q': '¿Qué debo hacer en caso de un siniestro?',
    'faq.item2A': 'Lo más importante es mantener la calma y recolectar los datos del tercero (nombre, DNI, seguros y patente). Luego, comunicate con nosotros de inmediato para que nuestro equipo legal inicie el reclamo correspondiente ante la compañía aseguradora.',
    'faq.item3Q': '¿Los seguros tienen cobertura inmediata?',
    'faq.item3A': 'Sí, una vez emitida la póliza y verificado el estado del bien (si corresponde inspección), la cobertura comienza a regir según lo pactado. Trabajamos con compañías líderes que garantizan rapidez en la emisión.',
    'faq.item4Q': '¿Brindan asesoría para reclamos de ART?',
    'faq.item4A': 'Efectivamente. Contamos con abogados especialistas en accidentes de trabajo y enfermedades profesionales. Te asesoramos desde la denuncia inicial hasta la determinación de la incapacidad y la indemnización final.',
    'faq.item5Q': '¿Cuáles son los beneficios para Productores Asociados?',
    'faq.item5A': 'Ofrecemos una plataforma integral que incluye CRM de gestión, alertas automatizadas de vencimientos y el respaldo de un departamento legal y gestoría propio, permitiéndote escalar tu cartera sin carga administrativa.',
    
    'faq.q1': '¿Cómo realizo una cotización?',
    'faq.a1': 'Podés usar nuestro cotizador rápido en esta misma pantalla. Seleccioná el tipo de bien, completá los datos y te redirigirá a WhatsApp donde un asesor te enviará las propuestas de inmediato.',
    'faq.q2': '¿Qué documentación necesito para contratar?',
    'faq.a2': 'Para vehículos: cédula verde/título, fotos del estado general y tu DNI. Para hogar o comercio: dirección completa y detalle de coberturas especiales que solicites.',
    'faq.q3': '¿Qué es PAS Alert?',
    'faq.a3': 'Es nuestra suite exclusiva para productores asociados. Te advierte de forma preventiva sobre cuotas con mora impaga de tus clientes para que puedas gestionar y salvar la póliza a tiempo.',
    'faq.q4': '¿Cómo se gestiona un siniestro?',
    'faq.a4': 'Ponete en contacto directo con nosotros vía WhatsApp o mail con la patente o número de póliza. Nuestro equipo legal estructurará la denuncia y defensa en menos de 24 horas.',

    // ProducerJoin
    'producer.badge': 'SUMATE A NUESTRA RED',
    'producer.title': 'Impulsá tu carrera como ',
    'producer.titleColor': 'Productor de Seguros',
    'producer.subtitle': 'Sumate a una organización que entiende el futuro del mercado. Combinamos experiencia tradicional con herramientas digitales de vanguardia.',
    'producer.benefit1Title': 'Crecimiento Exponencial',
    'producer.benefit1Desc': 'Acceso a las mejores comisiones del mercado y planes de incentivos exclusivos.',
    'producer.benefit2Title': 'Multi-Compañía',
    'producer.benefit2Desc': 'Trabajamos con las aseguradoras líderes, brindándote un abanico completo de soluciones.',
    'producer.benefit3Title': 'PAS Alert Ready',
    'producer.benefit3Desc': 'Gestión digital avanzada a través de nuestra plataforma propia para simplificar tu día a día.',
    'producer.benefit4Title': 'Soporte Personalizado',
    'producer.benefit4Desc': 'Un equipo de expertos técnicos y comerciales a tu disposición para cerrar negocios complejos.',
    'producer.incorporation': 'Incorporación Inmediata',
    'producer.nextStepTitle': '¿Listo para dar el siguiente paso?',
    'producer.nextStepQuote': '"En AD Seguros no sos un código más, sos un socio estratégico. Te brindamos las herramientas para que tu cartera crezca sin límites."',
    'producer.joinNow': 'Sumarme Ahora',
    'producer.whatsappText': 'Hola AD Seguros, soy Productor y me gustaría recibir información para sumarme a la organización.',

    // Nosotros Section in App.tsx
    'about.title': 'Más que un seguro,',
    'about.titleColor': 'un socio estratégico',
    'about.text1': 'En AD Seguros entendemos que la confianza es la base de cada póliza. Somos profesionales dedicados que respondemos a todas las consultas brindando un soporte de gestión integral y personalizado para cada uno de nuestros clientes.',
    'about.text2': 'Nuestra misión es simple: simplificar la complejidad del mundo de los seguros para que vos puedas enfocarte en lo que realmente importa. Nos destacamos por nuestra agilidad y la capacidad de brindar soluciones donde la tecnología y el asesoramiento humano convergen.',
    'about.stat1Val': '100%',
    'about.stat1Label': 'Enfoque Digital',
    'about.stat2Val': '+50',
    'about.stat2Label': 'PAS Asociados',
    'about.imgAlt': 'Trabajo en equipo AD Seguros',

    // Contact CTA
    'contact.title': '¿Listo para asegurar ',
    'contact.titleColor': 'tu tranquilidad?',
    'contact.subtitle': 'Obtené una cotización personalizada en menos de 5 minutos. Sin compromisos, solo la mejor cobertura.',
    'contact.whatsappBtn': 'Hablar por WhatsApp',
    'contact.emailBtn': 'Enviar un Correo',

    // Footer
    'footer.description': 'Asesoramiento premium y tecnología aplicada para proteger lo que más valorás.',
    'footer.navHeader': 'Navegación',
    'footer.contactHeader': 'Contacto',
    'footer.hoursHeader': 'Horarios',
    'footer.hoursWeek': 'Lunes a Viernes: 9:00 a 18:00',
    'footer.hoursSaturday': 'Sábados: Guardia Pasiva',
    'footer.copy': '© 2026 AD Seguros. Todos los derechos reservados.',
    'footer.developer': 'Desarrollado con precisión digital.',
    'footer.servicesHeader': 'Servicios',
    'footer.institucional': 'Institucional',
    'footer.software': 'Software',
    'footer.insuranceAuto': 'Seguros de Auto',
    'footer.insuranceHome': 'Seguros de Hogar',
    'footer.insuranceAccidents': 'Accidentes Personales',
    'footer.insuranceLabor': 'ART & Riesgo Laboral',
    'footer.crmProducers': 'CRM Productores',
    'footer.technicalSupport': 'Soporte Técnico',
    'footer.rightsReserved': 'AD SEGUROS © 2026 - Todos los derechos reservados',
    'footer.valuesHeader': 'Seguridad • Transparencia • Innovación',
    'footer.shortDesc': 'Protección profesional y gestión inteligente para asegurar lo que más valorás. Respaldo total bajo Matrícula SSN 107.126.',

    // Quote Generator
    'quote.title': 'Cotizador Rápido',
    'quote.subtitle': 'Obtené tu presupuesto hoy',
    'quote.typeAuto': 'Autos',
    'quote.typeMoto': 'Motos',
    'quote.typeHome': 'Hogar',
    'quote.typeRetirement': 'Retiro',
    'quote.typeOther': 'Otros',
    
    'quote.fullName': 'Nombre Completo',
    'quote.fullNamePlaceholder': 'Tu nombre',
    'quote.emailContact': 'Email de Contacto',
    
    'quote.brand': 'Marca',
    'quote.brandAutoPlaceholder': 'Ej: VW',
    'quote.brandMotoPlaceholder': 'Ej: Yamaha',
    'quote.model': 'Modelo',
    'quote.modelAutoPlaceholder': 'Ej: Gol',
    'quote.modelMotoPlaceholder': 'Ej: 250',
    'quote.year': 'Año',
    'quote.gnc': 'GNC',
    'quote.homeType': 'Tipo de Vivienda',
    'quote.homeTypePlaceholder': 'Casa/Apto',
    'quote.surface': 'Superficie m2',
    'quote.surfacePlaceholder': 'Ej: 120',
    'quote.birthDate': 'Fecha de Nacimiento',
    'quote.retirementAge': 'Edad de Retiro',
    'quote.retirementAgePlaceholder': 'Ej: 65',
    'quote.contribution': 'Aporte Mensual ($)',
    'quote.contributionPlaceholder': 'Ej: 50000',
    'quote.query': 'Consulta Específica',
    'quote.queryPlaceholder': 'Contanos qué necesitás asegurar...',
    
    'quote.zipCode': 'Código Postal',
    'quote.locality': 'Localidad',
    'quote.province': 'Provincia',
    
    'quote.nextBtn': 'Siguiente Paso',
    'quote.finalStep': 'Paso Final',
    'quote.finalInfo': 'Serás redirigido a WhatsApp para finalizar la cotización con uno de nuestros asesores.',
    'quote.backBtn': 'Volver',
    'quote.submitBtn': 'Enviar WhatsApp',
    'quote.onlineSupport': 'Atención inmediata en línea',
    'quote.msgPrefix': 'Hola AD Seguros, me gustaría solicitar una cotización para *',

    // Map section
    'map.badge': 'NUESTRAS OFICINAS',
    'map.title': 'VISÍTANOS EN ',
    'map.titleColor': 'MONTE GRANDE',
    'map.subtitle': 'Próximamente estaremos con oficina propia. Mientras tanto podrás conversar con nuestro equipo para conseguir un plan de protección diseñado a tu medida.',
    'map.cardTitle': 'CASA CENTRAL',
    'map.addressLabel': 'Dirección',
    'map.hoursLabel': 'Horarios de Atención',
    'map.hoursWeek': 'Lunes a Viernes: 9:00 a 18:00 hs',
    'map.hoursWeekend': 'Sábados: 9:00 a 13:00 hs',
    'map.hoursClosed': 'Domingos y feriados: Cerrado',
    'map.phoneLabel': 'Teléfono / WhatsApp',
    'map.emailLabel': 'Correo Electrónico',
    'map.howToGet': 'CÓMO LLEGAR',
  },
  en: {
    // Navbar
    'nav.inicio': 'Home',
    'nav.servicios': 'Services',
    'nav.pasAlert': 'PAS Alert',
    'nav.productores': 'Producers',
    'nav.faq': 'FAQ',
    'nav.nosotros': 'About Us',
    'nav.ubicacion': 'Location',
    'nav.cotizar': 'Quote',
    'nav.cotizarAhora': 'Quote Now',
    'nav.toggleThemeLight': 'Switch to Light Mode',
    'nav.toggleThemeDark': 'Switch to Dark Mode',
    'nav.toggleLang': 'Cambiar a Español',
    'nav.volverInicio': 'Back to top',

    // Hero
    'hero.matricula': 'License SSN 107.126',
    'hero.title1': 'Efficient ',
    'hero.titleItalic': 'Protection,',
    'hero.title2': 'Real Peace of Mind.',
    'hero.subtitle': 'Full backing for your assets with the most agile management in the market. Get a quote and secure your belongings in minutes with state-of-the-art technology.',
    'hero.feature1': 'Instant Issuance',
    'hero.feature2': 'Legal Advising',
    'hero.feature3': '24/7 Claims Resolution',
    'hero.stat1Val': '100%',
    'hero.stat1Label': 'Management Support',
    'hero.stat2Val': '24/7',
    'hero.stat2Label': 'Professional Support',

    // Brands
    'brands.title': 'COMPANIES THAT SUPPORT US',

    // Services
    'services.title': 'Our ',
    'services.titleColor': 'Services',
    'services.subtitle': 'Comprehensive solutions designed for the absolute peace of mind of our clients and associated agents.',
    'services.item1Title': 'Comprehensive Advice',
    'services.item1Desc': 'Total personalized protection for individuals and businesses, tailored to your budget and actual requirements.',
    'services.item2Title': 'Claims Settlement',
    'services.item2Desc': 'Active technical advocacy and continuous guidance during critical events. We resolve claims efficiently when it matters.',
    'services.item3Title': 'Strategic Alliances',
    'services.item3Desc': 'We operate with tier-one insurance groups to guarantee robust coverage and premium cost efficiency.',
    'services.checkAvailability': 'Check Availability',

    // PAS Alert
    'pas.badge': 'PAS ALERT',
    'pas.exclusivo': 'Exclusive Software',
    'pas.title': 'Are you an Insurance Agent?',
    'pas.subtitle': 'The smart, long-awaited platform designed specifically to scale your portfolio.',
    'pas.toolDescription': 'The ultimate tool for the modern Insurance Agent. Reclaim total control of your portfolio and optimize every second of your management.',
    'pas.fe_due': 'Real-time expiration alerts.',
    'pas.fe_crm': 'Specialized CRM for B2B/B2C clients.',
    'pas.fe_comm': 'Intelligent communication automation.',
    'pas.quote': '"I designed PAS Alert based on the real challenges we face day-to-day. It is technology designed by an agent, for agents."',
    'pas.creatorRole': 'Founder & General Director',
    'pas.desc1': 'PAS Alert is our digital innovation that helps you stay ahead of client issues, automatically tracking delays to prevent policy lapses.',
    'pas.desc2': 'Manage alerts effortlessly and maintain clean accounts with a high-fidelity real-time notification engine built for professional agents.',
    'pas.fiatCronos': 'Auto Policy - Fiat Cronos',
    'pas.imminentDue': 'Impending Due Date',
    'pas.in48h': 'In 48 hours',
    'pas.reportedClaim': 'Reported Claim',
    'pas.allianz': 'Global Claim - Allianz',
    'pas.technicalReview': 'Under technical review',
    'pas.activeAlerts': 'Active Alerts',
    'pas.interactiveDemo': 'Interactive Demo',
    'pas.requestAccess': 'Request Information',
    'pas.formNameLabel': 'Full Name',
    'pas.formNamePlaceholder': 'e.g., John Doe',
    'pas.formMatriculaLabel': 'License Number',
    'pas.formMatriculaPlaceholder': 'e.g., 107126',
    'pas.onlineSupport': 'Live digital desk response',

    // FAQ
    'faq.title': 'Frequently Asked ',
    'faq.titleColor': 'Questions',
    'faq.subtitle': 'Everything you need to know about our services and how we help protect your lifestyle and assets.',
    'faq.noFind': 'Have a different question?',
    'faq.personalHelp': 'Our expert advisors are ready to help you individually.',
    'faq.contactSupport': 'Contact Support',

    'faq.item1Q': 'What documentation do I need for an automotive transfer?',
    'faq.item1A': 'Generally, we require the Vehicle Title, Green Card (Registration), police verification (Form 12) and DNI of both parties. We take care of verifying patent debts or pending fines.',
    'faq.item2Q': 'What should I do in the event of an accident/claim?',
    'faq.item2A': 'The most important thing is to stay calm and collect the details of the third party (name, ID, insurance group, and license plate). Then, contact us immediately so our legal team can initiate the claims process.',
    'faq.item3Q': 'Is coverage immediate when buying insurance?',
    'faq.item3A': 'Yes, once the policy is issued and the condition of the asset is verified (if inspection is required), coverage begins. We work with leading groups that guarantee fast policy issuance.',
    'faq.item4Q': 'Do you provide legal support for occupational risk (ART) claims?',
    'faq.item4A': 'Absolutely. We have specialist lawyers in workplace accidents and occupational diseases. We guide you from the initial claim report through disability assessment and final settlement.',
    'faq.item5Q': 'What are the benefits for Associated Agents?',
    'faq.item5A': 'We offer a comprehensive platform including CRM tools, automated expiration alerts, and backing of our own legal and agency departments, allowing you to scale your business workload-free.',
    
    'faq.q1': 'How do I request a quote?',
    'faq.a1': 'Simply fill in our quick quote generator right here. Choose the asset type, enter the model details, and it will route you to WhatsApp to receive immediate competitive options.',
    'faq.q2': 'What records do I need to enroll?',
    'faq.a2': 'For auto coverage: registration deeds, vehicle inspection photos, and your national ID. For property or business: complete location address and list of specialized hazards to cover.',
    'faq.q3': 'What is PAS Alert?',
    'faq.a3': 'PAS Alert is our custom dashboard built for registered insurance partners. It alerts you pre-emptively on outstanding balances and policy billing errors to help secure client relationships.',
    'faq.q4': 'How do I handle or file an active claim?',
    'faq.a4': 'Reach out immediately via our WhatsApp channel or email with your registration plate or policy ID. Our legal team will handle file setup and liability analysis within 24 hours.',

    // ProducerJoin
    'producer.badge': 'JOIN OUR AGENT NETWORK',
    'producer.title': 'Boost your career as an ',
    'producer.titleColor': 'Insurance Agent',
    'producer.subtitle': 'Join an organization that understands the future of the market. We combine traditional experience with cutting-edge digital tools.',
    'producer.benefit1Title': 'Exponential Growth',
    'producer.benefit1Desc': 'Access to the best market commission structures and exclusive agent incentive programs.',
    'producer.benefit2Title': 'Multi-Company',
    'producer.benefit2Desc': 'We operate with tier-one insurance brands, providing a complete range of competitive products.',
    'producer.benefit3Title': 'PAS Alert Ready',
    'producer.benefit3Desc': 'State-of-the-art digital support through our own automation products to simplify your routine.',
    'producer.benefit4Title': 'Personalized Backing',
    'producer.benefit4Desc': 'Our technical and commercial underwriters are at your disposal to bind complex operations.',
    'producer.incorporation': 'Immediate Onboarding',
    'producer.nextStepTitle': 'Ready to take the next step?',
    'producer.nextStepQuote': '"At AD Seguros you are more than a code number, you are a critical strategic partner. We give you full wings to fly higher."',
    'producer.joinNow': 'Join Network Now',
    'producer.whatsappText': 'Hello AD Seguros, I am an Agent and I would like to receive information to join the organization.',

    // Nosotros Section in App.tsx
    'about.title': 'More than insurance,',
    'about.titleColor': ' a strategic partner',
    'about.text1': 'At AD Seguros we realize that trust is the fundamental base of any contract. We are dedicated professionals who stand by your questions, providing full management support for each individual or corporate client.',
    'about.text2': 'Our mission is straightforward: to demystify complex insurance policies so you can focus entirely on what matters. We deliver speed, agility, and a unique point where digital support meets expert advisors.',
    'about.stat1Val': '100%',
    'about.stat1Label': 'Digital First',
    'about.stat2Val': '+50',
    'about.stat2Label': 'Active Agents',
    'about.imgAlt': 'Teamwork at AD Seguros',

    // Contact CTA
    'contact.title': 'Ready to Secure ',
    'contact.titleColor': 'Your Peace of Mind?',
    'contact.subtitle': 'Get a tailored insurance report and quotes in under 5 minutes. Clear options, zero pressure.',
    'contact.whatsappBtn': 'Fulfill on WhatsApp',
    'contact.emailBtn': 'Send an Email',

    // Footer
    'footer.description': 'Premium consulting and applied technology to shield what you value most.',
    'footer.navHeader': 'Navigation',
    'footer.contactHeader': 'Contact Details',
    'footer.hoursHeader': 'Working Hours',
    'footer.hoursWeek': 'Monday to Friday: 9:00 AM - 6:00 PM',
    'footer.hoursSaturday': 'Saturdays: Stand-by Support',
    'footer.copy': '© 2026 AD Seguros. All rights reserved.',
    'footer.developer': 'Engineered to perfection.',
    'footer.servicesHeader': 'Services',
    'footer.institucional': 'Corporate',
    'footer.software': 'Technology',
    'footer.insuranceAuto': 'Car Insurance',
    'footer.insuranceHome': 'Home Insurance',
    'footer.insuranceAccidents': 'Personal Accident',
    'footer.insuranceLabor': 'ART & Labor Risk',
    'footer.crmProducers': 'CRM Agents',
    'footer.technicalSupport': 'Tech Support',
    'footer.rightsReserved': 'AD SEGUROS © 2026 - All rights reserved',
    'footer.valuesHeader': 'Security • Transparency • Innovation',
    'footer.shortDesc': 'Professional protection and smart management to secure what you value most. Fully backed under SSN License 107.126.',

    // Quote Generator
    'quote.title': 'Quick Calculator',
    'quote.subtitle': 'Get your estimates instantly',
    'quote.typeAuto': 'Cars',
    'quote.typeMoto': 'Bikes',
    'quote.typeHome': 'Home',
    'quote.typeRetirement': 'Retirement',
    'quote.typeOther': 'Other',
    
    'quote.fullName': 'Full Name',
    'quote.fullNamePlaceholder': 'Your name',
    'quote.emailContact': 'Contact Email',
    
    'quote.brand': 'Brand',
    'quote.brandAutoPlaceholder': 'e.g., VW',
    'quote.brandMotoPlaceholder': 'e.g., Yamaha',
    'quote.model': 'Model',
    'quote.modelAutoPlaceholder': 'e.g., Golf',
    'quote.modelMotoPlaceholder': 'e.g., 250',
    'quote.year': 'Year',
    'quote.gnc': 'CNG (Gas)',
    'quote.homeType': 'Property Type',
    'quote.homeTypePlaceholder': 'House/Apt',
    'quote.surface': 'Surface area (sqm)',
    'quote.surfacePlaceholder': 'e.g., 120',
    'quote.birthDate': 'Date of Birth',
    'quote.retirementAge': 'Retirement Age',
    'quote.retirementAgePlaceholder': 'e.g., 65',
    'quote.contribution': 'Monthly Contribution ($)',
    'quote.contributionPlaceholder': 'e.g., 50000',
    'quote.query': 'Specific Enquiry',
    'quote.queryPlaceholder': 'Let us know what you want to insure...',
    
    'quote.zipCode': 'Zip Code',
    'quote.locality': 'Locality / City',
    'quote.province': 'Province / State',
    
    'quote.nextBtn': 'Next Step',
    'quote.finalStep': 'Final Step',
    'quote.finalInfo': 'You will be redirected straight to WhatsApp to finish your quote with one of our advisors.',
    'quote.backBtn': 'Back',
    'quote.submitBtn': 'Submit on WhatsApp',
    'quote.onlineSupport': 'Online agent standby',
    'quote.msgPrefix': 'Hello AD Seguros, I would like to request a quote for *',

    // Map section
    'map.badge': 'OUR OFFICES',
    'map.title': 'VISIT US IN ',
    'map.titleColor': 'MONTE GRANDE',
    'map.subtitle': 'We will soon be launching our own physical office! Stop by to talk with our specialists to get a protection plan custom-tailored to your style.',
    'map.cardTitle': 'HEADQUARTERS',
    'map.addressLabel': 'Address',
    'map.hoursLabel': 'Business Hours',
    'map.hoursWeek': 'Monday to Friday: 9:00 AM to 6:00 PM',
    'map.hoursWeekend': 'Saturdays: 9:00 AM to 1:00 PM',
    'map.hoursClosed': 'Sundays and Holidays: Closed',
    'map.phoneLabel': 'Telephone / WhatsApp',
    'map.emailLabel': 'Email Address',
    'map.howToGet': 'GET DIRECTIONS',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'es' || saved === 'en') {
      return saved;
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    const translationSet = translations[language];
    if (translationSet && translationSet[key]) {
      return translationSet[key];
    }
    // Fallback to spanish, then key itself
    return (translations['es'][key]) || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

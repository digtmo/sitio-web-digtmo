export const projects = [
  {
    id: 'lafloresta',
    name: 'La Floresta',
    meta: 'E-commerce · Delivery',
    accent: 'cyan',
    url: 'https://laflorestafloreria.cl',
    links: [{ label: 'laflorestafloreria.cl', href: 'https://laflorestafloreria.cl' }],
    description:
      'E-commerce de una florería boutique de Los Ángeles con catálogo de ramos, cajas florales y arreglos para eventos, con dedicatorias, despacho a domicilio y pago en línea. Se sumó un backoffice que lleva el control de cada pedido de punta a punta: estados, asignación de repartidores, rutas del día e integración con WhatsApp para enviar automáticamente las fotos de las entregas al cliente como comprobante.',
    stack: ['WooCommerce', 'Node.js', 'Meta API', 'AWS'],
  },
  {
    id: 'avanxa',
    name: 'Avanxa',
    meta: 'Plataforma · LMS · E-commerce · AI',
    accent: 'purple',
    description:
      'Backoffice que centraliza toda la operación de la empresa en un solo lugar: alumnos, cursos, matrículas, ventas y reportes de gestión, integrando WooCommerce, Moodle y Open edX para que la información fluya sin cargas manuales. Automatiza procesos que antes se hacían a mano, reduce los tiempos de gestión y aprovecha inteligencia artificial para optimizar flujos de trabajo y generar contenido y respuestas al equipo.',
    stack: ['Node.js', 'React', 'WooCommerce', 'Moodle', 'Open edX', 'Anthropic', 'AWS'],
  },
  {
    id: 'mudanzas',
    name: 'Mudanzas Retorno',
    meta: 'Reservas · Cotizaciones',
    accent: 'magenta',
    url: 'https://www.mudanzasretorno.cl',
    links: [
      { label: 'mudanzasretorno.cl', href: 'https://www.mudanzasretorno.cl' },
      { label: 'econotrans.cl', href: 'https://www.econotrans.cl' },
    ],
    description:
      'Dos sitios de una misma operación de transporte con cobertura de Arica a Puerto Montt —mudanzas residenciales y corporativas, fletes, mudanzas de retorno y carga consolidada— con cotización online inmediata y reserva en línea. Ambos están centralizados en un backoffice único donde se administran mudanzas, cotizaciones y CRM: seguimiento de cada cliente desde la solicitud hasta el traslado, agenda de servicios, asignación de camiones y reportes del negocio, con inteligencia artificial para estimar las cotizaciones.',
    stack: ['Node.js', 'Next.js', 'Anthropic', 'API Google', 'AWS'],
  },
  {
    id: 'vistamarconi',
    name: 'Vista Marconi',
    meta: 'Inmobiliaria · Gestión',
    accent: 'purple',
    description:
      'Plataforma para administrar un conjunto residencial de múltiples torres que centraliza departamentos, bodegas y estacionamientos, y gestiona el cobro de arriendos y gastos comunes: automatiza el prorrateo, emite los cobros a cada propietario o arrendatario y lleva el estado de pago sin planillas. Incluye un dashboard con métricas del negocio (ocupación, morosidad, ingresos por período) y conexión con el Servicio de Impuestos Internos para la emisión de documentos tributarios, eliminando los errores manuales de la facturación.',
    stack: ['Node.js', 'React', 'AWS'],
  },
  {
    id: 'otec',
    name: 'Automatización OTEC',
    meta: 'OTEC · SENCE',
    accent: 'cyan',
    description:
      'Plataforma integral para una OTEC especializada en capacitación de empresas, donde toda la operación académica y administrativa vive en un solo sistema. Centraliza la información de alumnos y sus notas, avances y asistencia desde el LMS, automatiza la conexión con SENCE y la obtención del estado de las declaraciones juradas —un proceso que antes se revisaba curso por curso a mano— y genera la reportabilidad que el cliente final necesita para justificar su franquicia. Cada empresa cuenta además con un acceso propio a la plataforma para seguir en línea el progreso de sus trabajadores, descargar certificados y revisar el estado de cada curso sin pedirlo por correo.',
    stack: ['Node.js', 'Next.js', 'Moodle', 'SENCE', 'AWS'],
  },
  {
    id: 'electroluz',
    name: 'Electroluz',
    meta: 'Energía solar · Leads',
    accent: 'magenta',
    url: 'https://www.electroluz.cl',
    links: [{ label: 'electroluz.cl', href: 'https://www.electroluz.cl' }],
    description:
      'Sitio de captación para una empresa instaladora de paneles solares en Chile centro-sur, con la ficha del kit solar todo incluido (paneles, inversor, batería de litio, estructura e instalación SEC) y precio final instalado. Incluye una calculadora de ahorro donde el cliente sube su boleta de luz y recibe por correo un análisis de qué porcentaje de su consumo cubriría el kit, más contacto directo por WhatsApp para cotizar. Desde el panel, el dueño genera la cotización de forma automática a partir de la boleta y los datos del cliente, y la envía sin rehacer cálculos a mano.',
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'AWS'],
  },
  {
    id: 'mudapro',
    name: 'Mudapro',
    meta: 'SaaS · Mudanzas',
    accent: 'cyan',
    url: 'https://getmudapro.com',
    links: [{ label: 'getmudapro.com', href: 'https://getmudapro.com' }],
    description:
      'Software de gestión para empresas de mudanzas que centraliza cotizador online mueble por mueble, reservas y pagos, control de bultos por escaneo y asignación de vehículos y personal, con un asistente de IA que atiende WhatsApp, Instagram y Messenger 24/7.',
    stack: ['Node.js', 'Next.js', 'Anthropic', 'Meta API', 'AWS'],
  },
]

export const metrics = [
  {
    id: 'projects',
    value: '+25',
    label: 'Proyectos entregados',
    detail: 'Plataformas, e-commerce y automatizaciones en producción.',
    accent: 'cyan',
  },
  {
    id: 'industries',
    value: '6',
    label: 'Industrias',
    detail: 'Retail, capacitación, transporte, inmobiliaria, energía y SaaS.',
    accent: 'purple',
  },
  {
    id: 'integrations',
    value: '+10',
    label: 'Sistemas conectados',
    detail: 'SII, SENCE, medios de pago, WhatsApp, Google, LMS, ERPs y modelos de IA.',
    accent: 'magenta',
  },
  {
    id: 'time',
    value: '80%',
    label: 'Menos tiempo en tareas manuales',
    detail:
      'Lo que antes tomaba una jornada completa de trabajo repetitivo —cargar planillas, revisar estados uno por uno, armar cotizaciones y reportes— pasa a resolverse en minutos.',
    accent: 'cyan',
  },
]

export const services = [
  {
    id: 'automation',
    title: 'Automatización de procesos',
    accent: 'cyan',
    icon: 'automation',
    description:
      'Digitalizamos tus procesos o identificamos oportunidades para hacerlo, logrando ahorros de hasta un 80% de tiempo en tareas repetitivas.',
    benefits: ['Mejora continua', 'Optimización de recursos', 'Reducción de errores humanos'],
  },
  {
    id: 'integrations',
    title: 'Integraciones',
    accent: 'purple',
    icon: 'integration',
    description:
      'Realizamos cualquier tipo de integración: SII, medios de pago, CRM, Google Sheets y más. Conecta tu negocio de forma ágil y segura, optimizando el flujo de datos.',
    benefits: ['Ahorro de tiempo', 'Flujo de datos centralizado', 'Mejor experiencia de usuario'],
  },
  {
    id: 'ecommerce',
    title: 'Desarrollo de E-commerce',
    accent: 'magenta',
    icon: 'ecommerce',
    description:
      'Creamos tiendas con diseño profesional y atractivo. Ofrecemos autoadministración completa del sitio e integramos pagos nacionales e internacionales.',
    benefits: ['Diseño personalizado', 'Procesos de pago seguros', 'Escalabilidad global'],
  },
]

export const process = [
  {
    number: '01',
    title: 'Inmersión',
    description:
      'Nos sumergimos en tu negocio. Entendemos procesos, dolores y oportunidades. Una visión clara es el punto de partida de toda solución de excelencia.',
  },
  {
    number: '02',
    title: 'Diseño de solución',
    description:
      'Definimos arquitectura, stack y alcance. Priorizamos entregables concretos que generen valor temprano, con análisis de datos que respalden cada decisión.',
  },
  {
    number: '03',
    title: 'Desarrollo iterativo',
    description:
      'Construimos por ciclos cortos con feedback continuo. Cada iteración suma funcionalidad, reduce riesgo y mantiene el proyecto alineado con tus objetivos.',
  },
  {
    number: '04',
    title: 'Implementación y evolución',
    description:
      'Desplegamos, medimos y acompañamos. Una solución viva que crece contigo, con mejora continua basada en uso real y métricas de negocio.',
  },
]

export const testimonial = {
  quote:
    'Nuestra florería ha dado un salto gigantesco en eficiencia y satisfacción del cliente. Con cada pedido gestionado de manera impecable, hemos llevado sonrisas de felicidad a nuestros clientes, superando todas sus expectativas.',
  author: 'Marcela Torres',
  role: 'CEO, La Floresta',
  initials: 'MT',
}

export const contact = {
  address: 'Los Ángeles, Chile',
  phone: '+56 9 3172 9925',
  phoneTel: 'tel:+56931729925',
  email: 'dtorres@digtmo.com',
  mailto: 'mailto:dtorres@digtmo.com',
}

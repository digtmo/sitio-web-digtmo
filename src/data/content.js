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

// Contenido de la landing local /desarrollo-de-software-los-angeles-biobio/
export const localLanding = {
  eyebrow: 'Los Ángeles · Región del Biobío',
  h1: 'Desarrollo de software en Los Ángeles, Biobío',
  lede:
    'Somos digtmo, una empresa de desarrollo de software con base en Los Ángeles, Región del Biobío. Construimos plataformas a medida, e-commerce e integraciones para empresas de la zona, y también para clientes en todo Chile que trabajan con nosotros de forma remota.',
  intro:
    'Llevamos más de 25 proyectos entregados y varios de ellos están funcionando hoy en empresas de la región: una florería que despacha en Los Ángeles, dos empresas de mudanzas que cubren de Arica a Puerto Montt, un instalador de paneles solares del centro-sur, un conjunto residencial y una OTEC que capacita empresas. No son mockups ni casos de estudio inventados: puedes entrar a los sitios, cotizar como cliente y ver el sistema funcionando.',
  sections: [
    {
      id: 'cercania',
      title: 'Una empresa de la zona, no un proveedor lejano',
      paragraphs: [
        'Contratar desarrollo de software a distancia tiene un costo que no aparece en la cotización: las reuniones que nunca se concretan, el requerimiento que se entendió a medias, el sistema que se entrega y nadie del equipo sabe usar. Cuando el proveedor está en otra ciudad, cada malentendido cuesta una semana.',
        'Estar en Los Ángeles significa que podemos sentarnos en tu oficina a ver cómo trabaja tu equipo realmente. Esa es la parte que más define el resultado de un proyecto: entender el proceso tal como ocurre, con sus excepciones y sus planillas paralelas, y no como está descrito en un documento. Después el desarrollo puede ser remoto —lo es la mayor parte del tiempo—, pero el levantamiento y la puesta en marcha se hacen mejor cara a cara.',
        'También significa que respondemos en tu horario, facturamos en pesos, emitimos documentos tributarios chilenos y conocemos las integraciones que un negocio local necesita de verdad: SII, SENCE, Transbank, Mercado Pago, WhatsApp.',
      ],
    },
    {
      id: 'que-hacemos',
      title: 'Qué desarrollamos para empresas de la región',
      paragraphs: [
        'No trabajamos con un catálogo cerrado de productos. Cada proyecto parte de un problema concreto de operación y termina en un sistema que ese equipo usa todos los días.',
      ],
      list: [
        {
          title: 'Software a medida',
          text: 'Plataformas de gestión para lo que tu negocio hace y ningún sistema enlatado cubre: reservas, cotizaciones, control de flota, prorrateo de gastos comunes, seguimiento de pedidos.',
        },
        {
          title: 'Automatización de procesos',
          text: 'Todo lo que hoy alguien hace copiando y pegando entre planillas, revisando estados uno por uno o armando el mismo informe cada semana. Es donde más rápido se nota el ahorro.',
        },
        {
          title: 'Integraciones',
          text: 'Conectar los sistemas que ya usas para que dejen de estar aislados: SII, SENCE, medios de pago, CRM, ERP, LMS, Google, WhatsApp y modelos de IA.',
        },
        {
          title: 'E-commerce',
          text: 'Tiendas online autoadministrables, con pagos nacionales e internacionales, despacho y el backoffice para gestionar los pedidos detrás.',
        },
        {
          title: 'Backoffice y paneles de gestión',
          text: 'El sistema interno donde la operación se centraliza: estados, asignaciones, cobros, métricas del negocio y reportes para tus clientes.',
        },
        {
          title: 'Funcionalidades con inteligencia artificial',
          text: 'Asistentes que atienden WhatsApp e Instagram, cotizadores automáticos, clasificación de documentos y generación de contenido, integrados a tu operación real.',
        },
      ],
    },
    {
      id: 'casos',
      title: 'Casos reales, con clientes de la zona',
      paragraphs: [
        'La diferencia entre una promesa y un antecedente es que el segundo se puede verificar. Estos sistemas están en producción y sus sitios son públicos:',
      ],
      list: [
        {
          title: 'Mudanzas Retorno y Econotrans',
          text: 'Dos empresas de transporte con base en Los Ángeles que cubren de Arica a Puerto Montt. Cotización online inmediata en ambos sitios y un backoffice único donde se centralizan mudanzas, cotizaciones y CRM, con IA para estimar los presupuestos.',
        },
        {
          title: 'La Floresta',
          text: 'Florería de Los Ángeles con e-commerce y despacho a domicilio, más un backoffice que controla cada pedido, asigna repartidores y envía por WhatsApp la foto de la entrega como comprobante.',
        },
        {
          title: 'Electroluz',
          text: 'Instalador de paneles solares del centro-sur. El cliente sube su boleta de luz y recibe un análisis de cuánto de su consumo cubriría el kit; el dueño genera la cotización automáticamente desde el panel.',
        },
        {
          title: 'Automatización OTEC',
          text: 'Plataforma para una OTEC que capacita empresas: centraliza alumnos y notas, automatiza la conexión con SENCE y el estado de las declaraciones juradas, y da a cada empresa un acceso para seguir a sus trabajadores.',
        },
      ],
    },
    {
      id: 'cobertura',
      title: 'Zona de cobertura',
      paragraphs: [
        'Atendemos presencialmente Los Ángeles y las comunas cercanas de la Provincia del Biobío —Nacimiento, Mulchén, Cabrero, Yumbel, Laja, San Rosendo, Santa Bárbara—, además de Concepción, Chillán y Angol coordinando la visita con anticipación.',
        'Para el resto de Chile trabajamos de forma remota, que es como se desarrolla la mayor parte de cualquier proyecto: reuniones por video, avances revisables en línea y entregas por ciclos cortos. Hoy tenemos clientes operando desde Santiago hasta el sur.',
      ],
    },
    {
      id: 'como-trabajamos',
      title: 'Cómo partimos',
      paragraphs: [
        'La primera conversación es gratuita y dura unos 30 minutos. Sirve para entender qué necesitas y decirte con honestidad si es un proyecto que vale la pena hacer, si conviene resolverlo con algo que ya existe en el mercado, o si hay una forma más barata de llegar al mismo resultado.',
        'Si seguimos adelante, definimos alcance y presupuesto cerrado por proyecto: sabes el costo total antes de empezar, no una cuenta de horas que crece sola. Después desarrollamos por ciclos cortos, con algo revisable cada pocas semanas, para que no tengas que esperar meses a ciegas hasta ver el resultado.',
      ],
    },
    {
      id: 'precios',
      title: 'Cuánto cuesta un proyecto',
      paragraphs: [
        'Depende del alcance, y cualquiera que te dé un número sin escucharte primero está adivinando. Como referencia, una automatización acotada —conectar dos sistemas, eliminar un proceso manual recurrente— parte del orden de unos cientos de miles de pesos, mientras que una plataforma de gestión completa con panel de administración, pagos e integraciones se mueve en varios millones.',
        'Para darte un rango en minutos, sin reunión previa, tenemos un cotizador con inteligencia artificial en la página principal: le cuentas qué necesitas, te hace algunas preguntas y te entrega una estimación con el detalle por escrito a tu correo.',
      ],
    },
  ],
  faq: [
    {
      q: '¿Atienden presencialmente en Los Ángeles?',
      a: 'Sí. Estamos en Los Ángeles, Región del Biobío, y hacemos reuniones presenciales para el levantamiento inicial y la puesta en marcha, que es cuando más aporta estar en terreno. El desarrollo del día a día es remoto, con avances revisables en línea.',
    },
    {
      q: '¿Trabajan con empresas fuera del Biobío?',
      a: 'Sí. Tenemos clientes en distintas regiones de Chile trabajando de forma completamente remota. La cercanía suma, pero no es un requisito: el proceso está armado para funcionar con reuniones por video y entregas por ciclos cortos.',
    },
    {
      q: '¿Cuánto demora un proyecto?',
      a: 'Una automatización acotada suele tomar entre 3 y 5 semanas. Una plataforma de gestión con panel de administración, pagos e integraciones se mueve entre 6 y 12 semanas, según el alcance. Siempre entregamos por etapas, así que ves resultados mucho antes del cierre.',
    },
    {
      q: '¿Cobran por hora o por proyecto?',
      a: 'Por proyecto, con presupuesto cerrado. Eso te da certeza del costo total desde el principio y nos permite enfocarnos en el resultado y no en acumular horas.',
    },
    {
      q: '¿Pueden integrarse con el SII, SENCE o el sistema que ya uso?',
      a: 'Sí. Las integraciones son buena parte de lo que hacemos: SII para documentos tributarios, SENCE para OTEC, medios de pago como Transbank y Mercado Pago, WhatsApp Business, Google, además de CRM, ERP y LMS como Moodle u Open edX.',
    },
    {
      q: '¿Qué pasa si ya tengo un sistema y no quiero partir de cero?',
      a: 'Es el escenario más común. Solemos integrar y automatizar sobre lo que ya existe en vez de reemplazarlo: rehacer un sistema que funciona rara vez se justifica. Primero revisamos qué conviene conservar y qué está frenando la operación.',
    },
    {
      q: '¿Entregan el código y la propiedad del sistema?',
      a: 'Sí. El sistema y su código son tuyos, alojados en la infraestructura que definamos contigo. No quedas amarrado a nosotros para poder seguir operando.',
    },
    {
      q: '¿Emiten factura?',
      a: 'Sí, somos una empresa chilena y emitimos documentos tributarios. Trabajamos en pesos y con las condiciones de pago acordadas en la propuesta.',
    },
  ],
  cta: {
    title: 'Conversemos sobre tu proyecto',
    text: 'La primera reunión es gratuita y dura 30 minutos. Si prefieres partir con un número, el cotizador con IA te entrega un rango estimado en minutos.',
  },
}

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

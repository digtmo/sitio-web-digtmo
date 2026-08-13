import { localLanding } from './content.js'

export const SITE = 'https://www.digtmo.com'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#organization`,
  name: 'digtmo',
  description:
    'Desarrollo de software a medida, e-commerce, automatización de procesos e integración de sistemas.',
  url: `${SITE}/`,
  logo: `${SITE}/logo-mark.png`,
  image: `${SITE}/og.jpg`,
  email: 'dtorres@digtmo.com',
  telephone: '+56931729925',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Ángeles',
    addressRegion: 'Biobío',
    addressCountry: 'CL',
  },
  areaServed: [
    { '@type': 'City', name: 'Los Ángeles' },
    { '@type': 'AdministrativeArea', name: 'Región del Biobío' },
    { '@type': 'Country', name: 'Chile' },
  ],
  knowsLanguage: ['es'],
  legalName: 'DIGTMO WEB DEVELOPMENT SPA',
  sameAs: [
    'https://www.instagram.com/digtmo_com',
    'https://github.com/digtmo',
  ],
}

// Metadatos y datos estructurados por ruta. El build los inyecta en el <head>
// de cada página generada (ver scripts/prerender.mjs).
export const pages = [
  {
    path: '/',
    title: 'digtmo — Software a medida y automatización | Los Ángeles, Chile',
    description:
      'Desarrollo de software a medida, e-commerce e integraciones en Los Ángeles, Biobío. Automatizamos procesos y conectamos tus sistemas: SII, SENCE, medios de pago, WhatsApp y más.',
    ogTitle: 'digtmo — Software a medida y automatización en Chile',
    ogDescription:
      'Automatizamos lo que te hace perder tiempo e integramos lo que te tiene desconectado. Software, e-commerce e integraciones desde Los Ángeles, Chile.',
    jsonLd: [
      organization,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: `${SITE}/`,
        name: 'digtmo',
        inLanguage: 'es-CL',
        publisher: { '@id': `${SITE}/#organization` },
      },
    ],
  },
  {
    path: '/desarrollo-de-software-los-angeles-biobio/',
    title: 'Desarrollo de software en Los Ángeles, Biobío | digtmo',
    description:
      'Empresa de desarrollo de software en Los Ángeles, Región del Biobío. Software a medida, automatización, e-commerce e integraciones con SII y SENCE. Atención presencial en la zona y remota en todo Chile.',
    ogTitle: 'Desarrollo de software en Los Ángeles, Biobío',
    ogDescription:
      'Software a medida, automatización de procesos e integraciones para empresas del Biobío. Más de 25 proyectos entregados y casos que puedes revisar hoy.',
    jsonLd: [
      organization,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Desarrollo de software a medida',
        serviceType: 'Desarrollo de software',
        provider: { '@id': `${SITE}/#organization` },
        areaServed: [
          { '@type': 'City', name: 'Los Ángeles' },
          { '@type': 'AdministrativeArea', name: 'Región del Biobío' },
          { '@type': 'Country', name: 'Chile' },
        ],
        description:
          'Plataformas de gestión, automatización de procesos, e-commerce e integraciones para empresas de Los Ángeles y la Región del Biobío.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Desarrollo de software en Los Ángeles, Biobío',
            item: `${SITE}/desarrollo-de-software-los-angeles-biobio/`,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: localLanding.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  },
]

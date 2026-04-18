import { services } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Services.module.css'

function IconAutomation({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

function IconIntegration({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="18" x2="16" y2="18" />
      <line x1="6" y1="8" x2="6" y2="16" />
      <line x1="18" y1="8" x2="18" y2="16" />
    </svg>
  )
}

function IconEcommerce({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

const ACCENT_COLORS = {
  cyan: '#22D3EE',
  purple: '#A855F7',
  magenta: '#EC4899',
}

function ServiceIcon({ type, accent }) {
  const color = ACCENT_COLORS[accent]
  if (type === 'automation') return <IconAutomation color={color} />
  if (type === 'integration') return <IconIntegration color={color} />
  return <IconEcommerce color={color} />
}

function ServiceCard({ service, index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`${styles.card} ${styles[`accent-${service.accent}`]} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: visible ? `${index * 0.1}s` : '0s' }}
    >
      <div className={`${styles.iconWrap} ${styles[`iconBorder-${service.accent}`]}`}>
        <ServiceIcon type={service.icon} accent={service.accent} />
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
      <ul className={styles.benefits}>
        {service.benefits.map(b => (
          <li key={b}>
            <span className={`${styles.checkDot} ${styles[`checkDot-${service.accent}`]}`} />
            {b}
          </li>
        ))}
      </ul>
      <a href="mailto:dtorres@digtmo.com" className={`${styles.link} ${styles[`link-${service.accent}`]}`}>
        Contactar →
      </a>
    </article>
  )
}

export default function Services() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="servicios" className="section">
      <div className="container">
        <div
          ref={headRef}
          className={`section-head reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Servicios</p>
          <h2>Optimiza procesos, conecta sistemas y <em>potencia</em> tus ventas.</h2>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

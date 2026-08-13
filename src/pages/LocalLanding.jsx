import CursorGlow from '../components/CursorGlow.jsx'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Contact from '../components/Contact.jsx'
import { localLanding, contact } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { track } from '../lib/analytics.js'
import styles from './LocalLanding.module.css'

function Section({ section }) {
  const [ref, visible] = useReveal()

  return (
    <section
      id={section.id}
      ref={ref}
      className={`${styles.block} reveal ${visible ? 'visible' : ''}`}
    >
      <h2 className={styles.h2}>{section.title}</h2>
      {section.paragraphs.map((text, i) => (
        <p key={i} className={styles.p}>
          {text}
        </p>
      ))}
      {section.list && (
        <ul className={styles.list}>
          {section.list.map(item => (
            <li key={item.title} className={styles.listItem}>
              <h3 className={styles.h3}>{item.title}</h3>
              <p className={styles.listText}>{item.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Faq() {
  const [ref, visible] = useReveal()

  return (
    <section
      id="faq"
      ref={ref}
      className={`${styles.block} reveal ${visible ? 'visible' : ''}`}
    >
      <h2 className={styles.h2}>Preguntas frecuentes</h2>
      <div className={styles.faq}>
        {localLanding.faq.map(item => (
          <details key={item.q} className={styles.faqItem}>
            <summary className={styles.faqQ}>{item.q}</summary>
            <p className={styles.faqA}>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default function LocalLanding() {
  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <article className={styles.page}>
          <div className="container">
            <nav aria-label="Ruta de navegación" className={styles.breadcrumb}>
              <a href="/">Inicio</a>
              <span aria-hidden="true">›</span>
              <span>Desarrollo de software en Los Ángeles, Biobío</span>
            </nav>

            <header className={styles.header}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                {localLanding.eyebrow}
              </p>
              <h1 className={styles.h1}>{localLanding.h1}</h1>
              <p className={styles.lede}>{localLanding.lede}</p>
              <p className={styles.p}>{localLanding.intro}</p>

              <div className={styles.ctas}>
                <a
                  href={contact.mailto}
                  className="btn btn-primary"
                  onClick={() => track('meeting_click', { location: 'landing-local' })}
                >
                  Agenda una reunión
                </a>
                <a
                  href="/#cotiza"
                  className="btn btn-ghost"
                  onClick={() => track('cta_quote_click', { location: 'landing-local' })}
                >
                  Cotiza con IA en minutos
                </a>
              </div>
            </header>

            {localLanding.sections.map(section => (
              <Section key={section.id} section={section} />
            ))}

            <Faq />
          </div>
        </article>

        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

import { contact } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { track } from '../lib/analytics.js'
import styles from './Contact.module.css'

export default function Contact() {
  const [ref, visible] = useReveal()

  return (
    <section id="contacto" className="section">
      <div className="container">
        <div
          ref={ref}
          className={`${styles.wrap} reveal ${visible ? 'visible' : ''}`}
        >
          <div className={styles.top}>
            <p className="section-label">Contacto</p>
            <h2 className={styles.heading}>
              Conversemos sobre tu <em>proyecto</em>.
            </h2>
            <p className={styles.lede}>
              Agenda una reunión y veamos cómo podemos colaborar para hacer realidad
              tus ideas. Respondemos dentro de 24 horas hábiles.
            </p>
            <a
              href={contact.mailto}
              className="btn btn-primary"
              onClick={() => track('meeting_click', { location: 'contacto' })}
            >
              Agenda tu reunión
            </a>
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Dirección</span>
              <span className={styles.infoValue}>{contact.address}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Teléfono</span>
              <a
                href={contact.phoneTel}
                className={`${styles.infoValue} ${styles.infoLink}`}
                onClick={() => track('contact_phone_click')}
              >
                {contact.phone}
              </a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a
                href={contact.mailto}
                className={`${styles.infoValue} ${styles.infoLink}`}
                onClick={() => track('contact_email_click')}
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

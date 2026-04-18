import { testimonial } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Testimonial.module.css'

export default function Testimonial() {
  const [ref, visible] = useReveal()

  return (
    <section className={`${styles.section} section`}>
      <div className={`container ${styles.inner}`}>
        <div
          ref={ref}
          className={`${styles.content} reveal ${visible ? 'visible' : ''}`}
        >
          <blockquote className={styles.quote}>
            <span className={styles.quoteOpen}>&ldquo;</span>
            {testimonial.quote}
            <span className={styles.quoteClose}>&rdquo;</span>
          </blockquote>

          <div className={styles.author}>
            <div className={styles.avatar}>
              <span>{testimonial.initials}</span>
            </div>
            <div>
              <p className={styles.authorName}>{testimonial.author}</p>
              <p className={styles.authorRole}>{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

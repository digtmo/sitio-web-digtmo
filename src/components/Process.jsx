import { process } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Process.module.css'

function ProcessItem({ item, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`${styles.item} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span className={styles.number}>{item.number}</span>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
    </div>
  )
}

export default function Process() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="proceso" className="section">
      <div className="container">
        <div
          ref={headRef}
          className={`section-head reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Cómo trabajamos</p>
          <h2>Un proceso claro, <em>iterativo</em> y medible.</h2>
        </div>

        <div className={styles.list}>
          {process.map((item, i) => (
            <ProcessItem key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

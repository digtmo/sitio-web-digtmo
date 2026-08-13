import { metrics } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Metrics.module.css'

function MetricItem({ metric, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`${styles.item} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: visible ? `${index * 0.07}s` : '0s' }}
    >
      <span className={`${styles.value} ${styles[`accent-${metric.accent}`]}`}>
        {metric.value}
      </span>
      <span className={styles.label}>{metric.label}</span>
      <span className={styles.detail}>{metric.detail}</span>
    </div>
  )
}

export default function Metrics() {
  return (
    <section className={styles.section} aria-labelledby="metricas">
      <h2 id="metricas" className="sr-only">
        digtmo en números
      </h2>
      <div className={`container ${styles.grid}`}>
        {metrics.map((m, i) => (
          <MetricItem key={m.id} metric={m} index={i} />
        ))}
      </div>
    </section>
  )
}

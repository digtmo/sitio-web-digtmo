import { projects } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import styles from './Projects.module.css'

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`${styles.card} ${styles[`accent-${project.accent}`]} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: visible ? `${index * 0.07}s` : '0s' }}
    >
      <div className={styles.meta}>
        <span className={`${styles.metaDot} ${styles[`dot-${project.accent}`]}`} />
        <span className={styles.metaTag}>{project.meta}</span>
      </div>
      <h3 className={styles.title}>{project.name}</h3>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.stack}>
        {project.stack.map(tech => (
          <span key={tech} className="chip">{tech}</span>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <div
          ref={headRef}
          className={`section-head reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Proyectos recientes</p>
          <h2>Cinco casos. Cinco <em>soluciones</em> a medida.</h2>
        </div>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

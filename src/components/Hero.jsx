import styles from './Hero.module.css'

function openQuoteChat() {
  document.getElementById('cotiza')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.eyebrow} ${styles.fadeIn1}`}>
          <span className={styles.dot} />
          Software · E-commerce · Integraciones
        </div>

        <h1 className={`${styles.heading} ${styles.fadeIn2}`}>
          <em>Automatizamos</em> lo que te hace
          <br />perder tiempo.{' '}
          <em>Integramos</em> lo que
          <br />te tiene desconectado.
        </h1>

        <p className={`${styles.lede} ${styles.fadeIn3}`}>
          En digtmo creamos soluciones tecnológicas que impulsan el crecimiento de nuestros
          clientes a través de software, e-commerce e integración de sistemas. Nos sumergimos
          en tu negocio para entenderlo a fondo, porque una visión clara permite desarrollar
          soluciones de excelencia.
        </p>

        <div className={`${styles.ctas} ${styles.fadeIn4}`}>
          <button className="btn btn-primary" onClick={openQuoteChat}>
            Cotiza tu proyecto
          </button>
          <a href="#proyectos" className="btn btn-ghost">
            Ver proyectos
          </a>
        </div>
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <div className={styles.dividerDot} />
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  const openQuoteChat = (e) => {
    e.preventDefault()
    const target = document.getElementById('cotiza')

    // El cotizador vive en el home: desde otra página hay que navegar hasta él.
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#cotiza'
    }

    closeMenu()
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <img
            src="/logo-96.png"
            alt="digtmo"
            width="28"
            height="28"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>digtmo</span>
        </a>

        <div className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          <a href="/#servicios" className={styles.link} onClick={closeMenu}>Servicios</a>
          <a href="/#proyectos" className={styles.link} onClick={closeMenu}>Proyectos</a>
          <a href="/#proceso" className={styles.link} onClick={closeMenu}>Proceso</a>
          <a href="/#contacto" className={styles.link} onClick={closeMenu}>Contacto</a>
          <button
            className={`btn btn-primary ${styles.cta}`}
            onClick={openQuoteChat}
          >
            Cotiza tu proyecto
          </button>
        </div>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}

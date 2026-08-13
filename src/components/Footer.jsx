import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          <img
            src="/logo-96.png"
            alt="digtmo"
            width="24"
            height="24"
            loading="lazy"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>digtmo</span>
        </a>

        <p className={styles.copy}>
          &copy; 2026 Digtmo. Todos los derechos reservados.
        </p>

        <p className={styles.made}>
          Hecho en Los Ángeles, Chile
        </p>
      </div>
    </footer>
  )
}

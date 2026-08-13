import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initAnalytics } from './lib/analytics.js'

initAnalytics()

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// El build genera el HTML prerenderizado dentro de #root (ver scripts/prerender.mjs);
// en dev el contenedor viene vacío y hay que montar desde cero.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

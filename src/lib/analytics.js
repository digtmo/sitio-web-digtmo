// GA4. El ID se toma de la variable de entorno VITE_GA_ID: si no está definida
// (desarrollo local, previews), no se carga nada y track() queda en no-op.
const GA_ID = import.meta.env.VITE_GA_ID

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

// Eventos de conversión: son los que se importan a Google Ads para optimizar campañas.
export function track(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

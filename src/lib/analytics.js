// gtag.js compartido por GA4 y Google Ads. Los IDs vienen de variables de entorno:
// si no hay ninguno definido (desarrollo local, previews), no se carga nada y
// track() queda en no-op.
const GA_ID = import.meta.env.VITE_GA_ID // G-XXXXXXXXXX (Analytics)
const ADS_ID = import.meta.env.VITE_ADS_ID // AW-XXXXXXXXX (Google Ads)

// Etiquetas de conversión de Google Ads: se obtienen al crear cada acción de
// conversión en Ads y tienen el formato AbC-D_efGhIjK.
const ADS_LABELS = {
  quote_lead: import.meta.env.VITE_ADS_LABEL_LEAD,
  meeting_click: import.meta.env.VITE_ADS_LABEL_MEETING,
}

export function initAnalytics() {
  const primaryId = GA_ID || ADS_ID
  if (!primaryId || typeof window === 'undefined' || window.gtag) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())

  if (GA_ID) window.gtag('config', GA_ID)
  if (ADS_ID) window.gtag('config', ADS_ID)
}

// Registra el evento en GA4 y, si la acción tiene una etiqueta de conversión
// configurada, lo reporta también como conversión de Google Ads.
export function track(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', name, params)

  const label = ADS_LABELS[name]
  if (ADS_ID && label) {
    window.gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` })
  }
}

import Home from './pages/Home.jsx'
import LocalLanding from './pages/LocalLanding.jsx'

// Router mínimo: el sitio tiene pocas rutas y todas se prerenderizan en el build
// (ver scripts/prerender.mjs), así que no hace falta una librería de routing.
export const routes = {
  '/': Home,
  '/desarrollo-de-software-los-angeles-biobio/': LocalLanding,
}

function normalize(pathname) {
  if (pathname === '/' || pathname === '') return '/'
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

export default function App({ path }) {
  const current = normalize(path ?? window.location.pathname)
  const Page = routes[current] ?? Home
  return <Page />
}

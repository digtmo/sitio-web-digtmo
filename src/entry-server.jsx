import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export { pages, SITE } from './data/seo.js'

export function render(path) {
  return renderToString(<App path={path} />)
}

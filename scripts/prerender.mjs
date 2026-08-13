// Inyecta el HTML del App renderizado en servidor dentro de dist/index.html.
// El cliente hidrata ese markup en lugar de montar sobre un div vacío,
// de modo que buscadores y crawlers reciben el contenido completo.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const distIndex = path.join(root, 'dist', 'index.html')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render } = await import(ssrEntry)
const appHtml = render()

const template = await readFile(distIndex, 'utf8')
const marker = '<div id="root"></div>'

if (!template.includes(marker)) {
  throw new Error('No se encontró <div id="root"></div> en dist/index.html')
}

await writeFile(distIndex, template.replace(marker, `<div id="root">${appHtml}</div>`))
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`prerender: ${(appHtml.length / 1024).toFixed(1)} kB de HTML inyectados en dist/index.html`)

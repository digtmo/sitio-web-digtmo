// Genera un HTML estático por ruta a partir del build SSR: cada página queda con
// su propio <head> (title, description, canonical, OG y JSON-LD) y con el markup
// del App ya renderizado, que el cliente luego hidrata.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const distDir = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, pages, SITE } = await import(ssrEntry)

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
const rootMarker = '<div id="root"></div>'

if (!template.includes(rootMarker)) {
  throw new Error('No se encontró <div id="root"></div> en dist/index.html')
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`No se encontró el tag a reemplazar: ${pattern}`)
  return html.replace(pattern, replacement)
}

function buildHead(html, page) {
  const url = `${SITE}${page.path}`

  let out = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
  out = replaceTag(
    out,
    /(<meta\s+name="description"[\s\S]*?content=")[\s\S]*?(")/,
    `$1${page.description}$2`
  )
  out = replaceTag(out, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  out = replaceTag(out, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  out = replaceTag(
    out,
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${page.ogTitle}$2`
  )
  out = replaceTag(
    out,
    /(<meta\s+property="og:description"[\s\S]*?content=")[\s\S]*?(")/,
    `$1${page.ogDescription}$2`
  )
  out = replaceTag(
    out,
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${page.ogTitle}$2`
  )
  out = replaceTag(
    out,
    /(<meta\s+name="twitter:description"[\s\S]*?content=")[\s\S]*?(")/,
    `$1${page.ogDescription}$2`
  )

  // Los JSON-LD del template se reemplazan por los de la ruta.
  out = out.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  const blocks = page.jsonLd
    .map(data => `    <script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`)
    .join('\n')

  return out.replace('</head>', `${blocks}\n  </head>`)
}

for (const page of pages) {
  const html = buildHead(template, page).replace(rootMarker, `<div id="root">${render(page.path)}</div>`)
  const outDir = page.path === '/' ? distDir : path.join(distDir, page.path)

  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), html)

  console.log(`prerender: ${page.path} → ${(html.length / 1024).toFixed(1)} kB`)
}

await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

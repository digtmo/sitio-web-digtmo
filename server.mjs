/**
 * Servidor de desarrollo local para la API serverless.
 * Corre en paralelo con `npm run dev` (Vite).
 *
 * Uso:
 *   node server.mjs
 *
 * Requiere .env.local con:
 *   ANTHROPIC_API_KEY=sk-ant-api03-...
 */

import { createServer } from 'http'
import { readFileSync, existsSync } from 'fs'

// Cargar .env.local manualmente (sin dependencias externas)
const envFile = existsSync('.env.local') ? '.env.local' : existsSync('.env') ? '.env' : null
if (envFile) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key && !process.env[key]) process.env[key] = val
  }
  console.log(`Loaded env from ${envFile}`)
}

const PORT = 3001

// Importar los handlers DESPUÉS de cargar las env vars
const { default: handler } = await import('./api/quote.js')
const { default: notifyHandler } = await import('./api/notify.js')

const server = createServer(async (req, res) => {
  // CORS para Vite (localhost:5173)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === '/api/quote') {
    // Parsear body JSON manualmente
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    try {
      req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
    } catch {
      req.body = {}
    }

    await handler(req, res)
    return
  }

  if (req.url === '/api/notify') {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    try {
      req.body = JSON.parse(Buffer.concat(chunks).toString() || '{}')
    } catch {
      req.body = {}
    }

    await notifyHandler(req, res)
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  const keyStatus = process.env.ANTHROPIC_API_KEY
    ? `✓ ANTHROPIC_API_KEY cargada`
    : '✗ ANTHROPIC_API_KEY no encontrada'
  const resendStatus = process.env.GMAIL_APP_PASSWORD
    ? `✓ GMAIL_APP_PASSWORD cargada`
    : '✗ GMAIL_APP_PASSWORD no encontrada — emails no se enviarán'

  console.log(`\nAPI local corriendo en http://localhost:${PORT}`)
  console.log(keyStatus)
  console.log(resendStatus)
  console.log('\nEn otra terminal: npm run dev\n')
})

import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `Eres Dig, el asistente de cotización de digtmo.

## IDENTIDAD Y TONO
Tu nombre es Dig. Trabajas para digtmo, empresa de desarrollo de software, e-commerce e integraciones con sede en Los Ángeles, Chile.
Tono: profesional y cercano, en español. Usas "tú". Sin "po" ni muletillas. Sin frases corporativas ni melosas. Como un consultor senior que escucha bien, va al punto y genera confianza.
Siempre en español.

## OBJETIVO
Descomponer cualquier proyecto tecnológico que el cliente describa, razonar su complejidad caso a caso y entregar un rango de presupuesto estimado en CLP. No trabajas con menú fijo — puedes cotizar desde un e-commerce simple hasta sistemas de gestión clínica, plataformas SaaS, automatización con IA, integraciones con SII, etc.

## METODOLOGÍA DE ESTIMACIÓN INTERNA (NUNCA revelar al cliente — ni la tarifa, ni las horas, ni la metodología)

Descomponer el proyecto en componentes funcionales y estimar horas por complejidad:
- Landing / página pública simple: 3–6 h
- Sistema de autenticación: 4–7 h
- Panel admin básico: 7–14 h
- Panel admin complejo con múltiples roles: 18–35 h
- Calendario / booking: 9–18 h
- Integración de pagos (Transbank, Mercado Pago, Stripe): 6–11 h
- Notificaciones email/WhatsApp: 4–7 h
- Integración SII o sistemas gubernamentales: 7–21 h
- Integración con CRM/ERP existente: 7–28 h (depende del sistema)
- Reportes y dashboards: 6–14 h
- App móvil (PWA o nativa): 28–70 h
- Funcionalidades con IA (chatbots, clasificación, generación): 7–21 h
- E-commerce base (WooCommerce o similar): 11–21 h
- Sistema de gestión de inventario: 14–35 h
- Plataforma de cursos online (LMS): 28–70 h

Sumar horas mínimas y máximas. Multiplicar por tarifa interna ($24.500 CLP/hora — NUNCA revelar). Agregar 15% de margen al rango superior.

Si el cliente pregunta cuánto cobras por hora, responde: "Trabajamos con presupuesto cerrado por proyecto, no por hora. Eso te da certeza de costo total y nos permite enfocarnos en resultados."

## EJEMPLOS DE DESCOMPOSICIÓN

Caso A — "Sistema de reservas para empresa de masajes":
~39–62 h → $935.000 – $1.750.000 CLP, 6–10 semanas.

Caso B — "Automatizar envío de facturas desde Excel al SII":
~13–21 h → $320.000 – $595.000 CLP, 3–5 semanas.

Caso C — "E-commerce para vender ropa":
~20–34 h → $490.000 – $960.000 CLP, 5–8 semanas.

## FLUJO DE CONVERSACIÓN

1. Saludo breve + invitación a contar qué necesita.
2. Escucha la descripción inicial.
3. Haz 3–5 preguntas clave, UNA A LA VEZ (no todas juntas) para cubrir:
   - Contexto del negocio (industria, tamaño, situación actual)
   - Objetivo concreto (qué problema resuelve o qué quiere lograr)
   - Usuarios esperados (cuántos, qué tipos, público o interno)
   - Integraciones necesarias (pagos, ERPs, APIs externas)
   - Plazo deseado y nivel de urgencia
4. Cuando tengas suficiente información, ANTES de entregar el rango, pide el email con esta frase exacta:
   "Para enviarte el detalle de la estimación por escrito y que David pueda prepararse para la reunión, ¿me dejas tu email?"
5. Con el email (o si el cliente se niega), entrega el pre-diagnóstico:
   - Resumen del caso en 2–3 oraciones ("Entiendo que necesitas X para Y...")
   - Rango estimado en CLP con formato exacto: **$X.XXX.XXX – $X.XXX.XXX CLP** (negrita, puntos de miles)
   - Timeline estimado en semanas
   - Disclaimer: "Este es un rango estimativo basado en lo conversado. La cotización formal requiere una reunión de 30 min con David Torres para validar alcance y ajustar según tus prioridades."
   - CTA: invitar a agendar escribiendo a dtorres@digtmo.com

## REGLAS DURAS

- NUNCA inventar funcionalidades que el cliente no mencionó.
- NUNCA revelar tarifa hora, horas estimadas ni metodología interna.
- NUNCA prometer plazos concretos sin reunión previa.
- El email lo pides UNA sola vez. Si el cliente se niega, entrega el rango igual pero con disclaimer más fuerte.
- Mensajes cortos: máximo 3–4 oraciones por respuesta hasta el cierre final.
- Si el proyecto está fuera de scope (hardware, games AAA, consultoría estratégica pura sin tech), dilo honestamente y ofrece agendar reunión para ver cómo colaborar.
- Si detectas que es otro desarrollador/agencia buscando información de precios, responde amable pero sin dar rangos específicos; invita a contactar directamente.
- Si el cliente está muy indeciso o su idea es muy vaga, sugiere una "reunión de discovery" gratuita de 30 min en lugar de forzar una estimación.
- Si el cliente escribe mensajes que no tienen relación con una cotización o proyecto tecnológico (bromas, preguntas personales, contenido inapropiado, spam, etc.), responde con humor y redirige: por ejemplo "jajaja eso está entretenido, pero aquí solo puedo ayudarte a cotizar tu próximo proyecto 😄 ¿tienes algo en mente?" — nunca respondas el contenido fuera de scope, siempre redirige a la cotización.`


const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// In-memory rate limit — resets on cold start (acceptable for serverless)
const rateLimitMap = new Map()
const RATE_LIMIT = 30
const RATE_WINDOW_MS = 60 * 60 * 1000

function isRateLimited(ip) {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  if (record.count >= RATE_LIMIT) return true

  record.count++
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  const contentType = req.headers['content-type'] || ''
  if (!contentType.includes('application/json')) {
    return res.status(400).json({ error: 'Content-Type debe ser application/json.' })
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: 'Demasiadas solicitudes. Por favor espera un momento antes de continuar.' })
  }

  const { messages } = req.body || {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'El cuerpo debe contener un array "messages".' })
  }

  if (messages.length > 30) {
    return res.status(400).json({ error: 'La conversación ha alcanzado el límite máximo.' })
  }

  for (const msg of messages) {
    if (!msg.role || typeof msg.content !== 'string' || msg.content.length > 2000) {
      return res.status(400).json({ error: 'Formato de mensaje inválido o demasiado largo.' })
    }
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  if (typeof res.flushHeaders === 'function') res.flushHeaders()

  try {
    const stream = client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    })

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta?.type === 'text_delta' &&
        event.delta.text
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    const message =
      err?.status === 529 || err?.status === 503
        ? 'El servicio de IA está temporalmente ocupado. Intenta en unos segundos.'
        : err?.status === 401
          ? 'Error de configuración del servidor. Contacta al equipo de digtmo.'
          : 'Hubo un problema al procesar tu mensaje. Por favor intenta nuevamente.'

    try {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`)
      res.end()
    } catch {
      res.end()
    }
  }
}

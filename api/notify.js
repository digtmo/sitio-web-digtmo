import nodemailer from 'nodemailer'

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'dtorres@digtmo.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function buildHtml({ transcript, clientEmail, quoteRange, firstUserMsg, date }) {
  const rows = transcript
    .map(({ role, content }) => {
      const isUser = role === 'user'
      const bg = isUser ? '#f4f4f5' : '#ffffff'
      const label = isUser ? 'Cliente' : 'Dig'
      const labelColor = isUser ? '#71717a' : '#a855f7'
      const formatted = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      return `
        <tr>
          <td style="padding:14px 20px;background:${bg};border-bottom:1px solid #e4e4e7;vertical-align:top;">
            <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${labelColor};margin-bottom:6px;font-family:monospace;">${label}</div>
            <div style="font-size:14px;line-height:1.6;color:#18181b;white-space:pre-wrap;">${formatted}</div>
          </td>
        </tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td style="background:#0a0a0b;border-radius:12px 12px 0 0;padding:28px 32px;">
            <div style="font-size:20px;font-weight:600;letter-spacing:-0.02em;color:#ffffff;font-family:monospace;">digtmo</div>
            <div style="color:#a1a1aa;font-size:13px;margin-top:4px;">Nueva cotización recibida a través de Dig</div>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:28px 32px;border-left:1px solid #e4e4e7;border-right:1px solid #e4e4e7;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${quoteRange ? `
              <tr><td style="padding-bottom:20px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-family:monospace;margin-bottom:4px;">Rango estimado</div>
                <div style="font-size:22px;font-weight:700;color:#0a0a0b;">${quoteRange}</div>
              </td></tr>` : ''}
              ${clientEmail ? `
              <tr><td style="padding-bottom:16px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-family:monospace;margin-bottom:4px;">Email del cliente</div>
                <div style="font-size:15px;"><a href="mailto:${clientEmail}" style="color:#a855f7;">${clientEmail}</a></div>
              </td></tr>` : ''}
              <tr><td style="padding-bottom:8px;">
                <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-family:monospace;margin-bottom:4px;">Proyecto</div>
                <div style="font-size:14px;color:#3f3f46;">${firstUserMsg.slice(0, 140)}${firstUserMsg.length > 140 ? '…' : ''}</div>
              </td></tr>
              <tr><td>
                <div style="font-size:12px;color:#a1a1aa;font-family:monospace;">${date}</div>
              </td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#fafafa;padding:16px 32px 8px;border-left:1px solid #e4e4e7;border-right:1px solid #e4e4e7;border-top:1px solid #e4e4e7;">
            <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-family:monospace;">Conversación completa</div>
          </td>
        </tr>
        <tr>
          <td style="border-left:1px solid #e4e4e7;border-right:1px solid #e4e4e7;">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          </td>
        </tr>

        <tr>
          <td style="background:#0a0a0b;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
            <div style="font-size:12px;color:#52525b;font-family:monospace;">Enviado automáticamente por Dig · digtmo.com</div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length < 2) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  const transcript = messages.filter((m) => m.content?.trim())
  const firstUserMsg = transcript.find((m) => m.role === 'user')?.content || ''

  const clientEmail =
    transcript
      .filter((m) => m.role === 'user')
      .map((m) => m.content.match(EMAIL_RE))
      .find(Boolean)?.[0] || null

  const lastAssistant = [...transcript].reverse().find((m) => m.role === 'assistant')?.content || ''
  const quoteRange =
    lastAssistant.match(/\$\d{1,3}(?:\.\d{3})+\s*[–—-]\s*\$\d{1,3}(?:\.\d{3})+\s*CLP/)?.[0] || null

  const date = new Date().toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  const subject = `Nueva cotización — ${firstUserMsg.slice(0, 60)}${firstUserMsg.length > 60 ? '…' : ''}`
  const html = buildHtml({ transcript, clientEmail, quoteRange, firstUserMsg, date })

  try {
    await transporter.sendMail({
      from: '"Dig · digtmo" <dtorres@digtmo.com>',
      to: 'dtorres@digtmo.com',
      ...(clientEmail && { replyTo: clientEmail }),
      subject,
      html,
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Gmail error:', err.message)
    res.status(500).json({ error: 'Email no enviado' })
  }
}

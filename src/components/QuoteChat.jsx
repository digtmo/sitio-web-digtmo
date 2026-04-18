import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './QuoteChat.module.css'

const SESSION_KEY = 'digtmo-chat-v1'
const QUOTE_RANGE_RE = /\$\d{1,3}(?:\.\d{3})+\s*[–—-]\s*\$\d{1,3}(?:\.\d{3})+\s*CLP/

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Hola, soy Dig. Te ayudo a estimar tu proyecto en un par de minutos. Cuéntame, ¿qué necesitas resolver?',
}

function buildMailto(firstUserMsg) {
  const subject = encodeURIComponent('Cotización: ' + (firstUserMsg || '').slice(0, 40))
  const body = encodeURIComponent(
    'Hola David Torres, conversé con Dig sobre mi proyecto y me gustaría agendar una reunión.'
  )
  return `mailto:dtorres@digtmo.com?subject=${subject}&body=${body}`
}

// Minimal markdown renderer: bold + line breaks
function MessageText({ content }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g)
  return (
    <p className={styles.msgText}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        return part.split('\n').map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))
      })}
    </p>
  )
}

function TypingIndicator() {
  return (
    <div className={styles.msgAssistant}>
      <div className={styles.bubbleAssistant}>
        <div className={styles.typing} aria-label="Escribiendo...">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

export default function QuoteChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const panelRef = useRef(null)

  // Entry animation delay + load from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (stored) {
      try {
        const { messages: saved } = JSON.parse(stored)
        setMessages(Array.isArray(saved) && saved.length ? saved : [INITIAL_MESSAGE])
      } catch {
        setMessages([INITIAL_MESSAGE])
      }
    } else {
      setMessages([INITIAL_MESSAGE])
    }

    const t = setTimeout(() => setIsMounted(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Persist to sessionStorage (skip mid-stream empty states)
  useEffect(() => {
    if (!messages.length) return
    const last = messages[messages.length - 1]
    if (last.role === 'assistant' && last.content === '') return
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages }))
  }, [messages])

  // Listen for CustomEvent from Nav / Hero
  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('digtmo:open-quote', handler)
    return () => window.removeEventListener('digtmo:open-quote', handler)
  }, [])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  // Focus textarea when panel opens; ESC to close
  useEffect(() => {
    if (!isOpen) return

    const t = setTimeout(() => textareaRef.current?.focus(), 80)

    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const resetConversation = () => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
    sessionStorage.removeItem(SESSION_KEY)
    setTimeout(() => textareaRef.current?.focus(), 80)
  }

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isStreaming) return

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]

    setMessages(history)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    setIsStreaming(true)
    // Placeholder for streaming assistant message
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    let buffer = ''
    const decoder = new TextDecoder()

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!response.ok) {
        let errMsg = 'Hubo un problema. Por favor intenta nuevamente.'
        try {
          const data = await response.json()
          if (data.error) errMsg = data.error
        } catch {}
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: errMsg }
          return updated
        })
        setIsStreaming(false)
        return
      }

      const reader = response.body.getReader()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)

            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + parsed.text,
                }
                return updated
              })
            }

            if (parsed.error) {
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: parsed.error,
                }
                return updated
              })
            }
          } catch {
            // incomplete JSON chunk — ignore
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'No se pudo conectar con el asistente. Verifica tu conexión e intenta nuevamente.',
        }
        return updated
      })
    }

    setIsStreaming(false)
  }, [input, isStreaming, messages])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTextareaChange = (e) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 88) + 'px'
  }

  // Find last non-empty assistant message for quote CTA
  const lastAssistantContent = [...messages]
    .reverse()
    .find((m) => m.role === 'assistant' && m.content)?.content || ''
  const hasQuoteRange = QUOTE_RANGE_RE.test(lastAssistantContent)

  const firstUserMsg = messages.find((m) => m.role === 'user')?.content || ''
  const mailtoHref = buildMailto(firstUserMsg)

  // Show typing indicator when streaming and placeholder is still empty
  const showTyping =
    isStreaming &&
    messages.length > 0 &&
    messages[messages.length - 1].role === 'assistant' &&
    messages[messages.length - 1].content === ''

  return (
    <div className={`${styles.widget} ${isMounted ? styles.widgetVisible : ''}`}>
      {/* ── Chat panel ─────────────────────────────────────── */}
      {isOpen && (
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Asistente de cotización Dig"
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar} aria-hidden="true">D</div>
              <div>
                <p className={styles.avatarName}>Dig</p>
                <p className={styles.avatarRole}>Asistente digtmo</p>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.iconBtn}
                onClick={resetConversation}
                aria-label="Nueva conversación"
                title="Nueva conversación"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                className={styles.iconBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar asistente"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages} role="log" aria-live="polite" aria-label="Mensajes">
            {messages.map((msg, i) => {
              // Don't render the empty placeholder — shown as typing indicator instead
              if (msg.role === 'assistant' && msg.content === '') return null

              const isLastMsg = i === messages.length - 1
              const showCTA =
                isLastMsg &&
                msg.role === 'assistant' &&
                !isStreaming &&
                hasQuoteRange

              return (
                <div
                  key={i}
                  className={msg.role === 'user' ? styles.msgUser : styles.msgAssistant}
                >
                  <div className={msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}>
                    <MessageText content={msg.content} />
                    {showCTA && (
                      <a href={mailtoHref} className={styles.quoteCTA}>
                        Agenda reunión con David Torres →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}

            {showTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe tu proyecto..."
              rows={1}
              disabled={isStreaming}
              aria-label="Escribe tu mensaje"
            />
            <button
              className={styles.sendBtn}
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              aria-label="Enviar mensaje"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Trigger button ──────────────────────────────────── */}
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente de cotización'}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Cotiza tu proyecto</span>
          </>
        )}
      </button>
    </div>
  )
}

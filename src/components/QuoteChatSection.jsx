import { useState, useEffect, useRef, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import styles from './QuoteChatSection.module.css'

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

function MessageText({ content, className }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g)
  return (
    <p className={className}>
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
      <div className={styles.bubble}>
        <div className={styles.typing} aria-label="Escribiendo...">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

export default function QuoteChatSection() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const messagesContainerRef = useRef(null)
  const textareaRef = useRef(null)

  const [headRef, headVisible] = useReveal()
  const [panelRef, panelVisible] = useReveal()

  // Load from sessionStorage on mount
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
  }, [])

  // Persist (skip mid-stream empty states)
  useEffect(() => {
    if (!messages.length) return
    const last = messages[messages.length - 1]
    if (last.role === 'assistant' && last.content === '') return
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages }))
  }, [messages])

  // Scroll solo dentro del contenedor de mensajes, nunca la página
  useEffect(() => {
    const el = messagesContainerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, isStreaming])

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
        buffer = lines.pop()

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
                updated[updated.length - 1] = { role: 'assistant', content: parsed.error }
                return updated
              })
            }
          } catch {}
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

  const lastAssistantContent =
    [...messages].reverse().find((m) => m.role === 'assistant' && m.content)?.content || ''
  const hasQuoteRange = QUOTE_RANGE_RE.test(lastAssistantContent)
  const firstUserMsg = messages.find((m) => m.role === 'user')?.content || ''
  const mailtoHref = buildMailto(firstUserMsg)

  const showTyping =
    isStreaming &&
    messages.length > 0 &&
    messages[messages.length - 1].role === 'assistant' &&
    messages[messages.length - 1].content === ''

  return (
    <section id="cotiza" className={styles.section}>
      <div className="container">

        {/* Section head */}
        <div
          ref={headRef}
          className={`section-head ${styles.head} reveal ${headVisible ? 'visible' : ''}`}
        >
          <p className="section-label">Cotización inteligente</p>
          <h2>Cuéntanos tu proyecto. Obtén un <em>presupuesto</em> en minutos.</h2>
          <p className={styles.headLede}>
            Sin formularios. Dig te hace las preguntas clave, descompone tu proyecto y entrega un rango estimado en CLP.
          </p>
        </div>

        {/* Chat panel */}
        <div
          ref={panelRef}
          className={`${styles.panel} reveal ${panelVisible ? 'visible' : ''}`}
          role="region"
          aria-label="Asistente de cotización"
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar} aria-hidden="true">D</div>
              <div>
                <p className={styles.avatarName}>Dig</p>
                <p className={styles.avatarRole}>Asistente de cotización · digtmo</p>
              </div>
            </div>
            <button
              className={styles.resetBtn}
              onClick={resetConversation}
              aria-label="Nueva conversación"
              title="Nueva conversación"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Nueva conversación
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className={styles.messages} role="log" aria-live="polite" aria-label="Mensajes">
            {messages.map((msg, i) => {
              if (msg.role === 'assistant' && msg.content === '') return null

              const isLastMsg = i === messages.length - 1
              const showCTA = isLastMsg && msg.role === 'assistant' && !isStreaming && hasQuoteRange

              return (
                <div
                  key={i}
                  className={msg.role === 'user' ? styles.msgUser : styles.msgAssistant}
                >
                  {msg.role === 'assistant' && (
                    <div className={styles.avatarSmall} aria-hidden="true">D</div>
                  )}
                  <div className={msg.role === 'user' ? styles.bubbleUser : styles.bubble}>
                    <MessageText
                      content={msg.content}
                      className={styles.msgText}
                    />
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
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe tu proyecto... (Enter para enviar, Shift+Enter para salto de línea)"
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

      </div>
    </section>
  )
}

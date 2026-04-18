# digtmo.com

Sitio web corporativo de Digtmo con asistente conversacional de cotización impulsado por IA. Construido con Vite + React y CSS Modules. El asistente ("Dig") guía al cliente a través de preguntas contextuales, estima presupuestos en CLP y captura el email para derivar a reunión.

## Stack

- **Frontend:** Vite + React (JSX), CSS Modules
- **Serverless:** Vercel Functions (Node.js)
- **IA:** Anthropic API — claude-haiku-4-5-20251001 con streaming SSE y prompt caching

## Desarrollo local

```bash
npm install

# Solo frontend (sin IA — el chat mostrará error de conexión)
npm run dev

# Frontend + funciones serverless (requiere cuenta Vercel y API key)
vercel dev
```

Para usar `vercel dev`, crea un archivo `.env.local` en la raíz:
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

## Deploy

```bash
# 1. Instalar Vercel CLI (si no está)
npm i -g vercel

# 2. Vincular el proyecto (primera vez)
vercel link

# 3. Agregar variable de entorno en Vercel Dashboard
#    Project → Settings → Environment Variables → ANTHROPIC_API_KEY

# 4. Deploy a producción
vercel --prod
```

## Estructura

```
digtmo.com/
├── api/
│   └── quote.js              # Serverless function: streaming SSE + rate limit
├── public/
│   └── logo.png              # Logo del sitio (reemplazar placeholder)
├── src/
│   ├── components/
│   │   ├── QuoteChat.jsx     # Widget flotante del asistente IA
│   │   ├── Nav.jsx           # Navbar (dispara CustomEvent para abrir chat)
│   │   ├── Hero.jsx          # Hero (dispara CustomEvent para abrir chat)
│   │   └── ...               # Resto de secciones
│   ├── data/
│   │   └── content.js        # Todo el contenido editable del sitio
│   ├── hooks/
│   │   └── useReveal.js      # IntersectionObserver para animaciones
│   └── index.css             # Tokens globales y clases compartidas
├── .env.example
├── vercel.json
└── vite.config.js
```

## Editar contenido

Todo el contenido del sitio vive en `src/data/content.js` (proyectos, servicios, proceso, testimonial, contacto).

El system prompt del asistente Dig está en `api/quote.js` como constante `SYSTEM_PROMPT`.

## Cambiar colores del gradiente

En `src/index.css`, editar las variables dentro de `:root`:

```css
--cyan:    #22D3EE;
--purple:  #A855F7;
--magenta: #EC4899;
--grad: linear-gradient(90deg, #22D3EE 0%, #A855F7 50%, #EC4899 100%);
```

## Costos estimados

Claude Haiku 4.5 con prompt caching: ~$0.003–0.007 USD por conversación completa.
500 cotizaciones/mes ≈ $2–4 USD. El prompt caching reduce costo ~90% en llamadas repetidas.

## Logo

Colocar el archivo `logo.png` real en `public/`. Actualmente hay un placeholder generado.

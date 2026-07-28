import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  nome: string
  email: string
}

const CALENDLY_URL = 'https://calendly.com/laurenperesconsultoria/reuniao-1'

export function CalendlyStep({ nome, email }: Props) {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly"]')) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const prefillParams = new URLSearchParams({
    name: nome,
    email: email,
    hide_gdpr_banner: '1',
    hide_event_type_details: '1',
    background_color: '7A5230',
    text_color: 'F5EFE6',
    primary_color: 'B8894B',
  })

  const embedUrl = `${CALENDLY_URL}?${prefillParams.toString()}`

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="text-center mb-6 px-2">
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#F5EFE6',
            opacity: 0.7,
            marginBottom: '8px',
          }}
        >
          Passo Final
        </p>
        <h2
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(18px, 4vw, 24px)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#FFFFFF',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          Escolha o melhor horário para sua reunião com a nossa melhor especialista do time
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: 'rgba(245,239,230,0.7)',
          }}
        >
          A confirmação chega no seu e-mail.
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,245,230,0.08)',
          border: '1px solid rgba(184,137,75,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        <div
          className="calendly-inline-widget w-full"
          data-url={embedUrl}
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </motion.div>
  )
}

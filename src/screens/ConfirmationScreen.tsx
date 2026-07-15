import { useState } from 'react'
import { motion } from 'framer-motion'
import { gerarSlug } from '../utils/slugify'

interface Props {
  nome: string
  whatsapp: string
}

export function ConfirmationScreen({ nome, whatsapp }: Props) {
  const [copiado, setCopiado] = useState(false)

  const primeiroNome = nome.split(' ')[0]
  const slug = gerarSlug(nome, whatsapp)
  const linkBase = window.location.origin + window.location.pathname
  const linkIndicacao = `${linkBase}?ref=${slug}`

  const mensagemWhatsApp = encodeURIComponent(
    `${primeiroNome} aqui! 🌟\n\nVou estar no *Prosperus Day* com a Raquel Mendes no dia 06 de agosto, em Alphaville, SP — um evento exclusivo sobre prosperidade e investimentos.\n\nAcho que você também merece estar lá. As vagas são limitadas e só para convidados.\n\nUsa esse link para confirmar sua presença:\n${linkIndicacao}`
  )
  const urlWhatsApp = `https://wa.me/?text=${mensagemWhatsApp}`

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkIndicacao)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      // fallback para dispositivos sem clipboard API
      const el = document.createElement('textarea')
      el.value = linkIndicacao
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-5 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          background: '#FBF8F2',
          borderRadius: '24px',
          padding: '36px 28px',
          boxShadow: '0 8px 40px rgba(176,138,78,0.15)',
          border: '1px solid #EADFCB',
        }}
      >
        {/* Ícone de confirmação */}
        <div className="flex justify-center mb-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: '#F6EEDD', border: '2px solid #D9BE7E' }}
          >
            <span style={{ fontSize: '30px' }}>✅</span>
          </div>
        </div>

        <h2
          className="text-center mb-1"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: '22px',
            color: '#3D2E1A',
          }}
        >
          Presença confirmada!
        </h2>

        <p
          className="text-center mb-6"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#6B4E26',
            lineHeight: '1.6',
          }}
        >
          Incrível, <strong>{primeiroNome}</strong>! 🎉<br />
          Você está na lista do <strong>Prosperus Day</strong>.<br />
          Nossa equipe vai entrar em contato pelo WhatsApp para confirmar os detalhes.
        </p>

        {/* Evento resumido */}
        <div
          className="rounded-xl px-4 py-3 mb-7"
          style={{ background: '#F6EEDD', border: '1px solid #D9BE7E' }}
        >
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: '#B08A4E', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>
            Prosperus Day
          </p>
          <div className="flex flex-col gap-1.5">
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#4A3B28' }}>📅 06 de agosto de 2025</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#4A3B28' }}>📍 Alphaville, Barueri – SP</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#4A3B28' }}>🔒 Evento exclusivo para convidados</span>
          </div>
        </div>

        {/* Seção de indicação viral */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#3D2E1A', border: '1px solid #5C4530' }}
        >
          <p
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#E7CD86',
              margin: '0 0 6px',
            }}
          >
            Convide alguém do seu nível 🌟
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#C9A77A',
              lineHeight: '1.5',
              margin: '0 0 14px',
            }}
          >
            Este evento é por indicação. Compartilhe seu link exclusivo e convide alguém que também merece estar lá.
          </p>

          {/* Link gerado */}
          <div
            className="rounded-xl px-3 py-2 mb-4 flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,165,78,0.3)' }}
          >
            <span
              className="flex-1 truncate"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#D9BE7E' }}
            >
              {linkIndicacao}
            </span>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={copiarLink}
              aria-label="Copiar meu link de indicação"
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: '#C9A54E',
                color: '#3D2E1A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
              }}
            >
              {copiado ? '✓ Link copiado!' : '🔗 Copiar meu link'}
            </button>

            <a
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Convidar pelo WhatsApp"
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 no-underline"
              style={{
                background: '#25D366',
                color: '#1A1A1A',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Convidar pelo WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      {/* Rodapé */}
      <p
        className="text-center mt-6"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#B08A4E', opacity: 0.6 }}
      >
        Prosperus Day · Raquel Mendes · 06/08/2025
      </p>
    </motion.div>
  )
}

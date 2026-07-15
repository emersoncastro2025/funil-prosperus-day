import { motion } from 'framer-motion'

interface Props {
  nomeIndicador: string | null
  onIniciar: () => void
}

export function LandingScreen({ nomeIndicador, onIniciar }: Props) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-5 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Avatar + nome da Raquel */}
      <motion.div
        className="flex flex-col items-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <div
          className="w-24 h-24 rounded-full overflow-hidden mb-4"
          style={{
            border: '3px solid #D9BE7E',
            boxShadow: '0 4px 20px rgba(176,138,78,0.25)',
          }}
        >
          <img
            src="/raquel.jpg"
            alt="Raquel Mendes"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#B08A4E',
            margin: 0,
          }}
        >
          Raquel Mendes · Prosperidade Financeira
        </p>
      </motion.div>

      {/* Card principal */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          background: '#FBF8F2',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 8px 40px rgba(176,138,78,0.15)',
          border: '1px solid #EADFCB',
        }}
      >
        {/* Convite */}
        {nomeIndicador ? (
          <div
            className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
            style={{ background: '#F6EEDD', border: '1px solid #D9BE7E' }}
          >
            <span style={{ fontSize: '16px' }}>✉️</span>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#6B4E26',
                margin: 0,
              }}
            >
              Você foi convidado(a) por{' '}
              <strong style={{ color: '#3D2E1A' }}>{nomeIndicador}</strong>
            </p>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
            style={{ background: '#F6EEDD', border: '1px solid #D9BE7E' }}
          >
            <span style={{ fontSize: '16px' }}>✨</span>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#6B4E26',
                margin: 0,
              }}
            >
              Você foi convidado(a) para o <strong style={{ color: '#3D2E1A' }}>Prosperus Day</strong>
            </p>
          </div>
        )}

        {/* Título do evento */}
        <h1
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 800,
            fontSize: '26px',
            color: '#3D2E1A',
            margin: '0 0 4px',
            lineHeight: 1.2,
          }}
        >
          Prosperus Day
        </h1>
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            color: '#C9A54E',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            margin: '0 0 20px',
          }}
        >
          com Raquel Mendes
        </p>

        {/* Detalhes */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: '15px' }}>📅</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#4A3B28' }}>
              06 de agosto de 2025
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: '15px' }}>📍</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#4A3B28' }}>
              Alphaville, Barueri – SP
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: '15px' }}>🔒</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#4A3B28' }}>
              Vagas limitadas · Apenas convidados
            </span>
          </div>
        </div>

        {/* Proposta de valor */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#6B4E26',
            lineHeight: '1.6',
            marginBottom: '28px',
          }}
        >
          Um encontro exclusivo sobre como multiplicar patrimônio, proteger o que você construiu e dar o próximo salto financeiro ao seu lado de pessoas do mesmo nível.
        </p>

        {/* CTA */}
        <button
          onClick={onIniciar}
          className="w-full py-4 rounded-2xl font-semibold transition-all duration-200 cursor-pointer"
          style={{
            background: '#C9A54E',
            color: '#3D2E1A',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            border: 'none',
            boxShadow: '0 6px 20px rgba(201,165,78,0.35)',
            letterSpacing: '0.3px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#B89040'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,165,78,0.40)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#C9A54E'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,165,78,0.35)'
          }}
        >
          Confirmar minha presença →
        </button>

        <p
          className="text-center mt-3"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#B08A4E', opacity: 0.6 }}
        >
          Leva menos de 2 minutos
        </p>
      </motion.div>
    </motion.div>
  )
}

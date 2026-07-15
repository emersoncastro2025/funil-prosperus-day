import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LandingScreen } from './screens/LandingScreen'
import { ChatFunnel } from './components/ChatFunnel'
import { ConfirmationScreen } from './screens/ConfirmationScreen'
import { enviarLead } from './utils/webhook'
import type { FormData, Tela } from './types'

// Lê o nome de exibição do parâmetro ?ref= (decodifica slug simples)
function lerIndicador(): { ref: string | null; nomeExibicao: string | null } {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')
  if (!ref) return { ref: null, nomeExibicao: null }

  // Capitaliza primeiro char como nome de exibição amigável
  const nome = ref.charAt(0).toUpperCase() + ref.slice(1).replace(/\d+$/, '')
  return { ref, nomeExibicao: nome || ref }
}

export default function App() {
  const [tela, setTela] = useState<Tela>('landing')
  const [formFinal, setFormFinal] = useState<FormData | null>(null)
  const { ref: indicadorRef, nomeExibicao: nomeIndicador } = lerIndicador()

  // Scroll para o topo ao trocar de tela
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tela])

  async function handleConcluir(dados: FormData) {
    setFormFinal(dados)
    setTela('confirmacao')

    await enviarLead({
      nome: dados.nome,
      faturamento_mensal: dados.faturamento_mensal,
      patrimonio_investido: dados.patrimonio_investido,
      whatsapp: dados.whatsapp,
      instagram: dados.instagram,
      indicado_por: indicadorRef || 'direto',
      origem: indicadorRef ? 'referido' : 'direto',
      data_hora: new Date().toISOString(),
    })
  }

  return (
    <>
      {/* Cabeçalho fixo discreto */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          padding: '12px 16px 10px',
          background: 'rgba(250,246,239,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(217,190,126,0.25)',
        }}
      >
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(9px, 2.2vw, 11px)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#B08A4E',
            margin: 0,
          }}
        >
          Raquel Mendes · Prosperidade Financeira
        </p>
      </header>

      {/* Conteúdo principal com padding pelo header */}
      <main style={{ paddingTop: '40px', minHeight: '100dvh' }}>
        <AnimatePresence mode="wait">
          {tela === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LandingScreen
                nomeIndicador={nomeIndicador}
                onIniciar={() => setTela('chat')}
              />
            </motion.div>
          )}

          {tela === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 8px 40px',
                minHeight: 'calc(100dvh - 40px)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    background: '#FBF8F2',
                    border: '1px solid #EADFCB',
                    boxShadow: '0 8px 40px rgba(176,138,78,0.12)',
                    overflow: 'hidden',
                    minHeight: '480px',
                  }}
                >
                  <ChatFunnel onConcluir={handleConcluir} />
                </div>
              </div>
            </motion.div>
          )}

          {tela === 'confirmacao' && formFinal && (
            <motion.div
              key="confirmacao"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ConfirmationScreen
                nome={formFinal.nome}
                whatsapp={formFinal.whatsapp}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

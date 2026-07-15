import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FormFunnel, type FormValues } from './components/FormFunnel'
import { ConfirmationScreen } from './screens/ConfirmationScreen'
import { enviarLead } from './utils/webhook'

type Tela = 'form' | 'confirmacao'

function lerIndicador(): { ref: string | null; nomeExibicao: string | null } {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')
  if (!ref) return { ref: null, nomeExibicao: null }
  const nome = ref.charAt(0).toUpperCase() + ref.slice(1).replace(/\d+$/, '')
  return { ref, nomeExibicao: nome || ref }
}

export default function App() {
  const [tela, setTela] = useState<Tela>('form')
  const [formFinal, setFormFinal] = useState<FormValues | null>(null)
  const { ref: indicadorRef, nomeExibicao: nomeIndicador } = lerIndicador()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tela])

  async function handleSubmit(values: FormValues) {
    setFormFinal(values)
    setTela('confirmacao')

    await enviarLead({
      nome: values.nome,
      faturamento_mensal: values.faturamento_mensal,
      patrimonio_investido: values.patrimonio_investido,
      whatsapp: values.whatsapp,
      instagram: values.instagram,
      indicado_por: indicadorRef || 'direto',
      origem: indicadorRef ? 'referido' : 'direto',
      data_hora: new Date().toISOString(),
    })
  }

  return (
    <AnimatePresence mode="wait">
      {tela === 'form' && (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FormFunnel
            nomeIndicador={nomeIndicador}
            onSubmit={handleSubmit}
          />
        </motion.div>
      )}

      {tela === 'confirmacao' && formFinal && (
        <motion.div
          key="confirmacao"
          initial={{ opacity: 0, y: 12 }}
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
  )
}

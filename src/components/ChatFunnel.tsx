import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BotBubble, UserBubble } from './ChatBubble'
import { ChipSelector } from './ChipSelector'
import { TextInput } from './TextInput'
import { ProgressBar } from './ProgressBar'
import type { FormData, StepConfig } from '../types'

const STEPS: StepConfig[] = [
  {
    id: 'nome',
    question: () =>
      'Olá! Sou assistente da Raquel Mendes. Vou fazer algumas perguntas rápidas para confirmar sua presença no Prosperus Day. Para começar, como você se chama?',
    inputType: 'text',
    placeholder: 'Seu nome completo',
    field: 'nome',
  },
  {
    id: 'faturamento',
    question: (nome) =>
      `Perfeito, ${nome}! Quanto você fatura ou ganha por mês atualmente?`,
    inputType: 'chips',
    chips: [
      'Até R$ 10 mil',
      'R$ 10 mil – R$ 30 mil',
      'R$ 30 mil – R$ 50 mil',
      'Acima de R$ 50 mil',
    ],
    field: 'faturamento_mensal',
  },
  {
    id: 'patrimonio',
    question: (nome) =>
      `Ótimo, ${nome}! Você já possui algum patrimônio investido hoje?`,
    inputType: 'chips',
    chips: [
      'Ainda não invisto',
      'Até R$ 100 mil',
      'R$ 100 mil – R$ 500 mil',
      'R$ 500 mil – R$ 1 milhão',
      'Acima de R$ 1 milhão',
    ],
    field: 'patrimonio_investido',
  },
  {
    id: 'whatsapp',
    question: (nome) =>
      `Quase lá, ${nome}! Qual o melhor WhatsApp para falarmos?`,
    inputType: 'phone',
    field: 'whatsapp',
  },
  {
    id: 'instagram',
    question: () => 'E qual o seu @ no Instagram? (opcional)',
    inputType: 'instagram',
    placeholder: '@seuinstagram',
    field: 'instagram',
  },
]

const TOTAL_STEPS = STEPS.length

interface HistoryEntry {
  stepIndex: number
  question: string
  answer: string
}

interface Props {
  onConcluir: (dados: FormData) => void
}

export function ChatFunnel({ onConcluir }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [showTyping, setShowTyping] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  const currentStep = STEPS[currentStepIndex]
  const firstName = formData.nome?.split(' ')[0] || ''

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 120)
  }, [history, showTyping, currentStepIndex])

  useEffect(() => {
    setShowTyping(true)
    const t = setTimeout(() => setShowTyping(false), 700)
    return () => clearTimeout(t)
  }, [currentStepIndex])

  async function handleAnswer(answer: string) {
    const step = STEPS[currentStepIndex]
    const nome = currentStepIndex === 0 ? answer.split(' ')[0] : firstName

    setFormData((prev) => ({ ...prev, [step.field]: answer }))
    setHistory((prev) => [
      ...prev,
      {
        stepIndex: currentStepIndex,
        question: step.question(nome),
        answer,
      },
    ])

    await sleep(400)

    if (currentStepIndex < TOTAL_STEPS - 1) {
      setCurrentStepIndex((i) => i + 1)
    } else {
      const dadosCompletos: FormData = {
        nome: formData.nome || '',
        faturamento_mensal: formData.faturamento_mensal || '',
        patrimonio_investido: formData.patrimonio_investido || '',
        whatsapp: formData.whatsapp || '',
        instagram: answer, // último campo é instagram
      }
      onConcluir(dadosCompletos)
    }
  }

  // Instagram é opcional: permite pular
  function handleSkipInstagram() {
    const dadosCompletos: FormData = {
      nome: formData.nome || '',
      faturamento_mensal: formData.faturamento_mensal || '',
      patrimonio_investido: formData.patrimonio_investido || '',
      whatsapp: formData.whatsapp || '',
      instagram: '',
    }
    onConcluir(dadosCompletos)
  }

  function handleBack() {
    if (currentStepIndex === 0) return
    const prevIndex = currentStepIndex - 1
    setHistory((prev) => prev.slice(0, -1))
    setFormData((prev) => {
      const copy = { ...prev }
      delete copy[STEPS[prevIndex].field]
      return copy
    })
    setCurrentStepIndex(prevIndex)
  }

  const progressStep = Math.min(currentStepIndex + 1, TOTAL_STEPS)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <ProgressBar current={progressStep} total={TOTAL_STEPS} />

      <div style={{ padding: '4px 16px 24px', flex: 1, overflowY: 'auto' }}>
        {history.map((entry) => (
          <div key={entry.stepIndex}>
            <BotBubble>{entry.question}</BotBubble>
            <UserBubble>{entry.answer}</UserBubble>
          </div>
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {showTyping ? (
              <BotBubble isTyping />
            ) : (
              <>
                <BotBubble>{currentStep.question(firstName)}</BotBubble>

                {currentStep.inputType === 'chips' && currentStep.chips ? (
                  <div>
                    <ChipSelector options={currentStep.chips} onSelect={handleAnswer} />
                    {currentStepIndex > 0 && (
                      <button
                        onClick={handleBack}
                        style={{
                          marginTop: '10px',
                          fontSize: '12px',
                          color: '#B08A4E',
                          opacity: 0.5,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          display: 'block',
                        }}
                      >
                        ← Voltar
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <TextInput
                      type={currentStep.inputType as 'text' | 'phone' | 'instagram'}
                      placeholder={currentStep.placeholder}
                      onSubmit={handleAnswer}
                      onBack={currentStepIndex > 0 ? handleBack : undefined}
                    />
                    {currentStep.id === 'instagram' && (
                      <button
                        onClick={handleSkipInstagram}
                        style={{
                          marginTop: '8px',
                          fontSize: '12px',
                          color: '#B08A4E',
                          opacity: 0.5,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          display: 'block',
                        }}
                      >
                        Pular esta etapa →
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div ref={bottomRef} style={{ height: '1px' }} />
      </div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

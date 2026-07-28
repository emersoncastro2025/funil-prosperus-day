import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BotBubble, UserBubble } from './ChatBubble'
import { ChipSelector } from './ChipSelector'
import { TextInput } from './TextInput'
import { TransitionOverlay } from './TransitionOverlay'
import { CalendlyStep } from './CalendlyStep'
import { ProgressBar } from './ProgressBar'
import type { FormData, StepConfig } from '../types'

const STEPS: StepConfig[] = [
  {
    id: 'nome',
    question: () =>
      'Olá! Vou te fazer algumas perguntas rápidas para a Raquel entender seu momento financeiro. Para começar, como você se chama?',
    inputType: 'text',
    placeholder: 'Seu nome completo',
    field: 'nome',
  },
  {
    id: 'renda',
    question: (nome) => `Perfeito, ${nome}! Quanto você ganha por mês atualmente?`,
    inputType: 'chips',
    chips: [
      'Até R$5 mil',
      'R$5 mil a R$15 mil',
      'R$15 mil a R$30 mil',
      'R$30 mil a R$50 mil',
      'Acima de R$50 mil',
    ],
    field: 'renda',
  },
  {
    id: 'patrimonio',
    question: (nome) => `Ótimo, ${nome}! Você já possui algum patrimônio investido hoje?`,
    inputType: 'chips',
    chips: [
      'Ainda não invisto',
      'Até R$50 mil',
      'R$50 mil a R$200 mil',
      'R$200 mil a R$500 mil',
      'R$500 mil a R$1 milhão',
      'Acima de R$1 milhão',
    ],
    field: 'patrimonio',
  },
  {
    id: 'whatsapp',
    question: (nome) => `Quase lá, ${nome}! Qual o melhor WhatsApp para falarmos?`,
    inputType: 'phone',
    field: 'whatsapp',
  },
  {
    id: 'email',
    question: () => 'Qual o seu melhor e-mail?',
    inputType: 'email',
    field: 'email',
  },
  {
    id: 'instagram',
    question: () => 'Por fim, qual o seu @ do Instagram?',
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

export function ChatFunnel() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [formData, setFormData] = useState<Partial<FormData>>({})
  const [showTyping, setShowTyping] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const [done, setDone] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  const currentStep = STEPS[currentStepIndex]
  const firstName = formData.nome?.split(' ')[0] || ''

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 120)
  }, [history, showTyping, currentStepIndex, done])

  useEffect(() => {
    if (done) return
    setShowTyping(true)
    const t = setTimeout(() => setShowTyping(false), 900)
    return () => clearTimeout(t)
  }, [currentStepIndex, done])

  async function handleAnswer(answer: string) {
    const step = STEPS[currentStepIndex]

    setFormData((prev) => ({ ...prev, [step.field]: answer }))
    setHistory((prev) => [
      ...prev,
      {
        stepIndex: currentStepIndex,
        question: step.question(firstName || answer),
        answer,
      },
    ])

    setTransitioning(true)
    await sleep(700)
    setTransitioning(false)

    if (currentStepIndex < TOTAL_STEPS - 1) {
      setCurrentStepIndex((i) => i + 1)
    } else {
      setDone(true)
    }
  }

  function handleBack() {
    if (currentStepIndex === 0) return
    setHistory((prev) => prev.slice(0, -1))
    setFormData((prev) => {
      const copy = { ...prev }
      delete copy[STEPS[currentStepIndex - 1].field]
      return copy
    })
    setCurrentStepIndex((i) => i - 1)
  }

  const progressStep = Math.min(currentStepIndex + 1, TOTAL_STEPS)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {!done && <ProgressBar current={progressStep} total={TOTAL_STEPS} />}

      <div style={{ padding: '8px 16px 16px', flex: 1 }}>
        {history.map((entry) => (
          <div key={entry.stepIndex}>
            <BotBubble>{entry.question}</BotBubble>
            <UserBubble>{entry.answer}</UserBubble>
          </div>
        ))}

        {!done && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {showTyping ? (
                <BotBubble isTyping />
              ) : (
                <BotBubble>{currentStep.question(firstName)}</BotBubble>
              )}

              {!showTyping && (
                <>
                  {currentStep.inputType === 'chips' && currentStep.chips ? (
                    <div>
                      <ChipSelector
                        options={currentStep.chips}
                        onSelect={handleAnswer}
                      />
                      {currentStepIndex > 0 && (
                        <button
                          onClick={handleBack}
                          style={{
                            marginTop: '12px',
                            fontSize: '12px',
                            color: '#C9A96A',
                            opacity: 0.6,
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
                    <TextInput
                      type={currentStep.inputType as 'text' | 'phone' | 'email' | 'instagram'}
                      placeholder={currentStep.placeholder}
                      onSubmit={handleAnswer}
                      onBack={currentStepIndex > 0 ? handleBack : undefined}
                    />
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {done && (
          <div style={{ marginTop: '16px' }}>
            <CalendlyStep
              nome={formData.nome || ''}
              email={formData.email || ''}
            />
          </div>
        )}

        <div ref={bottomRef} style={{ height: '1px' }} />
      </div>

      <TransitionOverlay show={transitioning} />
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

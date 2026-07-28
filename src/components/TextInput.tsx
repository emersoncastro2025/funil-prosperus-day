import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePhoneMask } from '../hooks/usePhoneMask'

interface Props {
  type: 'text' | 'phone' | 'email' | 'instagram'
  placeholder?: string
  onSubmit: (value: string) => void
  onBack?: () => void
  autoFocus?: boolean
}

export function TextInput({ type, placeholder, onSubmit, onBack, autoFocus = true }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { applyMask, validate: validatePhone } = usePhoneMask()

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [autoFocus])

  useEffect(() => {
    if (type === 'phone' && !value) {
      setValue('+55 (')
    }
  }, [type])

  function handleChange(raw: string) {
    setError('')
    if (type === 'phone') {
      setValue(applyMask(raw))
    } else {
      setValue(raw)
    }
  }

  function validateAndSubmit() {
    const trimmed = value.trim()

    if (!trimmed || trimmed === '+55 (') {
      setError('Por favor, preencha este campo.')
      return
    }

    if (type === 'phone') {
      if (!validatePhone(trimmed)) {
        setError('Digite um número válido: +55 (XX) XXXXX-XXXX')
        return
      }
    }

    if (type === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setError('Digite um e-mail válido.')
        return
      }
    }

    if (type === 'instagram') {
      const handle = trimmed.startsWith('@') ? trimmed : `@${trimmed}`
      onSubmit(handle)
      return
    }

    onSubmit(trimmed)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') validateAndSubmit()
  }

  const inputPlaceholder =
    placeholder ??
    (type === 'phone' ? '+55 (11) 99999-9999' :
     type === 'email' ? 'seu@email.com' :
     type === 'instagram' ? '@seuinstagram' : 'Digite aqui...')

  const inputMode = type === 'phone' ? 'numeric' : type === 'email' ? 'email' : 'text'
  const inputType = type === 'email' ? 'email' : 'text'

  return (
    <motion.div
      className="mt-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={inputPlaceholder}
          inputMode={inputMode}
          aria-label={inputPlaceholder}
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(255,245,225,0.18)',
            border: error ? '1.5px solid #EF4444' : '1.5px solid rgba(255,220,170,0.3)',
            color: '#F5EFE6',
            fontFamily: 'Inter, sans-serif',
            caretColor: '#C9A96A',
          }}
          onFocus={(e) => {
            e.target.style.border = '1.5px solid #C9A96A'
            e.target.style.boxShadow = '0 0 0 3px rgba(201,169,106,0.2)'
          }}
          onBlur={(e) => {
            e.target.style.border = error ? '1.5px solid #EF4444' : '1.5px solid rgba(255,220,170,0.3)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          onClick={validateAndSubmit}
          aria-label="Enviar"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #B8894B, #C9A96A)',
            boxShadow: '0 4px 12px rgba(184,137,75,0.35)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="#2B1D12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {error && (
        <motion.p
          className="mt-1.5 text-xs"
          style={{ color: '#EF4444', fontFamily: 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {onBack && (
        <button
          onClick={onBack}
          className="mt-2 text-xs transition-opacity cursor-pointer"
          style={{ color: '#C9A96A', opacity: 0.5, fontFamily: 'Inter, sans-serif', background: 'none', border: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5' }}
        >
          ← Voltar
        </button>
      )}
    </motion.div>
  )
}

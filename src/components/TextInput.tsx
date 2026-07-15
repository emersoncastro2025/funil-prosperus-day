import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePhoneMask } from '../hooks/usePhoneMask'

interface Props {
  type: 'text' | 'phone' | 'instagram'
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
     type === 'instagram' ? '@seuinstagram' : 'Digite aqui...')

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
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={inputPlaceholder}
          inputMode={type === 'phone' ? 'numeric' : 'text'}
          aria-label={inputPlaceholder}
          className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            background: '#FFFFFF',
            border: error ? '1.5px solid #EF4444' : '1.5px solid #EADFCB',
            color: '#3D2E1A',
            fontFamily: 'Inter, sans-serif',
            caretColor: '#C9A54E',
          }}
          onFocus={(e) => {
            e.target.style.border = '1.5px solid #C9A54E'
            e.target.style.boxShadow = '0 0 0 3px rgba(201,165,78,0.15)'
          }}
          onBlur={(e) => {
            e.target.style.border = error ? '1.5px solid #EF4444' : '1.5px solid #EADFCB'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          onClick={validateAndSubmit}
          aria-label="Enviar"
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer"
          style={{
            background: '#C9A54E',
            boxShadow: '0 4px 12px rgba(201,165,78,0.30)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="#3D2E1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          style={{ color: '#B08A4E', opacity: 0.5, fontFamily: 'Inter, sans-serif', background: 'none', border: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5' }}
        >
          ← Voltar
        </button>
      )}
    </motion.div>
  )
}

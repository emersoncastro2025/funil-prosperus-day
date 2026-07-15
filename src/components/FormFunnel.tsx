import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePhoneMask } from '../hooks/usePhoneMask'

const FATURAMENTO_OPTIONS = [
  'Selecione uma opção',
  'Até R$ 10 mil',
  'R$ 10 mil – R$ 30 mil',
  'R$ 30 mil – R$ 50 mil',
  'Acima de R$ 50 mil',
]

const PATRIMONIO_OPTIONS = [
  'Selecione uma opção',
  'Ainda não invisto',
  'Até R$ 100 mil',
  'R$ 100 mil – R$ 500 mil',
  'R$ 500 mil – R$ 1 milhão',
  'Acima de R$ 1 milhão',
]

export interface FormValues {
  nome: string
  whatsapp: string
  instagram: string
  faturamento_mensal: string
  patrimonio_investido: string
}

interface Props {
  nomeIndicador: string | null
  onSubmit: (values: FormValues) => void
}

interface Errors {
  nome?: string
  whatsapp?: string
  faturamento_mensal?: string
  patrimonio_investido?: string
}

export function FormFunnel({ nomeIndicador, onSubmit }: Props) {
  const [values, setValues] = useState<FormValues>({
    nome: '',
    whatsapp: '+55 (',
    instagram: '',
    faturamento_mensal: '',
    patrimonio_investido: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const { applyMask, validate: validatePhone } = usePhoneMask()
  const formRef = useRef<HTMLDivElement>(null)

  function set(field: keyof FormValues, value: string) {
    setValues(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const errs: Errors = {}

    if (!values.nome.trim()) errs.nome = 'Informe seu nome completo'
    if (!validatePhone(values.whatsapp)) errs.whatsapp = 'WhatsApp inválido — use (XX) XXXXX-XXXX'
    if (!values.faturamento_mensal) errs.faturamento_mensal = 'Selecione uma faixa'
    if (!values.patrimonio_investido) errs.patrimonio_investido = 'Selecione uma opção'

    setErrors(errs)

    if (Object.keys(errs).length > 0) {
      // Scroll para o primeiro erro
      const firstErrorEl = formRef.current?.querySelector('[data-error="true"]')
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    onSubmit(values)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: '12px',
    border: '1.5px solid #EADFCB',
    background: '#FFFFFF',
    color: '#3D2E1A',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    appearance: 'none',
    WebkitAppearance: 'none',
  }

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    border: '1.5px solid #EF4444',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    color: '#4A3B28',
    marginBottom: '6px',
  }

  const errorStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    color: '#EF4444',
    marginTop: '4px',
  }

  return (
    <div style={{ background: 'linear-gradient(160deg, #FAF6EF 0%, #F3E9D8 55%, #EDE0CB 100%)', minHeight: '100dvh' }}>

      {/* Card hero + form */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 0 48px' }}>

        {/* Foto hero da Raquel */}
        <div style={{ position: 'relative', borderRadius: '0 0 28px 28px', overflow: 'hidden', background: '#EDE0CB' }}>
          <img
            src="/raquel.jpg"
            alt="Raquel Mendes"
            style={{
              width: '100%',
              aspectRatio: '4/5',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
          {/* Gradiente sobre a foto */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(61,46,26,0.55) 100%)',
          }} />
          {/* Branding sobre a foto */}
          <div style={{
            position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
              fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#EBD494', margin: 0,
            }}>
              Raquel Mendes · Prosperidade Financeira
            </p>
          </div>
        </div>

        {/* Corpo do formulário */}
        <div style={{ padding: '32px 20px 0' }}>

          {/* Indicador de quem convidou */}
          {nomeIndicador && (
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#F6EEDD', border: '1px solid #D9BE7E',
                borderRadius: 12, padding: '10px 14px', marginBottom: 24,
              }}
            >
              <span style={{ fontSize: 15 }}>✉️</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B4E26', margin: 0 }}>
                Convite de <strong style={{ color: '#3D2E1A' }}>{nomeIndicador}</strong>
              </p>
            </div>
          )}

          {/* Título */}
          <h1 style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 800,
            fontSize: 'clamp(22px, 6vw, 28px)', color: '#3D2E1A',
            margin: '0 0 12px', lineHeight: 1.2,
          }}>
            Você está sendo convidado{nomeIndicador ? '(a)' : ''}
          </h1>

          {/* Subtítulo */}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B4E26',
            lineHeight: 1.65, margin: '0 0 8px',
          }}>
            Você recebeu um convite exclusivo para o <strong style={{ color: '#3D2E1A' }}>Prosperus Day</strong> —
            um encontro presencial em <strong style={{ color: '#3D2E1A' }}>Alphaville, SP</strong>, no dia <strong style={{ color: '#3D2E1A' }}>06 de agosto</strong>.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B4E26',
            lineHeight: 1.65, margin: '0 0 28px',
          }}>
            Este evento é apenas para convidados. Responda algumas perguntas para confirmar sua presença.
          </p>

          {/* Divisor */}
          <div style={{ height: 1, background: '#EADFCB', marginBottom: 28 }} />

          {/* Formulário */}
          <form onSubmit={handleSubmit} noValidate ref={formRef as React.RefObject<HTMLFormElement>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Nome */}
              <div data-error={!!errors.nome}>
                <label htmlFor="nome" style={labelStyle}>Nome completo</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={values.nome}
                  onChange={e => set('nome', e.target.value)}
                  style={errors.nome ? errorInputStyle : inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#C9A54E'; e.target.style.boxShadow = '0 0 0 3px rgba(201,165,78,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = errors.nome ? '#EF4444' : '#EADFCB'; e.target.style.boxShadow = 'none' }}
                />
                {errors.nome && <p style={errorStyle}>{errors.nome}</p>}
              </div>

              {/* WhatsApp */}
              <div data-error={!!errors.whatsapp}>
                <label htmlFor="whatsapp" style={labelStyle}>WhatsApp (com DDD)</label>
                <input
                  id="whatsapp"
                  type="tel"
                  inputMode="numeric"
                  placeholder="+55 (11) 99999-9999"
                  value={values.whatsapp}
                  onChange={e => set('whatsapp', applyMask(e.target.value))}
                  style={errors.whatsapp ? errorInputStyle : inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#C9A54E'; e.target.style.boxShadow = '0 0 0 3px rgba(201,165,78,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = errors.whatsapp ? '#EF4444' : '#EADFCB'; e.target.style.boxShadow = 'none' }}
                />
                {errors.whatsapp && <p style={errorStyle}>{errors.whatsapp}</p>}
              </div>

              {/* Instagram (opcional) */}
              <div>
                <label htmlFor="instagram" style={labelStyle}>
                  Instagram <span style={{ fontWeight: 400, color: '#B08A4E', fontSize: 12 }}>(opcional)</span>
                </label>
                <input
                  id="instagram"
                  type="text"
                  placeholder="@seuinstagram"
                  value={values.instagram}
                  onChange={e => set('instagram', e.target.value)}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#C9A54E'; e.target.style.boxShadow = '0 0 0 3px rgba(201,165,78,0.15)' }}
                  onBlur={e => { e.target.style.borderColor = '#EADFCB'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              {/* Faturamento */}
              <div data-error={!!errors.faturamento_mensal}>
                <label htmlFor="faturamento" style={labelStyle}>Qual seu faturamento mensal atual?</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="faturamento"
                    value={values.faturamento_mensal}
                    onChange={e => set('faturamento_mensal', e.target.value === 'Selecione uma opção' ? '' : e.target.value)}
                    style={{
                      ...(errors.faturamento_mensal ? errorInputStyle : inputStyle),
                      paddingRight: 40,
                      cursor: 'pointer',
                      background: '#FFFFFF',
                      color: values.faturamento_mensal ? '#3D2E1A' : '#A08060',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#C9A54E'; e.target.style.boxShadow = '0 0 0 3px rgba(201,165,78,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = errors.faturamento_mensal ? '#EF4444' : '#EADFCB'; e.target.style.boxShadow = 'none' }}
                  >
                    {FATURAMENTO_OPTIONS.map(opt => (
                      <option key={opt} value={opt === 'Selecione uma opção' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {/* Chevron */}
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#B08A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {errors.faturamento_mensal && <p style={errorStyle}>{errors.faturamento_mensal}</p>}
              </div>

              {/* Patrimônio */}
              <div data-error={!!errors.patrimonio_investido}>
                <label htmlFor="patrimonio" style={labelStyle}>Você possui patrimônio investido?</label>
                <div style={{ position: 'relative' }}>
                  <select
                    id="patrimonio"
                    value={values.patrimonio_investido}
                    onChange={e => set('patrimonio_investido', e.target.value === 'Selecione uma opção' ? '' : e.target.value)}
                    style={{
                      ...(errors.patrimonio_investido ? errorInputStyle : inputStyle),
                      paddingRight: 40,
                      cursor: 'pointer',
                      background: '#FFFFFF',
                      color: values.patrimonio_investido ? '#3D2E1A' : '#A08060',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#C9A54E'; e.target.style.boxShadow = '0 0 0 3px rgba(201,165,78,0.15)' }}
                    onBlur={e => { e.target.style.borderColor = errors.patrimonio_investido ? '#EF4444' : '#EADFCB'; e.target.style.boxShadow = 'none' }}
                  >
                    {PATRIMONIO_OPTIONS.map(opt => (
                      <option key={opt} value={opt === 'Selecione uma opção' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="#B08A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {errors.patrimonio_investido && <p style={errorStyle}>{errors.patrimonio_investido}</p>}
              </div>

              {/* Botão */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: 'none',
                  background: loading ? '#D9BE7E' : '#3D2E1A',
                  color: '#EBD494',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: 8,
                  boxShadow: '0 6px 20px rgba(61,46,26,0.25)',
                  transition: 'background 0.2s',
                }}
              >
                {loading ? 'Confirmando...' : 'Confirmar presença'}
              </motion.button>

            </div>
          </form>

          {/* Rodapé */}
          <p style={{
            textAlign: 'center', marginTop: 24,
            fontFamily: 'Inter, sans-serif', fontSize: 12,
            color: '#B08A4E', opacity: 0.6,
          }}>
            Suas informações estão seguras e serão usadas apenas para confirmar sua presença no evento.
          </p>
          <p style={{
            textAlign: 'center', marginTop: 8,
            fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
            fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase',
            color: '#B08A4E', opacity: 0.5,
          }}>
            © Raquel Mendes · Alphaville · 06/08
          </p>

        </div>
      </div>
    </div>
  )
}

export interface FormData {
  nome: string
  faturamento_mensal: string
  patrimonio_investido: string
  whatsapp: string
  instagram: string
}

export type Tela = 'landing' | 'chat' | 'confirmacao'

export type StepId = 'nome' | 'faturamento' | 'patrimonio' | 'whatsapp' | 'instagram'

export interface StepConfig {
  id: StepId
  question: (nome?: string) => string
  inputType: 'text' | 'chips' | 'phone' | 'instagram'
  chips?: string[]
  placeholder?: string
  field: keyof FormData
}

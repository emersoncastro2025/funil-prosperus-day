export interface FormData {
  nome: string
  renda: string
  patrimonio: string
  whatsapp: string
  email: string
  instagram: string
}

export type StepId = 'nome' | 'renda' | 'patrimonio' | 'whatsapp' | 'email' | 'instagram'

export interface ChatMessage {
  role: 'bot' | 'user'
  text: string
}

export interface StepConfig {
  id: StepId
  question: (nome?: string) => string
  inputType: 'text' | 'chips' | 'phone' | 'email' | 'instagram'
  chips?: string[]
  placeholder?: string
  field: keyof FormData
}

// ─── Ponto de integração com webhook ─────────────────────────────────────────
// Configure a variável de ambiente VITE_WEBHOOK_URL no arquivo .env
// para enviar os dados a um webhook (n8n, Make, API própria, etc.)
// Ex: VITE_WEBHOOK_URL=https://hook.eu1.make.com/seu-endpoint

export interface LeadPayload {
  nome: string
  faturamento_mensal: string
  patrimonio_investido: string
  whatsapp: string
  instagram: string
  indicado_por: string
  origem: 'referido' | 'direto'
  data_hora: string
}

export async function enviarLead(payload: LeadPayload): Promise<void> {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL as string | undefined

  if (!webhookUrl) {
    // Fallback: apenas loga no console quando não há webhook configurado
    console.log('[Funil Prosperus Day] Lead capturado:', payload)
    return
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[Funil Prosperus Day] Erro ao enviar lead:', err)
  }
}

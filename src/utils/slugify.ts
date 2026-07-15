export function gerarSlug(nome: string, whatsapp: string): string {
  const primeiroNome = nome.split(' ')[0].toLowerCase()
  const normalizado = primeiroNome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')

  const digitos = whatsapp.replace(/\D/g, '').slice(-4)

  return `${normalizado}${digitos}`
}

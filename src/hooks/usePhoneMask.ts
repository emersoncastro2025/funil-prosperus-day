import { useCallback } from 'react'

export function usePhoneMask() {
  const applyMask = useCallback((value: string): string => {
    // Remove tudo exceto dígitos
    const digits = value.replace(/\D/g, '')

    // Limita a 13 dígitos (55 + 2 DDD + 9 número)
    const d = digits.slice(0, 13)

    if (d.length === 0) return ''
    if (d.length <= 2) return `+${d}`
    if (d.length <= 4) return `+${d.slice(0, 2)} (${d.slice(2)}`
    if (d.length <= 9) return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4)}`
    if (d.length <= 13) {
      return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`
    }
    return value
  }, [])

  const validate = useCallback((value: string): boolean => {
    const digits = value.replace(/\D/g, '')
    // +55 (XX) XXXXX-XXXX = 13 dígitos
    return digits.length === 13 && digits.startsWith('55')
  }, [])

  return { applyMask, validate }
}

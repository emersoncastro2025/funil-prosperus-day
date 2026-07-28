import { motion } from 'framer-motion'

interface Props {
  options: string[]
  onSelect: (value: string) => void
  selected?: string
}

export function ChipSelector({ options, onSelect, selected }: Props) {
  return (
    <motion.div
      className="flex flex-wrap gap-2 mt-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {options.map((option) => {
        const isSelected = selected === option
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{
              background: isSelected
                ? 'linear-gradient(135deg, #B8894B, #C9A96A)'
                : 'rgba(255,255,255,0.13)',
              border: isSelected
                ? '1px solid #C9A96A'
                : '1px solid rgba(255,255,255,0.2)',
              color: isSelected ? '#2B1D12' : '#F5EFE6',
              fontFamily: 'Inter, sans-serif',
              boxShadow: isSelected ? '0 4px 12px rgba(184,137,75,0.3)' : 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
          >
            {option}
          </button>
        )
      })}
    </motion.div>
  )
}

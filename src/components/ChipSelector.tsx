import { motion } from 'framer-motion'

interface Props {
  options: string[]
  onSelect: (value: string) => void
}

export function ChipSelector({ options, onSelect }: Props) {
  return (
    <motion.div
      className="flex flex-wrap gap-2 mt-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          aria-label={option}
          className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{
            background: '#F6EEDD',
            border: '1px solid #D9BE7E',
            color: '#4A3B28',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E7CD86'
            e.currentTarget.style.borderColor = '#C9A54E'
            e.currentTarget.style.transform = 'scale(1.03)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F6EEDD'
            e.currentTarget.style.borderColor = '#D9BE7E'
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = '#E7CD86'
            e.currentTarget.style.borderColor = '#C9A54E'
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = '#F6EEDD'
            e.currentTarget.style.borderColor = '#D9BE7E'
          }}
        >
          {option}
        </button>
      ))}
    </motion.div>
  )
}

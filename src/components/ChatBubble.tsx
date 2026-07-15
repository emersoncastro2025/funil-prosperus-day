import { motion } from 'framer-motion'
import { Avatar } from './Avatar'

interface BotBubbleProps {
  children?: React.ReactNode
  isTyping?: boolean
}

interface UserBubbleProps {
  children: React.ReactNode
}

export function BotBubble({ children, isTyping = false }: BotBubbleProps) {
  return (
    <motion.div
      className="flex items-end gap-2.5 mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Avatar />
      <div
        className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed"
        style={{
          background: '#FFFFFF',
          border: '1px solid #EADFCB',
          color: '#4A3B28',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 2px 10px rgba(176,138,78,0.10)',
        }}
      >
        {isTyping ? <TypingIndicator /> : children}
      </div>
    </motion.div>
  )
}

export function UserBubble({ children }: UserBubbleProps) {
  return (
    <motion.div
      className="flex justify-end mb-3"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div
        className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-3 text-sm font-medium"
        style={{
          background: 'linear-gradient(135deg, #EBD494, #DFC074)',
          color: '#3D2E1A',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 2px 10px rgba(176,138,78,0.20)',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: '#C9A54E' }} />
      <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: '#C9A54E' }} />
      <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: '#C9A54E' }} />
    </div>
  )
}

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
          background: 'rgba(255,245,225,0.2)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,220,170,0.22)',
          color: '#F5EFE6',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
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
          background: 'linear-gradient(135deg, #B8894B, #C9A96A)',
          color: '#2B1D12',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 4px 16px rgba(184,137,75,0.3)',
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
      <span className="typing-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#C9A96A' }} />
      <span className="typing-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#C9A96A' }} />
      <span className="typing-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#C9A96A' }} />
    </div>
  )
}

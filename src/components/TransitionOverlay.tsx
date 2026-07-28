import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  show: boolean
}

export function TransitionOverlay({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(74,46,24,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 50,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#F5EFE6',
                letterSpacing: '1px',
                marginBottom: '8px',
              }}
            >
              Registrando
            </p>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
              <span className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A96A', display: 'inline-block' }} />
              <span className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A96A', display: 'inline-block' }} />
              <span className="typing-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9A96A', display: 'inline-block' }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

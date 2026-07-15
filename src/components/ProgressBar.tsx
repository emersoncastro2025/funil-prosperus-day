import { motion } from 'framer-motion'

interface Props {
  current: number
  total: number
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.min((current / total) * 100, 100)

  return (
    <div className="w-full px-4 pt-3 pb-2">
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '3px', background: '#EADFCB' }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #B08A4E, #DFC074)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <p
        className="mt-1.5 text-right"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.5px',
          color: '#B08A4E',
          opacity: 0.7,
        }}
      >
        {current} / {total}
      </p>
    </div>
  )
}

import { motion, AnimatePresence } from 'framer-motion'

/**
 * variant:
 *  "dot"    — pulsing amber dot in the corner (subtle)
 *  "pill"   — floating "Tap here →" pill label
 *  "glow"   — soft glow ring around the parent element
 *  "arrow"  — animated bouncing arrow pointing right
 */
export default function DemoHint({ variant = 'dot', label = 'Tap here', show = true }) {
  if (!show) return null

  if (variant === 'dot') {
    return (
      <span className="relative inline-flex w-2.5 h-2.5 flex-shrink-0">
        <motion.span
          className="absolute inline-flex w-full h-full rounded-full bg-amber-400 opacity-70"
          animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-amber-400" />
      </span>
    )
  }

  if (variant === 'pill') {
    return (
      <motion.span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-white text-[10px] font-semibold shadow-sm flex-shrink-0"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label} →
      </motion.span>
    )
  }

  if (variant === 'arrow') {
    return (
      <motion.span
        className="text-amber-400 font-bold text-2xl flex-shrink-0"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        →
      </motion.span>
    )
  }

  if (variant === 'glow') {
    return (
      <motion.span
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ boxShadow: ['0 0 0 0px rgba(251,191,36,0.4)', '0 0 0 6px rgba(251,191,36,0)', '0 0 0 0px rgba(251,191,36,0.4)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    )
  }

  return null
}

import { BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EvidenceChip({ evidenceId, label = 'Evidence', onClick, hint = false }) {
  return (
    <span className="inline-flex items-center gap-4 flex-shrink-0">
      {hint && (
        <motion.span
          className="whitespace-nowrap px-2 py-0.5 rounded-full bg-amber-400 text-white text-[10px] font-semibold shadow-md pointer-events-none"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          tap me →
        </motion.span>
      )}
      <button
        onClick={() => onClick?.(evidenceId)}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-medium hover:bg-blue-100 transition-colors active:scale-95"
      >
        <BookOpen size={10} />
        {label}
      </button>
    </span>
  )
}

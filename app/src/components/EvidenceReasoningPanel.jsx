import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EvidenceReasoningPanel({ steps }) {
  const [open, setOpen] = useState(false)

  if (!steps || steps.length === 0) return null

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-950/30" />
            ))}
          </div>
          <p className="text-[12px] font-semibold text-slate-600">Evidence-first learning memory</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} className="text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100">
              {steps.map((step, i) => (
                <div key={step.step} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center mt-0.5">
                    <span className="text-[9px] font-bold text-white">{step.step}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-slate-700 leading-none">{step.label}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-slate-300 pt-1 border-t border-slate-100">
                Powered by the same evidence-first retrieval principles demonstrated in ContextForge.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../lib/DemoContext'
import { ExternalLink, GitBranch, X } from 'lucide-react'

export default function DemoModal() {
  const { introComplete, modalDismissed, setModalDismissed } = useDemo()
  const visible = introComplete && !modalDismissed

  function dismiss() {
    setModalDismissed(true)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
          style={{ backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(15, 23, 42, 0.55)' }}
            onClick={dismiss}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full sm:max-w-[420px] bg-white sm:rounded-2xl rounded-t-2xl overflow-hidden shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">V</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-950 leading-none">VidyaPaatha Passport</p>
                  <p className="text-[10px] text-slate-400 leading-none mt-0.5">Phase 1 Prototype</p>
                </div>
              </div>
              <button
                onClick={dismiss}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-3">
              <div>
                <h2 className="text-base font-semibold text-blue-950">Prototype Demonstration</h2>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-1.5">
                  This is a Phase 1 clickable prototype of VidyaPaatha Passport. The educational workflows,
                  teacher experience, intervention memory system, and AI-assisted recommendations shown here
                  are demonstrated using simulated classroom data to showcase the intended product experience.
                </p>
              </div>

              <div className="border-t border-slate-100" />

              <div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  The underlying evidence-first retrieval and reasoning engine has already been developed
                  as <span className="font-semibold text-blue-950">ContextForge</span> — our hybrid retrieval
                  and citation-based RAG platform.
                </p>

                <div className="mt-3 space-y-2">
                  <a
                    href="https://ansonsajugeorge.online/context-forge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 leading-none">Live Demo</p>
                      <p className="text-[11px] text-slate-400 leading-none mt-0.5 truncate">ansonsajugeorge.online/context-forge</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Anson-Saju-George/context-forge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-green-300 hover:border-green-200 hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors">
                      <GitBranch size={14} className="text-slate-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-700 group-hover:text-green-700 leading-none">GitHub Repository</p>
                      <p className="text-[11px] text-slate-400 leading-none mt-0.5 truncate">Anson-Saju-George/context-forge</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 pt-1 flex flex-col gap-2">
              <button
                onClick={dismiss}
                className="w-full h-12 bg-blue-950 text-white rounded-xl text-sm font-semibold hover:bg-blue-900 active:scale-[0.98] transition-all"
              >
                Continue to Demo
              </button>
              <a
                href="https://ansonsajugeorge.online/context-forge/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 flex items-center justify-center border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                View ContextForge
              </a>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <p className="text-[11px] text-slate-300 text-center">
                Prototype created for SahAI for Shiksha 2026 — Challenge 2.4
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

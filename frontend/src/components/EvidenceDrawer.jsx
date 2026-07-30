import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle2, MinusCircle, HelpCircle } from 'lucide-react'
import { EVIDENCE_RECORDS } from '../data/interventions'

const OUTCOME_CONFIG = {
  'Associated with improvement': {
    icon: CheckCircle2,
    className: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  'No observed change': {
    icon: MinusCircle,
    className: 'text-slate-500 bg-slate-50 border-slate-200',
  },
  'Insufficient evidence': {
    icon: HelpCircle,
    className: 'text-slate-400 bg-slate-50 border-slate-100',
  },
  'Current gap identified': {
    icon: AlertCircle,
    className: 'text-amber-600 bg-amber-50 border-amber-200',
  },
}

const FALLBACK_RECORD = {
  title: 'Class 6A · Term 2 — Current Assessment',
  date: 'January 2025',
  body: 'This student showed concept-level errors on the current assessment. Gap identified from question-level analysis.',
  outcomeLabel: 'Current gap identified',
  disclaimer: 'Gap diagnosis is based on question-level error analysis for this assessment only.',
  questions: [],
}

function DrawerContent({ evidenceId, onClose }) {
  const record = EVIDENCE_RECORDS[evidenceId] ?? FALLBACK_RECORD
  const outcomeConfig = OUTCOME_CONFIG[record.outcomeLabel] ?? OUTCOME_CONFIG['Insufficient evidence']
  const OutcomeIcon = outcomeConfig.icon

  return (
    <AnimatePresence>
      {evidenceId && (
        <motion.div
          className="fixed inset-0 flex items-end justify-center"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-[430px] bg-white rounded-t-2xl overflow-hidden shadow-2xl max-h-[85svh] flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-2 pb-3 border-b border-slate-100 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wide leading-none">Source Evidence</p>
                <h3 className="text-[15px] font-semibold text-blue-950 leading-snug mt-1">{record.title}</h3>
                <p className="text-[12px] text-slate-400 mt-0.5">{record.date}</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

              {/* Outcome badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12px] font-semibold ${outcomeConfig.className}`}>
                <OutcomeIcon size={13} />
                {record.outcomeLabel}
              </div>

              {/* Narrative */}
              <p className="text-[13px] text-slate-600 leading-relaxed">{record.body}</p>

              {/* Question comparison table */}
              {record.questions.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Question-level detail
                  </p>
                  <div className="space-y-2">
                    {record.questions.map((q, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl px-3 py-2.5">
                        <p className="text-[12px] font-medium text-slate-700 leading-snug">{q.q}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-slate-400 font-medium">Before</span>
                            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${q.pre.startsWith('✓') ? 'bg-emerald-100 text-emerald-700' : q.pre === 'Pending' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-600'}`}>
                              {q.pre}
                            </span>
                          </div>
                          {q.post !== null && (
                            <>
                              <span className="text-slate-200">→</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-slate-400 font-medium">After</span>
                                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${q.post?.startsWith('✓') ? 'bg-emerald-100 text-emerald-700' : q.post === 'Pending' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-600'}`}>
                                  {q.post}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="flex items-start gap-2 bg-slate-50 rounded-xl px-3 py-3">
                <AlertCircle size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed italic">{record.disclaimer}</p>
              </div>

            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-full h-11 bg-slate-100 text-slate-700 rounded-xl text-[13px] font-semibold hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function EvidenceDrawer({ evidenceId, onClose }) {
  return createPortal(
    <DrawerContent evidenceId={evidenceId} onClose={onClose} />,
    document.body
  )
}

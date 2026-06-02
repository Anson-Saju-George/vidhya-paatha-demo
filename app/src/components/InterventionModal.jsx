import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { INTERVENTION_TYPES } from '../data/interventions'

const STATUSES = [
  { id: 'tried',           label: 'Tried' },
  { id: 'partially_tried', label: 'Partially tried' },
  { id: 'not_tried',       label: 'Not tried' },
]

function ModalContent({ onClose, onSave, recommendedActionId }) {
  const [selectedId, setSelectedId] = useState(recommendedActionId ?? null)
  const [status, setStatus]         = useState('tried')
  const [note, setNote]             = useState('')
  const [confirmed, setConfirmed]   = useState(false)

  const effectiveId = selectedId ?? recommendedActionId ?? null

  function handleSave() {
    const id = selectedId ?? recommendedActionId
    if (!id) return
    const action = INTERVENTION_TYPES.find(t => t.id === id)
    onSave?.({ actionId: id, action: action?.label ?? id, status, note })
    setConfirmed(true)
    setTimeout(() => onClose(), 1000)
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-14 px-6">
        <CheckCircle2 size={56} className="text-emerald-500" />
        <p className="text-[17px] font-semibold text-blue-950">Logged.</p>
        <p className="text-[13px] text-slate-400 text-center leading-relaxed max-w-[260px]">
          I'll check whether this helped at the next assessment.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-slate-200" />
      </div>

      <div className="flex items-center justify-between px-5 pt-2 pb-3 border-b border-slate-100">
        <div>
          <p className="text-[15px] font-semibold text-blue-950">Log what I did</p>
          <p className="text-[12px] text-slate-400 mt-0.5">Tap an action · tap Save</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-5 py-4 space-y-4 max-h-[58svh] overflow-y-auto">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            What did you try?{' '}
            <span className="text-blue-500 normal-case font-normal">Tap one</span>
          </p>

          {INTERVENTION_TYPES.filter(t => t.id !== 'other').map(type => {
            const isRecommended = type.id === recommendedActionId
            const isSelected    = type.id === effectiveId
            return (
              <button
                key={type.id}
                onClick={() => setSelectedId(type.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                  isSelected
                    ? 'border-blue-950 bg-blue-950'
                    : isRecommended
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-[13px] font-semibold leading-none ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                      {type.label}
                    </p>
                    {isRecommended && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] mt-0.5 leading-snug ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    {type.description}
                  </p>
                </div>
                {isSelected && <CheckCircle2 size={18} className="text-white flex-shrink-0" />}
              </button>
            )
          })}

          <button
            onClick={() => setSelectedId('other')}
            className={`w-full px-4 py-3 rounded-xl border-2 text-left transition-all ${
              selectedId === 'other'
                ? 'border-blue-950 bg-blue-950'
                : 'border-dashed border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className={`text-[13px] font-medium ${selectedId === 'other' ? 'text-white' : 'text-slate-400'}`}>
              Other
            </p>
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status</p>
          <div className="flex gap-2">
            {STATUSES.map(s => (
              <button
                key={s.id}
                onClick={() => setStatus(s.id)}
                className={`flex-1 h-9 rounded-xl text-[12px] font-semibold border transition-all ${
                  status === s.id
                    ? 'bg-blue-950 text-white border-blue-950'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {status === 'not_tried' && (
            <p className="text-[11px] text-slate-400 italic px-1">
              Marked as not tried. Stays in the record but won't count as evidence.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            Note <span className="normal-case font-normal">(optional)</span>
          </p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder={'One line, e.g. "tried with small group only"'}
            rows={2}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-700 placeholder:text-slate-300 resize-none focus:outline-none focus:border-blue-300 transition-colors"
          />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-slate-100">
        <button
          onClick={handleSave}
          style={{ height: 52 }}
          className="w-full rounded-2xl text-[15px] font-semibold bg-blue-950 text-white hover:bg-blue-900 active:scale-[0.98] transition-all shadow-sm"
        >
          Save
        </button>
      </div>
    </>
  )
}

export default function InterventionModal({ open, onClose, onSave, prefillActionId, recommendedActionId }) {
  const effectiveRecommended = prefillActionId ?? recommendedActionId

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-end justify-center"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full bg-white rounded-t-2xl shadow-2xl"
            style={{ maxWidth: 430, zIndex: 1 }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <ModalContent
              key={open ? 'open' : 'closed'}
              onClose={onClose}
              onSave={onSave}
              recommendedActionId={effectiveRecommended}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

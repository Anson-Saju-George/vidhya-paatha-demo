import { CheckCircle2, MinusCircle, HelpCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import EvidenceChip from './EvidenceChip'
import { EVIDENCE_STATES } from '../data/interventions'

const STATE_CONFIG = {
  [EVIDENCE_STATES.IMPROVEMENT]: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-500',
    rowClass: 'bg-emerald-50 border-emerald-100',
    label: 'Associated with improvement',
    labelClass: 'text-emerald-700',
  },
  [EVIDENCE_STATES.NO_CHANGE]: {
    icon: MinusCircle,
    iconClass: 'text-slate-400',
    rowClass: 'bg-slate-50 border-slate-100',
    label: 'No observed change',
    labelClass: 'text-slate-500',
  },
  [EVIDENCE_STATES.INSUFFICIENT]: {
    icon: HelpCircle,
    iconClass: 'text-slate-300',
    rowClass: 'bg-white border-slate-100',
    label: 'Insufficient evidence',
    labelClass: 'text-slate-400',
  },
  [EVIDENCE_STATES.NOT_TRIED]: {
    icon: XCircle,
    iconClass: 'text-slate-300',
    rowClass: 'bg-white border-slate-100',
    label: 'Not tried',
    labelClass: 'text-slate-400',
  },
}

function InterventionRow({ entry, onEvidenceOpen, onUseThis, hint = false }) {
  const config = STATE_CONFIG[entry.evidenceState] ?? STATE_CONFIG[EVIDENCE_STATES.INSUFFICIENT]
  const Icon = config.icon

  return (
    <div className={`flex items-start gap-3 px-3.5 py-3 rounded-xl border ${config.rowClass}`}>
      <Icon size={16} className={`${config.iconClass} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-slate-700 leading-none">{entry.action}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`text-[11px] font-medium ${config.labelClass}`}>{config.label}</span>
          {entry.confidence && (
            <span className="text-[11px] text-slate-300">· Confidence: {entry.confidence}</span>
          )}
          <span className="text-[11px] text-slate-300">· {entry.term}</span>
        </div>
        {entry.note ? (
          <p className="text-[11px] text-slate-400 mt-1 italic">{entry.note}</p>
        ) : null}
        <div className="flex items-center gap-2 mt-2">
          <EvidenceChip evidenceId={entry.evidenceId} label="Evidence" onClick={onEvidenceOpen} />
          {entry.evidenceState === EVIDENCE_STATES.IMPROVEMENT && (
            <button
              onClick={() => onUseThis?.(entry)}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Use this
            </button>
          )}
          {hint && (
            <motion.span
              className="text-amber-400 font-bold text-2xl ml-1"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              ←
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function WhatWorkedBeforePanel({ history, onEvidenceOpen, onUseThis }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
        <p className="text-[13px] font-semibold text-slate-500 mb-1">What Worked Before</p>
        <p className="text-[12px] text-slate-400 leading-relaxed">
          This fills over time as you log what you try with this student.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl px-4 py-4 space-y-3">
      <div>
        <p className="text-[13px] font-semibold text-slate-700">What Worked Before</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Based on prior interventions and follow-up assessments.
        </p>
      </div>
      <div className="space-y-2">
        {history.map((entry, i) => (
          <InterventionRow
            key={entry.id}
            entry={entry}
            onEvidenceOpen={onEvidenceOpen}
            onUseThis={onUseThis}
            hint={i === 0}
          />
        ))}
      </div>
      <p className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-50 pt-2">
        Association, not proven causation. Evidence drawn from this student's assessment history only.
      </p>
    </div>
  )
}

import { Lightbulb, AlertCircle } from 'lucide-react'
import EvidenceChip from './EvidenceChip'

export default function WhatToTryNextPanel({ recommendation, onEvidenceOpen, onLogAction }) {
  if (!recommendation) {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb size={15} className="text-slate-300" />
          <p className="text-[13px] font-semibold text-slate-400">What To Try Next</p>
        </div>
        <p className="text-[12px] text-slate-400 leading-relaxed">
          No grounded recommendation yet. Recommendations will appear once there is enough assessment and intervention history for this student.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-blue-950 rounded-2xl px-4 py-4 space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb size={15} className="text-blue-300" />
        <p className="text-[13px] font-semibold text-blue-200 uppercase tracking-wide">What To Try Next</p>
      </div>

      {/* Recommended action */}
      <div className="bg-white/10 rounded-xl px-3.5 py-3">
        <p className="text-[15px] font-semibold text-white leading-snug">
          {recommendation.action}
        </p>
        <p className="text-[12px] text-blue-200 leading-relaxed mt-1.5">
          {recommendation.rationale}
        </p>
      </div>

      {/* Hypothesis note */}
      {recommendation.hypothesis && (
        <div className="flex items-start gap-2 px-1">
          <AlertCircle size={12} className="text-amber-300 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-amber-200 leading-relaxed italic">
            {recommendation.hypothesis}
          </p>
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <EvidenceChip
            evidenceId={recommendation.evidenceId}
            label="Source evidence"
            onClick={onEvidenceOpen}
          />
          <span className="text-[11px] text-blue-300">
            Confidence: {recommendation.confidence}
          </span>
        </div>
      </div>

      {/* Log CTA */}
      <button
        onClick={onLogAction}
        className="w-full h-11 bg-white text-blue-950 rounded-xl text-[13px] font-semibold hover:bg-blue-50 active:scale-[0.98] transition-all"
      >
        Log what I did →
      </button>
    </div>
  )
}

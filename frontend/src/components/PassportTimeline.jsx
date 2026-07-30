import { AlertTriangle, Zap, Star, TrendingUp } from 'lucide-react'
import EvidenceChip from './EvidenceChip'

const TYPE_CONFIG = {
  gap: {
    icon: AlertTriangle,
    iconClass: 'text-amber-500',
    dotClass: 'bg-amber-100 border-amber-300',
  },
  intervention: {
    icon: Zap,
    iconClass: 'text-blue-500',
    dotClass: 'bg-blue-100 border-blue-300',
  },
  current: {
    icon: Star,
    iconClass: 'text-blue-950',
    dotClass: 'bg-blue-950 border-blue-950',
  },
  improvement: {
    icon: TrendingUp,
    iconClass: 'text-emerald-600',
    dotClass: 'bg-emerald-100 border-emerald-400',
  },
}

export default function PassportTimeline({ entries, onEvidenceOpen }) {
  if (!entries || entries.length === 0) return null

  return (
    <div className="bg-white border border-slate-100 rounded-2xl px-4 py-4">
      <p className="text-[13px] font-semibold text-slate-700 mb-4">Learning Timeline</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-100" />

        <div className="space-y-4">
          {entries.map((entry, i) => {
            const isFirst = i === 0
            const config = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.gap
            const Icon = config.icon
            const isLast = i === entries.length - 1

            return (
              <div key={i} className="flex items-start gap-3 relative">
                {/* Dot */}
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 bg-white ${config.dotClass}`}>
                  <Icon size={13} className={config.iconClass} />
                </div>

                {/* Content */}
                <div className={`flex-1 min-w-0 pt-1 ${isLast ? '' : 'pb-0'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[12px] text-slate-400 leading-none">{entry.term} · {entry.date}</p>
                      <p className={`text-[13px] font-medium mt-0.5 leading-snug ${entry.type === 'current' ? 'text-blue-950 font-semibold' : entry.type === 'improvement' ? 'text-emerald-700 font-semibold' : 'text-slate-700'}`}>
                        {entry.event}
                      </p>
                    </div>
                    {entry.evidenceId && (
                      <EvidenceChip
                        evidenceId={entry.evidenceId}
                        label="Source"
                        onClick={onEvidenceOpen}
                        hint={isFirst}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

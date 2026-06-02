import { AlertTriangle, Users, TrendingUp } from 'lucide-react'
import { CLASS_ANALYSIS } from '../data/assessments'

export default function ClassReteachBanner() {
  return (
    <div className="space-y-2">
      {/* Primary reteach alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={18} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-amber-600 uppercase tracking-wide leading-none">
              Today's priority
            </p>
            <p className="text-[15px] font-semibold text-amber-900 leading-snug mt-1">
              {CLASS_ANALYSIS.classReteachHeadline}
            </p>
          </div>
        </div>
      </div>

      {/* Small group alert */}
      <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <Users size={15} className="text-red-600" />
        </div>
        <p className="text-[13px] text-red-800 font-medium leading-snug flex-1">
          {CLASS_ANALYSIS.smallGroupNote}
        </p>
      </div>

      {/* Class strength */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <TrendingUp size={15} className="text-emerald-600" />
        </div>
        <p className="text-[13px] text-emerald-800 font-medium leading-snug flex-1">
          {CLASS_ANALYSIS.strengthNote}
        </p>
      </div>
    </div>
  )
}

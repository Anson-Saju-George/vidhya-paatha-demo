import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import GapBadge from './GapBadge'
import { CONCEPTS } from '../data/students'

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

const AVATAR_COLOURS = {
  [CONCEPTS.PLACE_VALUE]:   'bg-amber-100 text-amber-700',
  [CONCEPTS.BORROWING]:     'bg-red-100 text-red-700',
  [CONCEPTS.FRACTIONS]:     'bg-orange-100 text-orange-700',
  [CONCEPTS.WORD_PROBLEMS]: 'bg-orange-100 text-orange-700',
  [CONCEPTS.MULTIPLICATION]:'bg-sky-100 text-sky-700',
  [CONCEPTS.DIVISION]:      'bg-sky-100 text-sky-700',
  [CONCEPTS.RATIO]:         'bg-purple-100 text-purple-700',
  [CONCEPTS.NONE]:          'bg-emerald-100 text-emerald-700',
}

export default function StudentCard({ student, compact = false }) {
  const navigate = useNavigate()
  const avatarStyle = AVATAR_COLOURS[student.currentGap] ?? 'bg-slate-100 text-slate-600'

  return (
    <button
      onClick={() => navigate(`/students/${student.id}`)}
      className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors text-left"
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${avatarStyle}`}>
        {initials(student.name)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[14px] font-semibold text-slate-800 leading-none">{student.name}</p>
          {student.seeded && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-medium">
              Illustrative
            </span>
          )}
        </div>
        {!compact && (
          <p className="text-[12px] text-slate-400 mt-0.5">{student.class} · {student.subject}</p>
        )}
        <div className="mt-1.5">
          <GapBadge concept={student.currentGap} />
        </div>
      </div>

      <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
    </button>
  )
}

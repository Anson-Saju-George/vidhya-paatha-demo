import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ChevronRight } from 'lucide-react'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'
import GapBadge from '../components/GapBadge'
import { STUDENTS, CONCEPTS } from '../data/students'

// Order gaps by urgency for grouping
const GROUP_ORDER = [
  CONCEPTS.BORROWING,
  CONCEPTS.WORD_PROBLEMS,
  CONCEPTS.FRACTIONS,
  CONCEPTS.PLACE_VALUE,
  CONCEPTS.MULTIPLICATION,
  CONCEPTS.DIVISION,
  CONCEPTS.RATIO,
  CONCEPTS.NONE,
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function StudentRow({ student, navigate }) {
  return (
    <button
      onClick={() => navigate(`/students/${student.id}`)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left relative overflow-hidden ${
        student.seeded ? 'hover:bg-amber-50' : 'hover:bg-slate-50'
      }`}
    >
      {student.seeded && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          animate={{ boxShadow: ['inset 0 0 0px 0px rgba(251,191,36,0)', 'inset 0 0 15px 4px rgba(251,191,36,0.4)', 'inset 0 0 0px 0px rgba(251,191,36,0)'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
      )}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative ${student.seeded ? 'bg-amber-100' : 'bg-slate-100'}`}>
        <span className={`text-[11px] font-semibold ${student.seeded ? 'text-amber-700' : 'text-slate-500'}`}>
          {initials(student.name)}
        </span>
      </div>
      <p className="flex-1 text-[13px] text-slate-700 font-medium">{student.name}</p>
      {student.seeded && (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-semibold mr-1">
          Demo
        </span>
      )}
      <GapBadge concept={student.currentGap} />
      <ChevronRight size={13} className="text-slate-300 ml-1 flex-shrink-0" />
    </button>
  )
}

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.05 } } },
  item: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

export default function Students() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return STUDENTS
    return STUDENTS.filter(s => s.name.toLowerCase().includes(q))
  }, [query])

  // Group filtered students by concept
  const groups = useMemo(() => {
    return GROUP_ORDER
      .map(concept => ({
        concept,
        students: filtered.filter(s => s.currentGap === concept),
      }))
      .filter(g => g.students.length > 0)
  }, [filtered])

  return (
    <AppShell title="Students">
      <PageTransition>
        <div className="px-4 pt-4 pb-6 space-y-4">

          {/* Meta + search */}
          <div>
            <p className="text-[13px] text-slate-400">Class 6A · Mathematics · {STUDENTS.length} students</p>
            <div className="mt-3 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search students…"
                className="w-full h-11 pl-10 pr-3 rounded-2xl border border-slate-200 text-[14px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-blue-300 transition-colors"
              />
            </div>
          </div>

          {/* Grouped list */}
          {groups.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[13px] text-slate-400">No students match "{query}".</p>
            </div>
          ) : (
            <motion.div
              key={query}
              variants={stagger.container}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              {groups.map(group => (
                <motion.div key={group.concept} variants={stagger.item}>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <GapBadge concept={group.concept} />
                    <span className="text-[12px] text-slate-400 font-medium">{group.students.length}</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-50">
                    {group.students.map(student => (
                      <StudentRow key={student.id} student={student} navigate={navigate} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </PageTransition>
    </AppShell>
  )
}

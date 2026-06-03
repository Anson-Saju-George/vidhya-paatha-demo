import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, TrendingUp } from 'lucide-react'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'
import GapBadge from '../components/GapBadge'
import { CLASS_ANALYSIS } from '../data/assessments'
import { getStudentsByGap } from '../data/students'

const COLOUR_MAP = {
  amber:  { bar: 'bg-amber-400',  text: 'text-amber-700',  soft: 'bg-amber-50' },
  orange: { bar: 'bg-orange-400', text: 'text-orange-700', soft: 'bg-orange-50' },
  red:    { bar: 'bg-red-400',    text: 'text-red-700',    soft: 'bg-red-50' },
  green:  { bar: 'bg-emerald-400',text: 'text-emerald-700',soft: 'bg-emerald-50' },
}

function ConceptRow({ group, total }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const students = getStudentsByGap(group.concept)
  const colour = COLOUR_MAP[group.colour] ?? COLOUR_MAP.amber
  const pct = Math.round((group.studentsAffected / total) * 100)

  // Strength group — flat, non-expandable
  if (group.priority === 'strength') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <TrendingUp size={16} className="text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-emerald-800">{group.concept}</p>
          <p className="text-[12px] text-emerald-600 mt-0.5">{group.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-4 py-3.5 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <GapBadge concept={group.concept} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[15px] font-bold text-slate-700">{group.studentsAffected}</span>
            <span className="text-[12px] text-slate-400">/ {total}</span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={15} className="text-slate-300 ml-1" />
            </motion.div>
          </div>
        </div>

        {/* Proportion bar */}
        <div className="mt-2.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${colour.bar}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
        <p className="text-[12px] text-slate-400 mt-1.5 leading-snug">{group.description}</p>
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
            <div className="border-t border-slate-100 divide-y divide-slate-50">
              {students.map(student => (
                <button
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
                    student.seeded ? 'bg-amber-50/50 hover:bg-amber-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${student.seeded ? 'bg-amber-100' : 'bg-slate-100'}`}>
                    <span className={`text-[11px] font-semibold ${student.seeded ? 'text-amber-700' : 'text-slate-500'}`}>
                      {student.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <p className="flex-1 text-[13px] text-slate-700 font-medium">{student.name}</p>
                  {student.seeded && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-semibold mr-1">
                      Demo
                    </span>
                  )}
                  <ChevronRight size={13} className="text-slate-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

export default function ClassInsights() {
  const total = CLASS_ANALYSIS.totalStudents

  return (
    <AppShell title="Class Insights">
      <PageTransition>
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
          className="px-4 pt-4 pb-6 space-y-4"
        >

          {/* Meta */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] text-slate-400">Class 6A · Mathematics · {total} students</p>
            <p className="text-[12px] text-slate-300 mt-0.5">Grouped by shared concept gap — not by score.</p>
          </motion.div>

          {/* Headline priority */}
          <motion.div variants={stagger.item}>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-4">
              <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wide leading-none">
                Top priority this week
              </p>
              <p className="text-[15px] font-semibold text-amber-900 leading-snug mt-1.5">
                {CLASS_ANALYSIS.classReteachHeadline}
              </p>
            </div>
          </motion.div>

          {/* Concept groups */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2.5">
              Concept groups
            </p>
            <div className="space-y-2.5">
              {CLASS_ANALYSIS.conceptBreakdown.map(group => (
                <motion.div key={group.concept} variants={stagger.item}>
                  <ConceptRow group={group} total={total} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.div variants={stagger.item}>
            <p className="text-[12px] text-slate-300 text-center px-4 leading-relaxed">
              Tap a concept to see which students need it. A student scoring well may still carry a foundational gap — these groups prioritise the concept, not the mark.
            </p>
          </motion.div>

        </motion.div>
      </PageTransition>
    </AppShell>
  )
}

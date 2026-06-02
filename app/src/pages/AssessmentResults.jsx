import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EvidenceDrawer from '../components/EvidenceDrawer'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Users } from 'lucide-react'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'
import ClassReteachBanner from '../components/ClassReteachBanner'
import GapBadge from '../components/GapBadge'
import EvidenceChip from '../components/EvidenceChip'
import { CLASS_ANALYSIS } from '../data/assessments'
import { getStudentsByGap, CONCEPTS } from '../data/students'
import DemoHint from '../components/DemoHint'

const COLOUR_MAP = {
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  orange: 'bg-orange-50 border-orange-200 text-orange-700',
  red: 'bg-red-50 border-red-200 text-red-700',
  green: 'bg-emerald-50 border-emerald-200 text-emerald-700',
}

const PRIORITY_ICON = {
  reteach: '📢',
  targeted: '🎯',
  small_group: '👥',
  strength: '✓',
}

// Word Problems is the demo entry point to Ananya
const IS_DEMO_GROUP = (concept) => concept === CONCEPTS.WORD_PROBLEMS

function ConceptGroup({ group, onEvidenceOpen }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const students = getStudentsByGap(group.concept)
  const colourClass = COLOUR_MAP[group.colour] ?? COLOUR_MAP.amber
  const isDemo = IS_DEMO_GROUP(group.concept)

  if (group.priority === 'strength') {
    return (
      <div className={`border rounded-2xl px-4 py-3 flex items-center gap-3 ${colourClass}`}>
        <span className="text-base">{PRIORITY_ICON[group.priority]}</span>
        <div className="flex-1">
          <p className="text-[13px] font-semibold">{group.concept}</p>
          <p className="text-[12px] opacity-70 mt-0.5">{group.label}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative border border-slate-100 rounded-2xl overflow-hidden bg-white">
      {/* Glow ring variant — wraps the whole card */}
      {isDemo && !open && <DemoHint variant="glow" />}

      {/* Group header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="text-base flex-shrink-0">{PRIORITY_ICON[group.priority]}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <GapBadge concept={group.concept} />
            <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${colourClass}`}>
              {group.label}
            </span>
            {/* Pill variant */}
            {isDemo && !open && <DemoHint variant="pill" label="Tap to expand" />}
          </div>
          <p className="text-[12px] text-slate-400 mt-1 leading-snug">{group.description}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Dot variant */}
          {isDemo && !open && <DemoHint variant="dot" />}
          <span className="text-[13px] font-semibold text-slate-600">{group.studentsAffected}</span>
          <Users size={13} className="text-slate-300" />
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={15} className="text-slate-300" />
          </motion.div>
        </div>
      </button>

      {/* Expanded student list */}
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
                student.seeded ? (
                  /* ── Ananya row ── */
                  <button
                    key={student.id}
                    onClick={() => navigate(`/students/${student.id}`)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 active:bg-amber-100 transition-colors text-left relative overflow-hidden"
                  >
                    {/* Inward border glow */}
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{ border: '1px solid rgba(251,191,36,0.25)' }}
                      animate={{ boxShadow: ['inset 0 0 0px 0px rgba(251,191,36,0)', 'inset 0 0 15px 5px rgba(251,191,36,0.45)', 'inset 0 0 0px 0px rgba(251,191,36,0)'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
                    />
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 relative">
                      <span className="text-[11px] font-semibold text-amber-700">
                        {student.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <p className="flex-1 text-[13px] text-slate-700 font-medium">{student.name}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-600 font-semibold mr-1">
                      Demo student
                    </span>
                    <motion.span
                      className="text-amber-500 font-bold text-2xl flex-shrink-0"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.span>
                  </button>
                ) : (
                  /* ── Regular student row ── */
                  <button
                    key={student.id}
                    onClick={() => navigate(`/students/${student.id}`)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 active:bg-slate-100 transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {student.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <p className="flex-1 text-[13px] text-slate-700 font-medium">{student.name}</p>
                    <EvidenceChip evidenceId="ev-current" label="Source" onClick={onEvidenceOpen} />
                    <ChevronRight size={13} className="text-slate-300 ml-1" />
                  </button>
                )
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

export default function AssessmentResults() {
  const navigate = useNavigate()
  const [evidenceId, setEvidenceId] = useState(null)

  return (
    <>
    <AppShell title="Assessment Results" back={() => navigate(-1)}>
      <PageTransition>
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
          className="px-4 pt-4 pb-6 space-y-4"
        >

          {/* Meta */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] text-slate-400">Class 6A · Mathematics · January 2025</p>
            <p className="text-[12px] text-slate-300 mt-0.5">45 students · 10 questions</p>
          </motion.div>

          {/* Class reteach banner */}
          <motion.div variants={stagger.item}>
            <ClassReteachBanner />
          </motion.div>

          {/* Concept groups */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2.5">
              By concept
            </p>
            <div className="space-y-2.5">
              {CLASS_ANALYSIS.conceptBreakdown.map(group => (
                <motion.div key={group.concept} variants={stagger.item}>
                  <ConceptGroup group={group} onEvidenceOpen={setEvidenceId} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tap hint */}
          <motion.div variants={stagger.item}>
            <p className="text-[12px] text-slate-300 text-center">
              Tap a concept group to see students · Tap a student to open their Passport
            </p>
          </motion.div>

        </motion.div>
      </PageTransition>
    </AppShell>
    <EvidenceDrawer evidenceId={evidenceId} onClose={() => setEvidenceId(null)} />
    </>
  )
}

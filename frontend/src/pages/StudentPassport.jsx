import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'
import GapBadge from '../components/GapBadge'
import EvidenceDrawer from '../components/EvidenceDrawer'
import InterventionModal from '../components/InterventionModal'
import SeededDataLabel from '../components/SeededDataLabel'
import WhatToTryNextPanel from '../components/WhatToTryNextPanel'
import WhatWorkedBeforePanel from '../components/WhatWorkedBeforePanel'
import PassportTimeline from '../components/PassportTimeline'
import EvidenceReasoningPanel from '../components/EvidenceReasoningPanel'
import { getStudentById } from '../data/students'
import { useDemo } from '../lib/DemoContext'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function StudentPassport() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getInterventionsFor, logIntervention } = useDemo()

  // Evidence drawer state — wired in Step 6
  const [evidenceId, setEvidenceId] = useState(null)
  // Intervention modal state — wired in Step 7
  const [interventionOpen, setInterventionOpen] = useState(false)
  const [prefillAction, setPrefillAction] = useState(null)

  const student = getStudentById(id)
  if (!student) {
    return (
      <AppShell title="Student Passport" back={() => navigate(-1)}>
        <div className="px-4 py-10 text-center">
          <p className="text-slate-400 text-sm">Student not found.</p>
        </div>
      </AppShell>
    )
  }

  // Merge seeded history with any live-logged interventions
  const liveInterventions = getInterventionsFor(student.id)
  const fullHistory = [...student.interventionHistory, ...liveInterventions]

  function handleUseThis(entry) {
    setPrefillAction(entry.actionId)
    setInterventionOpen(true)
  }

  return (
    <>
      <AppShell title={student.name} back={() => navigate(-1)}>
        <PageTransition>
          <motion.div
            variants={stagger.container}
            initial="initial"
            animate="animate"
            className="px-4 pt-4 pb-32 space-y-4"
          >

            {/* Student header card */}
            <motion.div variants={stagger.item}>
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">{initials(student.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[17px] font-semibold text-blue-950 leading-tight">{student.name}</h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">{student.class} · {student.subject}</p>
                  <div className="mt-2">
                    <GapBadge concept={student.currentGap} size="lg" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seeded label */}
            {student.seeded && (
              <motion.div variants={stagger.item}>
                <SeededDataLabel />
              </motion.div>
            )}

            {/* What To Try Next */}
            <motion.div variants={stagger.item}>
              <WhatToTryNextPanel
                recommendation={student.recommendation}
                onEvidenceOpen={setEvidenceId}
                onLogAction={() => { setPrefillAction(null); setInterventionOpen(true) }}
              />
            </motion.div>

            {/* Evidence reasoning panel (Ananya only) */}
            {student.reasoningSteps?.length > 0 && (
              <motion.div variants={stagger.item}>
                <EvidenceReasoningPanel steps={student.reasoningSteps} />
              </motion.div>
            )}

            {/* What Worked Before */}
            <motion.div variants={stagger.item}>
              <WhatWorkedBeforePanel
                history={fullHistory}
                onEvidenceOpen={setEvidenceId}
                onUseThis={handleUseThis}
              />
            </motion.div>

            {/* Timeline */}
            {student.timeline?.length > 0 && (
              <motion.div variants={stagger.item}>
                <PassportTimeline
                  entries={student.timeline}
                  onEvidenceOpen={setEvidenceId}
                />
              </motion.div>
            )}

            {/* No history empty state */}
            {!student.seeded && fullHistory.length === 0 && (
              <motion.div variants={stagger.item}>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-5 text-center">
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    No history yet. As you log what you try with this student, their learning journey and what worked will build here.
                  </p>
                </div>
              </motion.div>
            )}

          </motion.div>
        </PageTransition>
      </AppShell>

      {/* Sticky Log button — always visible */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-2 z-30 pointer-events-none">
        <div className="relative pointer-events-auto">
          {/* Rippling wave rings that travel outward and fade */}
          {[0, 0.75, 1.5].map((delay, i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-2xl border-2 border-amber-400 pointer-events-none"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.14], opacity: [0.55, 0] }}
              transition={{ duration: 2.25, repeat: Infinity, ease: 'easeOut', delay }}
            />
          ))}
          {/* Breathing amber glow shadow underneath */}
          <motion.span
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0px 0px rgba(251,191,36,0.0)',
                '0 0 22px 4px rgba(251,191,36,0.45)',
                '0 0 0px 0px rgba(251,191,36,0.0)',
              ],
            }}
            transition={{ duration: 2.25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.button
            onClick={() => { setPrefillAction(null); setInterventionOpen(true) }}
            className="relative w-full bg-blue-950 text-white rounded-2xl text-[14px] font-semibold shadow-xl hover:bg-blue-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden"
            style={{ height: 52 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Sheen sweep across the button */}
            <motion.span
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.35), transparent)' }}
              animate={{ x: ['-150%', '450%'] }}
              transition={{ duration: 2.25, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
            />
            <span className="relative">Log what I did</span>
          </motion.button>
        </div>
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer evidenceId={evidenceId} onClose={() => setEvidenceId(null)} />

      {/* Intervention Modal */}
      <InterventionModal
        open={interventionOpen}
        onClose={() => { setInterventionOpen(false); setPrefillAction(null) }}
        onSave={(entry) => logIntervention(student.id, entry)}
        prefillActionId={prefillAction}
        recommendedActionId={student.recommendation?.actionId}
      />
    </>
  )
}

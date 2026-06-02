import { useNavigate } from 'react-router-dom'
import { Upload, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'
import ClassReteachBanner from '../components/ClassReteachBanner'
import StudentCard from '../components/StudentCard'
import { NEEDS_ATTENTION } from '../data/students'
import { useDemo } from '../lib/DemoContext'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { assessmentAnalyzed } = useDemo()

  return (
    <AppShell>
      <PageTransition>
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
          className="px-4 pt-4 pb-6 space-y-5"
        >
          <motion.div variants={stagger.item}>
            <p className="text-[13px] text-slate-400 font-medium">Class 6A · Mathematics</p>
            <h2 className="text-xl font-semibold text-blue-950 leading-tight mt-0.5">
              Good morning, Meera
            </h2>
          </motion.div>

          <motion.div variants={stagger.item}>
            <ClassReteachBanner />
          </motion.div>

          <motion.div variants={stagger.item}>
            <button
              onClick={() => navigate('/upload')}
              className="w-full flex items-center justify-between bg-blue-950 text-white rounded-2xl px-5 py-4 hover:bg-blue-900 active:scale-[0.98] transition-all shadow-sm"
            >
              <div>
                <p className="text-[13px] font-medium text-blue-300 leading-none">New assessment</p>
                <p className="text-[15px] font-semibold leading-snug mt-1">
                  {assessmentAnalyzed ? 'Upload another assessment' : "Upload & analyse today's assessment"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Upload size={20} className="text-white" />
              </div>
            </button>
          </motion.div>

          <motion.div variants={stagger.item}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide">
                Needs attention
              </p>
              <button
                onClick={() => navigate('/students')}
                className="flex items-center gap-0.5 text-[12px] text-blue-600 font-medium"
              >
                All 45 <ChevronRight size={13} />
              </button>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-50">
              {NEEDS_ATTENTION.slice(0, 6).map(student => (
                <StudentCard key={student.id} student={student} compact />
              ))}
            </div>
          </motion.div>

          <motion.div variants={stagger.item}>
            <p className="text-[12px] text-slate-300 text-center">
              Last assessment: Class 6A · Jan 2025 · 45 students
            </p>
          </motion.div>

        </motion.div>
      </PageTransition>
    </AppShell>
  )
}

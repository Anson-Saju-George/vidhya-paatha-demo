import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, ChevronRight, ScanLine } from 'lucide-react'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'
import { DEMO_ASSESSMENT } from '../data/assessments'
import { STUDENTS } from '../data/students'
import { useDemo } from '../lib/DemoContext'

const ANALYSIS_STEPS = [
  'Parsing student responses…',
  'Mapping answers to concepts…',
  'Identifying concept-level gaps…',
  'Building class view…',
  'Done.',
]

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

// Scan speed: one chip every ~60ms → 45 chips ≈ 2.7s total
const SCAN_INTERVAL = 60

export default function Upload() {
  const navigate = useNavigate()
  const { setAssessmentAnalyzed } = useDemo()

  const [scanning, setScanning] = useState(false)
  const [scannedCount, setScannedCount] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  const allScanned = scannedCount === STUDENTS.length

  function handleScan() {
    if (scanning || allScanned) return
    setScanning(true)
  }

  // Drive the scan counter
  useEffect(() => {
    if (!scanning || allScanned) return
    const t = setInterval(() => {
      setScannedCount(n => {
        if (n >= STUDENTS.length) { clearInterval(t); return n }
        return n + 1
      })
    }, SCAN_INTERVAL)
    return () => clearInterval(t)
  }, [scanning, allScanned])

  function handleAnalyze() {
    setAnalyzing(true)
    setStepIndex(0)
    ANALYSIS_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setStepIndex(i)
        if (i === ANALYSIS_STEPS.length - 1) {
          setTimeout(() => {
            setAssessmentAnalyzed(true)
            navigate('/upload/results')
          }, 600)
        }
      }, i * 600)
    })
  }

  return (
    <AppShell title="Upload Assessment">
      <PageTransition>
        <div className="px-4 pt-4 pb-6 space-y-4">

          <div>
            <p className="text-[13px] text-slate-400">Class 6A · Mathematics · January 2025</p>
            <p className="text-[12px] text-slate-300 mt-0.5">45 student response sheets</p>
          </div>

          {/* Scan zone */}
          <div
            onClick={handleScan}
            className={`relative rounded-2xl border-2 transition-colors overflow-hidden
              ${allScanned
                ? 'border-emerald-200 bg-emerald-50/40 cursor-default'
                : scanning
                ? 'border-blue-200 bg-blue-50/30 cursor-default'
                : 'border-dashed border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-300 hover:bg-blue-50/40'
              }`}
          >
            {/* Idle */}
            <AnimatePresence>
              {!scanning && !allScanned && (
                <motion.div
                  className="flex flex-col items-center justify-center gap-2 py-10"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center">
                    <ScanLine size={22} className="text-slate-400" />
                  </div>
                  <p className="text-[14px] font-semibold text-slate-600">Tap to scan response sheets</p>
                  <p className="text-[12px] text-slate-400">{DEMO_ASSESSMENT.title}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Student grid */}
            {scanning && (
              <motion.div
                className="p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Scan header */}
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <div className="flex items-center gap-1.5">
                    {!allScanned ? (
                      <Loader2 size={13} className="text-blue-600 animate-spin" />
                    ) : (
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    )}
                    <p className="text-[12px] font-semibold text-slate-600">
                      {allScanned ? 'All sheets scanned' : `Scanning… ${scannedCount} / ${STUDENTS.length}`}
                    </p>
                  </div>
                  {/* Moving scan line */}
                  {!allScanned && (
                    <motion.div
                      className="text-[10px] text-blue-400 font-mono"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      ▌reading
                    </motion.div>
                  )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-5 gap-1.5">
                  {STUDENTS.map((student, i) => {
                    const isScanned = i < scannedCount
                    const isActive = i === scannedCount - 1

                    return (
                      <motion.div
                        key={student.id}
                        className={`relative rounded-lg px-1.5 py-1.5 text-center transition-colors duration-150 ${
                          isScanned
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-white border border-slate-100'
                        }`}
                        animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className={`text-[9px] font-bold leading-none ${isScanned ? 'text-emerald-600' : 'text-slate-300'}`}>
                          {initials(student.name)}
                        </p>
                        {isScanned && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          >
                            <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(scannedCount / STUDENTS.length) * 100}%` }}
                    transition={{ duration: 0.06 }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {['45 students', 'Class 6A', `${DEMO_ASSESSMENT.totalQuestions} questions`, 'January 2025'].map(label => (
              <span key={label} className="px-2.5 py-1 rounded-full bg-slate-100 text-[12px] text-slate-500 font-medium">
                {label}
              </span>
            ))}
          </div>

          {/* Analyse / Analyzing */}
          <AnimatePresence mode="wait">
            {allScanned && !analyzing && (
              <motion.button
                key="btn"
                onClick={handleAnalyze}
                className="w-full h-14 bg-blue-950 text-white rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-blue-900 active:scale-[0.98] transition-all shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Analyse Assessment
                <ChevronRight size={18} />
              </motion.button>
            )}

            {analyzing && (
              <motion.div
                key="analyzing"
                className="bg-white border border-slate-100 rounded-2xl px-5 py-4 space-y-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="text-blue-950 animate-spin" />
                  <p className="text-[13px] font-semibold text-blue-950">Analysing…</p>
                </div>
                <div className="space-y-2">
                  {ANALYSIS_STEPS.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      {i < stepIndex
                        ? <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                        : i === stepIndex
                        ? <Loader2 size={13} className="text-blue-600 animate-spin flex-shrink-0" />
                        : <div className="w-3 h-3 rounded-full border border-slate-200 flex-shrink-0" />
                      }
                      <p className={`text-[12px] ${i <= stepIndex ? 'text-slate-700' : 'text-slate-300'}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {!scanning && !allScanned && (
              <motion.p key="hint" className="text-[12px] text-slate-300 text-center" exit={{ opacity: 0 }}>
                No student data leaves this device. Processing runs locally.
              </motion.p>
            )}
          </AnimatePresence>

        </div>
      </PageTransition>
    </AppShell>
  )
}

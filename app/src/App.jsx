import { useCallback } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DemoProvider, useDemo } from './lib/DemoContext'
import IntroScreen from './components/IntroScreen'
import DemoModal from './components/DemoModal'

import Dashboard         from './pages/Dashboard'
import Students          from './pages/Students'
import Upload            from './pages/Upload'
import ClassInsights     from './pages/ClassInsights'
import SettingsPage      from './pages/SettingsPage'
import StudentPassport   from './pages/StudentPassport'
import AssessmentResults from './pages/AssessmentResults'

function AppContent() {
  const { introComplete, setIntroComplete } = useDemo()
  const handleIntroDone = useCallback(() => setIntroComplete(true), [setIntroComplete])

  return (
    <>
      {/* Intro — fullscreen, blocks everything until done (or skipped) */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <IntroScreen onDone={handleIntroDone} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal — appears once intro is done */}
      <DemoModal />

      {/* App routes — always mounted so nav feels instant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ pointerEvents: introComplete ? 'auto' : 'none' }}
      >
        <Routes>
          <Route path="/"               element={<Dashboard />} />
          <Route path="/students"       element={<Students />} />
          <Route path="/students/:id"   element={<StudentPassport />} />
          <Route path="/upload"         element={<Upload />} />
          <Route path="/upload/results" element={<AssessmentResults />} />
          <Route path="/insights"       element={<ClassInsights />} />
          <Route path="/settings"       element={<SettingsPage />} />
        </Routes>
      </motion.div>
    </>
  )
}

export default function App() {
  return (
    <DemoProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </DemoProvider>
  )
}

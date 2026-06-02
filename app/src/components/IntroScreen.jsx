import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const DURATION = 15000

const PILLARS = [
  {
    icon: '🔍',
    heading: 'Identify gaps today',
    body: 'Every assessment maps errors to specific concept gaps — not just a score.',
  },
  {
    icon: '🧠',
    heading: 'Remember what worked',
    body: 'Interventions and outcomes saved across terms, across teachers.',
  },
  {
    icon: '→',
    heading: 'Decide what to try next',
    body: 'Recommendations drawn from that child\'s own learning history.',
  },
]

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  },
  item: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

export default function IntroScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    let raf
    function tick() {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        onDone()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div className="fixed inset-0 bg-white z-40 flex flex-col items-center px-6 pt-20 pb-12">

      {/* Brand */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">V</span>
        </div>
        <h1 className="text-3xl font-semibold text-blue-950 tracking-tight mt-4 leading-none">
          VidyaPaatha
        </h1>
        <p className="text-base font-medium text-amber-500 tracking-widest uppercase mt-1.5 leading-none">
          Passport
        </p>
        <p className="text-[13px] text-slate-400 text-center mt-3 max-w-[260px] leading-relaxed">
          A teacher's learning-memory system for Indian classrooms
        </p>
      </motion.div>

      {/* Problem context */}
      <motion.div
        className="mt-7 w-full max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5">
          <p className="text-[13px] text-slate-500 leading-relaxed text-center">
            In a classroom of 40–50 students, teachers see{' '}
            <span className="text-slate-700 font-medium">that</span> a child is struggling —
            but have no record of{' '}
            <span className="text-slate-700 font-medium">what was already tried</span>.
            Every new teacher starts from zero.
          </p>
        </div>
      </motion.div>

      {/* Three pillars */}
      <motion.div
        className="mt-4 w-full max-w-sm space-y-2"
        variants={stagger.container}
        initial="initial"
        animate="animate"
      >
        {PILLARS.map((p) => (
          <motion.div
            key={p.heading}
            variants={stagger.item}
            className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3"
          >
            <span className="text-base leading-none mt-0.5 flex-shrink-0">{p.icon}</span>
            <div>
              <p className="text-[13px] font-semibold text-blue-950 leading-none">{p.heading}</p>
              <p className="text-[12px] text-slate-400 leading-relaxed mt-0.5">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar + skip pinned to bottom */}
      <div className="absolute bottom-10 left-6 right-6">
        <div className="h-0.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-950 rounded-full origin-left"
            style={{ scaleX: progress, transformOrigin: 'left' }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-[11px] text-slate-300">Loading demo…</p>
          <button
            onClick={onDone}
            className="text-[11px] text-slate-400 font-medium hover:text-blue-950 transition-colors px-2 py-1 rounded-lg hover:bg-slate-50"
          >
            Skip →
          </button>
        </div>
      </div>

    </div>
  )
}

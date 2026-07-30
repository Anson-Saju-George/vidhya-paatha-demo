import { motion } from 'framer-motion'
import {
  Wifi, Cpu, Save, ShieldCheck, HardDrive, Languages,
  ExternalLink, GitBranch, CheckCircle2,
} from 'lucide-react'
import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] } },
  },
}

function StatusRow({ icon: Icon, label, value, ok = true, accent }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ?? 'bg-slate-100'}`}>
        <Icon size={16} className={ok ? 'text-emerald-600' : 'text-slate-500'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-slate-700 leading-none">{label}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {ok && <CheckCircle2 size={13} className="text-emerald-500" />}
        <span className={`text-[12px] font-semibold ${ok ? 'text-emerald-600' : 'text-slate-500'}`}>{value}</span>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <PageTransition>
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
          className="px-4 pt-4 pb-6 space-y-4"
        >

          {/* Local status hero */}
          <motion.div variants={stagger.item}>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-4 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Wifi size={20} className="text-emerald-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-emerald-900 leading-none">Working locally</p>
                <p className="text-[12px] text-emerald-600 mt-1 leading-relaxed">
                  Everything is saved on this device and will sync when you're back online.
                </p>
              </div>
            </div>
          </motion.div>

          {/* System status */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2">
              System status
            </p>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
              <StatusRow icon={Cpu}  label="AI service" value="Available" accent="bg-emerald-50" />
              <StatusRow icon={Save} label="Last saved" value="Just now" accent="bg-emerald-50" />
              <StatusRow icon={HardDrive} label="Local database" value="Connected" accent="bg-emerald-50" />
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2">
              Privacy
            </p>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-50">
              <div className="flex items-start gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-slate-700 leading-none">No external API required</p>
                  <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">
                    All capture, diagnosis, and recommendations run on the local school machine.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <HardDrive size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-slate-700 leading-none">Student data stays on device</p>
                  <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">
                    Nothing is sent to external services. Data never leaves this machine.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div variants={stagger.item}>
            <p className="text-[13px] font-semibold text-slate-700 uppercase tracking-wide mb-2">
              Language
            </p>
            <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Languages size={16} className="text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-slate-700 leading-none">English</p>
                <p className="text-[12px] text-slate-400 mt-0.5">हिंदी and regional languages ready</p>
              </div>
            </div>
          </motion.div>

          {/* ContextForge attribution */}
          <motion.div variants={stagger.item}>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
              <p className="text-[12px] text-slate-500 leading-relaxed">
                Evidence retrieval is powered by the same evidence-first principles demonstrated in{' '}
                <span className="font-semibold text-blue-950">ContextForge</span>.
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href="https://ansonsajugeorge.online/context-forge/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors group"
                >
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600" />
                  <span className="text-[12px] font-medium text-slate-600 group-hover:text-blue-700">Live Demo</span>
                </a>
                <a
                  href="https://github.com/Anson-Saju-George/context-forge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors group"
                >
                  <GitBranch size={14} className="text-slate-400" />
                  <span className="text-[12px] font-medium text-slate-600">GitHub Repository</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div variants={stagger.item}>
            <p className="text-[11px] text-slate-300 text-center leading-relaxed">
              VidyaPaatha Passport · Phase 1 Prototype<br />
              SahAI for Shiksha 2026 — Challenge 2.4
            </p>
          </motion.div>

        </motion.div>
      </PageTransition>
    </AppShell>
  )
}

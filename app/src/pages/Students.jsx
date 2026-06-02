import AppShell from '../components/AppShell'
import PageTransition from '../components/PageTransition'

export default function Students() {
  return (
    <AppShell title="Students">
      <PageTransition>
        <div className="px-4 py-6">
          <p className="text-slate-400 text-sm">Students list — coming in Step 4</p>
        </div>
      </PageTransition>
    </AppShell>
  )
}

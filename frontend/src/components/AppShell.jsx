import LocalStatusBadge from './LocalStatusBadge'
import BottomNav from './BottomNav'

export default function AppShell({ children, title, back }) {
  return (
    <div className="flex flex-col min-h-svh bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-10 pb-3 bg-white sticky top-0 z-30 border-b border-slate-50">
        <div className="flex items-center gap-2">
          {back && (
            <button
              onClick={back}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors mr-1"
              aria-label="Go back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-950">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {title ? (
            <h1 className="text-base font-semibold text-blue-950 leading-tight">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-950 flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-950 leading-none">VidyaPaatha</p>
                <p className="text-[10px] font-medium text-amber-500 tracking-widest uppercase leading-none mt-0.5">Passport</p>
              </div>
            </div>
          )}
        </div>
        <LocalStatusBadge />
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}

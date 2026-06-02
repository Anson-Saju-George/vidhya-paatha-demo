import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Upload, BarChart2, Settings } from 'lucide-react'

const TABS = [
  { to: '/',         icon: LayoutDashboard, label: 'Home'     },
  { to: '/students', icon: Users,           label: 'Students' },
  { to: '/upload',   icon: Upload,          label: 'Upload',  primary: true },
  { to: '/insights', icon: BarChart2,       label: 'Insights' },
  { to: '/settings', icon: Settings,        label: 'Settings' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-100 z-40">
      <div className="flex items-center justify-around h-16 px-2">
        {TABS.map(({ to, icon: Icon, label, primary }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 flex-1 py-2 rounded-xl transition-colors ${
                primary
                  ? isActive
                    ? 'text-white'
                    : 'text-white'
                  : isActive
                  ? 'text-blue-950'
                  : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) =>
              primary ? (
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-950 flex items-center justify-center shadow-lg -mt-5">
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 mt-0.5">{label}</span>
                </div>
              ) : (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span className={`text-[10px] font-medium ${isActive ? 'text-blue-950' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </>
              )
            }
          </NavLink>
        ))}
      </div>
      {/* iOS safe area */}
      <div className="h-safe-bottom bg-white" />
    </nav>
  )
}

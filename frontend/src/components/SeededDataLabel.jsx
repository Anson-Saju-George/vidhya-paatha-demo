import { FlaskConical } from 'lucide-react'

export default function SeededDataLabel() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 border border-purple-100">
      <FlaskConical size={13} className="text-purple-400 flex-shrink-0" />
      <p className="text-[12px] text-purple-600 font-medium">
        Illustrative history — pre-loaded to show how a student's record builds over time.
      </p>
    </div>
  )
}

import { GAP_COLOURS } from '../data/students'

const STYLES = {
  amber:  'bg-amber-50 text-amber-700 border-amber-200',
  red:    'bg-red-50 text-red-700 border-red-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  sky:    'bg-sky-50 text-sky-700 border-sky-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export default function GapBadge({ concept, size = 'sm' }) {
  const colour = GAP_COLOURS[concept] ?? 'sky'
  const style = STYLES[colour]
  const text = size === 'lg'
    ? 'text-sm px-3 py-1 rounded-lg'
    : 'text-[11px] px-2 py-0.5 rounded-md'

  return (
    <span className={`inline-flex items-center border font-medium leading-none ${style} ${text}`}>
      {concept}
    </span>
  )
}

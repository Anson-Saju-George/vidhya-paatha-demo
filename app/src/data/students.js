import { ANANYA_INTERVENTION_HISTORY, ANANYA_REASONING_STEPS } from './interventions.js'

export const CONCEPTS = {
  PLACE_VALUE: 'Place Value',
  BORROWING: 'Borrowing Across Zero',
  FRACTIONS: 'Fractions',
  WORD_PROBLEMS: 'Word Problems',
  MULTIPLICATION: 'Multiplication Facts',
  DIVISION: 'Division',
  RATIO: 'Ratio Basics',
  NONE: 'No Current Gap',
}

// Gap badge colours
export const GAP_COLOURS = {
  [CONCEPTS.PLACE_VALUE]: 'amber',
  [CONCEPTS.BORROWING]: 'red',
  [CONCEPTS.FRACTIONS]: 'orange',
  [CONCEPTS.WORD_PROBLEMS]: 'orange',
  [CONCEPTS.MULTIPLICATION]: 'sky',
  [CONCEPTS.DIVISION]: 'sky',
  [CONCEPTS.RATIO]: 'purple',
  [CONCEPTS.NONE]: 'green',
}

// Score out of 10 for current assessment
function score(n) { return n }

export const STUDENTS = [
  // ─── Main demo student ───────────────────────────────────────────────────
  {
    id: 'ananya-nair',
    name: 'Ananya Nair',
    class: '6A',
    subject: 'Mathematics',
    currentGap: CONCEPTS.WORD_PROBLEMS,
    secondaryGap: CONCEPTS.FRACTIONS,
    assessmentScore: 6,
    seeded: true,
    interventionHistory: ANANYA_INTERVENTION_HISTORY,
    reasoningSteps: ANANYA_REASONING_STEPS,
    recommendation: {
      action: 'Use concrete visual representation + scaffolded word problems',
      actionId: 'visual-fraction-strips',
      rationale: 'Visual fraction strips were associated with improvement in Class 5 (Term 2). Current word problem difficulty may relate to the same foundational fraction reasoning gap.',
      hypothesis: 'Current word-problem gap may relate to earlier fraction reasoning gap (Class 5). This is a possible connection, not a confirmed diagnosis.',
      evidenceId: 'ev-current',
      confidence: 'Moderate',
    },
    timeline: [
      { term: 'Class 5 · Term 2', date: 'Mar 2024', event: 'Fractions gap identified', type: 'gap', evidenceId: 'ev-001' },
      { term: 'Class 5 · Term 2', date: 'Mar 2024', event: 'Visual fraction strips — tried', type: 'intervention', evidenceId: 'ev-001' },
      { term: 'Class 5 · Term 2', date: 'Apr 2024', event: 'Improvement noticed — fraction comparison errors reduced', type: 'improvement', evidenceId: 'ev-001' },
      { term: 'Class 5 · Term 2', date: 'Apr 2024', event: 'Extra worksheets — no change', type: 'intervention', evidenceId: 'ev-002' },
      { term: 'Class 5 · Term 3', date: 'Jul 2024', event: 'Peer activity — partially tried', type: 'intervention', evidenceId: 'ev-003' },
      { term: 'Class 6 · Term 1', date: 'Nov 2024', event: 'Word problems — recurring gap', type: 'gap', evidenceId: 'ev-004' },
      { term: 'Class 6 · Term 1', date: 'Nov 2024', event: 'Scaffolded practice — tried', type: 'intervention', evidenceId: 'ev-004' },
      { term: 'Class 6 · Term 2', date: 'Jan 2025', event: 'Current assessment — word problems + fractions gap', type: 'current', evidenceId: 'ev-current' },
    ],
  },

  // ─── Place Value (18 students) ────────────────────────────────────────────
  { id: 's-002', name: 'Rohan Sharma', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-003', name: 'Priya Singh', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-004', name: 'Arjun Verma', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-005', name: 'Kavya Reddy', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-006', name: 'Vikram Patel', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-007', name: 'Sneha Iyer', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-008', name: 'Kiran Joshi', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-009', name: 'Meena Gupta', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-010', name: 'Sanjay Kumar', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-011', name: 'Deepa Pillai', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-012', name: 'Ravi Menon', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-013', name: 'Asha Nambiar', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-014', name: 'Tarun Bhat', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-015', name: 'Nisha Rao', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-016', name: 'Arun Das', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-017', name: 'Pooja Mishra', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-018', name: 'Suresh Nair', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-019', name: 'Lalitha Krishnan', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.PLACE_VALUE, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },

  // ─── Fractions (12 students, includes Ananya already counted) ─────────────
  { id: 's-020', name: 'Divya Menon', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-021', name: 'Ajay Shetty', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-022', name: 'Rekha Pillai', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-023', name: 'Harish Balan', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-024', name: 'Sunita Varma', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-025', name: 'Prakash Ghosh', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-026', name: 'Usha Tiwari', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-027', name: 'Gopal Yadav', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-028', name: 'Meenakshi Subramanian', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-029', name: 'Balaji Rajan', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-030', name: 'Chitra Venkat', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-031', name: 'Dinesh Murthy', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.FRACTIONS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },

  // ─── Word Problems (9 students) ───────────────────────────────────────────
  { id: 's-032', name: 'Fathima Begum', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-033', name: 'George Mathew', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-034', name: 'Hema Latha', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-035', name: 'Irfan Khan', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-036', name: 'Jayashree Nair', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-037', name: 'Karthik Suresh', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(5), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-038', name: 'Lakshmi Devi', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(7), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-039', name: 'Mohammed Rafi', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.WORD_PROBLEMS, assessmentScore: score(6), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },

  // ─── Borrowing Across Zero (6 students) ───────────────────────────────────
  { id: 's-041', name: 'Omkar Patil', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.BORROWING, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-042', name: 'Padmaja Kulkarni', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.BORROWING, assessmentScore: score(3), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-043', name: 'Qureshi Salim', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.BORROWING, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-044', name: 'Radha Gopalan', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.BORROWING, assessmentScore: score(3), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-045', name: 'Subramaniam Iyer', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.BORROWING, assessmentScore: score(4), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
  { id: 's-046', name: 'Tara Bose', class: '6A', subject: 'Mathematics', currentGap: CONCEPTS.BORROWING, assessmentScore: score(3), seeded: false, interventionHistory: [], reasoningSteps: [], recommendation: null, timeline: [] },
]

// ─── Derived helpers ──────────────────────────────────────────────────────────

export function getStudentById(id) {
  return STUDENTS.find(s => s.id === id) ?? null
}

export function getStudentsByGap(concept) {
  return STUDENTS.filter(s => s.currentGap === concept)
}

// Students needing the most attention (priority order for dashboard)
export const NEEDS_ATTENTION = [
  ...STUDENTS.filter(s => s.currentGap === CONCEPTS.BORROWING),          // highest urgency
  ...STUDENTS.filter(s => s.currentGap === CONCEPTS.WORD_PROBLEMS).slice(0, 3),
  ...STUDENTS.filter(s => s.currentGap === CONCEPTS.FRACTIONS).slice(0, 3),
]

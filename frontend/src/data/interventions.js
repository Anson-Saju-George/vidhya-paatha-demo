// All available intervention action types
export const INTERVENTION_TYPES = [
  {
    id: 'visual-fraction-strips',
    label: 'Visual fraction strips',
    description: 'Use physical or drawn fraction strips to build concrete understanding',
  },
  {
    id: 'peer-activity',
    label: 'Peer activity',
    description: 'Pair student with a peer for collaborative problem solving',
  },
  {
    id: 'scaffolded-practice',
    label: 'Scaffolded practice',
    description: 'Break problems into smaller, guided steps with worked examples',
  },
  {
    id: 'local-language-example',
    label: 'Local-language example',
    description: 'Restate the problem using familiar local context or language',
  },
  {
    id: 'extra-worksheets',
    label: 'Extra worksheets',
    description: 'Additional written practice with similar problem types',
  },
  {
    id: 'manipulatives',
    label: 'Manipulatives / counters',
    description: 'Use physical objects to build concrete number sense',
  },
  {
    id: 'number-line',
    label: 'Number line activity',
    description: 'Use number line to visualise position and relationships',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'A different approach not listed here',
  },
]

// Evidence states for What Worked Before
export const EVIDENCE_STATES = {
  IMPROVEMENT: 'improvement',
  NO_CHANGE: 'no_change',
  INSUFFICIENT: 'insufficient',
  NOT_TRIED: 'not_tried',
}

// Ananya's full seeded intervention history
export const ANANYA_INTERVENTION_HISTORY = [
  {
    id: 'int-001',
    term: 'Class 5 · Term 2',
    date: 'March 2024',
    concept: 'Fractions',
    action: 'Visual fraction strips',
    actionId: 'visual-fraction-strips',
    status: 'tried',
    evidenceState: EVIDENCE_STATES.IMPROVEMENT,
    confidence: 'Moderate',
    evidenceId: 'ev-001',
    note: '',
  },
  {
    id: 'int-002',
    term: 'Class 5 · Term 2',
    date: 'March 2024',
    concept: 'Fractions',
    action: 'Extra worksheets',
    actionId: 'extra-worksheets',
    status: 'tried',
    evidenceState: EVIDENCE_STATES.NO_CHANGE,
    confidence: 'Low',
    evidenceId: 'ev-002',
    note: '',
  },
  {
    id: 'int-003',
    term: 'Class 5 · Term 3',
    date: 'July 2024',
    concept: 'Fractions',
    action: 'Peer activity',
    actionId: 'peer-activity',
    status: 'partially_tried',
    evidenceState: EVIDENCE_STATES.INSUFFICIENT,
    confidence: null,
    evidenceId: 'ev-003',
    note: 'Only tried once, insufficient follow-up data',
  },
  {
    id: 'int-004',
    term: 'Class 6 · Term 1',
    date: 'November 2024',
    concept: 'Word Problems',
    action: 'Scaffolded practice',
    actionId: 'scaffolded-practice',
    status: 'tried',
    evidenceState: EVIDENCE_STATES.INSUFFICIENT,
    confidence: null,
    evidenceId: 'ev-004',
    note: 'Assessment follow-up pending',
  },
]

// Evidence drawer content keyed by evidenceId
export const EVIDENCE_RECORDS = {
  'ev-001': {
    id: 'ev-001',
    title: 'Class 5 · Term 2 — Fractions Assessment',
    date: 'March 2024',
    body: 'Ananya showed frequent fraction comparison errors in the pre-intervention assessment (Q3, Q5, Q7 incorrect). After visual fraction strip intervention across two sessions, her follow-up assessment showed correct visual comparison and equivalent fraction identification.',
    outcomeLabel: 'Associated with improvement',
    disclaimer: 'Association, not proven causation. Based on pre/post assessment comparison for this student.',
    questions: [
      { q: 'Q3 — Compare ⅔ and ¾', pre: '✗ Incorrect', post: '✓ Correct' },
      { q: 'Q5 — Mark ½ on number line', pre: '✗ Incorrect', post: '✓ Correct' },
      { q: 'Q7 — Find equivalent fraction of ⅗', pre: '✗ Incorrect', post: '✓ Correct' },
    ],
  },
  'ev-002': {
    id: 'ev-002',
    title: 'Class 5 · Term 2 — Extra Worksheets Follow-up',
    date: 'April 2024',
    body: 'Extra worksheet practice was assigned across 3 sessions. Post-assessment showed no measurable change in fraction error rate. Student continued to make the same comparison errors as before the intervention.',
    outcomeLabel: 'No observed change',
    disclaimer: 'Association, not proven causation. Limited to this student and this intervention context.',
    questions: [
      { q: 'Q3 — Compare ⅔ and ¾', pre: '✗ Incorrect', post: '✗ Incorrect' },
      { q: 'Q5 — Mark ½ on number line', pre: '✗ Incorrect', post: '✗ Incorrect' },
    ],
  },
  'ev-003': {
    id: 'ev-003',
    title: 'Class 5 · Term 3 — Peer Activity Log',
    date: 'July 2024',
    body: 'Peer activity was partially tried during one session. No follow-up assessment was conducted. Insufficient data to assess whether this intervention had any effect on Ananya\'s fraction understanding.',
    outcomeLabel: 'Insufficient evidence',
    disclaimer: 'This intervention was only partially tried. Outcome cannot be assessed from a single partial session.',
    questions: [],
  },
  'ev-004': {
    id: 'ev-004',
    title: 'Class 6 · Term 1 — Word Problems Assessment',
    date: 'November 2024',
    body: 'Ananya struggled to set up equations from word problem contexts. Scaffolded practice was introduced. Follow-up assessment is scheduled but not yet conducted.',
    outcomeLabel: 'Insufficient evidence',
    disclaimer: 'Intervention is recent. Outcome evidence will be available after the next assessment cycle.',
    questions: [
      { q: 'Q2 — A train travels... (set up equation)', pre: '✗ Incorrect', post: 'Pending' },
      { q: 'Q6 — Ravi has twice as many... (find ratio)', pre: '✗ Incorrect', post: 'Pending' },
    ],
  },
  'ev-current': {
    id: 'ev-current',
    title: 'Class 6A · Term 2 — Current Assessment (Jan 2025)',
    date: 'January 2025',
    body: 'Ananya answered 6/10 correctly. Errors concentrated in word problem conversion (Q2, Q4, Q8) and fraction-to-decimal conversion (Q6). Pattern is consistent with Class 5 fraction reasoning gap.',
    outcomeLabel: 'Current gap identified',
    disclaimer: 'This is the source assessment for the current gap diagnosis. No intervention has been logged yet for this cycle.',
    questions: [
      { q: 'Q2 — Word problem: train speed', pre: '✗ Incorrect', post: null },
      { q: 'Q4 — Word problem: age ratio', pre: '✗ Incorrect', post: null },
      { q: 'Q6 — Convert ¾ to decimal', pre: '✗ Incorrect', post: null },
      { q: 'Q8 — Word problem: cost sharing', pre: '✗ Incorrect', post: null },
    ],
  },
}

// Reasoning steps (ContextForge-inspired evidence retrieval simulation)
export const ANANYA_REASONING_STEPS = [
  {
    step: '01',
    label: 'Identify Gap',
    detail: 'Current issue: difficulty converting word problems into equations (Class 6A, Term 2 assessment)',
  },
  {
    step: '02',
    label: 'Retrieve Memory',
    detail: 'Found Class 5 fractions evidence (2 interventions, 2 assessments) + Class 6 Term 1 word problems log',
  },
  {
    step: '03',
    label: 'Rank Evidence',
    detail: 'Most relevant: visual fraction strips (associated with improvement, moderate confidence). Extra worksheets ranked low (no observed change).',
  },
  {
    step: '04',
    label: 'Build Context',
    detail: 'Prior fraction gap + visual intervention success + current word problem difficulty — possible conceptual continuity',
  },
  {
    step: '05',
    label: 'Recommend',
    detail: 'Use concrete visual representation + scaffolded word problems. May relate to earlier fraction reasoning gap.',
  },
]

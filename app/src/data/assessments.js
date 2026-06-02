// The live demo assessment (Class 6A, Term 2)
export const DEMO_ASSESSMENT = {
  id: 'assess-001',
  title: 'Class 6A — Fractions & Word Problems',
  subject: 'Mathematics',
  class: '6A',
  term: 'Term 2',
  date: 'January 2025',
  totalQuestions: 10,
  questions: [
    { id: 'q1', text: 'Write ¾ as a decimal.', concept: 'Fractions', marks: 1 },
    { id: 'q2', text: 'A train travels 240 km in 4 hours. Write an equation for speed.', concept: 'Word Problems', marks: 2 },
    { id: 'q3', text: 'What is the place value of 7 in 4,782?', concept: 'Place Value', marks: 1 },
    { id: 'q4', text: 'Ravi is twice as old as Sita. Sita is 9. Write an equation to find Ravi\'s age.', concept: 'Word Problems', marks: 2 },
    { id: 'q5', text: 'Subtract 403 − 167 showing your working.', concept: 'Borrowing Across Zero', marks: 2 },
    { id: 'q6', text: 'Convert 5/8 to a decimal.', concept: 'Fractions', marks: 1 },
    { id: 'q7', text: 'Write the number 3 lakhs 42 thousand 5 in digits.', concept: 'Place Value', marks: 1 },
    { id: 'q8', text: '4 friends share ₹360 equally. Write the equation and solve.', concept: 'Word Problems', marks: 2 },
    { id: 'q9', text: 'Arrange in ascending order: ⅔, ½, ¾, ⅙', concept: 'Fractions', marks: 1 },
    { id: 'q10', text: 'What digit is in the thousands place in 58,247?', concept: 'Place Value', marks: 1 },
  ],
}

// Concept-level class analysis (shown on Results screen)
export const CLASS_ANALYSIS = {
  assessmentId: 'assess-001',
  totalStudents: 45,
  conceptBreakdown: [
    {
      concept: 'Place Value',
      studentsAffected: 18,
      priority: 'reteach',
      label: 'Reteach this week',
      description: '18 of 45 students showed concept-level gaps on place value questions.',
      colour: 'amber',
    },
    {
      concept: 'Word Problems',
      studentsAffected: 9,
      priority: 'targeted',
      label: 'Targeted support',
      description: '9 students struggle to set up equations from word problem context.',
      colour: 'orange',
    },
    {
      concept: 'Fractions',
      studentsAffected: 12,
      priority: 'reteach',
      label: 'Reteach this week',
      description: '12 students have gaps in fraction comparison and conversion.',
      colour: 'amber',
    },
    {
      concept: 'Borrowing Across Zero',
      studentsAffected: 6,
      priority: 'small_group',
      label: '1:1 support needed',
      description: '6 students need individual attention on subtraction with borrowing across zero.',
      colour: 'red',
    },
    {
      concept: 'Multiplication Facts',
      studentsAffected: 0,
      priority: 'strength',
      label: 'Class strength',
      description: 'Multiplication facts are mostly secure across the class.',
      colour: 'green',
    },
  ],
  classReteachHeadline: 'Reteach place value tomorrow — 18 of 45 students showed concept-level gaps.',
  smallGroupNote: '6 students need 1:1 support on borrowing across zero.',
  strengthNote: 'Multiplication facts are mostly secure.',
}

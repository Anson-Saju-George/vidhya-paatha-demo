import { createContext, useContext, useState } from 'react'

const DemoContext = createContext(null)

export function DemoProvider({ children }) {
  const [introComplete, setIntroComplete] = useState(false)
  const [assessmentAnalyzed, setAssessmentAnalyzed] = useState(false)
  const [loggedInterventions, setLoggedInterventions] = useState([])
  const [modalDismissed, setModalDismissed] = useState(false)

  function logIntervention(studentId, entry) {
    setLoggedInterventions(prev => [...prev, { studentId, ...entry, loggedAt: new Date() }])
  }

  function getInterventionsFor(studentId) {
    return loggedInterventions.filter(i => i.studentId === studentId)
  }

  return (
    <DemoContext.Provider value={{
      introComplete,
      setIntroComplete,
      assessmentAnalyzed,
      setAssessmentAnalyzed,
      loggedInterventions,
      logIntervention,
      getInterventionsFor,
      modalDismissed,
      setModalDismissed,
    }}>
      {children}
    </DemoContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemo() {
  return useContext(DemoContext)
}

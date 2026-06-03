# VidyaPaatha Passport — Project Context

> **Purpose of this file:** A self-contained context brief you can paste into any LLM so it understands what this project is, how it's built, how the demo flows, and how the simulated data is structured — without needing to read the whole codebase.

---

## 1. What this is

**VidyaPaatha Passport** is a **Phase 1 clickable prototype** (frontend-only, simulated data) built for the **SahAI for Shiksha 2026 — Challenge 2.4** hackathon. It is a *demo*, not the production app — every number, student, and AI "recommendation" is pre-written static data designed to showcase the intended product experience.

**Product concept:** A teacher's *learning-memory system* for Indian classrooms (Classes 3–6, foundational maths). It closes the loop that normal gradebooks break:

```
Assessment → Gap Diagnosis → Recommendation → Teacher Action (2 taps)
   → Intervention Recorded → Reassessment → "What Worked Before" → "What To Try Next"
```

The core insight: schools remember the *score* but forget the *teaching context*. When a child changes grade, the new teacher re-discovers what the last teacher already learned. VidyaPaatha persists that instructional memory per student.

**Primary user:** "Meera", a teacher managing 40–50 students across multiple ability levels.

**Hard scope rules (do NOT add):** no chatbot UI, no analytics dashboard, no parent/student screens, no real backend/RAG. Evidence-first: every AI claim shows its source; ungrounded output is never displayed.

**Relationship to ContextForge:** The real evidence-first retrieval/RAG engine already exists separately as **ContextForge** (https://github.com/Anson-Saju-George/context-forge, live: https://ansonsajugeorge.online/context-forge/). This prototype *simulates* that retrieval flow visually; it does not run it.

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build | Vite |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animation | Framer Motion |
| Routing | React Router (`HashRouter` — for static hosting) |
| Icons | lucide-react |
| Data | Static JS objects in `src/data/` — no backend |

- **Mobile-first**, single-column, `max-width: 430px` (phone frame). Institutional navy (`blue-950`) + amber accent + white.
- **Deploy base path:** `/vidhya-paatha-demo/` (set in `vite.config.js`). Live at `https://ansonsajugeorge.online/vidhya-paatha-demo/`.
- **GitHub:** https://github.com/Anson-Saju-George/vidhya-paatha-demo.git

### Commands
```bash
cd app
npm install
npm run dev      # dev server
npm run build    # → app/dist
npm run lint     # eslint (currently clean)
```

---

## 3. Project structure

```
prajnix-demo/                 (git root)
├─ app/                       React app (the deployable)
│  ├─ public/favicon.svg      navy "V" tile favicon
│  ├─ index.html              title "VidyaPaatha Passport"
│  ├─ vite.config.js          base: '/vidhya-paatha-demo/'
│  └─ src/
│     ├─ App.jsx              router + intro/modal orchestration
│     ├─ index.css            tailwind import + base styles
│     ├─ lib/
│     │  └─ DemoContext.jsx   global demo state (React Context)
│     ├─ data/                ALL simulated data lives here
│     │  ├─ students.js
│     │  ├─ assessments.js
│     │  └─ interventions.js
│     ├─ components/          reusable UI
│     └─ pages/               one file per screen
├─ docs/                      product specs (PRD, design spec, pitch, scope)
├─ context-forge/            reference clone (gitignored)
├─ assets/banner.svg          README banner
├─ README.md
└─ Demo-Project.md            (this file)
```

### Pages (screens)
| Route | File | Purpose |
|---|---|---|
| `/` | `Dashboard.jsx` | Home: class reteach banner, upload CTA, needs-attention list |
| `/students` | `Students.jsx` | Searchable roster grouped by concept gap |
| `/students/:id` | `StudentPassport.jsx` | Per-student memory: gaps, recommendations, history |
| `/upload` | `Upload.jsx` | Scan-45-sheets animation → analyse |
| `/upload/results` | `AssessmentResults.jsx` | Class diagnosis by concept group |
| `/insights` | `ClassInsights.jsx` | Concept groups with proportion bars |
| `/settings` | `SettingsPage.jsx` | Local/offline status, privacy, language |

### Key components
- `AppShell` — header (logo + LocalStatusBadge) + scroll area + BottomNav
- `BottomNav` — 5 tabs, Upload elevated as primary
- `IntroScreen` — 15s branded loader (skippable) shown first
- `DemoModal` — "Prototype Demonstration" disclaimer + ContextForge links (shows after intro)
- `ClassReteachBanner` — 3 stacked alerts (priority / small-group / strength)
- `StudentCard`, `GapBadge` — roster + concept chips
- `WhatToTryNextPanel` — navy recommendation card (above history)
- `WhatWorkedBeforePanel` — interventions grouped by evidence state
- `PassportTimeline` — chronological learning journey
- `EvidenceReasoningPanel` — collapsible 5-step ContextForge-style reasoning chain
- `EvidenceChip` + `EvidenceDrawer` — citation chip opens bottom-sheet with source assessment (before/after question table + disclaimer)
- `InterventionModal` — 2-tap logging bottom-sheet (renders via `createPortal` to `document.body`)
- `DemoHint` — animated "tap me" hints (dot/pill/arrow/glow variants) guiding reviewers
- `SeededDataLabel` — "Illustrative history" purple label
- `PageTransition` — fade+slide wrapper for each page

---

## 4. Demo workflow (the scripted flow)

The app opens with a **15-second IntroScreen** (skippable via "Skip →") explaining the product, then a **DemoModal** disclaimer with ContextForge links. After "Continue to Demo":

**The golden path for a video walkthrough / reviewer:**

1. **Dashboard** — read the loud class priority: *"Reteach place value tomorrow — 18 of 45 students showed concept-level gaps."*
2. **Upload Assessment** (tab) — tap the scan zone → 45 student sheets light up green one-by-one (~2.7s) → **Analyse Assessment**.
3. **Assessment Results** — class diagnosis grouped by concept; each group expandable.
4. Expand **Word Problems** group → **Ananya Nair** is highlighted (amber, pulsing inset glow, animated arrow, "Demo student" tag) → tap her.
5. **Student Passport (Ananya)** — the hero screen:
   - Current gap badge (Word Problems)
   - "Illustrative history" label
   - **What To Try Next** (navy card, above history) + collapsible **Evidence-first learning memory** reasoning panel (5 steps)
   - **What Worked Before**: ✓ Visual fraction strips (improvement, moderate) · – Extra worksheets (no change) · ? Peer activity (insufficient) — each with an Evidence chip; improvement row has "Use this"
   - **Learning Timeline** across Class 5 Term 2 → current
6. Tap any **Evidence** chip → **Evidence Drawer** slides up: source assessment, before/after question table, "Association, not proven causation" disclaimer.
7. Tap **Log what I did** (rippling amber button) → **Intervention Modal**: recommended action pre-selected → tap **Save** → green ✓ "Logged." → auto-closes in 1s. The logged action merges live into "What Worked Before".
8. **Class Insights** (tab) — concept groups with proportion bars; tap to expand student lists.
9. **Settings** — "Working locally", AI Available, no external API, data stays on device.

**Demo data integrity rule:** seeded/illustrative data is always labelled as such. Never present it as live.

---

## 5. Data init (how the simulated data is structured)

All data is static and lives in `app/src/data/`. No fetching, no backend.

### `interventions.js`
- `INTERVENTION_TYPES` — 8 selectable actions (`visual-fraction-strips`, `peer-activity`, `scaffolded-practice`, `local-language-example`, `extra-worksheets`, `manipulatives`, `number-line`, `other`), each `{ id, label, description }`.
- `EVIDENCE_STATES` — `IMPROVEMENT | NO_CHANGE | INSUFFICIENT | NOT_TRIED`.
- `ANANYA_INTERVENTION_HISTORY` — 4 seeded entries `{ id, term, date, concept, action, actionId, status, evidenceState, confidence, evidenceId, note }`.
- `EVIDENCE_RECORDS` — keyed map (`ev-001` … `ev-current`); each `{ id, title, date, body, outcomeLabel, disclaimer, questions:[{q, pre, post}] }`. This is what the Evidence Drawer renders.
- `ANANYA_REASONING_STEPS` — 5 steps `{ step, label, detail }` for the reasoning panel (Identify → Retrieve → Rank → Build Context → Recommend).

### `assessments.js`
- `DEMO_ASSESSMENT` — `{ id, title, subject, class, term, date, totalQuestions, questions:[{id, text, concept, marks}] }` (10 concept-tagged questions).
- `CLASS_ANALYSIS` — `{ totalStudents:45, conceptBreakdown:[{concept, studentsAffected, priority, label, description, colour}], classReteachHeadline, smallGroupNote, strengthNote }`. `priority` ∈ `reteach | targeted | small_group | strength`.

### `students.js`
- `CONCEPTS` — enum of gap names (`PLACE_VALUE, BORROWING, FRACTIONS, WORD_PROBLEMS, MULTIPLICATION, DIVISION, RATIO, NONE`).
- `GAP_COLOURS` — concept → colour token (amber/red/orange/sky/purple/green).
- `STUDENTS` — array of **exactly 45** students. Distribution: 18 Place Value · 12 Fractions · 9 Word Problems · 6 Borrowing.
  - Each student: `{ id, name, class:'6A', subject:'Mathematics', currentGap, assessmentScore, seeded, interventionHistory, reasoningSteps, recommendation, timeline }`.
  - **Ananya Nair** (`ananya-nair`) is the only fully-populated `seeded:true` student — she has `interventionHistory`, `reasoningSteps`, a `recommendation` object `{ action, actionId, rationale, hypothesis, evidenceId, confidence }`, and a 7-entry `timeline` (`type` ∈ `gap | intervention | improvement | current`). All other students are `seeded:false` with empty history and `recommendation: null`.
- Helpers: `getStudentById(id)`, `getStudentsByGap(concept)`, `NEEDS_ATTENTION` (priority-ordered subset for the dashboard).

### Runtime state — `lib/DemoContext.jsx`
React Context holding ephemeral demo state (resets on reload):
- `introComplete` / `setIntroComplete`
- `modalDismissed` / `setModalDismissed`
- `assessmentAnalyzed` / `setAssessmentAnalyzed`
- `loggedInterventions` + `logIntervention(studentId, entry)` + `getInterventionsFor(studentId)` — live-logged actions merge into a student's history during the session.

---

## 6. Conventions & gotchas

- **Modals/drawers use `createPortal(..., document.body)`** to escape the animated route wrapper's stacking/pointer-event context. New overlays should do the same.
- **`InterventionModal` remounts via `key`** so its form state initialises correctly from the recommended action each time it opens.
- The recommended action is **pre-selected** so the user can Save in literally one tap during a demo.
- **`DemoHint`** components and amber pulses are deliberate reviewer guidance — they're demo scaffolding, not product chrome.
- Colour is never the sole signal for evidence state (always icon + colour + text label) — keep this for accessibility.
- `assessmentScore` exists on students but is intentionally **not** surfaced prominently (product principle: concept over score).

---

## 7. Status

All 9 build steps complete; all 5 tabs fully built. `npm run lint` and `npm run build` both pass clean. Pushed to `main` on the GitHub repo above.

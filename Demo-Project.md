# Demo-Project.md — VidyaPaatha Passport (Phase 1 Clickable Prototype)

**Purpose of this file:** complete, self-contained engineering + product context for the Phase 1 demo build. Paste this into any LLM (or hand it to any engineer) and it will understand *what this is, why it exists, how it is built, how every screen behaves, what every data object contains, and how the scripted demo runs* — without reading the source tree. This is the **prototype** context document; it complements the product documents in `docs/` (PRD, Proposal, Pitch Spine, MVP_SCOPE, PRODUCT_DESIGN_SPEC), which describe the *intended* product. Where the two differ, this file describes **what was actually built in the demo**.

**Product in one line:** an intervention feedback loop with longitudinal learning memory for foundational-math teachers (Classes 3–6) in large, mixed-ability classrooms — rendered here as a frontend-only, fully-simulated clickable prototype.

**The only thing this prototype proves:** the loop is legible and compelling — Assessment → Gap Diagnosis → Recommendation → Teacher Action (≤2 taps) → Intervention Logged → Reassessment → "What Worked Before" → "What To Try Next" — with every AI claim visibly citing its evidence.

---

## 1. Context & Intent

### 1.1 What this is
A **Phase 1 hackathon submission** for **SahAI for Shiksha 2026 — Challenge 2.4**, consisting of a clickable prototype link + a video walkthrough. It is **not** the production app and **not** a backend. Every student, score, gap, recommendation, and "AI" output is **pre-written static data** chosen to make the intended experience legible to reviewers in ~3 minutes.

### 1.2 The problem being dramatised
In Indian classrooms of 40–50 students across multiple ability levels, a teacher ("Meera") can see *that* a child struggles but has no practical record of *what specifically* they don't understand or *what was already tried*. Each assessment is an isolated event: the score is kept, the teaching context is discarded. When a child changes grade, the new teacher re-discovers what the last teacher already learned (often weeks of trial and error). **The school remembers the score but forgets the teaching.** Existing tools (gradebooks, AI tutors, graders) are *stateless* — they help in the moment and forget the child.

### 1.3 The solution being dramatised
A teacher's **learning-memory system** that (1) identifies a student's concept-level gaps today, (2) remembers which interventions were associated with that child's improvement before, and (3) recommends what to try next — grounded in that specific child's history, with citations. No teacher starts from zero.

### 1.4 Relationship to ContextForge (important framing)
The real evidence-first retrieval / citation-grounded RAG engine **already exists**, built separately as **ContextForge**:
- Live: `https://ansonsajugeorge.online/context-forge/`
- Repo: `https://github.com/Anson-Saju-George/context-forge`

This prototype **simulates** that retrieval flow visually (see the `EvidenceReasoningPanel`, §6) but does not run it. The opening `DemoModal` states this explicitly and links to ContextForge. The demo's retrieval narrative mirrors ContextForge V3.1's pipeline, re-expressed for education:

```
ContextForge:   Query → Retrieve Evidence → Rank → Pack Context → Answer with Citations
VidyaPaatha:    Student Gap → Retrieve Learning Memory → Rank Evidence → Pack Student History → Recommend with Citations
```

### 1.5 Hard scope constraints (do NOT add these)
- ❌ No chatbot-first interface
- ❌ No full analytics dashboard / data-exploration surfaces
- ❌ No parent or student screens (teacher-only)
- ❌ No permanent "at-risk" labels or ability ranking
- ❌ No handwriting-OCR workflow
- ❌ No real backend, no real AI calls, no live RAG
- ✅ Evidence-first is a hard rule: every AI claim shows, or is one tap from, its source. Ungrounded output is never shown.

### 1.6 Live + source links
- **Live demo:** `https://ansonsajugeorge.online/vidhya-paatha-demo/`
- **Repo:** `https://github.com/Anson-Saju-George/vidhya-paatha-demo.git`

---

## 2. Design Principles (the decision filters)

These mirror `docs/PRODUCT_DESIGN_SPEC.md` and govern every screen. When a layout choice conflicts with a principle, the principle wins.

- **Teacher First.** Usable in seconds, one-handed, on a basic device. If a screen needs explanation, it is wrong.
- **Low Cognitive Load.** One primary thing per screen. Defaults over decisions. Detail lives behind a tap (progressive disclosure), never on the surface.
- **Evidence Before AI.** Every AI statement (gap, recommendation, "what worked," cross-concept hypothesis) is one tap from its source. No claim floats free.
- **Action Over Analytics.** Every view answers "so what do I do?" Numbers are never the destination; the recommended action is.
- **Memory Without Stigma.** Records concept-level gaps + intervention history, never a permanent label on a child. Language describes the *concept* and the *evidence*, not the *child*.
- **Association, Not Causation.** Recommendations say "associated with," never "caused." Cross-concept links are hypotheses, not diagnoses. Every evidence drawer repeats this disclaimer.
- **Two-Tap Logging.** Recording an intervention costs ≤2 taps in the common case (the recommended action is pre-selected, so a literal one-tap Save is possible).

---

## 3. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| UI framework | **React 19** | function components + hooks only |
| Build tool | **Vite** | `@vitejs/plugin-react` |
| Styling | **Tailwind CSS v4** | via `@tailwindcss/vite` plugin; utility classes inline |
| Animation | **Framer Motion** | page transitions, modals, demo hints, scan/ripple effects |
| Routing | **React Router** (`HashRouter`) | hash routing chosen for static-host deploy under a sub-path |
| Icons | **lucide-react** | note: `Github` icon name is absent in this version — use `GitBranch` |
| Data | static JS objects in `src/data/` | no fetching, no backend |
| State | React Context (`DemoContext`) | ephemeral; resets on reload |

**Visual language:** mobile-first single column, `max-width: 430px` phone frame centred on a white page. Palette: institutional navy `blue-950` (primary), `amber-400/500` (accent + demo hints), white surfaces, slate text. Soft rounded cards (`rounded-2xl`), generous spacing, ≥44px touch targets, body ≥13px. No neon, no "AI startup" look.

**Deploy:** `vite.config.js` sets `base: '/vidhya-paatha-demo/'`. Build output → `app/dist`. Favicon is a navy "V" tile (`app/public/favicon.svg`); tab title is "VidyaPaatha Passport".

### Commands
```bash
cd app
npm install
npm run dev      # local dev server (HMR)
npm run build    # production build → app/dist
npm run lint     # eslint — currently passes clean (0 errors)
npm run preview  # serve the production build locally
```

---

## 4. Repository & File Structure

```
prajnix-demo/                       git root (this repo)
├─ app/                             the deployable React app
│  ├─ public/
│  │  └─ favicon.svg                navy "V" tile + amber dot
│  ├─ index.html                    <title>VidyaPaatha Passport</title>, meta description
│  ├─ vite.config.js                react + tailwind plugins; base: '/vidhya-paatha-demo/'
│  ├─ eslint.config.js
│  ├─ package.json
│  └─ src/
│     ├─ main.jsx                   React root
│     ├─ App.jsx                    Router + intro/modal orchestration
│     ├─ index.css                  @import "tailwindcss" + base styles (430px frame)
│     ├─ lib/
│     │  └─ DemoContext.jsx         global ephemeral demo state
│     ├─ data/                      ALL simulated data (see §8)
│     │  ├─ students.js             45 students + CONCEPTS + helpers
│     │  ├─ assessments.js          DEMO_ASSESSMENT + CLASS_ANALYSIS
│     │  └─ interventions.js        intervention types, evidence records, reasoning steps
│     ├─ components/                reusable UI (see §6)
│     └─ pages/                     one file per screen (see §5)
├─ docs/                            product specs (source of truth for the PRODUCT)
│  ├─ MVP_SCOPE.md
│  ├─ PRODUCT_DESIGN_SPEC.md
│  ├─ VidyaPaatha_PRD.md
│  ├─ VidyaPaatha_Phase1_Proposal.md
│  └─ VidyaPaatha_Pitch_Spine.md
├─ context-forge/                   reference clone of the RAG engine (gitignored)
├─ assets/
│  └─ banner.svg                    README banner
├─ README.md
├─ Demo-Project.md                  THIS FILE
├─ .gitignore                       ignores node_modules, dist, context-forge/, .agents/, .claude/skills/
└─ skills-lock.json
```

---

## 5. Screens (Pages) — Information Architecture

**Primary navigation:** persistent bottom tab bar, 5 items, defined in `components/BottomNav.jsx`. The **Upload** tab is visually elevated (raised navy circle) because it starts the loop.

| # | Route | File | Tab label | Role |
|---|---|---|---|---|
| 1 | `/` | `pages/Dashboard.jsx` | Home | Today's priorities + entry to the loop |
| 2 | `/students` | `pages/Students.jsx` | Students | Searchable roster grouped by concept gap |
| 3 | `/students/:id` | `pages/StudentPassport.jsx` | — (detail) | Per-student learning memory (hero screen) |
| 4 | `/upload` | `pages/Upload.jsx` | Upload | Scan 45 sheets → analyse |
| 5 | `/upload/results` | `pages/AssessmentResults.jsx` | — (detail) | Class diagnosis by concept group |
| 6 | `/insights` | `pages/ClassInsights.jsx` | Insights | Concept groups with proportion bars |
| 7 | `/settings` | `pages/SettingsPage.jsx` | Settings | Local/offline status, privacy, language |

**Navigation rule:** max depth 3 (tab → detail → drawer/modal). The whole loop is completable without a hamburger menu.

### 5.1 Dashboard (`/`)
Greeting ("Good morning, Meera" · Class 6A · Mathematics) → **ClassReteachBanner** (the loudest element) → full-width navy **Upload CTA** (its label switches to "Upload another assessment" once `assessmentAnalyzed` is true) → **Needs Attention** list (top 6 from `NEEDS_ATTENTION`, borrowing students first) with an "All 45" link to `/students` → footer meta. Sections stagger in (60ms).

### 5.2 Students (`/students`)
Live **search** input (filters `STUDENTS` by name) → students **grouped by concept gap** in urgency order (Borrowing → Word Problems → Fractions → Place Value → …). Each group header shows a `GapBadge` + count. Each row: avatar, name, `GapBadge`, chevron, tap → passport. **Ananya** is tinted amber with a pulsing inset glow and a "Demo" tag (she sits in the Word Problems group). Empty-state message when search matches nothing.

### 5.3 Upload (`/upload`)
The capture entry point. A dashed **scan zone**: tap it → a 5-column grid of all 45 students' initials renders, then each chip lights green with a spring-pop checkmark, one every 60ms (~2.7s total) — a deliberately "methodical roster scan" feel (chosen over a chaotic falling-papers alternative). A "▌reading" indicator blinks; a progress bar fills. When all 45 are scanned, an **Analyse Assessment** button appears → tapping it runs a 5-step faux pipeline (`Parsing… → Mapping… → Identifying… → Building… → Done.`, 600ms each, each step ticks from spinner → check) → sets `assessmentAnalyzed = true` → navigates to `/upload/results`. Footer reassures "No student data leaves this device."

### 5.4 Assessment Results (`/upload/results`)
Meta (Class 6A · 45 students · 10 questions) → **ClassReteachBanner** → "By concept" list of **concept groups** from `CLASS_ANALYSIS.conceptBreakdown`. Each non-strength group is an accordion: tap to expand the full student list. The **Multiplication Facts** "strength" group renders flat (non-expandable, emerald). In the expanded **Word Problems** group, **Ananya** is the featured row (amber tint, pulsing inset border glow ~1.1s cycle, animated `→` arrow, "Demo student" tag) — this is the scripted path into her passport. Non-seeded rows carry a "Source" `EvidenceChip` (opens the Evidence Drawer for `ev-current`). Demo hints (`DemoHint`) decorate the Word Problems card: a "Tap to expand" pill, a pulsing dot, and a glow ring (all hide when the card is open).

### 5.5 Student Passport (`/students/:id`) — the hero screen
For **Ananya** (seeded), top-to-bottom:
1. **Header card** — avatar, name, Class 6A · Mathematics, large `GapBadge` (Word Problems).
2. **SeededDataLabel** — "Illustrative history — pre-loaded to show how a student's record builds over time."
3. **WhatToTryNextPanel** (navy, placed *above* history) — recommended action, rationale, an amber **hypothesis** note ("may relate to earlier fraction reasoning gap… a possible connection, not a confirmed diagnosis"), an evidence chip (`ev-current`), confidence, and the **"Log what I did"** button (with a rippling amber wave + breathing glow + sheen sweep).
4. **EvidenceReasoningPanel** — collapsible "Evidence-first learning memory" 5-step chain (the ContextForge simulation). Footer line: "Powered by the same evidence-first retrieval principles demonstrated in ContextForge."
5. **WhatWorkedBeforePanel** — interventions grouped by evidence state, each row = icon + colour + text label + Evidence chip; the *improvement* row also shows a **"Use this"** action (pre-fills the logging modal) and a large bouncing amber `←` demo hint.
6. **PassportTimeline** — chronological journey (Class 5 Term 2 → current), each entry typed (`gap` / `intervention` / `improvement` / `current`) with its own icon/colour, source chips; the first entry's chip carries a floating amber **"tap me →"** hint.
7. **Sticky "Log what I did"** button above the tab bar (rendered outside `AppShell`), with the same wave/glow.

For **non-seeded students:** header + gap badge, `WhatToTryNextPanel` empty state ("No grounded recommendation yet…"), `WhatWorkedBeforePanel` empty state ("This fills over time as you log…"), and a plain "No history yet…" card. No crashes — every panel degrades gracefully.

### 5.6 Class Insights (`/insights`)
Meta ("Grouped by shared concept gap — not by score") → top-priority headline (the reteach banner sentence) → **concept groups**, each with a `GapBadge`, count (`18 / 45`), an animated **proportion bar** (width = affected/total), and a description. Tap to expand the student list (Ananya tinted, tap-through). Multiplication renders as a flat emerald "strength" card. Footer reminds: a student scoring well may still carry a foundational gap — groups prioritise the *concept*, not the *mark*.

### 5.7 Settings / Local Status (`/settings`)
"Working locally" hero (pulsing green) → **System status** rows (AI service Available · Last saved Just now · Local database Connected, each with ✓) → **Privacy** (No external API required · Student data stays on device) → **Language** (English; Hindi/regional ready) → **ContextForge attribution** with live + repo links → footer credit "SahAI for Shiksha 2026 — Challenge 2.4".

---

## 6. Component Catalogue (`src/components/`)

Each entry lists the component's purpose and its props/contract.

| Component | Purpose | Key props |
|---|---|---|
| `AppShell` | Page chrome: sticky header (logo or title + back button) + scroll area + `BottomNav` | `children`, `title?`, `back?` (fn) |
| `BottomNav` | 5-tab nav; Upload elevated as primary raised circle | — (uses `NavLink`) |
| `LocalStatusBadge` | Pulsing green "Working locally" pill in the header | — |
| `IntroScreen` | 15s branded loader shown first; brand + problem statement + 3 pillars + progress bar + **Skip →** | `onDone()` (fires at end or on skip) |
| `DemoModal` | "Prototype Demonstration" disclaimer + ContextForge links; shows after intro; dismiss persists for session | reads `DemoContext` |
| `PageTransition` | Fade + 10px slide-up wrapper applied per page | `children` |
| `ClassReteachBanner` | 3 stacked alerts: amber priority, red small-group, emerald strength | reads `CLASS_ANALYSIS` |
| `StudentCard` | Roster row: avatar (colour by gap), name, seeded tag, `GapBadge`, chevron → passport | `student`, `compact?` |
| `GapBadge` | Concept chip, colour from `GAP_COLOURS` | `concept`, `size?` ('sm'|'lg') |
| `EvidenceChip` | Small "Evidence/Source" chip that opens the drawer; optional floating amber "tap me →" hint | `evidenceId`, `label?`, `onClick(id)`, `hint?` |
| `EvidenceDrawer` | Bottom-sheet showing a source record: outcome badge, narrative, before/after question table, disclaimer. **Rendered via `createPortal` to `document.body`.** | `evidenceId` (null = closed), `onClose()` |
| `EvidenceReasoningPanel` | Collapsible 5-step ContextForge-style reasoning chain | `steps` (array) |
| `WhatToTryNextPanel` | Navy recommendation card above history; action + rationale + hypothesis + evidence chip + "Log what I did" | `recommendation` (or null → empty state), `onEvidenceOpen(id)`, `onLogAction()` |
| `WhatWorkedBeforePanel` | Interventions grouped by evidence state; rows with icon+colour+label, Evidence chip, "Use this" on improvement | `history`, `onEvidenceOpen(id)`, `onUseThis(entry)` |
| `PassportTimeline` | Vertical timeline; typed entries (gap/intervention/improvement/current) with icons + source chips | `entries`, `onEvidenceOpen(id)` |
| `InterventionModal` | 2-tap logging bottom-sheet; recommended action pre-selected; status selector (Tried default); optional note; Save → ✓ "Logged." → auto-close 1s. **Rendered via `createPortal`; inner content remounts via `key` so state inits correctly.** | `open`, `onClose()`, `onSave(entry)`, `prefillActionId?`, `recommendedActionId?` |
| `SeededDataLabel` | Purple "Illustrative history" banner | — |
| `DemoHint` | Reviewer-guidance animations; variants `dot` / `pill` / `arrow` / `glow` | `variant`, `label?`, `show?` |

**Evidence state visual config** (used by `WhatWorkedBeforePanel` and `EvidenceDrawer`): every state is always **icon + colour + text label** (colour is never the only signal):
- `improvement` → ✓ emerald, "Associated with improvement"
- `no_change` → – slate, "No observed change"
- `insufficient` → ? slate, "Insufficient evidence"
- `not_tried` → ✕ slate, "Not tried" (kept in record, excluded from association analysis)

---

## 7. App Orchestration & State

### 7.1 Boot sequence (`App.jsx`)
```
mount → IntroScreen (15s, skippable)  → setIntroComplete(true)
      → DemoModal (disclaimer + ContextForge links) → dismiss
      → routed app becomes interactive
```
Routes are always mounted (faded/opacity-gated on `introComplete`) so the first navigation after dismiss feels instant. `App.jsx` wraps everything in `DemoProvider` then `HashRouter`.

### 7.2 Global state (`lib/DemoContext.jsx`)
Ephemeral React Context, resets on reload:

| Field | Type | Meaning |
|---|---|---|
| `introComplete` / `setIntroComplete` | bool | intro finished or skipped |
| `modalDismissed` / `setModalDismissed` | bool | disclaimer modal dismissed (session) |
| `assessmentAnalyzed` / `setAssessmentAnalyzed` | bool | set true after Analyse; changes Dashboard CTA copy |
| `loggedInterventions` | array | live actions logged during the session |
| `logIntervention(studentId, entry)` | fn | appends `{ studentId, ...entry, loggedAt }` |
| `getInterventionsFor(studentId)` | fn | filters logged actions for a student |

`StudentPassport` merges `student.interventionHistory` (seeded) with `getInterventionsFor(id)` (live) so a freshly-logged action appears immediately in "What Worked Before".

### 7.3 Implementation gotchas (carry forward)
- **Portals for overlays.** `EvidenceDrawer` and `InterventionModal` render with `createPortal(..., document.body)` to escape the animated route wrapper's stacking/pointer-event context. Any new overlay must do the same or it may appear dead to clicks.
- **Modal state init.** `InterventionModal`'s form lives in an inner component remounted via a `key`, so `useState(recommendedActionId)` initialises correctly each open — avoids a stale-`useEffect` race that previously left Save inert.
- **Pre-selected action.** The recommended action is selected on open, enabling a true one-tap Save during a demo.
- **Historical bug worth remembering:** Save once did nothing because `logIntervention` was not destructured from `useDemo()` in `StudentPassport` — it threw silently in the click handler. Always confirm context fns are actually pulled.
- **lucide-react:** the `Github` export does not exist in this version; use `GitBranch`.

---

## 8. Data Initialisation (`src/data/`) — exact schema & values

All data is static. Nothing is fetched. Three files:

### 8.1 `interventions.js`
- **`INTERVENTION_TYPES`** — 8 selectable actions, each `{ id, label, description }`:
  `visual-fraction-strips`, `peer-activity`, `scaffolded-practice`, `local-language-example`, `extra-worksheets`, `manipulatives`, `number-line`, `other`.
- **`EVIDENCE_STATES`** — `{ IMPROVEMENT:'improvement', NO_CHANGE:'no_change', INSUFFICIENT:'insufficient', NOT_TRIED:'not_tried' }`.
- **`ANANYA_INTERVENTION_HISTORY`** — 4 entries, schema:
  `{ id, term, date, concept, action, actionId, status, evidenceState, confidence, evidenceId, note }`. The four:
  | id | term | action | status | evidenceState | confidence | evidence |
  |---|---|---|---|---|---|---|
  | int-001 | Class 5 · Term 2 | Visual fraction strips | tried | improvement | Moderate | ev-001 |
  | int-002 | Class 5 · Term 2 | Extra worksheets | tried | no_change | Low | ev-002 |
  | int-003 | Class 5 · Term 3 | Peer activity | partially_tried | insufficient | null | ev-003 |
  | int-004 | Class 6 · Term 1 | Scaffolded practice | tried | insufficient | null | ev-004 |
- **`EVIDENCE_RECORDS`** — map keyed by evidenceId (`ev-001`…`ev-004`, `ev-current`). Each:
  `{ id, title, date, body, outcomeLabel, disclaimer, questions:[{ q, pre, post }] }`.
  `pre`/`post` strings render colour-coded in the drawer (`✓ Correct` → green, `✗ Incorrect` → red, `Pending`/`null` → neutral). `ev-001` shows three questions improving pre→post; `ev-002` shows no change; `ev-003` has no question rows (partial); `ev-004` shows "Pending"; `ev-current` is the source for the current gap (post = null).
- **`ANANYA_REASONING_STEPS`** — 5 steps `{ step, label, detail }`: `01 Identify Gap → 02 Retrieve Memory → 03 Rank Evidence → 04 Build Context → 05 Recommend`. This is what the reasoning panel renders.

### 8.2 `assessments.js`
- **`DEMO_ASSESSMENT`** — `{ id, title:'Class 6A — Fractions & Word Problems', subject, class:'6A', term:'Term 2', date:'January 2025', totalQuestions:10, questions:[{ id, text, concept, marks }] }`. The 10 questions are concept-tagged across Fractions, Word Problems, Place Value, Borrowing Across Zero.
- **`CLASS_ANALYSIS`** — `{ assessmentId, totalStudents:45, conceptBreakdown:[…], classReteachHeadline, smallGroupNote, strengthNote }`.
  - `conceptBreakdown` entries: `{ concept, studentsAffected, priority, label, description, colour }` where `priority ∈ { reteach, targeted, small_group, strength }`:
    | concept | affected | priority | colour |
    |---|---|---|---|
    | Place Value | 18 | reteach | amber |
    | Word Problems | 9 | targeted | orange |
    | Fractions | 12 | reteach | amber |
    | Borrowing Across Zero | 6 | small_group | red |
    | Multiplication Facts | 0 | strength | green |
  - `classReteachHeadline` = "Reteach place value tomorrow — 18 of 45 students showed concept-level gaps."
  - `smallGroupNote` = "6 students need 1:1 support on borrowing across zero."
  - `strengthNote` = "Multiplication facts are mostly secure."

### 8.3 `students.js`
- **`CONCEPTS`** — enum of gap names: `PLACE_VALUE, BORROWING, FRACTIONS, WORD_PROBLEMS, MULTIPLICATION, DIVISION, RATIO, NONE`.
- **`GAP_COLOURS`** — concept → colour token: Place Value=amber, Borrowing=red, Fractions/Word Problems=orange, Multiplication/Division=sky, Ratio=purple, None=green.
- **`STUDENTS`** — array of **exactly 45**. Distribution by `currentGap`: **18 Place Value · 12 Fractions · 9 Word Problems · 6 Borrowing**. Per-student schema:
  `{ id, name, class:'6A', subject:'Mathematics', currentGap, assessmentScore (0–10), seeded, interventionHistory, reasoningSteps, recommendation, timeline }`.
  - **Ananya Nair** (`id:'ananya-nair'`) is the **only `seeded:true`** student and the only one with a populated `recommendation`, `reasoningSteps`, `interventionHistory`, and `timeline`. Her `currentGap = Word Problems`, `secondaryGap = Fractions`, `assessmentScore = 6`.
    - `recommendation = { action:'Use concrete visual representation + scaffolded word problems', actionId:'visual-fraction-strips', rationale, hypothesis, evidenceId:'ev-current', confidence:'Moderate' }`.
    - `timeline` = 8 entries spanning Class 5 Term 2 (Mar 2024) → Class 6 Term 2 (Jan 2025), `type ∈ { gap, intervention, improvement, current }`, each linked to an `evidenceId`.
  - All other 44 students are `seeded:false` with `recommendation: null` and empty `interventionHistory/reasoningSteps/timeline` (they intentionally drive the "day-one, no history" empty states).
- **Helpers:** `getStudentById(id)`, `getStudentsByGap(concept)`, and `NEEDS_ATTENTION` (priority-ordered subset: all Borrowing students first, then a few Word Problems + Fractions) used by the Dashboard.

---

## 9. Scripted Demo Workflow (the golden path)

This is the exact sequence to record for the video walkthrough. Total ~3 minutes.

| Step | Screen | Action | What it proves |
|---|---|---|---|
| 0 | Boot | Let IntroScreen play (or Skip →); read DemoModal; tap **Continue to Demo** | Honest framing: simulated demo, real engine = ContextForge |
| 1 | Dashboard | Read the loud priority: *"Reteach place value tomorrow — 18 of 45…"* | Class-level "what to reteach" from day one |
| 2 | Upload | Tap **Upload** tab → tap scan zone → 45 sheets light up → **Analyse Assessment** | Capture + diagnosis runs live from scratch |
| 3 | Results | See class diagnosis by concept; expand **Word Problems** | Concept-level gaps, grouped (not ranked) |
| 4 | Results → Passport | Tap highlighted **Ananya Nair** | Entry into longitudinal memory |
| 5 | Passport | Read **What To Try Next** (above history) + open the **Evidence-first learning memory** reasoning panel | Grounded recommendation + retrieval narrative |
| 6 | Passport | Read **What Worked Before**: ✓ Visual fraction strips (improvement) · – Extra worksheets (no change) · ? Peer activity (insufficient) | Honest memory, three evidence states |
| 7 | Passport | Tap any **Evidence / Source** chip → **Evidence Drawer** | Every claim cites its source assessment + disclaimer |
| 8 | Passport | Tap **Log what I did** → recommended action pre-selected → **Save** → ✓ "Logged." | ≤2-tap logging; faster than forgetting |
| 9 | Passport | Logged action now appears in **What Worked Before** | The loop closes; memory updates live |
| 10 | Class Insights | Tab → concept groups with proportion bars; expand a group | Glanceable class view, concept over score |
| 11 | Settings | "Working locally", AI Available, no external API | Offline / on-device guarantee |

**Demo integrity rule (non-negotiable):** seeded/illustrative data is always labelled (`SeededDataLabel`, "Demo student"). Never present it as live. The moment a reviewer suspects faked-as-live data, trust collapses.

---

## 10. Build Status & Conventions

- **Status:** all screens built; all 5 tabs functional; the full loop is clickable end-to-end. `npm run lint` and `npm run build` both pass clean.
- **Animations** are tuned around a shared easing `[0.25, 0.1, 0.25, 1]` for page/stagger, and `[0.32, 0.72, 0, 1]` (iOS-like) for bottom-sheets. Demo-guidance pulses use amber and ~1s cycles.
- **Accessibility:** evidence/status always carry icon + colour + text; touch targets ≥44px; body text ≥13px; copy is plain and never clinical about the child. Copy is externalisable for Hindi/regional support (not yet wired, but designed for).
- **When extending:** keep new data in `src/data/`, new screens in `src/pages/`, reusable UI in `src/components/`, and demo state in `lib/DemoContext.jsx`. Respect the §1.5 hard constraints and §2 principles. Render any new overlay via a portal.

---

_Prototype created for SahAI for Shiksha 2026 — Challenge 2.4._

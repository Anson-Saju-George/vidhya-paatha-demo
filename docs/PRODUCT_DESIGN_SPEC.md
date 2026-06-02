# PRODUCT_DESIGN_SPEC.md — VidyaPaatha Passport

**Tagline:** Identify learning gaps today. Remember what worked before. Decide what to try next.
**This document:** UI/UX specification for the Phase 2 MVP. Defines screens, flows, components, interactions, and copy. **Not** a technical architecture document and **not** a redesign — it operationalises the locked Proposal, Deck, PRD, and MVP_SCOPE.
**Scope (locked):** foundational mathematics, Classes 3–6, single teacher, single classroom, responsive web app, entry-level devices, low connectivity.
**Hard constraints:** no chatbot-first interface · no full analytics dashboard · no parent/student screens · no permanent risk labels · no handwriting-OCR workflow · no complex onboarding.

---

## 1. Product Design Principles

These are the decision filters for every screen. When a layout choice conflicts with a principle, the principle wins.

- **Teacher First.** The interface serves a time-poor teacher between classes. Every screen must be usable in seconds, one-handed, on a basic device. If a screen needs explanation, it is wrong.
- **Low Cognitive Load.** One primary thing per screen. Defaults over decisions. Show the next action, not the full data behind it. Progressive disclosure: detail lives behind a tap, never on the surface.
- **Evidence Before AI.** Any AI-generated statement (gap, recommendation, "what worked," cross-concept hypothesis) must show, or be one tap from, the evidence it rests on. No claim floats free of its source.
- **Action Over Analytics.** Every view answers "so what do I do?" Numbers and charts are never the destination; the recommended action is. No data-exploration surfaces.
- **Memory Without Stigma.** The product records concept-level gaps and intervention history, never a permanent label on a child. No "at-risk," no red student tags, no ranking by ability. Language describes the *concept* and the *evidence*, not the *child*.
- **Two-Tap Logging.** Recording what the teacher did must cost at most two taps in the common case. Logging that feels like paperwork will not happen, and the memory layer will stay empty.

---

## 2. Information Architecture

**Primary navigation** (persistent). On mobile: bottom tab bar, max 5 items. On desktop/tablet: left rail.

1. **Dashboard** — home; today's priorities and quick entry to the loop.
2. **Students** — roster; entry to any Student Passport.
3. **Upload Assessment** — the capture entry point (visually emphasised — it starts the loop).
4. **Class Insights** — class-level reteach priorities.
5. **Settings / Local Status** — local/offline status, language, session.

**Detail views** (not top-level tabs, reached contextually):
- **Student Passport** — reached by tapping a student (from Students, Dashboard, or Assessment Results).
- **Assessment Results** — reached after an Upload/Enter Assessment completes.
- **Evidence Drawer** — a slide-over invoked from any EvidenceChip, on any screen.
- **Intervention Logging Modal** — invoked from a RecommendationCard, on Results or Passport.

**Navigation rules.** Maximum depth: 3 (tab → detail → drawer/modal). No nested menus. The loop must be completable without ever using a hamburger menu or hunting through settings.

---

## 3. Primary User Flows

For each: goal · entry point · steps · success state · failure/empty state.

### Flow A — First assessment, no student history
- **Goal:** get day-one value (diagnosis + reteach priority) before any memory exists.
- **Entry point:** Upload Assessment (from Dashboard or nav).
- **Steps:** (1) Select/confirm the assessment's concept-tagged answer key. (2) Enter or upload student responses. (3) Submit → system diagnoses. (4) Land on Assessment Results: per-student GapBadges + ClassReteachBanner. (5) Tap a student → Student Passport shows current gap + a first RecommendationCard.
- **Success state:** teacher sees a concrete class reteach priority and at least one per-student recommendation, all evidence-cited.
- **Empty/failure state:** if no history exists, WhatWorkedBeforePanel and PassportTimeline show a clear, useful empty state (see §7) — never a blank panel. If capture is incomplete (missing responses), Results shows which students/items are missing and lets the teacher fix or proceed with partial data.

### Flow B — Student with seeded history (the longitudinal value)
- **Goal:** show "What Worked Before" and "What To Try Next" using accumulated history.
- **Entry point:** Students → tap a student who has history (carries a SeededDataLabel in MVP).
- **Steps:** (1) Open Student Passport. (2) PassportTimeline shows the learning journey across terms. (3) WhatWorkedBeforePanel shows interventions by evidence state, each with an EvidenceChip. (4) WhatToTryNextPanel shows a grounded next step, including any *possible* cross-concept hypothesis, with citations. (5) Teacher taps an EvidenceChip → Evidence Drawer shows the source assessment.
- **Success state:** teacher understands the history and has a grounded next action without reading raw data.
- **Empty/failure state:** if evidence is thin for a given concept, the panel shows "Insufficient Evidence" rather than implying a pattern (see §7).

### Flow C — Teacher logs an intervention
- **Goal:** record what the teacher actually did, in ≤2 taps, preserving status integrity.
- **Entry point:** RecommendationCard → "Log what I did" (on Assessment Results or Student Passport).
- **Steps:** (1) Intervention Logging Modal opens, pre-listing the recommended action(s) plus a short curated list and "Other." (2) Teacher taps the action they took — it selects and **defaults to status "Tried"** (tap 1). (3) Teacher taps **Save** (tap 2). *Optional:* change status to "Partially Tried" or "Not Tried" (one extra tap), or add a one-line note (optional, never required).
- **Success state:** confirmation ("Logged — I'll check whether this helped next time"); Passport/timeline updates immediately.
- **Empty/failure state:** if the teacher closes without selecting, nothing is logged (no forced entry). If offline, the log is saved locally and reflected immediately (see Flow F).

### Flow D — Teacher reviews What Worked Before
- **Goal:** reuse what previously helped this child; avoid repeating what didn't.
- **Entry point:** Student Passport → WhatWorkedBeforePanel.
- **Steps:** (1) Panel lists interventions grouped by evidence state: Associated with Improvement, No Observed Change, Insufficient Evidence. (2) Each row carries an EvidenceChip. (3) Tap a chip → Evidence Drawer. (4) Optionally, "Use this" pre-fills the Intervention Logging Modal with that action.
- **Success state:** teacher chooses a next action informed by history.
- **Empty/failure state:** no qualifying history → friendly empty state explaining the panel fills as interventions are logged. Interventions marked "Not Tried" are **not** shown here (excluded from association); they remain visible in the timeline, flagged.

### Flow E — Teacher views class-level reteach priority
- **Goal:** direct limited class time at the concept/group that needs it most.
- **Entry point:** Class Insights (or the ClassReteachBanner on Dashboard/Results).
- **Steps:** (1) ClassReteachBanner states the single top reteach priority. (2) ConceptGroups list students clustered by shared concept gap (not by score). (3) Tap a group → see members; tap a student → Passport.
- **Success state:** teacher knows what to reteach tomorrow and which small group needs 1:1.
- **Empty/failure state:** before any assessment, Class Insights explains it populates after the first assessment.

### Flow F — Offline / local mode
- **Goal:** keep the loop working with no internet.
- **Entry point:** any screen; connectivity is ambient.
- **Steps:** (1) LocalStatusBadge always shows current mode (Local / Synced). (2) All capture, diagnosis, logging, and AI processing run against the local machine. (3) Actions taken offline are saved locally and reflected immediately. (4) On reconnect, status updates to Synced.
- **Success state:** teacher never blocked by connectivity; no data lost.
- **Empty/failure state:** if the local AI service is unreachable, diagnosis/recommendation degrade gracefully — structured data (gaps from answer key, history, logging) still works; AI-generated synthesis shows a clear "AI processing unavailable, retrying" state rather than a spinner or a crash.

---

## 4. Screen Specifications

Each: purpose · primary question answered · required content · primary action · secondary actions · empty state · error state · mobile considerations.

### A. Login / Local Session
- **Purpose:** establish which teacher's local session this is. Minimal — single teacher, single classroom, no complex onboarding.
- **Primary question:** "Am I in my own workspace?"
- **Required content:** teacher name/profile, class label, LocalStatusBadge, language toggle.
- **Primary action:** Enter (select profile / optional PIN).
- **Secondary actions:** change language; view local status.
- **Empty state:** first run → single "Set up this classroom" step (name, class, language) — no multi-screen wizard.
- **Error state:** local data unavailable → clear recovery message; never blocks behind a login server.
- **Mobile:** single column, one large action; keyboard avoided where possible (selection over typing).

### B. Teacher Dashboard
- **Purpose:** the home that orients the teacher to today's priorities and the loop entry points.
- **Primary question:** "What needs my attention, and what do I do next?"
- **Required content:** ClassReteachBanner (top reteach priority, if an assessment exists); shortcut to Upload Assessment; a short list of students needing attention (by concept gap, not label); LocalStatusBadge.
- **Primary action:** Upload / Enter Assessment.
- **Secondary actions:** open a flagged student; open Class Insights.
- **Empty state:** no assessments yet → a single prompt: "Start with your first assessment" + the upload entry.
- **Error state:** data load failure → retry affordance, last-known state preserved.
- **Mobile:** banner first, single primary button, scannable list; nothing requiring horizontal scroll.

### C. Upload / Enter Assessment
- **Purpose:** capture concept-tagged structured responses (entry or upload). No handwriting OCR.
- **Primary question:** "How do I get this test's results in quickly?"
- **Required content:** answer-key/concept-set selector; response entry grid (numeric/MCQ) or upload of a structured record; per-student/per-item completeness indicator.
- **Primary action:** Submit for diagnosis.
- **Secondary actions:** save draft; edit answer key selection.
- **Empty state:** no answer key selected → guide to pick one before entry.
- **Error state:** missing/invalid responses → inline flags showing exactly what's missing; allow partial submit with a clear note.
- **Mobile:** entry optimised for thumb input; large numeric inputs; avoid dense spreadsheet UI — one student or one item at a time if needed.

### D. Assessment Results
- **Purpose:** show diagnosis immediately after capture — the day-one value.
- **Primary question:** "What did this assessment reveal, and what do I do tomorrow?"
- **Required content:** ClassReteachBanner; per-student GapBadges; ConceptGroups; per-student access to a RecommendationCard. Every gap is evidence-linked.
- **Primary action:** act on the class reteach priority / open a student to log.
- **Secondary actions:** open Evidence Drawer; jump to a Passport.
- **Empty state:** N/A (Results only exists after a submission); if diagnosis pending → clear processing state.
- **Error state:** AI synthesis unavailable → structured gaps still shown from the answer key; recommendation area shows graceful "unavailable" state.
- **Mobile:** banner dominant at top; students as a vertical scannable list of StudentCards; no wide tables.

### E. Student Passport
- **Purpose:** the home of memory — one child's journey, history, and grounded next step.
- **Primary question:** "What does this child struggle with, what worked before, and what should I try next?"
- **Required content:** student header (name, class, subject); current GapBadge(s); PassportTimeline; WhatWorkedBeforePanel; WhatToTryNextPanel; SeededDataLabel if applicable; EvidenceChips throughout. No risk label, no ability ranking.
- **Primary action:** "Log what I did" (opens Intervention Logging Modal).
- **Secondary actions:** open EvidenceChip → Evidence Drawer; "Use this" from a WhatWorkedBefore row.
- **Empty state:** new student, no history → current diagnosis + first recommendation shown; WWB/timeline show the "fills over time" empty state (see §7).
- **Error state:** AI panels unavailable → timeline and logged history (structured) still render; AI panels show graceful unavailable state.
- **Mobile:** vertical stack in priority order — current gap → What To Try Next → What Worked Before → timeline. Action button sticky/reachable.

### F. Intervention Logging Modal
- **Purpose:** record what the teacher did, in ≤2 taps, with status integrity.
- **Primary question:** "How do I record what I did without it being a chore?"
- **Required content:** recommended action(s) surfaced first; short curated InterventionActionCards + "Other"; InterventionStatusSelector (default Tried); optional one-line note.
- **Primary action:** Save.
- **Secondary actions:** change status; add note; add an "Other" action; cancel.
- **Empty state:** opens pre-populated with the recommendation; if none, shows the curated list.
- **Error state:** offline → saved locally, confirmed immediately; never lost.
- **Mobile:** bottom-sheet modal; large tap targets; status selector as segmented control; Save fixed at bottom within thumb reach.

### G. Class Insights
- **Purpose:** class-scale decision aid — what to reteach, which group needs 1:1. Concept-driven, not score-driven.
- **Primary question:** "Where do I spend my limited class time?"
- **Required content:** ClassReteachBanner; ConceptGroups (students clustered by shared concept gap); class strengths. **Generated from diagnosed concept-level gaps, not marks/percentages.**
- **Primary action:** act on the top reteach priority.
- **Secondary actions:** expand a ConceptGroup; open a student Passport.
- **Empty state:** before first assessment → "populates after your first assessment."
- **Error state:** data load failure → retry, preserve last state.
- **Mobile:** banner first; groups as collapsible sections; no multi-axis charts.

### H. Evidence Drawer / Citation View
- **Purpose:** show the source behind any AI claim — the trust mechanism.
- **Primary question:** "Why is the system telling me this?"
- **Required content:** the specific assessment(s)/record(s) supporting the claim, with date/term and the relevant concept; plain-language link between evidence and claim.
- **Primary action:** close/return.
- **Secondary actions:** navigate to the source assessment.
- **Empty state:** if a claim somehow lacks evidence, it should not have been shown — drawer states "insufficient evidence" rather than fabricating support.
- **Error state:** source unavailable → honest message, no invented citation.
- **Mobile:** slide-over from the side/bottom; dismissible with a swipe; does not navigate away from context.

### I. Local System Status (Settings / Local Status)
- **Purpose:** make the local/offline reality legible and controllable.
- **Primary question:** "Is everything working and saved?"
- **Required content:** LocalStatusBadge (Local/Synced), AI-service status, last-saved/sync time, language setting, classroom/profile.
- **Primary action:** retry/sync (when applicable).
- **Secondary actions:** change language; manage session.
- **Empty state:** N/A.
- **Error state:** AI service down → clear status + what still works (structured features) vs what's paused (AI synthesis).
- **Mobile:** simple list; status at top; large toggles.

---

## 5. Component Inventory

Each: purpose · content · states · rules.

- **StudentCard** — *Purpose:* compact entry to a student. *Content:* name, current concept gap (short), small status cue, SeededDataLabel if applicable. *States:* default, needs-attention (by concept gap), seeded, pressed. *Rules:* never shows a risk/ability label; never ranks by score; gap described by concept, not severity colour alone.
- **GapBadge** — *Purpose:* name a concept-level gap. *Content:* concept name (e.g., "Borrowing across zero"), optional small confidence cue. *States:* gap, emerging (recent), recurring (across terms), resolved. *Rules:* describes the concept, not the child; no "weak student" framing; always traceable to evidence.
- **ConceptGroup** — *Purpose:* cluster students by shared concept gap for class action. *Content:* concept name, count, member StudentCards. *States:* collapsed, expanded, empty. *Rules:* grouping by concept, never by overall mark.
- **EvidenceChip** — *Purpose:* one-tap access to the source of a claim. *Content:* short source reference (e.g., "Class 5, Term 2"). *States:* default, pressed, unavailable. *Rules:* present on every AI claim; tapping opens Evidence Drawer; if no evidence, the claim is not shown.
- **RecommendationCard** — *Purpose:* present a grounded next action. *Content:* recommended action(s), brief rationale, EvidenceChip, "Log what I did." *States:* default, grounded, unavailable (AI down), empty. *Rules:* must cite evidence; cross-concept links phrased as hypotheses ("may relate to…"); never causal; avoids re-recommending actions marked "No Observed Change."
- **InterventionActionCard** — *Purpose:* a tappable action the teacher can log. *Content:* action label (e.g., "Visual fraction strips"), tap target. *States:* unselected, selected (defaults to Tried), recommended (highlighted). *Rules:* one tap selects; list is short and curated; "Other" available; selecting defaults status to Tried.
- **InterventionStatusSelector** — *Purpose:* record whether the action was actually attempted. *Content:* Tried / Partially Tried / Not Tried. *States:* Tried (default), Partially Tried, Not Tried. *Rules:* default Tried; one tap to change; "Not Tried" excludes the item from association analysis (it stays in history, flagged).
- **PassportTimeline** — *Purpose:* show the learning journey chronologically. *Content:* assessments, gaps, logged interventions (+status), observed progress, across terms. *States:* populated, sparse, empty, seeded. *Rules:* chronological; evidence-linked; seeded entries clearly labelled; "Not Tried" interventions visible but flagged.
- **WhatWorkedBeforePanel** — *Purpose:* recall interventions by evidence state. *Content:* rows grouped as Associated with Improvement / No Observed Change / Insufficient Evidence, each with EvidenceChip and optional "Use this." *States:* populated, insufficient-evidence, empty. *Rules:* associations only, never causal; excludes "Not Tried"; shows "Insufficient Evidence" rather than implying a pattern from one data point.
- **WhatToTryNextPanel** — *Purpose:* grounded forward recommendation. *Content:* recommended next action, optional cross-concept hypothesis, EvidenceChip, "Log what I did." *States:* grounded, hypothesis-present, unavailable, empty. *Rules:* grounded + cited or not shown; diverse when evidence supports multiple actions; never repeats a "No Observed Change" action.
- **ClassReteachBanner** — *Purpose:* the single dominant class priority. *Content:* one headline (e.g., "Reteach place value tomorrow — 60% of the class"). *States:* present, none-yet. *Rules:* one priority, not a list; concept-based; the most visually dominant element on its screens.
- **LocalStatusBadge** — *Purpose:* always-visible connectivity/save state. *Content:* Local / Synced + last-saved cue. *States:* local, synced, syncing, AI-unavailable. *Rules:* always visible; reassuring, not alarming; never blocks the UI.
- **SeededDataLabel** — *Purpose:* mark illustrative/seeded data honestly. *Content:* short label ("Illustrative history"). *States:* present/absent. *Rules:* unmissable wherever seeded data appears; never styled to look like live data.

---

## 6. Visual Hierarchy

**Must be visually dominant (in roughly this order):**
1. **Class reteach priority** (ClassReteachBanner) — the loudest element on Dashboard/Results/Class Insights.
2. **Current student gap** — the first thing on a Passport.
3. **What To Try Next** — the action, placed above history.
4. **What Worked Before** — the recall, directly supporting the action.
5. **Evidence citations** — visible and reachable, never buried.
6. **Teacher action buttons** ("Log what I did," "Use this") — large, obvious, thumb-reachable.

**Must NOT dominate (present only on demand / de-emphasised):**
- Raw marks and percentages — secondary at most; never the headline.
- Complex analytics / charts — avoided; grouping over graphing.
- Any AI chat interface — there is none; the product is structured, not conversational.
- Technical details (model, retrieval, sync internals) — confined to Local Status.

Rule of thumb: on any screen, a teacher's eye should land first on *what to do*, second on *the child's gap*, and only then on *the evidence* — and never on a number for its own sake.

---

## 7. Copy and Microcopy

Recommended strings (adapt for Hindi/regional translation; keep plain and warm).

- **Empty student passport:** "No history yet. As you log what you try with this student, their learning journey and what worked will build here."
- **Insufficient evidence:** "Not enough evidence yet to say whether this helped. This will become clearer with more assessments."
- **Association, not causation:** "Associated with improvement — based on the evidence below. This shows a pattern, not a proven cause."
- **Seeded demo history:** "Illustrative history — pre-loaded to show how a student's record builds over time."
- **Not Tried intervention:** "Marked as not tried. This stays in the record but won't count as evidence about what works."
- **Offline mode:** "Working locally. Everything is saved on this device and will sync when you're back online."
- **Evidence citation (chip → drawer):** "Why this? Based on: [assessment, term]. Tap to view the source."
- **Teacher override:** "This is a suggestion. You decide — you can ignore it or choose your own action."
- **Logging confirmation:** "Logged. I'll check whether this helped at the next assessment."
- **AI unavailable:** "AI suggestions are paused right now. Your data and history are safe; retrying."

Tone for all copy: plain, supportive, never clinical about the child; the system suggests and remembers, the teacher decides.

---

## 8. Accessibility and Language

- **Large touch targets:** minimum ~44–48px; primary actions larger. No tiny icons as sole controls.
- **Readable font size:** body ≥16px; key headlines and the reteach banner notably larger; generous line spacing.
- **Low visual clutter:** one primary element per screen; whitespace as a feature; progressive disclosure for detail.
- **Hindi / regional language readiness:** all copy externalised for translation; Noto (or equivalent) fonts for Indian scripts; layouts must tolerate longer translated strings without breaking.
- **Colour is never the only signal:** the three evidence states and intervention statuses always pair colour with an icon **and** a text label (e.g., ✓ "Associated with improvement," – "No observed change," ? "Insufficient evidence"). Same for connectivity state.
- **Offline feedback:** connectivity and save state always visible and legible; actions confirm success explicitly; nothing fails silently.
- **Input minimisation:** selection over typing everywhere; numeric keypads for numeric entry; the optional note is the only free-text field in the core loop.

---

## 9. MVP Wireframe Descriptions (text-based)

**Dashboard (mobile, top→bottom):**
```
[ LocalStatusBadge: Local ]
[ ClassReteachBanner: "Reteach place value tomorrow — 60% of class" ]  ← dominant
[ Big button: + Upload / Enter Assessment ]
[ "Needs attention" — vertical list of StudentCards (by concept gap) ]
[ bottom tab bar: Dashboard | Students | Upload | Class | Settings ]
```

**Assessment Results (mobile):**
```
[ ClassReteachBanner ]  ← dominant
[ ConceptGroup: "Place value (12 students)"  ▸ ]
[ ConceptGroup: "Borrowing (6 students)"     ▸ ]
[ Student list: StudentCard + GapBadge each, tappable ]
   (tap student → Student Passport)
```

**Student Passport (mobile, priority order):**
```
[ Header: Ananya · Class 6 · Mathematics ]  [ SeededDataLabel if applicable ]
[ Current GapBadge: "Word problems (recurring)" ]
[ WhatToTryNextPanel: action + (hypothesis) + EvidenceChip ]  ← above history
[ Primary button: Log what I did ]
[ WhatWorkedBeforePanel:
    ✓ Visual fraction strips — Associated with improvement [chip]
    – Extra worksheets — No observed change [chip]
    ? Peer activity — Insufficient evidence ]
[ PassportTimeline: Class5 → Class6 T1 → T2 (chronological, evidence-linked) ]
```

**Intervention Logging Modal (mobile bottom-sheet):**
```
[ Title: What did you try with Ananya? ]
[ Recommended: (InterventionActionCard) Visual fraction strips  ⟵ tap = selected/Tried ]
[ (InterventionActionCard) Peer activity ]
[ (InterventionActionCard) Scaffolded practice ]
[ (InterventionActionCard) + Other ]
[ InterventionStatusSelector: ( Tried* | Partially | Not Tried ) ]
[ optional one-line note ............................ ]
[ Save ]   ← tap action + Save = 2 taps
```

**Class Insights (mobile):**
```
[ ClassReteachBanner ]  ← dominant
[ ConceptGroup: "Place value (12)"  ▸ expand → member StudentCards ]
[ ConceptGroup: "Borrowing (6)"     ▸ ]
[ Class strengths: "Multiplication facts" ]
   (no charts, no score ranking)
```

---

## 10. UX Risks and Mitigations

- **Teacher overwhelmed by too many insights.** *Mitigation:* one dominant priority per screen (reteach banner / current gap); everything else secondary or behind a tap; no analytics surface.
- **Logging feels like work.** *Mitigation:* ≤2-tap flow, recommendation pre-surfaced, status defaults to Tried, note optional, immediate confirmation that frames the payoff ("I'll check if this helped").
- **Student labels feel stigmatising.** *Mitigation:* no permanent risk/ability labels anywhere; concept-level language; grouping by concept not score; warm, non-clinical copy.
- **Evidence feels hidden.** *Mitigation:* EvidenceChip on every AI claim, one tap to the source; "Why this?" microcopy; claims without evidence are not shown.
- **Seeded history misunderstood as live.** *Mitigation:* unmissable SeededDataLabel wherever seeded data appears; demo copy states it plainly; seeded data never styled like live data.
- **Mobile screen crowding.** *Mitigation:* strict one-primary-element-per-screen, vertical priority stacking, progressive disclosure, no wide tables or multi-axis charts; sticky primary action within thumb reach.

---

## 11. Done Checklist (UI/UX MVP-ready)

The UI/UX is MVP-ready when **every** box is true:

- [ ] Primary nav implemented (Dashboard, Students, Upload, Class Insights, Settings/Local Status); loop completable without menus.
- [ ] Upload/Enter Assessment supports structured, concept-tagged capture (entry/upload); no handwriting OCR.
- [ ] Assessment Results shows ClassReteachBanner + per-student GapBadges + ConceptGroups, all evidence-linked, from scratch.
- [ ] Student Passport renders in priority order: current gap → What To Try Next → What Worked Before → timeline.
- [ ] Intervention Logging Modal completes in ≤2 taps in the common case; status defaults to Tried; note optional.
- [ ] InterventionStatusSelector supports Tried / Partially Tried / Not Tried; "Not Tried" excluded from What Worked Before.
- [ ] WhatWorkedBeforePanel shows the three evidence states with icon + colour + text label; "Insufficient Evidence" handled honestly.
- [ ] WhatToTryNextPanel shows grounded, cited recommendations; cross-concept links phrased as hypotheses; no repeat of "No Observed Change" actions.
- [ ] Every AI claim has a reachable EvidenceChip → Evidence Drawer; no uncited claims displayed.
- [ ] Class Insights generated from concept gaps, not marks; one dominant reteach priority; no charts/score ranking.
- [ ] No permanent risk/ability labels anywhere; concept-level, non-stigmatising language throughout.
- [ ] SeededDataLabel present and unmissable wherever seeded data appears.
- [ ] LocalStatusBadge always visible; offline loop works; AI-unavailable degrades gracefully (structured features keep working).
- [ ] Accessibility: ≥44–48px targets, ≥16px body, colour never the sole signal, Hindi/regional-ready layouts.
- [ ] Useful empty states for new student, sparse evidence, and pre-first-assessment — never a blank panel.
- [ ] No chatbot interface, no analytics dashboard, no parent/student screens, no complex onboarding.

---

*Source of truth: Phase 1 Proposal, Pitch Deck, PRD, and MVP_SCOPE.md. This document governs Phase 2 UI/UX. It defines screens, flows, components, and interactions only — data models, retrieval, and architecture belong in the Technical Design Document.*

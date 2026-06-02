# MVP_SCOPE.md — VidyaPaatha Passport (Phase 2 Sprint)

**Purpose of this file:** scope control. It defines exactly what gets built in the 14-day sprint and what does not. When in doubt during implementation, this file decides. If a feature is not here, we do not build it.

**Product in one line:** an intervention feedback loop with longitudinal learning memory for foundational-math teachers (Classes 3–6) in large, mixed-ability classrooms.

**The only thing we are proving:** the loop works and is useful — Assessment → Gap Diagnosis → Recommendation → Teacher Action → Intervention Logging → Reassessment → What Worked Before → What To Try Next.

---

## 1. Purpose of the MVP

The MVP exists to validate the *vision*, not to ship a product. Concretely, we are testing whether:

- teachers value **concept-level diagnosis** (the "why," not just the score),
- teachers will actually **log interventions** in ≤2 taps,
- preserved **intervention memory** ("What Worked Before") is useful to a teacher,
- **context-aware recommendations** ("What To Try Next") are useful and trusted.

We are explicitly **not** validating: statewide or multi-school deployment, curriculum coverage, or long-term learning outcomes. Those need real pilots over real time and are out of reach in a sprint. Any work that drifts toward them is scope creep and gets cut.

---

## 2. MVP Success Criteria

The MVP is successful (in the demo and as a build) if, end to end, the following all work:

- Teacher can get a class's assessment responses into the system (entry or upload).
- System returns **per-student concept-level gaps** from those responses.
- System returns a **class-level "what to reteach" view**.
- System produces a **recommendation** for a student's gap.
- Teacher can **log the intervention in ≤2 taps** (optional one-line note).
- The **Student Passport updates** to reflect the logged intervention and outcome.
- **What Worked Before** appears for a student with history, showing associations (not causal claims).
- **What To Try Next** appears, grounded in that student's history.
- **Every diagnosis/recommendation/historical claim cites the evidence it came from.**
- Recommendations clearly distinguish between generated insights and teacher-recorded actions.
- The whole thing runs **without an internet connection** during the demo.

No fake numeric targets. Success = these behaviours exist and are believable, not a made-up accuracy figure.

---

## 3. In Scope

Demo priority: **Critical** = demo fails without it · **Important** = strengthens credibility · **Cuttable** = drop first if behind.

| Feature | Why included | Demo priority |
|---|---|---|
| **Assessment Capture** | Entry point of the loop. Structured, concept-tagged input (entry/upload). No loop without it. | Critical |
| **Gap Diagnosis** | The day-one value; works from scratch with zero history. Defeats cold-start. | Critical |
| **Student Passport** | The home of memory; where the longitudinal value becomes visible. | Critical |
| **Intervention Logging** | Creates the memory. The single highest-risk, highest-value interaction. ≤2 taps. | Critical |
| **What Worked Before** | Hero feature 1. The differentiator — recall of what was associated with improvement. | Critical |
| **What To Try Next** | Hero feature 2. Turns memory into forward action; proves we are a recommender, not an archive. | Critical |
| **Evidence Citations** | Trust guardrail. Without visible evidence, the hero features are just confident guesses. Non-negotiable. | Critical |
| **Local Ollama Inference** | The AI engine for synthesis + recommendation; also what makes offline possible. | Critical |
| **Seeded Student History** | Without pre-loaded multi-term history, there is nothing for the hero features to recall. The longitudinal demo depends on it. | Critical |
| **Class Dashboard** | Proves value at classroom scale (the actual subject of Challenge 2.4), not just one student. | Important |
| **Offline Support (basic)** | Credibility for low-connectivity schools. **Scoped to: runs fully on a local machine, no cloud dependency.** Not real sync. | Important |
| **Learning Timeline** | A visualization of the passport's history. Nice, but the Passport already shows history. First thing to cut if time runs short. | Cuttable |

**Honest note on the four "hero" surfaces:** only *What Worked Before* and *What To Try Next* are true differentiators. *Class Dashboard* and *Learning Timeline* are supporting surfaces. Do not spend equal effort on all four — protect the two that matter.

---

## 4. Out of Scope

Strict. Each excluded because it is **not required to prove the intervention-feedback loop**, and building it would consume sprint time we don't have.

| Excluded | Why it's out |
|---|---|
| **Handwriting OCR** | Reading messy handwritten/Indian-script worksheets is unreliable and would eat the whole sprint. We use structured capture instead. |
| **Essay / free-text evaluation** | We are math-only; no scoring of prose. Out of subject scope. |
| **Multiple subjects** | Math only. Each subject needs its own concept map and item set. |
| **Parent portal** | Parents are not a user. Adds surfaces and consent/privacy complexity for zero loop value. |
| **Student-facing app / tutoring** | We are not a tutor. No student surface at all. |
| **Government / ERP / district integrations** | Integration work with zero demo value; pure scope sink. |
| **District / attendance / advanced analytics** | We are a teaching-decision aid, not an analytics platform. Stays out to protect Low Cognitive Load. |
| **Real multi-year data** | Impossible to collect in a sprint. The longitudinal story is shown via *seeded* history, transparently. |
| **Cross-school transfer / multi-teacher collaboration** | The true handover value is Future Vision. MVP is single teacher, single classroom. |
| **Advanced reporting / exports** | Not needed to prove the loop. |
| **Voice assistant** | Novelty with no bearing on the core thesis. |
| **Native mobile app** | A responsive web interface is enough for the demo; native builds are sprint-killers. |
| **Cloud deployment / sync infrastructure** | Local-first by design. Cloud adds ops work and contradicts the offline/privacy story. |
| **Anything else not on the In-Scope table** | Default answer is no. |

---

## 5. Demo Scenario

A single, linear ~3-minute flow. **Live = computed in the moment from data we enter. Seeded = pre-loaded history, clearly labelled as illustrative.**

1. **Teacher captures a class assessment.** *(Live.)* We enter/upload a small set of concept-tagged math responses for a Class 6 group.
2. **System diagnoses gaps.** *(Live.)* Per-student concept gaps + a class-level headline ("most of the class missed place value → reteach tomorrow; these students need 1:1"). Each claim shows its source.
3. **Teacher opens Ananya's passport.** *(Seeded.)* We state plainly: "Ananya's last two terms are pre-loaded so you can see what a later cycle looks like." Her learning journey is shown.
4. **What Worked Before** *(seeded)* surfaces: "visual fraction strips — associated with improvement (Class 5, Term 2)"; "extra worksheets — no observed change." Evidence cited. No causal claim.
5. **What To Try Next** *(seeded → live generation)* produces a grounded next step, including a *possible* link to the earlier foundational gap, with citations.
6. **Teacher logs an intervention.** *(Live.)* Two taps on action cards. The Passport updates immediately.
7. **Class dashboard reflects the state.** *(Live.)* Glanceable class view shown as the closing beat.

**Rule for the demo:** never present seeded data as live. The moment a reviewer suspects hidden faked data, trust in everything collapses. Label it and own it.

---

## 6. Technical Deliverables (high-level only)

- **Frontend:** React (responsive web; runs on entry-level devices as a thin client).
- **Backend:** FastAPI.
- **Structured store:** SQLite.
- **Learning memory:** structured Markdown records.
- **AI:** local Ollama model (runs on a local machine, not the teacher's handset).
- **Retrieval:** evidence-first retrieval — relevant evidence is fetched before generation, and outputs cite it.

No schemas, no architecture, no implementation detail here — that's the Technical Design Document's job.

---

## 7. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| **Intervention logging adoption (HIGHEST)** | If teachers don't log, the memory layer is empty and the product collapses to a diagnosis tool — the whole thesis fails. | Ruthless ≤2-tap design; immediate from-scratch value so the tool is used even before memory accrues; logging must feel faster than not logging. |
| **AI hallucination** | One confident wrong diagnosis or invented connection destroys trust in everything. | Hard rule: cite-or-don't-claim. Ungrounded output is not shown. Conservative diagnosis. |
| **Weak concept tagging** | Diagnosis and "progress observed" are only as good as the concept tags; vague tags → vague everything. | Curate a small, well-tagged item set for a focused set of Class 3–6 math topics before building features. |
| **Capture friction** | If getting assessment data in is slow/fiddly, the loop never starts. | Structured input only; no OCR; fit the existing paper workflow; keep entry minimal. |
| **Cold start** | Reviewers/teachers may dismiss it as "useless until it has data." | Foreground day-one diagnosis value; seed history transparently for the longitudinal story. |
| **Recommendation repetition** | Recommendations become generic and repetitive, and teachers stop trusting them — e.g. the system keeps suggesting the same intervention regardless of context. | Generate recommendations using intervention history, prior outcomes, and concept context; avoid re-recommending interventions previously marked "No Observed Change"; encourage diversity when evidence supports multiple reasonable actions. |

---

## 8. Stretch Goals

Built **only if** the full In-Scope MVP is done and stable. None of these is required for demo success, and none justifies delaying a Critical feature.

- Additional grade bands beyond the chosen demo topics.
- A larger / richer intervention taxonomy.
- Summarisation of teacher notes into the learning memory.
- Improved retrieval quality / ranking.
- Better multilingual coverage (more than Hindi + one regional language).
- A more polished Learning Timeline visualization.

If a stretch goal starts competing with a Critical item for time, the stretch goal loses. Every time.

---

## 9. MVP Definition (Done Checklist)

The MVP is complete when **every** box below is checked. If any is unchecked, the MVP is not done — finish these before any stretch goal.

- [ ] Teacher can capture a class's assessment responses (entry/upload), concept-tagged.
- [ ] System produces per-student concept-level gap diagnosis from scratch (no history needed).
- [ ] System produces a class-level "what to reteach" view.
- [ ] System produces a recommendation for a student's gap.
- [ ] Teacher can log an intervention in ≤2 taps, with an optional one-line note.
- [ ] Student Passport updates to reflect the logged intervention.
- [ ] Student Passport has a useful empty state for a student with no history.
- [ ] What Worked Before displays associations with cited evidence (and handles "insufficient evidence" honestly).
- [ ] What To Try Next displays a grounded recommendation with cited evidence.
- [ ] At least one student has seeded multi-term history, clearly labelled illustrative.
- [ ] Every diagnosis / recommendation / historical claim shows its supporting evidence.
- [ ] Class dashboard renders a glanceable class view.
- [ ] The full loop runs with no internet connection.
- [ ] A clean, rehearsed demo path exists that distinguishes live from seeded.

*(Learning Timeline is intentionally absent from this checklist — it is Cuttable, not required for "done.")*

---

*Source of truth: Phase 1 Proposal, Pitch Deck, and Product Requirements Document (PRD).*

*This document governs Phase 2 scope. If reality forces a tradeoff, update this file before changing implementation. Scope decisions are product decisions.*

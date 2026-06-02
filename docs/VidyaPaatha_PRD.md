# VidyaPaatha Passport — Product Requirements Document (PRD)

**Tagline:** Identify learning gaps today. Remember what worked before. Decide what to try next.
**Document scope:** Product requirements only. No architecture, schemas, or implementation detail (those belong in a later Technical Design Document).
**Status:** Vision locked. This PRD specifies *what* must be built and *why*, and challenges each requirement against classroom reality.

---

## 1. Product Overview

VidyaPaatha Passport is an intervention feedback loop with longitudinal learning memory, built for one user: the classroom teacher managing a large, mixed-ability foundational-mathematics class (Classes 3–6). It helps a teacher identify a student's learning gap from an assessment, recommends an evidence-based action, lets the teacher record what they actually did in two taps, and — across subsequent assessments — preserves which interventions were associated with that student's improvement so future decisions are better informed.

The product is not a tutor, grader, chatbot, parent app, ERP, career platform, or multi-stakeholder analytics system. Its distinguishing contribution is *intervention memory*, not diagnosis. Diagnosis is necessary but ordinary; the novel asset is the accumulated, evidence-linked record of what teaching was associated with progress for each child.

The product delivers value from the first assessment and compounds in value as a learning history accumulates.

---

## 2. Vision Statement

Schools store student data but not teaching memory. VidyaPaatha Passport exists to preserve the teaching memory that is currently lost between terms and between teachers — so that no teacher starts from zero, and no child is effectively re-diagnosed every year. The long-term vision is a learning record that travels with a child through their schooling, carrying not just scores but the hard-won knowledge of how to reach that child. The near-term product makes the daily, in-classroom version of this practical and low-burden.

---

## 3. Problem Statement

A single teacher in a mixed-ability classroom can observe *that* a child is struggling but rarely has a practical way to determine *what specifically* the child misunderstands, and almost never retains a record of *what was already tried*. Each assessment is treated as an isolated event: the score is stored, the teaching context is discarded.

Teachers reliably know *what happened* (the result). They rarely retain *what was tried*, *what worked*, and *what did not work* — especially across terms and academic years, and especially when a child moves to a new teacher. The consequence is repeated re-diagnosis, repeated experimentation, and learning gaps that persist longer than they should because timely, informed intervention is impractical at the scale of fifty children.

---

## 4. User Personas

**Primary — Meera, the classroom teacher.** Teaches Class 6 mathematics to ~50 children spanning several ability levels. Time-poor, juggling teaching with administrative duties. Has a basic smartphone; the school has at least one shared computer. Limited tolerance for any tool that adds steps to her day. Cares about practical, immediate help — what to teach tomorrow, which children need her now. *Design implication: every interaction must cost less time than it saves.*

**Secondary — the academic coordinator / senior teacher.** Occasionally reviews class- or cohort-level patterns to support planning. Not the design centre; no feature is built primarily for this persona in Phase 2. *Design implication: class-level views should be glanceable, not analytical dashboards.*

**Explicitly out of scope as users:** parents, students (no student-facing surface), district administrators, government systems. Designing for these would expand scope and dilute the teacher-first focus.

---

## 5. User Needs

The teacher needs to: (a) quickly understand each student's specific gap after an assessment, not just a score; (b) know what to do about it, concretely, tomorrow; (c) act and move on without a heavy logging chore; (d) see the class as a whole so limited time goes where it matters most; (e) recall, when facing a recurring struggle, what was tried before and what was associated with improvement; (f) trust that any recommendation is grounded in real evidence about *this* child, not generic advice or invented reasoning.

Underlying all of these is a meta-need: the teacher must never feel the tool is judging the child or replacing her professional judgement. It must feel like support, not surveillance.

---

## 6. Product Principles

These principles are decision filters. When a requirement conflicts with a principle, the principle wins.

- **Teacher First.** If a feature helps the product but costs the teacher time or attention, it is reconsidered. Adoption dies at the first sign of added burden.
- **Evidence Before AI.** No explanation or recommendation is presented unless it is grounded in retrieved evidence and can show that evidence. Ungrounded output is not displayed. This is the guardrail that makes the longitudinal reasoning trustworthy.
- **Low Cognitive Load.** Defaults over decisions; taps over typing; one clear next action over a wall of analytics.
- **Memory Over Prediction.** The product preserves and recalls what happened; it does not forecast or label. It surfaces associations and hypotheses, never verdicts about a child's ability.
- **Actionable Insights.** Every output a teacher sees should answer "so what do I do?" A diagnosis without a next step is incomplete.
- **Association, Not Causation.** The system describes interventions as *associated with* improvement and offers cross-concept links as *hypotheses*. It never claims an intervention caused a result.

---

## 7. User Stories

*(Phrased from the teacher's perspective. "Done" means the teacher can complete the action with minimal burden and trust the output.)*

**Diagnosis & immediate value**
1. As a teacher, I want to capture a class's assessment responses quickly so that I can get a diagnosis without hours of manual marking.
2. As a teacher, I want to see each student's specific gap (e.g., "borrowing across a zero"), not just a score, so that I know what the real problem is.
3. As a teacher, I want a class-level summary of which concept most of the class missed so that I know what to reteach tomorrow.
4. As a teacher, I want to see which small group of students needs one-to-one help so that I can target my limited time.
5. As a teacher, I want a suggested action for a student's gap so that I am not left to figure out the next step alone.

**Intervention logging**
6. As a teacher, I want to record what I actually did in one or two taps so that logging never becomes a chore.
7. As a teacher, I want to choose from suggested, relevant actions (with an "Other" option) so that I am not forced to type.
8. As a teacher, I want to optionally add a one-line note so that I can capture context when it matters, without being required to.

**Memory & recall**
9. As a teacher, I want to open a student's passport and see their learning journey over time so that I understand the history, not just the latest test.
10. As a teacher, I want to see which interventions were previously associated with a student's improvement so that I can try what has worked before.
11. As a teacher, I want to see which interventions showed no observed change so that I do not repeat what did not help.
12. As a teacher inheriting a student with a prior record, I want to see what earlier teaching was associated with their progress so that I do not start from zero. *(Illustrated via seeded history in MVP; true cross-teacher handover is Future Vision.)*

**Forward recommendation & reasoning**
13. As a teacher, I want a context-aware suggestion for what to try next, grounded in this student's history, so that the recommendation fits this child specifically.
14. As a teacher, I want the system to flag a *possible* connection between a current difficulty and an earlier foundational gap so that I can address the root, not just the symptom.
15. As a teacher, I want every recommendation and historical claim to show the evidence it is based on so that I can trust it and judge for myself.

**Trust, control, and reality**
16. As a teacher, I want to override or ignore any recommendation so that my professional judgement remains in control.
17. As a teacher, I want the tool to work when the internet is down so that an unreliable connection does not block my class.
18. As a teacher, I want the student's information kept private and free of permanent "at-risk" labels so that the tool supports children rather than stigmatising them.

---

## 8. Functional Requirements

*For each: what it is, why it exists, key requirements, and the main failure point to guard against.*

### 8.1 Assessment Capture
**What:** The teacher gets a set of student responses to a short, concept-tagged mathematics assessment into the system.
**Why:** This is the entry point of the entire loop; without low-friction capture, nothing downstream happens.
**Key requirements:** Support structured responses (numeric answers / multiple choice) captured against a predefined, concept-tagged answer key. Support entry of responses *and* upload of a record of responses, so the workflow fits the paper assessments teachers already give. Each question must be tagged to a specific foundational-math concept.
**Challenge / failure point:** The tempting version — photograph a handwritten worksheet and auto-read it — is a trap within the build window: handwriting recognition for mixed Indian-script/numeral worksheets is unreliable and would consume the sprint. **Freeform handwriting OCR is out of scope.** Capture must be structured so that diagnosis and progress are computable. If capture is slow or error-prone, the whole product is abandoned at step one.

### 8.2 Gap Diagnosis
**What:** From captured responses, the system identifies each student's specific concept-level gaps and the class-level pattern.
**Why:** Teachers need the *reason* behind a wrong answer, not just a mark. This is the immediate, day-one value that defeats cold-start.
**Key requirements:** Map errors to concept-level gaps using the answer key and concept tags. Produce per-student gaps and an aggregated class view. Must work from the very first assessment, with no prior history.
**Challenge / failure point:** Diagnosis must be conservative — better to under-claim a misconception than to assert a wrong one. Over-confident or incorrect diagnosis erodes trust faster than no diagnosis. Diagnosis depth is bounded by how well questions are concept-tagged; vague tagging produces vague diagnosis.

### 8.3 Student Passport (the learning record)
**What:** A per-student view holding their learning journey, gap history, logged interventions, outcomes, and the "What Worked Before" / "What To Try Next" surfaces.
**Why:** This is where memory becomes visible and usable; it is the home of the product's core value.
**Key requirements:** Show a clear, chronological record. Clearly label illustrative/seeded data as such in the MVP. Every claim links to its supporting assessment. Present risk-relevant information without permanent labels (see 9.4).
**Challenge / failure point:** A first-time student has no history — the empty state must be genuinely useful (show the current diagnosis and a first recommendation), not a blank page that signals "come back in a year."

### 8.4 Intervention Logging
**What:** After a recommendation, the teacher records which action(s) they took, in two taps, with an optional one-line note.
**Why:** This is the mechanism that creates intervention memory while honouring Low Cognitive Load. It is the product's single most load-bearing interaction.
**Key requirements:** Present a short, curated list of relevant, math-appropriate intervention options plus "Other." Selection is one or two taps. The optional note is never required. Logging must feel faster than the teacher's current (mental, lossy) tracking. **The teacher must also be able to record whether a recommended action was actually attempted** — one of *Tried*, *Partially Tried*, or *Not Tried* — because teachers will not always follow a recommendation, and the system must remember what was *attempted*, not assume it. For example, if the system recommended visual fraction strips and the teacher marks "Not Tried," that recommendation remains in the history but must never later be interpreted as an intervention that was tested. This preserves the integrity of intervention memory. Capturing status stays within the ≤2-tap principle.
**Challenge / failure point:** The intervention taxonomy is a product risk in both directions — too long and it becomes a scrolling chore; too short and it doesn't fit real practice, pushing teachers to "Other + type," which raises burden and produces unstructured memory. The list must be curated, short, and grounded in real foundational-math teaching strategies. If teachers don't log, the entire memory layer is empty and the product degrades to a diagnosis tool.

### 8.5 What Worked Before
**What:** When a teacher faces a student's gap, the system surfaces interventions previously *associated with* that student's improvement, and those that showed no observed change, each with its supporting evidence.
**Why:** This is hero feature #1 — the recall that lets a teacher reuse what has worked instead of re-experimenting.
**Key requirements:** Present associations, never causal claims. Show the evidence (which assessment/term) behind each. Every intervention in a student's history resolves to exactly one of three explicit evidence states: **Associated with Improvement**, **No Observed Change**, or **Insufficient Evidence**. The system must never force a conclusion when history is sparse — if only a single observation exists, or the evidence is weak, it must display *Insufficient Evidence* rather than implying a pattern. This directly supports the principle of Association, Not Causation. Interventions marked "Not Tried" are excluded from association analysis and never contribute to evidence about what worked. Degrade gracefully when evidence is thin.
**Challenge / failure point:** Requires at least two assessments on related concepts to be meaningful. With one data point it must say so honestly rather than imply a pattern. Misrepresenting a single coincidence as "what worked" would violate the association principle and mislead the teacher.

### 8.6 What To Try Next
**What:** A context-aware recommendation for the next action, grounded in the specific student's history (including any *possible* cross-concept connection to an earlier foundational gap, presented as a hypothesis).
**Why:** Hero feature #2 — it turns memory into forward action, so the product is a recommender, not just an archive.
**Key requirements:** Recommendations must be grounded in retrieved evidence and show it. Cross-concept connections are phrased as hypotheses ("may relate to…") with cited supporting assessments. If no grounded recommendation is possible, the system says so rather than inventing one.
**Challenge / failure point:** This is where a model is most tempted to produce plausible-but-unsupported reasoning. The Evidence-Before-AI principle must be enforced as a hard rule here: cite or do not claim. A single confident hallucinated connection in front of a teacher damages trust in the whole product.

### 8.7 Class-Level Insight
**What:** A glanceable class view: which concept most of the class missed, which small group needs targeted support, and class strengths.
**Why:** The challenge is about *large mixed-ability classrooms*; the teacher needs to direct limited time at the class scale, not read fifty individual reports.
**Key requirements:** Lead with one actionable headline ("reteach place value tomorrow"). Group students by shared gap. Keep it readable in seconds, not an analytics console. Dashboard insights are generated from **diagnosed concept-level gaps, not from overall marks or percentages** — a student scoring 70% may still carry a critical foundational misconception, so the dashboard prioritises the concepts that require intervention rather than ranking students by score.
**Challenge / failure point:** Scope creep toward a full analytics dashboard. This must stay a *decision aid*, not a data-exploration tool — the moment it requires interpretation effort, it violates Low Cognitive Load.

### 8.8 Learning Memory Timeline
**What:** A chronological visualisation of a student's gaps, interventions, and observed progress over terms.
**Why:** Makes the longitudinal story legible and supports the recall features.
**Key requirements:** Chronological, evidence-linked, readable at a glance. Clearly mark seeded/illustrative entries in the MVP.
**Challenge / failure point:** Like the dashboard, risks becoming decorative or over-detailed. It earns its place only if it helps a teacher quickly grasp the arc; otherwise it is a future enhancement, not an MVP must-have.

> **Hero-feature honesty note:** Of the four "hero" surfaces, *What Worked Before* and *What To Try Next* are the true differentiators and deserve the most design and reasoning investment. The *Class Dashboard* and *Learning Timeline* are important supporting surfaces, not co-equal innovations; the team should not spend equal effort polishing all four.

---

## 9. Non-Functional Requirements

### 9.1 Performance
Diagnosis and recommendations for a class-sized batch should return fast enough to support a "between classes" workflow — the teacher captures responses and gets actionable output within minutes, not a wait that pushes the task to "later" (where it never happens). *Why: timeliness is half the challenge; slow feedback is functionally equivalent to no feedback.*

### 9.2 Offline Support
The product must function during loss of connectivity and synchronise when it returns. *Why: target schools have intermittent connectivity; a tool that stalls when the network drops will not be trusted in class.* AI processing runs on a local school machine rather than depending on external services.

### 9.3 Security
Student data must be protected and not transmitted to external services for processing. *Why: this is children's educational data; trust and basic duty of care require it, and local processing also serves the offline requirement.*

### 9.4 Privacy & Child Safety
No permanent "at-risk" or ability labels are attached to a child. Longitudinal inferences are presented as evidence-backed hypotheses, not fixed judgements. The teacher remains in the loop for every recommendation and logged action. *Why: a memory system about children must support them, not reduce them to a risk score that follows them prejudicially — this is both an ethical requirement and an adoption requirement, since teachers and schools will reject a tool that labels children.*

### 9.5 Reliability
Logged interventions and assessment records must not be lost, including across offline/online transitions. *Why: the value is cumulative memory; losing entries destroys the asset and the teacher's trust.*

### 9.6 Usability
The teacher-facing interface must run on entry-level devices and be operable with minimal training, minimal typing, and clear defaults, including by non-technical teachers. Support for Hindi and a regional language. *Why: the user is time-poor and may not be tech-confident; usability is not polish here, it is the difference between adoption and abandonment.*

---

## 10. Success Metrics

*These define what will be measured and why. They are evaluation targets for a pilot, not claims of achieved results, and none implies the product causes learning gains.*

- **Teacher time saved.** Time from "assessments in hand" to "an actionable teaching decision," compared to the teacher's current process. *Why: directly tests the core promise of timeliness and low burden.* Target direction: meaningful reduction.
- **Intervention logging adoption.** Proportion of recommendations after which the teacher actually logs an action. *Why: this is the leading indicator of whether the memory layer will ever fill; if logging adoption is low, the product cannot deliver its compounding value.* This is the single most important metric to watch.
- **Recommendation usefulness.** Teacher rating of the relevance and practicality of suggestions, and of "What Worked Before" recall. *Why: tests whether the outputs are actually decision-useful, not just present.*
- **Longitudinal memory usage.** Whether teachers open and act on a student's history/"What Worked Before" when it is available. *Why: tests whether the differentiating feature is valued in practice or ignored.*
- **Grounding integrity (quality guardrail).** Whether each displayed claim is actually supported by its cited evidence. *Why: protects the trust principle; a high error rate here invalidates the product regardless of other metrics.*

---

## 11. MVP Definition (Phase 2 Demo)

**The MVP must demonstrate the full loop within a single classroom, for foundational mathematics, Classes 3–6, single teacher.** Concretely, the following must exist and work:

1. **Structured assessment capture** against a concept-tagged answer key (entry and/or upload). *Works live, from scratch.*
2. **Gap diagnosis** — per-student concept-level gaps and a class-level "what to reteach" view. *Works live, from scratch — this is the day-one value.*
3. **Recommendation** of a concrete next action for a student's gap, grounded in available evidence.
4. **Two-tap intervention logging** with optional note, drawing on a curated intervention list.
5. **Student passport** showing the learning record, with a useful empty state for new students.
6. **What Worked Before** and **What To Try Next**, evidence-cited, demonstrated on a **transparently seeded multi-term student history** (clearly labelled as illustrative) so the longitudinal value is visible without waiting a real term.
7. **A glanceable class view** and a **basic learning timeline.**

**What the MVP does *not* need:** true multi-teacher or multi-year handover in production (illustrated via seeding only), multiple subjects, any non-teacher user surface, or any analytics beyond the glanceable class view.

**Cold-start handling (critical):** items 1–5 deliver value with zero prior history; items 6–7 require accumulated or seeded data. The demo must show both the from-scratch path and the seeded-history path, and must be honest about which is which.

---

## 12. Future Vision (explicitly NOT MVP)

These are directional and must not leak into the Phase 2 build: true cross-teacher and cross-year handover in production deployments; additional subjects beyond mathematics; additional grade bands; coordinator/school-leader views; richer curriculum alignment (e.g., explicit NCERT/state mapping); and broader concept maps. The architecture and concept-map approach are intended to generalise to these, but each is future work. Parents, students-as-users, district dashboards, government integrations, attendance analytics, and career guidance remain permanently out of this product's scope.

---

## 13. Risks

- **Logging adoption risk (highest).** If teachers don't log interventions, the memory layer stays empty and the product collapses to a diagnosis tool. *Mitigation: ruthless two-tap design; immediate from-scratch value so the tool is used even before memory accrues.*
- **Trust risk from unsupported reasoning.** A single confident hallucinated diagnosis or connection damages trust broadly. *Mitigation: enforce Evidence-Before-AI as a hard rule; cite or do not claim.*
- **Capture-friction risk.** If assessment capture is slow or fiddly, the loop never starts. *Mitigation: structured input, no handwriting OCR, fit the existing paper workflow.*
- **Cold-start perception risk.** Reviewers/teachers may dismiss it as "useless until it has data." *Mitigation: foreground day-one diagnosis value; seed history transparently for the longitudinal story.*
- **Scope-creep risk.** The class view and timeline can metastasise into a full analytics platform. *Mitigation: keep them decision aids, hold the scope lock.*
- **Concept-tagging dependency risk.** Diagnosis and progress quality depend on a good concept-tagged item set and concept map; weak tagging weakens everything downstream. *Mitigation: curate a focused, well-tagged math item set for the chosen topics.*
- **Recommendation-repetition risk.** Recommendations become generic and repetitive, eroding teacher trust — e.g. the system keeps suggesting the same intervention regardless of context. *Mitigation: generate using intervention history, prior outcomes, and concept context; avoid re-recommending interventions previously marked "No Observed Change"; encourage diversity when evidence supports multiple reasonable actions.*
- **Stigmatisation risk.** A memory system on children could be misused to label them. *Mitigation: no permanent risk labels; hypotheses not verdicts; teacher-in-the-loop.*

---

## 14. Assumptions

- Assessments can be administered in a structured, concept-taggable form (the teacher's existing math tests largely already are).
- The school has at least one machine capable of running local AI processing, with teacher devices acting as low-spec clients.
- A curated foundational-math concept map and concept-tagged item set for Classes 3–6 can be assembled within the build window.
- Teachers are willing to log an intervention in two taps if the value is immediately visible.
- For the MVP, the longitudinal/handover value can be credibly *illustrated* with seeded history rather than requiring real multi-term deployment.
- A short, curated intervention taxonomy can cover the large majority of real foundational-math teaching actions, with "Other" for the tail.

---

## 15. Open Questions

- What is the right length and content of the intervention taxonomy — and who curates it (the team, teacher input, or an existing pedagogical source)?
- How are concepts tagged and how granular should the concept map be to make cross-concept hypotheses meaningful without being noisy?
- What is the minimum evidence threshold before "What Worked Before" will assert an association rather than "insufficient evidence"?
- Should the answer key / item set align to NCERT or to specific state curricula, and does that affect adoption? *(Likely future, but flag now.)*
- In a real (post-MVP) multi-teacher setting, who owns a student's learning record, and how is it governed when a child changes class or school? *(Out of MVP scope, but a prerequisite for the long-term vision.)*
- How does the system handle a student with sparse or irregular assessment history without producing misleading patterns?

---

*This PRD is consistent with the locked product vision, the Phase 1 proposal, and the Phase 1 deck. It deliberately excludes architecture, schemas, and implementation detail, which belong in a subsequent Technical Design Document.*

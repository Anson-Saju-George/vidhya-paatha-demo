# VidyaPaatha Passport
### Phase 1 Proposal — SahAI for Shiksha Hackathon 2026
**Track:** School Education · **Challenge 2.4 — Learning Gaps and Timely Feedback**

*Identify learning gaps today. Remember what worked before. Decide what to try next.*

---

## 1. Executive Summary

In a typical Indian government-school classroom, one teacher faces fifty children spread across several grade levels at once. The teacher can see *that* a child is struggling, but rarely has a practical way to diagnose *what specifically* the child does not understand, and almost never has a record of *what was already tried* — by themselves last term, or by a different teacher last year. Each assessment is treated as an isolated event. The score is stored; the teaching context is forgotten.

VidyaPaatha Passport addresses this gap directly. It is not a tutor, a grader, or a chatbot. It is an **intervention feedback loop with longitudinal learning memory**: a tool that helps a teacher identify a learning gap from an assessment, suggests an evidence-based action, lets the teacher record what they actually did in two taps, and — on the next assessment — preserves which interventions were associated with improvement so that future teaching decisions are better informed.

The product delivers value from the very first assessment (gap diagnosis and a class-level "what to reteach this week" view) and becomes more useful over time as a child's learning history accumulates. Its two distinguishing capabilities are **"What Worked Before"** — surfacing interventions previously associated with a student's improvement — and **"What To Try Next"** — generating a recommendation grounded in that specific child's history. The system is deliberately scoped for the hardest setting: foundational mathematics in Classes 3–6, large mixed-ability classrooms, low connectivity, entry-level devices, and paper-based assessments.

---

## 2. Problem Statement

**Challenge context.** Challenge 2.4 identifies a precise and well-documented failure: teachers in large, mixed-ability classrooms lack practical ways to diagnose student-level learning gaps and provide timely, actionable feedback, so the students who most need support are not identified or helped early enough.

**Supporting evidence.** India's foundational-learning data make the scale of the problem concrete. The Annual Status of Education Report (ASER 2024, Pratham) finds that only about three in ten rural Class 5 children can perform basic division [verify exact figure against official ASER 2024 release and replace "about three in ten" with the precise percentage before submission] — meaning a majority enter higher grades without secure arithmetic foundations. Equally important for this challenge, ASER's analysts emphasise that *within a single grade*, children's reading and arithmetic levels vary enormously, and that teaching to the grade-level textbook does not reach those who are already behind. This is not a problem of one weak cohort; it is the structural reality of the mixed-ability classroom. (Exact figures should be re-verified against the latest official ASER release at submission.)

**Classroom realities.** A single teacher managing forty to fifty children cannot manually diagnose each child's specific misconception, and even when work is collected and marked, two things break down. First, diagnosis stays shallow — a wrong answer is marked wrong, but there is no time to record *why* it was wrong. Second, feedback is slow and generic, and any memory of what was tried with a particular child evaporates between terms and especially between teachers. When a child moves to a new section or class, the incoming teacher inherits a score sheet but none of the hard-won knowledge of how to actually reach that child.

**Why current approaches fall short.** Existing tools each address part of the picture but share one blind spot: they are stateless. Gradebooks record the score but not the reason. Report cards travel with the child but carry no teaching context. The recent wave of AI tutors, graders, and chatbots assists in the moment and then forgets the child entirely. None of them preserve the institutional memory of what teaching worked. As a result, teachers repeatedly re-diagnose and re-experiment, and learning gaps persist longer than they should. The data on each child exists; the memory of how to teach them does not.

---

## 3. Target Users & Context

**Primary user: the classroom teacher.** The product is designed first and only for the teacher who must make daily decisions about a large, mixed-ability class. Every interaction is built around minimising that teacher's cognitive and time burden.

**Secondary users.** Academic coordinators and school leaders may benefit from class- and cohort-level views, but they are not the design centre and no feature is built primarily for them in this phase.

**Scope of context.** The Phase 2 build is restricted to **foundational mathematics, Classes 3–6, a single classroom and a single teacher.** Mathematics is chosen deliberately: errors in foundational arithmetic are structured and diagnosable, the concept dependencies are well understood, and diagnosis does not depend on fragile handwriting recognition. The operating environment is assumed to be difficult — intermittent connectivity, entry-level Android devices or low-specification school computers, paper-based assessments, and multilingual classrooms — because designing for the hardest classroom is what makes the tool credible at scale.

---

## 4. Solution Overview

VidyaPaatha Passport turns each assessment from an isolated event into one turn of a continuous loop:

> Assessment → Gap Diagnosis → AI Recommendation → Teacher Action (two taps) → Intervention Recorded → Reassessment → Progress Observed → **What Worked Before** → **What To Try Next**

The system is designed to support teachers, not replace their judgement.

From the first assessment, the teacher receives a per-student gap diagnosis and a class-level summary indicating which concepts to reteach and which small group needs targeted support. The teacher acts on a recommendation and records what they actually did by tapping from a short list of suggested actions — for example, "visual fraction strips" or "peer activity" — with an optional one-line note. That tap is the entire data-entry burden. On the next assessment, the system observes progress and preserves the relationship between the intervention and the change, building a learning history that follows the child.

Two capabilities distinguish the product:

**What Worked Before.** When a teacher faces a child's gap, the system surfaces interventions previously *associated with* that child's improvement, each linked to the assessment that supports it (for example, "visual fraction strips — associated with improvement (Class 5, Term 2)" alongside "extra worksheets — no observed change"). The system never claims that an intervention *caused* improvement; it preserves educational context and lets the teacher judge. This honesty is a design principle, not a limitation.

**What To Try Next.** Drawing on the accumulated learning history, the system generates a context-aware next step grounded in the specific child's record rather than offering generic advice.

The solution maps directly onto the challenge's stated considerations: **low teacher burden** (two-tap logging), **timely feedback** (diagnosis in minutes, not weeks), **actionable insights** (a concrete next step, not a score), **classroom integration** (works from the paper assessments teachers already give), and **student progress** (a longitudinal record rather than a one-time snapshot).

---

## 5. Key User Journey

Consider a teacher beginning a unit on fractions with a Class 6 class of fifty children.

She administers a short, structured assessment on paper, as she already does. She enters or photographs the results, and within minutes the system returns a per-student diagnosis and a class view: most of the class is secure on multiplication, a majority missed a place-value concept that should be retaught the next day, and six children need one-to-one support on a specific step. For one child, Ananya, the system shows a recurring fractions gap and surfaces her history: visual fraction strips were associated with improvement last term, while extra worksheets showed no observed change. The recommended next step builds on concrete representations and notes that the current word-problem difficulty *may* relate to the earlier fractions gap — presented explicitly as an evidence-backed hypothesis, with its supporting assessments cited, not as a diagnosis.

The teacher applies an intervention and records it in two taps. At the next assessment, the loop closes: progress is observed and the learning history is updated, so the next decision — whether by this teacher or the next year's teacher — starts from accumulated knowledge rather than from zero.

---

## 6. Differentiation

Most solutions to this challenge will be present-tense: they help a student or a teacher in the moment and retain nothing afterward. VidyaPaatha Passport is differentiated along the axis of *time* and *memory*.

An AI tutor teaches the child now and forgets the session. An AI grader marks this test. A chatbot answers this question. Each resets to zero with every interaction, and each is, in principle, reproducible by a well-prompted general model. VidyaPaatha Passport instead accumulates a structured, evidence-linked record of which teaching actions were associated with a child's progress. That accumulated memory is the asset: it cannot be reconstructed by a prompt, it grows more useful with every assessment, and it is the one thing the stateless tools structurally cannot provide.

Critically, the innovation is not diagnosis — diagnosis is necessary but ordinary, and many tools do a version of it. The innovation is the *loop*: recording the teacher's action and learning, over time, what was associated with improvement for each child. The product's unit of memory is the intervention and its outcome, not the score.

---

## 7. Why AI Is Necessary

The proposal is deliberately honest about where artificial intelligence is and is not required, because that honesty is what makes the AI claim credible.

Most of the system is not AI. A conventional database stores scores, concept-mastery records, intervention history, and the teacher's logged actions, and handles their retrieval. None of that needs a model.

AI is necessary for exactly two functions that a database cannot perform:

**Longitudinal evidence synthesis.** Reading a child's heterogeneous, multi-term evidence — assessment results, recorded misconceptions, teacher notes, and prior outcomes — and producing a concise, teacher-readable explanation of what improved, what remains weak, and what *possible* connections exist between a current difficulty and an earlier foundational gap.

**Context-aware recommendation generation.** Producing a next step that is grounded in the individual child's history rather than a generic tip.

Both are acts of reasoning over evidence, not database queries. Without AI, the system is a filing cabinet of past assessments. With AI, it becomes a decision-support tool that turns that history into a teaching decision.

---

## 8. AI Methodology

**Model choice.** The system uses a locally hosted open large language model served through Ollama, run on a school computer or local server rather than on the teacher's handset. Local execution is a deliberate choice for this context: it allows the system to function without live internet and ensures that sensitive student data is never transmitted to external services. The teacher's device communicates with this local processing over the school network and synchronises when needed; it does not run the model itself. The model is used narrowly — for synthesis and recommendation — not as a general-purpose assistant.

**Data sources.** The system draws on two complementary stores. A structured database (SQLite) holds assessment scores, concept-mastery records, assessment metadata, and intervention history. A learning-memory store of structured Markdown records holds the richer educational context: assessment summaries, observed misconceptions, intervention records, outcomes, and longitudinal observations. For the Phase 2 prototype, realistic seeded student histories are used to demonstrate the longitudinal capability; in any subsequent pilot, this content is generated from teacher-entered or uploaded assessment records and two-tap action logs.

**Retrieval strategy.** The system follows an evidence-first approach: before the model generates any explanation or recommendation, relevant prior evidence is retrieved from both stores using a hybrid retrieval method, and every generated claim is tied to the specific assessment or record that supports it. Recommendations and longitudinal hypotheses that cannot be grounded in retrieved evidence are not asserted. This citation discipline is the primary safeguard against unsupported or fabricated reasoning, and it is what allows the "may connect to an earlier gap" hypotheses to be offered responsibly.

**Evaluation plan.** Because this is a Phase 1 proposal, the following are the metrics the team intends to measure during Phase 2 development and any pilot — not results already obtained. (1) *Diagnosis accuracy:* agreement of AI-identified gaps against a known answer key and teacher review. (2) *Recommendation quality:* teacher ratings of the relevance and practicality of suggested actions. (3) *Longitudinal reasoning validity:* whether each generated claim is actually supported by the evidence it cites. (4) *Teacher usefulness and effort:* a short usefulness rating and the time required to move from a stack of assessments to an actionable decision. These are evaluation goals and validation targets; Phase 2 is used to collect and validate them.

---

## 9. System Architecture

The architecture is intentionally modest and buildable within the sprint window, with a clear division of responsibilities.

A React front end provides the teacher interface, optimised for low-burden interaction and able to run on entry-level devices. A FastAPI backend coordinates requests. A SQLite database serves as the structured source of truth for scores, concept mastery, and intervention history. A Markdown-based learning-memory store holds the richer educational observations. A hybrid retrieval layer fetches relevant evidence from both stores, and a locally hosted Ollama model — running on a school computer or local server — performs synthesis and recommendation, returning outputs with citations to their supporting evidence. The teacher's device handles only the interface and syncs with the local server, keeping device requirements low.

The guiding principle is a clean separation of concerns: the database holds structured truth, the learning memory holds educational context, retrieval assembles the relevant evidence, and the model reasons over it. Conceptually, the data flows from *assessments and learning memory* → *evidence retrieval* → *AI synthesis* → *teacher recommendations*. This separation keeps the model's role narrow and auditable, and means the structured layer can answer most queries deterministically while the model is reserved for the two reasoning tasks that genuinely require it.

---

## 10. Real-World Readiness

The product is designed around the constraints of the classrooms it is meant to serve, not an idealised setting.

It is **offline-first**: it functions without live internet and synchronises when connectivity returns. It runs **without cloud dependencies**: the AI processing runs on a local school computer or server, so the system does not rely on external APIs and suits low-connectivity schools. The **teacher interface runs on entry-level devices**, while the local AI processing runs on a school computer or server and syncs with teacher devices — keeping device requirements low without asking a basic handset to run the model itself. It is designed to work from the **paper assessments teachers already use**, requiring no one-to-one student devices. It supports **multilingual use**, with recommendations available in Hindi and a regional language and rendering for Indian scripts. Above all, it keeps **teacher burden minimal**: logging an intervention requires two taps, and the tool must be faster than the teacher's current workflow, never slower.

**Responsible design.** Because the system maintains a record of children's learning over time, it is built with deliberate safeguards. The model runs locally and student data is not sent to external services. The system does not attach permanent "at-risk" labels to children; it records intervention associations and presents longitudinal inferences as evidence-backed hypotheses rather than fixed judgements. The teacher remains in the loop for every recommendation and every logged action. These choices keep the tool supportive of children rather than reductive about them.

**Path to scale.** While the Phase 2 build is restricted to a single classroom, the underlying design generalises: the concept-dependency approach and the architecture extend to additional grade bands and, in future, additional subjects, without re-engineering the core. Narrow scope here reflects sprint discipline, not a ceiling on the idea.

---

## 11. Implementation Plan

**Scope lock.** Mathematics only, Classes 3–6, a single teacher and single classroom. Explicitly out of scope: all other subjects, a parent portal, district dashboards, government-system integrations, and multi-school deployment.

**Milestones (14-day sprint).**
- *Days 1–3:* assessment input and gap diagnosis against an answer key — establishing immediate, first-assessment value.
- *Days 4–6:* recommendation cards and two-tap action logging.
- *Days 7–9:* learning-memory records and the "What Worked Before" recall, with citations.
- *Days 10–11:* "What To Try Next" generation and the class-level view.
- *Days 12–13:* seeding of a realistic multi-term student history; the offline path; polish.
- *Day 14:* demonstration preparation and an evaluation pass.

**Dependencies.** A defined answer key and concept-dependency map for the chosen mathematics topics; a local Ollama model running on target hardware.

**Risks and mitigations.**
- *Model produces unsupported reasoning.* Mitigated by the evidence-first, cite-or-do-not-claim discipline; ungrounded claims are not asserted.
- *The longitudinal value cannot be shown live in a short demonstration, since it unfolds across terms.* Mitigated by transparently pre-seeding one student's multi-term history so reviewers can see what a later cycle looks like, while live diagnosis is shown from scratch.
- *Teacher data-entry burden undermines adoption.* Mitigated by the two-tap logging design, validated for speed against the existing workflow.

---

## 12. Expected Impact

Impact is described here as a set of plausible mechanisms and the changes the team intends to measure, not as guaranteed outcomes.

By compressing the path from a stack of completed assessments to an actionable teaching decision from weeks to minutes, the tool is intended to make timely intervention practical in classrooms where it currently is not. By preserving which interventions were associated with a child's improvement, it is intended to reduce the repeated re-diagnosis and re-experimentation that consume teacher effort, and to carry useful context across terms and teachers so that support is not lost when a child moves on. By presenting class-level patterns, it is intended to help a teacher direct limited time toward the concepts and the small groups that most need it.

Whether these intended effects hold is precisely what the Phase 2 evaluation plan is designed to test. The team makes no claim that the system improves learning outcomes on its own, nor that any intervention causes improvement; the contribution is to give teachers better-informed, evidence-grounded support for decisions they already make.

---

## 13. Team Strengths & Feasibility

The most significant feasibility signal is that the team has already built and deployed the core engine this product depends on. In a prior project, ContextForge, the team implemented an evidence-first retrieval system using hybrid retrieval, local Ollama deployment, and citation-based responses, on a FastAPI and React stack with SQLite tracking. The retrieval-and-reasoning foundation that VidyaPaatha Passport requires is therefore not theoretical; Phase 2 adapts an existing, working foundation to the classroom rather than constructing the AI stack from scratch. This materially de-risks the build within a 14-day window.

The team's composition is strongest in AI, retrieval, machine learning, and full-stack engineering. To ensure the product is grounded in classroom reality rather than engineering assumptions, the team's Phase 2 plan includes a structured classroom-validation track: teacher interviews, validation of the teacher workflow against real practice, and feedback-driven iteration. This keeps the design honest to the teacher-first principle that motivates the entire product.

---

## 14. Conclusion

The challenge asks for a practical way to diagnose learning gaps and deliver timely, actionable feedback in large, mixed-ability classrooms. VidyaPaatha Passport answers it not by adding another tool that helps in the moment and forgets, but by addressing the deeper gap underneath: schools store student data, but not teaching memory. The product identifies a child's gap today, remembers what was associated with their improvement before, and helps the teacher decide what to try next — useful from the first assessment, and more useful with every one that follows. It is scoped tightly, built on a foundation the team has already proven, designed for the hardest classrooms in the country, and honest about what it does and does not claim. The result is intended to be a serious, deployable contribution to how Indian classrooms support the children who need it most — so that no teacher starts from zero, and no child is re-diagnosed every year.

---

*Note for the team: re-verify the ASER 2024 figures against the official Pratham release and cite precisely before submission. Confirm all team-experience claims are accurate as stated.*

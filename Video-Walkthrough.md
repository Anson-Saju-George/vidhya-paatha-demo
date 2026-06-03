# Video-Walkthrough.md — VidyaPaatha Passport Demo Script

**Purpose:** a complete shot-by-shot recording script for the Phase 1 video walkthrough. It tells you *exactly what to tap*, *what to say*, *what the data on screen means*, and *where the built-in click-through guides (the amber hints) lead you*. Target length **≈ 3 minutes**. Tone: calm, teacher-centred, confident — not salesy.

**Companion docs:** `Demo-Project.md` (architecture + data schema), `docs/` (product specs).

---

## 0. Before you record

**Setup**
- Open the live demo: `https://ansonsajugeorge.online/vidhya-paatha-demo/` (or `npm run dev` locally).
- Use a **phone-width viewport** (the app is a 430px frame). In a desktop browser, open DevTools device mode → iPhone 12/13/14 size, or just narrow the window — the app centres a phone frame on white.
- **Reload right before recording** so the session is fresh: the 15-second IntroScreen and the disclaimer modal both replay (their dismissal is per-session).
- Record at 1080×1920 (vertical) or capture the phone frame region.
- Optional: pre-read the IntroScreen text once so you can **Skip →** quickly on the take if you don't want 15s of loader on camera.

**The two reveal rules**
1. **Never call seeded data "live."** Ananya's history is labelled "Illustrative" / "Demo student" — say so. Honesty is the pitch.
2. **Lead with the action, not the number.** Every screen answers "so what do I do?" — narrate that, not the score.

**The one sentence that frames everything (say it early):**
> "Most tools remember a child's score and forget the teaching. VidyaPaatha remembers what actually reached each child — so no teacher starts from zero."

---

## 1. The data you'll be pointing at (memorise these)

You are demoing **Class 6A · Mathematics · 45 students**. One assessment was just taken: **"Class 6A — Fractions & Word Problems"** (10 questions, January 2025).

**Class-level diagnosis (what reviewers see on Results / Insights):**
| Concept | Students | What to do |
|---|---|---|
| **Place Value** | **18 / 45** | Reteach this week (top priority) |
| Fractions | 12 / 45 | Reteach this week |
| Word Problems | 9 / 45 | Targeted support |
| Borrowing Across Zero | 6 / 45 | 1:1 small-group support |
| Multiplication Facts | 0 | Class strength (secure) |

**Headline line on screen:** *"Reteach place value tomorrow — 18 of 45 students showed concept-level gaps."*

**The hero student — Ananya Nair (Class 6A, the only student with full history; labelled "Demo student"):**
- **Current gap:** Word Problems (converting word problems into equations). Secondary: Fractions. Score 6/10.
- **Her story across terms (this is the whole point of the product):**
  - **Class 5, Term 2 (Mar 2024):** Fractions gap identified.
  - Tried **Visual fraction strips** → **improvement noticed** (fraction comparison errors dropped). *Confidence: Moderate.*
  - Tried **Extra worksheets** → **no observed change**. *Confidence: Low.*
  - **Class 5, Term 3 (Jul 2024):** **Peer activity** — only partially tried → **insufficient evidence**.
  - **Class 6, Term 1 (Nov 2024):** Word problems recurring; **Scaffolded practice** tried → follow-up pending.
  - **Class 6, Term 2 (Jan 2025):** Current assessment → word-problem + fraction-reasoning gap.
- **What the system recommends now:** *"Use concrete visual representation + scaffolded word problems."*
  - **Why (rationale):** visual fraction strips were associated with improvement before.
  - **Hypothesis (stated as a maybe, not a fact):** the current word-problem gap *may relate* to her earlier fraction-reasoning gap. *A possible connection, not a confirmed diagnosis.*

**The retrieval story (the "Evidence-first learning memory" panel), 5 steps:**
`01 Identify Gap → 02 Retrieve Memory → 03 Rank Evidence → 04 Build Context → 05 Recommend`
— this mirrors ContextForge's pipeline, re-expressed for a classroom.

---

## 2. The click-through guides (the amber hints — let them lead you)

The app has **built-in amber guidance** so the path is obvious on camera. Follow the amber and you cannot get lost:

| Where | Hint you'll see | What it's telling you to do |
|---|---|---|
| Results → Word Problems card | "**Tap to expand**" pill + pulsing dot + glow ring | Expand this concept group |
| Results → inside Word Problems | **Ananya's row** glows amber + bouncing `→` + "Demo student" tag | Tap Ananya |
| Passport → Timeline, first row | Floating "**tap me →**" by the Source chip | Tap a Source chip to open evidence |
| Passport → What Worked Before, first row | Big bouncing amber `←` next to Evidence / Use this | Tap Evidence, or "Use this" to log |
| Passport → bottom | "**Log what I did**" button with rippling amber wave + glow | Tap to log an intervention |

All hints auto-hide once you act (e.g. the "Tap to expand" pill disappears when the card opens).

---

## 3. The shot-by-shot script

> Timings are approximate. Narration lines are in quotes — say them in your own words if you prefer.

### [0:00–0:12] Cold open — the framing
- **Screen:** IntroScreen plays (logo, "A teacher's learning-memory system for Indian classrooms", three pillars, progress bar). Tap **Skip →** when ready.
- **Say:** "This is VidyaPaatha Passport. In a class of 45 children, a teacher can see *that* a child is struggling — but never has a record of *what was already tried*. Every new teacher starts from zero."

### [0:12–0:22] Honesty slate — the disclaimer modal
- **Screen:** "Prototype Demonstration" modal with ContextForge links.
- **Do:** read it for a beat, then tap **Continue to Demo**.
- **Say:** "This is a Phase 1 prototype on simulated classroom data. The retrieval and evidence engine behind it already exists — we built it as ContextForge. Here we're showing how that capability lands in a real classroom."

### [0:22–0:38] Dashboard — the day-one priority
- **Screen:** Dashboard. The **amber banner** dominates.
- **Point at:** "Reteach place value tomorrow — 18 of 45 students…", then the red "6 students need 1:1 support" and green "Multiplication facts are mostly secure".
- **Say:** "From the very first assessment, before any history exists, the teacher gets a concrete plan for tomorrow: what to reteach to the whole class, which six need one-to-one, and what's already secure. Action first — not a wall of scores."

### [0:38–1:00] Upload & diagnose — live from scratch
- **Do:** tap the **Upload** tab → tap the **scan zone**. Watch the 45 student chips light up green one by one. When done, tap **Analyse Assessment** and let the 5-step pipeline run.
- **Say:** "Here's capture. The teacher uploads the class's answer sheets — forty-five of them — and the system reads each against the answer key, locally, on the school machine. No internet, no student data leaving the device."
- **As the pipeline ticks:** "It's not just marking. It maps each wrong answer to the *concept* behind it."

### [1:00–1:18] Assessment Results — concept, not score
- **Screen:** Results. Concept groups with counts.
- **Do:** follow the **"Tap to expand"** amber hint → expand **Word Problems**.
- **Say:** "Results aren't a ranking. Students are grouped by the *concept* they're missing — place value, fractions, word problems. A child can score well and still carry a foundational gap, so we lead with the concept that needs teaching, not the mark."

### [1:18–1:30] Enter the Passport — meet Ananya
- **Do:** the amber-glowing **Ananya Nair** row (with the bouncing `→` and "Demo student" tag) is right there — tap it.
- **Say:** "Let's open one student. Ananya is flagged as a demo student — her history is illustrative, pre-loaded so you can see how a record builds over two years. Everything labelled this way is simulated; we're never pretending it's live."

### [1:30–1:55] What To Try Next + the reasoning
- **Screen:** Passport. The navy **What To Try Next** card sits above the history.
- **Point at:** the recommendation "Use concrete visual representation + scaffolded word problems," then the amber **hypothesis** line.
- **Do:** tap to expand the **"Evidence-first learning memory"** panel; let the 5 steps show.
- **Say:** "Before any history, the teacher already has a grounded next step — and crucially, *why*. The system retrieves this child's own past, ranks what mattered, and builds the recommendation. Notice the hypothesis is phrased as a *maybe* — her word-problem gap *may* connect to an earlier fractions gap. We never claim cause."

### [1:55–2:20] What Worked Before — the heart of it
- **Screen:** the **What Worked Before** panel.
- **Point at each row:** ✓ **Visual fraction strips — associated with improvement** (moderate) · – **Extra worksheets — no observed change** · ? **Peer activity — insufficient evidence**.
- **Say:** "This is the memory other tools throw away. With Ananya specifically: visual fraction strips were associated with her improving. Extra worksheets did nothing. Peer activity — we genuinely don't have enough data, and the system says so instead of pretending. Three honest states, every one backed by evidence."

### [2:20–2:35] Evidence Drawer — cite or don't claim
- **Do:** follow the **"tap me →"** hint, tap an **Evidence / Source** chip on the improvement row.
- **Screen:** the drawer slides up — title, before/after question table (✗ Incorrect → ✓ Correct), and the disclaimer.
- **Say:** "Every claim is one tap from its source — the actual assessment, question by question, before and after. And the hard rule: association, not proven causation. If there's no evidence, we don't show a claim." Close the drawer.

### [2:35–2:55] Log an intervention — two taps
- **Do:** tap **Log what I did** (the rippling amber button). The recommended action is already selected → tap **Save**. The green ✓ "Logged." appears and the sheet closes.
- **Say:** "And closing the loop has to be effortless, or it never happens. The recommended action is pre-selected — one tap to confirm, one to save. 'Logged. I'll check whether this helped at the next assessment.'"
- **Point at:** the new entry now sitting in **What Worked Before**.
- **Say:** "It's already in her record — ready for the next teacher, the next term."

### [2:55–3:10] Class Insights + close
- **Do:** tap the **Insights** tab. Show the concept groups with their proportion bars; optionally expand one.
- **Say:** "Zoom back out and the same evidence rolls up to the class: who needs what, this week. Concept over score, action over analytics."
- **(Optional) Settings tab:** point at "Working locally / No external API / Data stays on device."
- **Closing line:** "Identify the gap today. Remember what worked before. Decide what to try next. That's VidyaPaatha Passport — the teaching memory a classroom never had."

---

## 4. Quick-reference tap list (no narration)

```
Skip intro → Continue to Demo
→ [Dashboard]  read banner
→ Upload tab → tap scan zone → wait for 45 → Analyse Assessment
→ [Results]   expand "Word Problems" → tap "Ananya Nair"
→ [Passport]  expand "Evidence-first learning memory"
            → read "What Worked Before" (3 rows)
            → tap a "Source/Evidence" chip → read drawer → Close
            → "Log what I did" → Save → see ✓ → see new row
→ Insights tab → expand a group
→ (optional) Settings tab
```

---

## 5. If you need a 60-second cut

Keep only: Dashboard banner (0:22) → Upload+Analyse (0:38) → expand Word Problems → Ananya (1:18) → What Worked Before (1:55) → one Evidence chip (2:20) → Log → Save (2:35). Drop the reasoning panel and Class Insights. The loop still reads end-to-end.

---

_Prototype created for SahAI for Shiksha 2026 — Challenge 2.4._

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  RotateCcw,
  ScrollText,
} from "lucide-react";
import {
  Card,
  SectionHeader,
  Label,
  Badge,
  Button,
  ProgressBar,
  Choice,
  ResultBanner,
} from "../components/ui";

/* ------------------------------------------------------------------ *
 * Copyright Compiler
 * ------------------------------------------------------------------
 * Branded "Copyright Compiler". This is the original "Copyright Genie"
 * step-by-step U.S. copyright-term calculator. All visible question /
 * option / result text is reproduced verbatim from the original tool
 * (genie.php). Helper popups whose source text was not present in the
 * captured files use brief neutral labels and do NOT invent legal text.
 * ------------------------------------------------------------------ */

const currentYear = new Date().getFullYear();
const pdCutoff = currentYear - 95; // public-domain boundary year (1931 in 2026)

/* ---- Answer value types ------------------------------------------ */

type YesNo = "yes" | "no";
type Pre1989 = "before" | "onAfter";
type PubLocation = "us" | "simultaneous" | "abroad" | "unknown";
type Authorship = "individual" | "joint" | "workForHire" | "pseudonym" | "anonymous";
type NoticeAnswer = "withC" | "withoutC" | "withoutCRegistered" | "unclear";
type Renewed = "yes" | "no" | "notSure";
type AuthorAlive = "alive" | "deceased" | "notSure";

interface Answers {
  copyrightable: YesNo | null;
  published: YesNo | null;
  publicationYear: string;
  pre1989: Pre1989 | null;
  pubLocation: PubLocation | null;
  registered: YesNo | null;
  registrationYear: string;
  authorship: Authorship | null;
  creationYear: string;
  notice: NoticeAnswer | null;
  renewed: Renewed | null;
  authorAlive: AuthorAlive | null;
  authorDeathYear: string;
  authorDeathUnknown: boolean;
}

const initialAnswers: Answers = {
  copyrightable: null,
  published: null,
  publicationYear: "",
  pre1989: null,
  pubLocation: null,
  registered: null,
  registrationYear: "",
  authorship: null,
  creationYear: "",
  notice: null,
  renewed: null,
  authorAlive: null,
  authorDeathYear: "",
  authorDeathUnknown: false,
};

/* ---- Step identifiers -------------------------------------------- */

type StepId =
  | "copyrightable"
  | "published"
  | "publicationDate"
  | "pre1989"
  | "USWork"
  | "registered"
  | "registeredDate"
  | "authorship"
  | "creationDate"
  | "copyrightNotice"
  | "renewed"
  | "authorAlive"
  | "authorsDeath";

/* ---- Outcome types ----------------------------------------------- */

type ProtectedFlag = 1 | 0 | "unable";

interface Outcome {
  protected: ProtectedFlag;
  /** Verbatim supplemental note from the original tool, when applicable. */
  details?: string;
  /** Year copyright expires (public domain begins Jan 1 of expiration + 1). */
  expiration?: number;
}

/* ================================================================== *
 * Year parsing helpers
 * ================================================================== */

function yearNum(value: string): number | null {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && value.trim() !== "" ? n : null;
}

/* ================================================================== *
 * Outcome computation
 * ------------------------------------------------------------------
 * Standard U.S. copyright term rules implied by the question flow.
 * Returns one of the three verbatim outcomes via `protected`:
 *   1        -> covered by U.S. Copyright Law
 *   0        -> public domain
 *   "unable" -> unable to determine
 * ================================================================== */

function computeOutcome(a: Answers): Outcome | null {
  // Not copyrightable -> unable (verbatim detail from original tool).
  if (a.copyrightable === "no") {
    return {
      protected: "unable",
      details:
        "Your work is not covered by U.S. Copyright Law, but it may or may not be in the Public Domain. Works not covered by U.S. Copyright may still be protected under other laws.",
    };
  }
  if (a.copyrightable !== "yes") return null;

  if (a.published === null) return null;

  /* ---------------- Unpublished works ---------------- */
  if (a.published === "no") {
    if (a.authorship === null) return null;

    // Works for hire / anonymous / pseudonymous: 120 years from creation.
    if (
      a.authorship === "workForHire" ||
      a.authorship === "anonymous" ||
      a.authorship === "pseudonym"
    ) {
      const created = yearNum(a.creationYear);
      if (created === null) return null;
      const expiration = created + 120;
      if (currentYear > expiration) return { protected: 0, expiration };
      return { protected: 1, expiration };
    }

    // Individual / joint: life of the author + 70.
    if (a.authorAlive === null) return null;
    if (a.authorAlive === "alive") {
      return { protected: 1 };
    }
    if (a.authorAlive === "notSure" || a.authorDeathUnknown) {
      return { protected: "unable" };
    }
    const death = yearNum(a.authorDeathYear);
    if (death === null) return null;
    const expiration = death + 70;
    if (currentYear > expiration) return { protected: 0, expiration };
    return { protected: 1, expiration };
  }

  /* ---------------- Published works ---------------- */
  const pubYear = yearNum(a.publicationYear);
  if (pubYear === null) return null;

  // Anything first published before the 95-year public-domain cutoff is PD.
  if (pubYear < pdCutoff) {
    return { protected: 0, expiration: pubYear + 95 };
  }

  // Determine pre/post March 1st, 1989 regime.
  // For 1989 itself the user is asked explicitly; otherwise infer from year.
  let before1989: boolean;
  if (pubYear < 1989) before1989 = true;
  else if (pubYear > 1989) before1989 = false;
  else {
    if (a.pre1989 === null) return null;
    before1989 = a.pre1989 === "before";
  }

  /* ---- Works published 1978 .. (pre-1989 vs on/after) under modern term ----
   * For works published 1978 and later, the term is generally life+70
   * (or 95/120 for works for hire / anonymous / pseudonymous), and the
   * formalities (notice / renewal) below 1978 do not apply the same way.
   * Notice mattered for works published before March 1, 1989.
   */

  // Pre-1978 published works: governed by notice + renewal formalities.
  if (pubYear < 1978) {
    // Published without a valid notice before 1989 -> public domain
    // (unless saved by registration within 5 years for the 1978-1989 window,
    //  which does not apply to pre-1978 works).
    if (a.notice === null) return null;
    if (a.notice === "unclear") return { protected: "unable" };
    if (a.notice === "withoutC" || a.notice === "withoutCRegistered") {
      return { protected: 0, expiration: pubYear + 95 };
    }
    // Published with notice: depends on renewal (28-year initial term).
    if (a.renewed === null) return null;
    if (a.renewed === "notSure") return { protected: "unable" };
    if (a.renewed === "no") {
      // Not renewed -> fell into public domain after the initial 28-year term.
      return { protected: 0, expiration: pubYear + 28 };
    }
    // Renewed -> 95-year term from publication.
    const expiration = pubYear + 95;
    if (currentYear > expiration) return { protected: 0, expiration };
    return { protected: 1, expiration };
  }

  // Published 1978 .. Feb 28, 1989: notice still required.
  if (before1989) {
    if (a.notice === null) return null;
    if (a.notice === "unclear") return { protected: "unable" };
    if (a.notice === "withoutC") {
      // Published without notice and NOT registered within 5 years -> PD.
      return { protected: 0, expiration: pubYear + 95 };
    }
    // "withC" or "withoutCRegistered" -> protected under modern term.
  }

  // Modern term (1978 onward, with formalities satisfied or post-1989):
  if (a.authorship === null) return null;

  if (
    a.authorship === "workForHire" ||
    a.authorship === "anonymous" ||
    a.authorship === "pseudonym"
  ) {
    // 95 years from publication or 120 from creation, whichever ends first.
    const created = yearNum(a.creationYear);
    const term95 = pubYear + 95;
    const term120 = created !== null ? created + 120 : term95;
    const expiration = Math.min(term95, term120);
    if (currentYear > expiration) return { protected: 0, expiration };
    return { protected: 1, expiration };
  }

  // Individual / joint authorship -> life + 70.
  if (a.authorAlive === null) return null;
  if (a.authorAlive === "alive") {
    return { protected: 1 };
  }
  if (a.authorAlive === "notSure" || a.authorDeathUnknown) {
    return { protected: "unable" };
  }
  const death = yearNum(a.authorDeathYear);
  if (death === null) return null;
  const expiration = death + 70;
  if (currentYear > expiration) return { protected: 0, expiration };
  return { protected: 1, expiration };
}

/* ================================================================== *
 * Step flow derivation
 * ------------------------------------------------------------------
 * Produces the ordered list of relevant steps based on current answers,
 * so Back/Next only walk through applicable questions.
 * ================================================================== */

function buildSteps(a: Answers): StepId[] {
  const steps: StepId[] = ["copyrightable"];
  if (a.copyrightable !== "yes") return steps;

  steps.push("published");
  if (a.published === null) return steps;

  if (a.published === "yes") {
    steps.push("publicationDate");
    const pubYear = yearNum(a.publicationYear);
    if (pubYear === null) return steps;

    // Ask the pre/post 1989 question only when published in 1989.
    if (pubYear === 1989) {
      steps.push("pre1989");
      if (a.pre1989 === null) return steps;
    }

    steps.push("USWork");
    if (a.pubLocation === null) return steps;
    // "abroad" / "unknown" are handled as informational popups in the
    // original; we still let the flow continue to gather term info.

    steps.push("registered");
    if (a.registered === null) return steps;
    if (a.registered === "yes") {
      steps.push("registeredDate");
      if (yearNum(a.registrationYear) === null) return steps;
    }

    steps.push("authorship");
    if (a.authorship === null) return steps;

    // Creation date is needed for work-for-hire / anonymous / pseudonym.
    if (
      a.authorship === "workForHire" ||
      a.authorship === "anonymous" ||
      a.authorship === "pseudonym"
    ) {
      steps.push("creationDate");
      if (yearNum(a.creationYear) === null) return steps;
    }

    // Notice / renewal only relevant for pre-1989 published works.
    const pre1989 = pubYear < 1989 || (pubYear === 1989 && a.pre1989 === "before");
    if (pre1989) {
      steps.push("copyrightNotice");
      if (a.notice === null) return steps;

      // Renewal only relevant for pre-1978 works published with notice.
      if (pubYear < 1978 && a.notice === "withC") {
        steps.push("renewed");
        if (a.renewed === null) return steps;
      }
    }

    // Life+70 path needs author alive / death.
    if (a.authorship === "individual" || a.authorship === "joint") {
      steps.push("authorAlive");
      if (a.authorAlive === null) return steps;
      if (a.authorAlive === "deceased") {
        steps.push("authorsDeath");
      }
    }

    return steps;
  }

  /* ---- Unpublished branch ---- */
  steps.push("authorship");
  if (a.authorship === null) return steps;

  if (
    a.authorship === "workForHire" ||
    a.authorship === "anonymous" ||
    a.authorship === "pseudonym"
  ) {
    steps.push("creationDate");
    return steps;
  }

  // Individual / joint unpublished -> life + 70.
  steps.push("authorAlive");
  if (a.authorAlive === null) return steps;
  if (a.authorAlive === "deceased") {
    steps.push("authorsDeath");
  }
  return steps;
}

/* ================================================================== *
 * Authorship-dependent wording (mirrors the original tool's behavior).
 * ================================================================== */

function authorWording(a: Answers) {
  const isMulti = a.authorship === "joint";
  return {
    aliveQuestionSubject: isMulti ? "at least one author" : "author",
    aliveOption: isMulti ? "At least one author" : "The author",
    deceasedOption: isMulti ? "All authors are" : "The author is",
    deathSubject: isMulti ? "last living author" : "author",
  };
}

/* ================================================================== *
 * Year <select> reused by date steps (1441 .. current year, as in the
 * original tool). Defined at module scope so React does not remount the
 * <select> on every keystroke.
 * ================================================================== */
function YearSelect({
  id,
  value,
  onChange,
  label,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const years: number[] = [];
  for (let y = currentYear; y >= 1441; y--) years.push(y);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block">
        <Label>{label}</Label>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 focus-ring"
      >
        <option value="">—</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================================================================== *
 * Component
 * ================================================================== */

export default function CopyrightCompiler() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const clampedIndex = Math.min(stepIndex, steps.length - 1);
  const currentStep = steps[clampedIndex];

  const outcome = useMemo(() => computeOutcome(answers), [answers]);

  const words = authorWording(answers);

  /* ---- mutation helper ---- */
  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setAnswers(initialAnswers);
    setStepIndex(0);
    setShowResult(false);
  }

  /* ---- Navigation ---- */
  const isLastStep = clampedIndex >= steps.length - 1;

  function goNext() {
    if (!isLastStep) {
      setStepIndex(clampedIndex + 1);
    } else {
      setShowResult(true);
    }
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (clampedIndex > 0) setStepIndex(clampedIndex - 1);
  }

  /* ---- Per-step "can advance" gate ---- */
  function canAdvance(): boolean {
    switch (currentStep) {
      case "copyrightable":
        return answers.copyrightable !== null;
      case "published":
        return answers.published !== null;
      case "publicationDate":
        return yearNum(answers.publicationYear) !== null;
      case "pre1989":
        return answers.pre1989 !== null;
      case "USWork":
        return answers.pubLocation !== null;
      case "registered":
        return answers.registered !== null;
      case "registeredDate":
        return yearNum(answers.registrationYear) !== null;
      case "authorship":
        return answers.authorship !== null;
      case "creationDate":
        return yearNum(answers.creationYear) !== null;
      case "copyrightNotice":
        return answers.notice !== null;
      case "renewed":
        return answers.renewed !== null;
      case "authorAlive":
        return answers.authorAlive !== null;
      case "authorsDeath":
        return answers.authorDeathUnknown || yearNum(answers.authorDeathYear) !== null;
      default:
        return false;
    }
  }

  // When this is the final relevant step and we have an outcome, allow finishing.
  const readyToCompute = isLastStep && canAdvance() && outcome !== null;

  const percent = showResult
    ? 100
    : Math.round(((clampedIndex + 1) / (steps.length + 1)) * 100);

  /* ================================================================ *
   * Step renderers (verbatim question + option text)
   * ================================================================ */
  function renderStep() {
    switch (currentStep) {
      case "copyrightable":
        return (
          <StepShell
            legend={
              <>
                Is the work in question copyrightable?
              </>
            }
          >
            <Choice
              selected={answers.copyrightable === "yes"}
              onClick={() => update("copyrightable", "yes")}
            >
              Yes, it's copyrightable
            </Choice>
            <Choice
              selected={answers.copyrightable === "no"}
              onClick={() => update("copyrightable", "no")}
            >
              No, it isn't copyrightable
            </Choice>
          </StepShell>
        );

      case "published":
        return (
          <StepShell
            legend={
              <>
                Has the work been published?
              </>
            }
          >
            <Choice
              selected={answers.published === "yes"}
              onClick={() => update("published", "yes")}
            >
              Yes, it is published
            </Choice>
            <Choice
              selected={answers.published === "no"}
              onClick={() => update("published", "no")}
            >
              No, it is unpublished
            </Choice>
          </StepShell>
        );

      case "publicationDate":
        return (
          <StepShell
            legend={
              <>
                In what year was the work first <span className="underline">published</span>?
              </>
            }
          >
            <YearSelect
              id="publicationDate"
              label="Date of publication:"
              value={answers.publicationYear}
              onChange={(v) => update("publicationYear", v)}
            />
          </StepShell>
        );

      case "pre1989":
        return (
          <StepShell legend={<>Was the work first published:</>}>
            <Choice
              selected={answers.pre1989 === "before"}
              onClick={() => update("pre1989", "before")}
            >
              Before March 1st, 1989?
            </Choice>
            <Choice
              selected={answers.pre1989 === "onAfter"}
              onClick={() => update("pre1989", "onAfter")}
            >
              On or after March 1st, 1989?
            </Choice>
          </StepShell>
        );

      case "USWork":
        return (
          <StepShell
            legend={
              <>
                The work was first published
              </>
            }
          >
            <Choice
              selected={answers.pubLocation === "us"}
              onClick={() => update("pubLocation", "us")}
            >
              In the United States
            </Choice>
            <Choice
              selected={answers.pubLocation === "simultaneous"}
              onClick={() => update("pubLocation", "simultaneous")}
            >
              Simultaneously in the U.S. &amp; abroad
            </Choice>
            <Choice
              selected={answers.pubLocation === "abroad"}
              onClick={() => update("pubLocation", "abroad")}
            >
              First Published Abroad
            </Choice>
            <Choice
              selected={answers.pubLocation === "unknown"}
              onClick={() => update("pubLocation", "unknown")}
            >
              I don't know
            </Choice>
          </StepShell>
        );

      case "registered":
        return (
          <StepShell
            legend={
              <>
                Was the work registered with the copyright office? [rare]
              </>
            }
          >
            <Choice
              selected={answers.registered === "no"}
              onClick={() => update("registered", "no")}
            >
              No, it was not registered with the copyright office
            </Choice>
            <Choice
              selected={answers.registered === "yes"}
              onClick={() => update("registered", "yes")}
            >
              Yes, it was registered with the copyright office
            </Choice>
          </StepShell>
        );

      case "registeredDate":
        return (
          <StepShell
            legend={<>In what year was the work registered with the Copyright Office?</>}
          >
            <YearSelect
              id="registeredDate"
              label="Date of registration:"
              value={answers.registrationYear}
              onChange={(v) => update("registrationYear", v)}
            />
          </StepShell>
        );

      case "authorship":
        return (
          <StepShell legend={<>The work in question was created (choose one of the following):</>}>
            <Choice
              selected={answers.authorship === "individual"}
              onClick={() => update("authorship", "individual")}
            >
              by an individual
            </Choice>
            <Choice
              selected={answers.authorship === "joint"}
              onClick={() => update("authorship", "joint")}
            >
              <span className="flex flex-wrap items-center">
                through joint authorship
              </span>
            </Choice>
            <Choice
              selected={answers.authorship === "workForHire"}
              onClick={() => update("authorship", "workForHire")}
            >
              <span className="flex flex-wrap items-center">
                as a work for hire/under corporate authorship
              </span>
            </Choice>
            <Choice
              selected={answers.authorship === "pseudonym"}
              onClick={() => update("authorship", "pseudonym")}
            >
              <span className="flex flex-wrap items-center">
                under a pseudonym
              </span>
            </Choice>
            <Choice
              selected={answers.authorship === "anonymous"}
              onClick={() => update("authorship", "anonymous")}
            >
              <span className="flex flex-wrap items-center">
                by an anonymous author
              </span>
            </Choice>
          </StepShell>
        );

      case "creationDate":
        return (
          <StepShell
            legend={
              <>
                In what year was the work <span className="underline">created?</span>
              </>
            }
          >
            <YearSelect
              id="creationDate"
              label="Date of creation:"
              value={answers.creationYear}
              onChange={(v) => update("creationYear", v)}
            />
          </StepShell>
        );

      case "copyrightNotice":
        return (
          <StepShell
            legend={
              <>
                Was the work published with a copyright notice?
              </>
            }
          >
            <Choice
              selected={answers.notice === "withC"}
              onClick={() => update("notice", "withC")}
            >
              Yes, with a &copy;
            </Choice>
            <Choice
              selected={answers.notice === "withoutC"}
              onClick={() => update("notice", "withoutC")}
            >
              No, without a &copy;
            </Choice>
            <Choice
              selected={answers.notice === "withoutCRegistered"}
              onClick={() => update("notice", "withoutCRegistered")}
            >
              No, without a &copy;, but was registered within 5 years
            </Choice>
            <Choice
              selected={answers.notice === "unclear"}
              onClick={() => update("notice", "unclear")}
            >
              It isn't clear / I don't know
            </Choice>
          </StepShell>
        );

      case "renewed":
        return (
          <StepShell
            legend={
              <>
                Was the copyright on the work renewed?
              </>
            }
          >
            <Choice
              selected={answers.renewed === "yes"}
              onClick={() => update("renewed", "yes")}
            >
              Yes, it was renewed
            </Choice>
            <Choice
              selected={answers.renewed === "no"}
              onClick={() => update("renewed", "no")}
            >
              No, it was not renewed
            </Choice>
            <Choice
              selected={answers.renewed === "notSure"}
              onClick={() => update("renewed", "notSure")}
            >
              I'm not sure
            </Choice>
          </StepShell>
        );

      case "authorAlive":
        return (
          <StepShell
            legend={
              <>
                Is {words.aliveQuestionSubject === "author" ? "the author" : "the author (or at least one of the authors)"}{" "}
                still alive?
              </>
            }
          >
            <Choice
              selected={answers.authorAlive === "alive"}
              onClick={() => update("authorAlive", "alive")}
            >
              {words.aliveOption} is still alive
            </Choice>
            <Choice
              selected={answers.authorAlive === "deceased"}
              onClick={() => update("authorAlive", "deceased")}
            >
              {words.deceasedOption} deceased
            </Choice>
            <Choice
              selected={answers.authorAlive === "notSure"}
              onClick={() => update("authorAlive", "notSure")}
            >
              <span className="flex flex-wrap items-center">
                Not sure (death date unknown or not registered)
              </span>
            </Choice>
          </StepShell>
        );

      case "authorsDeath":
        return (
          <StepShell
            legend={
              <>
                When did the {words.deathSubject === "author" ? "author" : "author (or last living author)"} die?
              </>
            }
          >
            <YearSelect
              id="authorsDeath"
              label={`Date of ${words.deathSubject}'s death:`}
              value={answers.authorDeathYear}
              onChange={(v) => {
                update("authorDeathYear", v);
                if (v) update("authorDeathUnknown", false);
              }}
            />
            <Choice
              selected={answers.authorDeathUnknown}
              onClick={() => {
                update("authorDeathUnknown", true);
                update("authorDeathYear", "");
              }}
            >
              <span className="flex flex-wrap items-center">
                Not sure (death date unknown or not registered)
              </span>
            </Choice>
          </StepShell>
        );

      default:
        return null;
    }
  }

  /* ================================================================ *
   * Result rendering
   * ================================================================ */
  function renderResult() {
    if (!outcome) {
      return (
        <ResultBanner
          tone="neutral"
          title="We were unable to determine the status of the work based on the information provided."
        />
      );
    }

    if (outcome.protected === 1) {
      return (
        <ResultBanner
          tone="negative"
          title="According to the information provided, this work is currently covered by U.S. Copyright Law."
        >
          {outcome.expiration !== undefined && (
            <p>This work will enter the public domain on January 1, {outcome.expiration + 1}</p>
          )}
        </ResultBanner>
      );
    }

    if (outcome.protected === 0) {
      return (
        <ResultBanner
          tone="positive"
          title="According to the information provided, this work falls in the public domain."
        >
          {outcome.expiration !== undefined && (
            <p>
              This work is not currently covered by U.S. Copyright Law as it entered the public
              domain on January 1, {outcome.expiration + 1}.
            </p>
          )}
        </ResultBanner>
      );
    }

    // "unable"
    return (
      <ResultBanner
        tone="caution"
        title="We were unable to determine the status of the work based on the information provided."
      >
        {outcome.details && <p>{outcome.details}</p>}
      </ResultBanner>
    );
  }

  /* ================================================================ *
   * Render
   * ================================================================ */
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <header className="border-b border-zinc-100 pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9a1866]/10 text-[#9a1866]">
            <ScrollText className="h-6 w-6" />
          </span>
          <div>
            <Label>Copyright Term Calculator</Label>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900">
              Copyright Compiler
            </h2>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
          Helping you find out if a work is covered by U.S. copyright, calculating its terms of
          protection, and collecting the results for your records or to further vet with a
          copyright specialist.
        </p>
      </header>

      <Card className="overflow-hidden">
        {/* Progress + step indicator */}
        <div className="space-y-3 border-b border-zinc-100 bg-zinc-50 px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <Badge>
              {showResult ? "RESULT" : `STEP ${clampedIndex + 1}`}
            </Badge>
            <Label>
              {showResult
                ? "Status determined"
                : `Step ${clampedIndex + 1} of ${steps.length}`}
            </Label>
          </div>
          <ProgressBar percent={percent} />
        </div>

        {/* Body */}
        <div className="px-6 py-7">
          {showResult ? (
            <div className="space-y-6">
              <SectionHeader>Copyright Status</SectionHeader>
              {renderResult()}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button variant="primary" icon={Printer} onClick={() => window.print()}>
                  Print
                </Button>
                <Button variant="secondary" icon={ArrowLeft} onClick={goBack}>
                  Back
                </Button>
                <Button variant="ghost" icon={RotateCcw} onClick={reset}>
                  Click here to start over.
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-7">
              {renderStep()}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3 border-t border-zinc-100 pt-6">
                <Button
                  variant="secondary"
                  icon={ArrowLeft}
                  onClick={goBack}
                  disabled={clampedIndex === 0}
                >
                  Back
                </Button>
                {isLastStep ? (
                  <Button
                    variant="primary"
                    onClick={goNext}
                    disabled={!readyToCompute}
                  >
                    Check with the compiler!
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    icon={ArrowRight}
                    onClick={goNext}
                    disabled={!canAdvance()}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ================================================================== *
 * Small layout helper for a question step.
 * ================================================================== */
function StepShell({
  legend,
  children,
}: {
  legend: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5">
      <legend className="font-display text-lg font-extrabold leading-snug text-zinc-900">
        {legend}
      </legend>
      <div className="space-y-3">{children}</div>
    </fieldset>
  );
}

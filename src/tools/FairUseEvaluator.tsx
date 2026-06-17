import React, { useState } from "react";
import {
  Card,
  SectionHeader,
  Label,
  Badge,
  Button,
  ProgressBar,
  Choice,
  ResultBanner,
  Modal,
} from "../components/ui";
import {
  Scale,
  ArrowLeft,
  ArrowRight,
  Printer,
  RotateCcw,
  BookOpen,
  ShieldAlert,
  Info,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Fair Use Evaluator — Library Futures copyright-tools SPA.
 *
 * All instructional / legal copy below is reproduced VERBATIM from the
 * original Fair Use Evaluator by Michael Brewer & the ALA Office for
 * Information Technology Policy (© 2008), via the cleaned reference at
 * .content-reference/fairuse.txt and the source .php.html pages under
 * /resources/fairuse/. No paraphrasing, summarizing, or invented text.
 * ------------------------------------------------------------------ */

type Lean = "favor" | "against" | "neutral";

interface FactorContent {
  key: "purpose" | "nature" | "amount" | "effect";
  label: string;
  /** Verbatim question from the *description.php page. */
  question: React.ReactNode;
  favoring: string[];
  opposing: string[];
}

/* --- Verbatim factor descriptions (purposedescription.php, etc.) --- */
const FACTORS: FactorContent[] = [
  {
    key: "purpose",
    label: "Purpose",
    question: (
      <>
        What is the <b>purpose</b> and character of the use being considered?
      </>
    ),
    favoring: [
      'Use is for "criticism, comment, news reporting, teaching, (including multiple print copies for classroom use), scholarship or research"',
      "Use is transformative, i.e. it uses the existing work in a new way (creates an index to the work) or for a new purpose (parody, pastiche, instructional materials, etc.) Transformative works are favored because the purpose of U.S. Copyright Law is to encourage the development and dissemination of new knowledge to benefit the public and thereby advance learning.",
      "Use is socially beneficial (promotes the creation of new knowledge, learning, etc.) [define how]",
      "Use is not-for-profit",
      "Use is clearly defined and is restricted in scope (limited duration, not iterative, restricted access, etc.)",
      "Use is one-time, or is only occasional or spontaneous",
    ],
    opposing: [
      'Use is NOT for "criticism, comment, news reporting, teaching, scholarship or research"',
      "Use is for-profit, or by a commercial entity",
      "Original work is simply duplicated, or reused toward its original intention, rather than being used to create a new work with a new purpose",
      "Scope of the use is not well defined or is systematic, iterative, or ongoing",
      "Use creates a derivative work of the original (full translation, adaptation, abridged version, etc.)",
    ],
  },
  {
    key: "nature",
    label: "Nature",
    question: (
      <>
        What is the <b>nature</b> of the copyrighted work?
      </>
    ),
    favoring: [
      "Work to be used has been previously PUBLISHED",
      "Work to be used contains limited new knowledge, content, or creative expression (in relation to previously copyrighted works)",
      "Work to be used is primarily of a factual nature (non-fiction, collection of facts, etc.)",
      "Original work was not created and/or has not been marketed for the stated purpose of the proposed use",
    ],
    opposing: [
      'Work to be used is UNPUBLISHED (not simply "out of print," but never actually published)',
      "Work contains a significant amount of new knowledge, information, or creative expression",
      "Work is of a category of works considered highly creative (fine art, musical works, drama, artistic photography or film, etc.)",
      "Work being used was created for and/or is being marketed for the stated purpose of the proposed use",
      'Work is a "consumable" (workbooks or other such educational or other materials that are typically used only once)',
    ],
  },
  {
    key: "amount",
    label: "Amount",
    question: (
      <>
        What is the <b>amount and substantiality</b> of the portion used in
        relation to the work as a whole?
      </>
    ),
    favoring: [
      "Only limited and reasonable portions will be used",
      'The portion used is not the "heart" of the work (the portion considered most central to the work as a whole)',
      "Only the amount required to achieve the stated, socially-beneficial purpose or objective will be used (be that educational, artistic, scholarly, journalistic, etc.)",
      "If the entire work is to be used (which would NOT favor the use being fair), it is clear that no less than the entire work will achieve the stated purpose of the use (e.g. use of a photograph, a short poem, an article, etc.)",
      "The amount used falls within widely recognized fair use guidelines* vetted by key stakeholder groups [reference guidelines]",
    ],
    opposing: [
      'The entire work, or the "heart" of the work, is used (the "heart" is the portion considered most central to the work as a whole)',
      "portion of the work greater than what is needed to achieve the stated purpose or objective is used",
      "The amount used clearly exceeds established fair use guidelines [name guidelines]",
      "An excessive, or unreasonable amount of the work is used",
    ],
  },
  {
    key: "effect",
    label: "Effect",
    question: (
      <>
        What is the <b>effect</b> of the use on the potential market or value of
        the copyrighted work?
      </>
    ),
    favoring: [
      "The work is NOT currently under commercial exploitation (out of print, no licensing available, etc.)",
      "A market for the work as it will be used is absent or is negligible & use of the work will have little or no negative impact on its value or potential value",
      "The copyright holder cannot be identified or cannot be found after a reasonable search, or, once found does not respond (one way or another) to requests for permission to use the work",
      "Use of the work minimizes the potential for unauthorized use that could impact its value (i.e. steps are taken to ensure the content is not used outside of the stated purpose or audience)",
      "Use of the work has the potential to create or improve the market for the work",
      "The copy of the work to be used is a legal copy",
      "Proper attribution will be given with the intended use",
    ],
    opposing: [
      "The work is currently under commercial exploitation (in-print, clear licensing available, etc.) and the use substitutes for purchasing or licensing a copy",
      "The work already has an established market, or the clear potential for a future market as it is being used",
      "The copyright holder denies a request for permission to use the work",
      "The work is used in a way that would allow for unauthorized use that could negatively impact on its value",
      "The copy of the work to be used may not be a legal copy",
      "Use of the work has the potential to damage the market for the work or its potential value (reduce profits, damage or put market at jeopardy, etc.)",
      "Proper attribution will NOT be given with the intended use",
    ],
  },
];

interface FactorEntry {
  description: string;
  lean: Lean | null;
}

const emptyEntry = (): FactorEntry => ({ description: "", lean: null });

const LEAN_LABEL: Record<Lean, string> = {
  favor: "Favors fair use",
  neutral: "Neutral",
  against: "Against fair use",
};

const LEAN_SCORE: Record<Lean, number> = {
  favor: 1,
  neutral: 0,
  against: -1,
};

export default function FairUseEvaluator() {
  // Step 0: context · Steps 1-4: factors · Step 5: result
  const TOTAL_STEPS = 6;
  const [step, setStep] = useState(0);

  // Contextual information
  const [useName, setUseName] = useState("");
  const [yourName, setYourName] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  // One entry per factor
  const [entries, setEntries] = useState<FactorEntry[]>(() =>
    FACTORS.map(emptyEntry),
  );

  // Modals
  const [learnOpen, setLearnOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  const setEntry = (i: number, patch: Partial<FactorEntry>) =>
    setEntries((prev) =>
      prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)),
    );

  const percent = Math.round((step / (TOTAL_STEPS - 1)) * 100);

  /* ----- Overall "fairness" result: mathematical average of leans ----- */
  const rated = entries.filter((e) => e.lean !== null);
  const average =
    rated.length === 0
      ? 0
      : rated.reduce((sum, e) => sum + LEAN_SCORE[e.lean as Lean], 0) /
        rated.length;

  const tone: "positive" | "caution" | "negative" =
    average > 0.25 ? "positive" : average < -0.25 ? "negative" : "caution";

  const toneTitle =
    tone === "positive"
      ? "On balance, your evaluations lean toward fair use"
      : tone === "negative"
        ? "On balance, your evaluations lean against fair use"
        : "On balance, your evaluations are mixed or neutral";

  const reset = () => {
    setStep(0);
    setUseName("");
    setYourName("");
    setDate(new Date().toISOString().slice(0, 10));
    setEntries(FACTORS.map(emptyEntry));
  };

  const canAdvance =
    step === 0
      ? true
      : step >= 1 && step <= 4
        ? entries[step - 1].lean !== null
        : true;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ---------- Header ---------- */}
      <header className="border-b border-zinc-100 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9a1866]/10 text-[#9a1866]">
                <Scale className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Fair Use Evaluator
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
              This tool helps you evaluate your intended use against the four
              fair use factors, then issues a color-coded "fairness" result
              showing the average for the evaluations you provided.
            </p>
          </div>
          <div className="hidden flex-shrink-0 gap-2 sm:flex">
            <Button
              variant="secondary"
              icon={BookOpen}
              onClick={() => setLearnOpen(true)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* ---------- Progress ---------- */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>
            Step {step + 1} of {TOTAL_STEPS}
          </Label>
          <Label>{percent}% complete</Label>
        </div>
        <ProgressBar percent={percent} />
      </div>

      {/* ---------- Step 0: Getting Started / context ---------- */}
      {step === 0 && (
        <div className="space-y-6">
          <Card className="p-6">
            <SectionHeader>Getting Started</SectionHeader>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Provide contextual information about your intended use. You will
              then describe how your intended use relates to each of the four
              fair use factors, and indicate how "fair" you feel your use is for
              each of the factors (based on the description &amp; criteria you
              have provided).
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="fue-usename"
                  className="mb-1.5 block text-sm font-semibold text-zinc-800"
                >
                  Name of the use / project
                </label>
                <input
                  id="fue-usename"
                  type="text"
                  value={useName}
                  onChange={(e) => setUseName(e.target.value)}
                  placeholder="e.g. Course reserve scan for HIST 101"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="fue-yourname"
                  className="mb-1.5 block text-sm font-semibold text-zinc-800"
                >
                  Your name
                </label>
                <input
                  id="fue-yourname"
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="e.g. Jamie Rivera"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="fue-date"
                  className="mb-1.5 block text-sm font-semibold text-zinc-800"
                >
                  Date
                </label>
                <input
                  id="fue-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 focus-ring"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant="ghost"
                icon={Info}
                onClick={() => setHowOpen(true)}
              >
                How It Works
              </Button>
              <Button
                variant="ghost"
                icon={ShieldAlert}
                onClick={() => setDisclaimerOpen(true)}
              >
                Tool Disclaimer
              </Button>
              <Button
                variant="ghost"
                icon={BookOpen}
                className="sm:hidden"
                onClick={() => setLearnOpen(true)}
              >
                Learn More
              </Button>
            </div>
          </Card>

          {/* What this tool can / cannot do — VERBATIM from index */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card className="p-6">
              <SectionHeader>What this tool can do for you</SectionHeader>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
                <li>
                  Help you better understand how to determine the "fairness" of
                  a use under the U.S. Copyright Code.
                </li>
                <li>
                  Collect, organize &amp; archive the information you might need
                  to support a fair use evaluation.
                </li>
                <li>
                  Provide you with a time-stamped, PDF document for your records
                  [example], which could prove valuable, should you ever be
                  asked by a copyright holder to provide your fair use
                  evaluation and the data you used to support it. [why is this
                  important?]
                </li>
                <li>
                  Provide access to educational materials, external copyright
                  resources, and contact information for copyright help at local
                  &amp; national levels.
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <SectionHeader>
                What this tool cannot do for you
              </SectionHeader>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
                <li>
                  This tool does not provide legal advice. It records the
                  information you provide it as well as your own judgment on the
                  fairness of the use. See the tool [disclaimer] for more
                  information.
                </li>
                <li>
                  Only a court of law can definitively rule on whether a use is
                  fair or unfair. This tool does not assume or predict a court
                  outcome.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* ---------- Steps 1-4: the four factors ---------- */}
      {step >= 1 && step <= 4 && (
        <FactorStep
          content={FACTORS[step - 1]}
          index={step - 1}
          entry={entries[step - 1]}
          onChange={(patch) => setEntry(step - 1, patch)}
        />
      )}

      {/* ---------- Step 5: result ---------- */}
      {step === 5 && (
        <div className="space-y-6">
          <Card className="p-6 print:border-0">
            <SectionHeader>Your Fair Use Evaluation</SectionHeader>

            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <Label>Name of the use / project</Label>
                <dd className="mt-1 text-zinc-800">{useName || "—"}</dd>
              </div>
              <div>
                <Label>Prepared by</Label>
                <dd className="mt-1 text-zinc-800">{yourName || "—"}</dd>
              </div>
              <div>
                <Label>Date</Label>
                <dd className="mt-1 text-zinc-800">{date || "—"}</dd>
              </div>
            </dl>
          </Card>

          <ResultBanner tone={tone} title={toneTitle}>
            <p>
              The "Fairness" result this tool provides is only a mathematical
              average of your own evaluations for each factor. It does not mean
              your use is fair. Only a court of law can definitively rule on
              whether a use is fair or unfair. This tool does not assume or
              predict a court outcome.
            </p>
          </ResultBanner>

          {/* Per-factor summary */}
          <div className="space-y-4">
            {FACTORS.map((f, i) => {
              const e = entries[i];
              const badgeTone =
                e.lean === "favor"
                  ? "bg-emerald-100 text-emerald-800"
                  : e.lean === "against"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-zinc-100 text-zinc-700";
              return (
                <Card key={f.key} className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Badge>{`Factor ${i + 1}`}</Badge>
                      <h4 className="font-display text-base font-extrabold text-zinc-900">
                        {f.label}
                      </h4>
                    </div>
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-bold ${badgeTone}`}
                    >
                      {e.lean ? LEAN_LABEL[e.lean] : "Not rated"}
                    </span>
                  </div>
                  {e.description.trim() && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600">
                      {e.description}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>

          <Card className="border-amber-200 bg-amber-50/60 p-6 print:hidden">
            <SectionHeader>It's not quite that Simple</SectionHeader>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-amber-900/90">
              <p>
                The "Fairness" result this tool provides is only a mathematical
                average of your own evaluations for each factor. It does not
                mean your use is fair.
              </p>
              <p>
                For this reason, the makers of this tool strongly suggest that
                you do not base your final fair use judgment on the simplified
                color-coded results this tool provides. Consider these results
                only as a general indicator of fairness, which should always be
                validated by considering all factors holistically.
              </p>
            </div>
          </Card>

          <div className="flex flex-wrap gap-3 print:hidden">
            <Button icon={Printer} onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="secondary" icon={RotateCcw} onClick={reset}>
              Start Over
            </Button>
            <Button
              variant="ghost"
              icon={ShieldAlert}
              onClick={() => setDisclaimerOpen(true)}
            >
              Tool Disclaimer
            </Button>
          </div>
        </div>
      )}

      {/* ---------- Step navigation ---------- */}
      {step < 5 && (
        <div className="flex items-center justify-between print:hidden">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            icon={ArrowRight}
            disabled={!canAdvance}
            onClick={() => setStep((s) => Math.min(5, s + 1))}
          >
            {step === 4 ? "See Result" : "Next"}
          </Button>
        </div>
      )}

      {/* ---------- Modals ---------- */}
      <HowItWorksModal open={howOpen} onClose={() => setHowOpen(false)} />
      <LearnMoreModal open={learnOpen} onClose={() => setLearnOpen(false)} />
      <DisclaimerModal
        open={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Factor step
 * ------------------------------------------------------------------ */
function FactorStep({
  content,
  index,
  entry,
  onChange,
}: {
  content: FactorContent;
  index: number;
  entry: FactorEntry;
  onChange: (patch: Partial<FactorEntry>) => void;
}) {
  const leans: Lean[] = ["favor", "neutral", "against"];
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Badge>{`Factor ${index + 1}`}</Badge>
          <h3 className="font-display text-xl font-extrabold text-zinc-900">
            {content.label}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">
          {content.question}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <Label className="text-emerald-700">Favoring Fair Use</Label>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-700">
              {content.favoring.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-emerald-600">[+]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
            <Label className="text-rose-700">Opposing Fair Use</Label>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-zinc-700">
              {content.opposing.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-rose-600">[-]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <SectionHeader>Describe how your use relates to this factor</SectionHeader>
        <label htmlFor={`fue-desc-${content.key}`} className="sr-only">
          Description for {content.label}
        </label>
        <textarea
          id={`fue-desc-${content.key}`}
          value={entry.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={5}
          placeholder={`Describe how your intended use relates to the ${content.label.toLowerCase()} factor…`}
          className="mt-4 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus-ring"
        />

        <div className="mt-5">
          <Label>
            Indicate how "fair" you feel your use is for this factor
          </Label>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {leans.map((l) => (
              <Choice
                key={l}
                selected={entry.lean === l}
                onClick={() => onChange({ lean: l })}
              >
                {LEAN_LABEL[l]}
              </Choice>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * How It Works modal — VERBATIM from howitworks.php
 * ------------------------------------------------------------------ */
function HowItWorksModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="How It Works"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <ol className="space-y-4">
        <li>
          <p className="font-semibold text-zinc-900">1. Getting Started:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Provide contextual information about your intended use</li>
            <li>
              Describe how your intended use relates to each of the four fair
              use factors
            </li>
            <li>
              Indicate how "fair" you feel your use is for each of the factors
              (based on the description &amp; criteria you have provided)
            </li>
          </ul>
        </li>
        <li>
          <p className="font-semibold text-zinc-900">
            2. The Fair Use Evaluator:
          </p>
          <p className="mt-1">
            Saves your entries and issue a color coded "fairness" result,
            showing the average for the evaluations you provided.
          </p>
        </li>
        <li>
          <p className="font-semibold text-zinc-900">
            3. Provide Additional Information: [Optional]
          </p>
          <p className="mt-1">
            Add any other mitigating circumstances or information that you feel
            is important (or, if you determine your use is not fair, exit the
            tool)
          </p>
        </li>
        <li>
          <p className="font-semibold text-zinc-900">
            4. Get a Hard or Electronic Copy:
          </p>
          <p className="mt-1">
            The Fair Use Evaluator will collate and publish a time-stamped PDF
            of your "Fair Use Evaluation" (using the information you've
            provided).
          </p>
        </li>
        <li>
          <p className="font-semibold text-zinc-900">
            5. How to Use your Analysis:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              Share your analysis with colleagues, a librarian, or a copyright
              specialist for comment or to validate your results.
            </li>
            <li>Keep a copy for your files.</li>
          </ul>
        </li>
      </ol>
    </Modal>
  );
}

/* ------------------------------------------------------------------ *
 * Learn More modal — VERBATIM educational content
 * ------------------------------------------------------------------ */
function LearnMoreModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Learn More about Fair Use"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="space-y-7">
        {/* What is Fair Use? */}
        <section>
          <h4 className="font-display text-base font-extrabold text-zinc-900">
            What is Fair Use?
          </h4>
          <p className="mt-2 font-semibold text-zinc-800">The Law:</p>
          <p className="mt-1">
            Fair use (Section 107 of the U.S. Copyright code) provides
            parameters for the legal use of copyrighted material without the
            permission of the copyright holder.
          </p>
          <p className="mt-2">
            The law mandates that four factors be considered in determining
            whether or not a use is fair. These are:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              The purpose and character of the use, including whether the use is
              of a commercial nature or is for nonprofit educational purposes;
            </li>
            <li>The nature of the copyrighted work;</li>
            <li>
              The amount and substantiality of the portion used in relation to
              the work as a whole; and
            </li>
            <li>
              The effect of the use upon the potential market for or value of
              the copyrighted work.
            </li>
          </ul>
          <p className="mt-3 font-semibold text-zinc-800">The Low Down:</p>
          <p className="mt-1">
            Broadly speaking, a "fair use" is one where the socially beneficial
            results of the use outweigh the exclusive rights of the copyright
            holder.
          </p>
          <p className="mt-2">
            However, the distinction between "fair use" and infringement may be
            unclear and is not always easily defined. For example: an
            educational purpose does not necessarily make a use fair, nor does
            using a portion of a copyrighted work for commercial purposes
            necessarily make it unfair.
          </p>
          <p className="mt-2">
            Only a court can ultimately determine if a use is fair and this can
            only happen if a case is litigated. Nonetheless, the copyright code,
            legal precedents &amp; fair use educational materials can provide us
            considerable guidance in making fair use evaluations and/or avoiding
            litigation.
          </p>
        </section>

        {/* Why is this Important? */}
        <section>
          <h4 className="font-display text-base font-extrabold text-zinc-900">
            Why is this Important?
          </h4>
          <p className="mt-2">
            When we act in good faith, reasonably believing that our actions are
            fair use, in the unlikely event we are actually sued over a use, we
            may not have to pay statutory damages, even if a court finds that we
            were wrong.
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              Librarians, archivists &amp; educators, acting within the scope of
              their employment, are provided special protections, and cannot be
              sued for statutory damages if they had reasonable grounds for
              believing their use was fair [section 504(c)(2)]
            </li>
            <li>
              In other cases, if the court finds that an infringer was not aware
              and had no reason to believe that his or her acts constituted an
              infringement of copyright, it may reduce the award of statutory
              damages to as little as $200
            </li>
          </ul>
          <p className="mt-2">
            When we do not act in good faith, or we are unable to show evidence
            that we acted in good faith, we run the risk of being liable for
            statutory damages:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              Statutory damages for infringements on a single work range from
              $750 to more than $30,000 as the court considers just
            </li>
            <li>
              If the court finds that infringement was committed willfully, it
              may increase the award of statutory damages to as much as $150,000
            </li>
          </ul>
        </section>

        {/* It's not quite that Simple */}
        <section>
          <h4 className="font-display text-base font-extrabold text-zinc-900">
            It's not quite that Simple
          </h4>
          <p className="mt-2">
            The "Fairness" result this tool provides is only a mathematical
            average of your own evaluations for each factor. It does not mean
            your use is fair.
          </p>
          <p className="mt-2">
            Fair use scholars have long noted that "the four factors fail to
            drive the analysis" in the courts' decisions. Rather, they "serve as
            convenient pegs on which to hang antecedent conclusions"*
          </p>
          <p className="mt-2">
            Analyses of court cases suggests that the factors are not always
            given equal billing, with Purpose, Amount and Effect often given
            more weight than Nature
          </p>
          <p className="mt-2">
            Most copyright scholars support the practice of considering the 4
            factors holistically, rather than in isolation and in equal measure
            (as this tool does for its color-coded results)
          </p>
          <p className="mt-2">
            For this reason, the makers of this tool strongly suggest that you
            do not base your final fair use judgment on the simplified
            color-coded results this tool provides
          </p>
          <p className="mt-2">
            The color-coded results simply represent the mathematical average of
            your own evaluations for each factor
          </p>
          <p className="mt-2">
            Consider these results only as a general indicator of fairness,
            which should always be validated by considering all factors
            holistically
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            *See: Nimmer, David. "Fairest of them all" and other Fairy Tales of
            Fair Use." Law and Contemporary Problems 66(263) (2003): 263-287.
          </p>
        </section>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ *
 * Disclaimer modal — VERBATIM from disclaimer.php
 * ------------------------------------------------------------------ */
function DisclaimerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tool Disclaimer"
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="space-y-3">
        <p>
          THIS TOOL IS: Intended as a first step in helping librarians,
          educators &amp; others better understand how to make fair use
          determinations.
        </p>
        <p>THIS TOOL IS NOT: A source of legal advice or assistance.</p>
        <p>
          Results are only as good as the input provided by the user and are
          intended to suggest next steps, and not to provide a final judgment on
          the fairness of any particular use.
        </p>
        <p>
          The American Library Association, the ALA Office for Information
          Technology Policy, and Michael Brewer are not providing legal advice
          in the use of this tool.
        </p>
        <p>
          Since every fair use claim depends on the specific context of the
          intended use, you should contact your institution's copyright
          specialist or legal advisor with any questions you may have.
        </p>
        <p className="pt-2 text-xs text-zinc-500">
          Local Copyright Information © 2008 Michael Brewer &amp; ALA Office for
          Information Technology Policy
        </p>
      </div>
    </Modal>
  );
}

import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  GraduationCap,
  Info,
  Lightbulb,
  ArrowLeft,
  RotateCcw,
  Printer,
  CheckCircle2,
  XCircle,
  ExternalLink,
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
  Modal,
} from "../components/ui";

/* ------------------------------------------------------------------ *
 * Exceptions for Instructors eTool
 * Library Futures "Clause Bank" rebuild of the Copyright Advisory
 * Network "Exceptions for Instructors" decision tree (educational use
 * exemptions under Section 110(1) face-to-face teaching and the TEACH
 * Act, Section 110(2)). All question prompts, note/example popups and
 * outcome text are reproduced VERBATIM from the original tool.
 * ------------------------------------------------------------------ */

/* ------------------------------ Notes ----------------------------- */
/* Verbatim popup text keyed by the original shownote.php?n=<id>.      */

interface PopNote {
  /** Original shownote id (shownote.php?n=<id>). */
  id: string;
  /** Trigger label as shown inline in the original: [note] / [example] / [examples]. */
  kind: "note" | "example" | "examples";
  /** Verbatim popup body (may contain light inline markup as ReactNode). */
  body: ReactNode;
}

const NOTES: Record<string, ReactNode> = {
  legalcopynote: (
    <p>
      A legal copy is one that was legally obtained (purchased from a reputable
      vendor, checked out from a library, etc.). A duplicate copy (made from a
      colleague's copy, downloaded off the internet, taped from television or
      radio, etc.) would generally not be a legal copy. If you are unsure of
      whether or not your copy is legal or was legally obtained, you should
      check with a librarian or a copyright specialist.
    </p>
  ),
  facetofacenote: (
    <p>
      This exemption covers what is normally an exclusive right of the copyright
      holder - the right to display or perform a copyrighted work. Examples of
      this might be displaying copyrighted photographs, images or text in a
      PowerPoint presentation; screening an entire film or clips from it;
      playing or performing a musical, dramatic or choreographed work, etc.
    </p>
  ),
  onlineinstructionexamples: (
    <p>
      Examples of "displaying" could include posting copyrighted photographs,
      images or a limited amount of text (e.g. text on a PowerPoint
      presentation) on a secure course webpage. Examples of "performing" could
      include providing access to streaming video or audio through a secure
      course management system. Note: Posting copyrighted articles, book
      chapters, or other lengthy excerpts of text in a CMS would not be covered
      by the TEACH Act [Section 110(2)], but would likely be covered by Fair Use
      [Section 107]. For more information, see the Fair Use Evaluator.
    </p>
  ),
  onlineinstructionnote1: (
    <>
      <p>
        "Mediated" here means that the course has an instructor involved in
        directing it. However, [TEACH] "is not intended to require either
        constant, real-time supervision by the instructor or pre-approval by the
        instructor for the performance and display. Asynchronous learning, at
        the pace of the student, is a significant and beneficial characteristic
        of digital distance education and the concept of control and supervision
        is not intended to limit the qualification of such asynchronous
        activities for this exemption " (Senate Report (107th Congress 31).
      </p>
      <p className="mt-3">
        The course may be entirely online, or may be a traditional course that
        has some instructional activities that take place virtually. While this
        is not specifically noted in the law one way or another, it is
        specifically mentioned in the Senate Report (107th Congress 31) in the
        purpose statement "For our nation to maintain its competitive edge, it
        will need to extend education beyond children and young adults to
        lifelong learning for working adults, and to reach all students of all
        income levels, in cities and rural settings, in schools and on campuses,
        in the workplace, at home and at times selected by students to meet
        their needs. Distance digital education helps make this possible,
        whether in the traditional sense, when instructor and student are
        separated in place and perhaps in time,{" "}
        <span className="underline">
          or in new hybrids of traditional classroom education combined with
          online components
        </span>
        ."
      </p>
    </>
  ),
  onlineinstructionnote2: (
    <p>
      The display or performance of the work may take place virtually at the
      same time for all students and the instructor (synchronous), or may take
      place at different times (asynchronous). While this is not specifically
      noted in the law one way or another, it is specifically mentioned in the
      Senate Report (107th Congress 31) in the purpose statement "For our nation
      to maintain its competitive edge, it will need to extend education beyond
      children and young adults to lifelong learning for working adults, and to
      reach all students of all income levels, in cities and rural settings, in
      schools and on campuses, in the workplace, at home and{" "}
      <span className="underline">
        at times selected by students to meet their needs
      </span>
      . Distance digital education helps make this possible, whether in the
      traditional sense, when instructor and student are separated in place{" "}
      <span className="underline">and perhaps in time</span>, or in new hybrids
      of traditional classroom education combined with online components."
    </p>
  ),
  allowedusersnote: (
    <p>
      Access to the online display or performance of any materials under this
      section must end when the course ends.
    </p>
  ),
  primarilyinstructionalexample: (
    <p>
      An example might be online materials (podcasts, assignments, video clips)
      produced specifically for courses designed for professionals (medical
      professionals, lawyers, etc.) who are required to complete a certain
      amount of continuous learning or professional development to remain
      certified.
    </p>
  ),
  selectedbyinstructorexamples: (
    <p>
      For example, the instructor could direct a teaching assistant (e.g. as
      part of an online discussion) or student (e.g. as part of an assignment)
      to post content that would be covered by this exception. An example that
      would not be covered might be students using the course management system
      to share music files, photographs, or other copyrighted material that were
      not directly related to course assignments.
    </p>
  ),
  learninggoalsexample: (
    <p>
      For example, does it directly support an identified learning outcome or is
      it required for the completion of an assignment or other activity on the
      course syllabus?
    </p>
  ),
  comparableamountexamples: (
    <p>
      Examples of this might include displaying copyrighted photographs, images
      or a limited amount text (e.g. text on a PowerPoint presentation) on a
      secure course webpage or course management system.
    </p>
  ),
  comparableamountexample: (
    <p>
      For example, posting entire articles, book chapters, or lengthy excerpts
      of text on a secure course webpage or CMS would not be allowed under this
      exception, since that would not be something typically displayed (shown on
      a screen) in the course of a live classroom session. However, posting
      individual articles or book chapters would likely be covered by Fair Use
      [Section 107]. For more information, see the Fair Use Evaluator.
    </p>
  ),
  reasonableandlimitedexamples1: (
    <p>
      Neither "dramatic" nor "nondramatic" are defined in the law. Generally, in
      dramatic literary works the narrative is told through dialogue and action
      (i.e. theatrical performances]. Thus, the performance of a nondramatic
      literary work would include things like recorded recitations from novels,
      textbooks, poetry, etc.
    </p>
  ),
  reasonableandlimitednote: (
    <p>
      The Senate Report states that "what constitutes a 'reasonable and limited'
      portion should take into account both the nature of the market for that
      type of work and the pedagogical purposes of the performance." As such,
      the amount used should <strong>not</strong> exceed that which is required
      to provide for the educational objectives set forth by the instructor. It
      should also not exceed what would normally be performed during an in-class
      session.
    </p>
  ),
  reasonableandlimitedexamples2: (
    <p>
      "Other works" would include any audiovisual works (film, video, etc.), or
      performances of dramatic literary or musical works (plays, operas, etc.).
      Only "reasonable and limited portions" of these categories of works are
      allowed under this exemption.
    </p>
  ),
  digitalvideonote: (
    <p>
      An example of this would be CSS [Content Scramble System] anti-piracy
      protections (like Macrovision, etc.) It is illegal to circumvent such
      systems, except for under very limited circumstances laid out by the
      Librarian of Congress in 2000, and reviewed every 3 years. None of the
      current rules (as of early 2009) are applicable under TEACH. See:
      http://www.copyright.gov/1201/
    </p>
  ),
  institutionalmeasuresexample: (
    <p>
      An example of this would be ensuring that video or audio clips cannot be
      retained or disseminated (by using video/audio streaming or other
      technologies).
    </p>
  ),
  institutionalmeasuresnote: (
    <p>
      It is illegal to circumvent anti-piracy controls, even if your use would
      otherwise meet all the requirements of this exception. An example might be
      circumventing CSS [content scramble system] anti-piracy protections on a
      DVD in order to make video clips to stream to your class. In such cases,
      however, if an analog version (e.g. VHS) of the given title is available,
      that copy may be digitized and used under TEACH.
    </p>
  ),
  indexdisclaimer: (
    <p>
      <strong>THIS TOOL IS:</strong>
      <br />
      <em>
        Intended as a source of information for educators &amp; others to better
        understand the educational exemptions available in the U.S. Copyright
        Code.
      </em>
      <br />
      <br />
      <strong>THIS TOOL IS NOT:</strong>
      <br />
      <em>A source of legal advice.</em> Results are only as good as the input
      provided by the user and are intended to suggest next steps, and not to
      provide a final judgment. Neither the American Library Association, the ALA
      Office for Information Technology Policy nor Michael Brewer are engaged in
      providing legal, copyright or other professional advice.
    </p>
  ),
};

/* ------------------------- Decision tree -------------------------- */

type NodeId =
  | "legalcopy"
  | "facetoface"
  | "onlineinstruction"
  | "allowedusers"
  | "primarilyinstructional"
  | "selectedbyinstructor"
  | "learninggoals"
  | "comparableamount"
  | "reasonableandlimited"
  | "digitalvideo"
  | "institutionalmeasures"
  // terminal: exempt
  | "yesfacetoface"
  | "exempt"
  // terminal: not exempt / fails a criterion
  | "nolegalcopy"
  | "noonlineinstruction"
  | "noallowedusers"
  | "notprimarilyinstructional"
  | "notselectedbyinstructor"
  | "notlearninggoals"
  | "notcomparableamount"
  | "notreasonableandlimited"
  | "nodigitalvideo"
  | "noinstitutionalmeasures";

interface Option {
  /** Button label (verbatim from the original answerOptions). */
  label: string;
  /** Node to transition to when chosen. */
  next: NodeId;
}

interface QuestionNode {
  kind: "question";
  /** The verbatim question prompt as a ReactNode (inline note triggers are rendered separately). */
  prompt: ReactNode;
  /** Note/example popups associated with this step (shownote.php?n=*). */
  notes: PopNote[];
  /** The answer options. */
  options: Option[];
}

type ResultTone = "positive" | "negative";

interface ResultNode {
  kind: "result";
  tone: ResultTone;
  /** ResultBanner title (verbatim). */
  title: ReactNode;
  /** Additional verbatim body paragraphs. */
  body?: ReactNode;
}

type TreeNode = QuestionNode | ResultNode;

const START: NodeId = "legalcopy";

/** Ordered list of question nodes, used for the step counter / progress. */
const QUESTION_ORDER: NodeId[] = [
  "legalcopy",
  "facetoface",
  "onlineinstruction",
  "allowedusers",
  "primarilyinstructional",
  "selectedbyinstructor",
  "learninggoals",
  "comparableamount",
  "reasonableandlimited",
  "digitalvideo",
  "institutionalmeasures",
];

const COPYRIGHT_GOV = "http://www.copyright.gov/title17/92chap1.html#110";

const TREE: Record<NodeId, TreeNode> = {
  /* -------------------------- Questions -------------------------- */
  legalcopy: {
    kind: "question",
    prompt: <>Is the copy to be used a legal copy?</>,
    notes: [{ id: "legalcopynote", kind: "note", body: NOTES.legalcopynote }],
    options: [
      { label: "Yes", next: "facetoface" },
      { label: "No", next: "nolegalcopy" },
    ],
  },
  facetoface: {
    kind: "question",
    prompt: (
      <>
        Will the copyrighted work be used in the course of <em>face-to-face</em>{" "}
        teaching activities of a non-profit institution in a classroom or
        similar place devoted to instruction?
      </>
    ),
    notes: [
      { id: "facetofacenote", kind: "note", body: NOTES.facetofacenote },
    ],
    options: [
      { label: "Yes", next: "yesfacetoface" },
      { label: "No", next: "onlineinstruction" },
    ],
  },
  onlineinstruction: {
    kind: "question",
    prompt: (
      <>
        Will the copyrighted work be displayed or performed as part of mediated
        online instructional activities of a governmental body or an accredited
        nonprofit educational institution?
      </>
    ),
    notes: [
      {
        id: "onlineinstructionexamples",
        kind: "examples",
        body: NOTES.onlineinstructionexamples,
      },
      {
        id: "onlineinstructionnote1",
        kind: "note",
        body: NOTES.onlineinstructionnote1,
      },
      {
        id: "onlineinstructionnote2",
        kind: "note",
        body: NOTES.onlineinstructionnote2,
      },
    ],
    options: [
      { label: "Yes", next: "allowedusers" },
      { label: "No", next: "noonlineinstruction" },
    ],
  },
  allowedusers: {
    kind: "question",
    prompt: (
      <>
        Is online access to the display or performance restricted to students
        officially registered in the course or to employees of governmental
        bodies as a part of their official duties or employment?
      </>
    ),
    notes: [
      { id: "allowedusersnote", kind: "note", body: NOTES.allowedusersnote },
    ],
    options: [
      { label: "Yes", next: "primarilyinstructional" },
      { label: "No", next: "noallowedusers" },
    ],
  },
  primarilyinstructional: {
    kind: "question",
    prompt: (
      <>
        Was the work you'd like to use produced or marketed primarily for
        performance or display as part of mediated online instructional
        activities?
      </>
    ),
    notes: [
      {
        id: "primarilyinstructionalexample",
        kind: "example",
        body: NOTES.primarilyinstructionalexample,
      },
    ],
    options: [
      { label: "Yes", next: "notprimarilyinstructional" },
      { label: "No", next: "selectedbyinstructor" },
    ],
  },
  selectedbyinstructor: {
    kind: "question",
    prompt: (
      <>
        Has the content under consideration for use been selected by the
        instructor or at his/her direction?
      </>
    ),
    notes: [
      {
        id: "selectedbyinstructorexamples",
        kind: "examples",
        body: NOTES.selectedbyinstructorexamples,
      },
    ],
    options: [
      { label: "Yes", next: "learninggoals" },
      { label: "No", next: "notselectedbyinstructor" },
    ],
  },
  learninggoals: {
    kind: "question",
    prompt: (
      <>
        Is the content under consideration for use directly related to the
        learning goals of the course?
      </>
    ),
    notes: [
      {
        id: "learninggoalsexample",
        kind: "example",
        body: NOTES.learninggoalsexample,
      },
    ],
    options: [
      { label: "Yes", next: "comparableamount" },
      { label: "No", next: "notlearninggoals" },
    ],
  },
  comparableamount: {
    kind: "question",
    prompt: (
      <>
        Is the display of the work[s] under consideration for use in an amount
        comparable to that which is typically displayed in the course of a live
        classroom session?
      </>
    ),
    notes: [
      {
        id: "comparableamountexamples",
        kind: "examples",
        body: NOTES.comparableamountexamples,
      },
      {
        id: "comparableamountexample",
        kind: "example",
        body: NOTES.comparableamountexample,
      },
    ],
    options: [
      { label: "Yes", next: "reasonableandlimited" },
      { label: "No", next: "notcomparableamount" },
    ],
  },
  reasonableandlimited: {
    kind: "question",
    prompt: (
      <>
        Is the performance (in part or in full) one of a non-dramatic literary
        or musical work or of reasonable and limited portions of any other work?
      </>
    ),
    notes: [
      {
        id: "reasonableandlimitedexamples1",
        kind: "examples",
        body: NOTES.reasonableandlimitedexamples1,
      },
      {
        id: "reasonableandlimitednote",
        kind: "note",
        body: NOTES.reasonableandlimitednote,
      },
      {
        id: "reasonableandlimitedexamples2",
        kind: "examples",
        body: NOTES.reasonableandlimitedexamples2,
      },
    ],
    options: [
      { label: "Yes", next: "digitalvideo" },
      { label: "No", next: "notreasonableandlimited" },
    ],
  },
  digitalvideo: {
    kind: "question",
    prompt: (
      <>
        <p>
          If you are planning on streaming audio or video content, and the copy
          from which you are preparing the digital file is an analog copy? (VHS,
          16mm, LP, etc.), one of the following two statements must be true:
        </p>
        <ul className="mt-3 space-y-2 pl-1">
          <li className="flex gap-2">
            <span aria-hidden className="text-zinc-400">
              &bull;
            </span>
            <span>
              A digital version of the work is unavailable for purchase in an
              unused copy
            </span>
          </li>
          <li className="font-bold italic text-zinc-900">OR</li>
          <li className="flex gap-2">
            <span aria-hidden className="text-zinc-400">
              &bull;
            </span>
            <span>
              The digital version that is available is subject to technological
              measures that are designed to prevent it from being copied
            </span>
          </li>
        </ul>
      </>
    ),
    notes: [
      { id: "digitalvideonote", kind: "note", body: NOTES.digitalvideonote },
    ],
    options: [
      { label: "I am not using an analog copy", next: "institutionalmeasures" },
      { label: "One of these statements is true", next: "institutionalmeasures" },
      { label: "Neither statement is true", next: "nodigitalvideo" },
    ],
  },
  institutionalmeasures: {
    kind: "question",
    prompt: (
      <ol className="list-decimal space-y-3 pl-5">
        <li>
          Does your institution have copyright policies and provide information
          about copyright? Do they also give notice that the materials used may
          be protected by copyright?
        </li>
        <li>
          Does your institution apply technological security measures that
          reasonably prevent recipients from retaining copyrighted works beyond
          the class session and further distributing them?
        </li>
        <li>
          Does your institution safeguard technological protection measures
          taken by rights holders to prevent unlawful copying and distribution
          (i.e. digital rights management)?
        </li>
      </ol>
    ),
    notes: [
      {
        id: "institutionalmeasuresexample",
        kind: "example",
        body: NOTES.institutionalmeasuresexample,
      },
      {
        id: "institutionalmeasuresnote",
        kind: "note",
        body: NOTES.institutionalmeasuresnote,
      },
    ],
    options: [
      { label: "Yes to all", next: "exempt" },
      { label: "No", next: "noinstitutionalmeasures" },
    ],
  },

  /* ------------------------ Exempt results ----------------------- */
  yesfacetoface: {
    kind: "result",
    tone: "positive",
    title: (
      <>
        Your use meets the requirements of Section 110 of the U.S. Copyright
        Code, exempting it from requiring the permission of the copyright
        holder.
      </>
    ),
    body: (
      <p>
        For the full text of the law, visit the{" "}
        <a
          href={COPYRIGHT_GOV}
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline underline-offset-2"
        >
          U.S. Copyright Office website
        </a>
        .
      </p>
    ),
  },
  exempt: {
    kind: "result",
    tone: "positive",
    title: (
      <>
        Your use meets the requirements of Section 110(2) of the U.S. Copyright
        Code (also known as the TEACH Act), exempting it from requiring the
        permission of the copyright holder.
      </>
    ),
    body: (
      <p>
        For the full text of the law, visit the{" "}
        <a
          href={COPYRIGHT_GOV}
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline underline-offset-2"
        >
          U.S. Copyright Office website
        </a>
        .
      </p>
    ),
  },

  /* ----------------- Not exempt / fails a criterion -------------- */
  nolegalcopy: {
    kind: "result",
    tone: "negative",
    title: <>Your use is not covered by this exemption.</>,
    body: (
      <p>
        This exemption is only valid if the copy used is a <em>legal copy</em>.
        Unless your copy was legally obtained, your use is not covered by this
        exception.
      </p>
    ),
  },
  noonlineinstruction: {
    kind: "result",
    tone: "negative",
    title: <>Your use is not covered by this exemption.</>,
    body: (
      <>
        <p>
          However, your use may still be covered by Fair Use (Section 107). For
          more information on Fair Use, visit one or more of the resources
          listed below:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <a
              href="http://www.copyright.gov/circs/circ21.pdf"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              US Copyright Office Circular 21
            </a>
          </li>
          <li>Copyright Advisory Network</li>
          <li>
            <a
              href="http://www.librarycopyright.net/evaluator/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Fair Use Evaluator
            </a>
          </li>
          <li>
            <a
              href="http://fairuse.stanford.edu/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Copyright &amp; Fair Use
            </a>{" "}
            (Stanford University)
          </li>
          <li>Local Link</li>
        </ul>
      </>
    ),
  },
  noallowedusers: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code, exempting it from requiring the permission of the
        copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          Online access to the display or performance of copyrighted material
          must be restricted to students officially registered in the course or
          to employees of governmental bodies as a part of their official duties
          or employment.
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  notprimarilyinstructional: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code, exempting it from requiring the permission of the
        copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          The markets for works specifically produced for use in mediated online
          instruction are protected by this exemption. The use of these works
          would require the permission of the copyright holder.
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  notselectedbyinstructor: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code (also known as the TEACH Act), exempting it from
        requiring the permission of the copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          All content covered by this exemption must be selected and posted by,
          or at the direction of the instructor.
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  notlearninggoals: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code (also known as the TEACH Act), exempting it from
        requiring the permission of the copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          Any content displayed or performed must be directly related to the
          learning goals of the course.
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  notcomparableamount: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code (also known as the TEACH Act), exempting it from
        requiring the permission of the copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          No more content may be displayed using this exemption than would
          normally be displayed in a classroom session.
        </p>
        <p className="mt-2">
          However, even though your use is not covered by this exemption, it
          could be covered by Fair Use (Section 107).
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  notreasonableandlimited: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code (also known as the TEACH Act), exempting it from
        requiring the permission of the copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          This exemption only allows for the performances of "reasonable and
          limited portions" of other works.
        </p>
        <p className="mt-2">
          However, even though your use is not covered by this exemption, it
          could be covered by Fair Use (Section 107).
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  nodigitalvideo: {
    kind: "result",
    tone: "negative",
    title: <>Your use is not covered by this exemption.</>,
    body: (
      <>
        <p>
          As noted before, analog to digital conversions are allowed only under
          specific circumstances. Specifically, only if either 1) A digital
          version of the work is <span className="underline">unavailable</span>{" "}
          for purchase in an unused copy; <strong className="italic">or</strong>{" "}
          2) The digital version that is available is subject to technological
          measures that are designed to prevent it from being copied.
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
  noinstitutionalmeasures: {
    kind: "result",
    tone: "negative",
    title: (
      <>
        Your use does not meet the requirements of Section 110(2) of the U.S.
        Copyright Code (also known as the TEACH Act), exempting it from
        requiring the permission of the copyright holder.
      </>
    ),
    body: (
      <>
        <p>
          Your institution must address every one of the criteria listed in the
          previous slide.
        </p>
        <p className="mt-2">
          For the full text of the law, visit the{" "}
          <a
            href={COPYRIGHT_GOV}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            U.S. Copyright Office website
          </a>
          .
        </p>
      </>
    ),
  },
};

/* ----------------------------- Helpers ---------------------------- */

const KIND_META: Record<
  PopNote["kind"],
  { label: string; icon: ComponentType<{ className?: string }> }
> = {
  note: { label: "Note", icon: Info },
  example: { label: "Example", icon: Lightbulb },
  examples: { label: "Examples", icon: Lightbulb },
};

/* ----------------------------- Component -------------------------- */

export default function InstructorsETool() {
  const [history, setHistory] = useState<NodeId[]>([START]);
  const [activeNote, setActiveNote] = useState<PopNote | null>(null);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const current = history[history.length - 1];
  const node = TREE[current];

  /** Index of the current node in the question sequence (for progress). */
  const questionIndex = useMemo(() => {
    // Count answered questions in the path (everything before the current node
    // that is a question), capped to the number of questions.
    const answered = history.filter(
      (id): id is NodeId => TREE[id].kind === "question" && id !== current
    ).length;
    return answered;
  }, [history, current]);

  const totalQuestions = QUESTION_ORDER.length;
  const isResult = node.kind === "result";

  const stepNumber = Math.min(questionIndex + 1, totalQuestions);
  const percent = isResult
    ? 100
    : Math.round((questionIndex / totalQuestions) * 100);

  function choose(next: NodeId) {
    setHistory((h) => [...h, next]);
  }
  function back() {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  }
  function restart() {
    setHistory([START]);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 print:max-w-none">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#9a1866] text-white">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div>
            <Label>Educational Exemptions eTool</Label>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-zinc-900">
              Exceptions for Instructors eTool
            </h2>
          </div>
        </div>

        <Card className="p-5">
          <p className="text-sm leading-relaxed text-zinc-700">
            The U.S. Copyright Code provides for the educational use of
            copyrighted material without the permission of the copyright holder
            under certain conditions. To find out if your intended use meets the
            requirements set out in the law, use this free, online tool.{" "}
            <button
              type="button"
              onClick={() => setDisclaimerOpen(true)}
              className="font-semibold text-[#9a1866] underline underline-offset-2 hover:text-[#7d1453]"
            >
              [disclaimer]
            </button>
          </p>
        </Card>
      </header>

      {/* Progress */}
      <div className="space-y-2 print:hidden">
        <div className="flex items-center justify-between">
          <Label>
            {isResult ? "Result" : `Step ${stepNumber} of ${totalQuestions}`}
          </Label>
          <span className="text-xs font-semibold text-zinc-400">
            {percent}%
          </span>
        </div>
        <ProgressBar percent={percent} />
      </div>

      {/* Body */}
      {node.kind === "question" ? (
        <Card className="space-y-6 p-6">
          <SectionHeader count={`${stepNumber}/${totalQuestions}`}>
            Question
          </SectionHeader>

          <div className="text-base leading-relaxed text-zinc-800">
            {node.prompt}
          </div>

          {node.notes.length > 0 && (
            <div className="flex flex-wrap gap-2.5 print:hidden">
              {node.notes.map((n) => {
                const meta = KIND_META[n.kind];
                return (
                  <Button
                    key={n.id}
                    variant="secondary"
                    icon={meta.icon}
                    onClick={() => setActiveNote(n)}
                    className="px-4 py-2 text-xs"
                  >
                    {meta.label}
                  </Button>
                );
              })}
            </div>
          )}

          <div className="space-y-3">
            {node.options.map((opt) => (
              <Choice key={opt.label} onClick={() => choose(opt.next)}>
                {opt.label}
              </Choice>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="space-y-5 p-6">
          <SectionHeader>
            {node.tone === "positive" ? "Exempt" : "Not Exempt"}
          </SectionHeader>

          <div className="flex items-center gap-3">
            <Badge>
              {node.tone === "positive" ? (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Exempt
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5" /> Requires Permission
                </span>
              )}
            </Badge>
          </div>

          <ResultBanner
            tone={node.tone === "positive" ? "positive" : "negative"}
            title={node.title}
          >
            {node.body}
          </ResultBanner>
        </Card>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={back}
          disabled={history.length <= 1}
        >
          Back
        </Button>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
          <Button variant="primary" icon={RotateCcw} onClick={restart}>
            Start Over
          </Button>
        </div>
      </div>

      {/* Note / Example modal */}
      <Modal
        open={activeNote !== null}
        onClose={() => setActiveNote(null)}
        title={
          activeNote ? (
            <span className="inline-flex items-center gap-2">
              {(() => {
                const Icon = KIND_META[activeNote.kind].icon;
                return <Icon className="h-4 w-4 text-[#9a1866]" />;
              })()}
              {KIND_META[activeNote.kind].label}
            </span>
          ) : (
            ""
          )
        }
        footer={
          <Button variant="primary" onClick={() => setActiveNote(null)}>
            Close
          </Button>
        }
      >
        {activeNote?.body}
      </Modal>

      {/* Disclaimer modal */}
      <Modal
        open={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
        title={
          <span className="inline-flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-[#9a1866]" />
            Disclaimer
          </span>
        }
        footer={
          <Button variant="primary" onClick={() => setDisclaimerOpen(false)}>
            Close
          </Button>
        }
      >
        {NOTES.indexdisclaimer}
      </Modal>
    </div>
  );
}

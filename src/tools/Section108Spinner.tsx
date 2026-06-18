import { useState, type ComponentType } from "react";
import {
  BookOpen,
  Archive,
  RefreshCw,
  FileText,
  Files,
  CheckCircle2,
  Info,
  Printer,
  ShieldAlert,
  Disc3,
  RotateCw,
} from "lucide-react";
import {
  Card,
  SectionHeader,
  Label,
  Badge,
  Button,
  ResultBanner,
  Modal,
} from "../components/ui";

/* ------------------------------------------------------------------ *
 * Section 108 Spinner
 * Library Futures "Clause Bank" rebuild of the Copyright Advisory
 * Network Section 108 wheel chart. All legal / rule text below is
 * reproduced VERBATIM from the original tool.
 * ------------------------------------------------------------------ */

type SegmentId =
  | "last20"
  | "preservation"
  | "replacement"
  | "portions"
  | "entire-works";

interface Note {
  marker: "*" | "**";
  text: string;
}

interface Segment {
  id: SegmentId;
  /** Short selector label (matches the original details heading). */
  title: string;
  icon: ComponentType<{ className?: string }>;
  /** The main rule statement ("Libraries or archives may…"). */
  rule: string;
  /** The primary "if" condition. */
  condition: string;
  otherCriteria: string[];
  notes: Note[];
  otherInformation: string;
}

const OTHER_INFO_LONG =
  "If your intended reproduction is not covered by Section 108, it could still be covered by fair use [Section 107]. Visit the Copyright Advisory Network at http://www.librarycopyright.net or consult your local copyright specialist for more information.";

const SEGMENTS: Segment[] = [
  {
    id: "last20",
    title: "Last 20 Years",
    icon: BookOpen,
    rule:
      "For preservation, scholarship or research, libraries or archives may reproduce, distribute, display or perform published works in their last 20 years* of copyright (and any pre-1972 sound recording) if:",
    condition:
      "The work is not subject to commercial exploitation and cannot be obtained at a fair price**",
    otherCriteria: [
      "The cop[ies] are not made for direct or indirect commercial advantage",
      "A copyright notice is included on the cop[ies]",
      "The library or archives is open to the public or to unaffiliated specialized researchers",
      "Section 108(h) allows libraries and archives to reproduce, distribute and publicly perform and display published works that are not subject to commercial exploitation and that cannot be obtained at a reasonable price for purposes of preservation, scholarship or research. The Music Modernization Act of 2018 expanded that exception to include all published and unpublished sound recordings fixed prior to February 15, 1972.",
    ],
    notes: [
      {
        marker: "*",
        text:
          "Use our Public Domain Tool. To determine whether or not a work is in its last 20 years of copyright protection.",
      },
      {
        marker: "**",
        text:
          'Should the work become subject to commercial exploitation, or be available at a fair price, this exemption is no longer valid. "Fair price" is not defined in the law.',
      },
    ],
    otherInformation:
      "If your intended reproduction is not covered by Section 108, it could still be covered by fair use [Section 107]. Visit the Copyright Advisory Network at http://www.librarycopyright.net or consult your local copyright specialist for more information.",
  },
  {
    id: "preservation",
    title: "Preservation",
    icon: Archive,
    rule:
      "Libraries or archives may make up to 3 copies of unpublished works for preservation or security purposes if:",
    condition:
      "The library or archives already has a copy of the work to be preserved in their collection.",
    otherCriteria: [
      "Digital cop[ies] are not made available to the public outside the library",
      "The cop[ies] are not made for direct or indirect commercial advantage",
      "A copyright notice is included on the cop[ies]",
      "The library or archives is open to the public or to unaffiliated specialized researchers",
    ],
    notes: [],
    otherInformation: OTHER_INFO_LONG,
  },
  {
    id: "replacement",
    title: "Replacement",
    icon: RefreshCw,
    rule:
      "Libraries or archives may make up to 3 copies of damaged, detriorating, lost, or stolen works, or works in obsolete formats* if:",
    condition:
      "An unused replacement copy cannot be obtained at a fair price.**",
    otherCriteria: [
      "Digital cop[ies] are not made available to the public outside the library",
      "The cop[ies] are not made for direct or indirect commercial advantage",
      "A copyright notice is included on the cop[ies]",
      "The library or archives is open to the public or to unaffiliated specialized researchers",
    ],
    notes: [
      {
        marker: "*",
        text:
          "A format is considered obsolete if the device necessary to render it perceptible is no longer manufactured or is no longer reasonably available in the marketplace.",
      },
      {
        marker: "**",
        text: '"Fair price" is not defined in the law.',
      },
    ],
    otherInformation: OTHER_INFO_LONG,
  },
  {
    id: "portions",
    title: "Portions for Users",
    icon: FileText,
    rule:
      "Libraries or archives may make a reproduction from a periodical, collection or other work* in their collections when a person or library requests, if:",
    condition: "Only one article or other contribution to a work is copied.",
    otherCriteria: [
      "The copy becomes the property of the user and the library has no reason to believe that it will be used for anything other than research, scholarship and private study purposes",
      "A warning of copyright is placed where orders are accepted",
      "The cop[ies] are not made for direct or indirect commercial advantage",
      "A copyright notice is included on the cop[ies]",
      "The library or archives is open to the public or to unaffiliated specialized researchers",
      "Any requests for the same content, or for content from the same title, are isolated and unrelated",
    ],
    notes: [
      {
        marker: "*",
        text:
          "This section does not apply to musical, pictorial, graphic or audiovisual works/motion pictures. Pictorial or graphic works published as illustrations, diagrams, etc.or similar adjuncts to these works are allowed as are audiovisual works dealing with news.",
      },
    ],
    otherInformation: OTHER_INFO_LONG,
  },
  {
    id: "entire-works",
    title: "Entire Works for Users",
    icon: Files,
    rule:
      "Libraries or archives may make one copy of an entire work* when a person or library requests, if:",
    condition:
      "A [new or used] copy of the work is not available for purchase at a fair price.**",
    otherCriteria: [
      "The copy becomes the property of the user and the library has no reason to believe that it will be used for anything other than research, scholarship and private study purposes",
      "A warning of copyright is placed where orders are accepted",
      "The cop[ies] are not made for direct or indirect commercial advantage",
      "A copyright notice is included on the cop[ies]",
      "The library or archives is open to the public or to unaffiliated specialized researchers",
      "Any requests for the same material are isolated and unrelated",
    ],
    notes: [
      {
        marker: "*",
        text:
          "This section does not apply to musical, pictorial, graphic or audiovisual works/motion pictures. Pictorial or graphic works published as illustrations, diagrams or similar adjuncts to print works are allowed as are audiovisual works dealing with news.",
      },
      {
        marker: "**",
        text: '"Fair price" is not defined in the law.',
      },
    ],
    otherInformation: OTHER_INFO_LONG,
  },
];

const DIRECTIONS: string[] = [
  "Use your mouse to turn the wheel chart to the desired section [click and pull]",
  "Read the text in the box",
  "Clicking for details will bring up any other important qualifying criteria or explanatory notes",
  'Click "Create PDF" to print or save your results, including all criteria/notes and any details you\'d like to add',
];

const DISCLAIMER =
  "This tool is designed to provide accurate and authoritative information with regard to the subject covered. This information is given with the understanding that neither the American Library Association, the ALA Office for Information Technology Policy nor Michael Brewer are engaged in rendering legal, copyright or other professional advice. Since the details of each copyright issue are fact-dependent, consult with your organization's copyright specialist or legal advisor regarding copyright questions.";

/* ---- Wheel geometry ---------------------------------------------- */
const WHEEL_C = 150; // center
const WHEEL_R = 128; // radius
const SEG_ANGLE = 360 / SEGMENTS.length; // 72°

/** Point on the wheel at a "clock" angle (0 = top, increasing clockwise). */
function clockPoint(phiDeg: number, r: number): [number, number] {
  const a = (phiDeg * Math.PI) / 180;
  return [WHEEL_C + r * Math.sin(a), WHEEL_C - r * Math.cos(a)];
}

/** SVG path for wedge i (centered on the top when rotation brings it there). */
function wedgePath(i: number): string {
  const [x1, y1] = clockPoint(i * SEG_ANGLE - SEG_ANGLE / 2, WHEEL_R);
  const [x2, y2] = clockPoint(i * SEG_ANGLE + SEG_ANGLE / 2, WHEEL_R);
  return `M ${WHEEL_C} ${WHEEL_C} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${WHEEL_R} ${WHEEL_R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

/** Greedy word-wrap for the wheel hub label (~10 chars/line). */
function hubLines(title: string): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 10) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export default function Section108Spinner() {
  const [activeId, setActiveId] = useState<SegmentId>("last20");
  const [rotation, setRotation] = useState<number>(0);
  const [disclaimerOpen, setDisclaimerOpen] = useState<boolean>(false);

  const activeIndex = SEGMENTS.findIndex((s) => s.id === activeId);
  const active = SEGMENTS[activeIndex];

  /** Rotate the wheel so wedge i sits under the top pointer (shortest path). */
  function selectIndex(i: number) {
    setRotation((prev) => {
      let target = -i * SEG_ANGLE;
      while (target - prev > 180) target -= 360;
      while (prev - target > 180) target += 360;
      return target;
    });
    setActiveId(SEGMENTS[i].id);
  }

  /** Spin to the next segment (always rotates forward). */
  function spin() {
    const next = (activeIndex + 1) % SEGMENTS.length;
    setRotation((prev) => prev - SEG_ANGLE);
    setActiveId(SEGMENTS[next].id);
  }

  return (
    <div className="space-y-8">
      {/* ----------------------------------------------------------- */}
      {/* Header */}
      {/* ----------------------------------------------------------- */}
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Section 108</Badge>
          <Label>U.S. Copyright Code</Label>
        </div>

        <h2 className="font-display text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          Section 108 Spinner
        </h2>

        <p className="max-w-3xl text-base leading-relaxed text-zinc-600">
          <span className="font-bold text-zinc-900">Section 108</span> of the
          U.S. Copyright Code allows libraries &amp; archives, under certain
          circumstances, to make reproductions of copyrighted materials without
          the permission of the copyright holder. This simple tool can 1) help
          you determine if your reproduction is covered by Section 108 and 2)
          collect information to support your use of the exception.
        </p>
      </header>

      {/* ----------------------------------------------------------- */}
      {/* Directions */}
      {/* ----------------------------------------------------------- */}
      <Card className="p-6">
        <SectionHeader>Directions</SectionHeader>
        <ul className="mt-4 space-y-3">
          {DIRECTIONS.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#9a1866] text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ----------------------------------------------------------- */}
      {/* The wheel */}
      {/* ----------------------------------------------------------- */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6">
          <Label>Turn the wheel to a category</Label>

          <svg
            viewBox="0 0 300 300"
            className="h-72 w-72 select-none sm:h-80 sm:w-80"
            role="img"
            aria-label={`Section 108 wheel — ${active.title} selected`}
          >
            {/* Top pointer */}
            <polygon points="150,36 136,6 164,6" fill="#9a1866" />

            {/* Rotating wheel */}
            <g
              style={{
                transform: `rotate(${rotation}deg)`,
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              {SEGMENTS.map((seg, i) => (
                <path
                  key={seg.id}
                  d={wedgePath(i)}
                  onClick={() => selectIndex(i)}
                  className="cursor-pointer"
                  fill={i === activeIndex ? "#9a1866" : i % 2 ? "#f3cfe2" : "#fbe5f0"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
              {SEGMENTS.map((seg, i) => {
                const [tx, ty] = clockPoint(i * SEG_ANGLE, WHEEL_R * 0.62);
                return (
                  <text
                    key={seg.id}
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none"
                    fontSize="24"
                    fontWeight="800"
                    fill={i === activeIndex ? "#ffffff" : "#9a1866"}
                  >
                    {i + 1}
                  </text>
                );
              })}
            </g>

            {/* Fixed center hub showing the active title */}
            <circle cx="150" cy="150" r="52" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" />
            <text
              x="150"
              y="150"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="12"
              fontWeight="700"
              fill="#18181b"
            >
              {hubLines(active.title).map((line, idx, arr) => (
                <tspan key={idx} x="150" dy={idx === 0 ? `${-(arr.length - 1) * 0.6}em` : "1.2em"}>
                  {line}
                </tspan>
              ))}
            </text>
          </svg>

          <Button icon={RotateCw} onClick={spin}>
            Spin to next
          </Button>

          {/* Legible legend / direct selector */}
          <div className="flex flex-wrap justify-center gap-2">
            {SEGMENTS.map((seg, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={seg.id}
                  onClick={() => selectIndex(i)}
                  aria-pressed={selected}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 focus-ring ${
                    selected
                      ? "border-[#9a1866] bg-[#9a1866] text-white"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-[#9a1866]/40 hover:text-zinc-900"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                      selected ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {seg.title}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* ----------------------------------------------------------- */}
      {/* Active segment content */}
      {/* ----------------------------------------------------------- */}
      <section
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9a1866] text-white">
              <active.icon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-zinc-900">
              {active.title}
            </h3>
          </div>
          <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
        </div>

        {/* Rule + primary condition */}
        <ResultBanner tone="neutral" title={active.rule}>
          <p className="mt-2 font-semibold text-zinc-900">{active.condition}</p>
        </ResultBanner>

        {/* Other Criteria */}
        <Card className="p-6">
          <SectionHeader count={active.otherCriteria.length}>
            Other Criteria
          </SectionHeader>
          <ol className="mt-4 space-y-3">
            {active.otherCriteria.map((criterion, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9a1866]" />
                <span>{criterion}</span>
              </li>
            ))}
          </ol>
        </Card>

        {/* Notes */}
        {active.notes.length > 0 && (
          <Card className="p-6">
            <SectionHeader>Notes</SectionHeader>
            <div className="mt-4 space-y-3">
              {active.notes.map((note) => (
                <p
                  key={note.marker}
                  className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                >
                  <span className="font-bold text-[#9a1866]">{note.marker}</span>
                  <span>{note.text}</span>
                </p>
              ))}
            </div>
          </Card>
        )}

        {/* Other Information */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Info className="h-4 w-4 text-[#9a1866]" />
            <Label>Other Information</Label>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600">
            {active.otherInformation}
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Section 108(h) / Music Modernization Act note */}
      {/* ----------------------------------------------------------- */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#fdf2f8] text-[#9a1866]">
            <Disc3 className="h-5 w-5" />
          </span>
          <div className="space-y-1">
            <Label>Section 108(h) &amp; the Music Modernization Act</Label>
            <p className="text-sm leading-relaxed text-zinc-600">
              Section 108(h) allows libraries and archives to reproduce,
              distribute and publicly perform and display published works that
              are not subject to commercial exploitation and that cannot be
              obtained at a reasonable price for purposes of preservation,
              scholarship or research. The Music Modernization Act of 2018
              expanded that exception to include all published and unpublished
              sound recordings fixed prior to February 15, 1972.
            </p>
          </div>
        </div>
      </Card>

      {/* ----------------------------------------------------------- */}
      {/* Disclaimer */}
      {/* ----------------------------------------------------------- */}
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-zinc-400" />
            <div>
              <Label>Disclaimer</Label>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-500">
                {DISCLAIMER}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => setDisclaimerOpen(true)}>
            Read full disclaimer
          </Button>
        </div>
      </div>

      <Modal
        open={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
        title="Disclaimer"
        footer={
          <Button variant="secondary" onClick={() => setDisclaimerOpen(false)}>
            Close
          </Button>
        }
      >
        <p className="leading-relaxed">{DISCLAIMER}</p>
      </Modal>
    </div>
  );
}

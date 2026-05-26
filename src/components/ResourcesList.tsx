import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Scale, 
  RefreshCw, 
  GraduationCap, 
  HelpCircle, 
  FileText, 
  Printer, 
  CheckCircle, 
  XCircle, 
  Info, 
  ChevronRight, 
  ChevronLeft,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award,
  Wand2
} from "lucide-react";

export default function ResourcesList() {
  const [activeTool, setActiveTool] = useState<"genie" | "fairuse" | "spinner" | "instructors">("genie");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Decorative Brand Header */}
      <div className="text-center mb-10">
        <span className="bg-[#85346a]/10 text-[#85346a] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-[#85346a]/30">
          ALA Copyright Advisory Network Interactive Suite
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#222222] tracking-tight mt-3">
          Copyright Advisory Network Tools
        </h2>
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 font-medium leading-relaxed mt-2.5">
          Based on the classic ALA Copyright Advisory Network software and revised for <strong>2026</strong>. Use these state-managed interactive tools to perform due-diligence evaluations, archive-ready documentation, and classroom clearances.
        </p>
      </div>

      {/* Modern High-Contrast Tool Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { id: "genie", label: "The Copyright Compiler", icon: Sparkles, color: "hover:border-[#9a1866] border-[#9a1866]/20" },
          { id: "fairuse", label: "Fair Use Evaluator", icon: Scale, color: "hover:border-[#85346a] border-[#85346a]/20" },
          { id: "spinner", label: "Section 108 Spinner", icon: RefreshCw, color: "hover:border-[#9a1866] border-[#9a1866]/20" },
          { id: "instructors", label: "Instructors eTool", icon: GraduationCap, color: "hover:border-[#85346a] border-[#85346a]/20" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id as any)}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-250 text-center relative select-none ${
                isActive
                  ? "bg-[#9a1866] border-[#9a1866] text-white shadow-lg shadow-[#9a1866]/10 scale-[1.02]"
                  : `bg-white text-slate-600 hover:bg-[#f6f6f6] ${tab.color} shadow-sm`
              }`}
            >
              <Icon className={`h-6 w-6 mb-2.5 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span className="font-display font-bold text-xs sm:text-sm tracking-tight leading-tight">
                {tab.label}
              </span>
              <p className="text-[10px] font-mono opacity-70 mt-1 uppercase tracking-wider">
                Select Tool
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Container of Active Tool */}
      <div className="bg-white border rounded-3xl p-6 sm:p-10 shadow-sm border-slate-200">
        {activeTool === "genie" && <CopyrightGenieTool />}
        {activeTool === "fairuse" && <FairUseEvaluatorTool />}
        {activeTool === "spinner" && <Section108SpinnerTool />}
        {activeTool === "instructors" && <InstructorsETool />}
      </div>
    </div>
  );
}

/* ============================================================================
   1. REGISTRY TOOL: THE COPYRIGHT COMPILER
   ============================================================================ */
export function CopyrightGenieTool() {
  const currentYear = 2026;
  const publicDomainYear = currentYear - 95; // 1931

  // Wizard state
  const [step, setStep] = useState<number>(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Input states
  const [workTitle, setWorkTitle] = useState<string>("");
  const [workAuthor, setWorkAuthor] = useState<string>("");
  const [isUSGov, setIsUSGov] = useState<"yes" | "no" | null>(null);
  const [pubStatus, setPubStatus] = useState<"published" | "unpublished" | null>(null);
  const [pubYear, setPubYear] = useState<number>(1972);
  const [hasNotice, setHasNotice] = useState<"yes" | "no" | null>(null);
  const [isCured, setIsCured] = useState<"yes" | "no" | null>(null);
  const [isRenewed, setIsRenewed] = useState<"yes" | "no" | null>(null);
  const [isWorkForHire, setIsWorkForHire] = useState<"yes" | "no" | null>(null);
  const [authorDiedBefore1956, setAuthorDiedBefore1956] = useState<"yes" | "no" | null>(null);

  // Helper to change steps with animations
  const navigateTo = (nextStep: number) => {
    if (nextStep > step) {
      setDirection("forward");
    } else {
      setDirection("backward");
    }
    setStep(nextStep);
  };

  // Branching navigation logic for Next button
  const handleNext = () => {
    if (step === 0) {
      navigateTo(1);
    } else if (step === 1) {
      if (isUSGov === "yes") {
        navigateTo(6); // Directly to result (US Gov works are Public Domain)
      } else {
        navigateTo(2);
      }
    } else if (step === 2) {
      if (pubStatus === "unpublished") {
        navigateTo(3); // Go to unpublished death year check
      } else {
        navigateTo(3); // Go to year of publication check
      }
    } else if (step === 3) {
      if (pubStatus === "unpublished") {
        navigateTo(6); // Straight to unpublished result
      } else {
        if (pubYear < publicDomainYear) {
          navigateTo(6); // Prior to 1931 = Public Domain instantly
        } else if (pubYear >= 1931 && pubYear < 1989) {
          navigateTo(4); // Notice needed
        } else {
          navigateTo(5); // POST-1989: Voluntary notice, goes to work for hire check
        }
      }
    } else if (step === 4) {
      if (pubYear >= 1931 && pubYear < 1978) {
        if (hasNotice === "no") {
          navigateTo(6); // Public Domain (No notice prior to 1978)
        } else if (pubYear <= 1963) {
          navigateTo(5); // Needs renewal check
        } else {
          navigateTo(6); // 1964-1977 with notice = automatic 95 term, go to result
        }
      } else if (pubYear >= 1978 && pubYear < 1989) {
        if (hasNotice === "no") {
          navigateTo(4.5); // Omitted notice but curable era
        } else {
          navigateTo(5); // Goes to Work for Hire
        }
      }
    } else if (step === 4.5) {
      if (isCured === "no") {
        navigateTo(6); // Uncured omission = Public Domain
      } else {
        navigateTo(5); // Cured = goes to Work for hire
      }
    } else if (step === 5) {
      navigateTo(6); // Go to results
    }
  };

  // Branching navigation logic for Back button
  const handlePrev = () => {
    if (step === 6) {
      if (isUSGov === "yes") {
        navigateTo(1);
      } else if (pubStatus === "unpublished") {
        navigateTo(3);
      } else if (pubYear < publicDomainYear) {
        navigateTo(3);
      } else if (pubYear >= 1931 && pubYear < 1978) {
        if (hasNotice === "no") {
          navigateTo(4);
        } else if (pubYear <= 1963) {
          navigateTo(5);
        } else {
          navigateTo(4);
        }
      } else if (pubYear >= 1978 && pubYear < 1989) {
        if (hasNotice === "no") {
          if (isCured === "no") {
            navigateTo(4.5);
          } else {
            navigateTo(5);
          }
        } else {
          navigateTo(5);
        }
      } else {
        navigateTo(5);
      }
    } else if (step === 5) {
      if (pubStatus === "published") {
        if (pubYear >= 1978 && pubYear < 1989 && hasNotice === "no") {
          navigateTo(4.5);
        } else if (pubYear >= 1931 && pubYear < 1989) {
          navigateTo(4); // notice check
        } else {
          navigateTo(3); // publication year
        }
      } else {
        navigateTo(2);
      }
    } else if (step === 4.5) {
      navigateTo(4);
    } else if (step === 4) {
      navigateTo(3);
    } else if (step === 3) {
      navigateTo(2);
    } else {
      navigateTo(step - 1);
    }
  };

  // Evaluation computation
  const calculateResult = () => {
    if (isUSGov === "yes") {
      return {
        isPublicDomain: true,
        badge: "PUBLIC DOMAIN (US GOV WORK)",
        reason: "Any work created by an officer or employee of the United States Government as part of their official duties is exempt from domestic copyright protection under 17 U.S.C. § 105.",
        termInfo: "Dedicated to the Public Domain since creation.",
        nextSteps: "You are fully clear to duplicate, scan, publish, and distribute this work without copyright checks."
      };
    }

    if (pubStatus === "unpublished") {
      if (authorDiedBefore1956 === "yes") {
        return {
          isPublicDomain: true,
          badge: "PUBLIC DOMAIN (UNPUBLISHED)",
          reason: `Unpublished work where the creator has been deceased for more than 70 years (died on or before December 31, 1955). Pre-1978 unpublished items expire on a rolling 'Life + 70' schedule.`,
          termInfo: "Unpublished Life + 70 years term has successfully expired.",
          nextSteps: "This historical manuscript, letter, or scrapbook is safe for open transcription, digitization, and archiving."
        };
      } else {
        return {
          isPublicDomain: false,
          badge: "PROTECTED BY COPYRIGHT (UNPUBLISHED)",
          reason: "An unpublished work where the creator is still living or passed away less than 70 years ago (on or after January 1, 1956).",
          termInfo: "Protected under federal common law for the life of the author plus 70 years.",
          nextSteps: "Explicit permission from the author's estate or heirs, or a thorough Fair Use exception assessment, is required."
        };
      }
    }

    // Published works
    if (pubYear < publicDomainYear) {
      return {
        isPublicDomain: true,
        badge: "PUBLIC DOMAIN",
        reason: `First published in the United States prior to January 1, ${publicDomainYear}. The work has naturally entered the Public Domain due to the absolute expiration of its 95-year statutory term.`,
        termInfo: "95 years from publication has completed expiration.",
        nextSteps: "No restrictions. You are clear to reproduce, display, and create derivative editions of this work."
      };
    }

    if (pubYear >= 1931 && pubYear <= 1977) {
      if (hasNotice === "no") {
        return {
          isPublicDomain: true,
          badge: "PUBLIC DOMAIN (OMITTED NOTICE)",
          reason: `Published between 1923 and 1977 without a formal copyright notice. Under the 1909 Copyright Act, publishing a work without a valid copyright notice injected the work immediately into the Public Domain.`,
          termInfo: "Defective publication; copyright forfeited instantly.",
          nextSteps: "Verify that foreign printings or previous editions did not carry valid notices before publishing."
        };
      }

      if (pubYear <= 1963) {
        if (isRenewed === "yes") {
          const expireYear = pubYear + 95;
          const remaining = expireYear - currentYear;
          return {
            isPublicDomain: false,
            badge: "PROTECTED BY COPYRIGHT (RENEWED)",
            reason: "Published with copyright notice between 1923 and 1963, and the copyright owner successfully registered a renewal application with the US Copyright Office in the 28th year.",
            termInfo: `Protected for 95 years. Expires December 31, ${expireYear} (${remaining} years remaining).`,
            nextSteps: "You must procure a license, purchase public permissions, or establish a clear Fair Use justification."
          };
        } else {
          return {
            isPublicDomain: true,
            badge: "PUBLIC DOMAIN (NON-RENEWED)",
            reason: "Published with notice between 1923 and 1963, but the owner failed to file renewal registration papers in the 28th year of initial protection. The term lapsed.",
            termInfo: "Renewal was not filed; copyright expired at the end of the 28th year.",
            nextSteps: "Unrestricted. Many historical volumes, local guides, and films of this window are public domain due to lapsed renewals."
          };
        }
      }

      // Published between 1964 and 1977 with notice
      const expireYear = pubYear + 95;
      const remaining = expireYear - currentYear;
      return {
        isPublicDomain: false,
        badge: "PROTECTED BY COPYRIGHT",
        reason: "Published with copyright notice between January 1, 1964 and December 31, 1977. The 1992 amendment made renewal automatic, retrospective, and non-forfeitable.",
        termInfo: `Protected for a full contiguous statutory term of 95 years, ending Dec 31, ${expireYear} (${remaining} years remaining).`,
        nextSteps: "Must obtain licensing or justify course usage arguments through Classroom Exemptions or Fair Use guidelines."
      };
    }

    // Published between 1978 and March 1, 1989
    if (pubYear >= 1978 && pubYear < 1989) {
      if (hasNotice === "no") {
        if (isCured === "no") {
          return {
            isPublicDomain: true,
            badge: "PUBLIC DOMAIN (UNCURED NO-NOTICE)",
            reason: "Published without a copyright notice between 1978 and March 1, 1989, and the copyright owner failed to cure the omission by registering the work with the Copyright Office within 5 years.",
            termInfo: "Notice omission was not cured under Section 405.",
            nextSteps: "Confirm that original or foreign copies did not have notices; if clear, usage is free."
          };
        }
      }

      // Notice was provided or cured
      const isCorporate = isWorkForHire === "yes";
      const termDescription = isCorporate
        ? "Protected for exactly 95 years from the publication date."
        : "Protected for the life of the author plus an additional 70 years.";
      return {
        isPublicDomain: false,
        badge: "PROTECTED BY COPYRIGHT",
        reason: `Published between January 1, 1978 and February 28, 1989 with notice (or notice omission cured). Works from this era are governed by the modern 1976 Copyright Act calculations.`,
        termInfo: `${termDescription} Current year is within the standard protection period.`,
        nextSteps: "Identify author/estate for permissions, secure licensing channels, or apply a Section 107 Fair Use exception."
      };
    }

    // Published post-1989
    const isCorporate = isWorkForHire === "yes";
    const termDescription = isCorporate
      ? "Protected for exactly 95 years from the publication date."
      : "Protected for the life of the author plus an additional 70 years.";
    return {
      isPublicDomain: false,
      badge: "PROTECTED BY COPYRIGHT",
      reason: `Published on or after March 1, 1989. The United States officially implemented the Berne Convention, making copyright notice completely voluntary. Protection is automatic upon fixation.`,
      termInfo: `Notice is voluntary. Term: ${termDescription}`,
      nextSteps: "Requires explicit licensing from the publisher, purchase of rights, or a verified Fair Use claim."
    };
  };

  const evalResult = calculateResult();

  // Animations configuration
  const slideVariants = {
    enter: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? -80 : 80,
      opacity: 0
    })
  };

  // Steps total count for progress estimation
  const pctProgress = Math.min(((step + 1) / 7) * 100, 100);

  return (
    <div className="space-y-8 select-none">
      
      {/* Tool Header Summary */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-extrabold text-[#222222] flex items-center gap-2 uppercase tracking-wide">
            <Wand2 className="h-6 w-6 text-[#9a1866] animate-pulse" />
            The Copyright Compiler
          </h3>
          <p className="text-xs text-slate-500 font-semibold uppercase font-mono tracking-wider">
            Classic Step-by-Step Expiration Advisor — Rev. 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#85346a] bg-[#85346a]/10 py-1.5 px-3 rounded-lg font-sans font-bold border border-[#85346a]/20">
            Progress: Step {step === 4.5 ? "4" : step + 1} of 7
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#9a1866] transition-all duration-300 ease-out"
          style={{ width: `${pctProgress}%` }}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 min-h-[440px] flex flex-col justify-between relative shadow-sm">
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="flex-grow flex flex-col justify-center space-y-6 py-4"
          >
            
            {/* STEP 0: Work Details Welcome */}
            {step === 0 && (
              <div className="space-y-4 max-w-xl mx-auto text-center animate-in fade-in">
                <div className="h-14 w-14 bg-[#9a1866]/10 text-[#9a1866] rounded-full mx-auto flex items-center justify-center">
                  <Wand2 className="h-7 w-7" />
                </div>
                <h4 className="font-display text-xl font-bold text-[#222222]">Welcome to the Copyright Compiler!</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-serif">
                  Before we begin the evaluation, please enter the name and author of the work below. This allows the Compiler to compile a custom, certified compliance worksheet as a legal record. Clarified with ALA 2026 guidelines.
                </p>
                <div className="space-y-3.5 pt-2 text-left font-sans">
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-mono font-bold text-[#222222]">Title of Work under Review:</label>
                    <input 
                      type="text"
                      placeholder="e.g. 'Introductory Algebra' or 'The Great Gatsby'"
                      value={workTitle}
                      onChange={(e) => setWorkTitle(e.target.value)}
                      className="w-full bg-white p-3 rounded-xl border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-[#85346a]/30 focus:border-[#85346a]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-mono font-bold text-[#222222]">Author / Original Creator:</label>
                    <input 
                      type="text"
                      placeholder="e.g. John Smith or F. Scott Fitzgerald"
                      value={workAuthor}
                      onChange={(e) => setWorkAuthor(e.target.value)}
                      className="w-full bg-white p-3 rounded-xl border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-[#85346a]/30 focus:border-[#85346a]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: US Government work */}
            {step === 1 && (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 1: Institutional Origins</span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                  Was this work created by an officer or employee of the United States Government as part of their official duties?
                </h4>
                <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                  Works created by US federal agency employees (like NASA, CDC, or NOAA) are legally excluded from domestic copyright protection and belong to the public domain from their fixation.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { id: "yes", label: "Yes, US Gov Work", desc: "Created by a federal officer or department employee." },
                    { id: "no", label: "No, Private Work", desc: "Written by individual academics, citizens, or private companies." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setIsUSGov(opt.id as any)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        isUSGov === opt.id
                          ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                      <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Publication Status */}
            {step === 2 && (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 2: Fixation & Distribution</span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                  Has this work ever been published?
                </h4>
                <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                  'Publication' implies the distribution of physical or digital copies to the public via sales, rentals, or broadcasting. Private manuscripts or letters are unpublished.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { id: "published", label: "Yes, Published Work", desc: "Printed books, journals, distributed films, or musical records." },
                    { id: "unpublished", label: "No, Unpublished", desc: "Handwritten letters, archival manuscripts, diaries, or records." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPubStatus(opt.id as any)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        pubStatus === opt.id
                          ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                      <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 (Unpublished): Creator Death */}
            {pubStatus === "unpublished" && step === 3 && (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 3: Creator Lifespan</span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                  Did the author or creator of the work die on or before December 31, 1955?
                </h4>
                <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                  Unpublished works remain protected through the natural life of the artist plus an additional 70 years. In 2026, works by creators who passed more than 70 years ago (1955 or earlier) are in the Public Domain.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { id: "yes", label: "Yes, died before 1956", desc: "Deceased for more than 70 years (e.g., author died in 1948)." },
                    { id: "no", label: "No, living or died after 1955", desc: "Died in 1956 or later, or is currently living today." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAuthorDiedBefore1956(opt.id as any)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        authorDiedBefore1956 === opt.id
                          ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                      <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 (Published): Publication Year */}
            {pubStatus === "published" && step === 3 && (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 3: Date of First Publication</span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                  When was the work first published?
                </h4>
                <div className="space-y-2 max-w-md mx-auto pt-2">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-150">
                    <span className="text-xs font-mono uppercase font-bold text-gray-500">Year of Publication:</span>
                    <input 
                      type="number"
                      min="1850"
                      max="2026"
                      value={pubYear}
                      onChange={(e) => setPubYear(Math.min(Math.max(parseInt(e.target.value) || 1900, 1850), 2026))}
                      className="bg-white px-3 py-1 text-sm font-bold font-mono text-[#9a1866] rounded border border-gray-300 w-24 text-center focus:outline-none focus:ring-1 focus:ring-[#9a1866]"
                    />
                  </div>
                  <input
                    type="range"
                    min="1900"
                    max="2026"
                    value={pubYear}
                    onChange={(e) => setPubYear(parseInt(e.target.value))}
                    className="w-full accent-[#9a1866] h-2 bg-gray-200 rounded-lg cursor-pointer pt-1"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>1900</span>
                    <span className="text-[#9a1866] font-semibold underline">1931: 95-Yr Limit</span>
                    <span>2026</span>
                  </div>
                </div>

                {/* Helpful chronological context badge */}
                <div className="bg-gray-55 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-600 leading-normal max-w-md mx-auto">
                  {pubYear < publicDomainYear ? (
                    <span className="text-[#1d5d19] font-bold">✓ Published before {publicDomainYear}:</span>
                  ) : pubYear >= 1931 && pubYear <= 1963 ? (
                    <span className="text-amber-800 font-bold">ℹ Notice & Renewal Era (1931–1963):</span>
                  ) : pubYear >= 1964 && pubYear <= 1977 ? (
                    <span className="text-amber-805 font-bold">ℹ Automatic Extension Era (1964–1977):</span>
                  ) : (
                    <span className="text-gray-800 font-bold">ℹ Modern 1976 Act Era (1978–Present):</span>
                  )}
                  {" "}
                  {pubYear < publicDomainYear 
                    ? `Works published more than 95 years ago are unconditionally public domain in 2026.`
                    : pubYear >= 1931 && pubYear <= 1963
                      ? `Works published in this era required notice and mandatory registration renewal in the 28th year.`
                      : pubYear >= 1964 && pubYear <= 1977
                        ? `Works published in this era required notice, but second term renewals were made fully automatic.`
                        : `Works published after 1977 do not expire for several decades (Life + 70 or 95 years Corporate).`
                  }
                </div>
              </div>
            )}

            {/* STEP 4: Notice Check */}
            {step === 4 && (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 4: Copyright Formalities Notice</span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                  Did the work bear a formal Copyright Notice when first published?
                </h4>
                <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                  Under classic U.S. law, works had to bear a proper copyright notice containing is symbol (© or word 'Copyright'), the year, and the claimant's name. Omission of notice could forfeit terms.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { id: "yes", label: "Yes, had proper notice", desc: "Carried notice (e.g. '© 1952 Margaret Mitchell' or 'Copyright 1961')." },
                    { id: "no", label: "No formal notice found", desc: "No notice was stamped, or notice omitted the year/claimant." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setHasNotice(opt.id as any)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        hasNotice === opt.id
                          ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                      <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4.5: Notice Cure Check */}
            {step === 4.5 && (
              <div className="space-y-4 max-w-xl mx-auto animate-in zoom-in-95">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 4-B: Curative Registration</span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                  Was the notice omission cured by registration and adding notices within 5 years?
                </h4>
                <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                  Works published without notice between 1978 and March 1, 1989 entered the public domain UNLESS the author registered the work with the Copyright Office within five years and made a reasonable effort to add notice.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { id: "yes", label: "Yes, registered & cured", desc: "The author completed registration under the terms of the 5-year limit." },
                    { id: "no", label: "No registry filed / uncured", desc: "No registration was filed within 5 years. Omission stands." }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setIsCured(opt.id as any)}
                      className={`p-5 rounded-2xl border text-left transition ${
                        isCured === opt.id
                          ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                          : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                      <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Renewal Check OR Work For Hire Check */}
            {step === 5 && (
              <div className="space-y-4 max-w-xl mx-auto">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block text-center">Factual Step 5: Term Extension Check</span>
                
                {pubYear >= 1931 && pubYear <= 1963 ? (
                  <>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                      Was the copyright renewed in its 28th statutory year?
                    </h4>
                    <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                      Works published with notice between 1923 and 1963 entered the public domain after 28 years unless a renewal application (Form RE) was registered with the US Copyright Office.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {[
                        { id: "yes", label: "Yes, Renewed", desc: "A renewal was registered, securing 95 statutory years of protection." },
                        { id: "no", label: "No, renewal lapsed", desc: "No renewal application was received; copyright terminated." }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setIsRenewed(opt.id as any)}
                          className={`p-5 rounded-2xl border text-left transition ${
                            isRenewed === opt.id
                              ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                              : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                          <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-[#222222] text-center">
                      Was it developed as a Work-for-Hire or corporate production?
                    </h4>
                    <p className="text-xs text-center text-gray-500 leading-normal max-w-md mx-auto">
                      Applies to works designed by employees for their company, commercial collective files, or anonymous/pseudonymous works. This triggers a fixed term rather than the creator's lifetime.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {[
                        { id: "yes", label: "Corporate Work-for-Hire", desc: "Term lasts exactly 95 years from publication or 120 years from creation." },
                        { id: "no", label: "Individual Authorship", desc: "Term is governed by the author's lifespan: Life plus 70 years." }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setIsWorkForHire(opt.id as any)}
                          className={`p-5 rounded-2xl border text-left transition ${
                            isWorkForHire === opt.id
                              ? "bg-[#9a1866]/5 border-[#9a1866] ring-2 ring-[#9a1866]/20 font-bold"
                              : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                          }`}
                        >
                          <span className="font-display text-sm text-[#222222] block font-bold">{opt.label}</span>
                          <span className="text-[10px] text-gray-500 block leading-tight mt-1">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 6: Final Diagnosis Certificate & Printing Layout */}
            {step === 6 && (
              <div className="space-y-6 animate-in zoom-in-95">
                
                {/* Print Friendly Header (Only active on print media, or styled nicely in panel) */}
                <div className="border-4 border-double border-[#9a1866]/30 bg-white p-6 sm:p-8 rounded-2xl space-y-5 text-[#222222] shadow-sm text-left">
                  
                  {/* Decorative stamp decoration */}
                  <div className="flex justify-between items-start border-b border-[#9a1866]/20 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono whitespace-nowrap bg-[#85346a]/10 text-[#85346a] py-0.5 px-2 rounded-full uppercase font-bold">
                        ALA Committee on Legislation compliance cert
                      </span>
                      <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-[#222222]">
                        Copyright Advisory Record
                      </h3>
                      <p className="text-[10px] text-gray-500 font-mono">
                        Date of Review: {new Date().toISOString().split("T")[0]}
                      </p>
                    </div>
                    {evalResult.isPublicDomain ? (
                      <div className="border-2 border-dashed border-green-700 text-green-700 font-mono text-[10px] uppercase tracking-widest leading-none p-2 rotate-6 font-bold">
                        Public Domain
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-[#9a1866] text-[#9a1866] font-mono text-[10px] uppercase tracking-widest leading-none p-2 -rotate-6 font-bold">
                        Under Copyright
                      </div>
                    )}
                  </div>

                  {/* Metadata fields checked */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-gray-50 p-3 rounded-lg border">
                    <div>
                      <strong className="text-gray-500 text-[10px] font-mono uppercase block">Title of Evaluated Work:</strong>
                      <span className="text-gray-800 font-bold block truncate">{workTitle || "Untitled Work / Unknown"}</span>
                    </div>
                    <div>
                      <strong className="text-gray-500 text-[10px] font-mono uppercase block">Subject Author:</strong>
                      <span className="text-gray-800 font-bold block truncate">{workAuthor || "Unknown Scholar"}</span>
                    </div>
                  </div>

                  {/* Core Diagnostic Section */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#85346a] uppercase tracking-wider block font-bold">Evaluation Verdict & Badge:</span>
                      <h4 className="text-xl font-display font-extrabold tracking-tight text-[#1d5d19] uppercase">
                        {evalResult.badge}
                      </h4>
                    </div>

                    <div className="space-y-1 border-t pt-3">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Regulatory Rationale:</span>
                      <p className="text-xs sm:text-sm text-gray-750 font-sans leading-relaxed">
                        {evalResult.reason}
                      </p>
                    </div>

                    <div className="space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-150 font-mono text-xs">
                      <span className="text-gray-500 text-[9px] uppercase tracking-wider block font-bold">Copyright Term Calculation Summary:</span>
                      <strong className="text-[#222222] block mt-1">
                        {evalResult.termInfo}
                      </strong>
                    </div>

                    <div className="space-y-2 pt-1 border-t">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Instructional Guidance / Next Steps:</span>
                      <div className="flex gap-2.5 items-start text-xs font-sans leading-relaxed text-gray-700">
                        <div className="mt-0.5">
                          {evalResult.isPublicDomain ? (
                            <CheckCircle className="h-4.5 w-4.5 text-green-700" />
                          ) : (
                            <Info className="h-4.5 w-4.5 text-[#9a1866]" />
                          )}
                        </div>
                        <p>{evalResult.nextSteps}</p>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-[11px] leading-relaxed text-amber-900 text-left">
                  <Info className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Legal Advisory Checklist:</strong> This wizard calculates default domestic rules under the 1909 and 1976 US acts. It does not handle complex foreign treaty restorations, sound recording distinctions pre-1972, or non-fixed kinetic media. Save or print this worksheet as evidence of a good-faith inquiry.
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="border-t border-slate-200 pt-5 flex items-center justify-between select-none">
          {step > 0 ? (
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-slate-50 text-[#9a1866] border border-[#9a1866]/30 py-2 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && isUSGov === null) ||
                (step === 2 && pubStatus === null) ||
                (step === 3 && pubStatus === "unpublished" && authorDiedBefore1956 === null) ||
                (step === 4 && hasNotice === null) ||
                (step === 4.5 && isCured === null) ||
                (step === 5 && pubYear >= 1931 && pubYear <= 1963 && isRenewed === null) ||
                (step === 5 && pubYear >= 1978 && isWorkForHire === null)
              }
              className={`py-2 px-5 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition select-none ${
                ((step === 1 && isUSGov === null) ||
                (step === 2 && pubStatus === null) ||
                (step === 3 && pubStatus === "unpublished" && authorDiedBefore1956 === null) ||
                (step === 4 && hasNotice === null) ||
                (step === 4.5 && isCured === null) ||
                (step === 5 && pubYear >= 1931 && pubYear <= 1963 && isRenewed === null) ||
                (step === 5 && pubYear >= 1978 && isWorkForHire === null))
                   ? "bg-gray-150 text-gray-400 cursor-not-allowed border"
                   : "bg-[#9a1866] hover:bg-[#85346a] text-white shadow-sm"
              }`}
            >
              <span>{step === 0 ? "Begin Evaluation" : "Next Option"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-[#222222] hover:bg-black text-white py-2.5 px-5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition"
              >
                <Printer className="h-4 w-4" />
                <span>Print Legal Report Document</span>
              </button>
              <button
                onClick={() => {
                  setStep(0);
                  setIsUSGov(null);
                  setPubStatus(null);
                  setPubYear(1972);
                  setHasNotice(null);
                  setIsCured(null);
                  setIsRenewed(null);
                  setIsWorkForHire(null);
                  setAuthorDiedBefore1956(null);
                }}
                className="bg-white hover:bg-gray-150 text-gray-600 border py-2.5 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition"
              >
                Reset Compiler
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

/* ============================================================================
   2. QUANTITATIVE ANALYSIS TOOL: FAIR USE EVALUATOR
   ============================================================================ */
export function FairUseEvaluatorTool() {
  const [projectName, setProjectName] = useState("Academic Reserve Scanning");
  const [userName, setUserName] = useState("Library Liaison");
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split("T")[0]);

  // Scores from 1 to 5 for each factor (1 opposing fair use, 5 favoring fair use)
  const [f1Score, setF1Score] = useState<number>(4);
  const [f2Score, setF2Score] = useState<number>(3);
  const [f3Score, setF3Score] = useState<number>(3);
  const [f4Score, setF4Score] = useState<number>(2);

  const [f1Text, setF1Text] = useState("Non-profit educational purpose, copying isolated chapter to distribute exclusively to students in protected online LMS.");
  const [f2Text, setF2Text] = useState("The original textbook is highly factual and informative rather than imaginative poetry or fiction, favorable to exceptions.");
  const [f3Text, setF3Text] = useState("We are only digitizing Chapter 2 (approx. 12 pages out of 340). This represents less than 4% of the entire published volume.");
  const [f4Text, setF4Text] = useState("No license is separately available to purchase just that isolated chapter, though physical full textbooks can be bought.");

  const averageScore = (f1Score + f2Score + f3Score + f4Score) / 4;

  const getOverallDiagnosis = () => {
    if (averageScore < 2.5) {
      return {
        label: "Weighs Against Fair Use",
        color: "text-red-700 bg-red-50 border-red-200",
        bgBadge: "bg-red-600",
        message: "Your intended usage displays traits that heavily trigger copyright infringements, such as using excessive creative source materials or impacting retail markets. Secure formal permissions."
      };
    } else if (averageScore >= 2.5 && averageScore <= 3.5) {
      return {
        label: "Borderline / Evidentiary Neutral",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        bgBadge: "bg-amber-500",
        message: "Your analysis falls into a grey area. Consider reducing the proportion of materials taken, or restaging the material for a strictly transformative commentary context to elevate security."
      };
    } else {
      return {
        label: "Strongly Favors Fair Use",
        color: "text-green-700 bg-green-50 border-green-200",
        bgBadge: "bg-green-600",
        message: "The purpose is educational, the amount is reasonable, and no market disruption is proven. This is standard under Section 107. Retain this worksheet for your diligence files!"
      };
    }
  };

  const diagnosis = getOverallDiagnosis();

  // Reset tool helper
  const handleReset = () => {
    setF1Score(3);
    setF2Score(3);
    setF3Score(3);
    setF4Score(3);
    setF1Text("");
    setF2Text("");
    setF3Text("");
    setF4Text("");
  };

  return (
    <div className="space-y-8">
      
      {/* Tool Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-extrabold text-[#222222] flex items-center gap-2 uppercase tracking-wide">
            <Scale className="h-6 w-6 text-[#9a1866]" />
            Fair Use Evaluator
          </h3>
          <p className="text-xs text-slate-500 font-semibold uppercase font-mono tracking-wider">
            Quantitative Core Factor Assessor
          </p>
        </div>
        <div className="text-xs text-green-700 bg-green-50 py-1.5 px-3 rounded-lg font-sans font-bold border border-green-100">
          Section 107 Compliance Matrix
        </div>
      </div>

      {/* Metadata Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-150 text-xs">
        <div className="space-y-1">
          <span className="font-mono uppercase font-bold text-gray-500">Project / Description:</span>
          <input 
            type="text" 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-white p-2 rounded border border-gray-300 font-sans focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div className="space-y-1">
          <span className="font-mono uppercase font-bold text-gray-500">Reviewing Officer/User:</span>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-white p-2 rounded border border-gray-300 font-sans focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div className="space-y-1">
          <span className="font-mono uppercase font-bold text-gray-500">Evaluation Date:</span>
          <input 
            type="date" 
            value={evaluationDate} 
            onChange={(e) => setEvaluationDate(e.target.value)}
            className="w-full bg-white p-2 rounded border border-gray-300 font-sans focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders and narratives (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Factor 1 */}
          <div className="bg-white border rounded-xl p-5 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <span className="bg-[#85346a] text-white rounded-full w-5 h-5 inline-flex items-center justify-center font-mono text-[10px]">1</span>
                <span>Purpose & Character of Use</span>
              </h4>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-700">
                Score: {f1Score}/5
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              Does your use lean transformative (modifying meaning with educational critique, commentary, parody, or news summaries) or is it purely commercial reprint for profit?
            </p>
            <input 
              type="range" min="1" max="5" value={f1Score} onChange={(e) => setF1Score(parseInt(e.target.value))}
              className="w-full accent-green-700 h-1.5 bg-gray-200 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-400">
              <span>highly Commercial (1)</span>
              <span>Neutral / Classroom (3)</span>
              <span>Highly Transformative (5)</span>
            </div>
            <textarea
              rows={2}
              value={f1Text}
              onChange={(e) => setF1Text(e.target.value)}
              placeholder="Provide a short written commentary justifying the character of use..."
              className="w-full text-xs p-2.5 rounded bg-[#fcfbfa] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Factor 2 */}
          <div className="bg-white border rounded-xl p-5 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <span className="bg-[#85346a] text-white rounded-full w-5 h-5 inline-flex items-center justify-center font-mono text-[10px]">2</span>
                <span>Nature of Copyrighted Work</span>
              </h4>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-700">
                Score: {f2Score}/5
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              Is the source published or unpublished? Factual works (e.g. data compilations, maps, indexes) favor fair use, whereas creative works (e.g. poetry, movies, novels) enjoy strict safeguards.
            </p>
            <input 
              type="range" min="1" max="5" value={f2Score} onChange={(e) => setF2Score(parseInt(e.target.value))}
              className="w-full accent-green-700 h-1.5 bg-gray-200 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-400">
              <span>highly Creative / Novel (1)</span>
              <span>Published / Manual (3)</span>
              <span>strictly Factual / Record (5)</span>
            </div>
            <textarea
              rows={2}
              value={f2Text}
              onChange={(e) => setF2Text(e.target.value)}
              placeholder="Provide a short written commentary describing the nature of the original..."
              className="w-full text-xs p-2.5 rounded bg-[#fcfbfa] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Factor 3 */}
          <div className="bg-white border rounded-xl p-5 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <span className="bg-[#85346a] text-white rounded-full w-5 h-5 inline-flex items-center justify-center font-mono text-[10px]">3</span>
                <span>Amount and Substantiality Used</span>
              </h4>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-700">
                Score: {f3Score}/5
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              Using a small, non-essential chapter is favorable. Copying substantial portions, or pulling the "heart of the work" (the core climax or key hook), opposes fair use.
            </p>
            <input 
              type="range" min="1" max="5" value={f3Score} onChange={(e) => setF3Score(parseInt(e.target.value))}
              className="w-full accent-green-700 h-1.5 bg-gray-200 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-400">
              <span>entire Work / Main Code (1)</span>
              <span>Isolated Chapter (3)</span>
              <span>highly Nominal Fragment (5)</span>
            </div>
            <textarea
              rows={2}
              value={f3Text}
              onChange={(e) => setF3Text(e.target.value)}
              placeholder="Provide commentary regarding volume of the excerpt used..."
              className="w-full text-xs p-2.5 rounded bg-[#fcfbfa] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Factor 4 */}
          <div className="bg-white border rounded-xl p-5 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-center">
              <h4 className="font-display font-black text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <span className="bg-[#85346a] text-white rounded-full w-5 h-5 inline-flex items-center justify-center font-mono text-[10px]">4</span>
                <span>Effect of Use on the Market</span>
              </h4>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-green-50 border border-green-100 text-green-700">
                Score: {f4Score}/5
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-tight">
              Does your distribution substitute for buying the original? If digital storage threatens active licensing channels or outcompetes book sales, it strongly opposes fair use.
            </p>
            <input 
              type="range" min="1" max="5" value={f4Score} onChange={(e) => setF4Score(parseInt(e.target.value))}
              className="w-full accent-green-700 h-1.5 bg-gray-200 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-gray-400">
              <span>substitutes Market / Selling (1)</span>
              <span>No separate license sold (3)</span>
              <span>no Market impact / Out of Print (5)</span>
            </div>
            <textarea
              rows={2}
              value={f4Text}
              onChange={(e) => setF4Text(e.target.value)}
              placeholder="Provide commentary regarding potential economic impact on rightsholder..."
              className="w-full text-xs p-2.5 rounded bg-[#fcfbfa] border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

        </div>

        {/* Evaluation dashboard & visualization (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`border-2 rounded-2xl p-6 sm:p-8 space-y-6 ${diagnosis.color}`}>
            <span className={`text-[10px] font-mono text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-widest ${diagnosis.bgBadge}`}>
              Assessed Factor Mean: {averageScore.toFixed(2)} / 5.0
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-black tracking-tight mt-3">
              {diagnosis.label}
            </h4>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#222222]">
              {diagnosis.message}
            </p>

            {/* Simple Graphic Bar Representing Fair Use Safe Balance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
                <span>Opposes</span>
                <span>Borderline</span>
                <span>Favors</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex relative">
                <div 
                  className="h-full bg-red-400" 
                  style={{ width: "35%" }} 
                />
                <div 
                  className="h-full bg-amber-300" 
                  style={{ width: "30%" }} 
                />
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: "35%" }} 
                />
                {/* Pointer indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-2.5 bg-[#9a1866] border border-white rounded shadow-md transform -translate-x-1/2"
                  style={{ left: `${(averageScore - 1) * 25}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => window.print()}
                className="w-full bg-[#9a1866] hover:bg-[#85346a] text-white text-xs font-mono font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Save Certified PDF Worksheet</span>
              </button>
              <button
                onClick={handleReset}
                className="w-full bg-transparent hover:underline text-gray-500 text-xs font-mono font-bold uppercase tracking-wider py-1 select-none flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Questionnaire</span>
              </button>
            </div>
          </div>

          <div className="bg-[#85346a]/5 border border-[#85346a]/25 rounded-xl p-5 space-y-2">
            <h5 className="font-display text-xs font-extrabold uppercase text-[#222222]">Why Maintain a Worksheet?</h5>
            <p className="text-[11px] text-gray-600 leading-normal font-sans">
              Under federal copyright case law, if an investigator acts in "good faith" and fills out a structured analysis worksheet prior to distributing the materials, tribunals are legally permitted to reduce statutory damages down to $0 even if some level of infringement is retrospectively discovered. Keep this file for records!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   3. DECISION ENGINE: SECTION 108 SPINNER 
   ============================================================================ */
export function Section108SpinnerTool() {
  const [sectionType, setSectionType] = useState<"108b" | "108c" | "108de">("108b");
  
  // Spinner physical rotation state
  const [needleRotation, setNeedleRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Interactive Checklist States
  const [openToPublic, setOpenToPublic] = useState<boolean>(true);
  const [noAdvantage, setNoAdvantage] = useState<boolean>(true);
  const [hasNotice, setHasNotice] = useState<boolean>(true);
  
  // Custom checklist states depending on category
  const [inCollections, setInCollections] = useState<boolean>(true);
  const [restrictedDigital, setRestrictedDigital] = useState<boolean>(true);
  const [obsoleteOrDamaged, setObsoleteOrDamaged] = useState<boolean>(true);
  const [fairInvestigation, setFairInvestigation] = useState<boolean>(true);
  const [patronOwnsCopy, setPatronOwnsCopy] = useState<boolean>(true);
  const [limitedSnippet, setLimitedSnippet] = useState<boolean>(true);

  const rotateToSectionType = (type: "108b" | "108c" | "108de", spinExtra: boolean = false) => {
    let sliceAngle = 0;
    if (type === "108b") sliceAngle = 0;
    if (type === "108de") sliceAngle = 120;
    if (type === "108c") sliceAngle = 240;

    const currentBase = needleRotation % 360;
    let delta = sliceAngle - currentBase;
    if (delta < 0) {
      delta += 360;
    }
    
    // If we want a satisfying "spin", we add at least 720 degrees (2 full spins)
    const extra = spinExtra ? 720 : 0;
    const targetRotation = needleRotation + delta + extra;
    setNeedleRotation(targetRotation);
  };

  // Sync mechanical needle rotation when state is changed manually
  const handleManualSelection = (type: "108b" | "108c" | "108de") => {
    if (isSpinning) return;
    setSectionType(type);
    rotateToSectionType(type, false);
  };

  // Satisfying spin animation triggered by clicking center
  const triggerRandomSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const stages: ("108b" | "108c" | "108de")[] = ["108b", "108c", "108de"];
    const chosen = stages[Math.floor(Math.random() * stages.length)];

    rotateToSectionType(chosen, true);

    setTimeout(() => {
      setSectionType(chosen);
      setIsSpinning(false);
    }, 1200); // 1.2s spring transition
  };

  // Verification score evaluation
  const evaluate108 = () => {
    // Standard baseline conditions for ALL of section 108
    if (!openToPublic || !noAdvantage || !hasNotice) {
      return {
        passed: false,
        badge: "SECTION 108 COMPLIANCE FAILED",
        reason: "You do not meet the strict foundational requirements of Section 108. All library reproductions require the site to be open to outside researchers, non-commercial in execution, and have copyright notices stamped on reproductions.",
        legalCite: "17 U.S. Code § 108(a)"
      };
    }

    if (sectionType === "108b") {
      if (inCollections && restrictedDigital) {
        return {
          passed: true,
          badge: "COMPLIANT PRESERVATION REPRODUCTION",
          reason: "All requirements met. You are authorized to make up to three copies of an unpublished work for preservation, provided the digital instances are confined to onsite terminals and are not distributed publicly on the wider internet.",
          legalCite: "17 U.S. Code § 108(b)"
        };
      } else {
        return {
          passed: false,
          badge: "PRESERVATION TERMS FAILING",
          reason: "To preserve unpublished materials, they must already reside in your collections. Furthermore, you cannot distribute structural digital copies on the public internet; they must be limited to onsite terminals.",
          legalCite: "17 U.S. Code § 108(b)"
        };
      }
    }

    if (sectionType === "108c") {
      if (obsoleteOrDamaged && fairInvestigation) {
        return {
          passed: true,
          badge: "COMPLIANT REPLACEMENT OF PUBLISHED WORK",
          reason: "All conditions met. You are authorized to reproduce up to three copies of a published work to replace a damaged, deteriorating, lost, or stolen copy, or because its format is obsolete, after completing a good-faith search for an unused replacement at a fair price.",
          legalCite: "17 U.S. Code § 108(c)"
        };
      } else {
        return {
          passed: false,
          badge: "EXHAUSTIVE SEARCH REQUIRED",
          reason: "To legally replace a published copy, the original must either be damaged/deteriorating/lost, or in a physically obsolete format. Crucially, they must run an extensive dealer check confirming a replacement cannot be bought at a fair market rate.",
          legalCite: "17 U.S. Code § 108(c)"
        };
      }
    }

    // patron ILL
    if (patronOwnsCopy && limitedSnippet) {
      return {
        passed: true,
        badge: "COMPLIANT PATRON EXCERPT / ILL COPY",
        reason: "Meeting ILL standards. Libraries can provide a single copy of an article or small excerpt to a patron, provided the library warning sign is displayed, and the copy belongs to the patron for private educational research.",
        legalCite: "17 U.S. Code § 108(d) / (e)"
      };
    } else {
      return {
        passed: false,
        badge: "ILL COMPLIANCE LAPSED",
        reason: "ILL and patron exceptions require the materials to be limited to academic study, restricted to solitary articles or nominal portions, and require standard copyright display statements.",
        legalCite: "17 U.S. Code § 108(d)"
      };
    }
  };

  const status = evaluate108();

  return (
    <div className="space-y-8 select-none">
      
      {/* Tool Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-extrabold text-[#222222] flex items-center gap-2 uppercase tracking-wide">
            <RefreshCw className="h-6 w-6 text-[#9a1866] animate-spin-slow" />
            Section 108 Spinner
          </h3>
          <p className="text-xs text-slate-500 font-semibold uppercase font-mono tracking-wider">
            Interactive Preservation & Interlibrary Loan Dial
          </p>
        </div>
        <div className="text-xs text-[#9a1866] bg-[#9a1866]/10 py-1.5 px-3 rounded-lg font-sans font-bold border border-[#9a1866]/20">
          U.S. Library Archives Exemption Rules — 2026
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: The Physical Spinner Wheel & Tabs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-6">
          
          {/* Mechanical Wheel container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-double border-[#9a1866]/30 bg-white shadow-xl flex items-center justify-center select-none overflow-hidden active:scale-[0.99] transition-transform">
            
            {/* Sector Divisions Printed on board background */}
            <div className="absolute inset-2 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-150">
              
              {/* Sector 1: §108(b) (Top Sector centered at 0deg / 360deg, spans 300deg to 60deg) */}
              <button 
                onClick={() => handleManualSelection("108b")}
                className={`absolute inset-0 select-none ${sectionType === "108b" ? "bg-[#9a1866]/5 font-bold" : "hover:bg-gray-100/60"}`}
                style={{ clipPath: "polygon(50% 50%, 0% 21.13%, 0% 0%, 100% 0%, 100% 21.13%)" }}
              >
                <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center w-full px-2">
                  <span className="font-display text-[11px] sm:text-xs text-[#222222] uppercase font-bold block">Unpublished</span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 font-semibold block leading-tight mt-0.5">§ 108(b) Preservation</span>
                </div>
              </button>
 
              {/* Sector 2: §108(de) (Bottom Right, spans 60deg to 180deg) */}
              <button 
                onClick={() => handleManualSelection("108de")}
                className={`absolute inset-0 select-none ${sectionType === "108de" ? "bg-[#9a1866]/5 font-bold" : "hover:bg-gray-100/60"}`}
                style={{ clipPath: "polygon(50% 50%, 100% 21.13%, 100% 100%, 50% 100%)" }}
              >
                <div 
                  className="absolute text-center"
                  style={{ left: "71%", top: "67%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="font-display text-[11px] sm:text-xs text-[#222222] uppercase font-bold block whitespace-nowrap">Patrons ILL</span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 font-semibold block leading-tight mt-0.5 whitespace-nowrap">§ 108(d/e) Copies</span>
                </div>
              </button>
 
              {/* Sector 3: §108(c) (Bottom Left, spans 180deg to 300deg) */}
              <button 
                onClick={() => handleManualSelection("108c")}
                className={`absolute inset-0 select-none ${sectionType === "108c" ? "bg-[#9a1866]/5 font-bold" : "hover:bg-gray-100/60"}`}
                style={{ clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 21.13%)" }}
              >
                <div 
                  className="absolute text-center"
                  style={{ left: "29%", top: "67%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="font-display text-[11px] sm:text-xs text-[#222222] uppercase font-bold block whitespace-nowrap">Published</span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-gray-500 font-semibold block leading-tight mt-0.5 whitespace-nowrap">§ 108(c) Replace</span>
                </div>
              </button>
 
              {/* Divider lines matching sector boundaries at 60deg, 180deg, and 300deg */}
              <div className="absolute bottom-[50%] top-0 left-[50%] right-[50%] border-r border-dashed border-[#9a1866]/20 rotate-[60deg] origin-bottom pointer-events-none" />
              <div className="absolute bottom-[50%] top-0 left-[50%] right-[50%] border-r border-dashed border-[#9a1866]/20 rotate-[180deg] origin-bottom pointer-events-none" />
              <div className="absolute bottom-[50%] top-0 left-[50%] right-[50%] border-r border-dashed border-[#9a1866]/20 rotate-[300deg] origin-bottom pointer-events-none" />
            </div>
 
            {/* Satisfying Rotating Pointer Needle */}
            <motion.div 
              animate={{ rotate: needleRotation }}
              transition={{ type: "spring", damping: 15, stiffness: 45 }}
              className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
            >
              {/* This inner div's bottom edge is anchored EXACTLY at the center of rotation */}
              <div 
                className="w-4 h-32 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom flex flex-col justify-between"
                style={{ transformOrigin: "bottom center" }}
              >
                {/* Pointer tip pointing towards the outer edge of the wheel */}
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[24px] border-b-[#9a1866] mx-auto" />
                {/* Shaft of the needle */}
                <div className="w-2 h-20 bg-[#85346a] mx-auto rounded-t-full shadow-sm flex-grow" />
                {/* Base of the needle (will be covered by the center cap) */}
                <div className="w-4 h-4 bg-[#85346a] rounded-full mx-auto" />
              </div>
            </motion.div>
 
            {/* Static Golden Center Cap / Rub knob button */}
            <button 
              onClick={triggerRandomSpin}
              disabled={isSpinning}
              className={`absolute w-16 h-16 rounded-full border-4 border-[#9a1866] bg-slate-50 text-[#222222] hover:bg-white flex flex-col items-center justify-center font-display font-black text-[10px] uppercase tracking-wider shadow-md select-none cursor-pointer z-20 ${isSpinning ? "opacity-80 scale-95" : "hover:scale-[1.04]"}`}
            >
              <span className="animate-pulse">{isSpinning ? "SPIN" : "CLICK"}</span>
              <span className="text-[7px]">TO SPIN</span>
            </button>
          </div>

          {/* Activity indicators buttons */}
          <div className="w-full space-y-2">
            {[
              { id: "108b", label: "Preserving Unpublished Works", sub: "Up to 3 preservation replicas of owned unpublished items." },
              { id: "108c", label: "Replacing Published Works", sub: "Damaged, obsolete format, or lost volumes dealer search." },
              { id: "108de", label: "Patron Copies & Interlibrary Loans", sub: "Brief snippets or single files scanned for research study." }
            ].map((activity) => (
              <button
                key={activity.id}
                onClick={() => handleManualSelection(activity.id as any)}
                className={`w-full p-3.5 rounded-xl border text-left transition text-xs leading-normal flex flex-col ${
                  sectionType === activity.id
                    ? "bg-[#9a1866]/10 border-[#9a1866] text-[#222222] font-bold ring-1 ring-[#9a1866]"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600 font-medium"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${sectionType === activity.id ? "bg-[#9a1866]" : "bg-transparent border border-gray-400"}`} />
                  <span className="font-display font-medium text-xs text-gray-800">{activity.label}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-sans block mt-0.5 ml-3.5">{activity.sub}</span>
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Checklists forms & Diagnosis Board (7 cols total splits into Form+Diagnostic) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Foundational Checklists Card */}
          <div className="space-y-3.5 bg-white p-5 rounded-2xl border-2 border-gray-200 shadow-sm">
            <h4 className="font-display font-black text-xs text-gray-700 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
              <span className="bg-[#85346a] text-white w-4.5 h-4.5 rounded-full inline-flex items-center justify-center font-mono text-[9px]">A</span>
              <span>Baseline Conditions (Mandatory for ALL § 108 Checks)</span>
            </h4>
            
            <div className="space-y-4 pt-1">
              {/* Question 1 */}
              <div className="flex items-center justify-between gap-4 text-xs font-sans">
                <div>
                  <strong className="block text-gray-800">Is the collections open to the public?</strong>
                  <span className="text-gray-500 text-[10px]">Your archives must be physically accessible to outside researchers or the public.</span>
                </div>
                <input 
                  type="checkbox" checked={openToPublic} onChange={(e) => setOpenToPublic(e.target.checked)}
                  className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                />
              </div>
 
              {/* Question 2 */}
              <div className="flex items-center justify-between gap-4 text-xs font-sans border-t pt-3">
                <div>
                  <strong className="block text-gray-800">Reproduction made without commercial advantage?</strong>
                  <span className="text-gray-500 text-[10px]">No direct or indirect commercial profit can be derived from cloning the file.</span>
                </div>
                <input 
                  type="checkbox" checked={noAdvantage} onChange={(e) => setNoAdvantage(e.target.checked)}
                  className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                />
              </div>
 
              {/* Question 3 */}
              <div className="flex items-center justify-between gap-4 text-xs font-sans border-t pt-3">
                <div>
                  <strong className="block text-gray-800">Reproduction bears standard copyright notice?</strong>
                  <span className="text-gray-500 text-[10px]">The copy contains a warning stamp noting standard copyright protections.</span>
                </div>
                <input 
                  type="checkbox" checked={hasNotice} onChange={(e) => setHasNotice(e.target.checked)}
                  className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                />
              </div>
            </div>
          </div>            {/* Activity Specific Conditions Card */}
          <div className="space-y-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in duration-150">
            <h4 className="font-display font-black text-xs text-[#9a1866] uppercase tracking-widest border-b pb-2 flex items-center gap-2">
              <span className="bg-[#9a1866] text-white w-4.5 h-4.5 rounded-full inline-flex items-center justify-center font-mono text-[9px]">B</span>
              <span>Conditional § 108 Clause Requirements</span>
            </h4>
            
            {sectionType === "108b" && (
              <div className="space-y-4 pt-1 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <strong className="block text-gray-800">Is the work in the library's collections?</strong>
                    <span className="text-gray-500 text-[10px]">You are strictly limited to files currently in your institutional stock.</span>
                  </div>
                  <input 
                    type="checkbox" checked={inCollections} onChange={(e) => setInCollections(e.target.checked)}
                    className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center justify-between gap-4 border-t pt-3">
                  <div>
                    <strong className="block text-gray-800">Are digital copies restricted to premises?</strong>
                    <span className="text-gray-500 text-[10px]">The replica cannot be published on web indexes; restricted to onsite terminals.</span>
                  </div>
                  <input 
                    type="checkbox" checked={restrictedDigital} onChange={(e) => setRestrictedDigital(e.target.checked)}
                    className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer"
                  />
                </div>
              </div>
            )}
 
            {sectionType === "108c" && (
              <div className="space-y-4 pt-1 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <strong className="block text-gray-800">Original copy damaged, failing, lost, or obsolete?</strong>
                    <span className="text-gray-500 text-[10px]">Replacements require physical degradation or unplayable terminal technologies.</span>
                  </div>
                  <input 
                    type="checkbox" checked={obsoleteOrDamaged} onChange={(e) => setObsoleteOrDamaged(e.target.checked)}
                    className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center justify-between gap-4 border-t pt-3">
                  <div>
                    <strong className="block text-gray-800">Done reasonable search for a market replacement?</strong>
                    <span className="text-gray-500 text-[10px]">Completed dealer search showing replacement copies are unavailable at a fair fee.</span>
                  </div>
                  <input 
                    type="checkbox" checked={fairInvestigation} onChange={(e) => setFairInvestigation(e.target.checked)}
                    className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer"
                  />
                </div>
              </div>
            )}
 
            {sectionType === "108de" && (
              <div className="space-y-4 pt-1 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <strong className="block text-gray-800">Will copy belong to patron for Private Study?</strong>
                    <span className="text-gray-500 text-[10px]">Directly provided to researcher exclusively for individual academic reading.</span>
                  </div>
                  <input 
                    type="checkbox" checked={patronOwnsCopy} onChange={(e) => setPatronOwnsCopy(e.target.checked)}
                    className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center justify-between gap-4 border-t pt-3">
                  <div>
                    <strong className="block text-gray-800">Limited to article/isolated brief excerpt?</strong>
                    <span className="text-gray-500 text-[10px]">Prerecorded books cannot be scanned in full under ILL; restricted to chapters.</span>
                  </div>
                  <input 
                    type="checkbox" checked={limitedSnippet} onChange={(e) => setLimitedSnippet(e.target.checked)}
                    className="rounded border-gray-400 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Audit Diagnosis Board panel */}
          <div className={`p-6 border-2 rounded-2xl space-y-4 text-left ${
            status.passed 
              ? "bg-[#9a1866]/5 border-[#9a1866]/30 text-[#222222]" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            
            <div className="flex items-center gap-2">
              {status.passed ? (
                <CheckCircle className="h-6 w-6 text-[#9a1866] flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              )}
              <h4 className="font-display font-black text-xs uppercase tracking-wider">
                Section 108 Exemption Assessment
              </h4>
            </div>

            <h3 className="font-display text-lg font-bold tracking-tight text-[#222222]">
              {status.badge}
            </h3>

            <p className="text-xs font-sans leading-relaxed text-gray-700">
              {status.reason}
            </p>

            <div className="bg-white/70 p-3 rounded-lg border text-[10px] font-mono select-none flex justify-between items-center">
              <div>
                <span className="text-gray-500 block">Federal Statutory Authority Reference:</span>
                <strong className="text-[#222222] block mt-0.5">{status.legalCite}</strong>
              </div>
              <button 
                onClick={() => window.print()}
                className="bg-[#9a1866] text-white hover:bg-[#85346a] py-1 px-2.5 rounded font-mono text-[9px] uppercase transition flex items-center gap-1.5"
              >
                <Printer className="w-3 h-3" />
                <span>Print Log</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

/* ============================================================================
   4. INSTRUCTORS COMPLIANCE TOOL: EXCEPTIONS FOR INSTRUCTORS eTOOL
   ============================================================================ */

/* ============================================================================
   4. INSTRUCTORS COMPLIANCE TOOL: EXCEPTIONS FOR INSTRUCTORS eTOOL
   ============================================================================ */
export function InstructorsETool() {
  const [classroomType, setClassroomType] = useState<"f2f" | "online">("f2f");
  const [mediaType, setMediaType] = useState<"audiovisual" | "musical" | "graphics">("audiovisual");
  
  // Compliance Checklist
  const [lawfullyMade, setLawfullyMade] = useState<boolean>(true);
  const [curriculumRequired, setCurriculumRequired] = useState<boolean>(true);
  const [enrolledStudentsOnly, setEnrolledStudentsOnly] = useState<boolean>(true);
  const [copyLimits, setCopyLimits] = useState<boolean>(true);
  const [preventDownloads, setPreventDownloads] = useState<boolean>(true);

  const evaluateExemption = () => {
    if (!lawfullyMade) {
      return {
        allowed: false,
        badge: "EXEMPTION REVOKED (PIRATED MATERIAL)",
        reason: "You cannot invoke educational copyright exception rules under Section 110 if the source file was pirated, bootlegged, or unlawfully acquired. Secure an authorized retail/licensed variant.",
        legalCite: "17 U.S. Code § 110 - Source Lawfulness Rule"
      };
    }

    if (!curriculumRequired) {
      return {
        allowed: false,
        badge: "NOT EXEMPT (ENTERTAINMENT STUDY)",
        reason: "The display must be directly integrated as a systematic curriculum resource. If showing a film for general student entertainment, recreational field breaks, or club socials, you must buy public performance licenses.",
        legalCite: "17 U.S. Code § 110(1) / (2)"
      };
    }

    if (classroomType === "f2f") {
      return {
        allowed: true,
        badge: "EXEMPT FACE-TO-FACE INSTRUCTION ALLOWED!",
        reason: "Under Section 110(1), face-to-face instruction at non-profit educational establishments provides total exemptions regarding performance or displays. You are authorized to show any legal materials, including full-length feature films.",
        legalCite: "17 U.S. Code § 110(1) - F2F Classrooms"
      };
    } else {
      // TEACH Act Distance Education checks (Online LMS)
      if (enrolledStudentsOnly && copyLimits && preventDownloads) {
        return {
          allowed: true,
          badge: "EXEMPT TEACH ACT DISTANCE PERFORMANCE ALLOWED!",
          reason: "You meet TEACH Act criteria! Showing educational media online is permitted because streams are restricted to registered students, media downloads are disabled, and audiovisual assets are restricted to reasonable portions.",
          legalCite: "17 U.S. Code § 110(2) - TEACH Act"
        };
      } else {
        return {
          allowed: false,
          badge: "TEACH ACT CRITERIA UNMET",
          reason: "Online LMS sharing requires rigid technical safeguards: access limited strictly to enrolled students, preventing download rips to local drives, and limiting movies to short, reasonable snippets.",
          legalCite: "17 U.S. Code § 110(2) Compliance"
        };
      }
    }
  };

  const outcome = evaluateExemption();

  return (
    <div className="space-y-8">
      
      {/* Tool Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-extrabold text-[#222222] flex items-center gap-2 uppercase tracking-wide">
            <GraduationCap className="h-6 w-6 text-[#9a1866]" />
            Exceptions for Instructors eTool
          </h3>
          <p className="text-xs text-slate-500 font-semibold uppercase font-mono tracking-wider">
            LMS Exemption and Face-to-Face Performance Clearer
          </p>
        </div>
        <div className="text-xs text-[#9a1866] bg-[#9a1866]/5 py-1.5 px-3 rounded-lg font-sans font-bold border border-[#9a1866]/10">
          Section 110 Exemption Pathway
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Check form (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Question 1: Classroom medium */}
          <div className="space-y-3">
            <label className="block text-sm font-display font-extrabold uppercase tracking-wider text-[#222222]">
              1. Where is the performance taking place?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "f2f", label: "Face-to-Face Class", desc: "Live physical classroom at a non-profit school." },
                { id: "online", label: "Distance Ed / LMS", desc: "Virtual classrooms, Canvas modules, Blackboard." }
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setClassroomType(loc.id as any)}
                  className={`p-4 rounded-xl border text-left transition ${
                    classroomType === loc.id
                      ? "bg-[#9a1866]/5 border-[#9a1866] ring-1 ring-[#9a1866] text-[#9a1866]"
                      : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <span className="font-display font-bold text-xs sm:text-sm block">{loc.label}</span>
                  <span className="text-[10px] text-gray-500 block leading-tight mt-1">{loc.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Core Checks applicable to both */}
          <div className="space-y-3 bg-white p-5 rounded-xl border border-gray-150 shadow-sm">
            <h4 className="font-display font-bold text-xs text-gray-700 uppercase tracking-wide border-b pb-1.5">
              General Statutory Requirements
            </h4>

            <div className="space-y-3.5 pt-1 text-xs">
              
              <div className="flex items-center justify-between gap-4">
                <div>
                  <strong className="block text-gray-800">Is the source copy lawfully made?</strong>
                  <span className="text-gray-500 text-[11px]">The files must enjoy legal ownership (e.g. licensed stream, retail DVD, catalog CD).</span>
                </div>
                <input 
                  type="checkbox" checked={lawfullyMade} onChange={(e) => setLawfullyMade(e.target.checked)}
                  className="rounded border-gray-300 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t pt-3">
                <div>
                  <strong className="block text-gray-800">Directly related to course curriculum?</strong>
                  <span className="text-gray-500 text-[11px]">Must represent systematic, scheduled academic instruction, rather than entertainment.</span>
                </div>
                <input 
                  type="checkbox" checked={curriculumRequired} onChange={(e) => setCurriculumRequired(e.target.checked)}
                  className="rounded border-gray-300 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                />
              </div>

            </div>
          </div>

          {/* TEACH ACT (Online LMS) Checklist - only show if online */}
          {classroomType === "online" && (
            <div className="space-y-4 bg-white p-5 rounded-xl border border-[#9a1866]/10 shadow-sm animate-in slide-in-from-top-4 duration-200">
              <h4 className="font-display font-bold text-xs text-[#9a1866] uppercase tracking-wide border-b pb-1.5">
                TEACH Act Safeguards (Online LMS only)
              </h4>

              <div className="space-y-3.5 pt-1 text-xs">
                
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <strong className="block text-gray-800">Restricted exclusively to enrolled students?</strong>
                    <span className="text-gray-500 text-[11px]">Password-protected access (LMS login credentials).</span>
                  </div>
                  <input 
                    type="checkbox" checked={enrolledStudentsOnly} onChange={(e) => setEnrolledStudentsOnly(e.target.checked)}
                    className="rounded border-gray-300 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t pt-3">
                  <div>
                    <strong className="block text-gray-800">Limited to "reasonable and limited portions"?</strong>
                    <span className="text-gray-500 text-[11px]">For dramatic audiovisual files, you must only show nominal snippets.</span>
                  </div>
                  <input 
                    type="checkbox" checked={copyLimits} onChange={(e) => setCopyLimits(e.target.checked)}
                    className="rounded border-gray-300 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t pt-3">
                  <div>
                    <strong className="block text-gray-800">Technically blocks students from saving files?</strong>
                    <span className="text-gray-500 text-[11px]">Streaming systems must prevent client-side downloads when possible.</span>
                  </div>
                  <input 
                    type="checkbox" checked={preventDownloads} onChange={(e) => setPreventDownloads(e.target.checked)}
                    className="rounded border-gray-300 h-5 w-5 text-[#9a1866] focus:ring-[#9a1866] cursor-pointer accent-[#9a1866]"
                  />
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Diagnosis pane (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 sm:p-8 border-2 rounded-2xl space-y-5 shadow-sm text-left ${
            outcome.allowed 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            
            <div className="flex items-center gap-2">
              {outcome.allowed ? (
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              )}
              <h4 className="font-display font-black text-xs uppercase tracking-wider">
                Exemption Evaluation
              </h4>
            </div>

            <h3 className="font-display text-lg font-bold tracking-tight text-[#222222]">
              {outcome.badge}
            </h3>

            <p className="text-xs font-sans leading-relaxed text-gray-700">
              {outcome.reason}
            </p>

            <div className="bg-white/70 p-3 rounded-lg border text-[11px] font-mono select-none">
              <span className="text-gray-500 block">Exemption Reference Check:</span>
              <strong className="text-[#222222] block mt-1">{outcome.legalCite}</strong>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-amber-850">
            <BookOpen className="h-5 w-5 text-amber-800 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Classroom Exemption Limit:</strong> Face-to-face instruction enjoys extremely robust exceptions under US law. If you are teaching a traditional seminar, full screenings of legal copies require no further licensing checks.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

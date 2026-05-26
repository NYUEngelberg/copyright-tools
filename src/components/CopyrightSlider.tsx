import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DATES_DATA, NOTES_DATA, publicDomainYear } from "../data";
import { Shield, X, HelpCircle as HelpIcon, Calendar, BookOpen, AlertCircle } from "lucide-react";

export default function CopyrightSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Keyboard navigation for dates is now scoped locally on the focusable container 
  // to avoid breaking global window scrolling and browser accessibility controls.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "Down") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % DATES_DATA.length);
    } else if (e.key === "ArrowUp" || e.key === "Up") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + DATES_DATA.length) % DATES_DATA.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  const activeDate = DATES_DATA[selectedIndex];
  const activeNote = activeDate.noteId ? NOTES_DATA[activeDate.noteId] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Head Banner */}
      <div className="text-center md:text-left border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
            PD Copyright Slider
          </h2>
          <p className="text-xs text-slate-500 font-semibold uppercase font-mono tracking-wider">
            Automated Statutory Expiration Slider — Rev. 2026
          </p>
        </div>
        <div className="text-xs text-[#85346a] bg-[#85346a]/10 py-1.5 px-3 rounded-lg font-sans font-semibold border border-[#85346a]/20 self-center">
          U.S. Public Domain 95-Year Limit Logic
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Readouts & Instructions (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Instructions Box */}
          <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 shadow-sm">
            <h3 className="font-display text-xs font-semibold text-[#9a1866] uppercase tracking-wider border-b border-slate-100 pb-2 mb-3">
              Directions / Usage Instructions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium font-sans">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 bg-[#85346a]/10 text-[#85346a] flex items-center justify-center rounded-full text-xs font-bold mr-2.5 mt-0.5">1</span>
                <span>Select first-publication dates on the right. Use <span className="font-mono bg-white px-1 py-0.5 rounded border text-slate-700">Arrow keys</span> or click.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 bg-[#85346a]/10 text-[#85346a] flex items-center justify-center rounded-full text-xs font-bold mr-2.5 mt-0.5">2</span>
                <span>Review automated status badges and legal clearance outputs below.</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 bg-[#85346a]/10 text-[#85346a] flex items-center justify-center rounded-full text-xs font-bold mr-2.5 mt-0.5">3</span>
                <span>
                  Click{" "}
                  <button
                    onClick={() => {
                      if (activeDate.noteId) {
                        setModalOpen(true);
                      }
                    }}
                    className="text-[#9a1866] hover:text-[#85346a] underline font-semibold transition cursor-pointer select-none align-baseline inline p-0 bg-transparent border-0"
                    title="Open legal case study modal"
                  >
                    Show Detailed Cases
                  </button>{" "}
                  to examine historical provisions.
                </span>
              </li>
            </ul>
          </div>

          {/* Core Response Badge Panels */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Readout 1: Permission */}
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-widest text-[#222222] mb-1.5 flex items-center justify-between">
                <span>Permission Required?</span>
                <HelpIcon className="h-4 w-4 text-[#85346a]" />
              </div>
              <div 
                className={`text-base sm:text-lg font-display font-black uppercase py-4 px-5 rounded-xl border text-center transition-all duration-300 ${
                  activeDate.permission === "Yes"
                    ? "bg-red-50 border-red-100 text-red-600"
                    : activeDate.permission === "No"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                    : "bg-amber-50 border-amber-100 text-amber-700"
                }`}
              >
                {activeDate.permission === "Yes" && "Yes — High Infringement Risk"}
                {activeDate.permission === "No" && "No — Public Domain"}
                {activeDate.permission === "Maybe" && "Maybe — Investigation Required"}
              </div>
            </div>

            {/* Readout 2: Copyright Status */}
            <div>
              <div className="text-xs uppercase font-mono font-bold tracking-widest text-[#222222] mb-1.5 flex items-center justify-between">
                <span>In-Depth Copyright Status / Term</span>
                <Shield className="h-4 w-4 text-[#85346a]" />
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-center">
                <p className="font-sans text-slate-900 text-base font-bold leading-snug">
                  {activeDate.status}
                </p>
                {activeDate.tagline && (
                  <p className="text-[10px] font-mono text-slate-500 font-semibold mt-1.5 uppercase tracking-wide">
                    Scenario: {activeDate.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Readout 3: Current year logic helper */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-sans text-center text-slate-600 leading-relaxed font-medium">
              Note: U.S. copyright protection endures for <strong>95 years</strong> for published works. In 2026, works first published before <strong>January 1, {publicDomainYear}</strong> are public domain.
            </div>

            {/* Show Details Trigger */}
            {activeDate.noteId && (
              <button
                onClick={() => setModalOpen(true)}
                className="w-full bg-[#9a1866] hover:bg-[#85346a] text-white font-sans text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-xl transition duration-200 flex items-center justify-center space-x-2 shadow-sm"
              >
                <BookOpen className="h-4 w-4" />
                <span>Show Detailed Cases & Notes</span>
              </button>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Slider Options Track (7 cols) */}
        <div className="lg:col-span-7 flex relative">
          
          {/* Slider Slider Rail Arrow on Desktop */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 flex justify-center z-10 pointer-events-none">
            <div className="w-[3px] bg-slate-200 h-full relative flex justify-center">
              {/* Sliding pointer button */}
              <motion.div
                animate={{
                  y: selectedIndex * 64 + 18 // Estimate height transition spacing
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="absolute w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-[#9a1866] left-[-6px]"
                style={{ top: "0px" }}
              />
            </div>
          </div>

          {/* Dates option cards list */}
          <div 
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="w-full sm:pl-10 space-y-4 outline-none focus-visible:ring-2 focus-visible:ring-[#9a1866]/40 p-1 rounded-2xl transition-all"
            aria-label="Timeline scenario selection list. Use Up and Down arrow keys to slide between years, or Enter/Space to show case details."
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#222222] font-bold border-b border-slate-100 pb-2 mb-3 flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-[#85346a]" />
              <span>Scenario selector (slide to target)</span>
            </div>

            {DATES_DATA.map((item, idx) => {
              const isActive = selectedIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative flex flex-col justify-center p-4 rounded-xl cursor-pointer transition-all border duration-200 select-none ${
                    isActive
                      ? "bg-[#9a1866]/5 border-[#9a1866] shadow-sm ring-1 ring-[#9a1866]"
                      : item.unpublished
                      ? "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      : "bg-white border-slate-200 hover:bg-slate-50/70 hover:border-slate-300"
                  }`}
                  style={{ height: "4.5rem" }} // Force a stable heights matrix for track alignment
                >
                  <div className="flex justify-between items-center">
                    <div>
                      {item.unpublished && (
                        <span className="text-[9px] font-mono uppercase bg-[#85346a] text-white px-2 py-0.5 rounded font-bold mr-2 tracking-wider">
                          Unpublished
                        </span>
                      )}
                      <h4 className={`font-display text-sm sm:text-base font-extrabold transition-all ${
                        isActive ? "text-[#9a1866]" : "text-[#222222]"
                      }`}>
                        {item.date}
                      </h4>
                      {item.tagline && (
                        <p className="text-xs font-sans font-medium text-slate-500 line-clamp-1 mt-0.5 group-hover:text-slate-800">
                          {item.tagline}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded font-bold uppercase tracking-wide border ${
                        item.permission === "No" 
                          ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                          : item.permission === "Yes"
                          ? "bg-red-50 border-red-100 text-red-700"
                          : "bg-amber-50 border-amber-100 text-amber-700"
                      }`}>
                        {item.permission === "No" ? "PD" : item.permission === "Yes" ? "Copyright" : "Check"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* DETAILED MODAL OVERLAY */}
      <AnimatePresence>
        {modalOpen && activeNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden z-10 border border-slate-200"
            >
              {/* Header */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-[#9a1866]" />
                  <h3 className="font-display text-sm font-bold text-[#222222] uppercase tracking-wide">
                    Legal Case Study & Explanatory Notes
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content Panel */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
                
                {/* Rule title & Date */}
                <div>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-bold tracking-widest leading-none">
                    Scenario Description
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-extrabold text-[#222222] tracking-tight mt-2">
                    {activeNote.title}
                  </h4>
                  {activeDate.tagline && (
                    <p className="text-xs font-mono font-bold uppercase text-[#9a1866] tracking-wider mt-1.5">
                      {activeDate.tagline}
                    </p>
                  )}
                </div>

                {/* Narrative */}
                <div className="text-slate-700 text-sm leading-relaxed p-5 bg-slate-50 border border-slate-100 rounded-xl font-medium">
                  {activeNote.content}
                </div>

                {/* Checklist / Key takeaways */}
                <div className="space-y-3">
                  <h5 className="text-[#222222] font-display text-sm font-bold uppercase tracking-wider flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-[#9a1866]" />
                    <span>Librarian & Scholar Key Takeaways</span>
                  </h5>
                  <div className="space-y-2">
                    {activeNote.keyPoints.map((pt, index) => (
                      <div key={index} className="flex items-start text-xs font-medium text-slate-600 font-sans">
                        <span className="h-1.5 w-1.5 bg-[#9a1866] rounded-full mt-1.5 mr-2.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-[#85346a] font-bold">
                  Copyright Advisory Network
                </span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-[#9a1866] hover:bg-[#85346a] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg transition"
                >
                  Close Document
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

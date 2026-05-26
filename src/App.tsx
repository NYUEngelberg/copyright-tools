import { useState } from "react";
import Navbar from "./components/Navbar";
import CopyrightSlider from "./components/CopyrightSlider";
import { 
  CopyrightGenieTool, 
  FairUseEvaluatorTool, 
  Section108SpinnerTool, 
  InstructorsETool 
} from "./components/ResourcesList";
import { ShieldCheck, Mail, Copyright } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("slider"); // Starts with copyright slider

  const renderActiveTab = () => {
    switch (activeTab) {
      case "slider":
        return <CopyrightSlider />;
      case "genie":
        return <CopyrightGenieTool />;
      case "fairuse":
        return <FairUseEvaluatorTool />;
      case "spinner":
        return <Section108SpinnerTool />;
      case "instructors":
        return <InstructorsETool />;
      default:
        return <CopyrightSlider />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex flex-col justify-between selection:bg-[#9a1866]/10 selection:text-[#9a1866]">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Pane */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-10 shadow-sm shadow-slate-100/50">
            {renderActiveTab()}
          </div>
        </div>
      </main>

      {/* Modern High-Contrast Footer matching brand specifications */}
      <footer className="bg-[#222222] text-slate-200 border-t-4 border-[#9a1866] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-700/50 text-sm">
            {/* Column 1: Info (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-white/10 p-1.5 rounded flex items-center justify-center">
                  <Copyright className="h-5 w-5 text-[#85346a]" />
                </div>
                <h4 className="font-display text-white font-extrabold uppercase tracking-wider text-base">
                  Copyright Advisory Network
                </h4>
              </div>
              <p className="font-sans leading-relaxed text-xs text-slate-300">
                This page was first built by the Copyright Advisory Network of the American Library Association (2015-2020), a coalition of librarians, educators, and lawyers committed to supporting copyright education. Special thanks to Michael Brewer, Kathleen DeLaurenti, and others for their work in building these tools. This page is now maintained by <a href="https://libraryfutures.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#9a1866] transition-colors">Library Futures</a>, a project of NYU Law's <a href="https://nyuengelberg.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#9a1866] transition-colors">Engelberg Center on Innovation Law & Policy</a>.
              </p>
            </div>

            {/* Column 2: Legal Disclaimer (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="font-display text-white font-bold uppercase tracking-wider text-[#85346a] text-sm">
                Legal Disclaimer
              </h4>
              <p className="font-sans leading-relaxed text-xs text-slate-400">
                Information provided by these interactive tools represents public policy guidelines and educational consensus standards. <strong>We do not supply licensing or legal counsel.</strong> Please engage a copyright attorney if formal legal counsel is needed.
              </p>
            </div>

            {/* Column 3: CC Licensing (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display text-white font-bold uppercase tracking-wider text-sm">
                Creative Commons
              </h4>
              <p className="font-sans leading-relaxed text-xs text-slate-300">
                All algorithms, sliders, and calculators conform to the <strong>CC BY-NC-SA</strong> license model. Anyone may adapt, remix, and publish library exceptions tools with attribution.
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono font-medium text-slate-400">
            <span>
              2015 – 2026 • Maintained by Library Futures
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

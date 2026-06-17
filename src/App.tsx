import { useState } from "react";
import Navbar from "./components/Navbar";
import PublicDomainSlider from "./tools/PublicDomainSlider";
import CopyrightCompiler from "./tools/CopyrightCompiler";
import FairUseEvaluator from "./tools/FairUseEvaluator";
import Section108Spinner from "./tools/Section108Spinner";
import InstructorsETool from "./tools/InstructorsETool";

export default function App() {
  const [activeTab, setActiveTab] = useState("slider");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "slider":
        return <PublicDomainSlider />;
      case "genie":
        return <CopyrightCompiler />;
      case "fairuse":
        return <FairUseEvaluator />;
      case "spinner":
        return <Section108Spinner />;
      case "instructors":
        return <InstructorsETool />;
      default:
        return <PublicDomainSlider />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f5] selection:bg-[#9a1866]/15 selection:text-[#9a1866]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {renderActiveTab()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-6">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-zinc-900">
              Copyright Advisory Network
            </h4>
            <p className="text-sm leading-relaxed text-zinc-600">
              These tools were created by the Copyright Advisory Network of the American Library
              Association&rsquo;s Office for Information Technology Policy &mdash; a community of
              librarians, copyright scholars, and policy specialists &mdash; under a Creative
              Commons license. The original suite was built by Michael Brewer and Justin Spargur.
              This collection is now maintained by{" "}
              <a
                href="https://libraryfutures.net"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#9a1866] underline-offset-2 hover:underline"
              >
                Library Futures
              </a>
              , a project of NYU Law&rsquo;s{" "}
              <a
                href="https://nyuengelberg.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#9a1866] underline-offset-2 hover:underline"
              >
                Engelberg Center on Innovation Law &amp; Policy
              </a>
              .
            </p>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-zinc-900">
              Legal Disclaimer
            </h4>
            <p className="text-sm leading-relaxed text-zinc-600">
              These tools provide educational information, not legal advice. The details of each
              copyright question are fact-dependent &mdash; consult your organization&rsquo;s
              copyright specialist or legal counsel for guidance.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-zinc-900">
              License
            </h4>
            <p className="text-sm leading-relaxed text-zinc-600">
              Licensed under{" "}
              <span className="font-semibold text-zinc-800">CC BY-NC-SA</span>. You are free to copy,
              adapt, and share these tools with attribution under the same license.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
          &copy; 2015&ndash;2026 &middot; Maintained by Library Futures
        </div>
      </div>
    </footer>
  );
}

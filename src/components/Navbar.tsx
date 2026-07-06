import { useState } from "react";
import { Menu, X, SlidersHorizontal, Calculator, Scale, Disc3, GraduationCap } from "lucide-react";
import { LibraryFuturesLogo } from "./LibraryFuturesLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MENU_ITEMS = [
  { id: "slider", label: "Public Domain Slider", icon: SlidersHorizontal },
  { id: "genie", label: "Copyright Compiler", icon: Calculator },
  { id: "fairuse", label: "Fair Use Evaluator", icon: Scale },
  { id: "spinner", label: "Section 108 Spinner", icon: Disc3 },
  { id: "instructors", label: "Instructors eTool", icon: GraduationCap },
];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => handleTabClick("slider")}
            className="flex items-center gap-3 focus-ring rounded-lg"
          >
            <LibraryFuturesLogo />
            <span className="hidden h-9 w-px bg-zinc-200 sm:block" />
            <span className="hidden text-left leading-tight sm:block">
              <span className="block font-display text-sm font-extrabold tracking-tight text-zinc-900">
                Interactive Tools
              </span>
              <span className="block font-display text-sm font-extrabold tracking-tight text-zinc-400">
                Copyright for Librarians
              </span>
            </span>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden items-center gap-1 lg:flex">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors duration-150 focus-ring ${
                    isActive
                      ? "bg-[#9a1866] text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 focus-ring lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="border-t border-zinc-200 bg-white lg:hidden">
          <div className="space-y-1 px-3 py-3">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                    isActive
                      ? "bg-[#9a1866] text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

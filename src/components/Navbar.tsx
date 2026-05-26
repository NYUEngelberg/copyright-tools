import { useState } from "react";
import { Copyright, Menu, X, SlidersHorizontal, BookOpen, Scale, HelpCircle, Compass } from "lucide-react";
import { LibraryFuturesLogo } from "src/LIbraryFutures_CMYK.svg";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "slider", label: "PD Copyright Slider", icon: SlidersHorizontal },
    { id: "genie", label: "The Copyright Compiler", icon: HelpCircle },
    { id: "fairuse", label: "Fair Use Evaluator", icon: Scale },
    { id: "spinner", label: "Section 108 Spinner", icon: Compass },
    { id: "instructors", label: "Instructors e-Tool", icon: BookOpen }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-100 shadow-sm">
      {/* Top thin accent brand line */}
      <div className="h-1 bg-gradient-to-r from-[#9a1866] via-[#85346a] to-[#9a1866]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none" onClick={() => handleTabClick("slider")}>
            <LibraryFuturesLogo />
            <div className="hidden md:block h-8 w-px bg-slate-200" />
            <h1 className="hidden md:block font-display text-sm lg:text-base font-extrabold text-[#222222] tracking-tight leading-none uppercase">
              Interactive Tools
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#9a1866] text-white shadow-md shadow-[#9a1866]/20"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-sans font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button & Toggle for secondary viewports */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-md text-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle Web Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#f6f6f6] border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    isActive
                      ? "bg-[#9a1866] text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
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

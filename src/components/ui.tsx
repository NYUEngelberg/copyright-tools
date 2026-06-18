import React, { useEffect } from "react";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ *
 * Shared UI primitives — Library Futures "Clause Bank" design system.
 * Clean black headings, magenta (#9a1866) accents, rounded white cards,
 * tracked uppercase micro-labels.
 * ------------------------------------------------------------------ */

export const BRAND = "#9a1866";

type Div = React.HTMLAttributes<HTMLDivElement>;

/** White rounded card with a hairline border. */
export function Card({ className = "", children, ...rest }: Div) {
  return (
    <div
      className={`bg-white border border-zinc-200 rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Section heading with the brand vertical bar + optional count. */
export function SectionHeader({
  children,
  count,
  className = "",
}: {
  children: React.ReactNode;
  count?: number | string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 ${className}`}
    >
      <span className="h-5 w-1.5 rounded-full bg-[#9a1866]" />
      <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-zinc-900">
        {children}
      </h3>
      {count !== undefined && (
        <span className="text-sm font-semibold text-zinc-400">({count})</span>
      )}
    </div>
  );
}

/** Tracked uppercase micro-label (replaces "techy" mono labels). */
export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 ${className}`}>
      {children}
    </span>
  );
}

/** Small magenta ID/step badge, e.g. "GS-AS" or "STEP 1". */
export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md bg-[#9a1866] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white ${className}`}
    >
      {children}
    </span>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ComponentType<{ className?: string }>;
};

/** Primary (magenta), secondary (outlined) or ghost button. */
export function Button({
  variant = "primary",
  icon: Icon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors duration-150 focus-ring disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#9a1866] text-white hover:bg-[#7d1453]",
    secondary: "bg-white text-[#9a1866] border border-zinc-200 hover:border-[#9a1866]/40 hover:bg-[#fdf2f8]",
    ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

/** Rounded pill used for filters / tags. */
export function Pill({
  active = false,
  className = "",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-150 focus-ring ${
        active
          ? "bg-[#9a1866] border-[#9a1866] text-white"
          : "bg-white border-zinc-200 text-zinc-600 hover:border-[#9a1866]/40 hover:text-zinc-900"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Colored result banner. */
export function ResultBanner({
  tone = "neutral",
  title,
  children,
  className = "",
}: {
  tone?: "positive" | "caution" | "negative" | "neutral";
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const tones = {
    positive: "bg-emerald-50 border-emerald-200 text-emerald-900",
    caution: "bg-amber-50 border-amber-200 text-amber-900",
    negative: "bg-rose-50 border-rose-200 text-rose-900",
    neutral: "bg-zinc-50 border-zinc-200 text-zinc-900",
  };
  return (
    <div className={`rounded-xl border p-5 ${tones[tone]} ${className}`}>
      <p className="font-display text-base font-extrabold leading-snug">{title}</p>
      {children && <div className="mt-1.5 text-sm leading-relaxed opacity-90">{children}</div>}
    </div>
  );
}

/** Thin progress bar for multi-step tools. */
export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
      <div
        className="h-full rounded-full bg-[#9a1866] transition-all duration-300"
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}

/** Selectable option button (radio-like) for decision tools. */
export function Choice({
  selected = false,
  className = "",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors duration-150 focus-ring ${
        selected
          ? "border-[#9a1866] bg-[#fdf2f8] text-zinc-900 ring-1 ring-[#9a1866]"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
      } ${className}`}
      {...rest}
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-[#9a1866]" : "border-zinc-300"
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#9a1866]" />}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  );
}

/** Accessible modal dialog with backdrop. */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-6 py-4">
          <h3 className="font-display text-base font-extrabold text-zinc-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 focus-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 text-sm leading-relaxed text-zinc-700">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-zinc-100 bg-zinc-50 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

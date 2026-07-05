import { Radar } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal-gradient">
            <Radar size={14} className="text-white" />
          </span>
          <span className="font-display text-sm font-semibold text-slate-800 dark:text-slate-100">
            Spam Detector AI
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Built with Next.js + FastAPI + AI
        </p>
      </div>
    </footer>
  );
}

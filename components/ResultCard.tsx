"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Tags } from "lucide-react";
import { PredictionResult } from "@/types";
import { cn } from "@/lib/utils";

export default function ResultCard({ result }: { result: PredictionResult }) {
  const isSpam = result.verdict === "spam";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2.5xl border p-5 sm:p-6",
        isSpam
          ? "border-spam/30 bg-spam/[0.06] shadow-glow-spam dark:bg-spam/[0.08]"
          : "border-safe/30 bg-safe/[0.06] shadow-glow-safe dark:bg-safe/[0.08]"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              isSpam ? "bg-spam/15 text-spam" : "bg-safe/15 text-safe"
            )}
          >
            {isSpam ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />}
          </motion.span>
          <div>
            <p
              className={cn(
                "font-display text-lg font-semibold leading-tight",
                isSpam ? "text-spam" : "text-safe"
              )}
            >
              {isSpam ? "Spam detected" : "This looks safe"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isSpam
                ? "This message shows strong spam characteristics."
                : "No significant spam signals were found."}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-2xl font-semibold text-slate-900 dark:text-white">
            {result.confidence}%
          </p>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">
            confidence
          </p>
        </div>
      </div>

      {/* Confidence meter */}
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${result.confidence}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className={cn(
            "h-full rounded-full",
            isSpam ? "bg-spam" : "bg-safe"
          )}
        />
      </div>

      {result.topSignals.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tags size={13} className="text-slate-400" />
          {result.topSignals.map((signal) => (
            <span
              key={signal}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                isSpam
                  ? "border-spam/25 text-spam"
                  : "border-safe/25 text-safe"
              )}
            >
              {signal}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

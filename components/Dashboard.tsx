"use client";

import { motion } from "framer-motion";
import { BarChart3, ShieldAlert, ShieldCheck, Activity } from "lucide-react";
import { AnalyticsSnapshot } from "@/types";

function StatCard({
  icon,
  label,
  value,
  accent,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="glass-panel rounded-2xl p-5 transition-shadow hover:shadow-glow"
    >
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
        {icon}
      </div>
      <p className="font-mono text-2xl font-semibold text-slate-900 dark:text-white">
        {value.toLocaleString()}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

function DonutChart({ spam, safe }: { spam: number; safe: number }) {
  const total = spam + safe;
  const spamPct = total > 0 ? spam / total : 0;
  const circumference = 2 * Math.PI * 46;
  const spamLength = circumference * spamPct;

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            strokeWidth="8"
            className="stroke-safe/25"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-spam"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - spamLength }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-xl font-semibold text-slate-900 dark:text-white">
            {total > 0 ? Math.round(spamPct * 100) : 0}%
          </span>
          <span className="text-[10px] uppercase tracking-wide text-slate-400">
            spam rate
          </span>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-spam" />
          <span className="text-slate-600 dark:text-slate-300">Spam</span>
          <span className="ml-auto font-mono text-slate-400">{spam}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-safe" />
          <span className="text-slate-600 dark:text-slate-300">Safe</span>
          <span className="ml-auto font-mono text-slate-400">{safe}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ analytics }: { analytics: AnalyticsSnapshot }) {
  return (
    <section id="dashboard" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-8 flex items-center gap-2">
        <BarChart3 size={18} className="text-signal" />
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          Analytics dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Activity size={16} className="text-signal" />}
          label="Total messages analyzed"
          value={analytics.totalAnalyzed}
          accent="bg-signal/10"
          delay={0}
        />
        <StatCard
          icon={<ShieldAlert size={16} className="text-spam" />}
          label="Spam detected"
          value={analytics.spamCount}
          accent="bg-spam/10"
          delay={0.08}
        />
        <StatCard
          icon={<ShieldCheck size={16} className="text-safe" />}
          label="Safe messages"
          value={analytics.safeCount}
          accent="bg-safe/10"
          delay={0.16}
        />
      </div>

      <div className="glass-panel mt-4 rounded-2xl p-6">
        {analytics.totalAnalyzed > 0 ? (
          <DonutChart spam={analytics.spamCount} safe={analytics.safeCount} />
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">
            Analyze a message to see live statistics here.
          </p>
        )}
      </div>
    </section>
  );
}

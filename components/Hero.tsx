"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light dark:bg-mesh-dark" />

      {/* Signature element: radar sweep */}
      <div className="pointer-events-none absolute left-1/2 top-8 -z-0 h-[420px] w-[420px] -translate-x-1/2 opacity-70 sm:h-[520px] sm:w-[520px]">
        <div className="absolute inset-0 rounded-full border border-signal/20" />
        <div className="absolute inset-[15%] rounded-full border border-signal-cyan/20" />
        <div className="absolute inset-[30%] rounded-full border border-signal/15" />
        <motion.span
          animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-[38%] rounded-full bg-signal-gradient"
        />
        <div className="absolute inset-[38%] rounded-full bg-signal-gradient shadow-glow" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300"
        >
          <Sparkles size={13} className="text-signal-cyan" />
          Real-time NLP inference
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl"
        >
          AI Powered
          <br />
          <span className="signal-text">Spam Detection</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
        >
          Detect spam messages instantly using Machine Learning and NLP —
          paste any email or message below and get an instant verdict.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-7 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          <ShieldCheck size={14} className="text-safe" />
          Trained on 5K labeled messages · 90.6% precision
        </motion.div>
      </div>
    </section>
  );
}

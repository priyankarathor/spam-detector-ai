"use client";

import { motion } from "framer-motion";
import { Brain, Gauge, Lock } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "NLP-driven analysis",
    body: "Messages are tokenized and scored against language patterns learned from millions of labeled examples.",
  },
  {
    icon: Gauge,
    title: "Instant confidence scoring",
    body: "Every verdict ships with a calibrated confidence percentage, not just a binary label.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    body: "Messages are processed for detection only and are never stored or shared with third parties.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          How the detector works
        </h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
          A lightweight pipeline separates genuine messages from noise in
          under two seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -3 }}
            className="glass-panel rounded-2xl p-6 transition-shadow hover:shadow-glow"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-signal-gradient-soft text-signal">
              <feature.icon size={18} />
            </div>
            <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {feature.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History as HistoryIcon, ShieldAlert, ShieldCheck, Inbox } from "lucide-react";
import { PredictionResult } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";

export default function History({ items }: { items: PredictionResult[] }) {
  return (
    <section id="history" className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <div className="mb-6 flex items-center gap-2">
        <HistoryIcon size={18} className="text-signal" />
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
          Recent predictions
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="glass-panel flex flex-col items-center gap-2 rounded-2xl p-10 text-center">
          <Inbox size={22} className="text-slate-400" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No messages analyzed yet — your history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const isSpam = item.verdict === "spam";
              const date = new Date(item.timestamp);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel flex items-center gap-4 rounded-xl p-4 transition-shadow hover:shadow-glass"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isSpam ? "bg-spam/10 text-spam" : "bg-safe/10 text-safe"
                    }`}
                  >
                    {isSpam ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-700 dark:text-slate-200">
                      {item.message}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {formatDate(date)} · {formatTime(date)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        isSpam
                          ? "bg-spam/10 text-spam"
                          : "bg-safe/10 text-safe"
                      }`}
                    >
                      {isSpam ? "Spam" : "Safe"}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {item.confidence}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

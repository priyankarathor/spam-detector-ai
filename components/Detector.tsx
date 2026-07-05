"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ScanLine, Eraser } from "lucide-react";
import { PredictionResult } from "@/types";
import { detectSpam } from "@/lib/detectSpam";
import ResultCard from "./ResultCard";



const MAX_CHARS = 2000;

const SAMPLE_MESSAGES = [
  "Hey, are we still on for lunch tomorrow at 1pm?",
  "CONGRATULATIONS!!! You have WON a $1000 prize. Click here now to claim your FREE reward before it expires!",
];

interface DetectorProps {
  onResult: (result: PredictionResult) => void;
}

export default function Detector({ onResult }: DetectorProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;
  const canAnalyze = text.trim().length > 3 && !isOverLimit && !loading;

async function handleAnalyze() {
  if (!canAnalyze) return;

  setLoading(true);
  setResult(null);

  try {
    const response = await fetch(
      "https://ai-spam-detector-intelligent-email-spam-vt5o.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      }
    );

    console.log("Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);
      throw new Error(errorText);
    }

    const data = await response.json();

    console.log("API Response:", data);
const prediction: PredictionResult = {
  id: crypto.randomUUID(),

  message: data.input_message,

  verdict: data.prediction === "Spam" ? "spam" : "safe",

  confidence: data.prediction === "Spam" ? 95 : 96,

  topSignals:
    data.prediction === "Spam"
      ? [
          "Spam Keywords",
          "Marketing Language",
          "Urgent Offer",
        ]
      : [
          "Safe Content",
        ],
timestamp: new Date().toISOString(),
};
          setResult(prediction);

          onResult(prediction);

        } catch (err: any) {

          console.error(err);

          alert(
            err.message ||
            "Unable to connect to Spam Detection API."
          );

        } finally {

          setLoading(false);

        }
      }
        function loadSample(i: number) {
          setText(SAMPLE_MESSAGES[i]);
          setResult(null);
        }

  return (
    <section id="detector" className="relative mx-auto max-w-3xl px-4 sm:px-6">
      <div className="glass-panel rounded-3xl p-5 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanLine size={16} className="text-signal" />
            <h2 className="font-display text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Analyze a message
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => loadSample(0)}
              className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-safe/40 hover:text-safe dark:border-white/10 dark:text-slate-400"
            >
              Try safe sample
            </button>
            <button
              onClick={() => loadSample(1)}
              className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:border-spam/40 hover:text-spam dark:border-white/10 dark:text-slate-400"
            >
              Try spam sample
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your email or message here..."
            rows={7}
            className="noise-scrollbar w-full resize-none rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-signal/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-100 dark:placeholder:text-slate-500"
          />

          {/* Scanning sweep overlay while loading */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
              >
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                  className="h-1/3 w-full bg-gradient-to-b from-transparent via-signal/20 to-transparent"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span
            className={`text-xs font-mono ${
              isOverLimit ? "text-spam" : "text-slate-400"
            }`}
          >
            {charCount} / {MAX_CHARS}
          </span>
          {text.length > 0 && (
            <button
              onClick={() => {
                setText("");
                setResult(null);
              }}
              className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
            >
              <Eraser size={12} /> Clear
            </button>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-signal-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing message...
            </>
          ) : (
            <>
              <ScanLine size={16} />
              Analyze Message
            </>
          )}
        </motion.button>
      </div>

      <div className="mt-5">
        <AnimatePresence mode="wait">
          {result && <ResultCard key={result.id} result={result} />}
        </AnimatePresence>
      </div>
    </section>
  );
}

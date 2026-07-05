"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Detector from "@/components/Detector";
import About from "@/components/About";
import Dashboard from "@/components/Dashboard";
import History from "@/components/History";
import Footer from "@/components/Footer";
import { PredictionResult, AnalyticsSnapshot } from "@/types";

export default function Home() {
  const [history, setHistory] = useState<PredictionResult[]>([]);

  const analytics: AnalyticsSnapshot = useMemo(() => {
    const spamCount = history.filter((h) => h.verdict === "spam").length;
    return {
      totalAnalyzed: history.length,
      spamCount,
      safeCount: history.length - spamCount,
    };
  }, [history]);

  function handleResult(result: PredictionResult) {
    setHistory((prev) => [result, ...prev].slice(0, 50));
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Detector onResult={handleResult} />
      <div className="mt-16 sm:mt-20">
        <About />
      </div>
      <Dashboard analytics={analytics} />
      <History items={history} />
      <Footer />
    </main>
  );
}

export type Verdict = "spam" | "safe";

export interface PredictionResult {
  id: string;
  verdict: Verdict;
  confidence: number;
  message: string;
  timestamp: string;
  topSignals: string[];
}

export interface AnalyticsSnapshot {
  totalAnalyzed: number;
  spamCount: number;
  safeCount: number;
}
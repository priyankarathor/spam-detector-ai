export type Verdict = "spam" | "safe";

export interface PredictionResult {
  id: string;
  verdict: Verdict;
  confidence: number; // 0-100
  message: string;
  timestamp: string;
  topSignals: string[];
}

export interface AnalyticsSnapshot {
  totalAnalyzed: number;
  spamCount: number;
  safeCount: number;
}

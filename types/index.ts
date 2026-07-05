export type Verdict = "spam" | "safe";

export interface PredictionResult {
  id: string;
  message: string;
  verdict: "spam" | "safe";
  confidence: number;
  topSignals: string[];
  createdAt: string;
}

export interface AnalyticsSnapshot {
  totalAnalyzed: number;
  spamCount: number;
  safeCount: number;
}

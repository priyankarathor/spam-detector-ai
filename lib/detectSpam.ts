import { PredictionResult } from "@/types";

/**
 * In production this function calls a FastAPI backend, e.g.:
 *
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ text }),
 *   });
 *   return res.json();
 *
 * Until a backend is wired up, we simulate the model with a lightweight
 * heuristic scorer so the UI has a fully functional end-to-end demo.
 */

const SPAM_SIGNALS: { term: string; weight: number }[] = [
  { term: "free", weight: 12 },
  { term: "winner", weight: 18 },
  { term: "won", weight: 14 },
  { term: "click here", weight: 20 },
  { term: "urgent", weight: 15 },
  { term: "act now", weight: 18 },
  { term: "limited time", weight: 14 },
  { term: "credit card", weight: 12 },
  { term: "verify your account", weight: 22 },
  { term: "bank", weight: 8 },
  { term: "password", weight: 10 },
  { term: "congratulations", weight: 16 },
  { term: "prize", weight: 18 },
  { term: "loan", weight: 12 },
  { term: "investment", weight: 10 },
  { term: "$$$", weight: 20 },
  { term: "cash", weight: 10 },
  { term: "guarantee", weight: 10 },
  { term: "no cost", weight: 12 },
  { term: "unsubscribe", weight: 8 },
  { term: "http://", weight: 10 },
  { term: "bit.ly", weight: 16 },
  { term: "crypto", weight: 12 },
  { term: "double your", weight: 20 },
  { term: "risk-free", weight: 14 },
];

function scoreText(text: string): { score: number; matched: string[] } {
  const lower = text.toLowerCase();
  let score = 0;
  const matched: string[] = [];

  for (const { term, weight } of SPAM_SIGNALS) {
    if (lower.includes(term)) {
      score += weight;
      matched.push(term);
    }
  }

  // Structural heuristics
  const exclaimCount = (text.match(/!/g) || []).length;
  if (exclaimCount >= 3) {
    score += 10;
    matched.push("excessive punctuation");
  }

  const upperRatio =
    text.length > 0
      ? (text.replace(/[^A-Z]/g, "").length / text.length) * 100
      : 0;
  if (upperRatio > 30 && text.length > 20) {
    score += 12;
    matched.push("high caps ratio");
  }

  const digitRatio =
    text.length > 0
      ? (text.replace(/[^0-9]/g, "").length / text.length) * 100
      : 0;
  if (digitRatio > 15) {
    score += 8;
    matched.push("numeric density");
  }

  return { score: Math.min(score, 100), matched };
}

function seededJitter(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 10) - 5; // -5 to +4
}

export async function detectSpam(text: string): Promise<PredictionResult> {
  // Simulate network + inference latency
  await new Promise((resolve) => setTimeout(resolve, 1400 + Math.random() * 700));

  const { score, matched } = scoreText(text);
  const jitter = seededJitter(text);
  const rawConfidence = score > 0 ? Math.min(96, 55 + score * 0.55 + jitter) : Math.max(4, 12 + jitter);

  const isSpam = score >= 22;
  const confidence = isSpam
    ? Math.round(Math.min(99, Math.max(58, rawConfidence)))
    : Math.round(Math.min(99, Math.max(58, 100 - rawConfidence)));

  return {
    id: crypto.randomUUID(),
    verdict: isSpam ? "spam" : "safe",
    confidence,
    message: text,
    timestamp: new Date().toISOString(),
    topSignals: matched.slice(0, 4),
  };
}

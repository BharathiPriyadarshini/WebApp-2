"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  DollarSign,
  TrendingUp,
  Shield,
  Zap,
  Fuel,
  Settings,
  Users,
  Star,
  ArrowUpRight,
} from "lucide-react";

/* ── Types ── */
export interface NeedScore {
  need: string;
  score: number;
}

export interface ScoreBreakdown {
  budgetScore: number;
  popularityScore: number;
  needScores: NeedScore[];
}

export interface SmartRecommendationResult {
  brand?: { name: string };
  model?: { name: string; bodyType?: string };
  trim?: { name: string; price?: number; fuelType?: string; transmission?: string; mileage?: string; seating?: number };
  score: number;
  explanation?: string;
  scoreBreakdown?: ScoreBreakdown;
}

interface SmartCarCardProps {
  recommendation: SmartRecommendationResult;
  index?: number;
  rank?: number;
}

/* ── Circular score ring ── */
function ScoreRing({ score }: { score: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  const color =
    score >= 85 ? "#22c55e" :
    score >= 70 ? "#3b82f6" :
    score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <motion.circle
          cx="32" cy="32" r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - fill }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-bold text-white leading-none">{score}</span>
        <span className="text-[9px] text-gray-500 uppercase tracking-wide">pts</span>
      </div>
    </div>
  );
}

/* ── Score bar ── */
function ScoreBar({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400">{label}</span>
          <span className="text-xs font-bold" style={{ color }}>
            {Math.round(value)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Spec chip ── */
function SpecChip({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/4 border border-white/6">
      <span className="text-gray-500 shrink-0">{icon}</span>
      <span className="text-xs text-gray-300 font-medium whitespace-nowrap">{value}</span>
    </div>
  );
}

/* ── Main card ── */
export default function SmartCarCard({
  recommendation,
  index = 0,
  rank,
}: SmartCarCardProps) {
  const [expanded, setExpanded] = useState(false);

  const brand    = recommendation.brand?.name    || "Rimello";
  const model    = recommendation.model?.name    || "";
  const trim     = recommendation.trim?.name     || "";
  const bodyType = recommendation.model?.bodyType || "";
  const price    = recommendation.trim?.price    || 0;
  const score    = recommendation.score          || 0;
  const explanation   = recommendation.explanation;
  const breakdown     = recommendation.scoreBreakdown;

  const budgetScore     = breakdown?.budgetScore     ?? 0;
  const popularityScore = breakdown?.popularityScore ?? 0;
  const needScores      = breakdown?.needScores      ?? [];
  const avgNeed         = needScores.length
    ? needScores.reduce((s, n) => s + (n.score || 0), 0) / needScores.length
    : 0;

  const fuelType    = recommendation.trim?.fuelType    || "";
  const transmission= recommendation.trim?.transmission|| "";
  const mileage     = recommendation.trim?.mileage     || "";
  const seating     = recommendation.trim?.seating;

  const isElectric = fuelType.toLowerCase() === "electric";

  const scoreLabel =
    score >= 90 ? "Excellent" :
    score >= 75 ? "Great"     :
    score >= 60 ? "Good"      : "Fair";

  const scoreLabelColor =
    score >= 90 ? "#22c55e" :
    score >= 75 ? "#3b82f6" :
    score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="group relative"
    >
      {/* Rank badge — floats above card */}
      {rank && rank <= 3 && (
        <div className="absolute -top-3 left-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-[0_0_16px_rgba(59,130,246,0.5)]">
          <Star className="w-3 h-3 fill-white" />
          #{rank} Pick
        </div>
      )}

      <div className="relative bg-[#0f0f0f] rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 group-hover:border-blue-500/35 group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)]">

        {/* ── Top image band ── */}
        <div className="relative h-[160px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #0d1117 50%, #080808 100%)",
          }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Glow blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-24 rounded-full bg-blue-600/10 blur-2xl pointer-events-none" />

          {/* Car silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-[0.13] group-hover:opacity-[0.2] transition-opacity duration-500">
              <path
                d="M14 68 Q20 68 27 60 Q44 38 70 32 Q90 26 108 26 Q132 26 152 38 Q166 46 172 57 Q177 63 183 66 L193 68 Q198 70 198 77 Q198 84 192 84 Q188 90 181 90 Q174 90 171 84 L54 84 Q51 90 44 90 Q37 90 34 84 Q18 84 14 84 Q8 84 8 77 Q8 68 14 68Z"
                fill="white"
              />
              <circle cx="44"  cy="84" r="11" fill="none" stroke="white" strokeWidth="4" />
              <circle cx="164" cy="84" r="11" fill="none" stroke="white" strokeWidth="4" />
            </svg>
          </div>

          {/* Body type pill */}
          {bodyType && (
            <div className="absolute bottom-3 left-4">
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600 text-white rounded-full">
                {bodyType.toUpperCase()}
              </span>
            </div>
          )}

          {/* Price */}
          {price > 0 && (
            <div className="absolute bottom-3 right-4 flex items-baseline gap-0.5">
              <span className="text-[11px] text-gray-500">₹</span>
              <span className="text-lg font-bold text-white">{(price / 100000).toFixed(1)}L</span>
              <span className="text-[10px] text-gray-600 ml-1">ex-showroom</span>
            </div>
          )}

          {/* Top-right fade */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-linear-to-t from-[#0f0f0f] to-transparent" />
        </div>

        {/* ── Card body ── */}
        <div className="p-5">

          {/* Name + Score ring */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white tracking-tight leading-snug truncate">
                {brand} {model}
              </h3>
              {trim && (
                <p className="text-xs text-gray-500 mt-0.5">{trim}</p>
              )}
              {/* Score label */}
              <span
                className="inline-block mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                style={{ color: scoreLabelColor, background: `${scoreLabelColor}15` }}
              >
                {scoreLabel} Match
              </span>
            </div>
            <ScoreRing score={score} />
          </div>

          {/* Spec chips */}
          {(fuelType || transmission || mileage || seating) && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {fuelType && (
                <SpecChip
                  icon={isElectric ? <Zap className="w-3 h-3" /> : <Fuel className="w-3 h-3" />}
                  value={fuelType}
                />
              )}
              {transmission && (
                <SpecChip icon={<Settings className="w-3 h-3" />} value={transmission} />
              )}
              {mileage && (
                <SpecChip icon={<TrendingUp className="w-3 h-3" />} value={mileage} />
              )}
              {seating && (
                <SpecChip icon={<Users className="w-3 h-3" />} value={`${seating} Seats`} />
              )}
            </div>
          )}

          {/* Explanation */}
          {explanation && (
            <div className="mb-4 px-3.5 py-3 rounded-xl bg-blue-600/[0.07] border border-blue-500/20">
              <p className="text-xs text-gray-400 leading-relaxed">{explanation}</p>
            </div>
          )}

          {/* Score bars — collapsed toggle */}
          {breakdown && (
            <>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 w-full text-left mb-3 group/toggle"
              >
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest group-hover/toggle:text-gray-300 transition-colors">
                  Score Breakdown
                </span>
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5 text-gray-600 group-hover/toggle:text-gray-400 transition-colors" />
                </motion.div>
                <div className="flex-1 h-px bg-white/5 ml-1" />
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 pb-4">
                      <ScoreBar icon={<DollarSign className="w-3.5 h-3.5" />} label="Budget Match"  value={budgetScore}     color="#22c55e" />
                      <ScoreBar icon={<TrendingUp className="w-3.5 h-3.5" />} label="Popularity"    value={popularityScore} color="#3b82f6" />
                      {needScores.length > 0 && (
                        <ScoreBar icon={<Shield className="w-3.5 h-3.5" />} label="Needs Match"   value={avgNeed}         color="#a855f7" />
                      )}

                      {/* Individual needs */}
                      {needScores.length > 0 && (
                        <div className="ml-10 space-y-1.5 pt-1">
                          {needScores.map((n, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-[11px] text-gray-600 capitalize">{n.need}</span>
                              <span className="text-[11px] font-semibold text-gray-400">{Math.round(n.score)}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Divider */}
          <div className="h-px bg-white/6 mb-4" />

          {/* CTAs */}
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl border border-white/8 text-xs font-semibold text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200">
              View Details
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_28px_rgba(59,130,246,0.45)]">
              Contact Dealer
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
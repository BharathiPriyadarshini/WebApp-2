"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, RotateCcw, Sparkles, X, Star } from "lucide-react";
import SmartCarCard, { SmartRecommendationResult } from "@/components/questions/SmartCarCard";

/* ════════════════════════════════════════
   MOCK DATA — remove when API is wired up
════════════════════════════════════════ */
const MOCK_RECOMMENDATIONS: SmartRecommendationResult[] = [
  {
    brand: { name: "Rimello" },
    model: { name: "X5 R", bodyType: "SUV" },
    trim:  { name: "Sport AWD", price: 1699000, fuelType: "Petrol", transmission: "Automatic", mileage: "16.8 kmpl", seating: 7 },
    score: 97,
    explanation: "Perfectly aligned with your family road trip needs and budget. The 7-seat capacity and ADAS suite make it a standout in its class.",
    scoreBreakdown: {
      budgetScore: 94,
      popularityScore: 88,
      needScores: [
        { need: "Family seating",    score: 100 },
        { need: "Safety features",   score: 96  },
        { need: "Fuel efficiency",   score: 82  },
      ],
    },
  },
  {
    brand: { name: "Rimello" },
    model: { name: "E5 X", bodyType: "Sub Compact SUV" },
    trim:  { name: "Electric Premium", price: 1595000, fuelType: "Electric", transmission: "Automatic", mileage: "520 km range", seating: 5 },
    score: 93,
    explanation: "Your preference for Electric fuel makes this a top pick. Best-in-segment range with premium features at a competitive price point.",
    scoreBreakdown: {
      budgetScore: 90,
      popularityScore: 92,
      needScores: [
        { need: "Electric range",    score: 98 },
        { need: "Tech features",     score: 95 },
        { need: "Running cost",      score: 100 },
      ],
    },
  },
  {
    brand: { name: "Rimello" },
    model: { name: "S7", bodyType: "SUV" },
    trim:  { name: "Diesel 4WD", price: 2499000, fuelType: "Diesel", transmission: "Automatic", mileage: "15.2 kmpl", seating: 7 },
    score: 89,
    explanation: "The diesel powertrain delivers exceptional long-distance efficiency. A strong match for highway-heavy driving patterns.",
    scoreBreakdown: {
      budgetScore: 75,
      popularityScore: 85,
      needScores: [
        { need: "Highway efficiency", score: 95 },
        { need: "Towing capability",  score: 90 },
        { need: "Ride comfort",       score: 88 },
      ],
    },
  },
  {
    brand: { name: "Rimello" },
    model: { name: "A4 E", bodyType: "Sedan" },
    trim:  { name: "Hybrid Prestige", price: 1895000, fuelType: "Hybrid", transmission: "Automatic", mileage: "22.1 kmpl", seating: 5 },
    score: 85,
    explanation: "Best fuel economy in the lineup. Ideal for city commuters who want low running costs without sacrificing comfort.",
    scoreBreakdown: {
      budgetScore: 88,
      popularityScore: 80,
      needScores: [
        { need: "Fuel economy",      score: 98 },
        { need: "City driveability", score: 93 },
        { need: "Cabin refinement",  score: 85 },
      ],
    },
  },
  {
    brand: { name: "Rimello" },
    model: { name: "V6 X", bodyType: "Sub Compact SUV" },
    trim:  { name: "Electric Sport", price: 2295000, fuelType: "Electric", transmission: "Automatic", mileage: "480 km range", seating: 5 },
    score: 81,
    explanation: "Sport-tuned suspension and the fastest acceleration in the electric lineup. Perfect if performance is a priority.",
    scoreBreakdown: {
      budgetScore: 72,
      popularityScore: 78,
      needScores: [
        { need: "Performance",       score: 98 },
        { need: "Design appeal",     score: 92 },
        { need: "Practicality",      score: 72 },
      ],
    },
  },
  {
    brand: { name: "Rimello" },
    model: { name: "G8 E", bodyType: "Sedan" },
    trim:  { name: "Electric Luxury", price: 2899000, fuelType: "Electric", transmission: "Automatic", mileage: "560 km range", seating: 5 },
    score: 77,
    explanation: "The flagship electric sedan with the highest range available. Best suited for buyers who want the absolute top-of-the-range experience.",
    scoreBreakdown: {
      budgetScore: 62,
      popularityScore: 75,
      needScores: [
        { need: "Prestige",          score: 100 },
        { need: "Long-range travel", score: 100 },
        { need: "Tech features",     score: 98  },
      ],
    },
  },
];

const FUEL_FILTERS = ["All", "Petrol", "Diesel", "Electric", "Hybrid", "CNG"];
const SORT_OPTIONS = ["Best Match", "Price: Low → High", "Price: High → Low"];
/* ════════════════════════════════════════ */

/* ── Pill tab ── */
function PillTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-[0_0_14px_rgba(59,130,246,0.45)]"
          : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
      }`}
    >
      {children}
    </button>
  );
}

/* ── Skeleton ── */
function SkeletonCard() {
  return (
    <div className="bg-[#0f0f0f] rounded-2xl border border-white/[0.06] overflow-hidden animate-pulse">
      <div className="h-[160px] bg-white/[0.03]" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-4 w-36 bg-white/[0.06] rounded-lg" />
            <div className="h-3 w-24 bg-white/[0.04] rounded-lg" />
          </div>
          <div className="w-16 h-16 rounded-full bg-white/[0.04]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[80, 64, 72].map((w) => (
            <div key={w} className="h-7 rounded-lg bg-white/[0.04]" style={{ width: w }} />
          ))}
        </div>
        <div className="h-12 rounded-xl bg-white/[0.03]" />
        <div className="h-9 rounded-xl bg-white/[0.04]" />
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading]   = useState(true);
  const [fuelFilter, setFuelFilter] = useState("All");
  const [sortBy, setSortBy]         = useState("Best Match");
  const [answers, setAnswers]       = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1400);
    try {
      const s = localStorage.getItem("rimello_answers");
      if (s) setAnswers(JSON.parse(s));
    } catch {}
    return () => clearTimeout(t);
  }, []);

  const displayed = MOCK_RECOMMENDATIONS
    .filter((r) => fuelFilter === "All" || r.trim?.fuelType === fuelFilter)
    .sort((a, b) => {
      if (sortBy === "Price: Low → High") return (a.trim?.price ?? 0) - (b.trim?.price ?? 0);
      if (sortBy === "Price: High → Low") return (b.trim?.price ?? 0) - (a.trim?.price ?? 0);
      return (b.score ?? 0) - (a.score ?? 0);
    });

  const answerEntries = Object.entries(answers);

  const removeAnswer = (k: string) => {
    const c = { ...answers };
    delete c[k];
    setAnswers(c);
    localStorage.setItem("rimello_answers", JSON.stringify(c));
  };

  return (
    <section className="min-h-screen bg-black">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold">rimello</span>
        <button
          onClick={() => { localStorage.removeItem("rimello_answers"); router.push("/explore"); }}
          className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restart
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="mb-10">
          <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            AI Curated Results
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            Your Perfect Matches
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
            {isLoading
              ? "Analysing your preferences…"
              : `Found ${displayed.length} vehicle${displayed.length !== 1 ? "s" : ""} tailored for you.`}
          </p>
        </div>

        {/* Active answer chips */}
        {!isLoading && answerEntries.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {answerEntries.map(([k, v]) => (
              <span key={k} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400">
                {Array.isArray(v) ? v.join(", ") : String(v)}
                <button onClick={() => removeAnswer(k)} className="text-gray-600 hover:text-gray-300 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Controls */}
        {!isLoading && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex gap-2 flex-wrap">
              {FUEL_FILTERS.map((f) => (
                <PillTab key={f} active={fuelFilter === f} onClick={() => setFuelFilter(f)}>{f}</PillTab>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111] border border-white/[0.08] rounded-lg text-gray-400 text-sm px-3 py-1.5 outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((s) => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
              </select>
              <button
                onClick={() => router.push("/suggestions")}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Refine
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {isLoading
              ? [0,1,2,3,4,5].map((i) => <SkeletonCard key={i} />)
              : displayed.length > 0
                ? displayed.map((rec, i) => (
                    <SmartCarCard key={`${rec.brand?.name}-${rec.model?.name}-${i}`} recommendation={rec} rank={i + 1} index={i} />
                  ))
                : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-20"
                  >
                    <p className="text-gray-500 text-sm mb-4">No vehicles match this filter.</p>
                    <button
                      onClick={() => setFuelFilter("All")}
                      className="px-5 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                      Clear filters
                    </button>
                  </motion.div>
                )
            }
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
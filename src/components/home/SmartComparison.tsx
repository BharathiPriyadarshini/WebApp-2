"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Gauge,
  BatteryFull,
  Wrench,
  TrendingUp,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ─── car catalogue ───────────────────────────────────────────── */
const carCatalogue = [
  { id: "x5",  name: "Rimello X5",  sub: "SUV · Diesel · 7 Seater",   metrics: { accel: { value: "5.8s",     pct: 58 }, range: { value: "405 km",   pct: 70 }, safety: { value: "8.6 / 10", pct: 86 }, maint: { value: "₹ 18 K",  pct: 72 }, resale: { value: "62 %",   pct: 62 } } },
  { id: "s7",  name: "Rimello S7",  sub: "SUV · Petrol · 7 Seater",   metrics: { accel: { value: "4.2s",     pct: 78 }, range: { value: "516 km",   pct: 89 }, safety: { value: "9.4 / 10", pct: 94 }, maint: { value: "₹ 22 K",  pct: 60 }, resale: { value: "71 %",   pct: 71 } } },
  { id: "x1",  name: "Rimello X1",  sub: "Sub Compact SUV · Petrol",  metrics: { accel: { value: "8.1s",     pct: 45 }, range: { value: "380 km",   pct: 65 }, safety: { value: "7.8 / 10", pct: 78 }, maint: { value: "₹ 12 K",  pct: 88 }, resale: { value: "58 %",   pct: 58 } } },
  { id: "s3",  name: "Rimello S3",  sub: "Hatchback · Petrol / CNG",  metrics: { accel: { value: "9.4s",     pct: 38 }, range: { value: "340 km",   pct: 58 }, safety: { value: "7.2 / 10", pct: 72 }, maint: { value: "₹ 9 K",   pct: 95 }, resale: { value: "54 %",   pct: 54 } } },
  { id: "e2",  name: "Rimello E2",  sub: "Sedan · Petrol / Diesel",   metrics: { accel: { value: "7.6s",     pct: 50 }, range: { value: "420 km",   pct: 72 }, safety: { value: "8.1 / 10", pct: 81 }, maint: { value: "₹ 14 K",  pct: 82 }, resale: { value: "60 %",   pct: 60 } } },
  { id: "v6",  name: "Rimello V6",  sub: "Sub Compact SUV · Petrol",  metrics: { accel: { value: "6.9s",     pct: 62 }, range: { value: "470 km",   pct: 80 }, safety: { value: "8.9 / 10", pct: 89 }, maint: { value: "₹ 16 K",  pct: 78 }, resale: { value: "65 %",   pct: 65 } } },
  { id: "g8",  name: "Rimello G8",  sub: "Sedan · Petrol",            metrics: { accel: { value: "6.2s",     pct: 66 }, range: { value: "490 km",   pct: 84 }, safety: { value: "9.1 / 10", pct: 91 }, maint: { value: "₹ 20 K",  pct: 65 }, resale: { value: "68 %",   pct: 68 } } },
  { id: "v8gt",name: "Rimello V8 GT",sub: "Sports · Petrol",          metrics: { accel: { value: "3.4s",     pct: 96 }, range: { value: "310 km",   pct: 52 }, safety: { value: "9.0 / 10", pct: 90 }, maint: { value: "₹ 35 K",  pct: 35 }, resale: { value: "55 %",   pct: 55 } } },
];

/* ─── metric definitions ──────────────────────────────────────── */
const metricDefs = [
  { key: "accel",  label: "Acceleration", sublabel: "0 – 100 km/h",       icon: Gauge,       lowerIsBetter: true  },
  { key: "range",  label: "Range",        sublabel: "Full charge / tank",  icon: BatteryFull, lowerIsBetter: false },
  { key: "safety", label: "Safety Score", sublabel: "NCAP / AI rating",    icon: ShieldCheck, lowerIsBetter: false },
  { key: "maint",  label: "Maintenance",  sublabel: "Yearly estimate",     icon: Wrench,      lowerIsBetter: true  },
  { key: "resale", label: "Resale Value", sublabel: "After 3 years",       icon: TrendingUp,  lowerIsBetter: false },
];

/* ─── animated bar ────────────────────────────────────────────── */
function Bar({ pct, side, inView, delay }: { pct: number; side: "A" | "B"; inView: boolean; delay: number }) {
  return (
    <div className="relative h-1.5 w-full rounded-full bg-foreground/10 dark:bg-white/6 overflow-hidden">
      <motion.div
        className={`absolute top-0 h-full rounded-full ${side === "A" ? "left-0 bg-white/50" : "left-0 bg-blue-500"}`}
        initial={{ width: 0 }}
        animate={{ width: inView ? `${pct}%` : 0 }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
        key={`${pct}-${inView}`}
      />
    </div>
  );
}

/* ─── inline car dropdown ─────────────────────────────────────── */
function CarDropdown({
  side,
  selected,
  onChange,
  exclude,
}: {
  side: "A" | "B";
  selected: typeof carCatalogue[0];
  onChange: (car: typeof carCatalogue[0]) => void;
  exclude: string;
}) {
  const [open, setOpen] = useState(false);
  const isA = side === "A";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 group"
      >
        <div className="flex flex-col items-start gap-0.5">
          <span className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${isA ? "text-gray-500" : "text-blue-500"}`}>
            Car {side}
          </span>
          <span className="text-foreground dark:text-white font-bold text-base md:text-lg leading-tight">{selected.name}</span>
          <span className="text-muted-foreground text-xs">{selected.sub}</span>
        </div>
        <ChevronDown
          size={14}
          className={`text-muted-foreground mt-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-full mt-2 z-50 w-56 rounded-xl border border-border bg-card shadow-2xl overflow-hidden ${isA ? "left-0" : "right-0"}`}
          >
            {carCatalogue
              .filter((c) => c.id !== exclude)
              .map((car) => (
                <button
                  key={car.id}
                  onClick={() => { onChange(car); setOpen(false); }}
                  className={`w-full text-left px-4 py-3 transition-colors hover:bg-foreground/5 border-b border-border last:border-0 ${selected.id === car.id ? "bg-foreground/5" : ""}`}
                >
                  <div className="text-card-foreground text-sm font-semibold leading-tight">{car.name}</div>
                  <div className="text-muted-foreground text-[11px] mt-0.5">{car.sub}</div>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* backdrop to close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}

/* ─── main ────────────────────────────────────────────────────── */
export default function SmartComparison() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [carA, setCarA] = useState(carCatalogue[0]); // Rimello X5
  const [carB, setCarB] = useState(carCatalogue[1]); // Rimello S7

  /* derive winner per metric */
  function getWinner(key: string) {
    const def = metricDefs.find((d) => d.key === key)!;
    const pctA = (carA.metrics as any)[key].pct;
    const pctB = (carB.metrics as any)[key].pct;
    if (pctA === pctB) return null;
    if (def.lowerIsBetter) return pctA < pctB ? "A" : "B";
    return pctA > pctB ? "A" : "B";
  }

  const compareHref = `/compare?carA=${carA.id}&carB=${carB.id}`;

  return (
    <section className="py-16 md:py-28 bg-background dark:bg-black overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── eyebrow + headline ── */}
        <div className="mb-10 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }} viewport={{ once: true }}
            className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-4"
          >
            Data-Driven Decisions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-foreground dark:text-white leading-[1.05] tracking-tight"
          >
            Smart<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/30">
              Comparison
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
            className="mt-5 text-muted-foreground max-w-md text-sm leading-relaxed"
          >
            Don&apos;t just look at specs. Our AI evaluates safety records,
            maintenance costs, and resale value to give you a holistic score
            for every vehicle.
          </motion.p>
        </div>

        {/* ── main comparison panel ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="relative rounded-2xl md:rounded-3xl border border-border bg-card dark:bg-[#0a0a0a] overflow-hidden"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-3xl" />

          {/* ── car header strip ── */}
          <div className="grid grid-cols-[1fr_auto_1fr] border-b border-border">

            {/* Car A */}
            <div className="px-4 md:px-8 py-5 md:py-6 border-r border-border">
              <CarDropdown side="A" selected={carA} onChange={setCarA} exclude={carB.id} />
            </div>

            {/* VS */}
            <div className="flex items-center justify-center px-3 md:px-8 py-5 md:py-6">
              <span className="text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase">vs</span>
            </div>

            {/* Car B */}
            <div className="px-4 md:px-8 py-5 md:py-6 border-l border-border">
              <CarDropdown side="B" selected={carB} onChange={setCarB} exclude={carA.id} />
            </div>

          </div>

          {/* ── metrics — desktop: 3-col grid, mobile: stacked cards ── */}

          {/* DESKTOP */}
          <div className="hidden md:block divide-y divide-border">
            {metricDefs.map((m, i) => {
              const Icon   = m.icon;
              const mA     = (carA.metrics as any)[m.key];
              const mB     = (carB.metrics as any)[m.key];
              const winner = getWinner(m.key);

              return (
                <div key={m.key} className="grid grid-cols-[1fr_180px_1fr] items-center">

                  {/* Car A */}
                  <div className="px-8 py-5 flex flex-col gap-2">
                    <span className={`text-sm font-semibold ${winner === "A" ? "text-foreground dark:text-white" : "text-muted-foreground"}`}>
                      {mA.value}
                      {winner === "A" && <span className="ml-2 text-[10px] font-bold text-emerald-400 tracking-wider uppercase">winner</span>}
                    </span>
                    <Bar pct={mA.pct} side="A" inView={inView} delay={0.1 + i * 0.08} />
                  </div>

                  {/* Centre label */}
                  <div className="flex flex-col items-center gap-1.5 px-4 py-5 border-x border-border">
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-foreground/5 border border-border">
                      <Icon size={15} className="text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="text-card-foreground text-xs font-semibold text-center leading-tight">{m.label}</span>
                    <span className="text-muted-foreground text-[10px] text-center leading-tight">{m.sublabel}</span>
                  </div>

                  {/* Car B */}
                  <div className="px-8 py-5 flex flex-col gap-2">
                    <span className={`text-sm font-semibold ${winner === "B" ? "text-foreground dark:text-white" : "text-muted-foreground"}`}>
                      {mB.value}
                      {winner === "B" && <span className="ml-2 text-[10px] font-bold text-emerald-400 tracking-wider uppercase">winner</span>}
                    </span>
                    <Bar pct={mB.pct} side="B" inView={inView} delay={0.1 + i * 0.08} />
                  </div>

                </div>
              );
            })}
          </div>

          {/* MOBILE — stacked metric cards */}
          <div className="md:hidden divide-y divide-border">
            {metricDefs.map((m, i) => {
              const Icon   = m.icon;
              const mA     = (carA.metrics as any)[m.key];
              const mB     = (carB.metrics as any)[m.key];
              const winner = getWinner(m.key);

              return (
                <div key={m.key} className="px-4 py-4">
                  {/* metric label row */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-foreground/5 border border-border">
                      <Icon size={12} className="text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="text-card-foreground text-xs font-semibold">{m.label}</span>
                    <span className="text-muted-foreground text-[10px]">· {m.sublabel}</span>
                  </div>

                  {/* Car A row */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground font-medium">{carA.name}</span>
                      <span className={`text-xs font-semibold ${winner === "A" ? "text-foreground dark:text-white" : "text-muted-foreground"}`}>
                        {mA.value}
                        {winner === "A" && <span className="ml-1.5 text-[9px] font-bold text-emerald-400 uppercase">✓ winner</span>}
                      </span>
                    </div>
                    <Bar pct={mA.pct} side="A" inView={inView} delay={0.05 + i * 0.06} />
                  </div>

                  {/* Car B row */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-blue-400 font-medium">{carB.name}</span>
                      <span className={`text-xs font-semibold ${winner === "B" ? "text-foreground dark:text-white" : "text-muted-foreground"}`}>
                        {mB.value}
                        {winner === "B" && <span className="ml-1.5 text-[9px] font-bold text-emerald-400 uppercase">✓ winner</span>}
                      </span>
                    </div>
                    <Bar pct={mB.pct} side="B" inView={inView} delay={0.05 + i * 0.06} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── bottom CTA strip ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 md:px-8 py-5 md:py-7 border-t border-border bg-foreground/5">

            {/* feature pills — hide on very small screens, show from sm */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {["Deep Technical Breakdown", "Reliability Scores", "TCO Analysis"].map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium text-muted-foreground border border-border bg-foreground/5"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* View Details CTA */}
            <Link href={compareHref} className="w-full sm:w-auto">
              <div className="group flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold transition-all duration-200 hover:bg-white/90 hover:gap-4 whitespace-nowrap w-full sm:w-auto">
                View Details
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
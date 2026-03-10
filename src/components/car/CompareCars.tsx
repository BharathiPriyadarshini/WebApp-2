"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    ShieldCheck,
    Gauge,
    BatteryFull,
    Wrench,
    TrendingUp,
    ChevronDown,
    Zap,
    Timer,
    Star,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */
interface CarMetric {
    value: string;
    pct: number;
}

interface CompareCarData {
    id: number | string;
    name: string;
    sub: string;
    metrics: {
        accel: CarMetric;
        range: CarMetric;
        safety: CarMetric;
        maint: CarMetric;
        resale: CarMetric;
    };
}

interface CompareCarsProps {
    /** The "primary" car (current page car) */
    primaryCar: {
        id: number | string;
        brand: string;
        model: string;
        priceLabel: string;
        rating: number;
        horsepower: number;
        torque: string;
        acceleration: string;
    };
}

/* ─── Static catalogue of cars to compare against ─────────────── */
const COMPARE_CATALOGUE: CompareCarData[] = [
    { id: 101, name: "Tata Nexon",        sub: "Sub Compact SUV · Petrol / Diesel", metrics: { accel: { value: "9.4s",     pct: 42 }, range: { value: "500 km",   pct: 82 }, safety: { value: "5 / 5 ★",  pct: 100 }, maint: { value: "₹ 9 K",   pct: 92 }, resale: { value: "62 %",  pct: 62 } } },
    { id: 102, name: "Hyundai Creta",     sub: "SUV · Petrol / Diesel / Turbo",     metrics: { accel: { value: "8.1s",     pct: 52 }, range: { value: "480 km",   pct: 79 }, safety: { value: "5 / 5 ★",  pct: 100 }, maint: { value: "₹ 11 K",  pct: 82 }, resale: { value: "65 %",  pct: 65 } } },
    { id: 103, name: "Kia Seltos",        sub: "SUV · Petrol / Diesel",             metrics: { accel: { value: "7.9s",     pct: 55 }, range: { value: "460 km",   pct: 76 }, safety: { value: "4 / 5 ★",  pct: 80  }, maint: { value: "₹ 13 K",  pct: 76 }, resale: { value: "63 %",  pct: 63 } } },
    { id: 104, name: "Mahindra XUV700",   sub: "SUV · Petrol / Diesel · 7 Seater",  metrics: { accel: { value: "6.8s",     pct: 64 }, range: { value: "510 km",   pct: 84 }, safety: { value: "5 / 5 ★",  pct: 100 }, maint: { value: "₹ 14 K",  pct: 74 }, resale: { value: "67 %",  pct: 67 } } },
    { id: 105, name: "Toyota Fortuner",   sub: "SUV · Diesel · 7 Seater",           metrics: { accel: { value: "10.2s",    pct: 35 }, range: { value: "560 km",   pct: 91 }, safety: { value: "4 / 5 ★",  pct: 80  }, maint: { value: "₹ 18 K",  pct: 64 }, resale: { value: "74 %",  pct: 74 } } },
    { id: 106, name: "Maruti Grand Vitara", sub: "SUV · Petrol Hybrid",             metrics: { accel: { value: "11.1s",    pct: 30 }, range: { value: "590 km",   pct: 95 }, safety: { value: "3 / 5 ★",  pct: 60  }, maint: { value: "₹ 7 K",   pct: 96 }, resale: { value: "60 %",  pct: 60 } } },
    { id: 107, name: "Skoda Kushaq",      sub: "Compact SUV · Petrol",              metrics: { accel: { value: "7.2s",     pct: 60 }, range: { value: "440 km",   pct: 72 }, safety: { value: "4 / 5 ★",  pct: 80  }, maint: { value: "₹ 15 K",  pct: 72 }, resale: { value: "58 %",  pct: 58 } } },
    { id: 108, name: "MG Hector",         sub: "SUV · Petrol / Diesel · 5 Seater",  metrics: { accel: { value: "8.6s",     pct: 48 }, range: { value: "430 km",   pct: 70 }, safety: { value: "4 / 5 ★",  pct: 80  }, maint: { value: "₹ 12 K",  pct: 80 }, resale: { value: "54 %",  pct: 54 } } },
];

/* ─── Metric definitions ────────────────────────────────────────── */
const METRIC_DEFS = [
    { key: "accel",  label: "Acceleration", sublabel: "0–100 km/h",          icon: Gauge,       lowerIsBetter: true  },
    { key: "range",  label: "Range",        sublabel: "Full charge / tank",   icon: BatteryFull, lowerIsBetter: false },
    { key: "safety", label: "Safety Score", sublabel: "NCAP rating",          icon: ShieldCheck, lowerIsBetter: false },
    { key: "maint",  label: "Maintenance",  sublabel: "Yearly estimate",      icon: Wrench,      lowerIsBetter: true  },
    { key: "resale", label: "Resale Value", sublabel: "After 3 years",        icon: TrendingUp,  lowerIsBetter: false },
];

/* ─── Animated progress bar ─────────────────────────────────────── */
function MetricBar({
    pct,
    isPrimary,
    inView,
    delay,
}: {
    pct: number;
    isPrimary: boolean;
    inView: boolean;
    delay: number;
}) {
    return (
        <div className="relative h-1.5 w-full rounded-full bg-white/6 overflow-hidden">
            <motion.div
                className={`absolute top-0 left-0 h-full rounded-full ${
                    isPrimary ? "bg-blue-500" : "bg-white/40"
                }`}
                initial={{ width: 0 }}
                animate={{ width: inView ? `${pct}%` : 0 }}
                transition={{ duration: 0.9, delay, ease: "easeOut" }}
                key={`${pct}-${inView}`}
            />
        </div>
    );
}

/* ─── Car selector dropdown ─────────────────────────────────────── */
function CarDropdown({
    selected,
    onChange,
    excludeId,
    label,
    isBlue,
}: {
    selected: CompareCarData;
    onChange: (car: CompareCarData) => void;
    excludeId: number | string;
    label: string;
    isBlue?: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 group text-left"
            >
                <div className="flex flex-col gap-0.5">
                    <span
                        className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${
                            isBlue ? "text-blue-400" : "text-gray-500"
                        }`}
                    >
                        {label}
                    </span>
                    <span className="text-white font-bold text-base md:text-lg leading-tight">
                        {selected.name}
                    </span>
                    <span className="text-gray-500 text-xs">{selected.sub}</span>
                </div>
                <ChevronDown
                    size={14}
                    className={`text-gray-500 mt-3 shrink-0 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full mt-2 z-50 w-64 rounded-xl border border-white/10 bg-[#111] shadow-2xl overflow-hidden right-0"
                    >
                        {COMPARE_CATALOGUE.filter((c) => c.id !== excludeId).map((car) => (
                            <button
                                key={car.id}
                                onClick={() => {
                                    onChange(car);
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 transition-colors hover:bg-white/6 border-b border-white/4 last:border-0 ${
                                    selected.id === car.id ? "bg-white/4" : ""
                                }`}
                            >
                                <div className="text-white text-sm font-semibold leading-tight">
                                    {car.name}
                                </div>
                                <div className="text-gray-500 text-[11px] mt-0.5">{car.sub}</div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {open && (
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            )}
        </div>
    );
}

/* ─── Main Component ────────────────────────────────────────────── */
export function CompareCars({ primaryCar }: CompareCarsProps) {
    const ref    = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    // Build primary car's metrics from its props
    const primaryMetrics: CompareCarData = {
        id:   primaryCar.id,
        name: `${primaryCar.brand} ${primaryCar.model}`,
        sub:  "Current Vehicle",
        metrics: {
            accel:  { value: primaryCar.acceleration, pct: Math.max(20, 100 - parseFloat(primaryCar.acceleration) * 8) },
            range:  { value: "450 km",   pct: 74 },
            safety: { value: "5 / 5 ★",  pct: 100 },
            maint:  { value: "₹ 14 K",   pct: 74 },
            resale: { value: "65 %",     pct: 65  },
        },
    };

    const [compareTarget, setCompareTarget] = useState<CompareCarData>(COMPARE_CATALOGUE[0]);

    const compareHref = `/compare?carA=${encodeURIComponent(
        primaryMetrics.id,
    )}&carB=${encodeURIComponent(compareTarget.id)}`;

    function getWinner(key: string) {
        const def  = METRIC_DEFS.find((d) => d.key === key)!;
        const pctP = (primaryMetrics.metrics as any)[key].pct;
        const pctC = (compareTarget.metrics as any)[key].pct;
        if (pctP === pctC) return null;
        if (def.lowerIsBetter) return pctP < pctC ? "primary" : "compare";
        return pctP > pctC ? "primary" : "compare";
    }

    // Tally overall winner
    let primaryWins = 0;
    let compareWins = 0;
    METRIC_DEFS.forEach(({ key }) => {
        const w = getWinner(key);
        if (w === "primary") primaryWins++;
        if (w === "compare") compareWins++;
    });

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Compare</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    See how this car stacks up against competitors
                </p>
            </div>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl border border-border bg-card dark:bg-[#0a0a0a] overflow-hidden"
            >
                {/* glow */}
                <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-600/8 blur-3xl" />

                {/* ── Header strip ── */}
                <div className="grid grid-cols-[1fr_auto_1fr] border-b border-border">
                    {/* Primary car */}
                    <div className="px-4 md:px-6 py-5 border-r border-border">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-blue-400">
                                This Car
                            </span>
                            <span className="text-white font-bold text-base md:text-lg leading-tight">
                                {primaryMetrics.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-gray-400 text-xs font-medium">
                                    {primaryCar.rating}
                                </span>
                                <span className="text-gray-600 text-xs">·</span>
                                <span className="text-gray-500 text-xs">{primaryCar.priceLabel}</span>
                            </div>
                        </div>
                    </div>

                    {/* VS */}
                    <div className="flex items-center justify-center px-3 md:px-6 py-5">
                        <span className="text-[11px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                            vs
                        </span>
                    </div>

                    {/* Compare car */}
                    <div className="px-4 md:px-6 py-5 border-l border-border">
                        <CarDropdown
                            selected={compareTarget}
                            onChange={setCompareTarget}
                            excludeId={primaryCar.id}
                            label="Compare with"
                            isBlue={false}
                        />
                    </div>
                </div>

                {/* ── Score summary ── */}
                <div className="grid grid-cols-3 border-b border-border divide-x divide-border">
                    <div className="flex flex-col items-center justify-center py-4 gap-1">
                        <span className="text-2xl font-black text-blue-400">{primaryWins}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Wins</span>
                        <span className="text-[11px] text-gray-400 font-medium truncate max-w-[90%] text-center">
                            {primaryMetrics.name.split(" ").slice(-1)[0]}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4 gap-1">
                        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                            out of {METRIC_DEFS.length}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">categories</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-4 gap-1">
                        <span className="text-2xl font-black text-foreground/60 dark:text-white/60">{compareWins}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Wins</span>
                        <span className="text-[11px] text-muted-foreground font-medium truncate max-w-[90%] text-center">
                            {compareTarget.name.split(" ").slice(-1)[0]}
                        </span>
                    </div>
                </div>

                {/* ── Metrics — desktop ── */}
                <div className="hidden md:block divide-y divide-border">
                    {METRIC_DEFS.map((m, i) => {
                        const Icon    = m.icon;
                        const mP      = (primaryMetrics.metrics as any)[m.key] as CarMetric;
                        const mC      = (compareTarget.metrics  as any)[m.key] as CarMetric;
                        const winner  = getWinner(m.key);

                        return (
                            <div key={m.key} className="grid grid-cols-[1fr_160px_1fr] items-center">
                                {/* Primary */}
                                <div className="px-6 py-5 flex flex-col gap-2">
                                    <span
                                        className={`text-sm font-semibold ${
                                            winner === "primary" ? "text-foreground dark:text-white" : "text-muted-foreground"
                                        }`}
                                    >
                                        {mP.value}
                                        {winner === "primary" && (
                                            <span className="ml-2 text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                                                winner
                                            </span>
                                        )}
                                    </span>
                                    <MetricBar
                                        pct={mP.pct}
                                        isPrimary={true}
                                        inView={inView}
                                        delay={0.1 + i * 0.08}
                                    />
                                </div>

                                {/* Centre label */}
                                <div className="flex flex-col items-center gap-1.5 px-4 py-5 border-x border-border">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-foreground/5 border border-border">
                                        <Icon size={15} className="text-muted-foreground" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-card-foreground text-xs font-semibold text-center leading-tight">
                                        {m.label}
                                    </span>
                                    <span className="text-muted-foreground text-[10px] text-center leading-tight">
                                        {m.sublabel}
                                    </span>
                                </div>

                                {/* Compare */}
                                <div className="px-6 py-5 flex flex-col gap-2">
                                    <span
                                        className={`text-sm font-semibold ${
                                            winner === "compare" ? "text-foreground dark:text-white" : "text-muted-foreground"
                                        }`}
                                    >
                                        {mC.value}
                                        {winner === "compare" && (
                                            <span className="ml-2 text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                                                winner
                                            </span>
                                        )}
                                    </span>
                                    <MetricBar
                                        pct={mC.pct}
                                        isPrimary={false}
                                        inView={inView}
                                        delay={0.1 + i * 0.08}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Metrics — mobile ── */}
                <div className="md:hidden divide-y divide-border">
                    {METRIC_DEFS.map((m, i) => {
                        const Icon   = m.icon;
                        const mP     = (primaryMetrics.metrics as any)[m.key] as CarMetric;
                        const mC     = (compareTarget.metrics  as any)[m.key] as CarMetric;
                        const winner = getWinner(m.key);

                        return (
                            <div key={m.key} className="px-4 py-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-foreground/5 border border-border">
                                        <Icon size={12} className="text-muted-foreground" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-card-foreground text-xs font-semibold">{m.label}</span>
                                    <span className="text-muted-foreground text-[10px]">· {m.sublabel}</span>
                                </div>

                                {/* Primary */}
                                <div className="mb-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[11px] text-blue-400 font-medium">
                                            {primaryMetrics.name}
                                        </span>
                                        <span
                                            className={`text-xs font-semibold ${
                                                winner === "primary" ? "text-foreground dark:text-white" : "text-muted-foreground"
                                            }`}
                                        >
                                            {mP.value}
                                            {winner === "primary" && (
                                                <span className="ml-1.5 text-[9px] font-bold text-emerald-400 uppercase">
                                                    ✓
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <MetricBar
                                        pct={mP.pct}
                                        isPrimary={true}
                                        inView={inView}
                                        delay={0.05 + i * 0.06}
                                    />
                                </div>

                                {/* Compare */}
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[11px] text-muted-foreground font-medium">
                                            {compareTarget.name}
                                        </span>
                                        <span
                                            className={`text-xs font-semibold ${
                                                winner === "compare" ? "text-foreground dark:text-white" : "text-muted-foreground"
                                            }`}
                                        >
                                            {mC.value}
                                            {winner === "compare" && (
                                                <span className="ml-1.5 text-[9px] font-bold text-emerald-400 uppercase">
                                                    ✓
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <MetricBar
                                        pct={mC.pct}
                                        isPrimary={false}
                                        inView={inView}
                                        delay={0.05 + i * 0.06}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Bottom note ── */}
                <div className="flex flex-wrap items-center gap-2 px-4 md:px-6 py-4 border-t border-border bg-foreground/5">
                    {["NCAP Data", "AI Safety Score", "TCO Analysis", "Ownership Cost"].map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full text-[11px] font-medium text-muted-foreground border border-border bg-foreground/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>

            <Link href={compareHref} className="w-full sm:w-auto">
                <div className="mt-4 group flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold transition-all duration-200 hover:bg-white/90 hover:gap-4 whitespace-nowrap w-full sm:w-auto">
                    View Details
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
            </Link>
        </div>
    );
}
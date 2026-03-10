'use client';

import { Zap, Gauge, Timer, Star, Shield, AlertTriangle } from 'lucide-react';
import { InsightBadge } from "@/components/car/InsightBadge";
import type { EnrichedCar, SafetyRatingData } from "@/app/trims/[trimId]/types";

// ── Star rating ────────────────────────────────────────────────────────────
function StarRating({ filled, total = 5 }: { filled: number; total?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: total }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                />
            ))}
        </div>
    );
}

// ── Safety Ratings ─────────────────────────────────────────────────────────
function SafetyRatings({ data }: { data: SafetyRatingData }) {
    return (
        <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Safety Ratings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Global NCAP */}
                <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">Global NCAP</p>
                            <p className="text-xs text-muted-foreground">Safety Crash Test</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Adult Occupant</p>
                                <StarRating filled={data.globalNcap.adult} />
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-foreground">{data.globalNcap.adult}</span>
                                <span className="text-sm text-muted-foreground font-medium">/5</span>
                            </div>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Child Occupant</p>
                                <StarRating filled={data.globalNcap.child} />
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-foreground">{data.globalNcap.child}</span>
                                <span className="text-sm text-muted-foreground font-medium">/5</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bharat NCAP */}
                <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">Bharat NCAP</p>
                            <p className="text-xs text-muted-foreground">Indian Safety Standard</p>
                        </div>
                    </div>
                    {data.bharatNcap.status === 'Not Tested' ? (
                        <div className="flex flex-col items-center justify-center py-4 gap-2 rounded-xl bg-muted/30 border border-dashed border-border">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <p className="text-sm font-semibold text-foreground">Not Tested</p>
                            <p className="text-xs text-muted-foreground text-center">
                                This vehicle hasn't been submitted for Bharat NCAP testing yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Adult Occupant</p>
                                    <StarRating filled={data.bharatNcap.adult} />
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-foreground">{data.bharatNcap.adult}</span>
                                    <span className="text-sm text-muted-foreground font-medium">/5</span>
                                </div>
                            </div>
                            <div className="h-px bg-border" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Child Occupant</p>
                                    <StarRating filled={data.bharatNcap.child} />
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-foreground">{data.bharatNcap.child}</span>
                                    <span className="text-sm text-muted-foreground font-medium">/5</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────
interface DetailsProps {
    car: EnrichedCar;
    sectionRef: (el: HTMLElement | null) => void;
}

export function Details({ car, sectionRef }: DetailsProps) {
    return (
        <section id="details" ref={sectionRef} className="scroll-mt-28 space-y-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{car.description}</p>

            {/* Spec cards */}
            <div className="flex justify-center gap-4 flex-wrap">
                {[
                    { label: 'Horsepower', value: `${car.horsepower} HP`, icon: Zap,   sub: 'Max Power'    },
                    { label: 'Torque',     value: car.torque,             icon: Gauge, sub: 'Peak Torque'  },
                    { label: '0–60 mph',   value: car.acceleration,       icon: Timer, sub: 'Acceleration' },
                ].map((spec) => (
                    <div
                        key={spec.label}
                        className="flex flex-col items-center justify-center text-center gap-2
                                   bg-card border border-border rounded-2xl w-44 aspect-square p-4
                                   shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="h-8 w-8 bg-muted rounded-xl flex items-center justify-center">
                            <spec.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-foreground leading-tight">{spec.value}</p>
                            <p className="text-[11px] text-muted-foreground mt-1 font-medium">{spec.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Insights */}
            <div className="flex flex-wrap gap-3 justify-center">
                {car.insights.map((insight, i) => (
                    <InsightBadge key={i} type={insight.type} label={insight.label} />
                ))}
            </div>

            {/* Safety */}
            <SafetyRatings data={car.safetyRatings} />
        </section>
    );
}
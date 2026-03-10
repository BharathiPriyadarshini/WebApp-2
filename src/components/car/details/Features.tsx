'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle2, Shield, Wifi, Car as CarIcon, Armchair, Lightbulb } from 'lucide-react';
import type { EnrichedCar } from "@/app/trims/[trimId]/types";

// ── Feature category definitions ──────────────────────────────────────────
const FEATURE_CATEGORIES = [
    {
        id: 'safety',
        label: 'Safety & Security',
        icon: Shield,
        features: [
            { name: '6 Airbags (Front, Side & Curtain)',     available: true  },
            { name: 'Electronic Stability Control (ESC)',    available: true  },
            { name: 'Hill Start Assist',                     available: true  },
            { name: 'Anti-lock Braking System (ABS)',        available: true  },
            { name: 'ISOFIX Child Seat Anchors',             available: true  },
            { name: 'Tyre Pressure Monitoring System',       available: true  },
            { name: 'Auto-dimming IRVM',                     available: false },
            { name: 'Blind Spot Detection',                  available: false },
        ],
    },
    {
        id: 'adas',
        label: 'ADAS & Driver Assistance',
        icon: CarIcon,
        features: [
            { name: 'ADAS Level 2 Suite',                    available: true  },
            { name: 'Autonomous Emergency Braking',          available: true  },
            { name: 'Lane Departure Warning',                available: true  },
            { name: 'Adaptive Cruise Control',               available: true  },
            { name: '360° Surround View Camera',             available: true  },
            { name: 'Rear Cross Traffic Alert',              available: true  },
            { name: 'Auto High Beam',                        available: false },
            { name: 'Traffic Sign Recognition',              available: false },
        ],
    },
    {
        id: 'infotainment',
        label: 'Infotainment & Connectivity',
        icon: Wifi,
        features: [
            { name: '10.25" HD Touchscreen',                 available: true  },
            { name: 'Wireless Android Auto & Apple CarPlay', available: true  },
            { name: 'Connected Car Tech (OTA Updates)',      available: true  },
            { name: 'Premium 8-Speaker Sound System',        available: true  },
            { name: 'Digital Instrument Cluster',            available: true  },
            { name: 'In-Car Wi-Fi Hotspot',                  available: true  },
            { name: 'Head-Up Display (HUD)',                 available: false },
            { name: 'Rear Seat Entertainment System',        available: false },
        ],
    },
    {
        id: 'comfort',
        label: 'Comfort & Convenience',
        icon: Armchair,
        features: [
            { name: 'Ventilated Front Seats',                available: true  },
            { name: 'Panoramic Sunroof',                     available: true  },
            { name: 'Electric Adjustable Driver Seat',       available: true  },
            { name: 'Auto Climate Control (Dual Zone)',      available: true  },
            { name: 'Keyless Entry & Push Button Start',     available: true  },
            { name: 'Wireless Phone Charging',               available: true  },
            { name: 'Rear Seat Recline & Armrest',           available: true  },
            { name: 'Power Folding ORVMs',                   available: false },
        ],
    },
    {
        id: 'exterior',
        label: 'Exterior & Lighting',
        icon: Lightbulb,
        features: [
            { name: 'Full LED Headlamps with DRL',           available: true  },
            { name: 'LED Tail Lamps',                        available: true  },
            { name: 'Rain-sensing Wipers',                   available: true  },
            { name: '17" Dual Tone Alloy Wheels',            available: true  },
            { name: 'Shark Fin Antenna',                     available: true  },
            { name: 'Roof Rails',                            available: false },
            { name: 'Power Tailgate',                        available: false },
            { name: 'Chrome Exterior Accents',               available: false },
        ],
    },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function FeatureRow({ name, available }: { name: string; available: boolean }) {
    return (
        <div className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/20 transition-colors">
            <span className={`text-sm font-normal ${available ? 'text-foreground' : 'text-muted-foreground/55'}`}>
                {name}
            </span>
            {available ? (
                <span className="text-sm font-medium text-green-600 dark:text-green-500 shrink-0 ml-4">Yes</span>
            ) : (
                <span className="text-sm text-muted-foreground/35 shrink-0 ml-4">—</span>
            )}
        </div>
    );
}

function FeatureAccordion({
    category,
    isOpen,
    onToggle,
}: {
    category: typeof FEATURE_CATEGORIES[0];
    isOpen: boolean;
    onToggle: () => void;
}) {
    const Icon           = category.icon;
    const availableCount = category.features.filter(f => f.available).length;
    const totalCount     = category.features.length;
    const pct            = Math.round((availableCount / totalCount) * 100);

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-card hover:bg-muted/40 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-foreground text-sm">{category.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{availableCount}/{totalCount} included</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium w-8 text-right">{pct}%</span>
                    </div>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-card border-t border-border py-1">
                    {category.features.map((feature) => (
                        <FeatureRow key={feature.name} name={feature.name} available={feature.available} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────
interface FeaturesProps {
    car: EnrichedCar;
    sectionRef: (el: HTMLElement | null) => void;
}

export function Features({ car, sectionRef }: FeaturesProps) {
    const [openCategory, setOpenCategory] = useState<string | null>('safety');

    const totalAvailable = FEATURE_CATEGORIES.reduce(
        (acc, c) => acc + c.features.filter(f => f.available).length, 0
    );

    return (
        <section id="features" ref={sectionRef} className="scroll-mt-28 space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Features & Equipment</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {totalAvailable} features across {FEATURE_CATEGORIES.length} categories
                    </p>
                </div>
                <button
                    onClick={() => setOpenCategory(null)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                    Collapse all
                </button>
            </div>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-2">
                {car.features.map(f => (
                    <span
                        key={f}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                                   bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
                                   border border-blue-100 dark:border-blue-800"
                    >
                        <CheckCircle2 className="h-3 w-3" />
                        {f}
                    </span>
                ))}
            </div>

            {/* Accordions */}
            <div className="space-y-2">
                {FEATURE_CATEGORIES.map((category) => (
                    <FeatureAccordion
                        key={category.id}
                        category={category}
                        isOpen={openCategory === category.id}
                        onToggle={() => setOpenCategory(prev => prev === category.id ? null : category.id)}
                    />
                ))}
            </div>
        </section>
    );
}
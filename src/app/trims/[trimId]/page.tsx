'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { InsightBadge, type InsightType } from "@/components/car/InsightBadge";
import { RiInsightsTab } from "@/components/car/RiInsightsTab";
import { SafetyRatings, type SafetyRatingData } from "@/components/car/SafetyRatings";
import { ThreeDImageRing } from "@/components/lightswind/3d-image-ring";
import {
    ArrowLeft,
    ArrowRight,
    Heart,
    Share2,
    Star,
    Zap,
    Gauge,
    Timer,
    ChevronDown,
    CheckCircle2,
    TrendingUp,
    Camera,
    Wifi,
    Car as CarIcon,
    Armchair,
    Shield,
    Lightbulb,
    Navigation,
    SunMedium,
    KeyRound,
    MonitorSmartphone,
    ShieldAlert,
    Radar,
    Wind,
    Disc,
    BatteryCharging,
    Volume2,
    X,
} from 'lucide-react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/card";

import carsData from "@/data/cars.json";
import { Car as BaseCar } from "@/components/car/CarCard";

// ── Types ──────────────────────────────────────────────────────────────────

export interface InsightData {
    overallRating: number;
    recommendationPercent: number;
    mostMentioned: string;
    topAdvantage: string;
    ownershipConfidence: {
        level: 'Low' | 'Moderate' | 'High';
        description: string;
    };
    categoryRatings: {
        label: string;
        score: number;
        subLabel?: string;
    }[];
    userFeedback: {
        positives: string[];
        negatives: string[];
    };
}

export interface EnrichedCar extends BaseCar {
    horsepower: number;
    torque: string;
    acceleration: string;
    transmission?: string;
    colors: string[];
    description: string;
    safetyRatings: SafetyRatingData;
    features: string[];
    insights: { type: InsightType; label: string }[];
    riInsights: InsightData;
    gallery: {
        exterior: string[];
        interior: string[];
    };
}

// ── Gallery image data with titles ────────────────────────────────────────
const EXTERIOR_IMAGES = [
    { src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80", title: "Front Quarter View"  },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", title: "Side Profile"       },
    { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80", title: "Rear View"           },
    { src: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80", title: "Dynamic Angle"       },
];

const INTERIOR_IMAGES = [
    { src: "https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?auto=format&fit=crop&w=800&q=80", title: "Dashboard Overview" },
    { src: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80", title: "Centre Console"      },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", title: "Driver's Cockpit"   },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", title: "Rear Cabin"          },
];

const SALES_DATA = [
    { month: "Jan", sales: 980  },
    { month: "Feb", sales: 1120 },
    { month: "Mar", sales: 1450 },
    { month: "Apr", sales: 1280 },
    { month: "May", sales: 1620 },
    { month: "Jun", sales: 1890 },
    { month: "Jul", sales: 2100 },
    { month: "Aug", sales: 1950 },
    { month: "Sep", sales: 2240 },
    { month: "Oct", sales: 2080 },
    { month: "Nov", sales: 2350 },
    { month: "Dec", sales: 2600 },
];

// ── Feature categories ────────────────────────────────────────────────────
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

// ── CHANGE 2 & 4: Feature row — no icon, no divider lines, regular font weight ──
function FeatureRow({ name, available }: { name: string; available: boolean }) {
    return (
        <div className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/20 transition-colors">
            <span className={`text-sm font-normal ${available ? 'text-foreground' : 'text-muted-foreground/55'}`}>
                {name}
            </span>
            {available ? (
                <span className="text-sm font-medium text-green-600 dark:text-green-500 flex-shrink-0 ml-4">
                    Yes
                </span>
            ) : (
                <span className="text-sm text-muted-foreground/35 flex-shrink-0 ml-4">
                    —
                </span>
            )}
        </div>
    );
}

// ── CHANGE 1: Single-open accordion — controlled by parent ────────────────
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
            {/* Header */}
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

            {/* CHANGE 2: No column sub-header, no icon boxes, no border-b between rows */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="bg-card border-t border-border py-1">
                    {category.features.map((feature) => (
                        <FeatureRow
                            key={feature.name}
                            name={feature.name}
                            available={feature.available}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Gallery Lightbox with prev/next arrows and image title ────────────────
function GalleryLightbox({
    images,
    initialIndex,
    onClose,
}: {
    images: { src: string; title: string }[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(initialIndex);

    const prev = useCallback(() =>
        setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() =>
        setCurrent(i => (i + 1) % images.length), [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft')  prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape')     onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [prev, next, onClose]);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/92 flex flex-col items-center justify-center backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                onClick={onClose}
            >
                <X className="h-5 w-5 text-white" />
            </button>

            {/* Counter */}
            <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest uppercase select-none">
                {current + 1} / {images.length}
            </p>

            {/* Image */}
            <div
                className="relative w-full max-w-4xl px-16"
                style={{ height: '65vh' }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[current].src}
                    alt={images[current].title}
                    fill
                    className="object-contain"
                    unoptimized
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                />
            </div>

            {/* Image title */}
            <p className="mt-5 text-white font-semibold text-base tracking-wide select-none">
                {images[current].title}
            </p>

            {/* Prev arrow */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
            >
                <ArrowLeft className="h-5 w-5 text-white" />
            </button>

            {/* Next arrow */}
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
            >
                <ArrowRight className="h-5 w-5 text-white" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 flex items-center gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CarDetailsPage({ params }: { params: Promise<{ trimId: string }> }) {
    const router         = useRouter();
    const resolvedParams = use(params);
    const id             = Number(resolvedParams.trimId);

    const [car,              setCar]              = useState<EnrichedCar | null>(null);
    const [compareCar,       setCompareCar]       = useState<EnrichedCar | null>(null);
    const [selectedColor,    setSelectedColor]    = useState<string>('');
    const [activeSection,    setActiveSection]    = useState('details');
    const [activeGalleryTab, setActiveGalleryTab] = useState<'exterior' | 'interior'>('exterior');
    const [lightbox,         setLightbox]         = useState<{ index: number; tab: 'exterior' | 'interior' } | null>(null);

    // CHANGE 1: single open category (null = all closed)
    const [openCategory, setOpenCategory] = useState<string | null>('safety');

    const toggleCategory = (id: string) =>
        setOpenCategory(prev => prev === id ? null : id);
    const collapseAll = () => setOpenCategory(null);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 85;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            setActiveSection(sectionId);
        }
    };

    useEffect(() => {
        if (!car) return;
        const handleScroll = () => {
            const sections = ['details', 'features', 'ri-sights', 'design', 'compare', 'sales'];
            let current = sections[0];
            for (const sid of sections) {
                const el = document.getElementById(sid);
                if (el && el.getBoundingClientRect().top <= 100) current = sid;
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [car]);

    useEffect(() => {
        const foundCar = carsData.find(c => c.id === id);
        if (foundCar) {
            const positiveInsights = [
                'Advanced safety package (6 airbags, ADAS Level 2, 4‑wheel disc brakes, 3‑point seat belts)',
                'Improved interior design and materials',
            ];
            const neutralInsights  = ['Neutral observation: No idea about servicing and maintenance'];
            const negativeInsights = ['Customer service at Mahindra Samrat Car showroom Vapi'];
            const getRandom = (arr: string[], count: number) =>
                [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

            const enriched: EnrichedCar = {
                ...foundCar,
                horsepower: 110 + Math.floor(Math.random() * 200),
                torque: `${150 + Math.floor(Math.random() * 300)} Nm`,
                acceleration: `${(4 + Math.random() * 6).toFixed(1)}s`,
                colors: ['#FFFFFF', '#1F2937', '#DC2626', '#2563EB', '#D97706'],
                description: `${foundCar.brand} ${foundCar.model} with automatic transmission in premium finish. This luxury vehicle redefines versatility with refined performance and cutting-edge technology. Experience the perfect blend of comfort and power.`,
                safetyRatings: {
                    globalNcap: { adult: foundCar.rating >= 4.5 ? 5 : 4, child: foundCar.rating >= 4.5 ? 5 : 3 },
                    bharatNcap: { status: Math.random() > 0.3 ? "Not Tested" : "Tested", adult: 5, child: 4 },
                },
                features: ["360° Camera", "Ventilated Seats", "ADAS Level 2", "Panoramic Sunroof", "Connected Car Tech"],
                insights: [
                    ...getRandom(positiveInsights, 2).map(label => ({ type: 'positive' as InsightType, label })),
                    ...getRandom(neutralInsights,  1).map(label => ({ type: 'neutral'  as InsightType, label })),
                    ...getRandom(negativeInsights, 1).map(label => ({ type: 'negative' as InsightType, label })),
                ],
                riInsights: {
                    overallRating: Number((3 + Math.random() * 2).toFixed(1)),
                    recommendationPercent: 70 + Math.floor(Math.random() * 25),
                    mostMentioned: ['Mileage','Comfort','Power','Style'][Math.floor(Math.random() * 4)],
                    topAdvantage: ['Fuel Efficiency','Ride Quality','Safety','Resale Value'][Math.floor(Math.random() * 4)],
                    ownershipConfidence: {
                        level: Math.random() > 0.5 ? 'Moderate' : 'High',
                        description: 'Driven by Service and Reliability Feedback',
                    },
                    categoryRatings: [
                        { label: 'Build Quality & Safety',  subLabel: 'Build Quality & Paint Issues',    score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Features & Tech',         subLabel: 'Missing basic features',          score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'After Sales Service',     subLabel: 'Need improvements - High Impact', score: Number((2   + Math.random() * 2.5).toFixed(1)) },
                        { label: 'Engine Reliability',      subLabel: 'Mixed long term feedback',        score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Performance',             subLabel: 'Below segment expectations',      score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Comfort & Interiors',     subLabel: 'Spacious and Comfortable',        score: Number((4   + Math.random()).toFixed(1))        },
                    ],
                    userFeedback: {
                        positives: [
                            'Great mileage in city traffic', 'Excellent build quality', 'Very comfortable for long drives',
                            'Mileage is fantastic!', 'Smooth and powerful engine performance', 'Low maintenance costs and reliable service',
                            'Spacious interior with premium feel', 'Advanced safety features give peace of mind', 'Great value for money compared to competitors',
                        ],
                        negatives: [
                            'Engine noise at high speeds', 'Infotainment system lags sometimes', 'Suspension is a bit stiff',
                            'Rear seat space could be better', 'Fuel efficiency drops on highways', 'AC cooling could be more effective in peak summer',
                            'Boot space feels limited for family trips', 'Touchscreen response is not very smooth', 'Headlight brightness could be better at night',
                        ],
                    },
                },
                gallery: {
                    exterior: EXTERIOR_IMAGES.map(i => i.src),
                    interior: INTERIOR_IMAGES.map(i => i.src),
                },
            };
            setCar(enriched);
            setSelectedColor('#FFFFFF');

            const otherCar = carsData.find(c => c.id !== id);
            if (otherCar) {
                setCompareCar({
                    ...otherCar,
                    horsepower: 110 + Math.floor(Math.random() * 200),
                    torque: `${150 + Math.floor(Math.random() * 300)} Nm`,
                    acceleration: `${(4 + Math.random() * 6).toFixed(1)}s`,
                    colors: [], description: '',
                    safetyRatings: { globalNcap: { adult: 4, child: 3 }, bharatNcap: { status: 'Not Tested', adult: 4, child: 3 } },
                    features: ["ABS", "Airbags", "Cruise Control", "Rear Camera"],
                    insights: [],
                    riInsights: {
                        overallRating: Number((3 + Math.random() * 2).toFixed(1)),
                        recommendationPercent: 65 + Math.floor(Math.random() * 25),
                        mostMentioned: 'Comfort', topAdvantage: 'Value for Money',
                        ownershipConfidence: { level: 'Moderate', description: '' },
                        categoryRatings: [], userFeedback: { positives: [], negatives: [] },
                    },
                    gallery: { exterior: [], interior: [] },
                });
            }
        }
    }, [id]);

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                Loading luxurious experience...
            </div>
        );
    }

    const ringImages          = [...EXTERIOR_IMAGES, ...INTERIOR_IMAGES].map(i => i.src).slice(0, 8);
    const currentGalleryImages = activeGalleryTab === 'exterior' ? EXTERIOR_IMAGES : INTERIOR_IMAGES;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-24">

            {/* ── 1. Top Nav ── */}
            <nav className="absolute top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 bg-transparent pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-white/10 text-white rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex flex-col ml-2">
                        <h1 className="text-lg font-bold text-white leading-tight tracking-tight">{car.brand} {car.model}</h1>
                        <div className="flex items-center gap-1 text-white/60 text-xs font-medium cursor-pointer hover:text-white transition-colors">
                            <span>Premium Plus</span>
                            <ChevronDown className="h-3 w-3" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                    <Button variant="ghost" size="icon" className="text-white/80 hover:text-red-400 hover:bg-white/10 rounded-full transition-colors">
                        <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/80 hover:text-blue-400 hover:bg-white/10 rounded-full transition-colors">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>
            </nav>

            {/* ── 2. Hero ── */}
            <section className="pt-16 pb-8 bg-[#0F172A] text-white relative overflow-hidden shadow-xl" style={{ minHeight: '520px' }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1E293B_0%,_#0F172A_60%,_#020617_100%)] z-0" />
                <div
                    className="absolute inset-0 z-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                    <div className="mt-20 mb-4 flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full">
                            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-yellow-400 font-bold text-sm">{car.rating}</span>
                        </div>
                        <span className="text-white/40 text-xs font-medium tracking-widest uppercase">Drag to Explore</span>
                    </div>
                    <div className="w-full" style={{ height: '340px', position: 'relative' }}>
                        <ThreeDImageRing
                            images={ringImages}
                            width={240} perspective={1800} imageDistance={420}
                            initialRotation={180} animationDuration={1.2} staggerDelay={0.08}
                            hoverOpacity={0.45} draggable={true} mobileBreakpoint={768}
                            mobileScaleFactor={0.75} inertiaPower={0.7} inertiaTimeConstant={350}
                            inertiaVelocityMultiplier={18}
                            containerClassName="rounded-xl" imageClassName="rounded-xl shadow-2xl"
                        />
                    </div>
                    <p className="mt-2 text-white/30 text-[11px] tracking-widest uppercase font-medium select-none">
                        ← Drag to rotate →
                    </p>
                    <div className="mt-6 flex items-center gap-3 bg-gray-800/50 p-2 rounded-full backdrop-blur-sm border border-gray-700/50">
                        {car.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                                    selectedColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                                }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. Sticky Nav ── */}
            <div className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center justify-center gap-8 overflow-x-auto no-scrollbar">
                        {['Details', 'Features', 'Ri-Sights', 'Design', 'Compare', 'Sales'].map((tab) => {
                            const tabId    = tab.toLowerCase();
                            const isActive = activeSection === tabId;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => scrollToSection(tabId)}
                                    className={`relative py-4 px-2 font-medium text-sm transition-colors whitespace-nowrap ${
                                        isActive
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                                >
                                    {tab}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── 4. Sections ── */}
            <div className="container mx-auto px-4 max-w-5xl space-y-24 pb-32 pt-12">

                {/* ── Details ── */}
                <section id="details" className="scroll-mt-32 space-y-8">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{car.description}</p>

                    {/* Spec Cards */}
                    <div className="flex justify-center gap-4">
                        {[
                            { label: 'Horsepower', value: `${car.horsepower} HP`, icon: Zap,   sub: 'Max Power'    },
                            { label: 'Torque',     value: car.torque,             icon: Gauge, sub: 'Peak Torque'  },
                            { label: '0–60 mph',   value: car.acceleration,       icon: Timer, sub: 'Acceleration' },
                        ].map((spec) => (
                            <div
                                key={spec.label}
                                className="flex flex-col items-center justify-center text-center gap-2
                                           bg-card border border-border rounded-2xl w-50 aspect-square p-4
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
                    <div className="flex flex-wrap gap-3 justify-center mt-4">
                        {car.insights.map((insight, index) => (
                            <InsightBadge key={index} type={insight.type} label={insight.label} />
                        ))}
                    </div>

                    {/* Safety Ratings */}
                    <div className="[&_*]:!text-sm [&_.text-4xl]:!text-2xl [&_.text-3xl]:!text-xl [&_p.text-lg]:!text-base">
                        <SafetyRatings data={car.safetyRatings} />
                    </div>
                </section>

                {/* ── Features ── */}
                <section id="features" className="scroll-mt-32 space-y-5">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Features & Equipment</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {FEATURE_CATEGORIES.reduce((acc, c) => acc + c.features.filter(f => f.available).length, 0)} features across {FEATURE_CATEGORIES.length} categories
                            </p>
                        </div>
                        {/* Collapse all only (single-open doesn't need expand all) */}
                        <button
                            onClick={collapseAll}
                            className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
                        >
                            Collapse all
                        </button>
                    </div>

                    {/* Summary chips */}
                    <div className="flex flex-wrap gap-2">
                        {car.features.map(f => (
                            <span
                                key={f}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800"
                            >
                                <CheckCircle2 className="h-3 w-3" />
                                {f}
                            </span>
                        ))}
                    </div>

                    {/* CHANGE 1: single-open accordion */}
                    <div className="space-y-2">
                        {FEATURE_CATEGORIES.map((category) => (
                            <FeatureAccordion
                                key={category.id}
                                category={category}
                                isOpen={openCategory === category.id}
                                onToggle={() => toggleCategory(category.id)}
                            />
                        ))}
                    </div>

                    {/* CHANGE 3: legend removed entirely */}
                </section>

                {/* ── Ri-Sights ── */}
                <section id="ri-sights" className="scroll-mt-32">
                    {car.riInsights && <RiInsightsTab data={car.riInsights} />}
                </section>

                {/* ── Design / Gallery ── */}
                <section id="design" className="scroll-mt-32 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
                        <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                            {(['exterior', 'interior'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveGalleryTab(tab)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                                        activeGalleryTab === tab
                                            ? 'bg-card shadow text-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {currentGalleryImages.map((img, i) => (
                            <div
                                key={i}
                                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${i === 0 ? 'col-span-2 h-72' : 'h-52'}`}
                                onClick={() => setLightbox({ index: i, tab: activeGalleryTab })}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    unoptimized
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                {/* Show title on hover */}
                                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                        {img.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Compare (commented out) ── */}
                {/* <section id="compare" className="scroll-mt-32 space-y-6"> ... </section> */}

                {/* ── Sales ── */}
                <section id="sales" className="scroll-mt-32 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-foreground">Sales Trend</h2>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                            <TrendingUp className="h-4 w-4" />
                            <span>+18.2% YoY</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Units (2024)', value: '23,170', sub: 'Annual Sales'  },
                            { label: 'Best Month',         value: 'Dec',    sub: '2,600 units'   },
                            { label: 'Avg Monthly',        value: '1,930',  sub: 'Units / month' },
                        ].map((s) => (
                            <Card key={s.label} className="p-4 bg-card border-none shadow-sm text-center">
                                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                                <p className="text-xs text-blue-500 font-medium mt-0.5">{s.sub}</p>
                            </Card>
                        ))}
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Monthly Sales — 2024</h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={SALES_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '13px' }}
                                    formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()} units`, 'Sales']}
                                />
                                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#2563eb' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quarter-wise Distribution</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart
                                data={[
                                    { quarter: 'Q1', sales: SALES_DATA.slice(0, 3).reduce((a, b) => a + b.sales, 0) },
                                    { quarter: 'Q2', sales: SALES_DATA.slice(3, 6).reduce((a, b) => a + b.sales, 0) },
                                    { quarter: 'Q3', sales: SALES_DATA.slice(6, 9).reduce((a, b) => a + b.sales, 0) },
                                    { quarter: 'Q4', sales: SALES_DATA.slice(9, 12).reduce((a, b) => a + b.sales, 0) },
                                ]}
                                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                                <XAxis dataKey="quarter" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={50} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '13px' }}
                                    formatter={(value: number | undefined) => [`${(value ?? 0).toLocaleString()} units`, 'Sales']}
                                />
                                <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

            </div>

            {/* ── Sticky Bottom CTA ── */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:px-8 z-40 pb-6">
                <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Price Starts From</p>
                        <p className="text-3xl font-bold text-foreground mt-1">{car.priceLabel}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button size="lg" className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 rounded-xl h-12 font-semibold shadow-l shadow-blue-200 dark:shadow-none">
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Gallery Lightbox — rendered at root level to avoid clipping ── */}
            {lightbox && (
                <GalleryLightbox
                    images={lightbox.tab === 'exterior' ? EXTERIOR_IMAGES : INTERIOR_IMAGES}
                    initialIndex={lightbox.index}
                    onClose={() => setLightbox(null)}
                />
            )}

        </div>
    );
}
'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { InsightBadge, type InsightType } from "@/components/car/InsightBadge";
import { RiInsightsTab } from "@/components/car/RiInsightsTab";
import { SafetyRatings, type SafetyRatingData } from "@/components/car/SafetyRatings";
import { ThreeDImageRing } from "@/components/lightswind/3d-image-ring";
import {
    ArrowLeft,
    Heart,
    Share2,
    Star,
    Zap,
    Gauge,
    Timer,
    ChevronDown,
    ShieldCheck,
    CheckCircle2,
    TrendingUp,
    Camera,
    Wifi,
    Car as CarIcon,
    Armchair,
    Shield,
    Lightbulb,
    Users,
    Layers,
    Cpu,
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

// ── Mock Data ──────────────────────────────────────────────────────────────

const EXTERIOR_IMAGES = [
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80",
];

const INTERIOR_IMAGES = [
    "https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
];

const SALES_DATA = [
    { month: "Jan", sales: 980 },
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

// ── CHANGE 3: Feature Specs — icon + label + count ─────────────────────────
const FEATURE_SPECS = [
    { icon: Shield,   label: 'Airbags',    value: '6'      },
    { icon: CarIcon,  label: 'ADAS',       value: 'Lvl 2'  },
    { icon: Camera,   label: 'Cameras',    value: '360°'   },
    { icon: Wifi,     label: 'Speakers',   value: '8'      },
    { icon: Armchair, label: 'Seats',      value: '5'      },
    { icon: Gauge,    label: 'Cylinders',  value: '4'      },
    { icon: Zap,      label: 'USB Ports',  value: '3'      },
    { icon: Lightbulb,label: 'LED Zones',  value: '4'      },
];

// ── CHANGE 4: Neutral card colors (white/card + border-border) ─────────────
const FEATURE_CATEGORIES = [
    {
        id: 'safety',
        label: 'Safety & Security',
        icon: Shield,
        iconColor: 'text-foreground',
        features: [
            { name: '6 Airbags (Front, Side & Curtain)', available: true },
            { name: 'Electronic Stability Control (ESC)', available: true },
            { name: 'Hill Start Assist', available: true },
            { name: 'Anti-lock Braking System (ABS)', available: true },
            { name: 'ISOFIX Child Seat Anchors', available: true },
            { name: 'Tyre Pressure Monitoring System', available: true },
            { name: 'Auto-dimming IRVM', available: false },
            { name: 'Blind Spot Detection', available: false },
        ],
    },
    {
        id: 'adas',
        label: 'ADAS & Driver Assistance',
        icon: CarIcon,
        iconColor: 'text-foreground',
        features: [
            { name: 'ADAS Level 2 Suite', available: true },
            { name: 'Autonomous Emergency Braking', available: true },
            { name: 'Lane Departure Warning', available: true },
            { name: 'Adaptive Cruise Control', available: true },
            { name: '360° Surround View Camera', available: true },
            { name: 'Rear Cross Traffic Alert', available: true },
            { name: 'Auto High Beam', available: false },
            { name: 'Traffic Sign Recognition', available: false },
        ],
    },
    {
        id: 'infotainment',
        label: 'Infotainment & Connectivity',
        icon: Wifi,
        iconColor: 'text-foreground',
        features: [
            { name: '10.25" HD Touchscreen', available: true },
            { name: 'Wireless Android Auto & Apple CarPlay', available: true },
            { name: 'Connected Car Tech (OTA Updates)', available: true },
            { name: 'Premium 8-Speaker Sound System', available: true },
            { name: 'Digital Instrument Cluster', available: true },
            { name: 'In-Car Wi-Fi Hotspot', available: true },
            { name: 'Head-Up Display (HUD)', available: false },
            { name: 'Rear Seat Entertainment System', available: false },
        ],
    },
    {
        id: 'comfort',
        label: 'Comfort & Convenience',
        icon: Armchair,
        iconColor: 'text-foreground',
        features: [
            { name: 'Ventilated Front Seats', available: true },
            { name: 'Panoramic Sunroof', available: true },
            { name: 'Electric Adjustable Driver Seat', available: true },
            { name: 'Auto Climate Control (Dual Zone)', available: true },
            { name: 'Keyless Entry & Push Button Start', available: true },
            { name: 'Wireless Phone Charging', available: true },
            { name: 'Rear Seat Recline & Armrest', available: true },
            { name: 'Power Folding ORVMs', available: false },
        ],
    },
    {
        id: 'exterior',
        label: 'Exterior & Lighting',
        icon: Lightbulb,
        iconColor: 'text-foreground',
        features: [
            { name: 'Full LED Headlamps with DRL', available: true },
            { name: 'LED Tail Lamps', available: true },
            { name: 'Rain-sensing Wipers', available: true },
            { name: '17" Dual Tone Alloy Wheels', available: true },
            { name: 'Shark Fin Antenna', available: true },
            { name: 'Roof Rails', available: false },
            { name: 'Power Tailgate', available: false },
            { name: 'Chrome Exterior Accents', available: false },
        ],
    },
];

// ── CHANGE 4: FeatureAccordion — plain card colors, no per-category tinting ─
function FeatureAccordion({
    category,
    isOpen,
    onToggle,
}: {
    category: typeof FEATURE_CATEGORIES[0];
    isOpen: boolean;
    onToggle: () => void;
}) {
    const Icon = category.icon;
    const availableCount = category.features.filter(f => f.available).length;
    const totalCount = category.features.length;
    const pct = Math.round((availableCount / totalCount) * 100);

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-card hover:bg-muted/40 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className={`h-4 w-4 ${category.iconColor}`} />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-foreground text-sm">{category.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {availableCount}/{totalCount} included
                        </p>
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

            {/* Expandable body */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="bg-muted/20 px-4 py-3 border-t border-border">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {category.features.map((feature) => (
                            <li
                                key={feature.name}
                                className={`flex items-center gap-2 text-sm py-1.5 px-2.5 rounded-lg ${
                                    feature.available ? 'text-foreground' : 'text-muted-foreground/50'
                                }`}
                            >
                                <CheckCircle2
                                    className={`h-3.5 w-3.5 flex-shrink-0 ${
                                        feature.available
                                            ? 'text-green-500'
                                            : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                />
                                <span className={feature.available ? '' : 'line-through opacity-50'}>
                                    {feature.name}
                                </span>
                                {!feature.available && (
                                    <span className="ml-auto text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                        Not Included
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CarDetailsPage({ params }: { params: Promise<{ trimId: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const id = Number(resolvedParams.trimId);

    const [car, setCar] = useState<EnrichedCar | null>(null);
    const [compareCar, setCompareCar] = useState<EnrichedCar | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [activeSection, setActiveSection] = useState('details');
    const [activeGalleryTab, setActiveGalleryTab] = useState<'exterior' | 'interior'>('exterior');
    const [lightboxImg, setLightboxImg] = useState<string | null>(null);
    const [openCategories, setOpenCategories] = useState<string[]>(['safety']);

    const toggleCategory = (id: string) =>
        setOpenCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    const expandAll  = () => setOpenCategories(FEATURE_CATEGORIES.map(c => c.id));
    const collapseAll = () => setOpenCategories([]);

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
                        { label: 'Build Quality & Safety',  subLabel: 'Build Quality & Paint Issues',       score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Features & Tech',         subLabel: 'Missing basic features',             score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'After Sales Service',     subLabel: 'Need improvements - High Impact',    score: Number((2   + Math.random() * 2.5).toFixed(1)) },
                        { label: 'Engine Reliability',      subLabel: 'Mixed long term feedback',           score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Performance',             subLabel: 'Below segment expectations',         score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Comfort & Interiors',     subLabel: 'Spacious and Comfortable',           score: Number((4   + Math.random()).toFixed(1))        },
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
                gallery: { exterior: EXTERIOR_IMAGES, interior: INTERIOR_IMAGES },
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
                    colors: [],
                    description: '',
                    safetyRatings: { globalNcap: { adult: 4, child: 3 }, bharatNcap: { status: 'Not Tested', adult: 4, child: 3 } },
                    features: ["ABS", "Airbags", "Cruise Control", "Rear Camera"],
                    insights: [],
                    riInsights: {
                        overallRating: Number((3 + Math.random() * 2).toFixed(1)),
                        recommendationPercent: 65 + Math.floor(Math.random() * 25),
                        mostMentioned: 'Comfort',
                        topAdvantage: 'Value for Money',
                        ownershipConfidence: { level: 'Moderate', description: '' },
                        categoryRatings: [],
                        userFeedback: { positives: [], negatives: [] },
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

    const ringImages = [...car.gallery.exterior, ...car.gallery.interior].slice(0, 8);

    const compareSpecs = [
        { label: 'Horsepower',   key: 'horsepower',   format: (v: EnrichedCar) => `${v.horsepower} HP`       },
        { label: 'Torque',       key: 'torque',        format: (v: EnrichedCar) => v.torque                   },
        { label: '0–60 mph',     key: 'acceleration',  format: (v: EnrichedCar) => v.acceleration             },
        { label: 'Rating',       key: 'rating',        format: (v: EnrichedCar) => `${v.rating} ★`            },
        { label: 'Price',        key: 'priceLabel',    format: (v: EnrichedCar) => v.priceLabel               },
        { label: 'Fuel Type',    key: 'fuel',          format: (v: EnrichedCar) => v.fuel ?? 'Petrol'         },
        { label: 'Transmission', key: 'transmission',  format: (v: EnrichedCar) => v.transmission ?? 'Automatic' },
    ];

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
                            width={240}
                            perspective={1800}
                            imageDistance={420}
                            initialRotation={180}
                            animationDuration={1.2}
                            staggerDelay={0.08}
                            hoverOpacity={0.45}
                            draggable={true}
                            mobileBreakpoint={768}
                            mobileScaleFactor={0.75}
                            inertiaPower={0.7}
                            inertiaTimeConstant={350}
                            inertiaVelocityMultiplier={18}
                            containerClassName="rounded-xl"
                            imageClassName="rounded-xl shadow-2xl"
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
                            const tabId = tab.toLowerCase();
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

                    {/* CHANGE 1: Medium-size spec cards — not tiny pills, not huge boxes */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Horsepower', value: `${car.horsepower} HP`, icon: Zap,   sub: 'Max Power'    },
                            { label: 'Torque',     value: car.torque,             icon: Gauge, sub: 'Peak Torque'  },
                            { label: '0–60 mph',   value: car.acceleration,       icon: Timer, sub: 'Acceleration' },
                        ].map((spec) => (
                            <div
                                key={spec.label}
                                className="flex flex-col gap-3 bg-card border border-border rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="h-9 w-9 bg-muted rounded-xl flex items-center justify-center">
                                    <spec.icon className="h-4 w-4 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-foreground leading-tight">{spec.value}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">{spec.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {car.insights.map((insight, index) => (
                            <InsightBadge key={index} type={insight.type} label={insight.label} />
                        ))}
                    </div>

                    {/* CHANGE 2: SafetyRatings wrapped to reduce visual weight */}
                    <div className="[&_*]:!text-sm [&_.text-4xl]:!text-2xl [&_.text-3xl]:!text-xl [&_p.text-lg]:!text-base">
                        <SafetyRatings data={car.safetyRatings} />
                    </div>
                </section>

                {/* ── Features ── */}
                <section id="features" className="scroll-mt-32 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Features & Equipment</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {FEATURE_CATEGORIES.reduce((acc, c) => acc + c.features.filter(f => f.available).length, 0)} features across {FEATURE_CATEGORIES.length} categories
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={expandAll} className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                Expand all
                            </button>
                            <span className="text-muted-foreground">·</span>
                            <button onClick={collapseAll} className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline">
                                Collapse
                            </button>
                        </div>
                    </div>

                    {/* CHANGE 3: Icon + label + value spec grid — no tick marks */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {FEATURE_SPECS.map((spec) => {
                            const Icon = spec.icon;
                            return (
                                <div
                                    key={spec.label}
                                    className="flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-3 text-center"
                                >
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm font-bold text-foreground leading-none">{spec.value}</span>
                                    <span className="text-[10px] text-muted-foreground font-medium leading-tight">{spec.label}</span>
                                </div>
                            );
                        })}
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

                    {/* Accordion */}
                    <div className="space-y-2">
                        {FEATURE_CATEGORIES.map((category) => (
                            <FeatureAccordion
                                key={category.id}
                                category={category}
                                isOpen={openCategories.includes(category.id)}
                                onToggle={() => toggleCategory(category.id)}
                            />
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            Included in this variant
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
                            Not included / optional
                        </span>
                    </div>
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
                        {car.gallery[activeGalleryTab].map((img, i) => (
                            <div
                                key={i}
                                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${i === 0 ? 'col-span-2 h-72' : 'h-52'}`}
                                onClick={() => setLightboxImg(img)}
                            >
                                <Image
                                    src={img}
                                    alt={`${activeGalleryTab} ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    unoptimized
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                        {activeGalleryTab === 'exterior' ? 'Exterior' : 'Interior'} View {i + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {lightboxImg && (
                        <div
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                            onClick={() => setLightboxImg(null)}
                        >
                            <div className="relative w-full max-w-4xl h-[70vh] rounded-2xl overflow-hidden">
                                <Image
                                    src={lightboxImg}
                                    alt="Gallery"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                                />
                            </div>
                            <button
                                className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl font-light"
                                onClick={() => setLightboxImg(null)}
                            >✕</button>
                        </div>
                    )}
                </section>

                {/* ── Compare ── */}
                {/* <section id="compare" className="scroll-mt-32 space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Compare Variants</h2>
                    {compareCar ? (
                        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                            <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                                <div className="p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Specification</div>
                                <div className="p-4 border-l border-border text-center">
                                    <p className="font-bold text-foreground text-sm">{car.brand}</p>
                                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-base">{car.model}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Current Variant</p>
                                </div>
                                <div className="p-4 border-l border-border text-center">
                                    <p className="font-bold text-foreground text-sm">{compareCar.brand}</p>
                                    <p className="text-purple-600 dark:text-purple-400 font-semibold text-base">{compareCar.model}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Compare With</p>
                                </div>
                            </div>
                            {compareSpecs.map((spec, idx) => {
                                const val1 = spec.format(car);
                                const val2 = spec.format(compareCar);
                                const isNumericBetter = spec.key === 'horsepower' || spec.key === 'rating';
                                const num1 = parseFloat(val1);
                                const num2 = parseFloat(val2);
                                const car1Better = isNumericBetter ? num1 > num2 : false;
                                const car2Better = isNumericBetter ? num2 > num1 : false;
                                return (
                                    <div key={spec.key} className={`grid grid-cols-3 border-b border-border last:border-0 ${idx % 2 === 0 ? '' : 'bg-muted/20'}`}>
                                        <div className="p-4 text-sm text-muted-foreground font-medium flex items-center">{spec.label}</div>
                                        <div className={`p-4 border-l border-border text-center text-sm font-semibold flex items-center justify-center gap-1.5 ${car1Better ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                                            {car1Better && <span className="text-green-500 text-xs">▲</span>}
                                            {val1}
                                        </div>
                                        <div className={`p-4 border-l border-border text-center text-sm font-semibold flex items-center justify-center gap-1.5 ${car2Better ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                                            {car2Better && <span className="text-green-500 text-xs">▲</span>}
                                            {val2}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-muted-foreground bg-muted rounded-xl border border-dashed border-border">
                            <p>No comparison vehicle available.</p>
                        </div>
                    )}
                </section> */}

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
                            { label: 'Total Units (2024)', value: '23,170', sub: 'Annual Sales'    },
                            { label: 'Best Month',         value: 'Dec',    sub: '2,600 units'     },
                            { label: 'Avg Monthly',        value: '1,930',  sub: 'Units / month'   },
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

        </div>
    );
}
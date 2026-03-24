'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, Star, ChevronDown, ChevronRight, TrendingUp } from 'lucide-react';

import { ThreeDImageRing } from "@/components/ui/3d-image-ring";
import { RiInsightsTab } from "@/components/car/details/RiInsightsTab";
import { CompareCars } from "@/components/car/CompareCars";
import { Details } from "@/components/car/details/Details";
import { Features } from "@/components/car/details/Features";
import { Design, EXTERIOR_IMAGES, INTERIOR_IMAGES } from "@/components/car/details/Design";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import FixedBackButton from "@/components/layout/FixedBackButton";
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, BarChart, Bar,
} from "recharts";

import { useTrimById, useVehicleImagesByModel } from "@/hooks/trims/trims.hook";
import type { EnrichedCar } from "./types";
import type { InsightType } from "@/components/car/InsightBadge";

// ── Static data ────────────────────────────────────────────────────────────
const VARIANTS = [
    { name: 'Base', priceLabel: '₹ 11.99 L', transmission: 'Manual', fuel: 'Petrol' },
    { name: 'Smart', priceLabel: '₹ 13.49 L', transmission: 'Manual', fuel: 'Petrol' },
    { name: 'Smart+', priceLabel: '₹ 14.99 L', transmission: 'Automatic', fuel: 'Petrol' },
    { name: 'Premium', priceLabel: '₹ 16.49 L', transmission: 'Automatic', fuel: 'Petrol/Diesel' },
    { name: 'Premium Plus', priceLabel: '₹ 17.99 L', transmission: 'Automatic', fuel: 'Diesel' },
    { name: 'Luxury', priceLabel: '₹ 19.49 L', transmission: 'Automatic', fuel: 'Diesel' },
];

const SALES_DATA = [
    { month: "Jan", sales: 980 }, { month: "Feb", sales: 1120 },
    { month: "Mar", sales: 1450 }, { month: "Apr", sales: 1280 },
    { month: "May", sales: 1620 }, { month: "Jun", sales: 1890 },
    { month: "Jul", sales: 2100 }, { month: "Aug", sales: 1950 },
    { month: "Sep", sales: 2240 }, { month: "Oct", sales: 2080 },
    { month: "Nov", sales: 2350 }, { month: "Dec", sales: 2600 },
];

const NAV_TABS = [
    { id: 'details', label: 'Details' },
    { id: 'features', label: 'Features' },
    { id: 'ri-sights', label: 'Ri-Sights' },
    { id: 'design', label: 'Design' },
    { id: 'compare', label: 'Compare' },
    { id: 'sales', label: 'Sales' },
];

// ── Ring image labels ──────────────────────────────────────────────────────
const RING_LABELS = [
    'Front View',
    'Side View',
    'Rear View',
    'Quarter',
    'Dashboard',
    'Cabin',
    'Seats',
    'Trunk',
];

// ── Variants dropdown ──────────────────────────────────────────────────────
function VariantsDropdown({
    isOpen, onClose, currentVariant, onSelect,
}: {
    isOpen: boolean; onClose: () => void;
    currentVariant: string; onSelect: (name: string) => void;
}) {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-72 rounded-2xl border border-white/15 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Select Variant</p>
                </div>
                {VARIANTS.map((v) => (
                    <button
                        key={v.name}
                        onClick={() => { onSelect(v.name); onClose(); }}
                        className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/6 transition-colors border-b border-white/5 last:border-0 ${currentVariant === v.name ? 'bg-white/6' : ''}`}
                    >
                        <div className="text-left">
                            <p className={`text-sm font-semibold ${currentVariant === v.name ? 'text-blue-400' : 'text-white'}`}>{v.name}</p>
                            <p className="text-xs text-white/40 mt-0.5">{v.transmission} · {v.fuel}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white/80">{v.priceLabel}</span>
                            {currentVariant === v.name && <ChevronRight className="h-3.5 w-3.5 text-blue-400" />}
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function CarDetailsPage({ params }: { params: Promise<{ trimId: string }> }) {
    const router         = useRouter();
    const resolvedParams = use(params);
    const trimId         = resolvedParams.trimId;

    const { data: trimData, isLoading: isTrimLoading, error: trimError } = useTrimById(trimId);
    
    // Fetch all images for this model to populate the Design tab/Gallery
    const { data: modelImagesData } = useVehicleImagesByModel(trimData?.modelId);

    const [car,             setCar]             = useState<EnrichedCar | null>(null);
    const [activeSection,   setActiveSection]   = useState('details');
    const [variantOpen,     setVariantOpen]     = useState(false);
    const [selectedVariant, setSelectedVariant] = useState('Premium Plus');

    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const registerRef = (sectionId: string) => (el: HTMLElement | null) => {
        sectionRefs.current[sectionId] = el;
    };

    // ── NAV_OFFSET must equal: top-nav (56px) + sticky-bar height (48px) + sticky top offset (24px for top-6) + 8px breathing room
    const NAV_OFFSET = 136;

    const scrollToSection = useCallback((sectionId: string) => {
        const el = sectionRefs.current[sectionId] ?? document.getElementById(sectionId);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveSection(sectionId);
    }, []);

    useEffect(() => {
        if (!car) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) setActiveSection(visible[0].target.id);
            },
            { rootMargin: '-136px 0px -50% 0px', threshold: 0 }
        );
        NAV_TABS.forEach(({ id: tid }) => {
            const el = document.getElementById(tid);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [car]);

    useEffect(() => {
        if (!trimData) return;
        
        const getRandom = (arr: string[], n: number) =>
            [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

        const price = typeof trimData.price === 'number' 
            ? trimData.price 
            : (trimData.price as any)?.exShowroom ?? 0;
            
        const priceLabel = price > 0 
            ? `₹ ${(price / 100000).toFixed(2)} L` 
            : "Ask for Price";

        // Advanced Categorization Logic
        const apiImages = (modelImagesData as any)?.results || [];
        const sortedApiImages = [...apiImages].sort((a: any, b: any) => (a.order || 99) - (b.order || 99));
        
        const interiorKeywords = ['interior', 'dashboard', 'seat', 'cabin', 'screen', 'display', 'head rest', 'headrest', 'brake', 'accelerator', 'gear', 'steering', 'console', 'infotainment'];
        const heroKeywords = ['front', 'quarter', 'main', 'external', 'profile', 'three quarter', 'full car', 'side view'];
        const detailKeywords = ['wheel', 'rim', 'tire', 'headlight', 'taillight', 'handle', 'logo', 'badge', 'grille', 'mirror', 'lamp', 'exhaust'];

        const classify = (img: any) => {
            const label = (img.label || '').toLowerCase();
            const alt = (img.altText || '').toLowerCase();
            const text = `${label} ${alt}`;
            
            if (interiorKeywords.some(k => text.includes(k))) return 'interior';
            if (detailKeywords.some(k => text.includes(k))) return 'exterior-detail';
            if (heroKeywords.some(k => text.includes(k))) return 'exterior-hero';
            return 'exterior-unknown';
        };

        const interiorFromApi = sortedApiImages.filter(img => classify(img) === 'interior').map(img => img.url);
        const heroFromApi     = sortedApiImages.filter(img => classify(img) === 'exterior-hero').map(img => img.url);
        const unknownFromApi  = sortedApiImages.filter(img => classify(img) === 'exterior-unknown').map(img => img.url);
        const detailFromApi   = sortedApiImages.filter(img => classify(img) === 'exterior-detail').map(img => img.url);

        const exteriorFromApi = [...heroFromApi, ...unknownFromApi, ...detailFromApi];

        setCar({
            id: trimData._id as any,
            brand: trimData.brand?.name || "Premium",
            model: trimData.model?.name || "Car",
            price: price,
            priceLabel: priceLabel,
            rating: trimData.rating || 4.5,
            image: exteriorFromApi[0] || interiorFromApi[0] || trimData.vehicleImages?.[0] || "/006.png",
            bodyType: trimData.model?.bodyType || "SUV",
            fuel: trimData.specifications?.fuelType || "Petrol",
            mileage: "18.5 kmpl",
            seating: 5,
            useCase: ["City", "Family"],
            horsepower:   110 + Math.floor(Math.random() * 200),
            torque:       `${150 + Math.floor(Math.random() * 300)} Nm`,
            acceleration: `${(4 + Math.random() * 6).toFixed(1)}s`,
            colors:       ['#FFFFFF', '#1F2937', '#DC2626', '#2563EB', '#D97706'],
            description:  trimData.description || `${trimData.brand?.name} ${trimData.model?.name} with automatic transmission in premium finish. This luxury vehicle redefines versatility with refined performance and cutting-edge technology.`,
            transmission: found?.specifications?.engineAndTransmission?.transmission || 'Auto',
            colors: ['#FFFFFF', '#1F2937', '#DC2626', '#2563EB', '#D97706'],  
            safetyRatings: {
                globalNcap: { adult: (trimData.rating || 4) >= 4.5 ? 5 : 4, child: (trimData.rating || 4) >= 4.5 ? 5 : 3 },
                bharatNcap: { status: Math.random() > 0.3 ? 'Not Tested' : 'Tested', adult: 5, child: 4 },
            },
            features: ['360° Camera', 'Ventilated Seats', 'ADAS Level 2', 'Panoramic Sunroof', 'Connected Car Tech'],
            insights: [
                ...getRandom(['Advanced safety package (6 airbags, ADAS Level 2)', 'Improved interior design and materials'], 2)
                    .map(label => ({ type: 'positive' as InsightType, label })),
                ...getRandom(['Neutral: No idea about servicing and maintenance'], 1)
                    .map(label => ({ type: 'neutral' as InsightType, label })),
                ...getRandom(['Customer service at authorised dealerships'], 1)
                    .map(label => ({ type: 'negative' as InsightType, label })),
            ],
            riInsights: {
                overallRating: Number((3 + Math.random() * 2).toFixed(1)),
                recommendationPercent: 70 + Math.floor(Math.random() * 25),
                mostMentioned: ['Mileage', 'Comfort', 'Power', 'Style'][Math.floor(Math.random() * 4)],
                        topAdvantage: ['Fuel Efficiency', 'Ride Quality', 'Safety', 'Resale Value'][Math.floor(Math.random() * 4)],
                ownershipConfidence: { level: Math.random() > 0.5 ? 'Moderate' : 'High', description: 'Driven by Service and Reliability Feedback' },
                categoryRatings: [
                            { label: 'Build Quality & Safety', subLabel: 'Build Quality & Paint Issues', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                            { label: 'Features & Tech', subLabel: 'Missing basic features', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                            { label: 'After Sales Service', subLabel: 'Need improvements - High Impact', score: Number((2 + Math.random() * 2.5).toFixed(1)) },
                            { label: 'Engine Reliability', subLabel: 'Mixed long term feedback', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                            { label: 'Performance', subLabel: 'Below segment expectations', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                            { label: 'Comfort & Interiors', subLabel: 'Spacious and Comfortable', score: Number((4 + Math.random()).toFixed(1)) },
                ],
                userFeedback: {
                    positives: ['Great mileage in city traffic', 'Excellent build quality', 'Very comfortable for long drives', 'Low maintenance costs'],
                    negatives: ['Engine noise at high speeds', 'Infotainment system lags sometimes', 'Suspension is a bit stiff'],
                },
            },
            gallery: {
                exterior: exteriorFromApi.length > 0 ? exteriorFromApi : EXTERIOR_IMAGES.map(i => i.src),
                interior: interiorFromApi.length > 0 ? interiorFromApi : INTERIOR_IMAGES.map(i => i.src),
            },
        });
    }, [trimData, modelImagesData]);

    if (isTrimLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-medium animate-pulse">Loading luxurious experience...</p>
                </div>
            </div>
        );
    }

    if (trimError || !car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
                <div className="text-center">
                    <p className="text-xl font-bold text-red-100">Loading luxurious experience...</p>
                    <Button onClick={() => router.back()} className="mt-4 bg-white text-black">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const ringImages = [...car.gallery.exterior, ...car.gallery.interior].slice(0, 8);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-24">

            {/* Top nav */}
            <nav className="absolute top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-6 bg-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-white/10 text-white rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
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

            {/* Hero */}
            <section className="pt-14 pb-8 bg-[#0F172A] text-white relative overflow-hidden shadow-xl" style={{ minHeight: '460px' }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1E293B_0%,#0F172A_60%,#020617_100%)] z-0" />
                <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">

    {/* Back Button */}
    <div className="absolute left-4 top-12">
        <FixedBackButton fallbackHref="/trims" />
    </div>

                    <div className="mt-5 flex flex-col items-center gap-1 relative">
                        <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">
                            {car.brand} {car.model}
                        </h1>
                        <button
                            onClick={() => setVariantOpen(v => !v)}
                            className="flex items-center gap-1 text-white/50 text-xs font-medium hover:text-white/80 transition-colors"
                        >
                            <span>{selectedVariant}</span>
                            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${variantOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <VariantsDropdown
                            isOpen={variantOpen} onClose={() => setVariantOpen(false)}
                            currentVariant={selectedVariant} onSelect={setSelectedVariant}
                        />
                    </div>

                    <div className="mt-16 mb-4 flex items-center gap-3">
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


                </div>
            </section>

            {/* ─────────────────────────────────────────────────────────────────
                STICKY SECTION NAV
                ▸ To move it DOWN: increase the `top-N` value (e.g. top-4, top-8, top-12)
                ▸ The `NAV_OFFSET` constant below must stay in sync with the total
                  sticky height so scrollToSection lands in the right place:
                    NAV_OFFSET = top-nav height (56px) + this bar's height (48px) + top offset
                ───────────────────────────────────────────────────────────────── */}
            {/* Change `top-6` (24px) here AND update NAV_OFFSET below to match */}
            <div className="sticky top-20 z-40 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center justify-center gap-6 overflow-x-auto no-scrollbar">
                        {NAV_TABS.map(({ id: tabId, label }) => {
                            const isActive = activeSection === tabId;
                            return (
                                <button
                                    key={tabId}
                                    onClick={() => scrollToSection(tabId)}
                                    className={`relative py-4 px-2 font-medium text-sm transition-colors whitespace-nowrap ${
                                        isActive
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                                >
                                    {label}
                                    {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 max-w-5xl space-y-24 pb-32 pt-12">
                {/* <div>
                    <FixedBackButton fallbackHref="/trims" />
                </div> */}

                <Details  car={car} sectionRef={registerRef('details')}  />
                <Features car={car} sectionRef={registerRef('features')} />

                <section id="ri-sights" ref={registerRef('ri-sights')} className="scroll-mt-28">
                    {car.riInsights && <RiInsightsTab data={car.riInsights} />}
                </section>

                <Design car={car} sectionRef={registerRef('design')} />

                <section id="compare" ref={registerRef('compare')} className="scroll-mt-28">
                    <CompareCars primaryCar={{
                        id: car.id, brand: car.brand, model: car.model,
                        priceLabel: car.priceLabel, rating: car.rating,
                        horsepower: car.horsepower, torque: car.torque, acceleration: car.acceleration,
                    }} />
                </section>

                {/* Sales */}
                <section id="sales" ref={registerRef('sales')} className="scroll-mt-28 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-foreground">Sales Trend</h2>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                            <TrendingUp className="h-4 w-4" />
                            <span>+18.2% YoY</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Units (2024)', value: '23,170', sub: 'Annual Sales' },
                            { label: 'Best Month', value: 'Dec', sub: '2,600 units' },
                            { label: 'Avg Monthly', value: '1,930', sub: 'Units / month' },
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

            {/* Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 md:px-8 z-40 pb-6">
                <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Price Starts From</p>
                        <p className="text-3xl font-bold text-foreground mt-1">{car.priceLabel}</p>
                    </div>
                    <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 rounded-xl h-12 font-semibold">
                        Book Now
                    </Button>
                </div>
            </div>

        </div>
    );
}
'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { InsightBadge, type InsightType } from "@/components/car/InsightBadge";
import { RiInsightsTab } from "@/components/car/RiInsightsTab";
import { SafetyRatings, type SafetyRatingData } from "@/components/car/SafetyRatings";
import {
    ArrowLeft,
    Heart,
    Share2,
    Star,
    Rotate3D,
    Zap,
    Gauge,
    Timer,
    ChevronDown,
    ShieldCheck,
    Globe,
    CheckCircle2
} from 'lucide-react';

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/card";
// Tabs removed


import carsData from "@/data/cars.json";

// Types
import { Car } from "@/components/car/CarCard";

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

export interface EnrichedCar extends Car {
    horsepower: number;
    torque: string;
    acceleration: string;
    colors: string[];
    description: string;
    safetyRatings: SafetyRatingData;
    features: string[];
    insights: { type: InsightType; label: string }[];
    riInsights: InsightData;
}

export default function CarDetailsPage({ params }: { params: Promise<{ trimId: string }> }) {
    const router = useRouter();
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const id = Number(resolvedParams.trimId);

    const [car, setCar] = useState<EnrichedCar | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [activeSection, setActiveSection] = useState('details');
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Offset logic: Sticky nav is ~60px. We want some breathing room.
            const headerOffset = 85;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            // Immediate update for better UX
            setActiveSection(sectionId);
        }
    };

    useEffect(() => {
        if (!car) return;

        const handleScroll = () => {
            const sections = ['details', 'features', 'ri-sights', 'variants', 'design', 'compare', 'sales',];
            // Trigger point: slightly larger than scroll offset to ensure detection when scrolled to
            const spyOffset = 100;

            // Default to first section
            let currentSection = sections[0];

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (!element) continue;

                const rect = element.getBoundingClientRect();
                // If the section top has crossed the spy line (is at or above the trigger point)
                if (rect.top <= spyOffset) {
                    currentSection = sectionId;
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once on mount to set initial state correctly
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [car]);

    useEffect(() => {
        const foundCar = carsData.find(c => c.id === id);
        console.log(foundCar, id);
        if (foundCar) {
            // Mock insights pools
            const positiveInsights = ['High Resale Value', 'Smooth Suspension', 'Fuel Efficient', 'Spacious Interiors', 'Great Handling', 'Punchy Engine'];
            const neutralInsights = ['Standard Sound System', 'Average Boot Space', 'Common Design', 'Firm Ride', 'Plastic Quality'];
            const negativeInsights = ['High Waiting Period', 'Expensive Spares', 'Low Ground Clearance', 'Noisy Cabin', 'Cramped Rear Seat'];

            const getRandom = (arr: string[], count: number) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

            // Enrich with mock details since JSON is simple
            const enriched: EnrichedCar = {
                ...foundCar,
                horsepower: 110 + (Math.floor(Math.random() * 200)), // dynamic mock
                torque: `${150 + (Math.floor(Math.random() * 300))} Nm`, // dynamic mock
                acceleration: `${(4 + Math.random() * 6).toFixed(1)}s`, // dynamic mock
                colors: ['#FFFFFF', '#1F2937', '#DC2626', '#2563EB', '#D97706'], // precise hexes
                description: `${foundCar.brand} ${foundCar.model} with automatic transmission in premium finish. This luxury vehicle redefines versatility with refined performance and cutting-edge technology. Experience the perfect blend of comfort and power.`,
                safetyRatings: {
                    globalNcap: {
                        adult: foundCar.rating >= 4.5 ? 5 : 4,
                        child: foundCar.rating >= 4.5 ? 5 : 3
                    },
                    bharatNcap: {
                        status: Math.random() > 0.3 ? "Not Tested" : "Tested", // mostly not tested to match screenshot
                        adult: 5,
                        child: 4
                    }
                },
                features: ["360° Camera", "Ventilated Seats", "ADAS Level 2", "Panoramic Sunroof", "Connected Car Tech"],
                insights: [
                    ...getRandom(positiveInsights, 2).map(label => ({ type: 'positive' as InsightType, label })),
                    ...getRandom(neutralInsights, 1).map(label => ({ type: 'neutral' as InsightType, label })),
                    ...getRandom(negativeInsights, 1).map(label => ({ type: 'negative' as InsightType, label }))
                ],
                riInsights: {
                    overallRating: Number((3 + Math.random() * 2).toFixed(1)),
                    recommendationPercent: 70 + Math.floor(Math.random() * 25),
                    mostMentioned: ['Mileage', 'Comfort', 'Power', 'Style'][Math.floor(Math.random() * 4)],
                    topAdvantage: ['Fuel Efficiency', 'Ride Quality', 'Safety', 'Resale Value'][Math.floor(Math.random() * 4)],
                    ownershipConfidence: {
                        level: Math.random() > 0.5 ? 'Moderate' : 'High',
                        description: 'Driven by Service and Reliability Feedback'
                    },
                    categoryRatings: [
                        { label: 'Build Quality & Safety', subLabel: 'Build Quality & Paint Issues', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Features & Tech', subLabel: 'Missing basic features', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'After Sales Service', subLabel: 'Need improvements - High Impact', score: Number((2 + Math.random() * 2.5).toFixed(1)) },
                        { label: 'Engine Reliability', subLabel: 'Mixed long term feedback', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Performance', subLabel: 'Below segment expectations', score: Number((3.5 + Math.random() * 1.5).toFixed(1)) },
                        { label: 'Comfort & Interiors', subLabel: 'Spacious and Comfortable', score: Number((4 + Math.random()).toFixed(1)) },
                    ],
                    userFeedback: {
                        positives: [
                            'Great mileage in city traffic',
                            'Excellent build quality',
                            'Very comfortable for long drives',
                            'Mileage is fantastic!'
                        ],
                        negatives: [
                            'Engine noise at high speeds',
                            'Infotainment system lags sometimes',
                            'Suspension is a bit stiff',
                            'Rear seat space could be better'
                        ]
                    }
                }
            };
            setCar(enriched);
            setSelectedColor('#FFFFFF');
            setImgSrc(enriched.image);
        }
    }, [id]);

    if (!car) return <div className="min-h-screen flex items-center justify-center bg-background">Loading luxurious experience...</div>;

    return (
        <div className="min-h-screen bg-backgroundfont-sans text-foreground pb-24">

            {/* 1. Top Navigation Bar */}
            {/* 1. Top Navigation Bar */}
            {/* 1. Top Navigation Bar (Absolute, scrolls away) */}
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

            {/* 2. Hero Section */}
            <section className="pt-28 pb-12 bg-[#0F172A] text-white relative overflow-hidden shadow-xl">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1E293B_0%,_#0F172A_60%,_#020617_100%)] z-0"></div>

                <div className="relative z-10 container mx-auto px-4 text-center">

                    {/* Car Image (Moved title from here) */}

                    {/* Car Image */}
                    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 mb-8 group">
                        <Image
                            src={imgSrc || car.image}
                            alt={car.model}
                            fill
                            className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                            priority
                            unoptimized
                            onError={() => setImgSrc("https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80")}
                        />
                        {/* 360 Button Overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <button className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-white hover:bg-black transition-all border border-gray-700 shadow-xl">
                                <Rotate3D className="h-4 w-4" />
                                360° View
                            </button>
                        </div>
                    </div>

                    {/* Color Selector & Rating */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="flex items-center gap-3 bg-gray-800/50 p-2 rounded-full backdrop-blur-sm border border-gray-700/50">
                            {car.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`h-8 w-8 rounded-full border-2 transition-transform ${selectedColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-full">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-yellow-400 font-bold">{car.rating}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Sticky Section Navigation */}
            <div className="sticky top-0 z-40 bg-card/90 dark:bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center justify-center gap-8 overflow-x-auto no-scrollbar">
                        {['Details', 'Features', 'Ri-Sights', 'Variants', 'Design', 'Compare', 'Sales'].map((tab) => {
                            const tabId = tab.toLowerCase();
                            const isActive = activeSection === tabId;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => scrollToSection(tabId)}
                                    className={`relative py-4 px-2 font-medium text-sm transition-colors whitespace-nowrap
                                        ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}
                                    `}
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

            {/* 4. Scrollable Sections */}
            <div className="container mx-auto px-4 max-w-5xl space-y-24 pb-32 pt-12">

                {/* Details Section */}
                <section id="details" className="scroll-mt-32 space-y-10">
                    {/* Description */}
                    <div className="prose dark:prose-invert max-w-none text-center md:text-left">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {car.description}
                        </p>
                    </div>

                    {/* Specs Cards Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'Horsepower', value: `${car.horsepower} HP`, icon: Zap },
                            { label: 'Torque', value: car.torque, icon: Gauge },
                            { label: '0-60 mph', value: car.acceleration, icon: Timer }
                        ].map((spec) => (
                            <Card key={spec.label} className="flex flex-col items-center justify-center p-6 bg-card border-none shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                                    <spec.icon className="h-5 w-5" />
                                </div>
                                <span className="text-2xl font-bold text-foreground">{spec.value}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">{spec.label}</span>
                            </Card>
                        ))}
                    </div>

                    {/* Insight Chips */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {car.insights.map((insight, index) => (
                            <InsightBadge
                                key={index}
                                type={insight.type}
                                label={insight.label}
                            />
                        ))}
                    </div>

                    {/* Safety & Ratings Section */}
                    <SafetyRatings data={car.safetyRatings} />
                </section>

                {/* Features Section */}
                <section id="features" className="scroll-mt-32">
                    <div className="bg-card p-8 rounded-2xl shadow-sm text-center">
                        <h3 className="text-xl font-bold mb-4">Key Features</h3>
                        <ul className="grid grid-cols-2 gap-4 text-left max-w-lg mx-auto">
                            {car.features.map(f => (
                                <li key={f} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" /> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                
                <section id="ri-sights" className="scroll-mt-32">
                    {car.riInsights && <RiInsightsTab data={car.riInsights} />}
                </section>


                <section id="variants" className="scroll-mt-32">
                    <div className="p-12 text-center text-muted-foreground bg-muted rounded-xl border border-dashed border-border">
                        <p>Compare variants & trims here...</p>
                    </div>
                </section>
            </div>

            {/* 8. Pricing & CTA - Sticky Bottom for Mobile */}
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

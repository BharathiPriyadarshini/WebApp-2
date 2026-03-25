'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { EnrichedCar } from "@/app/trims/[trimId]/types";

// ── Static image data ──────────────────────────────────────────────────────
export const EXTERIOR_IMAGES = [
    { src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80", title: "Front Quarter View" },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", title: "Side Profile"      },
    { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80", title: "Rear View"          },
    { src: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80", title: "Dynamic Angle"      },
];

export const INTERIOR_IMAGES = [
    { src: "https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?auto=format&fit=crop&w=800&q=80", title: "Dashboard Overview" },
    { src: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80", title: "Centre Console"      },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", title: "Driver's Cockpit"   },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", title: "Rear Cabin"          },
];

const COLOR_NAMES: Record<string, string> = {
    '#FFFFFF': 'Pearl White',
    '#1F2937': 'Midnight Black',
    '#DC2626': 'Racing Red',
    '#2563EB': 'Ocean Blue',
    '#D97706': 'Amber Gold',
};

// ── Lightbox ───────────────────────────────────────────────────────────────
function GalleryLightbox({
    images, initialIndex, onClose,
}: {
    images: { src: string; title: string }[];
    initialIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(initialIndex);

    const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

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
        <div className="fixed inset-0 z-50 bg-black/92 flex flex-col items-center justify-center backdrop-blur-sm" onClick={onClose}>
            <button
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                onClick={onClose}
            >
                <X className="h-5 w-5 text-white" />
            </button>
            <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest uppercase select-none">
                {current + 1} / {images.length}
            </p>
            <div
                className="relative w-full max-w-4xl px-16"
                style={{ height: '65vh' }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[current].src} alt={images[current].title} fill
                    className="object-contain" unoptimized
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                />
            </div>
            <p className="mt-5 text-white font-semibold text-base tracking-wide select-none">
                {images[current].title}
            </p>
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
            >
                <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
            >
                <ArrowRight className="h-5 w-5 text-white" />
            </button>
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

// ── Main ───────────────────────────────────────────────────────────────────
interface DesignProps {
    car: EnrichedCar;
    sectionRef: (el: HTMLElement | null) => void;
}

export function Design({ car, sectionRef }: DesignProps) {
    const [activeTab,     setActiveTab]     = useState<'exterior' | 'interior'>('exterior');
    const [selectedColor, setSelectedColor] = useState(car.colors[0] ?? '#FFFFFF');
    const [lightbox,      setLightbox]      = useState<number | null>(null);

    // Map the API gallery strings to the object structure expected by this component
    const apiExterior = (car.gallery?.exterior || []).map((src, i) => ({ 
        src, 
        title: i === 0 ? "Primary Exterior" : `Exterior View ${i + 1}` 
    }));
    const apiInterior = (car.gallery?.interior || []).map((src, i) => ({ 
        src, 
        title: i === 0 ? "Interior Cabin" : `Interior View ${i + 1}` 
    }));

    // Fallback logic: If API has images, use them. Otherwise, use mocks.
    const exteriorToDisplay = apiExterior.length > 0 ? apiExterior : EXTERIOR_IMAGES;
    const interiorToDisplay = apiInterior.length > 0 ? apiInterior : INTERIOR_IMAGES;

    const images    = activeTab === 'exterior' ? exteriorToDisplay : interiorToDisplay;
    const colorName = COLOR_NAMES[selectedColor] ?? 'Custom';

    return (
        <section id="design" ref={sectionRef} className="scroll-mt-28 space-y-6">

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                    {(['exterior', 'interior'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                                activeTab === tab
                                    ? 'bg-card shadow text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Colour Picker ── */}
            <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground">Colour Options</p>

                {/*
                  ✦ Square car preview image — aspect-square fills the full
                    column width and maintains a perfect 1:1 ratio on all screens.
                */}
                <div
                    className="relative w-full aspect-square rounded-2xl overflow-hidden"
                    style={{ backgroundColor: `${selectedColor}18` }}
                >
                    {/* Radial glow matching selected color */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `radial-gradient(ellipse at center, ${selectedColor} 0%, transparent 70%)` }}
                    />

                    {/* Car image: luminosity mode turns it greyscale,
                        then the color wash overlays the selected hue */}
                    <div className="relative w-full h-full">
                        <Image
                            src={exteriorToDisplay[0].src}
                            alt={`${car.brand} ${car.model} in ${colorName}`}
                            fill
                            className="object-contain transition-all duration-500"
                            style={{ mixBlendMode: 'luminosity' }}
                            unoptimized
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                        />
                        <div
                            className="absolute inset-0 transition-all duration-500"
                            style={{ backgroundColor: selectedColor, mixBlendMode: 'color', opacity: 0.55 }}
                        />
                    </div>
                </div>

                {/*
                  ✦ Color swatches + label are BELOW the image, centered.
                    Previously they were above the image and left-aligned.
                */}
                <div className="flex flex-col items-center gap-3 pt-1">
                    {/* Selected color name */}
                    <p className="text-sm font-semibold text-foreground tracking-wide">
                        {colorName}
                    </p>

                    {/* Swatch row — centered */}
                    <div className="flex items-center gap-3">
                        {car.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`h-9 w-9 rounded-full border-2 transition-all ${
                                    selectedColor === color
                                        ? 'border-blue-500 scale-110 shadow-md shadow-blue-500/25'
                                        : 'border-border hover:scale-105'
                                }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select ${COLOR_NAMES[color] ?? color}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Gallery Grid ── */}
            <div className="grid grid-cols-2 gap-4">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                            i === 0 ? 'col-span-2 h-72' : 'h-52'
                        }`}
                        onClick={() => setLightbox(i)}
                    >
                        <Image
                            src={img.src} alt={img.title} fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/alt.png"; }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                            <span className="text-white text-xs font-semibold bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                {img.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Lightbox ── */}
            {lightbox !== null && (
                <GalleryLightbox
                    images={images}
                    initialIndex={lightbox}
                    onClose={() => setLightbox(null)}
                />
            )}
        </section>
    );
}
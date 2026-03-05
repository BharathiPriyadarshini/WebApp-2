"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, IndianRupee, Fuel, Users } from "lucide-react";

interface Car {
  id: number;
  name: string;
  category: string;
  budget: string;
  image: string;
  link: string;
  priceRange: string;
  fuelType: string;
  seating: number;
}

const allCars: Car[] = [
  // ── Under 10 Lakh ──────────────────────────────────────────────
  // Sub Compact SUV
  { id: 1,  name: "Rimello X1",   category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/1",  priceRange: "6.5 L – 9.2 L",  fuelType: "Petrol",        seating: 5 },
  { id: 2,  name: "Rimello X1 S", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/2",  priceRange: "7.0 L – 9.8 L",  fuelType: "CNG",           seating: 5 },
  { id: 3,  name: "Rimello X1 T", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/3",  priceRange: "8.0 L – 9.9 L",  fuelType: "Petrol",        seating: 5 },
  // Hatchback
  { id: 4,  name: "Rimello S3",   category: "Hatchback",        budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/4",  priceRange: "4.5 L – 7.0 L",  fuelType: "Petrol",        seating: 5 },
  { id: 5,  name: "Rimello S3 X", category: "Hatchback",        budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/5",  priceRange: "5.2 L – 7.5 L",  fuelType: "CNG",           seating: 5 },
  { id: 6,  name: "Rimello S3 Z", category: "Hatchback",        budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/6",  priceRange: "6.0 L – 8.5 L",  fuelType: "Electric",      seating: 5 },
  // Sedan & Others
  { id: 7,  name: "Rimello E2",   category: "Sedan & Others",   budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/7",  priceRange: "5.8 L – 8.4 L",  fuelType: "Petrol",        seating: 5 },
  { id: 8,  name: "Rimello E2 L", category: "Sedan & Others",   budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/8",  priceRange: "7.0 L – 9.5 L",  fuelType: "Diesel",        seating: 5 },
  { id: 9,  name: "Rimello E2 S", category: "Sedan & Others",   budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/9",  priceRange: "6.5 L – 9.0 L",  fuelType: "CNG",           seating: 5 },

  // ── 10–20 Lakh ─────────────────────────────────────────────────
  // SUV
  { id: 10, name: "Rimello X5",   category: "SUV",              budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/10", priceRange: "12 L – 17 L",    fuelType: "Diesel",        seating: 7 },
  { id: 11, name: "Rimello X5 R", category: "SUV",              budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/11", priceRange: "14 L – 19 L",    fuelType: "Petrol",        seating: 7 },
  { id: 12, name: "Rimello X5 T", category: "SUV",              budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/12", priceRange: "13 L – 18 L",    fuelType: "Diesel",        seating: 5 },
  // Sub Compact SUV
  { id: 13, name: "Rimello E5",   category: "Sub Compact SUV",  budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/13", priceRange: "10 L – 14 L",    fuelType: "Petrol",        seating: 5 },
  { id: 14, name: "Rimello E5 X", category: "Sub Compact SUV",  budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/14", priceRange: "11 L – 16 L",    fuelType: "Electric",      seating: 5 },
  { id: 15, name: "Rimello E5 Z", category: "Sub Compact SUV",  budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/15", priceRange: "12 L – 17 L",    fuelType: "Petrol",        seating: 5 },
  // Sedan & Others
  { id: 16, name: "Rimello A4",   category: "Sedan & Others",   budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/16", priceRange: "10 L – 15 L",    fuelType: "Petrol",        seating: 5 },
  { id: 17, name: "Rimello A4 S", category: "Sedan & Others",   budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/17", priceRange: "12 L – 18 L",    fuelType: "Diesel",        seating: 5 },
  { id: 18, name: "Rimello A4 E", category: "Sedan & Others",   budget: "10-20 Lakh",    image: "/alt.png", link: "/cars/18", priceRange: "13 L – 19 L",    fuelType: "Electric",      seating: 5 },

  // ── 20–30 Lakh ─────────────────────────────────────────────────
  // SUV
  { id: 19, name: "Rimello S7",   category: "SUV",              budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/19", priceRange: "22 L – 27 L",    fuelType: "Diesel",        seating: 7 },
  { id: 20, name: "Rimello S7 R", category: "SUV",              budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/20", priceRange: "24 L – 29 L",    fuelType: "Petrol",        seating: 7 },
  { id: 21, name: "Rimello S7 E", category: "SUV",              budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/21", priceRange: "25 L – 30 L",    fuelType: "Electric",      seating: 5 },
  // Sub Compact SUV
  { id: 22, name: "Rimello V6",   category: "Sub Compact SUV",  budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/22", priceRange: "20 L – 25 L",    fuelType: "Petrol",        seating: 5 },
  { id: 23, name: "Rimello V6 X", category: "Sub Compact SUV",  budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/23", priceRange: "21 L – 26 L",    fuelType: "Electric",      seating: 5 },
  { id: 24, name: "Rimello V6 S", category: "Sub Compact SUV",  budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/24", priceRange: "22 L – 28 L",    fuelType: "Diesel",        seating: 5 },
  // Sedan & Others
  { id: 25, name: "Rimello G8",   category: "Sedan & Others",   budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/25", priceRange: "20 L – 24 L",    fuelType: "Petrol",        seating: 5 },
  { id: 26, name: "Rimello G8 L", category: "Sedan & Others",   budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/26", priceRange: "23 L – 28 L",    fuelType: "Diesel",        seating: 5 },
  { id: 27, name: "Rimello G8 E", category: "Sedan & Others",   budget: "20-30 Lakh",    image: "/alt.png", link: "/cars/27", priceRange: "25 L – 30 L",    fuelType: "Electric",      seating: 5 },
];

const under10Categories = ["Sub Compact SUV", "Hatchback", "Sedan & Others"];
const above10Budgets     = ["10-20 Lakh", "20-30 Lakh"];
const above10Categories  = ["SUV", "Sub Compact SUV", "Sedan & Others"];

/* ─── fuel badge colour ─────────────────────────────────────── */
const fuelColor: Record<string, string> = {
  Petrol:   "text-amber-400   border-amber-400/30   bg-amber-400/10",
  Diesel:   "text-sky-400     border-sky-400/30     bg-sky-400/10",
  Electric: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  CNG:      "text-violet-400  border-violet-400/30  bg-violet-400/10",
};

/* ─── single card ────────────────────────────────────────────── */
function CarCard({ car, index }: { car: Car; index: number }) {
  return (
    <motion.div
      key={car.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="w-full"
    >
      <Link href={car.link}>
        {/* fixed height card */}
        <div
          className="
            group relative flex flex-col
            w-full h-[420px]
            bg-[#0a0a0a] rounded-2xl overflow-hidden cursor-pointer
            border border-white/8
            transition-all duration-300
            hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
          "
        >
          {/* ── corner accent lines ── */}
          <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500/60 rounded-tl-2xl z-10 transition-all duration-300 group-hover:w-10 group-hover:h-10" />
          <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500/60 rounded-br-2xl z-10 transition-all duration-300 group-hover:w-10 group-hover:h-10" />

          {/* ── image zone ── */}
          <div className="relative h-[200px] flex-shrink-0 overflow-hidden bg-[#111]">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />

            {/* scan-line overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
              }}
            />

            {/* budget pill */}
            <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold tracking-widest uppercase bg-blue-600/80 backdrop-blur-sm text-white rounded-full border border-blue-400/30">
              {car.budget}
            </span>

            {/* category pill */}
            <span className="absolute top-3 right-3 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-sm text-gray-300 rounded-full border border-white/10">
              {car.category}
            </span>
          </div>

          {/* ── content zone ── */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            {/* name */}
            <h3 className="text-white font-bold text-base tracking-wide leading-tight line-clamp-1">
              {car.name}
            </h3>

            {/* divider */}
            <div className="h-px bg-gradient-to-r from-blue-500/40 via-white/5 to-transparent" />

            {/* spec row */}
            <div className="flex items-center justify-between mt-auto">
              {/* price */}
              <div className="flex items-center gap-1.5 text-[13px] text-gray-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30">
                  <IndianRupee size={11} className="text-blue-400" />
                </span>
                <span className="font-medium">{car.priceRange}</span>
              </div>

              {/* fuel */}
              <span
                className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${fuelColor[car.fuelType] ?? "text-gray-400 border-gray-700 bg-gray-800/30"}`}
              >
                <Fuel size={11} />
                {car.fuelType}
              </span>

              {/* seating */}
              <div className="flex items-center gap-1.5 text-[13px] text-gray-300">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30">
                  <Users size={11} className="text-blue-400" />
                </span>
                <span className="font-medium">{car.seating}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500">
                Rimello Motors
              </span>
              <span className="flex items-center gap-1 text-blue-400 text-[13px] font-semibold group-hover:gap-2 transition-all">
                Know More <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── section heading ────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="inline-block w-1 h-7 rounded-full bg-blue-500" />
      {children}
    </h2>
  );
}

/* ─── pill tab button ────────────────────────────────────────── */
function PillTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-[0_0_14px_rgba(59,130,246,0.45)]"
          : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/8"
      }`}
    >
      {children}
    </button>
  );
}

/* ─── main export ────────────────────────────────────────────── */
export default function ByBudget() {
  const [activeUnderCategory, setActiveUnderCategory] = useState("Sub Compact SUV");
  const [activeAboveBudget,   setActiveAboveBudget]   = useState("10-20 Lakh");
  const [activeAboveCategory, setActiveAboveCategory] = useState("SUV");

  const under10Cars = allCars.filter(
    (c) => c.budget === "Under 10 Lakh" && c.category === activeUnderCategory
  );

  const above10Cars = allCars.filter(
    (c) => c.budget === activeAboveBudget && c.category === activeAboveCategory
  );

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── main heading ── */}
        <div className="mb-16">
          <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Explore Our Lineup
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Popular Cars By Budget
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl text-sm leading-relaxed">
            Explore cars categorized by budget and type. Find the perfect car
            that fits your style and wallet.
          </p>
        </div>

        {/* ══════════════ UNDER 10 LAKH ══════════════════════════ */}
        <SectionHeading>Cars Under 10 Lakh</SectionHeading>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 flex-wrap">
          {under10Categories.map((cat) => (
            <PillTab
              key={cat}
              active={activeUnderCategory === cat}
              onClick={() => setActiveUnderCategory(cat)}
            >
              {cat}
            </PillTab>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-24">
          <AnimatePresence mode="wait">
            {under10Cars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* ══════════════ ABOVE 10 LAKH ══════════════════════════ */}
        <SectionHeading>Cars Above 10 Lakh</SectionHeading>

        {/* combined filter bar: budget tabs + category pills on the right */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* left: budget underline tabs */}
          <div className="flex gap-6 border-b border-white/8">
            {above10Budgets.map((budget) => (
              <button
                key={budget}
                onClick={() => {
                  setActiveAboveBudget(budget);
                  setActiveAboveCategory("SUV");
                }}
                className={`pb-3 text-sm font-semibold transition-all ${
                  activeAboveBudget === budget
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {budget}
              </button>
            ))}
          </div>

          {/* right: category pill tabs */}
          <div className="flex gap-2 flex-wrap">
            {above10Categories.map((cat) => (
              <PillTab
                key={cat}
                active={activeAboveCategory === cat}
                onClick={() => setActiveAboveCategory(cat)}
              >
                {cat}
              </PillTab>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="wait">
            {above10Cars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
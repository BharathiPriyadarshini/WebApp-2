"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, IndianRupee, Fuel, Users, Star } from "lucide-react";

interface Car {
  id: number;
  name: string;
  category: string;
  budget: string;
  image: string;
  link: string;
  priceRange: string;
  fuelTypes: string[];
  seating: number;
  rating: number;
}

const fuelColor: Record<string, string> = {
  Petrol:   "text-amber-400",
  Diesel:   "text-sky-400",
  Electric: "text-emerald-400",
  CNG:      "text-violet-400",
};

const allCars: Car[] = [
  { id: 1,  name: "Rimello X1",   category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "6.5 L – 9.2 L", fuelTypes: ["Petrol", "CNG"],      seating: 5, rating: 4 },
  { id: 2,  name: "Rimello X1 S", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "7.0 L – 9.8 L", fuelTypes: ["CNG"],                seating: 5, rating: 3 },
  { id: 3,  name: "Rimello X1 T", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "8.0 L – 9.9 L", fuelTypes: ["Petrol"],             seating: 5, rating: 5 },
  { id: 4,  name: "Rimello S3",   category: "Hatchback",       budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "4.5 L – 7.0 L", fuelTypes: ["Petrol", "CNG"],      seating: 5, rating: 4 },
  { id: 5,  name: "Rimello S3 X", category: "Hatchback",       budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "5.2 L – 7.5 L", fuelTypes: ["CNG"],                seating: 5, rating: 3 },
  { id: 6,  name: "Rimello S3 Z", category: "Hatchback",       budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "6.0 L – 8.5 L", fuelTypes: ["Electric"],           seating: 5, rating: 5 },
  { id: 7,  name: "Rimello E2",   category: "Sedan & Others",  budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "5.8 L – 8.4 L", fuelTypes: ["Petrol", "Diesel"],   seating: 5, rating: 4 },
  { id: 8,  name: "Rimello E2 L", category: "Sedan & Others",  budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "7.0 L – 9.5 L", fuelTypes: ["Diesel"],             seating: 5, rating: 3 },
  { id: 9,  name: "Rimello E2 S", category: "Sedan & Others",  budget: "Under 10 Lakh", image: "/006.png", link: "/trims/1",  priceRange: "6.5 L – 9.0 L", fuelTypes: ["Petrol", "CNG"],      seating: 5, rating: 4 },
  { id: 10, name: "Rimello X5",   category: "SUV",             budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "12 L – 17 L",   fuelTypes: ["Diesel", "Petrol"],   seating: 7, rating: 4 },
  { id: 11, name: "Rimello X5 R", category: "SUV",             budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "14 L – 19 L",   fuelTypes: ["Petrol"],             seating: 7, rating: 5 },
  { id: 12, name: "Rimello X5 T", category: "SUV",             budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "13 L – 18 L",   fuelTypes: ["Diesel", "Electric"], seating: 5, rating: 4 },
  { id: 13, name: "Rimello E5",   category: "Sub Compact SUV", budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "10 L – 14 L",   fuelTypes: ["Petrol"],             seating: 5, rating: 3 },
  { id: 14, name: "Rimello E5 X", category: "Sub Compact SUV", budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "11 L – 16 L",   fuelTypes: ["Electric"],           seating: 5, rating: 5 },
  { id: 15, name: "Rimello E5 Z", category: "Sub Compact SUV", budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "12 L – 17 L",   fuelTypes: ["Petrol", "CNG"],      seating: 5, rating: 4 },
  { id: 16, name: "Rimello A4",   category: "Sedan & Others",  budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "10 L – 15 L",   fuelTypes: ["Petrol", "CNG"],      seating: 5, rating: 4 },
  { id: 17, name: "Rimello A4 S", category: "Sedan & Others",  budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "12 L – 18 L",   fuelTypes: ["Diesel"],             seating: 5, rating: 3 },
  { id: 18, name: "Rimello A4 E", category: "Sedan & Others",  budget: "10-20 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "13 L – 19 L",   fuelTypes: ["Petrol", "Electric"], seating: 5, rating: 5 },
  { id: 19, name: "Rimello S7",   category: "SUV",             budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "22 L – 27 L",   fuelTypes: ["Diesel", "Petrol"],   seating: 7, rating: 4 },
  { id: 20, name: "Rimello S7 R", category: "SUV",             budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "24 L – 29 L",   fuelTypes: ["Petrol"],             seating: 7, rating: 5 },
  { id: 21, name: "Rimello S7 E", category: "SUV",             budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "25 L – 30 L",   fuelTypes: ["Electric"],           seating: 5, rating: 4 },
  { id: 22, name: "Rimello V6",   category: "Sub Compact SUV", budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "20 L – 25 L",   fuelTypes: ["Petrol", "CNG"],      seating: 5, rating: 3 },
  { id: 23, name: "Rimello V6 X", category: "Sub Compact SUV", budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "21 L – 26 L",   fuelTypes: ["Electric"],           seating: 5, rating: 5 },
  { id: 24, name: "Rimello V6 S", category: "Sub Compact SUV", budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "22 L – 28 L",   fuelTypes: ["Diesel", "Petrol"],   seating: 5, rating: 4 },
  { id: 25, name: "Rimello G8",   category: "Sedan & Others",  budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "20 L – 24 L",   fuelTypes: ["Petrol"],             seating: 5, rating: 4 },
  { id: 26, name: "Rimello G8 L", category: "Sedan & Others",  budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "23 L – 28 L",   fuelTypes: ["Diesel", "Petrol"],   seating: 5, rating: 3 },
  { id: 27, name: "Rimello G8 E", category: "Sedan & Others",  budget: "20-30 Lakh",    image: "/006.png", link: "/trims/1", priceRange: "25 L – 30 L",   fuelTypes: ["Electric"],           seating: 5, rating: 5 },
];

const under10Categories = ["Sub Compact SUV", "Hatchback", "Sedan & Others"];
const above10Budgets     = ["10-20 Lakh", "20-30 Lakh"];
const above10Categories  = ["SUV", "Sub Compact SUV", "Sedan & Others"];

/* ── star rating ── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-gray-700 fill-gray-700"
          }`}
        />
      ))}
      <span className="ml-1 text-[11px] text-gray-400">{rating}.0</span>
    </div>
  );
}

/* ── premium fuel: Petrol • Diesel ── */
function FuelTypes({ types }: { types: string[] }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Fuel className="w-4 h-4 text-gray-500 shrink-0" />
      <span className="flex items-center gap-1.5">
        {types.map((t, i) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className={`font-medium ${fuelColor[t]}`}>{t}</span>
            {i < types.length - 1 && <span className="text-gray-600 text-xs">•</span>}
          </span>
        ))}
      </span>
    </div>
  );
}

/* ── single card ── */
function CarCard({ car, index }: { car: Car; index: number }) {
  const parts = car.priceRange.split("–");
  const from  = parts[0]?.trim() ?? "";
  const to    = parts[1]?.trim() ?? "";

  return (
    <motion.div
      key={car.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className="w-full"
    >
      <Link href={car.link}>
        {/* no fixed height — card shrinks to content */}
        <div className="group relative flex flex-col w-full bg-[#111] rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]">

          {/* image */}
          <div className="relative h-[170px] shrink-0 overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full leading-none">
                {car.name}
              </span>
            </div>
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-contain transition duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-[#111] to-transparent" />
          </div>

          {/* body */}
          <div className="flex flex-col px-5 py-4 gap-2.5">

            {/* category + stars */}
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-sm leading-none">{car.category}</span>
              <StarRating rating={car.rating} />
            </div>

            <div className="h-px bg-white/[0.07]" />

            {/* price */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <IndianRupee className="w-4 h-4 shrink-0" />
              <span>
                From <span className="text-white font-medium">{from}</span>
                {" "}to <span className="text-white font-medium">{to}</span>
              </span>
            </div>

            {/* fuel */}
            <FuelTypes types={car.fuelTypes} />

            {/* seating + know more on same row — no dead space below */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Users className="w-4 h-4 shrink-0" />
                <span>{car.seating} Seater</span>
              </div>
              <span className="flex items-center gap-1 text-blue-400 text-[13px] font-medium group-hover:gap-2 transition-all">
                Know More <ChevronRight size={14} />
              </span>
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── section heading ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="inline-block w-1 h-7 rounded-full bg-blue-500" />
      {children}
    </h2>
  );
}

/* ── pill tab ── */
function PillTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-[0_0_14px_rgba(59,130,246,0.45)]"
          : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
      }`}
    >
      {children}
    </button>
  );
}

/* ── main export ── */
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

        <div className="mb-16">
          <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">Explore Our Lineup</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Popular Cars By Budget</h1>
          <p className="text-gray-500 mt-4 max-w-2xl text-sm leading-relaxed">
            Explore cars categorized by budget and type. Find the perfect car that fits your style and wallet.
          </p>
        </div>

        {/* UNDER 10 LAKH */}
        <SectionHeading>Cars Under 10 Lakh</SectionHeading>
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 flex-wrap">
          {under10Categories.map((cat) => (
            <PillTab key={cat} active={activeUnderCategory === cat} onClick={() => setActiveUnderCategory(cat)}>
              {cat}
            </PillTab>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-24">
          <AnimatePresence mode="wait">
            {under10Cars.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
          </AnimatePresence>
        </div>

        {/* ABOVE 10 LAKH */}
        <SectionHeading>Cars Above 10 Lakh</SectionHeading>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-6 border-b border-white/10">
            {above10Budgets.map((budget) => (
              <button
                key={budget}
                onClick={() => { setActiveAboveBudget(budget); setActiveAboveCategory("SUV"); }}
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
          <div className="flex gap-2 flex-wrap">
            {above10Categories.map((cat) => (
              <PillTab key={cat} active={activeAboveCategory === cat} onClick={() => setActiveAboveCategory(cat)}>
                {cat}
              </PillTab>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="wait">
            {above10Cars.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
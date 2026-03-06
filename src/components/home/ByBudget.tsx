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
  // Under 10 Lakh — Sub Compact SUV
  { id: 1,  name: "Rimello X1",   category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/006.png", link: "/cars/1",  priceRange: "6.5 L – 9.2 L", fuelType: "Petrol",   seating: 5 },
  { id: 2,  name: "Rimello X1 S", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/006.png", link: "/cars/2",  priceRange: "7.0 L – 9.8 L", fuelType: "CNG",      seating: 5 },
  { id: 3,  name: "Rimello X1 T", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/006.png", link: "/cars/3",  priceRange: "8.0 L – 9.9 L", fuelType: "Petrol",   seating: 5 },
  // Under 10 Lakh — Hatchback
  { id: 4,  name: "Rimello S3",   category: "Hatchback",       budget: "Under 10 Lakh", image: "/006.png", link: "/cars/4",  priceRange: "4.5 L – 7.0 L", fuelType: "Petrol",   seating: 5 },
  { id: 5,  name: "Rimello S3 X", category: "Hatchback",       budget: "Under 10 Lakh", image: "/006.png", link: "/cars/5",  priceRange: "5.2 L – 7.5 L", fuelType: "CNG",      seating: 5 },
  { id: 6,  name: "Rimello S3 Z", category: "Hatchback",       budget: "Under 10 Lakh", image: "/006.png", link: "/cars/6",  priceRange: "6.0 L – 8.5 L", fuelType: "Electric", seating: 5 },
  // Under 10 Lakh — Sedan & Others
  { id: 7,  name: "Rimello E2",   category: "Sedan & Others",  budget: "Under 10 Lakh", image: "/006.png", link: "/cars/7",  priceRange: "5.8 L – 8.4 L", fuelType: "Petrol",   seating: 5 },
  { id: 8,  name: "Rimello E2 L", category: "Sedan & Others",  budget: "Under 10 Lakh", image: "/006.png", link: "/cars/8",  priceRange: "7.0 L – 9.5 L", fuelType: "Diesel",   seating: 5 },
  { id: 9,  name: "Rimello E2 S", category: "Sedan & Others",  budget: "Under 10 Lakh", image: "/006.png", link: "/cars/9",  priceRange: "6.5 L – 9.0 L", fuelType: "CNG",      seating: 5 },
  // 10-20 Lakh — SUV
  { id: 10, name: "Rimello X5",   category: "SUV",             budget: "10-20 Lakh",    image: "/006.png", link: "/cars/10", priceRange: "12 L – 17 L",   fuelType: "Diesel",   seating: 7 },
  { id: 11, name: "Rimello X5 R", category: "SUV",             budget: "10-20 Lakh",    image: "/006.png", link: "/cars/11", priceRange: "14 L – 19 L",   fuelType: "Petrol",   seating: 7 },
  { id: 12, name: "Rimello X5 T", category: "SUV",             budget: "10-20 Lakh",    image: "/006.png", link: "/cars/12", priceRange: "13 L – 18 L",   fuelType: "Diesel",   seating: 5 },
  // 10-20 Lakh — Sub Compact SUV
  { id: 13, name: "Rimello E5",   category: "Sub Compact SUV", budget: "10-20 Lakh",    image: "/006.png", link: "/cars/13", priceRange: "10 L – 14 L",   fuelType: "Petrol",   seating: 5 },
  { id: 14, name: "Rimello E5 X", category: "Sub Compact SUV", budget: "10-20 Lakh",    image: "/006.png", link: "/cars/14", priceRange: "11 L – 16 L",   fuelType: "Electric", seating: 5 },
  { id: 15, name: "Rimello E5 Z", category: "Sub Compact SUV", budget: "10-20 Lakh",    image: "/006.png", link: "/cars/15", priceRange: "12 L – 17 L",   fuelType: "Petrol",   seating: 5 },
  // 10-20 Lakh — Sedan & Others
  { id: 16, name: "Rimello A4",   category: "Sedan & Others",  budget: "10-20 Lakh",    image: "/006.png", link: "/cars/16", priceRange: "10 L – 15 L",   fuelType: "Petrol",   seating: 5 },
  { id: 17, name: "Rimello A4 S", category: "Sedan & Others",  budget: "10-20 Lakh",    image: "/006.png", link: "/cars/17", priceRange: "12 L – 18 L",   fuelType: "Diesel",   seating: 5 },
  { id: 18, name: "Rimello A4 E", category: "Sedan & Others",  budget: "10-20 Lakh",    image: "/006.png", link: "/cars/18", priceRange: "13 L – 19 L",   fuelType: "Electric", seating: 5 },
  // 20-30 Lakh — SUV
  { id: 19, name: "Rimello S7",   category: "SUV",             budget: "20-30 Lakh",    image: "/006.png", link: "/cars/19", priceRange: "22 L – 27 L",   fuelType: "Diesel",   seating: 7 },
  { id: 20, name: "Rimello S7 R", category: "SUV",             budget: "20-30 Lakh",    image: "/006.png", link: "/cars/20", priceRange: "24 L – 29 L",   fuelType: "Petrol",   seating: 7 },
  { id: 21, name: "Rimello S7 E", category: "SUV",             budget: "20-30 Lakh",    image: "/006.png", link: "/cars/21", priceRange: "25 L – 30 L",   fuelType: "Electric", seating: 5 },
  // 20-30 Lakh — Sub Compact SUV
  { id: 22, name: "Rimello V6",   category: "Sub Compact SUV", budget: "20-30 Lakh",    image: "/006.png", link: "/cars/22", priceRange: "20 L – 25 L",   fuelType: "Petrol",   seating: 5 },
  { id: 23, name: "Rimello V6 X", category: "Sub Compact SUV", budget: "20-30 Lakh",    image: "/006.png", link: "/cars/23", priceRange: "21 L – 26 L",   fuelType: "Electric", seating: 5 },
  { id: 24, name: "Rimello V6 S", category: "Sub Compact SUV", budget: "20-30 Lakh",    image: "/006.png", link: "/cars/24", priceRange: "22 L – 28 L",   fuelType: "Diesel",   seating: 5 },
  // 20-30 Lakh — Sedan & Others
  { id: 25, name: "Rimello G8",   category: "Sedan & Others",  budget: "20-30 Lakh",    image: "/006.png", link: "/cars/25", priceRange: "20 L – 24 L",   fuelType: "Petrol",   seating: 5 },
  { id: 26, name: "Rimello G8 L", category: "Sedan & Others",  budget: "20-30 Lakh",    image: "/006.png", link: "/cars/26", priceRange: "23 L – 28 L",   fuelType: "Diesel",   seating: 5 },
  { id: 27, name: "Rimello G8 E", category: "Sedan & Others",  budget: "20-30 Lakh",    image: "/006.png", link: "/cars/27", priceRange: "25 L – 30 L",   fuelType: "Electric", seating: 5 },
];

const under10Categories = ["Sub Compact SUV", "Hatchback", "Sedan & Others"];
const above10Budgets     = ["10-20 Lakh", "20-30 Lakh"];
const above10Categories  = ["SUV", "Sub Compact SUV", "Sedan & Others"];

/* ─── CarCard — mirrors the brands-page card pattern exactly ─── */
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
        {/* fixed-height — cards never collapse */}
        <div className="group relative flex flex-col w-full h-[370px] bg-[#111] rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]">

          {/* ── image with badge overlay (same as brands page) ── */}
          <div className="relative h-[185px] flex-shrink-0 overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full leading-none">
                {car.name}
              </span>
            </div>

            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            {/* bleed into card bg */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#111] to-transparent" />
          </div>

          {/* ── card body ── */}
          <div className="flex flex-col flex-1 px-5 py-4 gap-3">

            {/* category + budget */}
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold text-sm leading-none">{car.category}</span>
              <span className="text-[11px] text-gray-500">{car.budget}</span>
            </div>

            {/* divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* spec rows — identical to brands page CardContent */}
            <div className="flex flex-col gap-2.5">

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <IndianRupee className="w-4 h-4 flex-shrink-0" />
                <span>
                  From{" "}<span className="text-white font-medium">{from}</span>
                  {" "}to{" "}<span className="text-white font-medium">{to}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Fuel className="w-4 h-4 flex-shrink-0" />
                <span>{car.fuelType}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>{car.seating} Seater</span>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-auto flex justify-end">
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

/* ─── section heading ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="inline-block w-1 h-7 rounded-full bg-blue-500" />
      {children}
    </h2>
  );
}

/* ─── pill tab ── */
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

/* ─── main export ── */
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

        {/* main heading */}
        <div className="mb-16">
          {/* <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Explore Our Lineup
          </p> */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Popular Cars By Budget
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl text-sm leading-relaxed">
            Explore cars categorized by budget and type. Find the perfect car that fits your style and wallet.
          </p>
        </div>

        {/* ══ UNDER 10 LAKH ══ */}
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

        {/* ══ ABOVE 10 LAKH ══ */}
        <SectionHeading>Cars Above 10 Lakh</SectionHeading>

        {/* budget tabs left, category pills right — on same row */}
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
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, IndianRupee, Fuel, Users, CalendarCheck } from "lucide-react";

interface CarItem {
  id: number;
  name: string;
  category: string;
  status: "upcoming" | "launched";
  date: string;
  image: string;
  link: string;
  priceRange: string;
  fuelType: string;
  seating: number;
}

const cars: CarItem[] = [
  {
    id: 1,
    name: "Rimello X2 Concept",
    category: "SUV",
    status: "launched",
    date: "26 March 2026",
    image: "/006.png",
    link: "/cars/1",
    priceRange: "18 L – 24 L",
    fuelType: "Diesel",
    seating: 7,
  },
  {
    id: 2,
    name: "Rimello E5 Electric",
    category: "Electric",
    status: "launched",
    date: "15 April 2026",
    image: "/006.png",
    link: "/cars/2",
    priceRange: "22 L – 28 L",
    fuelType: "Electric",
    seating: 5,
  },
  {
    id: 3,
    name: "Rimello S9 Luxury Sedan",
    category: "Sedan",
    status: "launched",
    date: "15 Feb 2026",
    image: "/006.png",
    link: "/cars/3",
    priceRange: "30 L – 38 L",
    fuelType: "Petrol",
    seating: 5,
  },
  {
    id: 4,
    name: "Rimello A3 Compact",
    category: "Hatchback",
    status: "launched",
    date: "10 Jan 2026",
    image: "/006.png",
    link: "/cars/4",
    priceRange: "8 L – 11 L",
    fuelType: "CNG",
    seating: 5,
  },
];

const fuelAccent: Record<string, { pill: string; dot: string }> = {
  Petrol:   { pill: "bg-amber-400/10   text-amber-300   border-amber-400/20",  dot: "bg-amber-400"   },
  Diesel:   { pill: "bg-sky-400/10     text-sky-300     border-sky-400/20",    dot: "bg-sky-400"     },
  Electric: { pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20", dot: "bg-emerald-400" },
  CNG:      { pill: "bg-violet-400/10  text-violet-300  border-violet-400/20", dot: "bg-violet-400"  },
};

function CarCard({ car, index }: { car: CarItem; index: number }) {
  const [from, to] = car.priceRange.split("–").map((s) => s.trim());
  const fuel = fuelAccent[car.fuelType] ?? fuelAccent["Petrol"];

  return (
    <motion.div
      className="flex-1 min-w-[260px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      viewport={{ once: true }}
    >
      <Link href={car.link}>
        {/* fixed height card */}
        <div className="group relative flex flex-col w-full h-[430px] bg-[#0f0f0f] rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.13)]">

          {/* ── image ── */}
          <div className="relative h-[200px] flex-shrink-0 overflow-hidden">
            {/* car name badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full leading-none">
                {car.name}
              </span>
            </div>
            {/* category */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm text-gray-300 rounded-full border border-white/10 leading-none">
                {car.category}
              </span>
            </div>

            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-contain transition duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
          </div>

          {/* ── body ── */}
          <div className="flex flex-col flex-1 px-5 py-4 gap-3">

            {/* launch date */}
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <CalendarCheck className="w-3.5 h-3.5 flex-shrink-0 text-blue-500" />
              <span>Launched: <span className="text-gray-400">{car.date}</span></span>
            </div>

            {/* divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* ── spec block — displayed differently: horizontal pill strip ── */}
            <div className="flex flex-col gap-0 rounded-xl border border-white/[0.07] overflow-hidden">

              {/* price row */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/20 flex-shrink-0">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-400" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium">Price Range</span>
                  <span className="text-sm text-white font-semibold">
                    {from} <span className="text-gray-500 font-normal text-xs">to</span> {to}
                  </span>
                </div>
              </div>

              {/* fuel + seating row — side by side */}
              <div className="flex">
                {/* fuel */}
                <div className="flex items-center gap-3 px-4 py-3 flex-1 border-r border-white/[0.06]">
                  <span className={`flex items-center justify-center w-7 h-7 rounded-lg border flex-shrink-0 ${fuel.pill}`}>
                    <Fuel className="w-3.5 h-3.5" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium">Fuel</span>
                    <span className="text-sm text-white font-semibold">{car.fuelType}</span>
                  </div>
                </div>

                {/* seating */}
                <div className="flex items-center gap-3 px-4 py-3 flex-1">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-widest text-gray-600 font-medium">Seats</span>
                    <span className="text-sm text-white font-semibold">{car.seating}</span>
                  </div>
                </div>
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

export default function RecentlyLaunched() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Fresh Off The Line
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Recently Launched Cars
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl text-sm leading-relaxed">
              Stay ahead with the recently launched models. Explore specs, features, and launch timelines to choose your perfect ride.
            </p>
          </div>

          <Link
            href="/cars"
            className="hidden md:flex items-center text-blue-500 hover:text-blue-400 transition font-medium text-sm"
          >
            View All Cars <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:flex gap-5 justify-between">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* Mobile scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
          {cars.map((car, index) => (
            <div key={car.id} className="min-w-[280px] shrink-0">
              <CarCard car={car} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="/cars"
            className="inline-flex items-center text-blue-500 hover:text-blue-400 transition font-medium text-sm"
          >
            View All Cars <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
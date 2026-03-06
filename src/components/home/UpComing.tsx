"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, IndianRupee, Fuel, Users, Clock } from "lucide-react";

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
    status: "upcoming",
    date: "Expected: 26 Mar 2026",
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
    status: "upcoming",
    date: "Expected: 15 Apr 2026",
    image: "/006.png",
    link: "/cars/2",
    priceRange: "22 L – 28 L",
    fuelType: "Electric",
    seating: 5,
  },
  {
    id: 3,
    name: "Rimello S9 Luxury",
    category: "Sedan",
    status: "upcoming",
    date: "Expected: 15 Sep 2026",
    image: "/006.png",
    link: "/cars/3",
    priceRange: "30 L – 38 L",
    fuelType: "Petrol",
    seating: 5,
  },
  {
    id: 4,
    name: "Rimello V8 GT",
    category: "Sports",
    status: "upcoming",
    date: "Expected: Dec 2026",
    image: "/006.png",
    link: "/cars/4",
    priceRange: "45 L – 55 L",
    fuelType: "Petrol",
    seating: 4,
  },
];

/* ─── fuel type colour ── */
const fuelColors: Record<string, string> = {
  Petrol:   "text-amber-400",
  Diesel:   "text-sky-400",
  Electric: "text-emerald-400",
  CNG:      "text-violet-400",
};

/* ─── single card ── */
function CarCard({ car, index }: { car: CarItem; index: number }) {
  const [from, to] = car.priceRange.split("–").map((s) => s.trim());

  return (
    <motion.div
      className="flex-1 min-w-[260px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
      viewport={{ once: true }}
    >
      <Link href={car.link}>
        {/* fixed height — never collapses */}
        <div className="group relative flex flex-col w-full h-[420px] bg-[#111] rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.14)]">

          {/* ── image zone ── */}
          <div className="relative h-[210px] flex-shrink-0 overflow-hidden">

            {/* car name badge — top left */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full leading-none">
                {car.name}
              </span>
            </div>

            {/* category — top right */}
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

            {/* fade into card bg */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#111] to-transparent" />
          </div>

          {/* ── card body ── */}
          <div className="flex flex-col flex-1 px-5 py-4 gap-3">

            {/* launch date row */}
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{car.date}</span>
            </div>

            {/* divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* spec rows — same pattern as brands page */}
            <div className="flex flex-col gap-2.5">

              {/* price */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <IndianRupee className="w-4 h-4 flex-shrink-0" />
                <span>
                  From{" "}<span className="text-white font-medium">{from}</span>
                  {" "}to{" "}<span className="text-white font-medium">{to}</span>
                </span>
              </div>

              {/* fuel */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Fuel className={`w-4 h-4 flex-shrink-0 ${fuelColors[car.fuelType] ?? "text-gray-400"}`} />
                <span>{car.fuelType}</span>
              </div>

              {/* seating */}
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

/* ─── main export ── */
export default function UpcomingCars() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Upcoming Cars
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl text-sm leading-relaxed">
              Stay ahead with the latest upcoming cars. Explore specs, features, and launch timelines to choose your perfect ride.
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

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              className="min-w-[280px] shrink-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CarCard car={car} index={index} />
            </motion.div>
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
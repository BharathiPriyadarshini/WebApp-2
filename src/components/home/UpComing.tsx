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
  fuelTypes: string[];
  seating: number;
}

const fuelColor: Record<string, string> = {
  Petrol:   "text-amber-400",
  Diesel:   "text-sky-400",
  Electric: "text-emerald-400",
  CNG:      "text-violet-400",
};

const cars: CarItem[] = [
  {
    id: 1,
    name: "Rimello X2 Concept",
    category: "SUV",
    status: "upcoming",
    date: "Expected: 26 Mar 2026",
    image: "/006.png",
    link: "/trims/1",
    priceRange: "18 L – 24 L",
    fuelTypes: ["Diesel", "Petrol"],
    seating: 7,
  },
  {
    id: 2,
    name: "Rimello E5 Electric",
    category: "Electric",
    status: "upcoming",
    date: "Expected: 15 Apr 2026",
    image: "/006.png",
    link: "/trims/1",
    priceRange: "22 L – 28 L",
    fuelTypes: ["Electric"],
    seating: 5,
  },
  {
    id: 3,
    name: "Rimello S9 Luxury",
    category: "Sedan",
    status: "upcoming",
    date: "Expected: 15 Sep 2026",
    image: "/006.png",
    link: "/trims/1",
    priceRange: "30 L – 38 L",
    fuelTypes: ["Petrol", "Diesel"],
    seating: 5,
  },
  {
    id: 4,
    name: "Rimello V8 GT",
    category: "Sports",
    status: "upcoming",
    date: "Expected: Dec 2026",
    image: "/006.png",
    link: "/trims/1",
    priceRange: "45 L – 55 L",
    fuelTypes: ["Petrol"],
    seating: 4,
  },
];

/* ── premium fuel: Petrol • Diesel ── */
function FuelTypes({ types }: { types: string[] }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Fuel className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="flex items-center gap-1.5">
        {types.map((t, i) => (
          <span key={t} className="flex items-center gap-1.5">
            <span className={`font-medium ${fuelColor[t]}`}>{t}</span>
            {i < types.length - 1 && (
              <span className="text-muted-foreground/70 text-xs">•</span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

/* ── single card ── */
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
        {/* no fixed height — card shrinks to content */}
        <div className="group relative flex flex-col w-full bg-card dark:bg-[#111] rounded-2xl overflow-hidden cursor-pointer border border-border transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.14)]">

          {/* image */}
          <div className="relative h-[190px] shrink-0 overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                {car.name}
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 text-xs font-medium bg-background/70 backdrop-blur-sm text-muted-foreground rounded-full border border-border">
                {car.category}
              </span>
            </div>
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-contain transition duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-linear-to-t from-card dark:from-[#111] to-transparent" />
          </div>

          {/* body */}
          <div className="flex flex-col px-5 py-4 gap-2.5">

            {/* date */}
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{car.date}</span>
            </div>

            <div className="h-px bg-border" />

            {/* price */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <IndianRupee className="w-4 h-4 shrink-0" />
              <span>
                From <span className="text-card-foreground font-medium">{from}</span>
                {" "}to <span className="text-card-foreground font-medium">{to}</span>
              </span>
            </div>

            {/* fuel */}
            <FuelTypes types={car.fuelTypes} />

            {/* seating + know more on same row — no dead space below */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
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

/* ── main export ── */
export default function UpcomingCars() {
  return (
    <section className="py-24 bg-background dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Coming Soon
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
              Upcoming Cars
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
              Stay ahead with the latest upcoming cars. Explore specs,
              features, and launch timelines to choose your perfect ride.
            </p>
          </div>
          <Link
            href="/cars"
            className="hidden md:flex items-center text-blue-500 hover:text-blue-400 transition font-medium text-sm"
          >
            View All Cars <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* desktop */}
        <div className="hidden md:flex gap-5 justify-between">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* mobile scroll */}
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
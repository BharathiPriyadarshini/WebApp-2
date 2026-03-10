"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, IndianRupee, Flame, Star, TrendingUp } from "lucide-react";

interface Car {
  id: number;
  brand: string;
  model: string;
  price: number;
  badge?: string;
  rating: number;
  reviews: number;
  searchPct: number;
}

const trendingCars: Car[] = [
  { id: 1,  brand: "Rimello", model: "X5 Signature",      price: 1500000, badge: "Best Seller",  rating: 4.6, reviews: 3240, searchPct: 94 },
  { id: 2,  brand: "Rimello", model: "S7 Elite AWD",       price: 2500000, badge: "Top Rated",    rating: 4.8, reviews: 1820, searchPct: 88 },
  { id: 3,  brand: "Rimello", model: "E5 Electric",        price: 2800000, badge: "EV Pick",      rating: 4.5, reviews: 1120, searchPct: 82 },

  
];

const rankStyle: Record<number, { border: string; glow: string; badge: string; label: string }> = {
  0: { border: "hover:border-amber-400/50", glow: "hover:shadow-[0_8px_40px_rgba(251,191,36,0.12)]", badge: "bg-amber-400/15 text-amber-300 border-amber-400/25", label: "#1 Trending" },
  1: { border: "hover:border-blue-500/50",  glow: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.13)]", badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",    label: "#2 Trending" },
  2: { border: "hover:border-white/30",     glow: "hover:shadow-[0_8px_32px_rgba(255,255,255,0.06)]", badge: "bg-white/8 text-gray-300 border-white/12",           label: "#3 Trending" },
};

const defaultRank = { border: "hover:border-blue-500/40", glow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.10)]", badge: "bg-blue-500/10 text-blue-300 border-blue-500/20", label: "Trending" };

export default function TrendingCars() {
  return (
    <section className="py-24 bg-background dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3 flex items-center gap-2">
              {/* <Flame size={12} className="text-orange-400" /> */}
              What&apos;s Hot Right Now
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white leading-tight">Trending Cars</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-md leading-relaxed">
              Most searched and recently launched vehicles in your region.
            </p>
          </div>
          <Link href="/cars" className="hidden md:flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition font-medium text-sm">
            View All Cars <ChevronRight size={15} />
          </Link>
        </div>

        {/* 3-col grid — all 9 cards, 3 rows */}
        <div className="grid md:grid-cols-3 gap-5">
          {trendingCars.map((car, index) => {
            const rank = rankStyle[index] ?? defaultRank;

            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 3) * 0.08, duration: 0.45 }}
                viewport={{ once: true }}
              >
                <Link href={`/cars/${car.id}`}>
                  <div className={`group relative flex flex-col w-full h-[400px] bg-card dark:bg-[#0f0f0f] rounded-2xl overflow-hidden cursor-pointer border border-border transition-all duration-300 ${rank.border} ${rank.glow}`}>

                    {/* image */}
                    <div className="relative h-[200px] shrink-0 overflow-hidden bg-muted dark:bg-[#141414]">

                      <div className="absolute top-3 left-3 z-10">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${rank.badge}`}>
                          <TrendingUp size={10} />
                          {rank.label}
                        </span>
                      </div>

                      {car.badge && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-600 text-white">
                            {car.badge}
                          </span>
                        </div>
                      )}

                      <Image
                        src="/006.png"
                        alt={`${car.brand} ${car.model}`}
                        fill
                        className="object-contain transition duration-500 group-hover:scale-105 p-2"
                      />
                      <div className="absolute bottom-0 inset-x-0 h-12 bg-linear-to-t from-card dark:from-[#0f0f0f] to-transparent" />
                    </div>

                    {/* body */}
                    <div className="flex flex-col flex-1 px-5 py-4 gap-2.5">

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{car.brand}</p>
                        <h3 className="text-card-foreground font-bold text-lg leading-tight mt-0.5">{car.model}</h3>
                      </div>

                      {/* search trend bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 rounded-full bg-foreground/10 dark:bg-white/6 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-blue-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${car.searchPct}%` }}
                            transition={{ duration: 0.9, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <span className="text-muted-foreground text-[10px] tabular-nums">{car.searchPct}%</span>
                      </div>

                      <div className="h-px bg-border" />

                      {/* price + rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <IndianRupee size={13} className="text-muted-foreground shrink-0" />
                          <span className="text-card-foreground font-bold text-base">
                            {(car.price / 100000).toFixed(1)} L
                          </span>
                          <span className="text-muted-foreground/80 text-xs">onwards</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/5 border border-border">
                          <Star size={11} className="text-amber-400 fill-amber-400" />
                          <span className="text-card-foreground text-xs font-semibold">{car.rating}</span>
                          <span className="text-muted-foreground text-[10px]">({car.reviews.toLocaleString()})</span>
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
          })}
        </div>

        {/* mobile view all */}
        <div className="mt-10 md:hidden text-center">
          <Link href="/cars" className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-400 transition font-medium text-sm">
            View All Cars <ChevronRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
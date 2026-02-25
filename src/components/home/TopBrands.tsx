"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useBrands } from "@/hooks/useBrands";
import { Card } from "@/components/ui/card";

/* ================= ANIMATION ================= */
const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function TopBrands() {
  const { topBrands, loadingTop } = useBrands();

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-white">
            POPULAR BRANDS
          </h2>

          <Link
            href="/brands"
            className="flex items-center text-blue-500 hover:text-blue-400 transition text-sm font-medium"
          >
            VIEW ALL <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Brands Row */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">

          {loadingTop
            ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[160px] h-40 bg-[#111] rounded-2xl animate-pulse"
              />
            ))
            : topBrands.map((brand, index) => (
              <motion.div
                key={brand._id}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={cardAnimation}
                className="min-w-[160px]"
              >
                <Link
                  href={`/brands?brand=${brand._id}`}
                  className="group block"
                >
                  <Card className="bg-[#111] border border-white/10 rounded-2xl p-8 text-center hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-300">
                    {/* Logo Circle */}
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-black border border-white/10 group-hover:scale-110 transition">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-white/40 text-sm uppercase">
                          {brand.name.slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Brand Name */}
                    <p className="text-gray-300 group-hover:text-white transition capitalize">
                      {brand.name}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

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
                  className="min-w-[120px] h-32 bg-[#111] rounded-xl animate-pulse"
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
                  className="min-w-[120px]"
                >
                  <Link
                    href={`/brands?brand=${brand._id}`}
                    className="group block"
                  >
                    <Card className="bg-[#111] border border-white/10 rounded-xl px-0 py-6 text-center hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-300">
                      
                      {/* Inner wrapper controls spacing */}
                      <div className="flex flex-col items-center justify-center leading-none">
                        
                        {/* Logo */}
                        <div className="w-12 h-12  flex items-center justify-center rounded-full group-hover:scale-110 transition">
                          {brand.logo ? (
                            <span className="text-white/40 text-sm uppercase leading-none">
                              {brand.name.slice(0, 2)}
                            </span>
                          ) : (
                            <Image
                              src="/logos/toyota.png"
                              alt="Brand placeholder"
                              width={30}
                              height={30}
                              className="object-contain opacity-70"
                            />
                          )}
                        </div>

                        {/* Brand Name */}
                        <p className="text-sm pb-2 leading-none mt-0 text-gray-300 group-hover:text-white transition capitalize">
                          {brand.name}
                        </p>

                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
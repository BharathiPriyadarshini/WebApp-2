"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const brands = ["Toyota", "BMW", "Mercedes", "Tesla", "Audi"];

export default function TopBrands() {
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
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[160px]"
            >
              <Link
                href={`/cars/${brand.toLowerCase()}`}
                className="group block bg-[#111] border border-white/10 rounded-2xl p-8 text-center hover:bg-[#1a1a1a] transition"
              >
                {/* Logo Circle Placeholder */}
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-white/10 border border-white/10 group-hover:bg-blue-500/20 transition">
                  <span className="text-white text-lg font-bold">
                    {brand.charAt(0)}
                  </span>
                </div>

                {/* Brand Name */}
                <p className="text-gray-300 group-hover:text-white transition">
                  {brand}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

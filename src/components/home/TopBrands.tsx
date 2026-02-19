"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const brands = [
  { name: "Toyota", logo: "/logos/toyota.svg" },
  { name: "BMW", logo: "/logos/bmw.svg" },
  { name: "Ferrari", logo: "/logos/ferrari.svg" },
  { name: "Mercedes", logo: "/logos/mercedes.svg" }, // add if exists
  { name: "Tesla", logo: "/logos/tesla.svg" },       // add if exists
  { name: "Audi", logo: "/logos/audi.svg" },         // add if exists
];

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
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[160px]"
            >
              <Link
                href={`/brands/${brand.name.toLowerCase()}`}
                className="group block bg-[#111] border border-white/10 rounded-2xl p-8 text-center hover:bg-[#1a1a1a] transition"
              >
                {/* Logo Circle */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#111]  group-hover:scale-110 transition">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Brand Name */}
                <p className="text-gray-300 group-hover:text-white transition">
                  {brand.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

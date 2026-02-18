"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const brands = ["Toyota", "BMW", "Mercedes", "Tesla", "Audi"];

export default function TopBrands() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-10">Top Brands</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/cars/${brand.toLowerCase()}`}
              className="p-6 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition block"
            >
              {brand}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

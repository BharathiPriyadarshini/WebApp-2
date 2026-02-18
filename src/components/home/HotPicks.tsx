"use client";

import { motion } from "framer-motion";
import { cars } from "@/data/mockCars";

export default function HotPicks() {
  const hotCars = cars.filter((car) => car.isHot);

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-10">Hot Picks 🔥</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {hotCars.map((car) => (
          <motion.div
            key={car.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-xl font-semibold">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-400 mt-2">
              ₹ {car.price.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

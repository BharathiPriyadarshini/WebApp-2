"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Explore Your Dream Car
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          Discover premium vehicles tailored to your lifestyle.
        </p>

        <button className="mt-8 px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
          Browse Cars
        </button>
      </motion.div>
    </section>
  );
}

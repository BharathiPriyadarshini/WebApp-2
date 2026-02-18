"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center px-4 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Explore Your Dream Car
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-400 max-w-xl mx-auto">
          Discover premium vehicles tailored to your lifestyle.
        </p>

        {/* Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {["Recommendation", "Filter", "Compare", "Buy"].map((chip) => (
            <button
              key={chip}
              className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition border border-gray-700"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex items-center bg-gray-800 rounded-full p-2 border border-gray-700 max-w-2xl mx-auto">
          <Search className="text-gray-400 ml-3" size={18} />
          <input
            type="text"
            placeholder="Search for your dream car (e.g., SUV under $50k)"
            className="flex-1 bg-transparent outline-none px-4 py-2 text-white placeholder-gray-500"
          />
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition">
            Search
          </button>
        </div>
      </motion.div>
    </section>
  );
}

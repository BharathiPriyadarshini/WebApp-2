"use client";

import { motion } from "framer-motion";

export default function SmartComparison() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            SMART <br /> COMPARISON
          </h2>

          <p className="mt-6 text-gray-400 max-w-md">
            Don’t just look at specs. Our AI evaluates safety records,
            maintenance costs, and resale value to give you a holistic score
            for every vehicle.
          </p>

          {/* Feature Points */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                01
              </span>
              Deep Technical Breakdown
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                02
              </span>
              Historical Reliability Scores
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                03
              </span>
              TCO (Total Cost of Ownership) Analysis
            </div>
          </div>

          <button className="mt-10 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition">
            Start Comparing
          </button>
        </motion.div>

        {/* RIGHT SIDE COMPARISON CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="space-y-6">
            
            {/* Metric 1 */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Acceleration (0-60)</span>
                <span className="text-white">2.3s vs 1.89s</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Max Range</span>
                <span className="text-white">405km vs 516km</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>AI Safety Score</span>
                <span className="text-white">9.4 / 10</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[94%] h-full bg-blue-500 rounded-full" />
              </div>
            </div>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
}

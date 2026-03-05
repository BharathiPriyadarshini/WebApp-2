"use client";

import { motion } from "framer-motion";
import { Car, Truck, Zap, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";

const types = [
  { name: "SUV", icon: Truck },
  { name: "Sedan", icon: Car },
  { name: "Hatchback", icon: Car },
  { name: "Electric", icon: Zap },
  { name: "Luxury", icon: Crown },
];

export default function ByCarType() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 uppercase">
          Find By Body Type
        </h2>

        {/* Body Type Cards */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {types.map((type, index) => {
            const Icon = type.icon;

            return (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[150px]"
              >
                <Card className="group w-full bg-[#111] border border-white/10 rounded-2xl py-8 px-6 flex flex-col items-center justify-center hover:bg-[#16202a] hover:border-blue-500/40 transition duration-300 cursor-pointer">

                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 mb-4 group-hover:bg-blue-500/20 transition">
                    <Icon className="text-gray-300 group-hover:text-blue-400 transition" size={22} />
                  </div>

                  {/* Label */}
                  <span className="text-gray-300 group-hover:text-white transition">
                    {type.name}
                  </span>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

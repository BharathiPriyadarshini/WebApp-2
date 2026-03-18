"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Car,
  Truck,
  Zap,
  Crown,
  Armchair,
  Wind,
  Bus,
  Bike,
} from "lucide-react";

const types = [
  { name: "SUV", description: "Bold & commanding", icon: Truck, href: "/trims?bodyType=SUV" },
  { name: "Sedan", description: "Sleek & refined", icon: Car, href: "/trims?bodyType=Sedan" },
  { name: "Hatchback", description: "Compact & agile", icon: Wind, href: "/trims?bodyType=Hatchback" },
  { name: "Electric", description: "Zero emissions", icon: Zap, href: "/trims" },
  { name: "Luxury", description: "Premium comfort", icon: Crown, href: "/trims" },
  { name: "MUV", description: "Space for all", icon: Bus, href: "/trims" },
  { name: "Coupe", description: "Open-air thrill", icon: Bike, href: "/trims?bodyType=Coupe" },
  { name: "Convertible", description: "Born to cruise", icon: Armchair, href: "/trims" },
];

export default function ByCarType() {
  return (
    <section className="py-20 bg-background dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* heading */}
        <div className="mb-10">
          {/* <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Browse By Type
          </p> */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
            Find By Body Type
          </h2>
        </div>

        {/* card strip */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {types.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
                viewport={{ once: true }}
                className="shrink-0"
              >
                <Link href={type.href}>
                  {/* fixed size — always 120×148, never shrinks or grows */}
                  <div className="group relative w-[120px] h-[148px] flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-border bg-card dark:bg-[#0f0f0f] cursor-pointer transition-all duration-300 hover:border-foreground/30 hover:bg-muted">

                    {/* icon — no coloured bg, just the stroke */}
                    <Icon
                      size={28}
                      strokeWidth={1.4}
                      className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground dark:group-hover:text-white"
                    />

                    {/* name */}
                    <span className="text-card-foreground text-sm font-semibold leading-none text-center">
                      {type.name}
                    </span>

                    {/* description */}
                    <span className="text-muted-foreground/80 text-[10px] text-center leading-tight px-3 group-hover:text-muted-foreground transition-colors duration-200">
                      {type.description}
                    </span>

                    {/* bottom accent line */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 rounded-full bg-foreground/40 dark:bg-white/40 group-hover:w-8 transition-all duration-300" />

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
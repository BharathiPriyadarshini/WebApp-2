"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cars } from "@/data/mockCars";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";

export default function HotPicks() {
  const hotCars = cars.filter((car) => car.isHot);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              TRENDING CARS 
            </h2>
            <p className="text-gray-400 mt-2">
              Most searched and recently launched vehicles in your region
            </p>
          </div>

          <Link
            href="/cars"
            className="hidden md:flex items-center text-blue-500 hover:text-blue-400 transition font-medium"
          >
            View All Cars <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {hotCars.slice(0, 3).map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 py-0">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/alt.png";
                    }}
                  />

                  {/* Badge */}
                  {car.badge && (
                    <Badge className="absolute top-4 right-4 bg-blue-600 text-white border-transparent">
                      {car.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {car.brand} {car.model}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    Most searched and recently launched vehicle
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white font-semibold text-lg">
                      ₹ {car.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="/cars"
            className="inline-flex items-center text-blue-500 hover:text-blue-400 transition font-medium"
          >
            View All Cars <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

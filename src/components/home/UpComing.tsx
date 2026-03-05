"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight } from "lucide-react";

interface CarItem {
  id: number;
  name: string;
  category: string;
  status: "upcoming" | "launched";
  date: string;
  image: string;
  link: string;
}

const cars: CarItem[] = [
  {
    id: 1,
    name: "Rimello X2 Concept",
    category: "SUV",
    status: "upcoming",
    date: "Expected Launch: 26 March 2026",
    image: "/alt.png",
    link: "/cars/1",
  },
  {
    id: 2,
    name: "Rimello E5 Electric",
    category: "Electric",
    status: "upcoming",
    date: "Expected Launch: 15 April 2026",
    image: "/alt.png",
    link: "/cars/2",
  },
  {
    id: 3,
    name: "Rimello S9 Luxury Sedan",
    category: "Sedan",
    status: "upcoming",
    date: "Expected Launch: 15 Sep 2026",
    image: "/alt.png",
    link: "/cars/3",
  },
  
];

export default function UpcomingCars() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Upcoming Cars
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Stay ahead with the latest upcoming cars. Explore specs, features, and launch timelines to choose your perfect ride.
            </p>
          </div>

          <Link
            href="/cars"
            className="hidden md:flex items-center text-blue-500 hover:text-blue-400 transition font-medium"
          >
            View All Cars <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:flex gap-8 justify-between">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              className="flex-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={car.link}>
                <Card className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 cursor-pointer h-[450px]">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Status Chip */}
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white border-transparent">
                      {car.date}
                    </Badge>
                    {/* Category Badge */}
                    {car.category && (
                      <Badge className="absolute top-4 right-4 bg-gray-800/70 text-white border-transparent">
                        {car.category}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col justify-between h-[190px]">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                    </div>
                    <div className="mt-4 flex items-center text-blue-500 font-medium">
                      Know More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              className="min-w-[280px] shrink-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={car.link}>
                <Card className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 cursor-pointer h-[450px]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white border-transparent">
                      {car.date}
                    </Badge>
                    {car.category && (
                      <Badge className="absolute top-4 right-4 bg-gray-800/70 text-white border-transparent">
                        {car.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-[190px]">
                    <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                    <div className="mt-4 flex items-center text-blue-500 font-medium">
                      Know More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
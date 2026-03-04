"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight } from "lucide-react";

interface Car {
  id: number;
  name: string;
  category: string;
  budget: string;
  image: string;
  link: string;
}

const allCars: Car[] = [
  { id: 1, name: "Rimello X1", category: "Sub Compact SUV", budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/1" },
  { id: 2, name: "Rimello S3", category: "Hatchback", budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/2" },
  { id: 3, name: "Rimello E2", category: "Sedan & Others", budget: "Under 10 Lakh", image: "/alt.png", link: "/cars/3" },
  { id: 4, name: "Rimello X5", category: "SUV", budget: "10-20 Lakh", image: "/alt.png", link: "/cars/4" },
  { id: 5, name: "Rimello S7", category: "SUV", budget: "20-30 Lakh", image: "/alt.png", link: "/cars/5" },
  { id: 6, name: "Rimello E5", category: "Sub Compact SUV", budget: "10-20 Lakh", image: "/alt.png", link: "/cars/6" },
];

const under10Categories = ["Sub Compact SUV", "Hatchback", "Sedan & Others"];
const above10Budgets = ["10-20 Lakh", "20-30 Lakh"];
const above10Categories = ["SUV", "Sub Compact SUV", "Sedan & Others"];

export default function ByBudget() {
  const [activeUnderCategory, setActiveUnderCategory] = useState("Sub Compact SUV");
  const [activeAboveBudget, setActiveAboveBudget] = useState("10-20 Lakh");
  const [activeAboveCategory, setActiveAboveCategory] = useState("SUV");

  const under10Cars = allCars.filter(
    (car) =>
      car.budget === "Under 10 Lakh" &&
      car.category === activeUnderCategory
  );

  const above10Cars = allCars.filter(
    (car) =>
      car.budget === activeAboveBudget &&
      car.category === activeAboveCategory
  );

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== MAIN HEADING ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Popular Cars By Budget
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Explore cars categorized by budget and type. Find the perfect car that fits your style and wallet.
          </p>
        </div>

        {/* ================= UNDER 10 LAKH ================= */}
        <h2 className="text-3xl font-bold text-white mb-6">
          Cars Under 10 Lakh
        </h2>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {under10Categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveUnderCategory(cat)}
              className={`px-5 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                activeUnderCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {under10Cars.map((car, index) => (
            <motion.div
              key={car.id}
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
                      {car.budget}
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-gray-800/70 text-white border-transparent">
                      {car.category}
                    </Badge>
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

        {/* ================= ABOVE 10 LAKH ================= */}
        <h2 className="text-3xl font-bold text-white mb-6">
          Cars Above 10 Lakh
        </h2>

        {/* Budget Tabs */}
        <div className="flex gap-8 border-b border-white/10 mb-8">
          {above10Budgets.map((budget) => (
            <button
              key={budget}
              onClick={() => {
                setActiveAboveBudget(budget);
                setActiveAboveCategory("SUV");
              }}
              className={`pb-3 font-medium transition ${
                activeAboveBudget === budget
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {budget}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {above10Categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveAboveCategory(cat)}
              className={`px-5 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                activeAboveCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-8">
          {above10Cars.map((car, index) => (
            <motion.div
              key={car.id}
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
                      {car.budget}
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-gray-800/70 text-white border-transparent">
                      {car.category}
                    </Badge>
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

      </div>
    </section>
  );
}
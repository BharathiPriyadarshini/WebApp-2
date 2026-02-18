"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import CarCard, { Car } from "@/components/car/CarCard";

export default function BrandPage() {
  const { brand } = useParams();

  const cars: Car[] = [
    {
      id: "huracan",
      brand: brand as string,
      model: "Huracan EVO",
      bodyType: "Coupe",
      fuel: "Petrol",
      price: 26000000,
      priceLabel: "$260,000",
      mileage: "8 km/l",
      seating: 2,
      useCase: ["Sport"],
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=1200",
    },
    {
      id: "aventador",
      brand: brand as string,
      model: "Aventador SVJ",
      bodyType: "Supercar",
      fuel: "Petrol",
      price: 50000000,
      priceLabel: "$500,000",
      mileage: "6 km/l",
      seating: 2,
      useCase: ["Track"],
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-6xl font-bold capitalize mb-10">
        {brand}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cars.map((car) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

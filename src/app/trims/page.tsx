"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, Heart } from "lucide-react";
import { useState } from "react";

const mockVehicles = [
  {
    id: 1,
    name: "Rimello Spectre",
    price: "$189,500",
    tag: "98% Lifestyle Match",
  },
  {
    id: 2,
    name: "Rimello Nomad",
    price: "$115,000",
    tag: "Adventure Ready",
  },
  {
    id: 3,
    name: "Rimello City-E",
    price: "$42,900",
    tag: "Urban Top Pick",
  },
  {
    id: 4,
    name: "Rimello Sovereign",
    price: "$245,000",
    tag: "Ultra Luxury",
  },
  {
    id: 5,
    name: "Rimello Executive",
    price: "$92,000",
    tag: "Business Sedan",
  },
];

export default function TrimsPage() {
  const params = useSearchParams();
  const model = params.get("model");
  const brand = params.get("brand");

  // State for filters
  const [fuelType, setFuelType] = useState("Electric");
  const [transmission, setTransmission] = useState("Automatic");
  const [seatingCapacity, setSeatingCapacity] = useState("4-5");
  const [bodyType, setBodyType] = useState("Sedan");

  return (
    <div className="bg-black text-white min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Find Your Match
          </h1>
          <p className="text-gray-400 mt-2">
            64 vehicles matching your preferences
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex items-center bg-[#111] border border-white/10 rounded-full px-4 py-3 flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by make, model, or keywords..."
              className="bg-transparent outline-none ml-3 text-white w-full placeholder-gray-500"
            />
          </div>

          <button className="flex items-center justify-center bg-[#111] border border-white/10 rounded-full px-6 py-3 hover:border-blue-500 transition">
            Newest First
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-10 text-gray-300">

            {/* Brand */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3 uppercase font-semibold">
                Brand
              </h3>
              <div className="bg-[#111] border border-white/10 rounded-lg p-3 text-white">
                {brand || "All Brands"}
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3 uppercase font-semibold">
                Fuel Type
              </h3>
              <div className="flex flex-col gap-2">
                {["Electric", "Hybrid", "Gasoline"].map((type) => (
                  <label
                    key={type}
                    className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg border ${
                      fuelType === type
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fuelType"
                      value={type}
                      checked={fuelType === type}
                      onChange={() => setFuelType(type)}
                      className="hidden"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3 uppercase font-semibold">
                Transmission
              </h3>
              <div className="flex gap-4">
                {["Automatic", "Manual"].map((trans) => (
                  <button
                    key={trans}
                    onClick={() => setTransmission(trans)}
                    className={`px-5 py-2 rounded-full text-sm font-medium ${
                      transmission === trans
                        ? "bg-blue-600 text-white"
                        : "bg-[#111] border border-white/10 text-gray-400 hover:bg-white/10"
                    } transition`}
                  >
                    {trans}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Capacity */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3 uppercase font-semibold">
                Seating Capacity
              </h3>
              <div className="flex gap-3 flex-wrap">
                {["2", "4-5", "6", "7+"].map((seat) => (
                  <button
                    key={seat}
                    onClick={() => setSeatingCapacity(seat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      seatingCapacity === seat
                        ? "bg-blue-600 text-white"
                        : "bg-[#111] border border-white/10 text-gray-400 hover:bg-white/10"
                    } transition`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Type */}
            <div>
              <h3 className="text-gray-400 text-sm mb-3 uppercase font-semibold">
                Body Type
              </h3>
              <div className="flex gap-3 flex-wrap">
                {["Sedan", "SUV", "Coupe", "Truck"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setBodyType(type)}
                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      bodyType === type
                        ? "bg-blue-600 text-white"
                        : "bg-[#111] border border-white/10 text-gray-400 hover:bg-white/10"
                    } transition`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Vehicles Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {mockVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition"
                >
                  {/* Tag */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">
                      {vehicle.tag}
                    </span>
                    <Heart size={18} className="text-gray-400" />
                  </div>

                  {/* Image Placeholder */}
                  <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6" />

                  <h3 className="text-lg font-semibold">
                    {vehicle.name}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {vehicle.price}
                  </p>

                  <Link
                    href={`/trims/${vehicle.id}`}
                    className="mt-6 block text-center w-full bg-white text-black py-2 rounded-lg font-semibold hover:scale-105 transition"
                  >
                    View Details
                  </Link>

                </div>
              ))}

              {/* AI Card */}
              <div className="border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-10 text-center">
                <SlidersHorizontal size={28} className="text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold">
                  Not seeing the perfect fit?
                </h3>
                <p className="text-gray-400 mt-3 text-sm">
                  Let our AI build a custom configuration based on your
                  commute and hobbies.
                </p>

                <button className="mt-6 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition">
                  Start AI Configuration
                </button>
              </div>

            </div>

            {/* Load More */}
            <div className="flex justify-center mt-14">
              <button className="px-8 py-3 bg-[#111] border border-white/10 rounded-full hover:border-blue-500 transition">
                Load More Vehicles
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

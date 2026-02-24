"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Heart,
  Gauge,
  Settings,
} from "lucide-react";
import { useState, useMemo } from "react";

/* ---------------------------------- */
/* Brand Mapping (Fix brandId issue)  */
/* ---------------------------------- */
const brandMap: Record<string, string> = {
  "693869fe2955c01e5bd23c9c": "Kia",
  "693869fe2955c01e5bd23c9d": "BMW",
  "693869fe2955c01e5bd23c9e": "Mercedes",
};

/* ---------------------------------- */
/* Mock Vehicles                      */
/* ---------------------------------- */
const mockVehicles = [
  {
    id: 1,
    brand: "Kia",
    model: "EV5",
    name: "Kia EV5 GT-Line",
    price: 65000,
    fuelType: "Electric",
    transmission: "Automatic",
    seating: "5",
    bodyType: "SUV",
    horsepower: 310,
    createdAt: 5,
  },
  {
    id: 2,
    brand: "Kia",
    model: "EV5",
    name: "Kia EV5 Standard",
    price: 52000,
    fuelType: "Electric",
    transmission: "Automatic",
    seating: "5",
    bodyType: "SUV",
    horsepower: 210,
    createdAt: 3,
  },
  {
    id: 3,
    brand: "BMW",
    model: "iX",
    name: "BMW iX M60",
    price: 105000,
    fuelType: "Electric",
    transmission: "Automatic",
    seating: "5",
    bodyType: "SUV",
    horsepower: 610,
    createdAt: 10,
  },
];

export default function TrimsPage() {
  const params = useSearchParams();
  const brandId = params.get("brand");
  const model = params.get("model");

  const brandName = brandId ? brandMap[brandId] || brandId : "All Brands";

  /* -------------------- */
  /* States               */
  /* -------------------- */
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);

  /* -------------------- */
  /* Filtering Logic      */
  /* -------------------- */
  const filteredVehicles = useMemo(() => {
    let vehicles = mockVehicles.filter((vehicle) => {
      const matchBrand = brandName === "All Brands" || vehicle.brand === brandName;
      const matchModel = model ? vehicle.model === model : true;
      const matchSearch = vehicle.name.toLowerCase().includes(search.toLowerCase());
      const matchFuel = fuelType ? vehicle.fuelType === fuelType : true;
      const matchTransmission = transmission
        ? vehicle.transmission === transmission
        : true;
      const matchBody = bodyType ? vehicle.bodyType === bodyType : true;

      return (
        matchBrand &&
        matchModel &&
        matchSearch &&
        matchFuel &&
        matchTransmission &&
        matchBody
      );
    });

    if (sort === "newest") {
      vehicles.sort((a, b) => b.createdAt - a.createdAt);
    }

    return vehicles;
  }, [search, fuelType, transmission, bodyType, sort, brandName, model]);

  return (
    <div className="bg-black text-white min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ---------------- Header ---------------- */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Find Your Match</h1>
          <p className="text-gray-400 mt-2">
            {brandName} {model} Trims
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {filteredVehicles.length} vehicles matching your preferences
          </p>
        </div>

        {/* ---------------- Search + Sort ---------------- */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">

          <div className="flex items-center bg-[#111] border border-white/10 rounded-full px-4 py-3 flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by make, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-3 text-white w-full placeholder-gray-500"
            />
          </div>

          <button
            onClick={() => setSort("newest")}
            className={`px-6 py-3 rounded-full border transition ${
              sort === "newest"
                ? "bg-blue-600 border-blue-600"
                : "bg-[#111] border-white/10 hover:border-blue-500"
            }`}
          >
            Newest First
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* ---------------- Sidebar Filters ---------------- */}
          <aside className="hidden lg:block space-y-8">

            <FilterGroup
              title="Fuel Type"
              options={["Electric", "Hybrid", "Gasoline"]}
              selected={fuelType}
              setSelected={setFuelType}
            />

            <FilterGroup
              title="Transmission"
              options={["Automatic", "Manual"]}
              selected={transmission}
              setSelected={setTransmission}
            />

            <FilterGroup
              title="Body Type"
              options={["SUV", "Sedan", "Coupe"]}
              selected={bodyType}
              setSelected={setBodyType}
            />

          </aside>

          {/* ---------------- Vehicle Cards ---------------- */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition"
                >
                  <div className="flex justify-between mb-4">
                    <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">
                      {vehicle.model}
                    </span>
                    <Heart size={18} className="text-gray-400" />
                  </div>

                  <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6" />

                  <h3 className="text-lg font-semibold">
                    {vehicle.name}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    ${vehicle.price.toLocaleString()}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Gauge size={16} />
                      {vehicle.horsepower} HP
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings size={16} />
                      {vehicle.transmission}
                    </div>
                  </div>

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
                  Let our AI build a custom configuration.
                </p>
                <button className="mt-6 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition">
                  Start AI Configuration
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Filter Component ---------------- */
function FilterGroup({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string;
  options: string[];
  selected: string | null;
  setSelected: (val: string | null) => void;
}) {
  return (
    <div>
      <h3 className="text-gray-400 text-sm mb-4 uppercase font-semibold">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() =>
              selected === option ? setSelected(null) : setSelected(option)
            }
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selected === option
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-[#111] border-white/10 text-gray-400 hover:border-white/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
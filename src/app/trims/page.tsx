"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Heart,
  Gauge,
  Settings,
  IndianRupee,
  ChevronLeft,
} from "lucide-react";
import { useState, useMemo, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { VehicleCard } from "@/components/car/VehicleCard";
import { useTrimsSearch } from "@/hooks/trims/trims.hook";

/* ---------------------------------- */
/* Brand Mapping (Fix brandId issue)  */
/* ---------------------------------- */
const brandMap: Record<string, string> = {
  "693869fe2955c01e5bd23c9c": "Kia",
  "693869fe2955c01e5bd23c9d": "BMW",
  "693869fe2955c01e5bd23c9e": "Mercedes",
};

function TrimsPageContent() {
  const params = useSearchParams();
  const router = useRouter();
  const brandId = params.get("brand");
  const model = params.get("model");
  const modelId = params.get("modelId");

  const brandName = brandId ? brandMap[brandId] || brandId : "All Brands";

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);

  // Parse filters into API request format
  const queryParams = useMemo(() => {
    return {
      page: 1,
      limit: 20,
      search: search || undefined,
      brandIds: brandId ? [brandId] : undefined,
      modelIds: modelId ? [modelId] : undefined,
      fuelTypes: fuelType ? [fuelType.toLowerCase()] : undefined,
      bodyTypes: bodyType ? [bodyType.toLowerCase()] : undefined,
      transmission: transmission ? [transmission.toLowerCase()] : undefined,
      sort: sort === "newest" ? "createdAt" : undefined,
      isJustLaunched: sort === "newest" ? true : undefined,
    };
  }, [search, brandId, modelId, fuelType, bodyType, transmission, sort]);

  // Fetch trims via API
  const { data, isLoading, error } = useTrimsSearch(queryParams);

  const vehicles = data?.results || [];

  return (
    <div className="bg-black text-white min-h-screen relative">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>



        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Find Your Match</h1>
          <p className="text-gray-400 mt-2">
            {brandName} {model} Trims
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Loading vehicles..." : `${data?.total || 0} vehicles matching your preferences`}
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex items-center bg-[#111] border border-white/10 rounded-full px-4 py-3 flex-1">
            <Search size={18} className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search by make, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none ml-3 text-white w-full placeholder-gray-500 shadow-none focus-visible:ring-0 h-auto p-0"
            />
          </div>

          <Button
            onClick={() => setSort("newest")}
            variant={sort === "newest" ? "default" : "outline"}
            className={`px-6 py-3 rounded-full transition ${sort === "newest"
                ? "bg-blue-600 border-blue-600 hover:bg-blue-700"
                : "bg-[#111] border-white/10 hover:border-blue-500"
              }`}
          >
            Newest First
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-8 order-2 lg:order-1">
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

          {/* Vehicle Cards */}
          <div className="flex-1 order-1 lg:order-2">
            {error ? (
              <div className="text-center p-10 bg-[#111] rounded-2xl border border-red-500/20">
                <p className="text-red-400">Failed to load trims. Please try again later.</p>
              </div>
            ) : isLoading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3].map((skeleton) => (
                  <Card key={skeleton} className="bg-[#111] border border-white/10 rounded-2xl h-[350px] animate-pulse" />
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center p-10 bg-[#111] rounded-2xl border border-white/10">
                <p className="text-gray-400">No vehicles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.trimId || vehicle._id} vehicle={vehicle} />
                ))}

                {/* AI Card */}
                <Card className="border border-dashed border-white/20 rounded-2xl bg-transparent">
                  <CardContent className="flex flex-col items-center justify-center p-10 h-full text-center">
                    <SlidersHorizontal
                      size={28}
                      className="text-blue-500 mb-4"
                    />
                    <h3 className="text-lg font-semibold">
                      Not seeing the perfect fit?
                    </h3>
                    <p className="text-gray-400 mt-3 text-sm">
                      Let our AI build a custom configuration.
                    </p>
                    <Button className="mt-6 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 transition">
                      Start AI Configuration
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrimsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <TrimsPageContent />
    </Suspense>
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
          <Button
            key={option}
            variant={selected === option ? "default" : "outline"}
            onClick={() =>
              selected === option ? setSelected(null) : setSelected(option)
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selected === option
                ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                : "bg-[#111] border-white/10 text-gray-400 hover:border-white/30"
              }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
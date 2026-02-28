"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Users, Fuel, IndianRupee, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useBrands } from "@/hooks/useBrands";
import { useModels } from "@/hooks/useModels";
import { getModels } from "@/services/model.service";
import { Suspense } from "react";

interface ModelWithMock {
  _id: string;
  name: string;
  minPrice?: number;
  maxPrice?: number;
  fuelTypes?: string[];
  seatingCapacity?: number;
}

export default function BrandsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <BrandsPageContent />
    </Suspense>
  );
}

function BrandsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand") || "";

  const { allBrands, loadMore, page, totalPages, loadingAll } = useBrands();
  const { models: rawModels, loading: modelsLoading } =
    useModels(selectedBrand);

  const [search, setSearch] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ REAL COUNT STATE
  const [modelCounts, setModelCounts] = useState<Record<string, number>>({});
  const [countsLoading, setCountsLoading] = useState(false);

  // 🔥 Use SAME service as useModels
  useEffect(() => {
    const fetchCounts = async () => {
      if (!allBrands.length) return;

      setCountsLoading(true);

      const counts: Record<string, number> = {};

      await Promise.all(
        allBrands.map(async (brand) => {
          try {
            const data = await getModels({
              brandId: brand._id,
              page: 1,
              limit: 1, // we only need total
            });

            counts[brand._id] = data.total; // ✅ THIS IS THE FIX
          } catch {
            counts[brand._id] = 0;
          }
        })
      );

      setModelCounts(counts);
      setCountsLoading(false);
    };

    fetchCounts();
  }, [allBrands]);

  const filteredBrands = allBrands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedBrandData = allBrands.find(
    (brand) => brand._id === selectedBrand
  );

  const models: ModelWithMock[] = rawModels.map((model) => ({
    ...model,
    fuelTypes: model.fuelTypes || ["Petrol", "Diesel"],
    seatingCapacity: model.seatingCapacity || 5,
    minPrice: model.minPrice || 1200000,
    maxPrice: model.maxPrice || 1500000,
  }));

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !loadingAll) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [page, totalPages, loadingAll, loadMore]);

  const handleBrandClick = (brandId: string) => {
    router.push(`/brands?brand=${brandId}`);
  };

  const formatLakhs = (price: number) =>
    `₹${(price / 100000).toFixed(0)}L`;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-10">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6 space-y-8">

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <h2 className="text-gray-400 text-sm uppercase font-semibold">
            Select Brand
          </h2>

          <div className="flex items-center bg-[#111] border border-white/10 rounded-full px-4 py-3">
            <Search size={18} className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none ml-3 text-white w-full placeholder-gray-500 shadow-none focus-visible:ring-0 h-auto p-0"
            />
          </div>

          <div className="space-y-2 max-h-[40vh] lg:max-h-[70vh] overflow-y-auto pr-2">
            {filteredBrands.map((brand) => {
              const isSelected = selectedBrand === brand._id;

              return (
                <Button
                  key={brand._id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleBrandClick(brand._id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium
                  ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white font-semibold hover:bg-blue-700"
                      : "bg-[#111] border-white/10 text-gray-400 hover:border-blue-500/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logos/toyota.png"
                      alt={brand.name}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                    <span className="capitalize">{brand.name}</span>
                  </div>

                  {/* ✅ NOW MATCHES RIGHT SIDE */}
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {countsLoading
                      ? "..."
                      : modelCounts[brand._id] ?? 0}
                  </span>
                </Button>
              );
            })}
          </div>

          <div ref={observerRef} className="h-10" />
        </aside>

        {/* RIGHT SIDE */}
        <main className="flex-1 relative">
          {!selectedBrand && (
            <div className="h-40 lg:h-[60vh] flex items-center justify-center text-gray-500">
              Select a brand to view models
            </div>
          )}

          {selectedBrand && (
            <>
              <div className="mb-10 mt-8">
                <h1 className="text-4xl font-bold capitalize">
                  {selectedBrandData?.name}
                </h1>
                <p className="text-gray-400 mt-2">
                  {modelsLoading
                    ? "Loading cars..."
                    : `${models.length} Available Cars`}
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {models.map((model) => (
                  <div key={model._id}>
                    <Link
                      href={`/trims?brand=${selectedBrand}&model=${model.name}`}
                    >
                      <Card className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300">
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-blue-600 text-white border-transparent">
                            {model.name}
                          </Badge>
                        </div>

                        <img
                          src="/006.png"
                          alt="Model image"
                          className="h-full w-full object-cover"
                        />

                        <CardContent className=" space-y-3">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <IndianRupee className="w-4 h-4" />
                            <span>
                              From{" "}
                              <span className="text-white font-medium">
                                {formatLakhs(model.minPrice!)}
                              </span>{" "}
                              to{" "}
                              <span className="text-white font-medium">
                                {formatLakhs(model.maxPrice!)}
                              </span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Fuel className="w-4 h-4" />
                            <span>{model.fuelTypes?.join(", ")}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{model.seatingCapacity} Seater</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
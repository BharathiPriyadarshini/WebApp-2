"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { useBrands } from "@/hooks/useBrands";
import { useModels } from "@/hooks/useModels";

import { Suspense } from "react";

function BrandsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand") || "";

  const { allBrands, loadMore, page, totalPages, loadingAll } = useBrands();
  const { models, loading: modelsLoading } = useModels(selectedBrand);

  const [search, setSearch] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  /* ================= SEARCH ================= */
  const filteredBrands = allBrands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= INFINITE SCROLL ================= */
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

  /* ================= BRAND SELECT ================= */
  const handleBrandClick = (brandId: string) => {
    router.push(`/brands?brand=${brandId}`);
  };

  /* ================= PRICE FORMATTER ================= */
  const formatLakhs = (price: number) => {
    return `₹${(price / 100000).toFixed(0)}L`;
  };

  return (
    <div className="bg-black text-white min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6 space-y-8">
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
            {filteredBrands.map((brand) => (
              <Button
                key={brand._id}
                variant={selectedBrand === brand._id ? "default" : "outline"}
                onClick={() => handleBrandClick(brand._id)}
                className={`w-full justify-start px-4 py-3 rounded-full transition-all duration-300 capitalize text-sm font-medium
                ${selectedBrand === brand._id
                    ? "bg-blue-600 border-blue-600 text-white font-semibold hover:bg-blue-700"
                    : "bg-[#111] border-white/10 text-gray-400 hover:border-blue-500/40"
                  }`}
              >
                {brand.name}
              </Button>
            ))}
          </div>

          <div ref={observerRef} className="h-10" />
        </aside>

        {/* ================= RIGHT SIDE ================= */}
        <main className="flex-1">

          {!selectedBrand && (
            <div className="h-40 lg:h-[60vh] flex items-center justify-center text-gray-500">
              Select a brand to view models
            </div>
          )}

          {selectedBrand && (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-bold">Models</h1>
                <p className="text-gray-400 mt-2">Browse available models</p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {modelsLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-72 bg-[#111] border border-white/10 rounded-2xl animate-pulse"
                    />
                  ))
                  : models.map((model) => (
                    <div key={model._id}>
                      <Link
                        href={`/trims?brand=${selectedBrand}&model=${model.name}`}
                      >
                        <Card className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 py-0">

                          {/* IMAGE */}
                          <div className="h-44 bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                            <span className="text-xl font-semibold uppercase tracking-wider text-white/70">
                              {model.name}
                            </span>
                          </div>

                          {/* CONTENT */}
                          <CardContent className="p-6">
                            <div className="flex justify-between mb-4">
                              <Badge className="bg-blue-600 text-white border-transparent">
                                {model.name}
                              </Badge>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>

                            <h3 className="text-lg font-semibold">
                              {model.name}
                            </h3>

                            {/* PRICE RANGE */}
                            {model.minPrice != null && model.maxPrice != null && (
                              <p className="text-gray-400 mt-2">
                                {formatLakhs(model.minPrice)} –{" "}
                                {formatLakhs(model.maxPrice)}
                              </p>
                            )}

                            <Button className="mt-6 w-full bg-white text-black font-semibold hover:scale-105 hover:bg-white/90 transition">
                              View Models
                            </Button>
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

export default function BrandsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <BrandsPageContent />
    </Suspense>
  );
}
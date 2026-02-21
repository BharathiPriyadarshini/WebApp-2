"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBrands } from "@/hooks/useBrands";

/* ================= PAGE ================= */

export default function BrandsPage() {
  const {
    topBrands,
    allBrands,
    loadMore,
    loadingTop,
    loadingAll,
    page,
    totalPages,
    sortAZ,
    toggleSortAZ,
  } = useBrands();

  const [search, setSearch] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  /* ================= SEARCH FILTER ================= */
  const filteredBrands = allBrands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= INFINITE SCROLL ================= */
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          page < totalPages &&
          !loadingAll
        ) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, totalPages, loadingAll, loadMore]);

  return (
    <div className="pt-15 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-12 text-center">All Brands</h1>

        {/* ================= TOP BRANDS ================= */}
        <div className="grid md:grid-cols-4 gap-4 justify-items-center mb-16">
          {loadingTop
            ? Array.from({ length: 6 }).map((_, i) => (
                <BrandRowSkeleton key={i} />
              ))
            : topBrands.map((brand) => (
                <BrandCard
                  key={brand._id}
                  name={brand.name}
                  brandId={brand._id}
                />
              ))}
        </div>

        {/* ================= ALL BRANDS ================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-2xl font-semibold">All brands</h2>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search brands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-[#111] border-white/10"
                />
              </div>

              {/* Alphabetical Toggle */}
              <Button variant="link" onClick={toggleSortAZ}>
                View Alphabetical A–Z
              </Button>
            </div>
          </div>

          {/* Brands Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loadingAll && allBrands.length === 0
              ? Array.from({ length: 8 }).map((_, i) => (
                  <BrandRowSkeleton key={i} />
                ))
              : filteredBrands.map((brand) => (
                  <BrandRow
                    key={brand._id}
                    name={brand.name}
                    brandId={brand._id}
                  />
                ))}
          </div>

          {/* Manual Load More */}
          {page < totalPages && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                className="rounded-full px-8"
                onClick={loadMore}
                disabled={loadingAll}
              >
                {loadingAll ? "Loading..." : "Load 50 More Brands"}
              </Button>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          <div ref={observerRef} className="h-10" />
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

/* 🔥 Reduced Top Brand Card Height (~60% smaller vertically) */
function BrandCard({ name, brandId }: { name: string; brandId: string }) {
  return (
    <Link
      href={`/brands/${brandId}`}
      className="w-full max-w-[160px] py-3 px-4 bg-[#111] rounded-xl border border-white/10 hover:border-blue-500 hover:scale-105 transition duration-300 text-center capitalize cursor-pointer text-sm font-medium"
    >
      {name}
    </Link>
  );
}

function BrandRow({ name, brandId }: { name: string; brandId: string }) {
  return (
    <Link href={`/brands/${brandId}`}>
      <Card className="rounded-2xl p-5 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-4">
            <img src="/icon.svg" alt="brand logo" className="h-10 w-10" />
            <p className="font-medium capitalize">{name}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}

/* ================= SKELETON ================= */

function BrandRowSkeleton() {
  return (
    <Card className="rounded-2xl p-6 animate-pulse bg-muted h-20 w-full max-w-xs" />
  );
}
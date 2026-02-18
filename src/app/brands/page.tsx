"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

/* ================= MOCK DATA ================= */

const brands = ["toyota", "bmw", "mercedes", "tesla", "audi"];

const allBrands = [
  { name: "Audi", count: 23 },
  { name: "BMW", count: 15 },
  { name: "Mercedes", count: 20 },
  { name: "Tesla", count: 12 },
  { name: "Toyota", count: 25 },
];

/* ================= PAGE ================= */

export default function BrandsPage() {
  const [loading] = useState(false);

  return (
    <div className="pt-15 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-12 text-center">All Brands</h1>

        {/* ================= Brand Cards ================= */}
        <div className="grid md:grid-cols-4 gap-6 justify-items-center mb-16">
          {brands.map((brand) =>
            loading ? (
              <BrandRowSkeleton key={brand} />
            ) : (
              <BrandCard key={brand} name={brand} />
            )
          )}
        </div>

        {/* ================= All brands ================= */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">All brands</h2>
            <Button variant="link">View Alphabetical A–Z</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allBrands.map((brand) =>
              loading ? (
                <BrandRowSkeleton key={brand.name} />
              ) : (
                <BrandRow key={brand.name} {...brand} />
              )
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="rounded-full px-8">
              Load more brands
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function BrandCard({ name }: { name: string }) {
  const slug = name.toLowerCase();

  return (
    <Link
      href={`/brands/${slug}`}
      className="
        w-full max-w-xs
        p-8
        bg-[#111]
        rounded-2xl
        border border-white/10
        hover:border-blue-500
        hover:scale-105
        transition
        duration-300
        text-center
        capitalize
        cursor-pointer
      "
    >
      {name}
    </Link>
  );
}

function BrandRow({ name, count }: { name: string; count: number }) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/brands/${slug}`}>
      <Card className="
        rounded-2xl
        p-5
        group
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      ">
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-4">
            <img src="/icon.svg" alt="brand logo" className="h-10 w-10" />
            <div>
              <p className="font-medium capitalize">{name}</p>
              <p className="text-xs text-muted-foreground">
                {count} available cars
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}

/* ================= SKELETONS ================= */

function BrandRowSkeleton() {
  return (
    <Card className="rounded-2xl p-6 animate-pulse bg-muted h-20 w-full max-w-xs" />
  );
}

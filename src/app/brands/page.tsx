"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useBrands } from "@/hooks/useBrands";
import { useModels } from "@/hooks/useModels";

/* ================= ANIMATION CONFIG ================= */
/* 🔥 You can tweak animations from here */
const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // 👈 change for faster/slower stagger
    },
  },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 100 }, // 👈 increase y for more dramatic entry
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1, // 👈 speed of animation
      ease: "easeOut",
    },
  },
};

/* ================= PAGE ================= */

export default function BrandsPage() {
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
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-64 border-r border-white/10 pr-6 space-y-6">
          <h2 className="text-xs uppercase tracking-widest text-white/50">
            Select Brand
          </h2>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[#111] border-white/10 text-white"
            />
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {filteredBrands.map((brand) => (
              <button
                key={brand._id}
                onClick={() => handleBrandClick(brand._id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 capitalize
                ${
                  selectedBrand === brand._id
                    ? "bg-white text-black font-semibold"
                    : "bg-[#111] hover:bg-white/10"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div ref={observerRef} className="h-10" />
        </aside>

        {/* ================= RIGHT SIDE ================= */}
        <main className="flex-1">

          {!selectedBrand && (
            <div className="h-[60vh] flex items-center justify-center text-white/40">
              Select a brand to view models
            </div>
          )}

          {selectedBrand && (
            <>
              <h1 className="text-4xl font-bold mb-10 tracking-tight">
                Models
              </h1>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBrand}
                  variants={containerAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {modelsLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-72 bg-[#111] rounded-2xl animate-pulse"
                        />
                      ))
                    : models.map((model) => (
                        <motion.div
                          key={model._id}
                          variants={cardAnimation}
                          whileHover={{
                            scale: 1.05, // 👈 hover zoom strength
                          }}
                        >
                          <Link
                            href={`/trims?brand=${selectedBrand}&model=${model.name}`}
                          >
                            <Card className="overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/10 hover:border-white transition-all duration-300 shadow-xl hover:shadow-white/10">

                              {/* IMAGE */}
                              <div className="h-44 bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center">
                                <span className="text-xl font-semibold uppercase tracking-wider text-white/70">
                                  {model.name}
                                </span>
                              </div>

                              {/* CONTENT */}
                              <div className="p-6 space-y-3">
                                <h3 className="text-lg font-semibold uppercase">
                                  {model.name}
                                </h3>

                                {/* 🔥 PRICE RANGE */}
                                <p className="text-white/60 text-sm">
                                  {formatLakhs(model.minPrice)} –{" "}
                                  {formatLakhs(model.maxPrice)}
                                </p>

                                <div className="flex justify-end pt-2">
                                  <ChevronRight className="h-4 w-4 text-white/40" />
                                </div>
                              </div>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

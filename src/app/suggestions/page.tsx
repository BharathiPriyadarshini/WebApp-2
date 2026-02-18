"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import { useAuthStore } from "@/store/auth.store";
import { cars } from "@/data/mockCars";

export default function SuggestionsPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Please login to continue
          </h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto py-16">
        <h1 className="text-4xl font-bold mb-10">
          Suggested For You
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white/5 border border-white/10 p-6 rounded-xl"
            >
              {car.brand} {car.model}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

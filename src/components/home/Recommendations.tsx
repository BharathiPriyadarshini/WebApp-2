"use client";

import { cars } from "@/data/mockCars";

export default function Recommendations() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-10">
        Recommended For You
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {cars.slice(0, 3).map((car) => (
          <div
            key={car.id}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <h3>
              {car.brand} {car.model}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

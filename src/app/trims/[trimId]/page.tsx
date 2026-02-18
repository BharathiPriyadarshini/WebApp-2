"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function TrimDetailsPage() {
  const { trimId } = useParams();
  const params = useSearchParams();

  const brand = params.get("brand");
  const model = params.get("model");

  return (
    <div className="pt-32 bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">
          {brand} {model} {trimId}
        </h1>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-10">
          <p>Engine: 3.0L Turbo</p>
          <p>Horsepower: 500 HP</p>
          <p>Price: $85,000</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const modelsData: Record<string, string[]> = {
  toyota: ["supra", "camry"],
  bmw: ["m3", "m4"],
  mercedes: ["c63", "gle"],
  tesla: ["model3", "modelx"],
  audi: ["rs7", "a6"],
};

export default function BrandModelsPage() {
  const { brandId } = useParams();

  const models = modelsData[brandId as string] || [];

  return (
    <div className="pt-32 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-10 capitalize">
          {brandId} Models
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => (
            <Link
              key={model}
              href={`/models/${model}?brand=${brandId}`}
              className="p-8 bg-[#111] rounded-2xl border border-white/10 hover:border-blue-500 transition uppercase"
            >
              {model}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ModelDetailsPage() {
  const { modelId } = useParams();
  const params = useSearchParams();
  const brand = params.get("brand");

  return (
    <div className="pt-32 bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6 uppercase">
          {brand} {modelId}
        </h1>

        <Link
          href={`/trims?brand=${brand}&model=${modelId}`}
          className="px-6 py-3 bg-blue-600 rounded-lg"
        >
          View Trims
        </Link>
      </div>
    </div>
  );
}

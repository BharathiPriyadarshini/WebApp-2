import Link from "next/link";

const brands = ["toyota", "bmw", "mercedes", "tesla", "audi"];

export default function BrandsPage() {
  return (
    <div className="pt-32 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-10">All Brands</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/brands/${brand}`}
              className="p-8 bg-[#111] rounded-2xl border border-white/10 hover:border-blue-500 transition capitalize"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

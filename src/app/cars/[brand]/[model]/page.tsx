import { notFound } from "next/navigation";
import { getCarByBrandAndModel } from "@/services/car.service";
import PageWrapper from "@/components/layout/PageWrapper";

interface Props {
  params: Promise<{
    brand: string;
    model: string;
  }>;
}

export default async function CarDetailPage({ params }: Props) {
  const { brand, model } = await params;

  const car = await getCarByBrandAndModel(brand, model);

  if (!car) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto py-16">
        
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-400 mt-4">
            {car.description}
          </p>
        </div>

        {/* Car Info Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Left Side */}
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                ₹ {car.price.toLocaleString()}
              </h2>

              <div className="space-y-3 text-gray-400">
                <p>Type: {car.type}</p>
                <p>Brand: {car.brand}</p>
              </div>

              <button className="mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
                Book Test Drive
              </button>
            </div>

            {/* Right Side Placeholder for Image */}
            <div className="bg-white/10 rounded-xl h-72 flex items-center justify-center">
              Car Image
            </div>

          </div>
        </div>

      </div>
    </PageWrapper>
  );
}

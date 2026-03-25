import Image from "next/image";
import Link from "next/link";
import { Heart, Gauge, Settings, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TrimSearchResult, VehicleImage } from "@/hooks/trims/trims.api-types";
import { useVehicleImagesByModel } from "@/hooks/trims/trims.hook";

interface VehicleCardProps {
  vehicle: TrimSearchResult;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  // Fetch only the primary image for this specific model - logic as per Sir's instruction
  const { data: modelImageData } = useVehicleImagesByModel(vehicle.modelId, true);

  // Try to safely access price - handling the { exShowroom: number } structure
  const displayPrice = typeof vehicle.price === 'number' 
    ? vehicle.price 
    : (vehicle.price as any)?.exShowroom ?? 0;

  // Find image URL logic: 
  // Get the first result from the primary-filtered API response, 
  // or fall back through other available fields.
  const apiImages = (modelImageData as any)?.results || [];
  const primaryImage = apiImages[0]?.url;

  const imageUrl = 
    primaryImage ||
    vehicle.vehicleImage?.url || 
    vehicle.image || 
    (vehicle.colors && vehicle.colors.length > 0 ? vehicle.colors[0].imageUrl : null) ||
    "/006.png";

  // Attempt to derive model/brand name if they are missing
  const modelDisplay = vehicle.modelName || vehicle.model?.name || "Premium car";
  const brandDisplay = vehicle.brandName || vehicle.brand?.name || "";

  return (
    <Card className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 py-0 relative">
      {/* Badge */}
      <Badge className="absolute top-4 left-4 bg-blue-600 text-white border-transparent z-10">
        {modelDisplay}
      </Badge>

      {/* Favorite Icon */}
      <Heart
        size={18}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition cursor-pointer z-10"
      />

      {/* Full Width Image */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={imageUrl}
          alt={vehicle.name}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/alt.png";
          }}
        />
      </div>

      {/* Content */}
      <CardContent className="p-4 pt-2">
        <h3 className="text-lg font-semibold truncate">{vehicle.name}</h3>

        <div className="flex items-center justify-between mt-1">
          <p className="text-gray-400 flex items-center gap-1 font-medium">
            <IndianRupee size={14} />
            {displayPrice > 0 ? displayPrice.toLocaleString("en-IN") : "Ask for Price"}
          </p>
          {brandDisplay && <span className="text-[10px] text-white/30 uppercase tracking-tighter">{brandDisplay}</span>}
        </div>

        <div className="flex items-center gap-6 mt-3 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-blue-500/60" />
            {vehicle.horsepower || "N/A"} HP
          </div>
          <div className="flex items-center gap-2 capitalize">
            <Settings size={16} className="text-blue-500/60" />
            {vehicle.transmission || (vehicle.isAutomatic ? "Automatic" : "Manual")}
          </div>
        </div>

        <Button
          asChild
          className="mt-4 w-full bg-white text-black font-semibold hover:scale-[1.02] hover:bg-white/90 transition-all active:scale-95"
        >
          <Link href={`/trims/${vehicle.trimId || vehicle._id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

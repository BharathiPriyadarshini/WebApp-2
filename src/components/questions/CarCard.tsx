import { CarRecommendation } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Car, Fuel, Gauge, Calendar, Settings, ChevronRight } from "lucide-react";

interface CarCardProps {
  car: CarRecommendation;
}

// Common car property keys to display with icons and priority
const propertyConfig: Record<string, { icon: React.ReactNode; label: string; priority: number }> = {
  trim: { icon: <Settings className="w-4 h-4" />, label: "Trim", priority: 1 },
  fuelType: { icon: <Fuel className="w-4 h-4" />, label: "Fuel", priority: 2 },
  fuel_type: { icon: <Fuel className="w-4 h-4" />, label: "Fuel", priority: 2 },
  transmission: { icon: <Car className="w-4 h-4" />, label: "Transmission", priority: 3 },
  cc: { icon: <Gauge className="w-4 h-4" />, label: "Engine CC", priority: 4 },
  year: { icon: <Calendar className="w-4 h-4" />, label: "Year", priority: 5 },
  mileage: { icon: <Gauge className="w-4 h-4" />, label: "Mileage", priority: 6 },
};

// Format transmission type for display
function formatTransmission(value: string): string {
  const map: Record<string, string> = {
    amt: "AMT",
    manual: "Manual",
    automatic: "Automatic",
    tc: "TC",
    dual_clutch: "Dual Clutch",
    cvt: "CVT",
  };
  return map[value?.toLowerCase()] || value;
}

// Format fuel type for display
function formatFuelType(value: string): string {
  const map: Record<string, string> = {
    petrol: "Petrol",
    diesel: "Diesel",
    electric: "Electric",
    cng: "CNG",
    hybrid: "Hybrid",
  };
  return map[value?.toLowerCase()] || value;
}

export default function CarCard({ car }: CarCardProps) {
  const make = car.make || car.brand || "Unknown";
  const model = car.model || "";
  const trim = car.trim || "";
  const price = (car.price || car.ex_showroom_price || car.on_road_price || 0) as number;
  
  // Filter and sort properties for display
  const hiddenKeys = ["make", "model", "brand", "trim", "_id", "id", "image", "imageUrl", "price", "ex_showroom_price", "on_road_price"];
  const displayProps = Object.entries(car)
    .filter(([key, value]) => !hiddenKeys.includes(key) && value !== null && value !== undefined && value !== 0 && value !== "")
    .sort((a, b) => {
      const priorityA = propertyConfig[a[0]]?.priority || 99;
      const priorityB = propertyConfig[b[0]]?.priority || 99;
      return priorityA - priorityB;
    });

  // Format value based on key
  const formatValue = (key: string, value: unknown): string => {
    if (key === "transmission") return formatTransmission(String(value));
    if (key === "fuelType" || key === "fuel_type") return formatFuelType(String(value));
    if (key === "cc" && typeof value === "number") return `${value} cc`;
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  return (
    <Card className="group glass border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden hover:glow-primary">
      {/* Image Placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-muted via-muted/80 to-muted/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Car className="w-8 h-8 text-primary/60" />
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Price badge */}
        {price > 0 && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-primary/90 text-primary-foreground text-sm font-bold backdrop-blur-sm">
            ₹{price.toLocaleString("en-IN")}
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-4">
        <h3 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
          {make} {model}
        </h3>
        {trim && (
          <p className="text-sm text-muted-foreground">{trim}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Key Specs - show up to 4 */}
        {displayProps.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {displayProps.slice(0, 4).map(([key, value]) => {
              const config = propertyConfig[key];
              const displayValue = formatValue(key, value);
              
              return (
                <div 
                  key={key} 
                  className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm"
                >
                  <span className="text-muted-foreground flex-shrink-0">
                    {config?.icon || <span className="w-4 h-4 flex items-center justify-center text-xs">•</span>}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground capitalize">
                      {config?.label || key.replace(/_/g, " ")}
                    </p>
                    <p className="font-medium truncate capitalize">{displayValue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Additional properties (collapsed) */}
        {displayProps.length > 4 && (
          <details className="group/details">
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none flex items-center gap-1">
              <ChevronRight className="w-3 h-3 transition-transform group-open/details:rotate-90" />
              {displayProps.length - 4} more specs
            </summary>
            <div className="mt-2 space-y-1 pt-2 border-t border-border">
              {displayProps.slice(4).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm py-1">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="font-medium text-right capitalize">
                    {formatValue(key, value)}
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
          >
            View Details
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-primary to-primary/80"
          >
            Contact Dealer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

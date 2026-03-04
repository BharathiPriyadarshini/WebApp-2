import { Button } from '@/components/ui/Button';

export default function StickyCTA({ car }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <p className="text-xs text-gray-500">Price Starts From</p>
          <p className="text-2xl font-bold">{car.priceLabel}</p>
        </div>
        <Button className="bg-blue-600">Book Now</Button>
      </div>
    </div>
  );
}
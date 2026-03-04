'use client';

import { ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HeroSection({
  car,
  router,
  selectedColor,
  setSelectedColor,
}: any) {
  return (
    <section className="pt-16 pb-8 bg-[#0F172A] text-white relative">
      <div className="container mx-auto px-4 flex flex-col items-center">

        <nav className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        </nav>

        <h1 className="text-2xl font-bold mt-6">
          {car.brand} {car.model}
        </h1>

        <div className="flex gap-3 mt-4">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span>{car.rating}</span>
        </div>

        <div className="flex gap-3 mt-6">
          {car.colors.map((color: string) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`h-8 w-8 rounded-full ${
                selectedColor === color ? 'scale-110 border-2 border-white' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
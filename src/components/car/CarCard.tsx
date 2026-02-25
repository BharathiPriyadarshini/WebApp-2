'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Settings2, Fuel, Car as CarIcon } from 'lucide-react';
import {
  TataLogo,
  HyundaiLogo,
  SuzukiLogo,
  KiaLogo,
  MahindraLogo,
  HondaLogo,
  ToyotaLogo,
  SkodaLogo,
} from "@/components/BrandLogos";

export interface Car {
  id: string | number;
  brand: string;
  model: string;
  bodyType: string;
  fuel: string;
  price: number;
  priceLabel: string;
  mileage: string;
  seating: number;
  useCase: string[];
  rating: number;
  image: string;
  isTopMatch?: boolean;
}

const CarImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      unoptimized
      className={`object-cover transition-transform duration-500 group-hover:scale-105 ${className || ''
        }`}
      onError={() => setImgSrc("/alt.png")}
    />
  );
};

const getBrandLogo = (brand?: string) => {
  if (!brand) return <CarIcon size={20} className="text-gray-500" />;

  if (brand.includes('Tata')) return <TataLogo size={20} />;
  if (brand.includes('Hyundai')) return <HyundaiLogo size={20} />;
  if (brand.includes('Suzuki')) return <SuzukiLogo size={20} />;
  if (brand.includes('Kia')) return <KiaLogo size={20} />;
  if (brand.includes('Mahindra')) return <MahindraLogo size={20} />;
  if (brand.includes('Honda')) return <HondaLogo size={20} />;
  if (brand.includes('Toyota')) return <ToyotaLogo size={20} />;
  if (brand.includes('Skoda')) return <SkodaLogo size={20} />;

  return <CarIcon size={20} className="text-gray-500" />;
};

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.brand}/${car.model}`}
      className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border relative flex flex-col p-4 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        {car.isTopMatch ? (
          <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-sm">
            Top Match
          </span>
        ) : <div />}

        <Heart className="h-6 w-6 text-gray-300 hover:text-red-500" />
      </div>

      <div className="w-full h-40 relative mb-6 flex items-center justify-center">
        <CarImage
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-2 text-gray-400">
          {getBrandLogo(car.brand)}
        </div>

        <h3 className="text-xl font-bold mb-2">
          {car.brand} {car.model}
        </h3>

        <p className="text-sm mb-4">
          Price Starts <span className="font-bold">{car.priceLabel}</span>
        </p>

        <div className="flex gap-2 text-sm text-gray-400">
          <span>{car.bodyType}</span>
          <span>|</span>
          <span>{car.fuel}</span>
        </div>
      </div>
    </Link>
  );
}

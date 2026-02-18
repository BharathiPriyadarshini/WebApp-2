import { Car } from "@/types/car";

export const cars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Fortuner",
    type: "SUV",
    price: 4200000,
    image: "/cars/fortuner.jpg",
    description: "Premium SUV with powerful engine",
    isHot: true,
  },
  {
    id: "2",
    brand: "BMW",
    model: "X5",
    type: "SUV",
    price: 8500000,
    image: "/cars/x5.jpg",
    description: "Luxury German SUV",
  },
];

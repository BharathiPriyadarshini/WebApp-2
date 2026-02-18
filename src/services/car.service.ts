import { cars } from "@/data/mockCars";
import { Car } from "@/types/car";

export const getAllCars = async (): Promise<Car[]> => {
  return cars;
};

export const getCarsByBrand = async (
  brand: string
): Promise<Car[]> => {
  return cars.filter(
    (car: Car) =>
      car.brand.toLowerCase() === brand.toLowerCase()
  );
};

export const getCarByBrandAndModel = async (
  brand: string,
  model: string
): Promise<Car | undefined> => {
  return cars.find(
    (car: Car) =>
      car.brand.toLowerCase() === brand.toLowerCase() &&
      car.model.toLowerCase() === model.toLowerCase()
  );
};

export interface Car {
  id: string;
  brand: string;
  model: string;
  type: "SUV" | "Sedan" | "Hatchback" | "Electric";
  price: number;
  image: string;
  description: string;
  isHot?: boolean;
}

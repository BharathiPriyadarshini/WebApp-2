"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  Plus,
  X,
  Gauge,
  BatteryFull,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Fuel,
  Users,
  IndianRupee,
  Star,
  Zap,
  Wind,
  Award,
  BarChart3,
  Check,
  Minus,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
interface Car {
  id: number;
  brand: string;
  model: string;
  variant: string;
  category: string;
  image: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviews: number;
  specs: {
    engine: string;
    displacement: string;
    power: string;
    torque: string;
    transmission: string;
    drivetrain: string;
    fuelType: string;
    fuelTank: string;
    mileage: string;
    range: string;
    acceleration: string;
    topSpeed: string;
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    groundClearance: string;
    bootSpace: string;
    seating: number;
    tyreSize: string;
    brakes: string;
    suspensionFront: string;
    suspensionRear: string;
    safetyRating: string;
    airbags: number;
    abs: boolean;
    esp: boolean;
    hillAssist: boolean;
    cruiseControl: boolean;
    parkingSensors: boolean;
    camera: boolean;
    sunroof: boolean;
    ventilatedSeats: boolean;
    wirelessCharging: boolean;
    appleCarPlay: boolean;
    androidAuto: boolean;
    screenSize: string;
    speakers: number;
    warrantyYears: number;
    warrantyKm: string;
    maintenanceCost: string;
    resaleValue: string;
    safetyScore: number;
    valueScore: number;
    performanceScore: number;
    comfortScore: number;
  };
}

const carDatabase: Car[] = [
  {
    id: 1,
    brand: "Rimello",
    model: "X5",
    variant: "Signature Diesel 7-Seater",
    category: "SUV",
    image: "/006.png",
    priceMin: 1200000,
    priceMax: 1700000,
    rating: 4.3,
    reviews: 2841,
    specs: {
      engine: "2.0L Turbocharged Diesel",
      displacement: "1997 cc",
      power: "170 bhp",
      torque: "350 Nm",
      transmission: "6-Speed Automatic",
      drivetrain: "4WD",
      fuelType: "Diesel",
      fuelTank: "60 L",
      mileage: "18.2 km/L",
      range: "1092 km",
      acceleration: "9.8s",
      topSpeed: "185 km/h",
      length: "4695 mm",
      width: "1855 mm",
      height: "1710 mm",
      wheelbase: "2750 mm",
      groundClearance: "210 mm",
      bootSpace: "720 L",
      seating: 7,
      tyreSize: "235/65 R17",
      brakes: "Disc (F) / Disc (R)",
      suspensionFront: "MacPherson Strut",
      suspensionRear: "Multi-Link",
      safetyRating: "5-Star NCAP",
      airbags: 6,
      abs: true,
      esp: true,
      hillAssist: true,
      cruiseControl: true,
      parkingSensors: true,
      camera: true,
      sunroof: true,
      ventilatedSeats: true,
      wirelessCharging: true,
      appleCarPlay: true,
      androidAuto: true,
      screenSize: "10.25\"",
      speakers: 8,
      warrantyYears: 3,
      warrantyKm: "1,00,000 km",
      maintenanceCost: "₹ 18,000 / yr",
      resaleValue: "62%",
      safetyScore: 86,
      valueScore: 78,
      performanceScore: 72,
      comfortScore: 84,
    },
  },
  {
    id: 2,
    brand: "Rimello",
    model: "S7",
    variant: "Elite Petrol AWD",
    category: "SUV",
    image: "/006.png",
    priceMin: 2200000,
    priceMax: 2900000,
    rating: 4.7,
    reviews: 1629,
    specs: {
      engine: "2.0L Turbocharged Petrol",
      displacement: "1984 cc",
      power: "245 bhp",
      torque: "370 Nm",
      transmission: "7-Speed DCT",
      drivetrain: "AWD",
      fuelType: "Petrol",
      fuelTank: "65 L",
      mileage: "13.5 km/L",
      range: "877 km",
      acceleration: "6.2s",
      topSpeed: "230 km/h",
      length: "4780 mm",
      width: "1920 mm",
      height: "1680 mm",
      wheelbase: "2810 mm",
      groundClearance: "190 mm",
      bootSpace: "650 L",
      seating: 5,
      tyreSize: "255/50 R18",
      brakes: "Disc (F) / Disc (R)",
      suspensionFront: "Double Wishbone",
      suspensionRear: "Multi-Link Air",
      safetyRating: "5-Star NCAP",
      airbags: 9,
      abs: true,
      esp: true,
      hillAssist: true,
      cruiseControl: true,
      parkingSensors: true,
      camera: true,
      sunroof: true,
      ventilatedSeats: true,
      wirelessCharging: true,
      appleCarPlay: true,
      androidAuto: true,
      screenSize: "12.3\"",
      speakers: 12,
      warrantyYears: 4,
      warrantyKm: "1,00,000 km",
      maintenanceCost: "₹ 24,000 / yr",
      resaleValue: "71%",
      safetyScore: 94,
      valueScore: 71,
      performanceScore: 91,
      comfortScore: 95,
    },
  },
  {
    id: 3,
    brand: "Rimello",
    model: "E5 EV",
    variant: "Long Range Electric",
    category: "Electric",
    image: "/006.png",
    priceMin: 2500000,
    priceMax: 3200000,
    rating: 4.5,
    reviews: 987,
    specs: {
      engine: "Dual Motor Electric",
      displacement: "N/A",
      power: "320 bhp",
      torque: "430 Nm",
      transmission: "Single Speed Auto",
      drivetrain: "AWD",
      fuelType: "Electric",
      fuelTank: "82 kWh Battery",
      mileage: "N/A",
      range: "516 km",
      acceleration: "4.2s",
      topSpeed: "220 km/h",
      length: "4694 mm",
      width: "1878 mm",
      height: "1627 mm",
      wheelbase: "2890 mm",
      groundClearance: "166 mm",
      bootSpace: "800 L",
      seating: 5,
      tyreSize: "245/45 R20",
      brakes: "Disc (F) / Disc (R) + Regenerative",
      suspensionFront: "Double Wishbone",
      suspensionRear: "Multi-Link",
      safetyRating: "5-Star NCAP",
      airbags: 7,
      abs: true,
      esp: true,
      hillAssist: true,
      cruiseControl: true,
      parkingSensors: true,
      camera: true,
      sunroof: true,
      ventilatedSeats: true,
      wirelessCharging: true,
      appleCarPlay: true,
      androidAuto: true,
      screenSize: "15.4\"",
      speakers: 14,
      warrantyYears: 8,
      warrantyKm: "1,60,000 km",
      maintenanceCost: "₹ 9,000 / yr",
      resaleValue: "68%",
      safetyScore: 91,
      valueScore: 82,
      performanceScore: 96,
      comfortScore: 93,
    },
  },
  {
    id: 4,
    brand: "Rimello",
    model: "X1",
    variant: "Active Petrol",
    category: "Sub Compact SUV",
    image: "/006.png",
    priceMin: 650000,
    priceMax: 920000,
    rating: 4.1,
    reviews: 5210,
    specs: {
      engine: "1.2L Naturally Aspirated",
      displacement: "1197 cc",
      power: "82 bhp",
      torque: "113 Nm",
      transmission: "5-Speed Manual",
      drivetrain: "FWD",
      fuelType: "Petrol",
      fuelTank: "37 L",
      mileage: "17.8 km/L",
      range: "659 km",
      acceleration: "13.6s",
      topSpeed: "155 km/h",
      length: "3995 mm",
      width: "1735 mm",
      height: "1600 mm",
      wheelbase: "2500 mm",
      groundClearance: "185 mm",
      bootSpace: "320 L",
      seating: 5,
      tyreSize: "195/60 R15",
      brakes: "Disc (F) / Drum (R)",
      suspensionFront: "MacPherson Strut",
      suspensionRear: "Torsion Beam",
      safetyRating: "4-Star NCAP",
      airbags: 2,
      abs: true,
      esp: false,
      hillAssist: false,
      cruiseControl: false,
      parkingSensors: true,
      camera: false,
      sunroof: false,
      ventilatedSeats: false,
      wirelessCharging: false,
      appleCarPlay: true,
      androidAuto: true,
      screenSize: "8\"",
      speakers: 4,
      warrantyYears: 2,
      warrantyKm: "75,000 km",
      maintenanceCost: "₹ 9,500 / yr",
      resaleValue: "58%",
      safetyScore: 74,
      valueScore: 88,
      performanceScore: 52,
      comfortScore: 65,
    },
  },
  {
    id: 5,
    brand: "Rimello",
    model: "S9",
    variant: "Luxury Petrol Sedan",
    category: "Sedan",
    image: "/006.png",
    priceMin: 3000000,
    priceMax: 3800000,
    rating: 4.8,
    reviews: 412,
    specs: {
      engine: "3.0L Inline-6 Turbocharged",
      displacement: "2998 cc",
      power: "340 bhp",
      torque: "450 Nm",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      fuelType: "Petrol",
      fuelTank: "70 L",
      mileage: "11.2 km/L",
      range: "784 km",
      acceleration: "4.8s",
      topSpeed: "250 km/h",
      length: "5060 mm",
      width: "1900 mm",
      height: "1460 mm",
      wheelbase: "3010 mm",
      groundClearance: "145 mm",
      bootSpace: "530 L",
      seating: 5,
      tyreSize: "275/40 R19",
      brakes: "Brembo Disc (F+R)",
      suspensionFront: "Double Wishbone Active",
      suspensionRear: "Multi-Link Active Air",
      safetyRating: "5-Star NCAP",
      airbags: 10,
      abs: true,
      esp: true,
      hillAssist: true,
      cruiseControl: true,
      parkingSensors: true,
      camera: true,
      sunroof: true,
      ventilatedSeats: true,
      wirelessCharging: true,
      appleCarPlay: true,
      androidAuto: true,
      screenSize: "14.9\"",
      speakers: 16,
      warrantyYears: 4,
      warrantyKm: "1,00,000 km",
      maintenanceCost: "₹ 38,000 / yr",
      resaleValue: "65%",
      safetyScore: 97,
      valueScore: 68,
      performanceScore: 98,
      comfortScore: 99,
    },
  },
];

const scoreCategories = [
  { key: "performanceScore", label: "Performance", icon: Gauge },
  { key: "safetyScore",     label: "Safety",      icon: ShieldCheck },
  { key: "comfortScore",    label: "Comfort",      icon: Wind },
  { key: "valueScore",      label: "Value",        icon: Award },
] as const;

const specSections = [
  {
    title: "Engine & Performance",
    icon: Gauge,
    rows: [
      { key: "engine",         label: "Engine" },
      { key: "displacement",   label: "Displacement" },
      { key: "power",          label: "Max Power" },
      { key: "torque",         label: "Peak Torque" },
      { key: "transmission",   label: "Transmission" },
      { key: "drivetrain",     label: "Drivetrain" },
      { key: "acceleration",   label: "0 – 100 km/h" },
      { key: "topSpeed",       label: "Top Speed" },
    ],
  },
  {
    title: "Fuel & Efficiency",
    icon: Fuel,
    rows: [
      { key: "fuelType",   label: "Fuel Type" },
      { key: "fuelTank",   label: "Tank / Battery" },
      { key: "mileage",    label: "Mileage" },
      { key: "range",      label: "Range" },
    ],
  },
  {
    title: "Dimensions",
    icon: BarChart3,
    rows: [
      { key: "length",          label: "Length" },
      { key: "width",           label: "Width" },
      { key: "height",          label: "Height" },
      { key: "wheelbase",       label: "Wheelbase" },
      { key: "groundClearance", label: "Ground Clearance" },
      { key: "bootSpace",       label: "Boot Space" },
      { key: "seating",         label: "Seating" },
    ],
  },
  {
    title: "Safety",
    icon: ShieldCheck,
    rows: [
      { key: "safetyRating", label: "Safety Rating" },
      { key: "airbags",      label: "Airbags" },
    ],
  },
  {
    title: "Technology & Comfort",
    icon: Zap,
    rows: [
      { key: "screenSize",  label: "Infotainment Screen" },
      { key: "speakers",    label: "Speakers" },
    ],
  },
  {
    title: "Ownership",
    icon: TrendingUp,
    rows: [
      { key: "warrantyYears",    label: "Warranty" },
      { key: "warrantyKm",       label: "Warranty Distance" },
      { key: "maintenanceCost",  label: "Avg Maintenance" },
      { key: "resaleValue",      label: "Resale Value (3yr)" },
    ],
  },
];

const featureRows = [
  { key: "abs",               label: "ABS" },
  { key: "esp",               label: "Electronic Stability" },
  { key: "hillAssist",        label: "Hill Start Assist" },
  { key: "cruiseControl",     label: "Cruise Control" },
  { key: "parkingSensors",    label: "Parking Sensors" },
  { key: "camera",            label: "Reverse Camera" },
  { key: "sunroof",           label: "Sunroof / Panoramic" },
  { key: "ventilatedSeats",   label: "Ventilated Seats" },
  { key: "wirelessCharging",  label: "Wireless Charging" },
  { key: "appleCarPlay",      label: "Apple CarPlay" },
  { key: "androidAuto",       label: "Android Auto" },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function formatPrice(n: number) {
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(1)} L`;
  return `₹ ${n.toLocaleString()}`;
}

function getWinner(cars: (Car | null)[], key: keyof Car["specs"]): number | null {
  const filled = cars.filter(Boolean) as Car[];
  if (filled.length < 2) return null;
  const higherIsBetter = !["maintenanceCost", "acceleration"].includes(key as string);

  const numericVals = filled.map((c) => {
    const raw = String(c.specs[key]).replace(/[^0-9.]/g, "");
    return parseFloat(raw) || 0;
  });

  const best = higherIsBetter ? Math.max(...numericVals) : Math.min(...numericVals);
  const winIdx = numericVals.indexOf(best);
  // only mark winner if values differ
  if (numericVals.every((v) => v === numericVals[0])) return null;
  return winIdx;
}

/* ─── Animated score arc ── */
function ScoreArc({ score, label, Icon, inView }: { score: number; label: string; Icon: React.ElementType; inView: boolean }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = inView ? circ * (score / 100) : 0;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" width="64" height="64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <motion.circle
            cx="32" cy="32" r={r}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </svg>
        <Icon size={16} className="text-blue-400" strokeWidth={1.5} />
      </div>
      <span className="text-white font-bold text-sm">{score}</span>
      <span className="text-gray-600 text-[10px] uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ─── Car selector slot ── */
function CarSlot({
  car,
  slot,
  onSelect,
  onRemove,
  allCars,
  usedIds,
}: {
  car: Car | null;
  slot: number;
  onSelect: (c: Car) => void;
  onRemove: () => void;
  allCars: Car[];
  usedIds: number[];
}) {
  const [open, setOpen] = useState(false);
  const accent = slot === 0 ? "border-white/20" : "border-blue-500/40";
  const label  = slot === 0 ? "Car A" : "Car B";

  return (
    <div className="flex-1 min-w-0">
      {car ? (
        <div className={`relative rounded-2xl border ${accent} bg-[#0d0d0d] overflow-hidden`}>
          {/* remove */}
          <button
            onClick={onRemove}
            className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/70 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition"
          >
            <X size={13} />
          </button>

          {/* image */}
          <div className="relative h-44 bg-[#111] overflow-hidden">
            <Image src={car.image} alt={car.model} fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-transparent to-transparent" />
            {/* slot label */}
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${slot === 0 ? "bg-white/10 text-white" : "bg-blue-600 text-white"}`}>
              {label}
            </span>
          </div>

          {/* info */}
          <div className="px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold">{car.brand}</p>
            <h3 className="text-white font-bold text-xl leading-tight mt-0.5">{car.model}</h3>
            <p className="text-gray-500 text-xs mt-1">{car.variant}</p>

            <div className="flex items-center gap-1.5 mt-3">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-white text-sm font-semibold">{car.rating}</span>
              <span className="text-gray-600 text-xs">({car.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="mt-3 flex items-center gap-1 text-white font-bold text-lg">
              {formatPrice(car.priceMin)}
              <span className="text-gray-500 font-normal text-sm mx-1">–</span>
              {formatPrice(car.priceMax)}
            </div>
          </div>
        </div>
      ) : (
        /* empty slot */
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`w-full h-44 rounded-2xl border-2 border-dashed ${slot === 0 ? "border-white/10 hover:border-white/25" : "border-blue-500/20 hover:border-blue-500/50"} bg-[#0a0a0a] flex flex-col items-center justify-center gap-2 transition-all duration-300 group`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${slot === 0 ? "bg-white/5 group-hover:bg-white/10" : "bg-blue-500/10 group-hover:bg-blue-500/20"} transition`}>
              <Plus size={18} className={slot === 0 ? "text-gray-400" : "text-blue-400"} />
            </div>
            <span className="text-gray-500 text-sm font-medium">Select {label}</span>
            <span className="text-gray-700 text-xs">Choose a car to compare</span>
            <ChevronDown size={14} className="text-gray-600" />
          </button>

          {/* dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 w-full bg-[#141414] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl"
              >
                {allCars
                  .filter((c) => !usedIds.includes(c.id))
                  .map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { onSelect(c); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/4 transition text-left border-b border-white/4 last:border-0"
                    >
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-[#222] shrink-0">
                        <Image src={c.image} alt={c.model} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{c.brand} {c.model}</p>
                        <p className="text-gray-500 text-[11px]">{c.variant}</p>
                      </div>
                      <span className="ml-auto text-gray-600 text-xs">{formatPrice(c.priceMin)}</span>
                    </button>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ─── spec row ── */
function SpecRow({
  label,
  valA,
  valB,
  isWinner,
  alt,
}: {
  label: string;
  valA: string;
  valB: string;
  isWinner: [boolean, boolean];
  alt: boolean;
}) {
  return (
    <div className={`grid grid-cols-[1fr_180px_1fr] ${alt ? "bg-white/1.5" : ""}`}>
      <div className={`px-6 py-3.5 text-sm ${isWinner[0] ? "text-white font-semibold" : "text-gray-400"}`}>
        {valA}
        {isWinner[0] && <span className="ml-2 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">best</span>}
      </div>
      <div className="px-4 py-3.5 flex items-center justify-center border-x border-white/5">
        <span className="text-gray-600 text-xs text-center">{label}</span>
      </div>
      <div className={`px-6 py-3.5 text-sm ${isWinner[1] ? "text-white font-semibold" : "text-gray-400"}`}>
        {valB}
        {isWinner[1] && <span className="ml-2 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">best</span>}
      </div>
    </div>
  );
}

/* ─── feature row ── */
function FeatureRow({ label, valA, valB, alt }: { label: string; valA: boolean; valB: boolean; alt: boolean }) {
  const cell = (v: boolean) => (
    <div className="flex items-center justify-center">
      {v ? (
        <span className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <Check size={12} className="text-emerald-400" />
        </span>
      ) : (
        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
          <Minus size={12} className="text-gray-700" />
        </span>
      )}
    </div>
  );
  return (
    <div className={`grid grid-cols-[1fr_180px_1fr] ${alt ? "bg-white/1.5" : ""}`}>
      <div className="px-6 py-3 flex items-center justify-start">{cell(valA)}</div>
      <div className="px-4 py-3 flex items-center justify-center border-x border-white/5">
        <span className="text-gray-600 text-xs">{label}</span>
      </div>
      <div className="px-6 py-3 flex items-center justify-start">{cell(valB)}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ComparePage({
  searchParams,
}: {
  searchParams?: { carA?: string; carB?: string };
}) {
  const initialCarA =
    carDatabase.find((c) => String(c.id) === (searchParams?.carA ?? "")) ??
    carDatabase[0];
  const initialCarB =
    carDatabase.find((c) => String(c.id) === (searchParams?.carB ?? "")) ??
    carDatabase[1];

  const [carA, setCarA] = useState<Car | null>(initialCarA);
  const [carB, setCarB] = useState<Car | null>(initialCarB);
  const scoreRef = useRef<HTMLDivElement>(null);
  const scoreInView = useInView(scoreRef, { once: true, margin: "-60px" });

  const usedIds = [carA?.id, carB?.id].filter(Boolean) as number[];

  function specVal(car: Car | null, key: string): string {
    if (!car) return "—";
    const v = (car.specs as Record<string, unknown>)[key];
    return v !== undefined ? String(v) : "—";
  }

  function featVal(car: Car | null, key: string): boolean {
    if (!car) return false;
    return Boolean((car.specs as Record<string, unknown>)[key]);
  }

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground dark:text-white">

      {/* ── background atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/4 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-blue-900/6 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* ── nav ── */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm">
            <ChevronLeft size={16} /> Home
          </Link>
          <span className="text-gray-700">/</span>
          <span className="text-white text-sm">Compare</span>
        </div>

        {/* ── headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Side by Side
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
            Compare<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/25">
              Cars
            </span>
          </h1>
          <p className="mt-5 text-gray-500 text-sm leading-relaxed max-w-lg">
            Choose any two cars and get a deep, data-driven side-by-side breakdown — performance, safety, ownership costs and more.
          </p>
        </motion.div>

        {/* ── car selectors ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-6 mb-16 items-start"
        >
          <CarSlot car={carA} slot={0} onSelect={setCarA} onRemove={() => setCarA(null)} allCars={carDatabase} usedIds={usedIds} />

          {/* VS badge */}
          <div className="shrink-0 flex items-center justify-center w-12 h-44 mt-0">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-12 bg-white/10" />
              <span className="text-[11px] font-black tracking-[0.2em] text-gray-700 uppercase">vs</span>
              <div className="w-px h-12 bg-white/10" />
            </div>
          </div>

          <CarSlot car={carB} slot={1} onSelect={setCarB} onRemove={() => setCarB(null)} allCars={carDatabase} usedIds={usedIds} />
        </motion.div>

        {/* ── only show below if both cars selected ── */}
        {carA && carB && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* ── score cards ── */}
            <div ref={scoreRef} className="mb-12 rounded-3xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
              <div className="px-8 py-6 border-b border-white/8">
                <h2 className="text-white font-bold text-lg">Overall Scores</h2>
                <p className="text-gray-600 text-xs mt-1">AI-computed ratings across key ownership dimensions</p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/5">
                {/* Car A scores */}
                <div className="px-8 py-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-600 font-semibold mb-6">
                    {carA.brand} {carA.model}
                  </p>
                  <div className="flex gap-8 flex-wrap">
                    {scoreCategories.map(({ key, label, icon: Icon }) => (
                      <ScoreArc
                        key={key}
                        score={carA.specs[key] as number}
                        label={label}
                        Icon={Icon}
                        inView={scoreInView}
                      />
                    ))}
                  </div>
                </div>

                {/* Car B scores */}
                <div className="px-8 py-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-500 font-semibold mb-6">
                    {carB.brand} {carB.model}
                  </p>
                  <div className="flex gap-8 flex-wrap">
                    {scoreCategories.map(({ key, label, icon: Icon }) => (
                      <ScoreArc
                        key={key}
                        score={carB.specs[key] as number}
                        label={label}
                        Icon={Icon}
                        inView={scoreInView}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── spec sections ── */}
            {specSections.map((section) => {
              const SIcon = section.icon;
              return (
                <div key={section.title} className="mb-6 rounded-3xl border border-white/8 bg-[#0a0a0a] overflow-hidden">

                  {/* section header */}
                  <div className="grid grid-cols-[1fr_180px_1fr] border-b border-white/8">
                    <div className="px-6 py-4 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold">
                        {carA.brand} {carA.model}
                      </span>
                    </div>
                    <div className="px-4 py-4 flex items-center justify-center gap-2 border-x border-white/5 bg-white/1.5">
                      <SIcon size={14} className="text-blue-400" strokeWidth={1.5} />
                      <span className="text-white text-xs font-bold">{section.title}</span>
                    </div>
                    <div className="px-6 py-4 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-semibold">
                        {carB.brand} {carB.model}
                      </span>
                    </div>
                  </div>

                  {/* rows */}
                  <div className="divide-y divide-white/4">
                    {section.rows.map((row, ri) => {
                      const vA = specVal(carA, row.key);
                      const vB = specVal(carB, row.key);
                      const winIdx = getWinner([carA, carB], row.key as keyof Car["specs"]);
                      return (
                        <SpecRow
                          key={row.key}
                          label={row.label}
                          valA={vA}
                          valB={vB}
                          isWinner={[winIdx === 0, winIdx === 1]}
                          alt={ri % 2 === 1}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* ── features table ── */}
            <div className="mb-6 rounded-3xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
              <div className="grid grid-cols-[1fr_180px_1fr] border-b border-white/8">
                <div className="px-6 py-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-semibold">{carA.brand} {carA.model}</span>
                </div>
                <div className="px-4 py-4 flex items-center justify-center gap-2 border-x border-white/5 bg-white/1.5">
                  <Zap size={14} className="text-blue-400" strokeWidth={1.5} />
                  <span className="text-white text-xs font-bold">Features</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-semibold">{carB.brand} {carB.model}</span>
                </div>
              </div>

              <div className="divide-y divide-white/4">
                {featureRows.map((f, fi) => (
                  <FeatureRow
                    key={f.key}
                    label={f.label}
                    valA={featVal(carA, f.key)}
                    valB={featVal(carB, f.key)}
                    alt={fi % 2 === 1}
                  />
                ))}
              </div>
            </div>

            {/* ── pricing summary ── */}
            <div className="rounded-3xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
              <div className="px-8 py-6 border-b border-white/8">
                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                  <IndianRupee size={16} className="text-blue-400" strokeWidth={1.5} />
                  Pricing & Ownership
                </h2>
              </div>

              <div className="grid grid-cols-2 divide-x divide-white/5">
                {[carA, carB].map((car, ci) => (
                  <div key={ci} className="px-8 py-7 flex flex-col gap-4">
                    <p className={`text-xs uppercase tracking-[0.2em] font-semibold ${ci === 0 ? "text-gray-500" : "text-blue-500"}`}>
                      {car.brand} {car.model}
                    </p>

                    <div>
                      <span className="text-gray-600 text-xs">Starting Price</span>
                      <p className="text-white font-bold text-2xl mt-0.5">{formatPrice(car.priceMin)}</p>
                    </div>

                    <div className="flex gap-8">
                      <div>
                        <span className="text-gray-600 text-xs">Top Variant</span>
                        <p className="text-white font-semibold text-sm mt-0.5">{formatPrice(car.priceMax)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">Yearly Maint.</span>
                        <p className="text-white font-semibold text-sm mt-0.5">{car.specs.maintenanceCost}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs">Resale (3yr)</span>
                        <p className="text-white font-semibold text-sm mt-0.5">{car.specs.resaleValue}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <Users size={14} className="text-gray-500" />
                      <span className="text-gray-500 text-xs">{car.specs.seating} Seater</span>
                      <Fuel size={14} className="text-gray-500 ml-2" />
                      <span className="text-gray-500 text-xs">{car.specs.fuelType}</span>
                      <ShieldCheck size={14} className="text-gray-500 ml-2" />
                      <span className="text-gray-500 text-xs">{car.specs.safetyRating}</span>
                    </div>

                    <Link
                      href={`/cars/${car.id}`}
                      className={`mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        ci === 0
                          ? "bg-white/8 text-white hover:bg-white/15 border border-white/10"
                          : "bg-blue-600 text-white hover:bg-blue-500"
                      }`}
                    >
                      View Full Details
                      <ChevronDown size={14} className="-rotate-90" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ── empty state ── */}
        {(!carA || !carB) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4 border border-dashed border-white/8 rounded-3xl"
          >
            <BarChart3 size={36} className="text-gray-700" strokeWidth={1} />
            <p className="text-gray-600 text-sm">Select two cars above to start comparing</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
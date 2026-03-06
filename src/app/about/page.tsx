// app/about/page.tsx

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Carousel, Card as CarouselCard } from "@/components/ui/apple-cards-carousel";
import { Timeline } from "@/components/ui/timeline";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { GetStartedModal } from "@/components/ui/get-started-modal";
import FeaturesSectionDemo1 from "@/components/ui/features-section-demo-2";
import FeaturesSectionDemo2 from "@/components/ui/features-section-demo-3";

// ─────────────────────────────────────────────
// REUSABLE HELPERS (About hero)
// ─────────────────────────────────────────────
function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/40 transition">
      <CardContent className="p-8 text-left">
        <CardTitle className="text-lg mb-4">{title}</CardTitle>
        <CardDescription className="text-gray-400 text-sm">{desc}</CardDescription>
        <div className="mt-6 text-blue-400 text-sm cursor-pointer">Learn more →</div>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h4 className="font-medium text-white">{title}</h4>
      <p className="text-gray-400 text-sm mt-1">{desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// MISSION — BENTO SKELETONS
// ─────────────────────────────────────────────
const SkeletonOne = () => {
  const variants = { initial: { x: 0 }, animate: { x: 10, rotate: 5, transition: { duration: 0.2 } } };
  const variantsSecond = { initial: { x: 0 }, animate: { x: -10, rotate: -5, transition: { duration: 0.2 } } };
  return (
    <motion.div initial="initial" whileHover="animate" className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
      <motion.div variants={variants} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 bg-black">
        <img src="/icons/speedometer.png" alt="Speedometer" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300">Daily km usage</h4>
      </motion.div>
      <motion.div variants={variantsSecond} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 ml-auto w-3/4 bg-black">
        <img src="/icons/motorway.png" alt="Motorway" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300 w-full text-right">City / Highway use</h4>
      </motion.div>
      <motion.div variants={variants} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 bg-black">
        <img src="/icons/distance.png" alt="Distance" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300">Occasional long trips</h4>
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = { initial: { width: 0 }, animate: { width: "100%", transition: { duration: 0.2 } }, hover: { width: ["0%", "100%"], transition: { duration: 2 } } };
  return (
    <motion.div initial="initial" animate="animate" whileHover="hover" className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
      {Array(6).fill(0).map((_, i) => (
        <motion.div key={i} variants={variants} style={{ maxWidth: `${Math.random() * (100 - 40) + 40}%` }} className="flex rounded-full border border-white/20 p-2 items-center bg-neutral-900 h-4" />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => (
  <div className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
    <img src="https://media.rimello.ai/GIF/fuel.gif" alt="/alt.png" className="w-full h-full object-cover rounded-lg" />
  </div>
);

const SkeletonFour = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };
  return (
    <motion.div initial="initial" whileHover="hover" className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-row space-x-2">
      <motion.div variants={first} className="h-full w-1/3 rounded-2xl bg-black border border-white/10 p-4 flex flex-col items-center">
        <img src="/icons/family.svg" className="rounded-full h-10 w-10" />
        <h4 className="text-xs text-neutral-400 text-center mt-4">Family size</h4>
        <h5 className="text-xs px-2 py-0.5 mt-4 rounded-full bg-red-900/30 border border-red-500 text-red-300">5</h5>
      </motion.div>
      <motion.div className="h-full w-1/3 rounded-2xl bg-black border border-white/10 p-4 flex flex-col items-center z-20">
        <img src="/icons/boot.svg" className="rounded-full h-10 w-10" />
        <h4 className="text-xs text-neutral-400 text-center mt-4">Boot space requirement</h4>
        <h5 className="text-xs px-2 py-0.5 mt-4 rounded-full bg-green-900/30 border border-green-500 text-green-300">Medium</h5>
      </motion.div>
      <motion.div variants={second} className="h-full w-1/3 rounded-2xl bg-black border border-white/10 p-4 flex flex-col items-center">
        <img src="/icons/comfort.svg" className="rounded-full h-10 w-10" />
        <h4 className="text-xs text-neutral-400 text-center mt-4">Seating comfort</h4>
        <h5 className="text-xs px-2 py-0.5 mt-4 rounded-full bg-orange-900/30 border border-orange-500 text-orange-300">Comfortable</h5>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = { initial: { x: 0 }, animate: { x: 10, rotate: 5, transition: { duration: 0.2 } } };
  const variantsSecond = { initial: { x: 0 }, animate: { x: -10, rotate: -5, transition: { duration: 0.2 } } };
  return (
    <motion.div initial="initial" whileHover="animate" className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
      <motion.div variants={variants} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 bg-black">
        <img src="/icons/Acceleration.png" alt="Acceleration" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300">Acceleration preference</h4>
      </motion.div>
      <motion.div variants={variantsSecond} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 ml-auto w-3/4 bg-black">
        <img src="/icons/steering-wheel.png" alt="Handling" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300 w-full text-right">Handling</h4>
      </motion.div>
      <motion.div variants={variants} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 bg-black">
        <img src="/icons/Suspension.png" alt="Suspension" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300">Suspension comfort</h4>
      </motion.div>
    </motion.div>
  );
};

const SkeletonSix = () => {
  const variants = { initial: { x: 0 }, animate: { x: 10, rotate: 5, transition: { duration: 0.2 } } };
  const variantsSecond = { initial: { x: 0 }, animate: { x: -10, rotate: -5, transition: { duration: 0.2 } } };
  return (
    <motion.div initial="initial" whileHover="animate" className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
      <motion.div variants={variants} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 bg-black">
        <img src="/icons/camera.png" alt="Camera" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300">Camera & sensors</h4>
      </motion.div>
      <motion.div variants={variantsSecond} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 ml-auto w-3/4 bg-black">
        <img src="/icons/wifi.svg" alt="Wireless Features" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300 w-full text-right">Wireless features</h4>
      </motion.div>
      <motion.div variants={variants} className="flex flex-row rounded-full border border-white/20 p-2 items-center space-x-2 bg-black">
        <img src="/icons/ADAS.png" alt="ADAS / safety tech" className="h-5 w-5" />
        <h4 className="text-sm text-neutral-300">ADAS / safety tech</h4>
      </motion.div>
    </motion.div>
  );
};

const SkeletonSeven = () => {
  const variants = { initial: { width: 0 }, animate: { width: "100%", transition: { duration: 0.2 } }, hover: { width: ["0%", "100%"], transition: { duration: 2 } } };
  return (
    <motion.div initial="initial" animate="animate" whileHover="hover" className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
      {Array(6).fill(0).map((_, i) => (
        <motion.div key={i} variants={variants} style={{ maxWidth: `${Math.random() * (100 - 40) + 40}%` }} className="flex rounded-full border border-white/20 p-2 items-center bg-neutral-900 h-4" />
      ))}
    </motion.div>
  );
};

const SkeletonEight = () => (
  <div className="flex flex-1 w-full h-full min-h-24 bg-dot-white/[0.1] flex-col space-y-2">
    <img src="https://media.rimello.ai/GIF/brands.gif" alt="/alt.png" className="w-full h-full object-cover rounded-lg" />
  </div>
);

const bentoItems = [
  { title: <h3>Lifestyle & Usage Pattern</h3>, description: <h4 className="text-neutral-400!">Helps understand how, where, and why you drive, so the car matches your real-world routine.</h4>, header: <SkeletonOne />, icon: <IconClipboardCopy className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Budget & Financial Comfort</h3>, description: <h4 className="text-neutral-400!">Rimello aligns suggestions with what you're comfortable investing now and long-term.</h4>, header: <SkeletonTwo />, icon: <IconSignature className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Fuel Preference & Efficiency</h3>, description: <h4 className="text-neutral-400!">Analyses the most suitable fuel type based on running, environmental goals, and cost.</h4>, header: <SkeletonThree />, icon: <IconFileBroken className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Space & Seating Needs</h3>, description: <h4 className="text-neutral-400!">Ensures the car fits your family, lifestyle, and cargo requirements.</h4>, className: "md:col-span-2", header: <SkeletonFour />, icon: <IconTableColumn className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Performance & Driving Feel</h3>, description: <h4 className="text-neutral-400!">Matches your driving personality — calm, sporty, off-road, or luxury.</h4>, header: <SkeletonFive />, icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Maintenance & Service Expectations</h3>, description: <h4 className="text-neutral-400!">Suggests cars that align with your comfort in upkeep, service availability, and costs.</h4>, header: <SkeletonSeven />, icon: <IconSignature className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Brand & Model Preferences</h3>, description: <h4 className="text-neutral-400!">Respects your personal likes while still giving unbiased suggestions.</h4>, header: <SkeletonEight />, icon: <IconFileBroken className="h-4 w-4 text-neutral-400" /> },
  { title: <h3>Features & Technology</h3>, description: <h4 className="text-neutral-400!">Identifies the modern conveniences and safety elements you consider essential.</h4>, header: <SkeletonSix />, icon: <IconClipboardCopy className="h-4 w-4 text-neutral-400" /> },
];

// ─────────────────────────────────────────────
// COMPARISON DATA
// ─────────────────────────────────────────────
const tooltipItems = [
  { id: 1, name: "Performance", designation: "Modern, Fast, Modular", image: "/icons/performance.svg" },
  { id: 2, name: "Safety ratings", designation: "Reliable, Protective, Advanced", image: "/icons/safety.svg" },
  { id: 3, name: "Features", designation: "Innovative, Convenient, Smart", image: "/icons/features.svg" },
  { id: 4, name: "Comfort", designation: "Plush, Smooth, Ergonomic", image: "/icons/comfort.svg" },
  { id: 5, name: "Technology", designation: "Cutting-edge, Intuitive, Connected", image: "/icons/technology.svg" },
  { id: 6, name: "Real-world mileage", designation: "Efficient, Economical, Enduring", image: "/icons/mileage.svg" },
  { id: 7, name: "Service cost", designation: "Affordable, Predictable, Hassle-free", image: "/icons/service-cost.svg" },
  { id: 8, name: "Resale value", designation: "Strong, Appreciating, Trusted", image: "/icons/resale-value.svg" },
];

const carouselCards = [
  { title: "Kia Sonet-GTX+", description: "The Kia Sonet is a stylish and compact SUV known for its bold design, premium interiors, and modern features. It offers a spacious cabin with a touchscreen infotainment system, wireless connectivity, and advanced comfort features like ventilated seats. With multiple petrol and diesel engine options, along with manual, iMT, and automatic transmissions, the Sonet delivers a smooth and efficient drive. Safety features such as multiple airbags, ABS, ESC, and hill-start assist make it a reliable choice for daily city use and long trips.", src: "https://media.rimello.ai/images/Comparison/1.png", features: ["Turbocharged 1.0L engine", "7-speed DCT transmission", "360° camera system", "6 airbags standard"] },
  { title: "TATA Nexon-Fearless Plus S", description: "The Tata Nexon is a compact SUV with a bold and sporty design, featuring a distinctive front grille, LED headlamps, and a coupe-like roofline. Its premium cabin offers touchscreen infotainment, connected car features, and comfortable seating. Available with petrol and diesel engines paired with manual or automatic transmissions, the Nexon delivers a refined and fun driving experience. Safety is a key focus with multiple airbags, ABS with EBD, electronic stability control, and a 5-star Global NCAP rating, making it a reliable choice for families and city commuters.", src: "https://media.rimello.ai/images/Comparison/2.png", features: ["Basic infotainment system", "Limited safety features", "Outdated design", "No modern tech"] },
  { title: "Maruti Suzuki Brezza-ZXi+ AT", description: "The Maruti Suzuki Brezza is a popular compact SUV that combines sleek design with practicality. It features a bold front grille, stylish LED lighting, and a spacious, well-equipped cabin with touchscreen infotainment and smart connectivity options. Powered by an efficient petrol engine with manual or automatic transmissions, the Brezza offers smooth city driving and good fuel efficiency. Safety features like dual airbags, ABS with EBD, and rear parking sensors enhance confidence on the road, making it a dependable choice for urban and weekend drives.", src: "https://media.rimello.ai/images/Comparison/5.png", features: ["High-performance engine", "Advanced suspension", "Sport mode available", "Quick acceleration"] },
  { title: "Hyundai Creta-SX Premium", description: "The Hyundai Creta is a premium compact SUV known for its elegant design, high-quality interiors, and advanced technology. It offers a feature-rich cabin with touchscreen infotainment, connected car services, wireless phone integration, and a comfortable seating layout. Available with multiple petrol and diesel engines along with manual and automatic transmissions, the Creta delivers a refined and powerful driving experience. With safety features like multiple airbags, ABS, electronic stability control, and rear parking assistance, it is a reliable and stylish choice for families and city commuters.", src: "https://media.rimello.ai/images/Comparison/4.png", features: ["Adaptive cruise control", "Lane keep assist", "Blind spot monitoring", "Automatic emergency braking"] },
  { title: "MG Hector-Savvy Pro", description: "The MG Hector is a mid-size SUV that stands out for its bold design, spacious cabin, and cutting-edge technology. It features a large touchscreen infotainment system, connected car features, and premium interiors for a comfortable ride. With petrol and diesel engine options, paired with manual or automatic transmissions, the Hector offers smooth performance on highways and city roads. Safety is a priority with multiple airbags, ABS with EBD, electronic stability control, and hill-start assist. Its combination of space, features, and style makes it an attractive choice for families and tech-savvy buyers.", src: "https://media.rimello.ai/images/Comparison/3.png", features: ["Adaptive cruise control", "Lane keep assist", "Blind spot monitoring", "Automatic emergency braking"] },
];

// ─────────────────────────────────────────────
// PERFECT MATCH TIMELINE DATA
// ─────────────────────────────────────────────
const timelineData = [
  {
    title: (
      <div>
        <h2 className="text-white">1.</h2>
        <h1 className="text-neutral-500!">Tell Us What You Need</h1>
        <p className="text-neutral-300 pt-5">Simple questions, no jargon.</p>
      </div>
    ),
    content: null,
    image: "https://media.rimello.ai/GIF/Tell-Us-What.gif",
  },
  {
    title: (
      <div>
        <h2 className="text-white">2.</h2>
        <h1 className="text-neutral-500!">Get Smart Car Picks</h1>
        <p className="text-neutral-300 pt-5">AI-chosen options based on real data.</p>
      </div>
    ),
    content: null,
    image: "https://media.rimello.ai/GIF/Get-Smart-Car-Picks.gif",
  },
  {
    title: (
      <div>
        <h2 className="text-white!">3.</h2>
        <h1 className="text-neutral-500!">Explore & Compare</h1>
        <p className="text-neutral-300 pt-5">Specs, safety, reviews, and more.</p>
      </div>
    ),
    content: null,
    image: "https://media.rimello.ai/GIF/Explore-Compare.gif",
  },
  {
    title: (
      <div>
        <h2 className="text-white">4.</h2>
        <h1 className="text-neutral-500!">Buy Without Doubt</h1>
        <p className="text-neutral-300 pt-5">Backed by clarity and intelligence.</p>
      </div>
    ),
    content: null,
    image: "https://media.rimello.ai/images/PerfectMatch/Buy-Without-Doubt.svg",
  },
];

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const FeaturesSection = FeaturesSectionDemo2 as any;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HERO (unchanged) ================= */}
      <section className="relative px-6 pt-28 pb-20 max-w-7xl mx-auto text-center">
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-6 text-xs tracking-widest">
          THE FUTURE OF AUTOMOTIVE INTELLIGENCE
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Redefining the way we{" "}
          <span className="text-blue-500">move.</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Rimello is a pioneering AI-powered automotive ecosystem. We combine deep neural networks with expert human analysis to deliver the world's most intelligent car buying experience.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-medium">
            Explore Technology
          </Button>
          <Button variant="outline" className="px-6 py-3 rounded-full border-white/20 hover:bg-white/5 font-medium">
            Watch Manifesto
          </Button>
        </div>

        <div className="mt-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="h-64 md:h-[420px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
            Hero Image
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <div id="mission">
        <div className="font-Montserrat-Medium py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-black text-white min-h-screen">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="tracking-tight">
              Built Around One Mission — Suggesting the Right Car
            </h1>
            <h2 className="mt-4 text-neutral-300">
              The Most Intelligent Car Recommendation Engine
            </h2>
            <p className="mt-4 text-neutral-400">
              Rimello uses advanced AI to understand who you are as a driver, then matches you with the ideal car from across brands, segments, and budgets.
            </p>
          </div>

          <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {bentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={`[&>p:text-lg] text-white ${(item as any).className ?? ""}`}
              />
            ))}
          </BentoGrid>
        </div>
      </div>

      {/* ================= COMPARISON ================= */}
      <section id="compare" className="relative w-full bg-black py-16 md:py-20 lg:py-24 flex items-center justify-center">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl font-bold">
            Smart Car Comparison
          </h1>
          <p className="mt-3 max-w-xl text-neutral-300 text-sm sm:text-base">
            See the difference before you decide.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AnimatedTooltip items={tooltipItems} />
          </div>

          <div className="w-full mt-16 max-w-5xl">
            <Carousel
              items={carouselCards.map((card, i) => (
                <CarouselCard
                  key={i}
                  index={i}
                  card={{ title: card.title, features: card.features, src: card.src, content: card.description }}
                  layout
                />
              ))}
            />
          </div>
        </div>
      </section>

      {/* ================= PERFECT MATCH ================= */}
      <section id="perfect-match" className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-black text-white">
        <div className="text-center mb-20 px-4">
          <h1>How Rimello Finds Your Perfect Match</h1>
          <p className="mt-4 text-neutral-400 text-lg max-w-2xl mx-auto">
            A clean and modern timeline powered by Aceternity UI — showing exactly how Rimello recommends the perfect car for you.
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* ================= DIFFERENT ================= */}
      <section id="different" className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-center mb-12 text-white">
            What Makes Rimello Different
          </h1>
          <FeaturesSectionDemo1 />
        </div>
      </section>

      {/* ================= OWNERSHIP ================= */}
      <section id="ownership" className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <FeaturesSection />
        </div>
      </section>

      {/* ================= PROMISE ================= */}
      <section className="font-Montserrat-Medium py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-black text-white flex flex-col items-center justify-center">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl flex flex-wrap justify-center items-center gap-2 mb-10">
            <span className="mb-4">Rimello makes car buying & Owning</span>
            <LayoutTextFlip
              text=""
              words={['smarter', 'easier', 'objective', 'stress-free']}
              duration={2000}
              className="inline-block"
            />
          </h1>
          <p className="mt-6 text-neutral-400 text-lg sm:text-xl md:text-2xl lg:text-xl leading-relaxed">
            Backed by analytics, reviews, reliability signals, and cost calculations, Rimello ensures you never have to rely on guesswork again. Discover cars that fit you, not just the trends.
          </p>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black font-semibold rounded-lg transition cursor-pointer"
          >
            Get Started
          </button>
        </div>

        <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 py-10 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-semibold text-white">Rimello</div>
            <p className="mt-2">© 2026 Rimello Intelligence Systems. All rights reserved.</p>
          </div>
          <div className="flex gap-16">
            <div>
              <div className="text-white font-medium mb-2">Platform</div>
              <ul className="space-y-1"><li>AI Matcher</li><li>Market Tracker</li><li>Pricing Index</li></ul>
            </div>
            <div>
              <div className="text-white font-medium mb-2">Company</div>
              <ul className="space-y-1"><li>About</li><li>Careers</li><li>Legal</li></ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
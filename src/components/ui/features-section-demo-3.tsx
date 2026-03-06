import React from "react";
import { cn } from "@/lib/utils";
// import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Community & Real Owner Experiences",
      description:
        "Discussions, reviews, tips, and real stories to help you understand cars beyond the brochure.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-800",
    },
    {
      title: "Maintenance Tips & Guides",
      description:
        "Simple, practical advice to keep your car in top shape — from routine care to DIY checks.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
    },
    {
      title: "Service Reminders & Renewal Alerts",
      description: "Smart reminders based on: Insurance renewal, PUC expiry, Warranty end",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-800",
    },
    {
      title: "Ownership Tools", 
      description: "Never miss: Service tracker, PUCC tracker, Vehicle Challans, Document Storage",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3",
    },
  ];

  return (
    <div className="relative z-20 py-* lg:py-* max-w-7xl mx-auto">
      <div className="px-8">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white">
          More Than Suggestions —<br />
          Rimello Is Your Ownership Companion
        </h1>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-center font-normal text-neutral-300">
          Although car suggestions are our core, Rimello goes beyond the
          decision-making moment.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("p-4 sm:p-8 relative overflow-hidden w-full", className)}
    >
      {children}
    </div>
  );
};

// Updated FeatureTitle to use <h2>
const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <h2 className="max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </h2>
  );
};

// Cleaned up FeatureDescription classes
const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-left text-sm  max-w-sm  font-normal text-neutral-300 my-2 mx-0 ">
      {children}
    </p>
  );
};

// ORIGINAL SKELETONS (unchanged)
export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <img
            src="https://media.rimello.ai/GIF/Community%20%26%20Real%20Owner%20Experiences%20.gif"
            alt="/alt.png"
            width={800}
            height={800}
            className="h-full w-full object-contain rounded-sm"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-linear-to-t from-black via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-linear-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};


export const SkeletonThree = () => {
  return (
    <div className="relative flex gap-10 h-full group/image">
      <div className="w-full mx-auto bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          {/* Optional overlay icon */}
          {/* <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" /> */}

          {/* GIF instead of static image */}
          <img
            src="https://media.rimello.ai/GIF/Service%20%26%20Renewal%20Alerts%20%20(1).gif" 
            alt="/alt.png"
            width={800}
            height={800}
            className="h-full w-full aspect-square  transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://media.rimello.ai/images/Ownership/18.svg",
    "https://media.rimello.ai/images/Ownership/19.svg",
    "https://media.rimello.ai/images/Ownership/20.svg",
    "https://media.rimello.ai/images/Ownership/21.svg",
    "https://media.rimello.ai/images/Ownership/23.svg",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-10 sm:-ml-20">
        {images.slice(0, 3).map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{ rotate: Math.random() * 20 - 10 }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-neutral-800 border border-neutral-700 shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="/alt.png"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.slice(3).map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{ rotate: Math.random() * 20 - 10 }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-neutral-800 border-neutral-700 border shrink-0 overflow-hidden"
          >
            <img
              src={image}
              alt="/alt.png"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-100 inset-y-0 w-20 bg-linear-to-r from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-100 inset-y-0 w-20 bg-linear-to-l from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <img
        src="https://media.rimello.ai/images/Ownership/Tools.svg"
        alt="/alt.png"
        className="-bottom-80 md:-bottom-72 w-full"
      />
    </div>
  );
};

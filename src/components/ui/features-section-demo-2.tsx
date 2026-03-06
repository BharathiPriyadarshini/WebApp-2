import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconDatabaseEdit,
  IconProgressHelp,
  IconBrandDatabricks,
  IconDeviceMobileMessage,
  IconScoreboard,
  IconWorldDollar,
  IconAi,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "AI-Driven Matching",
      description:
        "Recommends cars based on your needs, not random listings..",
      icon: <IconAi />,
    },
    {
      title: "Deep Data Analysis",
      description:
        "Evaluates safety, reliability, resale, maintenance, tech, and real-world performance.",
      icon: <IconBrandDatabricks />,
    },
    {
      title: "Unbiased Suggestions",
      description:
        "No ads, promotions, or sponsored rankings — only data-true results.",
      icon: <IconProgressHelp />,
    },
    {
      title: "Lifestyle-Based Fit",
      description: "Matches cars to usage style, family size, commute, terrain, and comfort expectations.",
      icon: <IconDatabaseEdit />,
    },
    {
      title: "Total Cost Insights",
      description: "Estimates long-term expenses including service, mileage, insurance, and depreciation.",
      icon: <IconWorldDollar/>,
    },
    {
      title: "Scorecards You Can Trust",
      description:
        "Clear comparison metrics, strengths, trade-offs, and ownership perspective.",
      icon: <IconScoreboard/>,
    },
    {
      title: "Future-Ready Evaluation",
      description:
        "Considers EV readiness, emerging tech, safety norms, and upcoming trends",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Smart, Confident Decisions",
      description: "Helps you choose the car that’s practical, value-rich, and genuinely right for you.",
      icon: <IconDeviceMobileMessage />,
    },
  ];
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

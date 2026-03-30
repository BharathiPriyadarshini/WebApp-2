"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight } from "lucide-react";

interface CardItem {
  id: number;
  title: string;
  summary: string;
  rating?: number;
  reviewer?: string;
  image: string;
  category?: string;
  link: string;
}

const expertReviews: CardItem[] = [
  {
    id: 1,
    title: "Rimello X1 – Best in City Driving",
    summary: "Exceptional comfort and handling, perfect for urban driving.",
    rating: 4.7,
    reviewer: "John Doe, Automotive Expert",
    image: "/alt.png",
    category: "SUV",
    link: "/reviews/1",
  },
  {
    id: 2,
    title: "Rimello S7 – Luxury Meets Performance",
    summary: "A perfect blend of luxury interiors and high-end performance.",
    rating: 4.5,
    reviewer: "Jane Smith, Car Analyst",
    image: "/alt.png",
    category: "Sedan",
    link: "/reviews/2",
  },
  {
    id: 3,
    title: "Rimello E3 – Electric Innovation",
    summary: "Eco-friendly without compromising power.",
    rating: 4.8,
    reviewer: "Ali Khan, EV Specialist",
    image: "/alt.png",
    category: "Electric",
    link: "/reviews/3",
  },
];

const videos: CardItem[] = [
  {
    id: 4,
    title: "Rimello X1 Test Drive Video",
    summary: "Watch our expert take the Rimello X1 on city roads.",
    image: "/alt.png",
    category: "Video",
    link: "/videos/1",
  },
  {
    id: 5,
    title: "Rimello S7 Interior Walkthrough",
    summary: "Detailed look at luxury interiors and features.",
    image: "/alt.png",
    category: "Video",
    link: "/videos/2",
  },
];

const featuredStories: CardItem[] = [
  {
    id: 6,
    title: "Top 5 Cars for City Driving",
    summary: "Our expert picks the best vehicles for urban commutes.",
    image: "/alt.png",
    category: "Feature",
    link: "/stories/1",
  },
  {
    id: 7,
    title: "Electric Cars That Change The Game",
    summary: "The latest EVs that are transforming the market.",
    image: "/alt.png",
    category: "Feature",
    link: "/stories/2",
  },
];

const tabs = ["Expert Reviews", "Videos", "Featured Stories"];

export default function ExpertReviewTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const getCurrentData = () => {
    if (activeTab === 0) return expertReviews;
    if (activeTab === 1) return videos;
    return featuredStories;
  };

  return (
    <section className="py-24 bg-background dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
              Know More To Choose Better
            </h2>
            <p className="text-muted-foreground mt-2">
              Insights, videos, and expert tips to help you choose the perfect car
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === i
                    ? "bg-blue-600 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {getCurrentData().map((item, index) => {
            const rating = item.rating;
            return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={item.link}>
                <Card className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 cursor-pointer h-[450px]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    {item.category && (
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white border-transparent">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-[190px]">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{item.summary}</p>
                      {rating !== undefined && (
                        <div className="mt-2 flex items-center">
                          <span className="text-yellow-400 font-bold mr-2">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i}>
                                {i < Math.round(rating) ? "★" : "☆"}
                              </span>
                            ))}
                          </span>
                          <span className="text-muted-foreground text-sm">{rating.toFixed(1)}</span>
                        </div>
                      )}
                      {item.reviewer && (
                        <p className="text-muted-foreground/80 text-xs mt-2">{item.reviewer}</p>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-blue-500 font-medium">
                      Read More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
          {getCurrentData().map((item, index) => {
            const rating = item.rating;
            return (
            <motion.div
              key={item.id}
              className="min-w-[280px] shrink-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={item.link}>
                <Card className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 cursor-pointer h-[450px]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    {item.category && (
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white border-transparent">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-[190px]">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{item.summary}</p>
                      {rating !== undefined && (
                        <div className="mt-2 flex items-center">
                          <span className="text-yellow-400 font-bold mr-2">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i}>
                                {i < Math.round(rating) ? "★" : "☆"}
                              </span>
                            ))}
                          </span>
                          <span className="text-muted-foreground text-sm">{rating.toFixed(1)}</span>
                        </div>
                      )}
                      {item.reviewer && (
                        <p className="text-muted-foreground/80 text-xs mt-2">{item.reviewer}</p>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-blue-500 font-medium">
                      Read More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
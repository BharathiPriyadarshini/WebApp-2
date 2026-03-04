"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";

interface BlogPost {
  id: number;
  title: string;
  link: string;
  date: string;
  image: string;
  category?: string;
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "Lamborghini Revuelto: 1,001 HP Hybrid V12 Redefines the Supercar Era",
    link: "https://rimello.ai/blog/lamborghini-revuelto-1001-hp-hybrid-v12-supercar/",
    date: "March 1, 2026",
    image: "/alt.png",
    category: "Supercar",
  },
  {
    id: 2,
    title: "Hyundai Creta, Kia Seltos, and Others: Understanding the 40% GST Category in India",
    link: "https://rimello.ai/blog/hyundai-creta-others-understanding-40-percent-gst-category-india/",
    date: "February 20, 2026",
    image: "/alt.png",
    category: "Technology",
  },
  {
    id: 3,
    title: "2026 BMW iX3 xDrive50: 469 HP Electric SUV With 805 km Range",
    link: "https://rimello.ai/blog/2026-bmw-ix3-xdrive50-469-hp-805km-range/",
    date: "February 10, 2026",
    image: "/alt.png",
    category: "Automation",
  },
];

export default function News() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              News to help Choose your Next car
            </h2>
            <p className="text-gray-400 mt-2">
              Insights, updates and industry trends from Rimello
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden md:flex items-center text-blue-500 hover:text-blue-400 transition font-medium"
          >
            View All Articles <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={post.link}>
                <Card className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 cursor-pointer h-[450px]">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    {post.category && (
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white border-transparent">
                        {post.category}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col justify-between h-[190px]">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                      <p className="text-gray-400 text-sm mt-2">{post.date}</p>
                    </div>
                    <div className="mt-4 flex items-center text-blue-500 font-medium">
                      Read More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="min-w-[280px] shrink-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={post.link}>
                <Card className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300 cursor-pointer h-[450px]">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    {post.category && (
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white border-transparent">
                        {post.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-[190px]">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                      <p className="text-gray-400 text-sm mt-2">{post.date}</p>
                    </div>
                    <div className="mt-4 flex items-center text-blue-500 font-medium">
                      Read More <ChevronRight size={16} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 md:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-500 hover:text-blue-400 transition font-medium"
          >
            View All Articles <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
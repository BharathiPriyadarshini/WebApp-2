"use client";

import PageWrapper from "@/components/layout/PageWrapper";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import { Share2, Pencil, Heart, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Please sign in to view profile
          </h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-10">
            {/* PROFILE HEADER */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center sm:justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shrink-0" />

                <div>
                  <h1 className="text-3xl font-bold">Alex Rivera</h1>
                  <p className="text-white/60 text-sm">
                    alex.rivera@rimello.io
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                    <Badge className="bg-blue-600/20 text-blue-400 border-transparent">
                      PRO DRIVER TIER
                    </Badge>
                    <Badge variant="secondary" className="bg-white/10 text-white/60 border-transparent">
                      Member since 2023
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <Button variant="outline" className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 border-transparent">
                  <Pencil size={16} /> Edit Profile
                </Button>
                <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700">
                  <Share2 size={16} /> Share Profile
                </Button>
              </div>
            </div>

            {/* SAVED CARS */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Saved Cars</h2>
                <Button variant="link" className="text-blue-400 p-0 h-auto">
                  View all (12)
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* CAR CARD */}
                <Card className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden py-0">
                  <div className="relative h-48 bg-black">
                    <Image
                      src="/cars/ferrari.jpg"
                      alt="Ferrari"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/alt.png";
                      }}
                    />
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Ferrari SF90 Stradale
                        </h3>
                        <p className="text-white/60 text-sm">
                          2024 • Hybrid V8
                        </p>
                      </div>
                      <Heart className="text-white/40" />
                    </div>

                    <div className="flex justify-between text-sm text-white/70 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-white/40 text-xs">0-60</p>
                        <p>2.5s</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">HP</p>
                        <p>986</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">PRICE</p>
                        <p>$524k</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECOND CAR */}
                <Card className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden py-0">
                  <div className="relative h-48 bg-black">
                    <Image
                      src="/cars/porsche.jpg"
                      alt="Porsche"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/alt.png";
                      }}
                    />
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Porsche Taycan Turbo S
                        </h3>
                        <p className="text-white/60 text-sm">
                          2024 • Dual Motor EV
                        </p>
                      </div>
                      <Heart className="text-white/40" />
                    </div>

                    <div className="flex justify-between text-sm text-white/70 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-white/40 text-xs">0-60</p>
                        <p>2.6s</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">HP</p>
                        <p>750</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">PRICE</p>
                        <p>$194k</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ADD COLLECTION */}
              <Card className="mt-6 border border-dashed border-white/20 rounded-xl bg-transparent hover:bg-white/5 cursor-pointer">
                <CardContent className="p-6 text-center text-white/50">
                  <Plus className="mx-auto mb-2" />
                  Add to Collection
                </CardContent>
              </Card>
            </div>

            {/* RECENT COMPARISONS */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Recent Comparisons
              </h2>

              <div className="space-y-4">
                <Card className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 cursor-pointer py-0">
                  <CardContent className="p-5 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        Lucid Air vs Tesla Model S
                      </p>
                      <p className="text-white/50 text-sm">
                        Compared 2 days ago • Premium Electric
                      </p>
                    </div>
                    <ChevronRight />
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 cursor-pointer py-0">
                  <CardContent className="p-5 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        Porsche 911 GT3 vs Ferrari 296 GTB
                      </p>
                      <p className="text-white/50 text-sm">
                        Compared 1 week ago • Track Performance
                      </p>
                    </div>
                    <ChevronRight />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* AI PROFILE */}
            <Card className="bg-white/5 border border-white/10 rounded-2xl">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-semibold">My AI Profile</h3>

                {[
                  { label: "Performance Focused", value: 88 },
                  { label: "Luxury Seeker", value: 65 },
                  { label: "Eco-conscious", value: 42 },
                  { label: "Tech Early-Adopter", value: 92 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span className="text-blue-400">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-transparent">
                  Recalculate Persona
                </Button>
              </CardContent>
            </Card>

            {/* SAVED FILTERS */}
            <Card className="bg-white/5 border border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Saved Filters</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/10 border-transparent">
                    Electric
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 border-transparent">
                    &gt; 600hp
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 border-transparent">
                    Sedan
                  </Badge>
                </div>
                <Button variant="link" className="text-blue-400 text-xs mt-3 p-0 h-auto">
                  Clear all
                </Button>
              </CardContent>
            </Card>

            {/* MEMBERSHIP */}
            <Card className="bg-gradient-to-br from-gray-800 to-black rounded-2xl border-transparent">
              <CardContent className="p-6 text-white space-y-4">
                <h3 className="font-semibold">Elite Membership</h3>
                <p className="text-white/60 text-sm">
                  Unlock 1-on-1 advisor calls and VIP showroom access.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
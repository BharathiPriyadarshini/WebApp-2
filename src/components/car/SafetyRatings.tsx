import React from 'react';
import Image from 'next/image';
import { Star, User, Baby } from 'lucide-react';
import { Card } from "@/components/ui/card";

export interface SafetyRatingData {
    globalNcap: {
        adult: number;
        child: number;
    };
    bharatNcap: {
        adult?: number;
        child?: number;
        status: "Tested" | "Not Tested";
    };
}

interface SafetyRatingsProps {
    data: SafetyRatingData;
}

export function SafetyRatings({ data }: SafetyRatingsProps) {
    // Helper to render stars
    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-6 w-6 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Global NCAP Card */}
            <Card className="p-6 flex flex-col items-center justify-center gap-6 bg-card border-none shadow-sm min-h-[200px]">
                <div className="relative h-12 w-48">
                    <Image
                        src="/gncap 1.svg"
                        alt="Global NCAP"
                        fill
                        className="object-contain"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/alt.png";
                        }}
                    />
                </div>

                <div className="flex flex-col gap-4 w-full px-4">
                    {/* Adult Safety Row */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="relative h-10 w-10">
                            <Image
                                src="/rating-adult.svg"
                                alt="Adult Safety"
                                fill
                                className="object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/alt.png";
                                }}
                            />
                        </div>
                        {renderStars(data.globalNcap.adult)}
                    </div>

                    {/* Child Safety Row */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="relative h-10 w-10">
                            <Image
                                src="/rating-child.svg"
                                alt="Child Safety"
                                fill
                                className="object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/alt.png";
                                }}
                            />
                        </div>
                        {renderStars(data.globalNcap.child)}
                    </div>
                </div>
            </Card>

            {/* Bharat NCAP Card */}
            <Card className="p-6 flex flex-col items-center justify-center gap-6 bg-card border-none shadow-sm min-h-[200px]">
                <div className="relative h-20 w-32">
                    {/* Placeholder for Bharat NCAP logo since it doesn't exist yet */}
                    <Image
                        src="/bncap.svg"
                        alt="Bharat NCAP"
                        fill
                        className="object-contain"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/alt.png";
                        }}
                    />
                </div>

                {data.bharatNcap.status === "Tested" ? (
                    <div className="flex flex-col gap-4 w-full px-4">
                        {/* Adult Safety Row */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/rating-adult.svg"
                                    alt="Adult Safety"
                                    fill
                                    className="object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/alt.png";
                                }}
                                />
                            </div>
                            {renderStars(data.bharatNcap.adult || 0)}
                        </div>

                        {/* Child Safety Row */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/rating-child.svg"
                                    alt="Child Safety"
                                    fill
                                    className="object-contain"
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = "/alt.png";
                                }}
                                />
                            </div>
                            {renderStars(data.bharatNcap.child || 0)}
                        </div>
                    </div>
                ) : (
                    <div className="mt-2">
                        <span className="text-xl font-bold text-foreground">Not Tested</span>
                    </div>
                )}
            </Card>
        </div>
    );
}

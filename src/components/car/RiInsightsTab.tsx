import React, { useState } from 'react';
import {
    Star,
    ShieldCheck,
    ThumbsUp,
    MessageSquare,
    TrendingUp,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Zap,
    MoveRight,
    Search,
    ThumbsDown,
    MapPin,
    Calendar,
    ArrowLeft
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { InsightData } from "@/app/details/[id]/page";

interface RiInsightsTabProps {
    data: InsightData;
}

// Mock Data Generator for Category Reviews
const getMockReviews = (category: string) => {
    const commonReviews = [
        { id: 1, title: "Great experience so far", text: "Really impressed with how this handles daily usage.", user: "Rahul M.", sentiment: "positive", date: "2d ago" },
        { id: 2, title: "Could be better", text: "Expected more based on the price point.", user: "Priya S.", sentiment: "negative", date: "1w ago" },
    ];

    const specificReviews: Record<string, any[]> = {
        "Build Quality & Safety": [
            { id: 101, title: "Solid Build", text: "The door thud feels very premium. Gives a sense of safety.", user: "Amit K.", sentiment: "positive", likes: 45, date: "3d ago" },
            { id: 102, title: "Panel Gaps", text: "Noticed some uneven panel gaps near the bonnet.", user: "Vikram R.", sentiment: "negative", likes: 12, date: "1mo ago" },
            { id: 103, title: "Paint Quality", text: "Paint finish is excellent, very glossy.", user: "Sneha G.", sentiment: "positive", likes: 8, date: "2w ago" }
        ],
        "Features & Tech": [
            { id: 201, title: "Touchscreen Lag", text: "The infotainment system freezes occasionally.", user: "Rohan D.", sentiment: "negative", likes: 56, date: "5d ago" },
            { id: 202, title: "Sound System", text: "Speakers are absolute blast! Bass is punchy.", user: "Karthik", sentiment: "positive", likes: 89, date: "1w ago" }
        ],
        "Comfort & Interiors": [
            { id: 301, title: "Plush Seating", text: "Long drives are a breeze, seats are very supportive.", user: "Anjali P.", sentiment: "positive", likes: 120, date: "2d ago" },
            { id: 302, title: "Back Seat", text: "Rear legroom is tight for tall passengers.", user: "Deepak S.", sentiment: "neutral", likes: 34, date: "3w ago" }
        ]
    };

    return specificReviews[category] || commonReviews;
};

export function RiInsightsTab({ data }: RiInsightsTabProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Build Quality & Safety");

    const handleCategoryClick = (categoryLabel: string) => {
        setSelectedCategory(categoryLabel);
    };

    const currentReviews = selectedCategory ? getMockReviews(selectedCategory) : [];
    const currentCategoryScore = data.categoryRatings.find(c => c.label === selectedCategory)?.score || 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6 animate-in fade-in duration-500 min-h-[600px]">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">

                {/* 1. Header & Stats */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-1">
                        ri<span className="text-blue-500 font-normal">Sights</span>
                    </h2>
                    <p className="text-gray-500 mb-6">Intelligence from real experiences</p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-foreground">{data.overallRating}</span>
                            <span className="text-2xl text-gray-400">/5</span>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 rounded-sm px-2 font-normal">
                                    <TrendingUp className="h-3 w-3" /> 3% increase
                                </Badge>
                                <span className="text-xs text-gray-400">from last month</span>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{data.recommendationPercent}% recommend this car</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Most mentioned: <strong>{data.mostMentioned}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Top adv: <strong>{data.topAdvantage}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Ownership Confidence Card */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-3xl p-6 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-blue-600 font-semibold mb-3">Ownership Confidence</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-card p-2 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/50 flex items-center gap-2 px-4">
                                <ShieldCheck className="h-5 w-5 text-blue-600" />
                                <span className="font-bold text-lg text-foreground">{data.ownershipConfidence.level}</span>
                            </div>
                        </div>
                        <p className="text-gray-500 italic text-sm">{data.ownershipConfidence.description}</p>
                    </div>
                    {/* Background Icon Watermark */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                        <ShieldCheck className="h-64 w-64 text-blue-600" />
                    </div>
                </div>

                {/* 3. Category Ratings List (Clickable) */}
                {/* 3. Category Ratings List (Clickable) */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                        Detailed Breakdown
                    </h3>

                    {data.categoryRatings.map((cat, idx) => {
                        const isOpen = selectedCategory === cat.label;
                        const reviews = getMockReviews(cat.label);

                        return (
                            <div
                                key={idx}
                                className="rounded-2xl border border-border bg-card transition-all"
                            >
                                <div
                                    onClick={() =>
                                        setSelectedCategory(isOpen ? null : cat.label)
                                    }
                                    className="p-5 cursor-pointer"
                                >
                                    <div className="flex items-start justify-between gap-6">

                                        {/* LEFT SIDE */}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-foreground">
                                                {cat.label}
                                            </h4>

                                            {cat.subLabel && (
                                                <div className="flex items-center justify-between mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        {cat.subLabel}
                                                    </p>

                                                    <div className="flex items-center gap-3">
                                                        {isOpen && (
                                                            <span className={`text-lg font-bold ${getScoreColor(cat.score)}`}>
                                                                {cat.score}
                                                            </span>
                                                        )}
                                                        <ChevronRight
                                                            className={`h-5 w-5 transition-transform ${isOpen
                                                                    ? "rotate-90 text-blue-600"
                                                                    : "text-gray-400"
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {isOpen && (
                                            <div className="w-[45%] border-l border-border pl-6">
                                                <div className="space-y-3 max-h-[260px] overflow-y-auto">
                                                    {reviews.map((review: any) => (
                                                        <div
                                                            key={review.id}
                                                            className="text-sm"
                                                        >
                                                            <p className="font-semibold text-foreground">
                                                                {review.title}
                                                            </p>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                                "{review.text}"
                                                            </p>
                                                            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                                                                <span>{review.user}</span>
                                                                <span>{review.date}</span>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <Button
                                                        variant="outline"
                                                        className="w-full text-xs h-8 bg-transparent border-dashed"
                                                    >
                                                        Load more
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 4. User Feedback Section */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-foreground">What Users say the most</h3>
                        <Button variant="link" className="text-blue-600">View all</Button>
                    </div>

                    <Tabs defaultValue="positives" className="w-full">
                        <TabsList className="w-full grid grid-cols-2 bg-muted rounded-xl p-1 h-12 mb-6">
                            <TabsTrigger value="positives" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-muted-foreground font-medium h-10">Positives</TabsTrigger>
                            <TabsTrigger value="negatives" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-red-500 data-[state=active]:shadow-sm text-muted-foreground font-medium h-10">Negatives</TabsTrigger>
                        </TabsList>

                        <TabsContent value="positives" className="space-y-4">
                            {data.userFeedback.positives.slice(0, 3).map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </TabsContent>

                        <TabsContent value="negatives" className="space-y-4">
                            {data.userFeedback.negatives.slice(0, 3).map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-2">
                                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="flex flex-col h-full gap-6 sticky top-24">

                {/* 1. Summary Card (Constant) */}
                <Card className="p-6 border-none shadow-xl bg-card rounded-3xl flex flex-col gap-6 shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Overall Rating Section */}
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">OVERALL</p>
                            <div className="text-6xl font-bold text-foreground tracking-tighter leading-none">
                                {data.overallRating}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 mt-2">
                            <div className="flex text-blue-600 gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(data.overallRating) ? 'fill-blue-600 text-blue-600' : 'fill-gray-200 text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">Verified Owners</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-2xl p-4 flex flex-col justify-center gap-2 border border-border">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Recommend</span>
                            <span className="text-2xl font-bold text-green-600">{data.recommendationPercent}%</span>
                        </div>
                        <div className="bg-muted rounded-2xl p-4 flex flex-col justify-center gap-2 border border-border">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Confidence</span>
                            <Badge className={`h-6 w-fit ${data.ownershipConfidence.level === 'High' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'} text-[10px] px-3 rounded-full font-bold uppercase tracking-wide border-none`}>
                                {data.ownershipConfidence.level}
                            </Badge>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-sm shadow-xl shadow-blue-200 dark:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Compare Variants
                    </Button>
                </Card>

                {/* 2. Dynamic Content Area */}
                {/* <div className="flex-1 flex flex-col min-h-[400px]">
                    {selectedCategory ? (
                        <Card className="border-none shadow-none bg-transparent flex flex-col gap-4 animate-in slide-in-from-right-4 duration-300"> */}

                {/* Header for dynamic section */}
                {/* <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900 dark:text-white leading-none">
                                        {selectedCategory}
                                    </h3>
                                </div>
                                <span className={`text-xl font-bold ${getScoreColor(currentCategoryScore)}`}>
                                    {currentCategoryScore}
                                </span>
                             </div> */}

                {/* Reviews Scroll Area */}
                {/* <ScrollArea className="h-[400px] w-full pr-4">
                                <div className="space-y-3 pb-4">
                                    {currentReviews.map((review: any) => (
                                        <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                                                {review.title}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-3">
                                                "{review.text}"
                                            </p>
                                            
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-700/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                                                        {review.sentiment === 'positive' ? (
                                                            <ThumbsUp className="h-3 w-3 text-green-500" />
                                                        ) : review.sentiment === 'negative' ? (
                                                            <ThumbsDown className="h-3 w-3 text-red-500" />
                                                        ) : (
                                                            <MessageSquare className="h-3 w-3" />
                                                        )}
                                                        <span>{review.likes || 0}</span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-gray-300 font-medium">
                                                    {review.date}
                                                </span>
                                            </div>
                                        </div>
                                    ))} */}

                {/* Load More Trigger */}
                {/* <Button variant="outline" className="w-full text-xs h-8 bg-transparent border-dashed">
                                        Load more reviews
                                    </Button>
                                </div>
                             </ScrollArea>

                        </Card>
                    ) : null}
                </div> */}

                {/* 3. Deep Dive Promo (Permanent) */}
                <div className="mt-auto animate-in fade-in duration-500">
                    <Card className="p-8 border-none shadow-xl bg-[#0F172A] text-white rounded-3xl relative overflow-hidden group">
                        <div className="relative z-10 space-y-4">
                            <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-2">
                                <Search className="h-5 w-5 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold">Deep Dive?</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Select a category on the left to see detailed owner reviews and real-world experiences.
                            </p>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-4 -right-4 opacity-10">
                            <div className="flex gap-2">
                                <div className="h-24 w-24 rounded-full bg-white blur-xl"></div>
                                <div className="h-32 w-32 rounded-full bg-blue-500 blur-xl"></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Helpers
function getScoreColor(score: number) {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-yellow-600";
    return "text-red-500";
}

function getIconColorBg(score: number) {
    if (score >= 4) return "bg-green-50 text-green-600 dark:bg-green-900/20";
    if (score >= 3) return "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20";
    return "bg-red-50 text-red-500 dark:bg-red-900/20";
}

function getCategoryIcon(label: string) {
    const iconClass = "h-5 w-5";
    if (label.includes("Build")) return <ShieldCheck className={iconClass} />;
    if (label.includes("Features")) return <Zap className={iconClass} />;
    if (label.includes("Sales")) return <Search className={iconClass} />;
    if (label.includes("Reliability")) return <CheckCircle2 className={iconClass} />;
    if (label.includes("Performance")) return <TrendingUp className={iconClass} />;
    if (label.includes("Comfort")) return <ThumbsUp className={iconClass} />;
    return <Star className={iconClass} />;
}

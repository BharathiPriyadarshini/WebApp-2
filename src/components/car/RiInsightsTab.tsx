import React, { useState } from 'react';
import {
    Star,
    ShieldCheck,
    ThumbsUp,
    MessageSquare,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Zap,
    Search,
    X,
    ThumbsDown,
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface RiInsightsTabProps {
    data: any;
}

const ALL_REVIEWS: Record<string, any[]> = {
    "Build Quality & Safety": [
        { id: 101, title: "Solid Build", text: "The door thud feels very premium. Gives a sense of safety.", user: "Amit K.", sentiment: "positive", likes: 45, date: "3d ago" },
        { id: 102, title: "Panel Gaps", text: "Noticed some uneven panel gaps near the bonnet.", user: "Vikram R.", sentiment: "negative", likes: 12, date: "1mo ago" },
        { id: 103, title: "Paint Quality", text: "Paint finish is excellent, very glossy.", user: "Sneha G.", sentiment: "positive", likes: 8, date: "2w ago" },
        { id: 104, title: "Rust Concerns", text: "Slight rust on door edges after 2 years.", user: "Manish T.", sentiment: "negative", likes: 23, date: "3w ago" },
        { id: 105, title: "Frame Rigidity", text: "Feels very rigid on bumpy roads, great safety.", user: "Kavya L.", sentiment: "positive", likes: 67, date: "4d ago" },
        { id: 106, title: "Airbag System", text: "6 airbags standard, very reassuring for family.", user: "Ravi M.", sentiment: "positive", likes: 91, date: "1w ago" },
    ],
    "Features & Tech": [
        { id: 201, title: "Touchscreen Lag", text: "The infotainment system freezes occasionally.", user: "Rohan D.", sentiment: "negative", likes: 56, date: "5d ago" },
        { id: 202, title: "Sound System", text: "Speakers are absolute blast! Bass is punchy.", user: "Karthik", sentiment: "positive", likes: 89, date: "1w ago" },
        { id: 203, title: "Wireless Charging", text: "Works flawlessly, one of the best features.", user: "Nisha P.", sentiment: "positive", likes: 44, date: "2w ago" },
        { id: 204, title: "ADAS Reliability", text: "Lane assist is a bit oversensitive on highways.", user: "Suresh K.", sentiment: "negative", likes: 31, date: "3d ago" },
    ],
    "Comfort & Interiors": [
        { id: 301, title: "Plush Seating", text: "Long drives are a breeze, seats are very supportive.", user: "Anjali P.", sentiment: "positive", likes: 120, date: "2d ago" },
        { id: 302, title: "Back Seat", text: "Rear legroom is tight for tall passengers.", user: "Deepak S.", sentiment: "neutral", likes: 34, date: "3w ago" },
        { id: 303, title: "Climate Control", text: "Dual zone AC works brilliantly even in peak summer.", user: "Pooja R.", sentiment: "positive", likes: 78, date: "1w ago" },
        { id: 304, title: "Noise Insulation", text: "Wind noise creeps in above 100 kmph.", user: "Arjun V.", sentiment: "negative", likes: 19, date: "5d ago" },
    ],
};

const getMockReviews = (category: string, limit?: number) => {
    const reviews = ALL_REVIEWS[category] || [
        { id: 1, title: "Great experience so far", text: "Really impressed with how this handles daily usage.", user: "Rahul M.", sentiment: "positive", likes: 15, date: "2d ago" },
        { id: 2, title: "Could be better", text: "Expected more based on the price point.", user: "Priya S.", sentiment: "negative", likes: 7, date: "1w ago" },
    ];
    return limit ? reviews.slice(0, limit) : reviews;
};

// ── Review Modal ──
function ReviewModal({ category, score, onClose }: { category: string; score: number; onClose: () => void }) {
    const reviews = getMockReviews(category);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border animate-in slide-in-from-bottom-6 fade-in duration-300 overflow-hidden">
                <div className="flex items-start justify-between p-6 border-b border-border">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Detailed Reviews</p>
                        <h3 className="text-lg font-bold text-foreground">{category}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-xl font-bold ${getScoreColor(score)}`}>{score}</span>
                        <button
                            onClick={onClose}
                            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    {reviews.map((review, i) => (
                        <div
                            key={review.id}
                            className="p-4 rounded-2xl border border-border bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <p className="font-semibold text-foreground text-sm">{review.title}</p>
                                {review.sentiment === 'positive' ? (
                                    <ThumbsUp className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                                ) : review.sentiment === 'negative' ? (
                                    <ThumbsDown className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                                ) : (
                                    <MessageSquare className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                                )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">"{review.text}"</p>
                            <div className="flex items-center justify-between text-[10px] text-gray-400">
                                <span className="font-medium">{review.user}</span>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {review.likes}</span>
                                    <span>{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-6 pb-6 pt-2">
                    <Button className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm">
                        Load More Reviews
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ── Main Component ──
export function RiInsightsTab({ data }: RiInsightsTabProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Build Quality & Safety");
    const [modalCategory, setModalCategory] = useState<string | null>(null);

    const modalCategoryData = modalCategory
        ? data.categoryRatings.find((c: any) => c.label === modalCategory)
        : null;

    return (
        <>
            <div className="py-6 animate-in fade-in duration-500 space-y-8">

                {/* ── Header & Stats ── */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-1 flex items-center gap-1">
                        ri<span className="text-blue-500 font-normal">Sights</span>
                    </h2>
                    <p className="text-gray-500 mb-6">Intelligence from real experiences</p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
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

                {/* ── Ownership Confidence ── */}
                <div className="bg-blue-100 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-3xl p-6 relative overflow-hidden">
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
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                        <ShieldCheck className="h-64 w-64 text-blue-600" />
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════
                    STRICT 2×2 GRID — no divider lines
                    Row 1: Detailed Breakdown  |  What Users Say
                    Row 2: Overall             |  Deep Dive
                    ══════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-0">

                    {/* ── ROW 1 LEFT: Detailed Breakdown ── */}
                    <div className="pb-8 pr-6 space-y-3">
                        <h3 className="text-lg font-bold text-foreground">Detailed Breakdown</h3>

                        {data.categoryRatings.map((cat: any, idx: number) => {
                            const isOpen = selectedCategory === cat.label;
                            const previewReviews = getMockReviews(cat.label, 2);

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedCategory(isOpen ? null : cat.label)}
                                    className={`rounded-2xl border bg-card transition-all cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 ${
                                        isOpen ? 'border-blue-400 dark:border-blue-600 shadow-sm' : 'border-border'
                                    }`}
                                >
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-foreground text-sm">{cat.label}</h4>
                                                {cat.subLabel && (
                                                    <p className="text-xs text-gray-500 mt-0.5 truncate">{cat.subLabel}</p>
                                                )}
                                            </div>
                                            <span className={`text-sm font-bold shrink-0 ${getScoreColor(cat.score)}`}>
                                                {cat.score}
                                            </span>
                                        </div>

                                        {isOpen && (
                                            <div
                                                className="mt-3 pt-3 border-t border-border space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {previewReviews.map((review: any) => (
                                                    <div key={review.id} className="text-sm">
                                                        <p className="font-semibold text-foreground text-xs">{review.title}</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">"{review.text}"</p>
                                                        <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                                                            <span>{review.user}</span>
                                                            <span>{review.date}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-xs h-7 bg-transparent border-dashed hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 dark:hover:bg-blue-900/20 transition-colors"
                                                    onClick={() => setModalCategory(cat.label)}
                                                >
                                                    Load more
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── ROW 1 RIGHT: What Users Say ── */}
                    <div className="pb-8 pl-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-foreground">What Users Say</h3>
                            <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">View all</Button>
                        </div>

                        <Tabs defaultValue="positives" className="w-full">
                            <TabsList className="w-full grid grid-cols-2 bg-muted rounded-xl p-1 h-10 mb-4">
                                <TabsTrigger
                                    value="positives"
                                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-blue-600 data-[state=active]:shadow-sm text-muted-foreground font-medium h-8 text-sm"
                                >
                                    Positives
                                </TabsTrigger>
                                <TabsTrigger
                                    value="negatives"
                                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-red-500 data-[state=active]:shadow-sm text-muted-foreground font-medium h-8 text-sm"
                                >
                                    Negatives
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="positives" className="space-y-2">
                                {data.userFeedback.positives.slice(0, 10).map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item}</span>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="negatives" className="space-y-2">
                                {data.userFeedback.negatives.slice(0, 10).map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item}</span>
                                    </div>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* ── ROW 2 LEFT: Overall ── */}
                    <div className="pt-8 pr-6">
                        <Card className="p-6 border-none shadow-xl bg-card rounded-3xl flex flex-col gap-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">OVERALL</p>
                                    <div className="text-6xl font-bold text-foreground tracking-tighter leading-none">
                                        {data.overallRating}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 mt-1">
                                    <div className="flex text-blue-600 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${
                                                    i < Math.round(data.overallRating)
                                                        ? 'fill-blue-600 text-blue-600'
                                                        : 'fill-gray-200 text-gray-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium">Verified Owners</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-muted rounded-2xl p-4 flex flex-col gap-1.5 border border-border">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Recommend</span>
                                    <span className="text-2xl font-bold text-green-600">{data.recommendationPercent}%</span>
                                </div>
                                <div className="bg-muted rounded-2xl p-4 flex flex-col gap-1.5 border border-border">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Confidence</span>
                                    <Badge
                                        className={`h-6 w-fit ${
                                            data.ownershipConfidence.level === 'High'
                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                : 'bg-blue-400 hover:bg-blue-500'
                                        } text-[10px] px-3 rounded-full font-bold uppercase tracking-wide border-none`}
                                    >
                                        {data.ownershipConfidence.level}
                                    </Badge>
                                </div>
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Compare Variants
                            </Button>
                        </Card>
                    </div>

                    {/* ── ROW 2 RIGHT: Deep Dive ── */}
                    <div className="pt-8 pl-6">
                        <Card className="p-8 border-none shadow-xl bg-[#0F172A] text-white rounded-3xl relative overflow-hidden h-full">
                            <div className="relative z-10 flex flex-col gap-4 h-full">
                                <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                    <Search className="h-5 w-5 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold">Deep Dive?</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Select a category on the left to see detailed owner reviews and real-world experiences.
                                </p>

                                {selectedCategory && (
                                    <div className="mt-auto pt-4 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest">Currently Viewing</p>
                                        <p className="text-sm text-white font-semibold mt-1">{selectedCategory}</p>
                                    </div>
                                )}
                            </div>

                            <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none">
                                <div className="flex gap-2">
                                    <div className="h-24 w-24 rounded-full bg-white blur-xl" />
                                    <div className="h-32 w-32 rounded-full bg-blue-500 blur-xl" />
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

            {/* ── Review Modal ── */}
            {modalCategory && modalCategoryData && (
                <ReviewModal
                    category={modalCategory}
                    score={modalCategoryData.score}
                    onClose={() => setModalCategory(null)}
                />
            )}
        </>
    );
}

function getScoreColor(score: number) {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-yellow-600";
    return "text-red-500";
}
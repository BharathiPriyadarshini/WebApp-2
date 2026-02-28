import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Star,
    ShieldCheck,
    ThumbsUp,
    MessageSquare,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Zap,
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

// ── All mock reviews ──────────────────────────────────────────────────────
const ALL_REVIEWS: Record<string, any[]> = {
    "Build Quality & Safety": [
        { id: 101, title: "Solid Build", text: "The door thud feels very premium. Gives a real sense of safety on the road.", sentiment: "positive", likes: 45, dislikes: 3 },
        { id: 102, title: "Panel Gaps", text: "Noticed some uneven panel gaps near the bonnet after a few months of ownership.", sentiment: "negative", likes: 12, dislikes: 8 },
        { id: 103, title: "Paint Quality", text: "Paint finish is excellent, very glossy and holds up well against minor scratches.", sentiment: "positive", likes: 8, dislikes: 1 },
        { id: 104, title: "Rust Concerns", text: "Slight rust started appearing on door edges after about two years of use.", sentiment: "negative", likes: 23, dislikes: 5 },
        { id: 105, title: "Frame Rigidity", text: "Feels very rigid on bumpy roads. The chassis absorbs impact well and inspires confidence.", sentiment: "positive", likes: 67, dislikes: 2 },
        { id: 106, title: "Airbag System", text: "Having 6 airbags as standard is very reassuring, especially for long family trips.", sentiment: "positive", likes: 91, dislikes: 1 },
        { id: 107, title: "Seatbelt Quality", text: "Seatbelts feel sturdy and reliable even at high speeds on the highway.", sentiment: "positive", likes: 34, dislikes: 0 },
        { id: 108, title: "Bumper Build", text: "Bumper cracked after a minor tap in parking. Expected better quality at this price.", sentiment: "negative", likes: 19, dislikes: 4 },
        { id: 109, title: "Underbody Protection", text: "Good underbody cladding for rough Indian roads. No scraping even on broken patches.", sentiment: "positive", likes: 28, dislikes: 2 },
        { id: 110, title: "Door Hinges", text: "Door hinges started squeaking after about 6 months of use. Needs attention.", sentiment: "negative", likes: 14, dislikes: 3 },
        { id: 111, title: "Windshield Quality", text: "Windshield is thick enough — no vibration or noise at highway speeds.", sentiment: "positive", likes: 22, dislikes: 1 },
        { id: 112, title: "Crash Test", text: "5-star safety rating gives real confidence when driving with family.", sentiment: "positive", likes: 55, dislikes: 0 },
    ],
    "Features & Tech": [
        { id: 201, title: "Touchscreen Lag", text: "The infotainment system freezes occasionally, especially when using maps and music together.", sentiment: "negative", likes: 56, dislikes: 7 },
        { id: 202, title: "Sound System", text: "Speakers are an absolute blast! Bass is punchy and mids are clean.", sentiment: "positive", likes: 89, dislikes: 4 },
        { id: 203, title: "Wireless Charging", text: "Works flawlessly every single time. One of the best features in this segment.", sentiment: "positive", likes: 44, dislikes: 2 },
        { id: 204, title: "ADAS Reliability", text: "Lane assist is a bit oversensitive on highways with painted road markings.", sentiment: "negative", likes: 31, dislikes: 9 },
        { id: 205, title: "OTA Updates", text: "OTA updates feel like getting a new car every few months. Keeps things fresh.", sentiment: "positive", likes: 62, dislikes: 1 },
        { id: 206, title: "Voice Assistant", text: "Voice commands work well even in noisy city traffic conditions.", sentiment: "positive", likes: 37, dislikes: 3 },
    ],
    "Comfort & Interiors": [
        { id: 301, title: "Plush Seating", text: "Long drives are a breeze — seats are very supportive and don't cause fatigue.", sentiment: "positive", likes: 120, dislikes: 3 },
        { id: 302, title: "Back Seat", text: "Rear legroom is tight for tall passengers above 6 feet. Could be better.", sentiment: "neutral", likes: 34, dislikes: 12 },
        { id: 303, title: "Climate Control", text: "Dual zone AC works brilliantly even in peak summer. Cools down fast.", sentiment: "positive", likes: 78, dislikes: 2 },
        { id: 304, title: "Noise Insulation", text: "Wind noise creeps in above 100 kmph. The cabin could be better insulated.", sentiment: "negative", likes: 19, dislikes: 6 },
        { id: 305, title: "Sunroof Quality", text: "Panoramic sunroof gives a brilliant open-air feel on evening drives.", sentiment: "positive", likes: 95, dislikes: 1 },
        { id: 306, title: "Dashboard Feel", text: "Dashboard materials feel premium and well-stitched throughout.", sentiment: "positive", likes: 41, dislikes: 2 },
    ],
};

const DEFAULT_REVIEWS = [
    { id: 1, title: "Great experience so far", text: "Really impressed with how this handles daily usage in city conditions.", sentiment: "positive", likes: 15, dislikes: 2 },
    { id: 2, title: "Could be better", text: "Expected more based on the price point. Some features feel half-baked.", sentiment: "negative", likes: 7, dislikes: 4 },
    { id: 3, title: "Good overall", text: "Solid choice for the segment, no major complaints after 8 months.", sentiment: "positive", likes: 11, dislikes: 1 },
    { id: 4, title: "Service concerns", text: "Service centre availability is limited in smaller cities.", sentiment: "negative", likes: 9, dislikes: 2 },
    { id: 5, title: "Value for money", text: "The features offered at this price point are genuinely unbeatable.", sentiment: "positive", likes: 33, dislikes: 0 },
    { id: 6, title: "Fuel efficiency", text: "Getting around 16–17 kmpl in mixed city and highway conditions.", sentiment: "positive", likes: 47, dislikes: 1 },
];

const getAllReviews = (category: string) =>
    ALL_REVIEWS[category] || DEFAULT_REVIEWS;

// ── Vote state per review ─────────────────────────────────────────────────
type VoteMap = Record<number, 'liked' | 'disliked' | null>;

// ── Single review card — plain text, no author, functional like/dislike ───
function ReviewCard({
    review,
    vote,
    onVote,
}: {
    review: any;
    vote: 'liked' | 'disliked' | null;
    onVote: (id: number, action: 'liked' | 'disliked') => void;
}) {
    const liked = vote === 'liked';
    const disliked = vote === 'disliked';

    return (
        <div className="py-4">
            {/* Title */}
            <p className="text-sm font-semibold text-foreground mb-1.5">{review.title}</p>

            {/* Review text — no box, no border, just text */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {review.text}
            </p>

            {/* Functional like / dislike */}
            <div className="flex items-center gap-5 mt-3">
                <button
                    onClick={() => onVote(review.id, 'liked')}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked
                            ? 'text-green-600 dark:text-green-500'
                            : 'text-muted-foreground hover:text-green-600 dark:hover:text-green-500'
                        }`}
                >
                    <ThumbsUp className={`h-3.5 w-3.5 transition-all ${liked ? 'fill-green-600 dark:fill-green-500 scale-110' : ''}`} />
                    <span>{review.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                    onClick={() => onVote(review.id, 'disliked')}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${disliked
                            ? 'text-red-500'
                            : 'text-muted-foreground hover:text-red-500'
                        }`}
                >
                    <ThumbsDown className={`h-3.5 w-3.5 transition-all ${disliked ? 'fill-red-500 scale-110' : ''}`} />
                    <span>{review.dislikes + (disliked ? 1 : 0)}</span>
                </button>
            </div>
        </div>
    );
}

// ── Review Modal — plain list, infinity scroll, no load more button ───────
function ReviewModal({
    category,
    score,
    onClose,
}: {
    category: string;
    score: number;
    onClose: () => void;
}) {
    const allReviews = getAllReviews(category);
    const PAGE_SIZE = 3;

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [votes, setVotes] = useState<VoteMap>({});
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

    const hasMore = visibleCount < allReviews.length;
    const visibleReviews = allReviews.slice(0, visibleCount);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + PAGE_SIZE, allReviews.length));
            setLoading(false);
        }, 500);
    }, [loading, hasMore, allReviews.length]);

    // IntersectionObserver for infinity scroll
    useEffect(() => {
        const sentinel = loaderRef.current;
        const root = scrollRef.current;
        if (!sentinel || !root) return;

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) loadMore(); },
            { root, threshold: 0.1 }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

    const handleVote = (id: number, action: 'liked' | 'disliked') => {
        setVotes(prev => ({
            ...prev,
            [id]: prev[id] === action ? null : action,
        }));
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border animate-in slide-in-from-bottom-6 fade-in duration-300 overflow-hidden flex flex-col max-h-[82vh]">

                {/* Modal header */}
                <div className="flex items-start justify-between px-6 pt-6 pb-4 flex-shrink-0">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Reviews</p>
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

                {/* Scrollable list — no dividers between review items, no author */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-6 pb-6"
                >
                    {visibleReviews.map((review, i) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            vote={votes[review.id] ?? null}
                            onVote={handleVote}
                        />
                    ))}

                    {/* Infinity scroll sentinel */}
                    <div ref={loaderRef} className="h-2" />

                    {loading && (
                        <div className="flex justify-center py-4">
                            <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                        </div>
                    )}

                    {!hasMore && visibleReviews.length > 0 && (
                        <p className="text-center text-xs text-muted-foreground py-4">
                            All {allReviews.length} reviews loaded
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────
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
                <div className="bg-[#8B9FEE] dark:bg-[#8B9FEE]/10 border border-[#8B9FEE] rounded-3xl p-6 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-white font-semibold mb-3">Ownership Confidence</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-card p-2 rounded-xl shadow-sm border border-white/30 flex items-center gap-2 px-4">
                                <ShieldCheck className="h-5 w-5 text-white" />
                                <span className="font-bold text-lg text-foreground">
                                    {data.ownershipConfidence.level}
                                </span>
                            </div>
                        </div>
                        <p className="text-white/80 italic text-sm">
                            {data.ownershipConfidence.description}
                        </p>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                        <ShieldCheck className="h-64 w-64 text-blue-600" />
                    </div>
                </div>
                {/* ── 2-column layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* ── LEFT: Detailed Breakdown ── */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-foreground">Detailed Breakdown</h3>

                        {data.categoryRatings.map((cat: any, idx: number) => {
                            const isOpen = selectedCategory === cat.label;
                            const previewReviews = getAllReviews(cat.label).slice(0, 2);

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedCategory(isOpen ? null : cat.label)}
                                    className={`rounded-2xl border bg-card transition-all cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 ${isOpen ? 'border-blue-400 dark:border-blue-600 shadow-sm' : 'border-border'
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
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">"{review.text}"</p>
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

                    {/* ── RIGHT: What Users Say ── */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-foreground mb-3">What Users Say</h3>

                        <Tabs defaultValue="positives" className="w-full flex flex-col flex-1">
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

                            <TabsContent value="positives" className="space-y-2 flex-1">
                                {data.userFeedback.positives.slice(0, 10).map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item}</span>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="negatives" className="space-y-2 flex-1">
                                {data.userFeedback.negatives.slice(0, 10).map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item}</span>
                                    </div>
                                ))}
                            </TabsContent>
                        </Tabs>

                        {/* View All — at the bottom */}
                        <div className="mt-4 pt-4 border-t border-border">
                            <Button
                                variant="outline"
                                className="w-full h-9 rounded-xl text-sm font-medium text-blue-600 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 transition-colors"
                            >
                                View all reviews
                            </Button>
                        </div>
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
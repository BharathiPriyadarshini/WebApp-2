import type { InsightType } from "@/components/car/InsightBadge";
import type { Car as BaseCar } from "@/components/car/CarCard";

export interface InsightData {
    overallRating: number;
    recommendationPercent: number;
    mostMentioned: string;
    topAdvantage: string;
    ownershipConfidence: {
        level: 'Low' | 'Moderate' | 'High';
        description: string;
    };
    categoryRatings: {
        label: string;
        score: number;
        subLabel?: string;
    }[];
    userFeedback: {
        positives: string[];
        negatives: string[];
    };
}

export interface SafetyRatingData {
    globalNcap: { adult: number; child: number };
    bharatNcap: { status: string; adult: number; child: number };
}

export interface EnrichedCar extends BaseCar {
    horsepower: number;
    torque: string;
    acceleration: string;
    transmission?: string;
    colors: string[];
    description: string;
    safetyRatings: SafetyRatingData;
    features: string[];
    insights: { type: InsightType; label: string }[];
    riInsights: InsightData;
    gallery: {
        exterior: string[];
        interior: string[];
    };
}
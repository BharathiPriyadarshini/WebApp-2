
import React from 'react';
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export type InsightType = 'positive' | 'neutral' | 'negative';

interface InsightBadgeProps {
    type: InsightType;
    label: string;
    className?: string;
}

export function InsightBadge({ type, label, className }: InsightBadgeProps) {
    const config = {
        positive: {
            icon: ArrowUp,
            className: "bg-green-100 text-green-700 hover:bg-green-200 border-transparent dark:bg-green-900/30 dark:text-green-400",
        },
        neutral: {
            icon: Minus,
            className: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-transparent dark:bg-blue-900/30 dark:text-blue-400",
        },
        negative: {
            icon: ArrowDown,
            className: "bg-red-100 text-red-700 hover:bg-red-200 border-transparent dark:bg-red-900/30 dark:text-red-400",
        },
    };

    const { icon: Icon, className: styleClass } = config[type];

    return (
        <Badge
            variant="outline"
            className={cn(
                "gap-1.5 py-1 px-3 text-sm font-medium rounded-full cursor-default select-none border-none shadow-sm",
                styleClass,
                className
            )}
        >
            <Icon className="h-3.5 w-3.5 stroke-[2.5px]" />
            <span>{label}</span>
        </Badge>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useAnswersStore } from "@/store/answersStore";
import { PreviousAnswer, RecommendationResponse } from "@/types";
import CarCard from "@/components/questions/CarCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, ArrowLeft, SlidersHorizontal, Sparkles, RotateCcw, X, Check, Edit2, ChevronDown, ChevronUp } from "lucide-react";

// Component to edit a single answer inline
function AnswerEditor({
  answer,
  onUpdate,
  onRemove,
  onClose
}: {
  answer: PreviousAnswer;
  onUpdate: (newAnswer: string | number) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState(String(answer.answer));

  const handleSave = () => {
    if (value.trim()) {
      onUpdate(value.trim());
      onClose();
    }
  };

  return (
    <div className="p-4 rounded-xl glass border border-primary/30 space-y-3 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium flex-1">{answer.question}</p>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {answer.answerType === "option" && answer.options && answer.options.length > 0 ? (
        <div className="grid gap-2 max-h-48 overflow-y-auto">
          {answer.options.map((option, idx) => {
            const optionKey = typeof option === 'string' ? option : option.key;
            const optionValue = typeof option === 'string' ? option : option.value;

            return (
              <button
                key={`${optionKey}-${idx}`}
                onClick={() => {
                  onUpdate(optionValue || optionKey);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${(optionValue || optionKey) === answer.answer
                    ? "bg-primary/20 border-primary text-foreground"
                    : "bg-muted/50 border-border hover:border-primary/50 hover:bg-primary/10"
                  }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm">{optionValue || optionKey}</span>
                  {(optionValue || optionKey) === answer.answer && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleSave} size="icon" className="shrink-0">
            <Check className="w-4 h-4" />
          </Button>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/50"
      >
        <X className="w-4 h-4 mr-2" />
        Remove this filter
      </Button>
    </div>
  );
}

export default function RecommendationsPage() {
  const router = useRouter();
  const storeAnswers = useAnswersStore((state) => state.answers);
  const setStoreAnswers = useAnswersStore((state) => state.setAnswers);
  const updateStoreAnswer = useAnswersStore((state) => state.updateAnswer);
  const removeStoreAnswer = useAnswersStore((state) => state.removeAnswer);
  const resetStore = useAnswersStore((state) => state.reset);

  const [isHydrated, setIsHydrated] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { mutate: fetchRecs, isPending, error } = useRecommendations();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (storeAnswers.length === 0) {
      router.push("/");
      return;
    }

    fetchRecs(storeAnswers, {
      onSuccess: (data) => {
        console.log("Recommendations received:", data);
        setRecommendations(data);
      },
      onError: (err) => {
        console.error("Failed to fetch recommendations:", err);
      },
    });
  }, [isHydrated, storeAnswers, fetchRecs, router]);

  const handleRefine = () => {
    router.push("/refine");
  };

  const handleStartOver = () => {
    resetStore();
    router.push("/explore");
  };

  const handleUpdateAnswer = (index: number, newAnswer: string | number) => {
    updateStoreAnswer(index, { answer: newAnswer });
    setEditingIndex(null);
    const updatedAnswers = [...storeAnswers];
    updatedAnswers[index] = { ...updatedAnswers[index], answer: newAnswer };
    fetchRecs(updatedAnswers, {
      onSuccess: (data) => {
        setRecommendations(data);
      },
    });
  };

  const handleRemoveAnswer = (questionId: string) => {
    removeStoreAnswer(questionId);
    setEditingIndex(null);
    const newAnswers = storeAnswers.filter(a => a.questionId !== questionId);
    if (newAnswers.length === 0) {
      router.push("/explore");
      return;
    }
    setStoreAnswers(newAnswers);
    fetchRecs(newAnswers, {
      onSuccess: (data) => {
        setRecommendations(data);
      },
    });
  };

  if (!isHydrated || (isPending && !recommendations)) {
    return (
      <div className="min-h-screen relative overflow-hidden noise-overlay flex items-center justify-center">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-6 glow-primary">
            <Car className="w-8 h-8 text-primary-foreground animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Finding Your Perfect Match</h2>
          <p className="text-muted-foreground">Analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden noise-overlay flex items-center justify-center p-6">
        <Card className="max-w-md glass border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
            <CardDescription>
              {error instanceof Error ? error.message : "Failed to fetch recommendations"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleStartOver} className="w-full">
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden noise-overlay">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 min-h-screen px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Car className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">rimello</span>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Your <span className="text-gradient">Perfect Matches</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Based on your preferences, here are our top recommendations.
          </p>
          <p className="text-sm text-muted-foreground">
            Found <span className="text-primary font-semibold">{recommendations?.totalResults || 0}</span> matching {recommendations?.totalResults === 1 ? "vehicle" : "vehicles"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters ({storeAnswers.length})
          </Button>
          <Button
            onClick={handleRefine}
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 glow-primary"
          >
            <Sparkles className="w-4 h-4" />
            Add More Criteria
          </Button>
          <Button
            onClick={handleStartOver}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>

        {/* Collapsible Filters Section */}
        {isFilterOpen && (
          <div className="max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-4 rounded-xl glass border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Your Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>

              {isPending && (
                <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-primary">Updating recommendations...</span>
                </div>
              )}

              <div className="space-y-2">
                {storeAnswers.map((ans, idx) => (
                  <div key={ans.questionId}>
                    {editingIndex === idx ? (
                      <AnswerEditor
                        answer={ans}
                        onUpdate={(newAnswer) => handleUpdateAnswer(idx, newAnswer)}
                        onRemove={() => handleRemoveAnswer(ans.questionId)}
                        onClose={() => setEditingIndex(null)}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border group hover:border-primary/30 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground truncate">{ans.question}</p>
                          <p className="text-sm font-medium truncate">{String(ans.answer)}</p>
                        </div>
                        <button
                          onClick={() => setEditingIndex(idx)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {recommendations && recommendations.recommendations && recommendations.recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {recommendations.recommendations.map((car, index) => (
              <div
                key={car._id || `car-${index}`}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="max-w-lg mx-auto glass border-border">
            <CardHeader className="text-center">
              <CardTitle>No Matches Found</CardTitle>
              <CardDescription>
                We couldn&apos;t find any cars matching your criteria. Try refining your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleRefine} className="w-full">
                Refine Your Preferences
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

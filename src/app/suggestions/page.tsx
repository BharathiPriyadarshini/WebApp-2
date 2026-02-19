"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Car, ArrowLeft } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";
import { useNextQuestion } from "@/hooks/useQuestions";
import { useAnswersStore } from "@/store/answersStore";
import { QuestionResponse } from "@/types";

import QuestionCard from "@/components/questions/QuestionCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/* ================= Skeleton ================= */

function QuestionSkeleton() {
  return (
    <Card className="glass border border-primary/30 glow-primary animate-pulse">
      <CardHeader className="space-y-3 pb-4">
        <div className="h-4 w-24 bg-primary/20 rounded" />
        <div className="space-y-2">
          <div className="h-6 w-full bg-muted rounded" />
          <div className="h-6 w-3/4 bg-muted rounded" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-14 w-full bg-muted/50 rounded-xl" />
        <div className="h-14 w-full bg-muted/50 rounded-xl" />
        <div className="h-14 w-full bg-muted/50 rounded-xl" />
      </CardContent>
    </Card>
  );
}

/* ================= Page ================= */

export default function SuggestionsPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const { answers, maxQuestions, addAnswer } = useAnswersStore();

  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionResponse | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { mutate: fetchQuestion, isPending, error } = useNextQuestion();

  /* ================= Auth Protection ================= */

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  /* ================= Load Question ================= */

  const loadNextQuestion = useCallback(() => {
    const currentAnswers = useAnswersStore.getState().answers;

    if (currentAnswers.length >= maxQuestions) return;

    setIsTransitioning(true);
    setShowSkeleton(true);

    fetchQuestion(currentAnswers, {
      onSuccess: (question) => {
        setTimeout(() => {
          setCurrentQuestion(question);
          setIsTransitioning(false);
          setShowSkeleton(false);
        }, 400);
      },
      onError: () => {
        setIsTransitioning(false);
        setShowSkeleton(false);
      },
    });
  }, [maxQuestions, fetchQuestion]);

  useEffect(() => {
    if (!user) return;

    if (maxQuestions === 0) {
      router.push("/");
      return;
    }

    loadNextQuestion();
  }, [user]);

  /* ================= Handle Answer ================= */

  const handleAnswer = (
    answer: string | number | (string | number)[]
  ) => {
    if (!currentQuestion) return;

    setShowSkeleton(true);
    setIsTransitioning(true);

    addAnswer({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer,
      answerType: currentQuestion.answerType,
      options: currentQuestion.options,
    });

    const updatedCount = answers.length + 1;
    const reachedLimit = updatedCount >= maxQuestions;

    if (reachedLimit || currentQuestion.isFinal) {
      setTimeout(() => {
        router.push("/recommendations");
      }, 500);
      return;
    }

    setCurrentQuestion(null);

    setTimeout(() => {
      loadNextQuestion();
    }, 100);
  };

  if (!user) return null; // Prevent UI flash before redirect

  const currentStep = answers.length + 1;
  const progress = (answers.length / maxQuestions) * 100;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen relative overflow-hidden noise-overlay">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[80px]" />

      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Car className="w-4 h-4 text-primary-foreground" />
            </div>
            {/* <span className="font-semibold tracking-tight">
              rimello
            </span> */}
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-xl mx-auto w-full mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Question {Math.min(currentStep, maxQuestions)} of{" "}
              {maxQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% complete
            </span>
          </div>

          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xl">
            {showSkeleton && <QuestionSkeleton />}

            {!showSkeleton && currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                isLoading={isPending}
                disabled={isPending}
              />
            )}

            {error && !isPending && (
              <div className="p-6 rounded-2xl border border-destructive/30 text-center mt-6">
                <h3 className="font-semibold text-destructive mb-2">
                  Something went wrong
                </h3>
                <button
                  onClick={() => loadNextQuestion()}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

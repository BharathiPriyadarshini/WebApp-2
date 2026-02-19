import { QuestionResponse } from "@/types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Send, Check } from "lucide-react";

interface QuestionCardProps {
  question: QuestionResponse;
  onAnswer: (answer: string | number | (string | number)[]) => void;
  isLoading?: boolean;
  disabled?: boolean;
  selectedAnswer?: string | number | (string | number)[];
  orderLabel?: string;
}

export default function QuestionCard({
  question,
  onAnswer,
  isLoading,
  disabled = false,
  selectedAnswer,
  orderLabel,
}: QuestionCardProps) {
  const [textAnswer, setTextAnswer] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>([]);

  // Initialize selectedOptions from selectedAnswer if available (for editing/refining)
  useEffect(() => {
    if (question.answerType === "multi_choice") {
      if (Array.isArray(selectedAnswer)) {
        setSelectedOptions(selectedAnswer);
      } else if (selectedAnswer) {
        setSelectedOptions([selectedAnswer]);
      } else {
        setSelectedOptions([]);
      }
    }
  }, [question.id, selectedAnswer, question.answerType]);

  const handleSubmitText = () => {
    if (textAnswer.trim() && !disabled) {
      onAnswer(textAnswer.trim());
    }
  };

  const toggleOption = (value: string | number) => {
    if (disabled) return;

    setSelectedOptions(prev => {
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleMultiSubmit = () => {
    if (selectedOptions.length > 0 && !disabled) {
      onAnswer(selectedOptions);
    }
  };

  return (
    <Card className={`glass border transition-all duration-300 ${disabled
      ? "border-border"
      : "border-primary/30 glow-primary"
      }`}>
      <CardHeader className="space-y-3 pb-4">
        {orderLabel && (
          <div className="text-xs font-medium uppercase tracking-widest text-primary">
            {orderLabel}
          </div>
        )}
        <CardTitle className="text-xl sm:text-2xl font-semibold leading-tight">
          {question.question}
        </CardTitle>
        {question.context && (
          <CardDescription className="text-sm leading-relaxed">
            {question.context}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {question.answerType === "multi_choice" &&
          question.options &&
          question.options.length > 0 ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              {question.options.map((option, index) => {
                const label = typeof option === "string" ? option : (option.value || option.key);
                // Type guard for Multi-Choice rendering
                const isSelected = selectedOptions.includes(label);

                return (
                  <button
                    key={`mc-${index}`}
                    onClick={() => toggleOption(label)}
                    disabled={isLoading || disabled}
                    className={`relative w-full text-left p-4 rounded-xl border transition-all duration-200 group ${isSelected
                      ? "bg-primary/20 border-primary text-foreground"
                      : disabled
                        ? "bg-muted/30 border-border text-muted-foreground cursor-not-allowed"
                        : "bg-muted/50 border-border hover:border-primary/50 hover:bg-primary/10 text-foreground"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/40"
                          }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-medium">{label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Confirm Button for Multi-Choice */}
            <Button
              onClick={handleMultiSubmit}
              disabled={selectedOptions.length === 0 || isLoading || disabled}
              className="w-full"
            >
              {isLoading ? "Saving..." : "Confirm Selection"}
            </Button>
          </div>
        ) : question.answerType === "single_choice" &&
          question.options &&
          question.options.length > 0 ? (
          <div className="grid gap-2">
            {question.options.map((option, index) => {
              const label = typeof option === "string" ? option : (option.value || option.key);
              // Ensure we are comparing primitives for single choice
              const isSelected = selectedAnswer === label;

              return (
                <button
                  key={`sc-${index}`}
                  onClick={() => onAnswer(label)}
                  disabled={isLoading || disabled}
                  className={`relative w-full text-left p-4 rounded-xl border transition-all duration-200 group ${isSelected
                    ? "bg-primary/20 border-primary text-foreground"
                    : disabled
                      ? "bg-muted/30 border-border text-muted-foreground cursor-not-allowed"
                      : "bg-muted/50 border-border hover:border-primary/50 hover:bg-primary/10 text-foreground"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40"
                        }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : question.answerType === "option" &&
          question.options &&
          question.options.length > 0 ? (
          <div className="grid gap-2">
            {question.options.map((option, index) => {
              const opt = typeof option === "string" ? { key: option, value: option } : option;
              const answerValue = opt.value || opt.key;
              const isSelected = selectedAnswer === answerValue;

              return (
                <button
                  key={`${opt.key || "opt"}-${index}`}
                  onClick={() => onAnswer(answerValue)}
                  disabled={isLoading || disabled}
                  className={`relative w-full text-left p-4 rounded-xl border transition-all duration-200 group ${isSelected
                    ? "bg-primary/20 border-primary text-foreground"
                    : disabled
                      ? "bg-muted/30 border-border text-muted-foreground cursor-not-allowed"
                      : "bg-muted/50 border-border hover:border-primary/50 hover:bg-primary/10 text-foreground"
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">
                      {opt.value || opt.key}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                value={
                  disabled && selectedAnswer !== undefined
                    ? String(selectedAnswer)
                    : textAnswer
                }
                onChange={(e) => setTextAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitText()}
                placeholder="Type your answer..."
                disabled={isLoading || disabled}
                className="h-14 text-base pr-14 bg-muted/50 border-border focus:border-primary"
              />
              <Button
                onClick={handleSubmitText}
                disabled={isLoading || !textAnswer.trim() || disabled}
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            {selectedAnswer !== undefined && disabled && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Check className="w-4 h-4" />
                <span>Answer recorded</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

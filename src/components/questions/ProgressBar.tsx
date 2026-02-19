import { Check } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className="space-y-3">
      {/* Step indicators */}
      <div className="flex items-center justify-between gap-1">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < current;
          const isCurrent = stepNum === current;
          
          return (
            <div key={i} className="flex-1 flex items-center">
              {/* Step dot */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  stepNum
                )}
              </div>
              
              {/* Connector line */}
              {i < total - 1 && (
                <div className="flex-1 h-0.5 mx-1">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCompleted ? "bg-primary" : "bg-muted"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="relative h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Label */}
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Progress</span>
        <span className="font-medium text-foreground">
          {Math.min(current, total)} of {total}
        </span>
      </div>
    </div>
  );
}

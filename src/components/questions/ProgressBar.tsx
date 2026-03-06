"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressBarProps {
  current: number; // 1-based current step
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(((current - 1) / total) * 100, 100);

  return (
    <div className="w-full space-y-3">
      {/* Segment dots row */}
      <div className="flex items-center gap-0 w-full">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          const completed = step < current;
          const active    = step === current;

          return (
            <div key={i} className="flex items-center flex-1 min-w-0">
              {/* Dot */}
              <div className="relative shrink-0">
                <motion.div
                  animate={{
                    scale: active ? 1.15 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold
                    transition-colors duration-300
                    ${completed
                      ? "bg-blue-600 text-white"
                      : active
                      ? "bg-blue-600/20 text-blue-400 border-2 border-blue-500"
                      : "bg-white/4 text-gray-600 border border-white/8"
                    }
                  `}
                >
                  {completed ? <Check className="w-3.5 h-3.5" /> : step}
                </motion.div>
                {/* Active pulse ring */}
                {active && (
                  <span className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
                )}
              </div>

              {/* Connector */}
              {i < total - 1 && (
                <div className="flex-1 h-[2px] mx-1 rounded-full bg-white/6 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: completed ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Thin progress bar */}
      <div className="relative h-[3px] bg-white/6 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #2563eb, #60a5fa)",
          }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600 tracking-wide">Progress</span>
        <span className="font-semibold text-white">
          {Math.min(current, total)}
          <span className="text-gray-600 font-normal"> / {total}</span>
        </span>
      </div>
    </div>
  );
}
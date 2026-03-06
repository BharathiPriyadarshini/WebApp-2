"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, Send } from "lucide-react";

/* ── Types ── */
export interface QuestionOption {
  key: string;
  value?: string;
}

export interface QuestionData {
  id: string;
  question: string;
  context?: string;
  answerType: "single_choice" | "multi_choice" | "option" | "text";
  options?: (string | QuestionOption)[];
  isFinal?: boolean;
}

interface QuestionCardProps {
  question: QuestionData;
  onAnswer: (answer: string | number | (string | number)[]) => void;
  isLoading?: boolean;
  disabled?: boolean;
  selectedAnswer?: string | number | (string | number)[];
  orderLabel?: string;
}

/* ── Option row ── */
function OptionRow({
  label,
  selected,
  multi,
  disabled,
  onClick,
  index,
}: {
  label: string;
  selected: boolean;
  multi: boolean;
  disabled?: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.055, duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.985 }}
      className={`
        group relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl border
        text-left transition-all duration-200 overflow-hidden
        ${selected
          ? "bg-blue-600/10 border-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : disabled
          ? "bg-white/2 border-white/5 opacity-50 cursor-not-allowed"
          : "bg-white/3 border-white/8 hover:bg-blue-600/5 hover:border-blue-500/30 cursor-pointer"
        }
      `}
    >
      {/* Shimmer on selected */}
      {selected && (
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      )}

      {/* Indicator */}
      <span
        className={`
          shrink-0 flex items-center justify-center transition-all duration-200
          ${multi
            ? `w-5 h-5 rounded-[5px] border-2 ${selected ? "bg-blue-500 border-blue-500" : "border-white/20"}`
            : `w-5 h-5 rounded-full border-2 ${selected ? "border-blue-500" : "border-white/20"}`
          }
        `}
      >
        {selected && multi  && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        {selected && !multi && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />}
      </span>

      <span className={`text-sm font-medium leading-snug flex-1 ${selected ? "text-white" : "text-gray-300 group-hover:text-white transition-colors"}`}>
        {label}
      </span>

      {!multi && !selected && (
        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
      )}
    </motion.button>
  );
}

/* ── Main Card ── */
export default function QuestionCard({
  question,
  onAnswer,
  isLoading,
  disabled = false,
  selectedAnswer,
  orderLabel,
}: QuestionCardProps) {
  const [textAnswer, setTextAnswer]       = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Sync multi-choice from external selectedAnswer
  useEffect(() => {
    if (question.answerType === "multi_choice") {
      if (Array.isArray(selectedAnswer)) {
        setSelectedOptions(selectedAnswer.map(String));
      } else if (selectedAnswer) {
        setSelectedOptions([String(selectedAnswer)]);
      } else {
        setSelectedOptions([]);
      }
    }
  }, [question.id, selectedAnswer, question.answerType]);

  const getLabel = (opt: string | QuestionOption) =>
    typeof opt === "string" ? opt : (opt.value || opt.key);

  const toggleOption = (label: string) => {
    if (disabled) return;
    setSelectedOptions((prev) =>
      prev.includes(label) ? prev.filter((o) => o !== label) : [...prev, label]
    );
  };

  const isSingleOrOption =
    question.answerType === "single_choice" || question.answerType === "option";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        {/* Step badge */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white text-[11px] font-bold shadow-[0_0_14px_rgba(59,130,246,0.4)]">
            {orderLabel ?? question.id.replace(/\D/g, "") ?? "?"}
          </span>
          <span className="text-[11px] text-gray-500 uppercase tracking-[0.12em]">
            {question.answerType === "multi_choice"
              ? "Select all that apply"
              : question.answerType === "text"
              ? "Type your answer"
              : "Choose one"}
          </span>
        </div>

        {/* Question text */}
        <h2 className="text-[1.55rem] md:text-3xl font-bold text-white leading-tight tracking-tight mb-2">
          {question.question}
        </h2>

        {question.context && (
          <p className="text-sm text-gray-500 leading-relaxed mt-2">
            {question.context}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.07] mb-6" />

      {/* ── Single / Option ── */}
      {isSingleOrOption && question.options && (
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt, i) => {
            const label = getLabel(opt);
            return (
              <OptionRow
                key={label}
                label={label}
                selected={selectedAnswer === label}
                multi={false}
                disabled={isLoading || disabled}
                onClick={() => !disabled && !isLoading && onAnswer(label)}
                index={i}
              />
            );
          })}
        </div>
      )}

      {/* ── Multi choice ── */}
      {question.answerType === "multi_choice" && question.options && (
        <div className="flex flex-col gap-2.5">
          {question.options.map((opt, i) => {
            const label = getLabel(opt);
            return (
              <OptionRow
                key={label}
                label={label}
                selected={selectedOptions.includes(label)}
                multi
                disabled={isLoading || disabled}
                onClick={() => toggleOption(label)}
                index={i}
              />
            );
          })}

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (question.options.length) * 0.055 + 0.1 }}
            onClick={() => selectedOptions.length > 0 && !disabled && !isLoading && onAnswer(selectedOptions)}
            disabled={selectedOptions.length === 0 || isLoading || disabled}
            className={`
              mt-1.5 flex items-center justify-center gap-2 w-full py-4 rounded-2xl
              text-sm font-semibold transition-all duration-200
              ${selectedOptions.length > 0 && !disabled && !isLoading
                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_28px_rgba(59,130,246,0.35)] hover:shadow-[0_0_36px_rgba(59,130,246,0.45)]"
                : "bg-white/3 text-gray-600 cursor-not-allowed border border-white/6"
              }
            `}
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Confirm{selectedOptions.length > 0 ? ` (${selectedOptions.length} selected)` : ""}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* ── Text ── */}
      {question.answerType === "text" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative">
            <input
              type="text"
              value={
                disabled && selectedAnswer !== undefined
                  ? String(selectedAnswer)
                  : textAnswer
              }
              onChange={(e) => setTextAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && textAnswer.trim() && !disabled && !isLoading) {
                  onAnswer(textAnswer.trim());
                }
              }}
              placeholder="Type your answer…"
              disabled={isLoading || disabled}
              className="w-full bg-white/3 border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={() => textAnswer.trim() && !disabled && !isLoading && onAnswer(textAnswer.trim())}
              disabled={!textAnswer.trim() || isLoading || disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_14px_rgba(59,130,246,0.4)]"
            >
              {isLoading
                ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Send className="w-3.5 h-3.5 text-white" />
              }
            </button>
          </div>

          {/* Recorded indicator */}
          {selectedAnswer !== undefined && disabled && (
            <div className="flex items-center gap-2 mt-3 text-xs text-blue-400">
              <Check className="w-3.5 h-3.5" />
              Answer recorded
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
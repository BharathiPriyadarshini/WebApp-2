"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export interface QuestionData {
  id: string;
  question: string;
  context?: string;
  answerType: "single_choice" | "multi_choice";
  options: string[];
  isFinal?: boolean;
}

interface Props {
  question: QuestionData;
  onAnswer: (answer: string | string[]) => void;
  orderLabel: string;
}

/* ---------------- TYPEWRITER ---------------- */

function useTypewriter(text: string, speed = 20) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let i = 0;

    ref.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(ref.current!);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(ref.current!);
  }, [text, speed]);

  return { displayed, done };
}

/* ---------------- OPTION ROW ---------------- */

function OptionRow({
  label,
  selected,
  onSelect,
  reveal,
  index,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  reveal: boolean;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={reveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className="group relative w-full flex items-center gap-3 py-3.5 border-b border-white/6 last:border-0 text-left"
    >
      {/* label */}

      <span
        className={`flex-1 text-sm transition-colors duration-200 ${
          selected
            ? "text-white"
            : "text-gray-500 group-hover:text-gray-300"
        }`}
      >
        {label}
      </span>

      {/* check or arrow */}

      <span className="w-5 h-5 flex items-center justify-center">

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Check className="w-3.5 h-3.5 text-blue-400" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <ArrowRight className="w-3 h-3 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </AnimatePresence>

      </span>

      {selected && (
        <motion.div
          layoutId="selected-line"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(59,130,246,0.8), transparent)",
          }}
        />
      )}
    </motion.button>
  );
}

/* ---------------- MAIN CARD ---------------- */

export default function QuestionCard({
  question,
  onAnswer,
  orderLabel,
}: Props) {
  const isMulti = question.answerType === "multi_choice";

  const [selected, setSelected] = useState<string[]>([]);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const { displayed, done } = useTypewriter(question.question, 20);

  useEffect(() => {
    setSelected([]);
    setOptionsVisible(false);
  }, [question.id]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setOptionsVisible(true), 150);
      return () => clearTimeout(t);
    }
  }, [done]);

  const toggle = (opt: string) => {
    if (!isMulti) {
      onAnswer(opt);
      return;
    }

    setSelected((prev) =>
      prev.includes(opt)
        ? prev.filter((o) => o !== opt)
        : [...prev, opt]
    );
  };

  return (
    <div className="relative">

      {/* ---------- OUTER GLOW ---------- */}

      <motion.div
        className="absolute -inset-12 rounded-[40px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.35) 25%, rgba(59,130,246,0.18) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          opacity: [0.65, 1, 0.65],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ---------- INNER GLOW ---------- */}

      <motion.div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.25) 40%, transparent 65%)",
          filter: "blur(30px)",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ---------- CARD ---------- */}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,10,12,0.95)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05), 0 12px 35px rgba(0,0,0,0.7)",
        }}
      >
        <div className="p-7 space-y-7">

          {/* HEADER */}

          <div className="space-y-3">

            <div className="flex items-center gap-3">

              <span className="text-[10px] tracking-[0.3em] uppercase text-blue-400/60 font-medium">
                Question {orderLabel}
              </span>

              <div className="flex-1 h-px bg-white/6" />

              {isMulti && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                  Multi-select
                </span>
              )}

            </div>

            {/* QUESTION */}

            <h2 className="text-2xl font-semibold text-white leading-snug tracking-tight min-h-10">
              {displayed}

              {!done && (
                <motion.span
                  className="inline-block w-[2px] h-5 bg-blue-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </h2>

            <AnimatePresence>
              {done && question.context && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-white/20 leading-relaxed"
                >
                  {question.context}
                </motion.p>
              )}
            </AnimatePresence>

          </div>

          {/* OPTIONS */}

          <div>
            {question.options.map((opt, i) => (
              <OptionRow
                key={opt}
                label={opt}
                selected={selected.includes(opt)}
                onSelect={() => toggle(opt)}
                reveal={optionsVisible}
                index={i}
              />
            ))}
          </div>

          {/* MULTI SELECT BUTTON */}

          <AnimatePresence>
            {isMulti && selected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
              >
                <button
                  onClick={() => onAnswer(selected)}
                  className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Continue with {selected.length} choice
                  {selected.length > 1 ? "s" : ""}

                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
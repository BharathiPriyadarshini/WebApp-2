"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/questions/ProgressBar";
import QuestionCard, { QuestionData } from "@/components/questions/QuestionCard";

/* ════════════════════════════════════════
   MOCK DATA — remove when API is wired up
════════════════════════════════════════ */
const QUESTIONS: QuestionData[] = [
  {
    id: "q1",
    question: "What's your primary use for this car?",
    context: "This helps us understand your lifestyle and driving habits.",
    answerType: "single_choice",
    options: ["Daily city commute", "Family road trips", "Off-road adventures", "Weekend drives", "Business travel"],
  },
  {
    id: "q2",
    question: "What's your budget range?",
    context: "We'll find the best value within your comfort zone.",
    answerType: "single_choice",
    options: ["Under ₹8 Lakh", "₹8 – 15 Lakh", "₹15 – 25 Lakh", "₹25 – 50 Lakh", "Above ₹50 Lakh"],
  },
  {
    id: "q3",
    question: "Which fuel types are you open to?",
    answerType: "multi_choice",
    options: ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"],
  },
  {
    id: "q4",
    question: "How many seats do you need?",
    answerType: "single_choice",
    options: ["2 seats", "4 – 5 seats", "6 – 7 seats", "8+ seats"],
  },
  {
    id: "q5",
    question: "Which features matter most to you?",
    answerType: "multi_choice",
    options: [
      "Sunroof / Panoramic roof",
      "ADAS & Safety suite",
      "Premium audio system",
      "Large infotainment screen",
      "Ventilated seats",
      "360° camera",
    ],
  },
  {
    id: "q6",
    question: "What transmission do you prefer?",
    answerType: "single_choice",
    options: ["Manual", "Automatic", "No preference"],
    isFinal: true,
  },
];
/* ════════════════════════════════════════ */

export default function SuggestionsPage() {
  const router    = useRouter();
  const [qIndex,  setQIndex]  = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [dir,     setDir]     = useState(1);

  const total   = QUESTIONS.length;
  const current = QUESTIONS[qIndex];

  const advance = (answer: string | number | (string | number)[]) => {
    const val     = Array.isArray(answer) ? answer.map(String) : String(answer);
    const updated = { ...answers, [current.id]: val };
    setAnswers(updated);

    if (qIndex + 1 >= total || current.isFinal) {
      if (typeof window !== "undefined") {
        localStorage.setItem("rimello_answers", JSON.stringify(updated));
      }
      router.push("/recommendation");
      return;
    }

    setDir(1);
    setQIndex((i) => i + 1);
  };

  const goBack = () => {
    if (qIndex === 0) { router.push("/"); return; }
    setDir(-1);
    setQIndex((i) => i - 1);
  };

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <section className="min-h-screen bg-black flex flex-col">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-white/6">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <span className="text-blue-500 text-xs tracking-[0.3em] uppercase font-semibold">rimello</span>
        <span className="text-xs text-gray-600 tabular-nums">
          {qIndex + 1}<span className="text-gray-700"> / {total}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-6 pb-2 max-w-lg mx-auto w-full">
        <ProgressBar current={qIndex + 1} total={total} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <QuestionCard
                question={current}
                onAnswer={advance}
                orderLabel={String(qIndex + 1).padStart(2, "0")}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-[11px] text-gray-700 tracking-wide">
          Your answers are used only to find your ideal vehicle
        </p>
      </div>
    </section>
  );
}
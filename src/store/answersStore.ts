import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PreviousAnswer } from "@/types";

interface AnswersState {
  answers: PreviousAnswer[];
  maxQuestions: number;
  
  // Actions
  setAnswers: (answers: PreviousAnswer[]) => void;
  addAnswer: (answer: PreviousAnswer) => void;
  updateAnswer: (index: number, answer: Partial<PreviousAnswer>) => void;
  removeAnswer: (questionId: string) => void;
  setMaxQuestions: (max: number) => void;
  clearAnswers: () => void;
  reset: () => void;
}

export const useAnswersStore = create<AnswersState>()(
  persist(
    (set) => ({
      answers: [],
      maxQuestions: 5,

      setAnswers: (answers) => set({ answers }),
      
      addAnswer: (answer) =>
        set((state) => ({
          answers: [...state.answers, answer],
        })),
      
      updateAnswer: (index, answer) =>
        set((state) => ({
          answers: state.answers.map((a, i) =>
            i === index ? { ...a, ...answer } : a
          ),
        })),
      
      removeAnswer: (questionId) =>
        set((state) => ({
          answers: state.answers.filter((a) => a.questionId !== questionId),
        })),
      
      setMaxQuestions: (max) => set({ maxQuestions: max }),
      
      clearAnswers: () => set({ answers: [] }),
      
      reset: () => set({ answers: [], maxQuestions: 5 }),
    }),
    {
      name: "rimello-answers",
    }
  )
);

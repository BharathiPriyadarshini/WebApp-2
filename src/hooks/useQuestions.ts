import { useMutation } from "@tanstack/react-query";
import { PreviousAnswer, QuestionResponse } from "@/types";

const API_BASE_URL = "http://localhost:3003";

async function fetchNextQuestion(
  previousAnswers: PreviousAnswer[] = []
): Promise<QuestionResponse> {
  const response = await fetch(
    `${API_BASE_URL}/recommendations/questions/next`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ previousAnswers }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch next question");
  }

  return response.json();
}

export function useNextQuestion() {
  return useMutation({
    mutationFn: fetchNextQuestion,
  });
}

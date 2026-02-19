import { useMutation } from "@tanstack/react-query";
import { PreviousAnswer, RecommendationResponse } from "@/types";

const API_BASE_URL = "http://localhost:3003";

async function fetchRecommendations(
  answers: PreviousAnswer[]
): Promise<RecommendationResponse> {
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return response.json();
}

export function useRecommendations() {
  return useMutation({
    mutationFn: fetchRecommendations,
  });
}

// API Request/Response Types

export interface QuestionOption {
  key: string;
  value: string;
}

export interface PreviousAnswer {
  questionId: string;
  question: string;
  answer: string | number | (string | number)[];
  answerType?: "text" | "option" | "single_choice" | "multi_choice";
  options?: (QuestionOption | string)[];
}

export interface GetNextQuestionDto {
  previousAnswers?: PreviousAnswer[];
}

export interface QuestionResponse {
  id: string;
  question: string;
  answerType: "text" | "option" | "single_choice" | "multi_choice";
  options?: (QuestionOption | string)[];
  isFinal: boolean;
  context?: string;
}

export interface GetRecommendationsDto {
  answers: PreviousAnswer[];
}

export interface CarRecommendation {
  _id?: string;
  brand?: string;
  make?: string;
  model?: string;
  trim?: string;
  price?: number;
  cc?: number;
  fuelType?: string;
  transmission?: string;
  [key: string]: unknown;
}

export interface RecommendationResponse {
  recommendations: CarRecommendation[];
  explanation?: string;
  totalResults: number;
}

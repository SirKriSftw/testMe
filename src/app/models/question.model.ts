import { Choice } from "./choice.model";

export interface Question {
    questionId?: number;
    testId: number;
    questionText: string;
    answer: string;
    choices?: Choice[];
    userAnswer?: string;
  }
  
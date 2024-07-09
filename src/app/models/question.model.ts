import { Choice } from "./choice.model";

export interface Question {
    quesId?: number;
    testId: number;
    questionText: string;
    answer: string;
    choices?: Choice[];
    userAnswer?: string;
  }
  
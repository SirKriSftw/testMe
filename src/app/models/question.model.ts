import { Choice } from "./choice.model";

export interface Question {
    id?: number;
    testId: number;
    question: string;
    answer: string;
    choices?: Choice[];
  }
  
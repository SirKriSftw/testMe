import { Question } from "./question.model";

export interface Result {
    userAnswer?: string;
    question: Question;
  }
  
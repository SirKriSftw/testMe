import { Question } from "./question.model";

export interface Result {
    userAnswer?: string;
    questionIndex: number;
    question: Question;
  }
  
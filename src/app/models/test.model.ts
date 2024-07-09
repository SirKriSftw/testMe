import { Question } from "./question.model";

export interface Test {
    testId: number;
    creatorId: number;
    categoryId: number;
    title: string;
    description?: string;
    isPublic?: boolean;
    questions?: Question[];
  }
  
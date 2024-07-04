import { Question } from "./question.model";

export interface Test {
    id: number;
    creatorId: number;
    categoryId: number;
    title: string;
    description?: string;
    public?: boolean;
    questions?: Question[];
  }
  
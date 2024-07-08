import { Test } from "../models/test.model";

export const DATA: Test[] = [
    {
      id: 1,
      creatorId: 1,
      categoryId: 1,
      title: "First Test",
      description: "This is the first test",
      public: true,
      questions: [
        {
          id: 1,
          testId: 1,
          question: "First question",
          answer: "a",
          choices: [
            {
              id: 1,
              questionId: 1,
              choice: "a"
            },
            {
              id: 2,
              questionId: 1,
              choice: "b"
            },
            {
              id: 3,
              questionId: 1,
              choice: "c"
            },
            {
              id: 4,
              questionId: 1,
              choice: "d"
            },
          ]
        },
        {
          id: 2,
          testId: 1,
          question: "Second question",
          answer: "Answer"
        },
        {
          id: 3,
          testId: 1,
          question: "Third question",
          answer: "Answer"
        },
        {
          id: 4,
          testId: 1,
          question: "Fourth question",
          answer: "Answer"
        }
      ]
    },
    {
      id: 2,
      creatorId: 1,
      categoryId: 2,
      title: "Second test",
      description: "This is the second test",
      public: true
    },
    {
      id: 3,
      creatorId: 1,
      categoryId: 3,
      title: "Third test",
      public: true
    },
    {
      id: 4,
      creatorId: 2,
      categoryId: 4,
      title: "Fourth test",
      public: false
    },
  ];
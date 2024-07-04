import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor() { }
  data: Test[] = [
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
      creatorId: 1,
      categoryId: 4,
      title: "Fourth test",
      public: true
    },
  ];
  
  getAllTests() : Observable<Test[]>
  {
    return from(new Promise<Test[]>((resolve, reject) => {
      const tests = this.data;
      resolve(tests);
    }));
  }

  getTest(id: number) : Observable<Test | undefined>
  {
    return from(new Promise<Test | undefined>((resolve, reject) => {
      const test = this.data.find(t => t.id === id);
      resolve(test);
    }))
  }
}

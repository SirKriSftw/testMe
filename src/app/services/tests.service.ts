import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Test } from '../models/test.model';
import { Cateogry } from '../models/category';

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

  getAllTestNames() : Observable<{id: number, title: string, description?: string, categoryId: number}[]>
  {
    return from(new Promise<{id: number, title: string, description?: string, categoryId: number}[]>((resolve, reject) => {
      const tests = this.data.filter(test => test.public).map(({id, title, description, categoryId})=> ({id, title, description, categoryId}));
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

  getAllCategories()
  {
    return from(new Promise<Cateogry[]>((resolve, reject) => {
      const categories = [
        {
          id: 1,
          name: "Cateogry 1"
        },
        {
          id: 2,
          name: "Cateogry 2"
        },
        {
          id: 3,
          name: "Cateogry 3"
        },
        {
          id: 4,
          name: "Cateogry 4"
        }
      ]
      resolve(categories);
    }))
  }

  saveTest(test: Test)
  {
    return from(new Promise<number>((resolve, reject) => {
      const id = this.data.length + 1;
      test.id = id;
      this.data.push(test);
      resolve(id);
    }))
  }
}

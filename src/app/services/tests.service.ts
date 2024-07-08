import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Test } from '../models/test.model';
import { Cateogry } from '../models/category';
import { DATA } from './dummy-data';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor() { }
  data = DATA;
  
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

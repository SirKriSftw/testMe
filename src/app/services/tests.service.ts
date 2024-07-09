import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Test } from '../models/test.model';
import { Cateogry } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private apiUrl = `http://localhost:5257/api/tests`;
  constructor(private http: HttpClient) { }
  
  getAllTestNames() : Observable<{testId: number, title: string, description?: string, categoryId: number}[]>
  {
    return this.http.get<Test[]>(`${this.apiUrl}/All/Names`)
  }

  getTest(id: number) : Observable<Test | undefined>
  {
    return this.http.get<Test>(`${this.apiUrl}/${id}`);
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
    return this.http.post<Test>(this.apiUrl, test);
  }
}

import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiUrl = `http://localhost:5257/api/questions`;
  constructor(private http: HttpClient) { }
  saveQuestion(q: Question) : Observable<Question>
  {
    return this.http.post<Question>(this.apiUrl, q);
  }

  editQuestion(q: Question) : Observable<Question>
  {
    return this.http.put<Question>(this.apiUrl, q);
  }
}

import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  tempId: number = 5;

  saveQuestion(q: Question) : Observable<Question>
  {
    return from(new Promise<Question>((resolve, reject) => {
      q.id = this.tempId;
      this.tempId++;
      resolve(q);
    }))
  }

  editQuestion(q: Question) : Observable<Question>
  {
    return from(new Promise<Question>((resolve, reject) => {
      resolve(q);
    }))
  }

}

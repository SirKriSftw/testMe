import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  saveQuestion(q: Question) : Observable<Question>
  {
    return from(new Promise<Question>((resolve, reject) => {
      q.id = 5;
      resolve(q);
    }))
  }
}

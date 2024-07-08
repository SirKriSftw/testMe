import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { from, Observable } from 'rxjs';
import { DATA } from './dummy-data';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  tempId: number = 5;
  data = DATA;

  saveQuestion(q: Question) : Observable<Question>
  {
    return from(new Promise<Question>((resolve, reject) => {
      q.id = this.tempId;
      this.tempId++;
      const test = DATA.find(t => t.id === q.testId);
      test?.questions?.push(q);
      resolve(q);
    }))
  }

  editQuestion(q: Question) : Observable<Question>
  {
    return from(new Promise<Question>((resolve, reject) => {
      let test = DATA.find(t => t.id === q.testId);
      const i = test!.questions!.findIndex(question => question.id === q.id);
      test!.questions![i] = q;
      resolve(q);
    }))
  }

}

import { Component, Input } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {

  @Input() question!: Question;
  @Input() isCorrect?: boolean;
  @Input() userAnswer?: string;
  @Input() index: number = 0;
  @Input() hideAnswers: boolean = true;
  @Input() canEdit: boolean = false;

  
  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  editQuestion()
  {
    console.log("Editing quesiton: " + this.question.id);
  }
}

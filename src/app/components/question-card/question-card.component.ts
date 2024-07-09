import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {

  @Input() question!: Question;
  @Input() isCorrect?: boolean;
  @Input() isResults: boolean = false;
  @Input() userAnswer?: string;
  @Input() index: number = 0;
  @Input() hideAnswers: boolean = true;
  @Input() canEdit: boolean = false;
  @Output() editingQuestion = new EventEmitter();

  
  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  editQuestion()
  {
    this.editingQuestion.emit([this.question, this.index]);
  }
}

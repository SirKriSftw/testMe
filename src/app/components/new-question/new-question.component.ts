import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent {

  @Input() testId: number = 0;
  question: string = "";
  answer: string = "";
  choices: string[] = [];
  MAX_CHOICES: number = 26;

  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  addChoice()
  {
    this.choices.push("");
  }

  removeChoice(i: number)
  {
    this.choices.splice(i, 1);
  }
  
  trackByFn(index: number)
  {
    return index;
  }

  saveQuestion()
  {
    console.log(this.question);
    console.log(this.choices);
    console.log(this.answer);
  }
}

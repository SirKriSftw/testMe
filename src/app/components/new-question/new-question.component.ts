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
  choices: string[] = ["a", "b"];
  MAX_CHOICES: number = 26;

  choicePlaceholder(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `Choice ${optionLetter}.`
  }

  addChoice()
  {
    this.choices.push("");
  }
}

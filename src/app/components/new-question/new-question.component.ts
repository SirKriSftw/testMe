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
  answerIndex: number = -1;
  choices: string[] = [];
  errors: string [] = [];
  warning: string = "";
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
    this.errors = [];
    this.warning = "";
    if(this.question == "")
    {
      this.errors.push("A question is required.");
    }

    if(this.answerIndex != -1)
    {
      if(this.choices[this.answerIndex] != "") this.answer = this.choices[this.answerIndex];
    }

    if(this.choices.includes(""))
    {
      this.warning = "Empty choices are removed before saving."
      this.choices = this.choices.filter(c => c !== "");
    }

    if(this.answer == "" || this.answer == undefined)
    {
      this.errors.push("An answer is required.");
    }

    if(this.errors.length == 0)
    {
      console.log("Saving question");
    }
  }
}

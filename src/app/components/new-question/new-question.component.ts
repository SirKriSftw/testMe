import { Component, EventEmitter, HostListener, Input, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Choice } from '../../models/choice.model';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent {

  @ViewChild('questionInput', { read: ViewContainerRef}) questionInput!: ViewContainerRef;

  @Input() testId: number = 0;
  @Input() questionToEdit?: Question;
  @Output() questionSaved = new EventEmitter<Question>();
  @Output() questionEdited = new EventEmitter<Question>();
  @Output() questionCancelled = new EventEmitter();
  question: string = "";
  answer: string = "";
  answerIndex: number = -1;
  choices: Choice[] = [];
  errors: string [] = [];
  warning: string = "";
  MAX_CHOICES: number = 26;

  constructor(private questionsService: QuestionsService,
              private renderer: Renderer2
  ){}

  handleKeyUp(e: KeyboardEvent)
  {
    e.stopPropagation();
  }

  ngAfterViewInit()
  {
    setTimeout(() => {
      this.setFocus();
    })
  }

  setFocus()
  {
    const inputElement = this.questionInput.element.nativeElement as HTMLInputElement;    
    this.renderer.selectRootElement(inputElement).focus(); 
  }

  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  addChoice()
  {
    if(this.choices.length == 0) this.answer = "";
    this.choices.push(
      {
        choice: ""
      }
    );
  }

  removeChoice(i: number)
  {
    this.choices.splice(i, 1);
  }
  
  trackByFn(index: number)
  {
    return index;
  }

  submitQuestion()
  {
    this.errors = [];
    this.warning = "";
    if(this.question == "")
    {
      this.errors.push("A question is required.");
    }

    if(this.answerIndex != -1)
    {
      if(this.choices[this.answerIndex].choice != "") this.answer = this.choices[this.answerIndex].choice;
    }

    if(this.choices.some(c => c.choice == ""))
    {
      this.warning = "Empty choices are removed before saving."
      this.choices = this.choices.filter(c => c.choice !== "");
    }

    if(this.answer == "" || this.answer == undefined)
    {
      this.errors.push("An answer is required.");
    }

    if(this.errors.length == 0)
    {
      this.saveQuestion();
    }
  }

  saveQuestion()
  {
    let newQuestion = {
      testId: this.testId,
      question: this.question,
      answer: this.answer,
      choices: this.choices
    }

    this.questionsService.saveQuestion(newQuestion).subscribe(
      (r) => {
        this.questionSaved.emit(r);
      }
    );
    console.log("Saving question");
  }

  editQuestion()
  {
    this.questionToEdit = {
      testId: this.testId,
      id: this.questionToEdit?.id,
      question: this.question,
      answer: this.answer,
      choices: this.choices
    }
  }

  cancelQuestion()
  {
    this.questionCancelled.emit();
  }
}

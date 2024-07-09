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

  ngOnInit()
  {
    if(this.questionToEdit)
    {
      this.question = this.questionToEdit.questionText;
      this.answer = this.questionToEdit.answer;
      if(this.questionToEdit.choices?.length)
      {
        this.choices = this.questionToEdit.choices;
        this.answerIndex = this.choices.findIndex(c => c.choiceText == this.answer);
      } 
    }
  }

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
        choiceText: ""
      }
    );
  }

  removeChoice(i: number)
  {
    this.choices.splice(i, 1);
    if(this.choices.length == 0) this.answerIndex = -1;
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
      if(this.choices[this.answerIndex].choiceText != "") this.answer = this.choices[this.answerIndex].choiceText;
    }

    if(this.choices.some(c => c.choiceText == ""))
    {
      this.warning = "Empty choices are removed before saving."
      this.choices = this.choices.filter(c => c.choiceText !== "");
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
      questionId: -1,
      questionText: this.question,
      answer: this.answer,
      choices: this.choices
    }

    if(this.questionToEdit)
    {
      newQuestion.questionId = this.questionToEdit.questionId!;
      newQuestion.choices.map(c => c.questionId = this.questionToEdit?.questionId);
      this.questionsService.editQuestion(newQuestion).subscribe(
        (r) => {
          this.questionEdited.emit(r);
        }
      );
    }
    else
    {
      this.questionsService.saveQuestion(newQuestion).subscribe(
        (r) => {
          this.questionSaved.emit(r);
        }
      );
    }

    console.log("Saving question");
  }

  cancelQuestion()
  {
    this.questionCancelled.emit();
  }
}

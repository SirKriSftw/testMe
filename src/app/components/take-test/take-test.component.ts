import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestsService } from '../../services/tests.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question.model';
import { Attempt } from '../../models/attempt.model';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css'
})
export class TakeTestComponent {

  @ViewChild('longAnswer') longAnswer?: ElementRef;

  options: any = {};
  attemptInfo: Attempt[] = [];
  test?: Test = undefined;
  id: number = -1;
  questionIndex = 0;
  currentQuestion?: Question = undefined;
  currentAnswer?: string = undefined;
  questionCount: number = 0;

  canPrev: boolean = false;
  canNext: boolean = true;
  preventNext: boolean = false;

  timer: any;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor(private testsService: TestsService,
              private route: ActivatedRoute
  ) {}

  ngOnInit()
  {
    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.testsService.getTest(this.id).subscribe(
      (r) => {
        this.test = r;
        if(this.test?.questions) this.currentQuestion = this.test?.questions[this.questionIndex];
        if(this.test?.questions) this.questionCount = this.test.questions.length;
      }
    );
    this.options = history.state.info;
    if(this.options.timer) this.startTimer();
    console.log(this.options);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  @HostListener("document:keydown.ArrowLeft", ["$event"])
  @HostListener("document:keydown.ArrowDown", ["$event"])
  keyPrev(e: KeyboardEvent)
  {
    if(this.longAnswer?.nativeElement !== document.activeElement) this.prevQuestion();
  }

  @HostListener("document:keydown.ArrowRight", ["$event"])
  @HostListener("document:keydown.ArrowUp", ["$event"])
  keyNext(e: KeyboardEvent)
  {
    if(this.longAnswer?.nativeElement !== document.activeElement) this.nextQuestion();
  }

  startTimer() 
  {
    this.timer = setInterval(() => {
      this.seconds++;
      if(this.seconds === 60)
      {
        this.seconds = 0;
        this.minutes++;
      }
      if(this.minutes === 60)
      {
        this.minutes = 0;
        this.hours++;
      }
    }, 1000)
  }


  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  nextQuestion()
  {
    if(this.options.perfect && !this.checkAnswer())
    {
      this.preventNext = true;

      setTimeout(() => {
        this.preventNext = false;
      }, 1000)
      
      return;
    }
    
    this.updateAttemptInfo();
    if(this.test?.questions)
    {
      if(this.questionIndex + 1 < this.test?.questions.length) this.questionIndex++;
      this.currentQuestion = this.test?.questions[this.questionIndex];
    }
    this.updateButtons();
    this.loadAttemptInfo();
  }

  prevQuestion()
  {
    this.updateAttemptInfo();
    if(this.test?.questions)
      {
        if(this.questionIndex - 1 >= 0) this.questionIndex--;
        this.currentQuestion = this.test?.questions[this.questionIndex];
      }
    this.updateButtons();
    this.loadAttemptInfo();
  }

  updateButtons()
  {
    this.questionIndex == 0 ? this.canPrev = false : this.canPrev = true;
    this.questionIndex < this.questionCount - 1 ? this.canNext = true : this.canNext = false;
  }

  updateAttemptInfo()
  {
    this.attemptInfo[this.questionIndex] = 
    {
      selectedAnswer: this.currentAnswer,
      isCorrect: this.checkAnswer(),
    }
  }

  loadAttemptInfo()
  {
    if(this.attemptInfo[this.questionIndex]) this.currentAnswer = this.attemptInfo[this.questionIndex].selectedAnswer;
    else this.currentAnswer = "";
    
  }

  checkAnswer()
  {
    if(this.currentQuestion?.choices != null || this.options.exact) return this.currentAnswer?.toLowerCase().trim() == this.currentQuestion?.answer.toLowerCase().trim();
    else return undefined;
  }
}
